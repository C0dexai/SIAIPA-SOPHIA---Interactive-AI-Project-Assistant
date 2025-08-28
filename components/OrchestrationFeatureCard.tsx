
import React from 'react';
import { agents } from '../agents';
import AgentAvatar from './AgentAvatar';

const Pillar = ({ pillar }) => {
    return React.createElement('div', { className: 'flex items-start space-x-4' },
        React.createElement('div', { className: 'flex-shrink-0 w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-sky-400' }, pillar.icon),
        React.createElement('div', null,
            React.createElement('h4', { className: 'text-lg font-bold text-slate-100' }, pillar.title),
            React.createElement('p', { className: 'mt-1 text-slate-400 text-base' }, pillar.description)
        )
    );
};

const OrchestrationFeatureCard = ({ feature }) => {
    const agentA = agents[feature.a2a.agentA];
    const agentB = agents[feature.a2a.agentB];

    const GeminiIcon = () => React.createElement('svg', { viewBox: "0 0 24 24", className:"w-6 h-6 text-slate-300", fill: "currentColor" },
        React.createElement('path', { d: "M12.55,12.06L12,10.93L11.45,12.06L10.33,12.61L11.45,13.16L12,14.29L12.55,13.16L13.67,12.61M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M17.5,17.5H6.5V6.5H17.5V17.5M16.14,12.61L15,13.16L14.45,14.29L13.9,13.16L12.78,12.61L13.9,12.06L14.45,10.93L15,12.06L16.14,12.61M9.67,8.39L9.12,7.26L8.57,8.39L7.45,8.94L8.57,9.5L9.12,10.62L9.67,9.5L10.79,8.94L9.67,8.39Z" })
    );

    const OpenAiIcon = () => React.createElement('svg', { viewBox: "0 0 24 24", className:"w-6 h-6 text-slate-300", fill: "currentColor" },
        React.createElement('path', { d: "M20.24,14.24C22.28,12.2 22.28,8.8 20.24,6.76C18.2,4.72 14.8,4.72 12.76,6.76L11.25,8.27L12.76,9.78L15,7.54C16.17,6.37 18.03,6.37 19.2,7.54C20.37,8.71 20.37,10.57 19.2,11.74L11.25,19.69L6.76,15.2C5.59,14.03 5.59,12.17 6.76,11L8.27,9.5L6.76,8L4.72,10C2.68,12.04 2.68,15.44 4.72,17.48C6.76,19.52 10.16,19.52 12.2,17.48L15,14.69L17.78,11.91L20.24,14.24M11,6C9.9,6 9,6.9 9,8C9,9.1 9.9,10 11,10C12.1,10 13,9.1 13,8C13,6.9 12.1,6 11,6Z" })
    );


    return React.createElement('div', { className: 'col-span-1 md:col-span-2 lg:col-span-3' },
        React.createElement('div', { className: 'bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-sky-500/30 shadow-2xl shadow-sky-900/30' },
            React.createElement('div', { className: 'text-center mb-8' },
                React.createElement('h3', { className: 'text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300' }, feature.title),
                React.createElement('p', { className: 'mt-2 text-slate-300 max-w-4xl mx-auto' }, feature.objective)
            ),

            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-8 mb-12' },
                ...feature.pillars.map(pillar => React.createElement(Pillar, { key: pillar.title, pillar: pillar }))
            ),
            
            React.createElement('div', { className: 'bg-slate-900/50 rounded-lg p-6 my-8 border border-slate-700/50' },
                React.createElement('h4', { className: 'text-xl font-bold text-center text-slate-100 mb-2' }, feature.a2a.title),
                 React.createElement('p', { className: 'text-center text-slate-400 text-sm mb-6 max-w-2xl mx-auto' }, feature.a2a.description),
                React.createElement('div', { className: 'flex items-center justify-around' },
                    React.createElement('div', { className: 'flex flex-col items-center text-center' },
                        React.createElement(AgentAvatar, { agent: agentA, className: 'w-20 h-20 text-3xl' }),
                        React.createElement('p', { className: 'font-bold mt-2 text-slate-200' }, agentA.name),
                        React.createElement('p', { className: 'text-xs', style: { color: agentA.color } }, agentA.role),
                    ),
                    React.createElement('div', { className: 'flex flex-col items-center text-slate-500 flex-grow mx-4' },
                        React.createElement('p', { className: 'text-sm font-semibold mb-1' }, 'REST API'),
                        React.createElement('div', { className: 'w-full h-px bg-slate-600 relative' },
                           React.createElement('div', { className: 'absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-500' }),
                           React.createElement('div', { className: 'absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-500' })
                        ),
                        React.createElement('p', { className: 'text-xs mt-1' }, 'Context Handoff'),
                    ),
                    React.createElement('div', { className: 'flex flex-col items-center text-center' },
                        React.createElement(AgentAvatar, { agent: agentB, className: 'w-20 h-20 text-3xl' }),
                        React.createElement('p', { className: 'font-bold mt-2 text-slate-200' }, agentB.name),
                        React.createElement('p', { className: 'text-xs', style: { color: agentB.color } }, agentB.role),
                    )
                ),
                React.createElement('div', { className: 'mt-6 text-center' },
                    React.createElement('h5', { className: 'text-slate-300 font-semibold text-sm mb-2' }, 'Supervised by Meta Agents'),
                    React.createElement('div', { className: 'flex items-center justify-center gap-4' },
                        React.createElement('div', { className: 'flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full' },
                            React.createElement(GeminiIcon, {}),
                            React.createElement('span', { className: 'text-sm text-slate-300 font-medium' }, 'GEMINI')
                        ),
                        React.createElement('div', { className: 'flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-full' },
                             React.createElement(OpenAiIcon, {}),
                            React.createElement('span', { className: 'text-sm text-slate-300 font-medium' }, 'OPENAI')
                        )
                    )
                )
            ),

            React.createElement('blockquote', { className: 'mt-8 border-l-4 border-slate-600 pl-4' },
                React.createElement('p', { className: 'text-slate-400 italic' }, feature.summaryQuote)
            )
        )
    );
};

export default OrchestrationFeatureCard;
