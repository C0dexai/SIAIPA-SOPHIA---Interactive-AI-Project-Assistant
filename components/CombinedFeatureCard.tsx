
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
            React.createElement('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' })
          )
        : React.createElement(
            'svg',
            { xmlns: 'http://www.w3.org/2000/svg', className: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' })
          )
    )
  );
};

const TabButton = ({ isActive, onClick, children }) => {
    const activeClasses = 'border-sky-400 text-sky-400';
    const inactiveClasses = 'border-transparent text-slate-400 hover:text-white hover:border-slate-500';
    return React.createElement('button', {
        onClick,
        className: `px-4 py-3 text-base sm:text-lg font-semibold transition-colors focus:outline-none border-b-2 ${isActive ? activeClasses : inactiveClasses}`,
        role: 'tab',
        'aria-selected': isActive
    }, children);
};

const HandoverFlowDiagram = ({ flow }) => {
    return React.createElement('div', { className: 'flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 my-8' },
        ...flow.flatMap((step, index) => {
            const stepElement = React.createElement('div', { key: step.name, className: 'flex flex-col items-center text-center p-4 w-48' },
                React.createElement('div', { className: 'w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-sky-400 mb-2 border-2 border-slate-600' }, step.icon),
                React.createElement('h4', { className: 'text-lg font-bold text-slate-100' }, step.name),
            );

            if (index < flow.length - 1) {
                return [
                    stepElement,
                    React.createElement('div', { key: `arrow-${index}`, className: 'text-slate-500 transform md:rotate-0 rotate-90' },
                        React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-10 h-10" },
                            React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" })
                        )
                    )
                ];
            }
            return [stepElement];
        })
    );
};


