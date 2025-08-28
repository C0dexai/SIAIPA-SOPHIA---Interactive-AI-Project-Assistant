
import React from 'react';

const WorkflowProgress = ({ completedCount, totalCount }) => {
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return React.createElement(
    'div',
    { className: 'mb-8' },
    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-2' },
      React.createElement(
        'h2',
        { className: 'text-lg font-semibold text-slate-200' },
        'Workflow Progress'
      ),
      React.createElement(
        'p',
        { className: 'text-sm font-medium text-slate-300' },
        `${completedCount} / ${totalCount} Completed`
      )
    ),
    React.createElement(
      'div',
      { className: 'w-full bg-slate-700 rounded-full h-2.5' },
      React.createElement('div', {
        className: 'bg-gradient-to-r from-sky-500 to-green-400 h-2.5 rounded-full transition-all duration-500 ease-out',
        style: { width: `${percentage}%` },
      })
    )
  );
};

export default WorkflowProgress;
