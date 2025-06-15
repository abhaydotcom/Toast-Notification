import React from 'react';
import Toast from './Toast';
import { POSITIONS } from './Constant';

const ToastContainer = ({ 
  toasts, 
  position = 'top-right', 
  onDismiss, 
  onUndo,
  showProgress = true,
  pauseOnHover = true,
  isDark = false 
}) => {
  const positionClasses = POSITIONS[position] || POSITIONS['top-right'];
  
  return (
    <div 
      className={`fixed z-50 pointer-events-none ${positionClasses}`}
      aria-label="Notifications"
    >
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onDismiss={onDismiss}
            onUndo={onUndo}
            showProgress={showProgress}
            pauseOnHover={pauseOnHover}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;