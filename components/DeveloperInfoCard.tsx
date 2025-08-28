
import React, { useState } from 'react';
import { agents } from '../agents';
import AgentAvatar from './AgentAvatar';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return React.createElement(
    'div',
    { className: 'relative group' },
    React.createElement(
      'pre',
      { className: 'bg-slate-900/70 rounded-md p-4 pr-16 mt-2 overflow-x-auto text-left' },
      React.createElement('code', { className: 'text-sm text-slate-300 font-mono whitespace-pre-wrap break-words' }, code)
    ),
    React.createElement(
      'button',
      {
        onClick: handleCopy,
        className: 'absolute top-3 right-3 p-2 bg-slate-700/50 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-600 hover:text-white',
        'aria-label': 'Copy code',
      },
      copied
        ? React.createElement(
            'svg',
            { xmlns: 'http://www.w3.org/2000/svg', className: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'currentColor' },
            React.createElement('path', {
              fillRule: 'evenodd',
              d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
              clipRule: 'evenodd',
            })
          )
        : React.createElement(
            'svg',
            { xmlns: 'http://www.w3.org/2000/svg', className: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('path', {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              d: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
            })
          )
    )
  );
};


const DeveloperInfoCard = ({ info }) => {
  const [activeTab, setActiveTab] = useState('cli');
  const agent = agents[info.agentId];

  return React.createElement(
    'div',
    { className: 'bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col col-span-1 md:col-span-2 lg:col-span-3' },
    React.createElement(
      'div',
      { className: 'flex items-start space-x-4' },
      React.createElement(
        'div',
        { className: 'flex-shrink-0' },
         agent
          ? React.createElement(AgentAvatar, { agent: agent, className: 'w-12 h-12 text-2xl' })
          : React.createElement(
              'div',
              { className: 'w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-sky-400' },
              info.icon
            )
      ),
      React.createElement(
        'div',
        { className: 'flex-1 text-left' },
        React.createElement('h3', { className: 'text-xl font-bold text-slate-100' }, info.title),
        React.createElement('p', { className: 'mt-2 text-slate-400 text-base' }, info.description),
        agent && React.createElement('p', { className: 'mt-2 text-xs font-semibold uppercase', style: { color: agent.color } }, `From: ${agent.name} - ${agent.role}`)
      )
    ),
    React.createElement(
      'div',
      { className: 'mt-4 flex-grow flex flex-col' },
      React.createElement(
        'div',
        { className: 'flex border-b border-slate-700', role: 'tablist', 'aria-label': 'Code Examples' },
        React.createElement(
          'button',
          {
            onClick: () => setActiveTab('cli'),
            className: `px-4 py-2 text-sm font-medium transition-colors focus:outline-none -mb-px ${activeTab === 'cli' ? 'border-b-2 border-sky-400 text-sky-400' : 'text-slate-400 hover:text-white border-b-2 border-transparent'}`,
            role: 'tab',
            'aria-selected': activeTab === 'cli',
            id: 'cli-tab',
            'aria-controls': 'cli-panel',
          },
          'CLI Example'
        ),
        React.createElement(
          'button',
          {
            onClick: () => setActiveTab('api'),
            className: `px-4 py-2 text-sm font-medium transition-colors focus:outline-none -mb-px ${activeTab === 'api' ? 'border-b-2 border-sky-400 text-sky-400' : 'text-slate-400 hover:text-white border-b-2 border-transparent'}`,
            role: 'tab',
            'aria-selected': activeTab === 'api',
            id: 'api-tab',
            'aria-controls': 'api-panel',
          },
          'API Example'
        )
      ),
      React.createElement(
        'div',
        { className: 'mt-4 flex-grow' },
        activeTab === 'cli' && React.createElement('div', { id: 'cli-panel', role: 'tabpanel', 'aria-labelledby': 'cli-tab' }, React.createElement(CodeBlock, { code: info.cliExample })),
        activeTab === 'api' && React.createElement('div', { id: 'api-panel', role: 'tabpanel', 'aria-labelledby': 'api-tab' }, React.createElement(CodeBlock, { code: info.apiExample }))
      )
    )
  );
};

export default DeveloperInfoCard;
