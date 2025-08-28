
import React from 'react';

const AgentAvatar = ({ agent, className = 'w-8 h-8', style = {} }) => {
  const baseClasses = 'rounded-full flex items-center justify-center flex-shrink-0';
  const mergedStyles = {
    backgroundColor: agent.color,
    ...style,
  };
  return React.createElement(
    'div',
    {
      className: `${baseClasses} ${className}`,
      style: mergedStyles,
      'aria-label': `${agent.name} avatar`,
    },
    React.createElement('span', { className: 'text-white font-bold' }, agent.name[0])
  );
};

export default AgentAvatar;
