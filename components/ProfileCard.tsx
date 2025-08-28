
import React from 'react';
import AgentAvatar from './AgentAvatar';

const ProfileCard = ({ agent, onConsult }) => {
  return React.createElement(
    'div',
    { className: 'bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col text-center items-center h-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-900/50' },
    React.createElement(AgentAvatar, { agent: agent, className: 'w-20 h-20 text-3xl mb-4 border-4', style: { borderColor: agent.color } }),
    React.createElement('h3', { className: 'text-xl font-bold text-slate-100' }, agent.name),
    React.createElement('p', { className: 'text-sm font-semibold mb-3', style: { color: agent.color } }, agent.role),
    React.createElement('p', { className: 'text-slate-400 text-sm font-light mb-4 flex-grow' }, agent.personality),
    React.createElement(
      'div',
      { className: 'mb-4 w-full' },
      React.createElement('p', { className: 'text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2' }, 'Skills'),
      React.createElement(
        'div',
        { className: 'flex flex-wrap gap-2 justify-center' },
        ...agent.skills.map(skill =>
          React.createElement('span', { key: skill, className: 'bg-slate-700 text-slate-300 text-xs font-medium px-2 py-1 rounded-full' }, skill)
        )
      )
    ),
    React.createElement(
      'button',
      {
        onClick: () => onConsult(agent),
        className: 'mt-auto w-full font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:opacity-90',
        style: { backgroundColor: agent.color, boxShadow: `0 4px 14px 0 ${agent.color}55`},
        'aria-label': `Consult with ${agent.name}`,
      },
      'Consult'
    )
  );
};

export default ProfileCard;
