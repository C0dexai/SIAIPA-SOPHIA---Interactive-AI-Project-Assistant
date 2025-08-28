


import React from 'react';

const SophiaHeader = ({ view, setView }) => {
  const headerContent = view === 'workflow'
    ? {
        title: 'Hello, I am SOPHIA',
        subtitle: "As your project kickoff assistant, I've outlined key starting points below. Click any step for a detailed, interactive explanation.",
        avatar: 'https://picsum.photos/id/177/128/128',
        alt: 'SOPHIA Avatar'
      }
    : {
        title: 'Meet the CASSA VEGAS Crew',
        subtitle: "Every member of the family has a role. These are the specialists who bring our projects to life. Select a member to consult with them directly.",
        avatar: 'https://i.pravatar.cc/128?u=cassa-vegas',
        alt: 'CASSA VEGAS Emblem'
      };

  return React.createElement(
    'header',
    { className: 'flex flex-col items-center text-center py-8' },
    React.createElement(
      'div',
      { className: 'relative mb-4' },
      React.createElement('img', {
        src: headerContent.avatar,
        alt: headerContent.alt,
        className: 'w-24 h-24 rounded-full border-4 border-slate-700 shadow-lg',
      }),
      view === 'workflow' && React.createElement('span', { className: 'absolute bottom-0 right-0 block h-6 w-6 rounded-full bg-green-500 border-2 border-slate-900 ring-2 ring-green-400' })
    ),
    React.createElement(
      'h1',
      { className: 'text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300' },
      headerContent.title
    ),
    React.createElement(
      'p',
      { className: 'mt-4 text-lg text-slate-300 max-w-2xl' },
      headerContent.subtitle
    ),
    view === 'workflow' && React.createElement(
        'button',
        {
            onClick: () => setView('family'),
            className: 'mt-4 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors'
        },
        "Curious who's behind these steps? Meet the Crew →"
    )
  );
};

export default SophiaHeader;