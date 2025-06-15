export const generateToastId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const validateToastType = (type) => {
  const validTypes = ['success', 'error', 'info', 'warning'];
  return validTypes.includes(type) ? type : 'info';
};

export const validateDuration = (duration) => {
  if (typeof duration !== 'number' || duration < 0) {
    return 5000; // default duration
  }
  return duration;
};

export const validatePosition = (position) => {
  const validPositions = [
    'top-right', 'top-left', 'top-center',
    'bottom-right', 'bottom-left', 'bottom-center'
  ];
  return validPositions.includes(position) ? position : 'top-right';
};

export const truncateMessage = (message, maxLength = 200) => {
  if (typeof message !== 'string') return '';
  return message.length > maxLength 
    ? message.substring(0, maxLength) + '...' 
    : message;
};