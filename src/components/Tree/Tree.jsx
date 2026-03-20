import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import './Tree.scss';

// 1. Расширенная структура данных (с картинками, формами и цветами)
const initialData = {
  // --- УРОВЕНЬ 1 (САМЫЙ НИЗ) - 15 стартовых узлов (для примера покажу 3) ---
  "1": { 
    id: "1", name: "Рождение героя", desc: "Начни свой путь в Hordovia.", 
    image: "./assets/owls/349283746484060173_5.png", shape: "circularImage",
    status: "unlocked", children: ["16", "17"] 
  },
  "2": { 
    id: "2", name: "Первая кровь", desc: "Победи первого монстра.", 
    image: "./assets/owls/349283746484060173_5.png", shape: "circularImage",
    status: "unlocked", children: ["17"] 
  },
  "3": { 
    id: "3", name: "Исследователь", desc: "Открой 10 локаций.", 
    image: "./assets/owls/349283746484060173_5.png", shape: "circularImage",
    status: "unlocked", children: ["18"] 
  },
  // ... добавь еще 12 стартовых узлов (ID 4-15)

  // --- УРОВЕНЬ 2 (ВЫШЕ) ---
  "16": { 
    id: "16", name: "Мастер меча", desc: "Нанеси 1000 урона.", 
    image: "./assets/owls/349283746484060173_5.png", shape: "circularImage",
    status: "locked", children: ["19"] 
  },
  "17": { 
    id: "17", name: "Ветеран битв", desc: "Выживи в 50 сражениях.", 
    // Пример другой формы и цвета для особого узла!
    shape: "hexagon", color: { background: "#FFD700", border: "#B8860B" },
    status: "locked", children: ["19"] 
  },
  "18": { 
    id: "18", name: "Картограф", desc: "Открой всю карту.", 
    image: "./assets/owls/349283746484060173_5.png", shape: "circularImage",
    status: "locked", children: [] 
  },

  // --- УРОВЕНЬ 3 (ЕЩЕ ВЫШЕ) ---
  "19": { 
    id: "19", name: "Легенда Hordovia", desc: "Пройди игру на 100%.", 
    image: "./assets/owls/349283746484060173_5.png", shape: "star", // Форма звезды
    status: "locked", children: [] 
  },
};

