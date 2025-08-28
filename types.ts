
import type { ReactNode } from 'react';

export interface Agent {
  id: string;
  name: string;
  gender: string;
  role: string;
  skills: string[];
  personality_prompt: string;
  color: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  agentId: string;
}

export type MessageAuthor = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  author: MessageAuthor;
  text: string;
}

export interface ChatContext {
    id: string;
    title: string;
    description: string;
}

export interface DeveloperInfo {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  cliExample: string;
  apiExample: string;
  agentId: string;
}
