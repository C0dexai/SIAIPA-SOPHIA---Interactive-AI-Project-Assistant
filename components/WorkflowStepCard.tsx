
import React from 'react';

const WorkflowStepCard = ({ step, isCompleted, onToggleComplete }) => {
  // FIX: Added explicit type for the event parameter to aid TypeScript's type inference.
  const handleToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onToggleComplete(step.id);
  };

  const baseClasses = 'bg-slate-800/50 rounded-xl p-6 border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-900/50 relative h-full';
  const completedClasses = 'border-green-500/60';
  const incompleteClasses = 'border-slate-700/50 hover:border-sky-500/50';

  const checkmarkIcon = React.createElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 20 20',
      fill: 'currentColor',
      className: 'w-5 h-5 text-white'
    },
    React.createElement('path', {
      fillRule: 'evenodd',
      d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
      clipRule: 'evenodd'
    })
  );

  return React.createElement(
    'div',
    { className: `${baseClasses} ${isCompleted ? completedClasses : incompleteClasses}` },
    React.createElement('div', {
      onClick: handleToggle,
      onKeyDown: (e: React.KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && handleToggle(e),
      role: 'checkbox',
      'aria-checked': isCompleted,
      'aria-label': `Mark step ${step.id} as ${isCompleted ? 'incomplete' : 'complete'}`,
      tabIndex: 0,
      className: `absolute top-4 right-4 w-7 h-7 rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 ${isCompleted ? 'bg-green-500 border-green-400' : 'bg-slate-700/50 border-2 border-slate-600 hover:border-sky-500'}`
    }, isCompleted && checkmarkIcon),
    React.createElement(
      'div',
      { className: 'flex items-start space-x-4' },
      React.createElement(
        'div',
        { className: 'flex-shrink-0' },
        React.createElement(
          'div',
          { className: `w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-sky-400'}` },
          step.icon
        )
      ),
      React.createElement(
        'div',
        { className: 'flex-1' },
        React.createElement(
          'p',
          { className: `text-sm font-semibold transition-colors ${isCompleted ? 'text-green-400' : 'text-sky-400'}` },
          'STEP ',
          step.id
        ),
        React.createElement(
          'h3',
          { className: 'text-xl font-bold mt-1 text-slate-100' },
          step.title
        ),
        React.createElement(
          'p',
          { className: 'mt-2 text-slate-400 text-base' },
          step.description
        )
      )
    )
  );
};

export default WorkflowStepCard;