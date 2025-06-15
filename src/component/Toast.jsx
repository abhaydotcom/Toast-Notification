import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Undo2 } from 'lucide-react';
import { TOAST_TYPES } from './Constant';

const Toast = ({ 
  id, 
  type = 'info', 
  message, 
  duration = 5000, 
  onDismiss, 
  onUndo,
  undoText = 'Undo',
  showProgress = true,
  pauseOnHover = true,
  isDark = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(duration);

  const config = TOAST_TYPES[type] || TOAST_TYPES.info;
  const IconComponent = config.icon;

  // Start timer
  const startTimer = useCallback(() => {
    if (duration <= 0) return;
    
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(id), 300);
    }, remainingTimeRef.current);
  }, [duration, id, onDismiss]);

  // Pause timer
  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      remainingTimeRef.current -= Date.now() - startTimeRef.current;
      setIsPaused(true);
    }
  }, []);

  // Resume timer
  const resumeTimer = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      startTimer();
    }
  }, [isPaused, startTimer]);

  // Update progress
  useEffect(() => {
    if (duration <= 0 || isPaused) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.max(0, ((remainingTimeRef.current - elapsed) / duration) * 100);
      setProgress(newProgress);
    }, 50);

    return () => clearInterval(interval);
  }, [duration, isPaused]);

  // Initialize toast
  useEffect(() => {
    setIsVisible(true);
    startTimer();
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTimer]);

  // Handle manual dismiss
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(id), 300);
  };

  // Handle undo action
  const handleUndo = () => {
    if (onUndo) {
      onUndo();
      handleDismiss();
    }
  };

  // Handle mouse events for pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      pauseTimer();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      resumeTimer();
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out mb-2 last:mb-0
        ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={`
        min-w-80 max-w-md p-4 rounded-lg border shadow-lg backdrop-blur-sm
        ${config.className}
        ${isDark ? 'dark' : ''}
      `}>
        <div className="flex items-start gap-3">
          <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-relaxed">{message}</p>
            
            {onUndo && (
              <button
                onClick={handleUndo}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current rounded"
                aria-label={`${undoText} action`}
              >
                <Undo2 className="w-3 h-3" />
                {undoText}
              </button>
            )}
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {showProgress && duration > 0 && (
          <div className="mt-3 w-full bg-black/10 dark:bg-white/10 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-current transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Time remaining"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;