const Tree = ({data={}, isLoading=false}) => {
  const [achievements, setAchievements] = useState(data);
  const [selectedNode, setSelectedNode] = useState(null); // Стейт для панели "Подробнее"
  
  const networkRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setAchievements(data);
    }
  }, [data]);

  const getGraphData = () => {
    const nodes = Object.values(achievements).map(ach => {
      // Базовые свойства, которые есть у всех узлов
      const node = {
        id: ach.id,
        label: ach.name,
        group: ach.status,
        level: ach.level,
        shape: ach.shape || 'dot',
      };
      console.log(node)
      // Добавляем картинку ТОЛЬКО если она есть (никаких null!)
      if (ach.image) {
        node.image = ach.image;
      }

      // Добавляем кастомный цвет ТОЛЬКО если он есть
      if (ach.color) {
        node.color = ach.color;
      }

      return node;
    });

    const edges = [];
    Object.values(achievements).forEach(ach => {
      ach.children.forEach(childId => {
        if (achievements[childId]) {
          const color = achievements[childId].status === 'unlocked' ? '#4ba4d4' : '#2c2c3e';
          edges.push({ 
            from: ach.id, 
            to: childId, 
            color: { color: color, opacity: 0.8 },
            width: achievements[childId].status === 'unlocked' ? 3 : 1
          });
        } else {
          console.warn(`Узел ${ach.id} ссылается на несуществующего ребенка ${childId}`);
        }
      });
    });

    return { nodes, edges };
  };

  useEffect(() => {
    if (!achievements || !containerRef.current || isLoading) return;
    const { nodes, edges } = getGraphData();

    const options = {
      nodes: {
        size: 60,
        font: { size: 14, color: '#ffffff', face: 'Inter, sans-serif', multi: true },
        borderWidth: 3,
        shadow: { enabled: true, color: 'rgba(0,0,0,0.8)' },
        brokenImage: "/assets/owls/default.webp",
        // ВАЖНО: Добавляем дефолтные параметры цвета, чтобы vis-network не читал null
        color: {
          highlight: { border: '#4ba4d4', background: '#2c2c3e' },
          hover: { border: '#4ba4d4', background: '#2c2c3e' }
        }
      },
      edges: {
        width: 2,
        color: { color: '#4a4a6a', highlight: '#4ba4d4' },
        arrows: { to: { enabled: true, scaleFactor: 0.3 } },
        smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.5 }
      },
      groups: {
        unlocked: {
          color: { 
            border: '#20626e', 
            background: '#2c2c3e', // Добавь фон, даже если используешь картинку
            highlight: { border: '#4CAF50', background: '#3d3d5c' } 
          },
          font: { color: '#ffffff' }
        },
        locked: {
          color: { 
            border: '#1a1a2e', 
            background: '#1a1a2e',
            highlight: { border: '#1a1a2e', background: '#1a1a2e' }
          },
          font: { color: '#666666' },
          opacity: 0.5 
        }
      },
      layout: {
        hierarchical: {
          direction: 'DU',
          sortMethod: 'directed',
          levelSeparation: 300, //standart 180
          nodeSpacing: 150,
          treeSpacing: 200
        }
      },
      physics: {
        enabled: false,
        timestep: 0.5,
        solver: 'forceAtlas2Based'
      },
      interaction: {
        hover: true,
        dragNodes: false,
        zoomView: true,
        dragView: true
      }
    };

    const network = new Network(containerRef.current, { nodes, edges }, options);

    // Событие клика по узлу
    network?.on("click", (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        setSelectedNode(achievements?.[nodeId]); // Показываем карточку

        network.focus(nodeId, {
          scale: 1.2,
          animation: { duration: 1000, easingFunction: "easeInOutQuad" }
        });
      } else {
        setSelectedNode(null); // Закрываем карточку при клике в пустоту
      }
    });

    networkRef.current = network;

    return () => {
      if (networkRef.current) networkRef.current.destroy();
    };
  }, [achievements]); 

  // Функция для кнопки "Разблокировать" в панели
  const handleUnlock = (nodeId) => {
    const parents = Object.values(achievements).filter(a => a.children.includes(nodeId));
    const allParentsUnlocked = parents.every(p => p.status === 'unlocked');

    if (!allParentsUnlocked && parents.length > 0) {
      alert("Сначала нужно открыть предыдущие достижения!");
      return;
    }

    if (selectedNode) {
      setAchievements(prev => ({
        ...prev,
        [selectedNode.id]: { ...prev[selectedNode.id], status: 'unlocked' }
      }));
      // Обновляем выбранный узел, чтобы в панели статус тоже обновился
      setSelectedNode(prev => ({ ...prev, status: 'unlocked' })); 
    }
  };

  return (
    <div className="achievement-tree-outer">
      <div className="achievement-tree-canvas" ref={containerRef} />

      {/* Выезжающая панель с подробностями (Стиль Glassmorphism) */}
      {selectedNode && (
        <div className="achievement-details-panel">
          <button className="close-btn" onClick={() => setSelectedNode(null)}>✖</button>
          
          {selectedNode.image ? (
            <img src={selectedNode.image} alt={selectedNode.name} className="detail-image" />
          ) : (
            <div className="detail-placeholder">Без картинки</div>
          )}
          
          <h3>{selectedNode.name}</h3>
          <p className="detail-desc">{selectedNode.desc}</p>

          {selectedNode.status === 'locked' && (
             <button className="unlock-btn" onClick={handleUnlock}>Засветить</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Tree;