import React, { useState } from 'react';
import  ToastContainer  from '../src/component/ToastContainer';
import { useToast } from './hooks';
import { POSITIONS } from './component/Constant';
import Button from './component/ui/button';

const App = () => {
  const toast = useToast();
  const [undoCount, setUndoCount] = useState(0);

  const handleUndo = () => {
    setUndoCount(prev => prev + 1);
    toast.success(`Undo action performed! Count: ${undoCount + 1}`);
  };

  const demoMessages = {
    success: [
      'Profile updated successfully!',
      'File uploaded successfully!',
      'Settings saved!',
      'Data synchronized!'
    ],
    error: [
      'Failed to save changes',
      'Network connection error',
      'Invalid credentials',
      'Server timeout occurred'
    ],
    info: [
      'New updates available',
      'Maintenance scheduled for tonight',
      'Your session will expire in 5 minutes',
      'Backup completed successfully'
    ],
    warning: [
      'Low disk space detected',
      'Password expires in 3 days',
      'Unsaved changes detected',
      'Rate limit approaching'
    ]
  };

  const getRandomMessage = (type) => {
    const messages = demoMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const showToast = (type) => {
    const message = getRandomMessage(type);
    const options = type === 'success' ? { onUndo: handleUndo, undoText: 'Undo' } : {};
    toast[type](message, options);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      toast.config.isDark 
        ? 'bg-gray-900 text-white ' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Toast Notification System</h1>
          <p className="text-lg opacity-75">
            A complete, accessible, and customizable toast notification queue
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          
          {/* Toast Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Button variant="success" onClick={() => showToast('success')}>
              Success Toast
            </Button>
            <Button variant="error" onClick={() => showToast('error')}>
              Error Toast
            </Button>
            <Button variant="primary" onClick={() => showToast('info')}>
              Info Toast
            </Button>
            <Button variant="warning" onClick={() => showToast('warning')}>
              Warning Toast
            </Button>
          </div>

          {/* Clear Button */}
          <div className="mb-6">
            <Button variant="secondary" onClick={toast.clearAllToasts}>
              Clear All Toasts
            </Button>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Position */}
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <select
                value={toast.config.position}
                onChange={(e) => toast.updateConfig({ position: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                {Object.keys(POSITIONS).map(pos => (
                  <option key={pos} value={pos}>
                    {pos.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-2">Duration (ms)</label>
              <select
                value={toast.config.duration}
                onChange={(e) => toast.updateConfig({ duration: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value={2000}>2 seconds</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
                <option value={0}>No auto-dismiss</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={toast.config.isDark ? 'dark' : 'light'}
                onChange={(e) => toast.updateConfig({ isDark: e.target.value === 'dark' })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={toast.config.showProgress}
                onChange={(e) => toast.updateConfig({ showProgress: e.target.checked })}
                className="rounded"
              />
              <span>Show Progress Bar</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={toast.config.pauseOnHover}
                onChange={(e) => toast.updateConfig({ pauseOnHover: e.target.checked })}
                className="rounded"
              />
              <span>Pause on Hover</span>
            </label>
          </div>
        </div>

       </div>

      {/* Toast Container */}
      <ToastContainer
        toasts={toast.toasts}
        position={toast.config.position}
        onDismiss={toast.removeToast}
        onUndo={handleUndo}
        showProgress={toast.config.showProgress}
        pauseOnHover={toast.config.pauseOnHover}
        isDark={toast.config.isDark}
      />
    </div>
  );
};

export default App;




