
import React from 'react';
import { agents } from '../agents';
import ProfileCard from './ProfileCard';

const FamilyView = ({ onConsultAgent }) => {
  const agentList = Object.values(agents);

  return React.createElement(
    'div',
    { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' },
    ...agentList.map(agent =>
      React.createElement(ProfileCard, { key: agent.id, agent: agent, onConsult: onConsultAgent })
    )
  );
};

export default FamilyView;
