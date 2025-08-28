
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { marked } from 'marked';
import AgentAvatar from './AgentAvatar';
import { initDB, getMessages, addMessage, clearMessages } from '../utils/db';
import type { ChatMessage } from '../types';

const ChatModal = ({ context, agent, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDbReady, setIsDbReady] = useState(false);
  const [chatVersion, setChatVersion] = useState(0);
  const chatSession = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initDB().then(() => setIsDbReady(true)).catch(err => {
        setError("Could not initialize local database for chat history.");
        console.error(err);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!isDbReady || !context || !agent) return;

    const initChat = async () => {
      try {
        setError(null);
        setIsLoading(true);
        setMessages([]);

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const historyFromDb = await getMessages(context.id);
        const genAiHistory = historyFromDb.map(msg => ({
            role: msg.author === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        const systemInstruction = `${agent.personality_prompt} Your family is CASSA VEGAS. You are an expert in your role. Your current task is to discuss: "${context.title}". Keep your tone consistent with your personality.`;

        chatSession.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction: systemInstruction },
          history: genAiHistory
        });

        if (historyFromDb.length > 0) {
            setMessages(historyFromDb);
        } else {
            const initialPrompt = `As a specialist in your role, introduce yourself based on your persona. Your current task is to discuss: "${context.title}". The user has this initial context: "${context.description}". Provide a detailed, helpful response. Give them actionable advice and best practices relevant to the topic and your skills. Format your response using markdown.`;
            const stream = await chatSession.current.sendMessageStream({ message: initialPrompt });

            let currentResponse = '';
            const initialAiMessageId = `ai-initial-${Date.now()}`;
            setMessages([{ author: 'ai', text: '', id: initialAiMessageId }]);

            for await (const chunk of stream) {
              currentResponse += chunk.text;
              setMessages([{ author: 'ai', text: currentResponse, id: initialAiMessageId }]);
            }
            await addMessage(context.id, { author: 'ai', text: currentResponse });
            const updatedMessages = await getMessages(context.id);
            setMessages(updatedMessages);
        }

      } catch (e) {
        console.error('Failed to initialize chat:', e);
        let errorMessage = 'Sorry, something went wrong while starting the conversation. Please try again later.';
        const errorString = String(e);
        if (errorString.includes('429') || /resource.*exhausted/i.test(errorString)) {
            errorMessage = 'You have exceeded the request limit. Please wait a moment before trying again.';
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [context, agent, isDbReady, chatVersion]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSession.current) return;

    const userMessageText = input;
    const userMessageForState: ChatMessage = { author: 'user', text: userMessageText, id: `user-${Date.now()}` };
    const loadingAiMessage: ChatMessage = { author: 'ai', text: '', id: 'ai-loading' };
    
    setMessages(prev => [...prev, userMessageForState, loadingAiMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    addMessage(context.id, { author: 'user', text: userMessageText }).catch(console.error);

    try {
      const stream = await chatSession.current.sendMessageStream({ message: userMessageText });
      let currentResponse = '';
      for await (const chunk of stream) {
        currentResponse += chunk.text;
        setMessages(prev => 
          prev.map(msg =>
            msg.id === 'ai-loading' ? { ...msg, text: currentResponse } : msg
          )
        );
      }

      await addMessage(context.id, { author: 'ai', text: currentResponse });
      setMessages(prev =>
        prev.map(msg => {
          if (msg.id === 'ai-loading') {
            const finalMessage: ChatMessage = { author: 'ai', text: currentResponse, id: `ai-${Date.now()}` };
            return finalMessage;
          }
          return msg;
        })
      );

    } catch (e) {
      console.error('Failed to send message:', e);
      let errorMessage = 'Sorry, there was an issue getting a response. Please check your connection or try again.';
      const errorString = String(e);
      if (errorString.includes('429') || /resource.*exhausted/i.test(errorString)) {
        errorMessage = 'You have exceeded the request limit. Please wait a moment and try again.';
      }
      setError(errorMessage);
      setMessages(prev => prev.filter(m => m.id !== userMessageForState.id && m.id !== 'ai-loading'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
      if (!window.confirm("Are you sure you want to clear this chat history? This cannot be undone.")) {
          return;
      }
      setIsLoading(true);
      try {
          await clearMessages(context.id);
          chatSession.current = null;
          setMessages([]);
          setChatVersion(v => v + 1);
      } catch (e) {
          console.error("Failed to clear history:", e);
          setError("Could not clear chat history.");
          setIsLoading(false);
      }
  }

  const closeButtonSvg = React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" })
  );
  
  const clearHistorySvg = React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5" },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" })
  );

  const loadingDots = React.createElement('div', { className: "flex items-center gap-2" },
      React.createElement('span', { className: "w-2 h-2 rounded-full animate-pulse delay-75", style: { backgroundColor: agent.color } }),
      React.createElement('span', { className: "w-2 h-2 rounded-full animate-pulse delay-150", style: { backgroundColor: agent.color } }),
      React.createElement('span', { className: "w-2 h-2 rounded-full animate-pulse delay-300", style: { backgroundColor: agent.color } })
  );
  
  const sendButtonSvg = React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" })
  );

  return React.createElement('div', { className: "fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", "aria-modal": "true", role: "dialog" },
    React.createElement('div', { className: "bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-3xl h-full max-h-[90vh] flex flex-col shadow-2xl shadow-sky-900/30" },
      React.createElement('header', { className: "flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0" },
        React.createElement('div', { className: "flex items-center gap-3" },
          React.createElement(AgentAvatar, { agent: agent, className: "w-10 h-10 text-xl" }),
          React.createElement('div', null,
            React.createElement('h2', { className: "text-xl font-bold text-slate-100" }, context.title),
            React.createElement('p', { className: "text-sm font-semibold", style: { color: agent.color } }, `${agent.name} - ${agent.role}`)
          )
        ),
        React.createElement('div', { className: 'flex items-center gap-2' },
            messages.length > 0 && React.createElement('button', { onClick: handleClearHistory, className: "text-slate-400 hover:text-red-400 transition-colors", "aria-label": "Clear chat history", disabled: isLoading },
              clearHistorySvg
            ),
            React.createElement('button', { onClick: onClose, className: "text-slate-400 hover:text-white transition-colors", "aria-label": "Close chat" },
              closeButtonSvg
            )
        )
      ),
      React.createElement('div', { className: "flex-grow p-4 overflow-y-auto space-y-6" },
        ...messages.map((msg, index) =>
          React.createElement('div', { key: msg.id || index, className: `flex items-end gap-3 ${msg.author === 'user' ? 'justify-end' : 'justify-start'}` },
            msg.author === 'ai' && React.createElement(AgentAvatar, { agent: agent }),
            React.createElement('div', {
              className: `prose prose-invert prose-sm sm:prose-base max-w-xl rounded-xl px-4 py-2 ${msg.author === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-700/50 text-slate-200'} ${msg.id === 'ai-loading' ? 'italic' : ''}`,
              dangerouslySetInnerHTML: { __html: msg.id === 'ai-loading' ? '' : marked.parse(msg.text) }
            }, msg.id === 'ai-loading' && loadingDots)
          )
        ),
        isLoading && messages.length === 0 && React.createElement('div', { className: "flex items-end gap-3 justify-start" },
            React.createElement(AgentAvatar, { agent: agent }),
            React.createElement('div', { className: "px-4 py-2 bg-slate-700/50 text-slate-400 rounded-xl" },
                loadingDots
            )
        ),
        error && React.createElement('p', { className: "text-red-400 text-center" }, error),
        React.createElement('div', { ref: messagesEndRef })
      ),
      React.createElement('form', { onSubmit: handleSubmit, className: "p-4 border-t border-slate-700 flex-shrink-0" },
        React.createElement('div', { className: "relative" },
          React.createElement('input', {
            type: "text",
            value: input,
            onChange: (e) => setInput(e.target.value),
            placeholder: `Ask ${agent.name} a question...`,
            className: "w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 pl-4 pr-12 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition",
            disabled: isLoading
          }),
          React.createElement('button', { type: "submit", className: "absolute inset-y-0 right-0 flex items-center justify-center w-12 text-slate-400 hover:text-sky-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors", disabled: isLoading || !input.trim(), "aria-label": "Send message" },
            sendButtonSvg
          )
        )
      )
    )
  );
};

export default ChatModal;
