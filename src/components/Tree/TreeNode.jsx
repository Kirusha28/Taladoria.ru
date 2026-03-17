// src/components/AchievementNode.js
import React from 'react';
import './Tree.scss'; 

const TreeNode = ({ achievement, onUnlock }) => {
  const isLocked = achievement?.status === 'locked';

  return (
    <div className={`achievement-node ${isLocked ? 'locked' : 'unlocked'}`} onClick={!isLocked ? null : () => onUnlock(achievement.id)}>
      <div className="achievement-icon">{achievement?.icon}</div>
      <div className="achievement-details">
        <h4 className="achievement-name">{achievement?.name}</h4>
        <span className="achievement-status">{achievement?.isLocked ? 'Заблокировано' : 'Открыто'}</span>
      </div>
    </div>
  );
};

export default TreeNode;