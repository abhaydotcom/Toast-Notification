import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    iconColor: 'text-green-500 dark:text-green-400'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    iconColor: 'text-red-500 dark:text-red-400'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-500 dark:text-blue-400'
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-500 dark:text-yellow-400'
  }
};

export const POSITIONS = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
};

export const DEFAULT_CONFIG = {
  position: 'top-right',
  duration: 5000,
  showProgress: true,
  pauseOnHover: true,
  isDark: true,
  maxToasts: 5
};