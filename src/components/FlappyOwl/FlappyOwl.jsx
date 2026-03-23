import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import './FlappyOwl.scss'; // Твои стили BEM
import { useSelector } from 'react-redux';

// Инициализация звуков (браузер разрешит их играть после первого клика пользователя)
const SOUNDS = {
  jump: new Audio('./assets/sounds/jump.mp3'),
  point: new Audio('./assets/sounds/point.mp3'),
  death: new Audio('./assets/sounds/death.mp3')
};

const OWL_CLASSES = {
  'barn':   { name: 'Сипуха', desc: 'Легкая и маневренная' },
  'horned': { name: 'Филин',  desc: 'Тяжелый, мощный рывок' },
  'scops':  { name: 'Сыч',    desc: 'Баланс мудрости' }
};

// Замени на URL своего бекэнда
const SOCKET_URL = 'https://oi.taladoria.ru' || process.env.REACT_APP_API_URL || 'http://localhost:4000';
// const SOCKET_URL = 'http://localhost:4000';

const FlappyOwl = ({ roomId = 'main-hall' }) => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('lobby'); // 'lobby', 'playing', 'dead'
  const [gameState, setGameState] = useState({ players: {}, pipes: [] });
  const [myScore, setMyScore] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [isGhost, setIsGhost] = useState(false);
  const [particles, setParticles] = useState([]); // Для перьев
  const [countdown, setCountdown] = useState(null);
  const canvasRef = useRef(null);
  const lastJumpTime = useRef(0);
  const user = useSelector(state => state.accountData);

  // Подключение к сокетам
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      secure: SOCKET_URL.startsWith('https') // Явно указываем безопасное соединение
    });
    newSocket.emit('joinGameRoom', { roomId, userId: user?.user_id });

    newSocket.on('gameState', (data) => setGameState(data));

    // Логика таймера внутри этого же useEffect
    newSocket.on("countdownStarted", ({ startTime }) => {
      const interval = setInterval(() => {
        const remaining = Math.ceil((startTime - Date.now()) / 1000);
        if (remaining <= 0) {
          setCountdown(null);
          clearInterval(interval);
        } else {
          setCountdown(remaining);
        }
      }, 100);
    });
    
    newSocket.on('pointScored', (newScore) => {
      setMyScore(newScore);
      playSound('point');
      setWisdom(prev => Math.min(prev + 25, 100)); // Начисляем мудрость
    });

    newSocket.on('gameOver', ({ score }) => {
      setStatus('dead');
      playSound('death');
      // Создаем облако перьев в центре экрана (в % соотношении)
      spawnFeathers(50, 50); 
    });

    newSocket.on('hitTaken', (remainingLives) => {
      playSound('death'); // Звук удара
      // Можно добавить тряску экрана через CSS класс
    });

    newSocket.on('lifeGained', () => {
      // Звук получения жизни
    });

    newSocket.on("countdownStarted", ({ duration }) => {
      console.log("Приготовьтесь! Полет через:", duration);
      // Здесь можно запустить локальный таймер для визуала
      setStatus('playing');
    });

    newSocket.on("roundEnded", () => {
      setStatus('waiting');
    });

    setSocket(newSocket);

    return () => {
      console.log("Отключение сокета при размонтировании");
      newSocket.off("gameState");
      newSocket.disconnect();
    };
  }, []);


  // Анимация перьев (Canvas)
  useEffect(() => {
    if (particles.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.02;
        if (p.opacity > 0) {
          activeParticles = true;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size, p.size / 2, Math.random() * Math.PI, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      if (activeParticles) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [particles]);

  const spawnFeathers = (xPercent, yPercent) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const x = (xPercent / 100) * canvas.width;
    const y = (yPercent / 100) * canvas.height;
    
    const newParticles = Array.from({ length: 30 }).map(() => ({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      opacity: 1,
      size: Math.random() * 8 + 4
    }));
    setParticles(newParticles);
  };

  const playSound = (type) => {
    try {
      SOUNDS[type].currentTime = 0;
      SOUNDS[type].play();
    } catch (e) { /* Игнорируем блокировку автоплея браузером */ }
  };

  const joinGame = (owlType) => {
    if (socket) {
      socket.emit('joinGameRoom', { roomId, owlType });
      setStatus('waiting'); // Теперь мы не 'playing', а ждем остальных
      setMyScore(0);
      setWisdom(0);
      setParticles([]);
    }
  };

  const toggleReady = () => {
    if (socket) {
      socket.emit('toggleReady');
    }
  };

  const jump = useCallback(() => {
    const now = Date.now();
    // Ограничиваем частоту прыжков (например, не чаще чем раз в 100мс)
    if (status === 'playing' && socket && now - lastJumpTime.current > 100) {
      socket.emit('jump');
      playSound('jump');
      lastJumpTime.current = now;
    }
  }, [status, socket]);

  const activateGhostMode = () => {
    if (wisdom >= 100 && !isGhost && socket) {
      setIsGhost(true);
      setWisdom(0);
      socket.emit('activateGhost');
      
      setTimeout(() => {
        setIsGhost(false);
        socket.emit('deactivateGhost');
      }, 2000); // 2 секунды неуязвимости
    }
  };

  // Управление с клавиатуры (Пробел - прыжок, Shift - магия)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') { e.preventDefault(); jump(); }
      if (e.code === 'СontrolLeft' || e.code === 'ControlRight') { activateGhostMode(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump, wisdom, isGhost]);

  // Конвертация логических координат в проценты для адаптивности
  const toPct = (val, max) => `${(val / max) * 100}%`;

  // Смена фона в зависимости от счета
  const bgClass = myScore >= 10 ? 'taladoria-game--library' : 'taladoria-game--forest';

  return (
    <div className={`taladoria-game ${bgClass}`} onClick={jump}>
      
      {/* Лобби */}
      {status === 'lobby' && (
        <div className="taladoria-game__lobby">
          <h2>Выберите своего защитника</h2>
          <div className="taladoria-game__classes">
            {Object.entries(OWL_CLASSES).map(([key, info]) => (
              <div key={key} className="taladoria-game__card" onClick={() => joinGame(key)}>
                <h3>{info.name}</h3>
                <p>{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Экран проигрыша */}
      {status === 'dead' && (
        <div className="taladoria-game__lobby">
          <h2>Ваша сова устала</h2>
          <p>Счет: {myScore}</p>
          <button className="taladoria-game__card" onClick={() => setStatus('lobby')}>
            Вернуться в совет
          </button>
        </div>
      )}

      {countdown !== null && (
        <div className="taladoria-game__countdown-overlay">
          <div className="countdown-number">{countdown}</div>
          <p>Приготовьте крылья!</p>
        </div>
      )}

      {status === 'waiting' && (
        <div className="taladoria-game__lobby">
          <h2>Подготовка к вылету</h2>
          <div className="taladoria-game__ready-list" style={{ marginBottom: '20px', textAlign: 'left' }}>
            {Object.values(gameState.players).map(p => (
              <div key={p.id} style={{ fontSize: '1.2rem', margin: '10px 0' }}>
                {p.id === socket?.id ? "Вы" : "Игрок"} ({OWL_CLASSES[p.owlType]?.name}) — 
                <span style={{ color: p.isReady ? '#4caf50' : '#ff9800', marginLeft: '10px', fontWeight: 'bold' }}>
                  {p.isReady ? '✅ Готов' : '❌ Думает...'}
                </span>
              </div>
            ))}
          </div>
          <button 
            className="taladoria-game__card" 
            onClick={toggleReady}
            style={{ backgroundColor: gameState.players[socket?.id]?.isReady ? '#4caf50' : '#2c3e50' }}
          >
            {gameState.players[socket?.id]?.isReady ? 'Отменить готовность' : 'Я готов!'}
          </button>
        </div>
      )}

      {/* Игровое поле */}
      <div className="taladoria-game__board">
        {/* Трубы */}
        {gameState.pipes.map(pipe => (
          <React.Fragment key={pipe.id}>
            <div className="taladoria-game__pipe taladoria-game__pipe--top" style={{
              left: toPct(pipe.x, 800),
              top: 0,
              height: toPct(pipe.topHeight, 500)
            }} />
            <div className="taladoria-game__pipe taladoria-game__pipe--bottom" style={{
              left: toPct(pipe.x, 800),
              top: toPct(pipe.topHeight + pipe.gap, 500),
              height: toPct(500 - (pipe.topHeight + pipe.gap), 500)
            }} />
          </React.Fragment>
        ))}

        {/* Совы игроков */}
        {Object.values(gameState.players).map(player => {
          const isMe = player.id === socket?.id;
          const isInvulnerable = player.invulnerable ? 'taladoria-game__owl--blink' : '';
          const isDead = !player.alive ? 'taladoria-game__owl--hidden' : '';

          const avatarUrl = player.user_id 
          ? `/assets/owls/${player.user_id}.webp` 
          : '/assets/owls/default.webp';
          
          if (!player.alive) return null; // Мертвых не рисуем (они стали перьями)

          return (
            <div 
              key={player.id} 
              className={`taladoria-game__owl ${isInvulnerable} ${isDead}`}
              style={{
                left: toPct(50, 800), // Фиксированная X позиция на логических 50px
                top: toPct(player.y, 500),
                backgroundImage: `url('${avatarUrl}')`, // Используем backgroundImage для чистоты
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter: !player.alive ? 'grayscale(1) opacity(0.3)' : 'none'
              }}
            >
              {/* Никнейм или счет над совой для мультиплеера */}
              {!isMe && <div style={{position:'absolute', top: -20, color:'white', fontSize:'12px'}}>{player.score}</div>}
              {isMe && player.alive && (
                <div className="taladoria-game__lives-mini">
                  {Array.from({ length: player.lives }).map((_, i) => (
                    <span key={i}>❤️</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Интерфейс */}
      <div className="taladoria-game__ui">
        <div className="taladoria-game__score">{myScore}</div>
        <div className="taladoria-game__wisdom-bar" onClick={(e) => { e.stopPropagation(); activateGhostMode(); }}>
          <div className="taladoria-game__wisdom-fill" style={{ width: `${wisdom}%` }} />
        </div>
        {gameState.status === 'COUNTDOWN' && (
          <div className="taladoria-game__overlay">
            <div className="countdown-number">Полет начнется через...</div>
          </div>
        )}
      </div>

      {/* Холст для частиц (перьев) поверх всего */}
      <canvas 
        ref={canvasRef} 
        className="taladoria-game__canvas-fx"
        width={800} height={500} 
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%' }} 
      />
    </div>
  );
};

export default FlappyOwl;