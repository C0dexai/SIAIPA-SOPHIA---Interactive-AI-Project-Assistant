


import React, { useState } from 'react';
import { workflowSteps, developerInfo, handoverModuleSpec } from './constants';
import { agents } from './agents';
import SophiaHeader from './components/SophiaHeader';
import WorkflowStepCard from './components/WorkflowStepCard';
import ChatModal from './components/ChatModal';
import FamilyView from './components/FamilyView';
import CombinedFeatureCard from './components/CombinedFeatureCard';
import FeedbackModal from './components/FeedbackModal';
import WorkflowProgress from './components/WorkflowProgress';

const NavButton = ({ targetView, currentView, setView, children }) => {
  const isActive = targetView === currentView;
  const activeClasses = 'bg-slate-700 text-white';
  const inactiveClasses = 'bg-slate-800 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300';
  return React.createElement(
    'button',
    {
      onClick: () => setView(targetView),
      className: `px-4 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${isActive ? activeClasses : inactiveClasses}`,
    },
    children
  );
};

const App = () => {
  const [view, setView] = useState('workflow');
  const [chatContext, setChatContext] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleToggleComplete = (stepId: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const handleWorkflowClick = (step) => {
    setChatContext({ id: `workflow-${step.id}`, title: step.title, description: step.description });
    setActiveAgent(agents[step.agentId]);
  };

  const handleConsultAgent = (agent) => {
    setChatContext({
      id: `agent-${agent.id}`,
      title: `Consulting with ${agent.name}`,
      description: `This is a direct consultation with ${agent.name}, specialist in ${agent.skills.join(', ')}.`,
    });
    setActiveAgent(agent);
  };

  const handleCloseModal = () => {
    setChatContext(null);
    setActiveAgent(null);
  };

  const mainContent = view === 'workflow'
    ? React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' },
        ...workflowSteps.map((step) =>
          React.createElement(
            'div',
            {
              key: step.id,
              onClick: () => handleWorkflowClick(step),
              className: 'cursor-pointer h-full',
              role: 'button',
              'aria-label': `Learn more about ${step.title}`,
              tabIndex: 0,
              onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && handleWorkflowClick(step),
            },
            React.createElement(WorkflowStepCard, { 
              step: step,
              isCompleted: completedSteps.includes(step.id),
              onToggleComplete: handleToggleComplete
            })
          )
        ),
        React.createElement(CombinedFeatureCard, { handoverSpec: handoverModuleSpec, developerInfo: developerInfo })
      )
    : React.createElement(FamilyView, { onConsultAgent: handleConsultAgent });

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8' },
    React.createElement(
      'div',
      { className: 'max-w-7xl mx-auto' },
      React.createElement(SophiaHeader, { view: view, setView: setView }),
      React.createElement(
        'nav',
        { className: 'my-8 flex justify-center' },
        React.createElement(
          'div',
          { className: 'flex space-x-2 bg-slate-800 p-1 rounded-lg' },
          React.createElement(NavButton, { targetView: 'workflow', currentView: view, setView: setView, children: 'Project Workflow' }),
          React.createElement(NavButton, { targetView: 'family', currentView: view, setView: setView, children: 'Meet the Crew' })
        )
      ),
      React.createElement(
        'main',
        null,
        view === 'workflow' && React.createElement(WorkflowProgress, {
          completedCount: completedSteps.length,
          totalCount: workflowSteps.length
        }),
        mainContent
      ),
      React.createElement(
        'footer',
        { className: 'mt-16 text-center text-slate-400' },
        React.createElement(
          'p',
          { className: 'max-w-2xl mx-auto' },
          view === 'workflow'
            ? 'Select a workflow step above to dive deeper and discuss it with one of our specialists.'
            : 'Select a crew member to consult with them directly about their area of expertise.'
        ),
        React.createElement(
          'button',
          {
            onClick: () => setIsFeedbackModalOpen(true),
            className: 'mt-6 text-sm font-semibold text-slate-400 hover:text-sky-400 transition-colors underline decoration-dotted underline-offset-4'
          },
          'Send Feedback'
        )
      )
    ),
    chatContext && activeAgent && React.createElement(ChatModal, { context: chatContext, agent: activeAgent, onClose: handleCloseModal }),
    isFeedbackModalOpen && React.createElement(FeedbackModal, { onClose: () => setIsFeedbackModalOpen(false) })
  );
};

export default App;