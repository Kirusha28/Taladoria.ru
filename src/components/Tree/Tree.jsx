import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import './Tree.scss';

const initialData = {
  "1": { id: "1", name: "Начало пути", icon: "🚀", status: "unlocked", children: ["2", "3"] },
  "2": { id: "2", name: "Первые шаги", icon: "🦶", status: "unlocked", children: ["4", "5"] },
  "3": { id: "3", name: "Исследователь", icon: "🗺️", status: "locked", children: ["6"] },
  "4": { id: "4", name: "Мастер квестов", icon: "📜", status: "locked", children: [] },
  "5": { id: "5", name: "Хранитель знаний", icon: "📚", status: "locked", children: [] },
  "6": { id: "6", name: "Картограф", icon: "🧭", status: "locked", children: [] },
  // ...добавь сюда остальные 15 достижений
};

const Tree = () => {
  const [achievements, setAchievements] = useState(initialData);
  const networkRef = useRef(null); // Для хранения инстанса сети
  const containerRef = useRef(null); // Для DOM-узла

  // 1. Функция трансформации данных под формат vis-network
  const getGraphData = () => {
    const nodes = Object.values(achievements).map(ach => ({
      id: ach.id,
      label: `${ach.icon}\n${ach.name}`,
      group: ach.status, // Используем статус как имя группы для стилей
    }));

    const edges = [];
    Object.values(achievements).forEach(ach => {
      ach.children.forEach(childId => {
        edges.push({ from: ach.id, to: childId });
      });
    });

    return { nodes, edges };
  };

  // 2. Инициализация и обновление графа
  useEffect(() => {
    const { nodes, edges } = getGraphData();

    const options = {
      nodes: {
        shape: 'dot',
        size: 30,
        font: { size: 16, color: '#ffffff', face: 'Inter, sans-serif' },
        borderWidth: 2,
        shadow: { enabled: true, color: 'rgba(0,0,0,0.5)' }
      },
      edges: {
        width: 2,
        color: { color: '#4a4a6a', highlight: '#8484ff' },
        arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 }
      },
      groups: {
        unlocked: {
          color: { background: '#4CAF50', border: '#2e7d32' },
          shadow: { color: 'rgba(76, 175, 80, 0.4)' }
        },
        locked: {
          color: { background: '#2c2c3e', border: '#1a1a2e' },
          font: { color: '#888' }
        }
      },
      layout: {
        hierarchical: {
          direction: 'UD', // Up-Down (Сверху вниз)
          sortMethod: 'directed',
          levelSeparation: 150,
          nodeSpacing: 150
        }
      },
      physics: false, // Отключаем физику для строгого иерархического древа
      interaction: {
        dragNodes: true,
        zoomView: true,
        dragView: true
      }
    };

    const network = new Network(containerRef.current, { nodes, edges }, options);

    // Обработка клика
    network.on("click", (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        handleUnlockAchievement(nodeId);
      }
    });

    networkRef.current = network;

    return () => {
      if (networkRef.current) networkRef.current.destroy();
    };
  }, [achievements]); // Перерисовываем при изменении стейта

  const handleUnlockAchievement = (id) => {
    setAchievements((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: 'unlocked' },
    }));
  };

  return (
    <div className="achievement-tree-outer">
      <h2>Дерево достижений Hordovia</h2>
      <div className="achievement-tree-canvas" ref={containerRef} />
      
      {/* Краткая легенда */}
      <div className="tree-legend">
        <span className="legend-item"><i style={{background: '#4CAF50'}}/> Открыто</span>
        <span className="legend-item"><i style={{background: '#2c2c3e'}}/> Закрыто</span>
      </div>
    </div>
  );
};

export default Tree;