const CombinedFeatureCard = ({ handoverSpec, developerInfo }) => {
    const [activeTab, setActiveTab] = useState('handover');
    const [devActiveTab, setDevActiveTab] = useState('cli');
    const [codeActiveTab, setCodeActiveTab] = useState(handoverSpec.codeExamples[0].id);

    const devAgent = agents[developerInfo.agentId];

    const HandoverModuleContent = () => (
        React.createElement('div', { key: 'handover' },
            React.createElement('div', { className: 'text-center mb-8' },
                React.createElement('h3', { className: 'text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300' }, handoverSpec.title),
                React.createElement('p', { className: 'mt-2 text-slate-300 max-w-4xl mx-auto' }, handoverSpec.objective)
            ),
            React.createElement('div', { className: 'bg-slate-900/50 rounded-lg p-6 my-8 border border-slate-700/50' },
                React.createElement('h4', { className: 'text-xl font-bold text-center text-slate-100 mb-4' }, handoverSpec.corePrinciple.title),
                React.createElement('ul', { className: 'space-y-2 list-disc list-inside text-slate-400 max-w-2xl mx-auto' },
                   ...handoverSpec.corePrinciple.points.map(point => React.createElement('li', { key: point }, point))
                )
            ),
            React.createElement(HandoverFlowDiagram, { flow: handoverSpec.handoverFlow }),
            React.createElement('div', { className: 'bg-slate-900/50 rounded-lg p-6 my-8 border border-slate-700/50' },
                React.createElement('h4', { className: 'text-xl font-bold text-center text-slate-100 mb-2' }, "The Handover Artifacts"),
                React.createElement('p', { className: 'text-center text-slate-400 text-sm mb-6 max-w-2xl mx-auto' }, "The process relies on structured files that define the workflow, agent capabilities, and the project's history."),
                React.createElement('div', { className: 'flex border-b border-slate-700 justify-center mb-4 flex-wrap', role: 'tablist' },
                    ...handoverSpec.codeExamples.map(example => React.createElement('button', {
                        key: example.id,
                        onClick: () => setCodeActiveTab(example.id),
                        className: `px-4 py-2 text-sm font-medium transition-colors focus:outline-none -mb-px ${codeActiveTab === example.id ? 'border-b-2 border-sky-400 text-sky-400' : 'text-slate-400 hover:text-white border-b-2 border-transparent'}`,
                        role: 'tab',
                        'aria-selected': codeActiveTab === example.id
                    }, example.name))
                ),
                React.createElement('div', { className: 'mt-4' },
                    (() => {
                        const activeExample = handoverSpec.codeExamples.find(ex => ex.id === codeActiveTab);
                        return React.createElement('div', { key: activeExample.id, className: 'animate-[fadeIn_0.5s_ease-in-out]' },
                            React.createElement('p', { className: 'text-slate-400 text-center mb-4' }, activeExample.description),
                            React.createElement(CodeBlock, { code: activeExample.code })
                        );
                    })()
                )
            ),
            React.createElement('blockquote', { className: 'mt-8 border-l-4 border-slate-600 pl-4' },
                React.createElement('p', { className: 'text-slate-400 italic' }, handoverSpec.summaryQuote)
            )
        )
    );

    const DeveloperInfoContent = () => (
         React.createElement('div', { key: 'developer' },
            React.createElement('div', { className: 'flex items-start space-x-4' },
                React.createElement('div', { className: 'flex-shrink-0' },
                    devAgent
                        ? React.createElement(AgentAvatar, { agent: devAgent, className: 'w-12 h-12 text-2xl' })
                        : React.createElement('div', { className: 'w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-sky-400' }, developerInfo.icon)
                ),
                React.createElement('div', { className: 'flex-1 text-left' },
                    React.createElement('h3', { className: 'text-xl font-bold text-slate-100' }, developerInfo.title),
                    React.createElement('p', { className: 'mt-2 text-slate-400 text-base' }, developerInfo.description),
                    devAgent && React.createElement('p', { className: 'mt-2 text-xs font-semibold uppercase', style: { color: devAgent.color } }, `From: ${devAgent.name} - ${devAgent.role}`)
                )
            ),
            React.createElement('div', { className: 'mt-4 flex-grow flex flex-col' },
                React.createElement('div', { className: 'flex border-b border-slate-700', role: 'tablist', 'aria-label': 'Code Examples' },
                    React.createElement('button', { onClick: () => setDevActiveTab('cli'), className: `px-4 py-2 text-sm font-medium transition-colors focus:outline-none -mb-px ${devActiveTab === 'cli' ? 'border-b-2 border-sky-400 text-sky-400' : 'text-slate-400 hover:text-white border-b-2 border-transparent'}`, role: 'tab', 'aria-selected': devActiveTab === 'cli', id: 'cli-tab', 'aria-controls': 'cli-panel' }, 'CLI Example'),
                    React.createElement('button', { onClick: () => setDevActiveTab('api'), className: `px-4 py-2 text-sm font-medium transition-colors focus:outline-none -mb-px ${devActiveTab === 'api' ? 'border-b-2 border-sky-400 text-sky-400' : 'text-slate-400 hover:text-white border-b-2 border-transparent'}`, role: 'tab', 'aria-selected': devActiveTab === 'api', id: 'api-tab', 'aria-controls': 'api-panel' }, 'API Example')
                ),
                React.createElement('div', { className: 'mt-4 flex-grow' },
                    devActiveTab === 'cli' && React.createElement('div', { id: 'cli-panel', role: 'tabpanel', 'aria-labelledby': 'cli-tab' }, React.createElement(CodeBlock, { code: developerInfo.cliExample })),
                    devActiveTab === 'api' && React.createElement('div', { id: 'api-panel', role: 'tabpanel', 'aria-labelledby': 'api-tab' }, React.createElement(CodeBlock, { code: developerInfo.apiExample }))
                )
            )
        )
    );

    return React.createElement('div', { className: 'bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 border border-slate-700/50 flex flex-col col-span-1 md:col-span-2 lg:col-span-3 shadow-2xl shadow-sky-900/30' },
        React.createElement('div', { className: 'flex border-b border-slate-700 mb-6', role: 'tablist', 'aria-label': 'Feature Sections' },
            React.createElement(TabButton, { isActive: activeTab === 'handover', onClick: () => setActiveTab('handover'), children: 'Handover Module' }),
            React.createElement(TabButton, { isActive: activeTab === 'developer', onClick: () => setActiveTab('developer'), children: 'Extend with Gemini' })
        ),
        React.createElement('div', { className: 'flex-grow' },
            activeTab === 'handover' && React.createElement(HandoverModuleContent, {}),
            activeTab === 'developer' && React.createElement(DeveloperInfoContent, {})
        )
    );
};

export default CombinedFeatureCard;
