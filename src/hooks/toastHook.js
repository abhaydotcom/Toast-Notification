import { useState, useCallback } from 'react';
import { DEFAULT_CONFIG } from '../component/Constant';

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      duration: config.duration,
      showProgress: config.showProgress,
      pauseOnHover: config.pauseOnHover,
      ...toast
    };
    
    setToasts(prev => {
      const updated = [...prev, newToast];
      // Limit max toasts
      if (config.maxToasts && updated.length > config.maxToasts) {
        return updated.slice(-config.maxToasts);
      }
      return updated;
    });
    
    return id;
  }, [config]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const updateConfig = useCallback((newConfig) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => 
    addToast({ type: 'success', message, ...options }), [addToast]);
  
  const error = useCallback((message, options = {}) => 
    addToast({ type: 'error', message, ...options }), [addToast]);
  
  const info = useCallback((message, options = {}) => 
    addToast({ type: 'info', message, ...options }), [addToast]);
  
  const warning = useCallback((message, options = {}) => 
    addToast({ type: 'warning', message, ...options }), [addToast]);

  return {
    toasts,
    config,
    addToast,
    removeToast,
    clearAllToasts,
    updateConfig,
    success,
    error,
    info,
    warning
  };
};

export default useToast;