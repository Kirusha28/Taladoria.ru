import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalUI.module.scss'; // используем CSS-модули (можно заменить на инлайн-стили)

const ModalUI = ({ isOpen, onClose, title, children, actions, closeOnOverlayClick = true, closeOnEsc = true }) => {
  // Обработчик клавиши Escape
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  // Блокировка прокрутки body при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalUI;