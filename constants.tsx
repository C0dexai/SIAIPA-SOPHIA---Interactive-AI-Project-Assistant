
import React from 'react';

export const workflowSteps = [
  {
    id: 1,
    title: 'Define Scope & Goals',
    description: "Start with a clear, documented understanding of the project's purpose, key features, target audience, and success metrics.",
    icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-8 h-8' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75' })),
    agentId: 'sophia',
  },
  {
    id: 2,
    title: 'Establish Version Control',
    description: 'Implement Git from day one. Choose a hosting platform and agree on a simple branching strategy.',
    icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-8 h-8' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M6 20.25h12m-7.5-3.75v3.75m3.75-3.75v3.75m-7.5-12v3.75m3.75-3.75v3.75m7.5-3.75v3.75m3.75-3.75v3.75M3 13.5h18v-3H3v3Zm18 0v-3m0 3h-3m-12 0h-3m12 0v-3' })),
    agentId: 'stan',
  },
  {
    id: 3,
    title: 'Set Up Task Management',
    description: 'Select a tool (e.g., Jira, Trello, Asana) to track tasks, bugs, and feature requests. Break down work into actionable items.',
    icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-8 h-8' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' })),
    agentId: 'david',
  },
  {
    id: 4,
    title: 'Define Communication Channels',
    description: 'Decide on primary communication methods (e.g., daily stand-ups, Slack/Teams) to ensure the team stays aligned.',
    icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-8 h-8' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' })),
    agentId: 'bravo',
  },
  {
    id: 5,
    title: 'Implement Basic CI',
    description: 'Set up an automated process early on to build the project and run basic tests whenever code is committed.',
    icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-8 h-8' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.696v4.992h4.992m-4.993 0 3.181-3.183a8.25 8.25 0 0 0-11.667 0l3.181 3.183' })),
    agentId: 'andoy',
  },
  {
    id: 6,
    title: 'Write Code Standards',
    description: 'Agree on basic coding conventions and practices to maintain consistency across the codebase as it grows.',
    icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-8 h-8' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 12' })),
    agentId: 'adam',
  },
];

export const developerInfo = {
  id: 'dev-card',
  title: 'Extend with Gemini',
  description: 'Empower your own applications. Use the Gemini API and CLI to build on what SOPHIA can do.',
  icon: React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-8 h-8' }, React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V5.75A2.25 2.25 0 0 0 18 3.5H6A2.25 2.25 0 0 0 3.75 5.75v12.5A2.25 2.25 0 0 0 6 20.25Z' })),
  cliExample: `
# Conceptual Gemini CLI command
gemini ask "Explain git branching strategies for a team of 5." \\
  --model gemini-2.5-flash \\
  --system "You are a helpful software engineering mentor."
  `.trim(),
  apiExample: `
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Explain git branching strategies',
});

console.log(response.text);
  `.trim(),
  agentId: 'andoy',
};

// Icons for the Handover Module Card
const ContractIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-8 h-8" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" }));
const AgentModuleIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-8 h-8" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" }));
const HandoverLogIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-8 h-8" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }));


export const handoverModuleSpec = {
  title: 'System Operator Handover Module',
  objective: 'A modular orchestration spec where every agent is plug-and-play, leaving breadcrumbs for the next agent and the Operator, ensuring a complete chain of custody for the entire workflow.',
  corePrinciple: {
    title: 'Core Principle: Agents as Taskflow Workers',
    points: [
      'Each worker takes a slice of the orchestration prompt (context).',
      'Performs work (build, patch, debug, enhance).',
      'Writes back into the `handover.json` log.',
      'Passes enriched context to the next worker in the chain.',
    ],
  },
  handoverFlow: [
    { name: 'Orchestration Contract', icon: React.createElement(ContractIcon) },
    { name: 'Agent Module', icon: React.createElement(AgentModuleIcon) },
    { name: 'Handover Log', icon: React.createElement(HandoverLogIcon) },
  ],
  codeExamples: [
    {
      id: 'contract',
      name: 'orchestration.yaml',
      description: 'The master contract defining agents and the high-level workflow.',
      code: `
system_operator:
  registry: ./templates/registry.json
  containers_dir: ./containers

  agents:
    - id: AlphaAgent
      role: "UI/UX specialist"
      affinity: Alpha
      module: ./handover/modules/alpha-agent.yaml

    - id: BravoAgent
      role: "Backend & Ops"
      affinity: Bravo
      module: ./handover/modules/bravo-agent.yaml

    - id: TaskflowAgent
      role: "Coordinator"
      affinity: Both
      module: ./handover/modules/taskflow-agent.yaml

  workflow:
    - step: parse_prompt
      agent: TaskflowAgent
    - step: match_registry
      agent: TaskflowAgent
    - step: create_container
      agent: TaskflowAgent
    - step: build_ui
      agent: AlphaAgent
    - step: setup_services
      agent: BravoAgent
    - step: datastore_integration
      agent: BravoAgent
    - step: finalize_handover
      agent: TaskflowAgent
`.trim(),
    },
    {
      id: 'module',
      name: 'alpha-agent.yaml',
      description: 'A modular definition for a specific agent, detailing its capabilities, inputs, and outputs.',
      code: `
agent:
  name: AlphaAgent
  affinity: Alpha
  capabilities:
    - "Assemble frontend templates"
    - "Apply UI libraries (Tailwind, ShadCN)"
    - "Enhance UX with animations and components"
  inputs:
    - container_id
    - chosen_templates.ui
    - prompt_context
  outputs:
    - updated_src_files
    - ui_notes
    - handover_entry
  handover_schema:
    action: "ui-update"
    by: "AlphaAgent"
    details:
      template_used: string
      components_added: array
      notes: string
`.trim(),
    },
    {
      id: 'log',
      name: 'handover.json',
      description: 'The living project diary, an evolving JSON file that tracks every action taken by every agent.',
      code: `
{
  "container_id": "container_a1b2c3d4",
  "operator": "andoy",
  "prompt": "Build fancy to-do app with React + Tailwind + IndexedDB",
  "chosen_templates": {
    "base": "REACT",
    "ui": ["TAILWIND"],
    "datastore": "IndexedDB"
  },
  "history": [
    {
      "action": "create",
      "by": "TaskflowAgent",
      "at": "2025-08-16T10:00:00Z",
      "details": { "container": "initialized" }
    },
    {
      "action": "ui-update",
      "by": "AlphaAgent",
      "at": "2025-08-16T10:05:00Z",
      "details": {
        "template_used": "REACT",
        "components_added": ["ToDoList", "GlassCard"],
        "notes": "Applied Tailwind glassmorphism."
      }
    },
    {
      "action": "service-setup",
      "by": "BravoAgent",
      "at": "2025-08-16T10:10:00Z",
      "details": {
        "service": "NODE_EXPRESS",
        "endpoint": "/api/tasks",
        "notes": "Express server created."
      }
    }
  ]
}
`.trim(),
    },
  ],
  summaryQuote: 'With this structure, the System Operator can manage agents like modules, see `handover.json` as the living project diary, and scale the ecosystem by just dropping new agent modules into the handover directory.',
};

// New Icons for the Orchestration Card
const ApiIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-8 h-8" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" }));
const KnowledgeIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-8 h-8" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 0-7.5 0c-1.278 0-2.417.158-3.512.463M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }));
const SupervisionIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-8 h-8" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-4.43a1.012 1.012 0 0 1 1.432 1.432L5.478 12l2.42 2.42a1.012 1.012 0 0 1-1.432 1.432l-4.43-4.43Zm19.928 0a1.012 1.012 0 0 0 0-.639l-4.43-4.43a1.012 1.012 0 0 0-1.432 1.432L18.522 12l-2.42 2.42a1.012 1.012 0 0 0 1.432 1.432l4.43-4.43Z" }));
const DocsIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-8 h-8" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" }));

export const orchestrationFeature = {
    title: 'Cross-Domain AI Orchestration',
    objective: 'Enable seamless, supervised, and autonomous collaboration between AI agents operating across two distinct domains, coordinating updates, upgrades, and knowledge synchronization using both GEMINI and OPENAI as foundational intelligence engines.',
    pillars: [
        {
            title: 'API-Based Orchestration',
            description: 'Secure REST API endpoints for communication and data transfer. All tasks are triggered and tracked via API calls for real-time updates and traceability.',
            icon: React.createElement(ApiIcon)
        },
        {
            title: 'Autonomous Knowledge Management',
            description: 'Agents monitor for knowledge changes, autonomously triggering cross-domain pushes or pulls to maintain harmonized, up-to-date information.',
            icon: React.createElement(KnowledgeIcon)
        },
        {
            title: 'Supervised Guidance',
            description: 'GEMINI and OPENAI act as supervisory "meta agents," providing oversight, arbitrating conflicts, and augmenting context for sophisticated inferences.',
            icon: React.createElement(SupervisionIcon)
        },
        {
            title: 'Continuous Documentation Workflow',
            description: 'Presentation assets and documents are version-controlled and automatically updated, ensuring they reflect the latest intelligence and standards.',
            icon: React.createElement(DocsIcon)
        },
    ],
    a2a: {
        title: 'Agent-to-Agent (A2A) Coordination',
        description: 'Designated agents autonomously negotiate updates, synchronize workflows, and escalate issues, maintaining a "context ledger" to preserve nuance, intent, and task rationale.',
        agentA: 'lyra',
        agentB: 'kara',
    },
    summaryQuote: 'This system orchestrates agent-to-agent automation and knowledge management across two domains via API, leveraging supervised cross-relational intelligence from GEMINI and OPENAI for fully autonomous, contextual, and auditable updates and documentation workflows.'
};
