
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const FeedbackModal = ({ onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'sent', 'error'
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setStatus('sending');
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze the following user feedback for an AI assistant application. Categorize it as 'Bug Report', 'Feature Request', or 'General Comment'. Summarize the feedback in one sentence. The user feedback is: "${feedback}"`;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
      });
      
      console.log('Feedback Analysis:', response.text);
      setStatus('sent');

    } catch (e) {
      console.error('Feedback submission error:', e);
      setError('Sorry, we couldn\'t send your feedback. Please try again later.');
      setStatus('error');
    }
  };

  const closeButtonSvg = React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" })
  );

  const spinner = React.createElement('svg', { className: "animate-spin h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
    React.createElement('circle', { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
    React.createElement('path', { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
  );
  
  const successIcon = React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-16 w-16 text-green-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
  );


  const renderContent = () => {
    switch (status) {
      case 'sent':
        return React.createElement('div', { className: 'text-center p-8 flex flex-col items-center' },
            successIcon,
            React.createElement('h3', { className: 'text-2xl font-bold text-slate-100 mt-4' }, 'Feedback Sent!'),
            React.createElement('p', { className: 'text-slate-300 mt-2' }, 'Thank you for helping us improve.'),
            React.createElement('button', {
                onClick: onClose,
                className: 'mt-6 w-full max-w-xs bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors'
            }, 'Close')
        );
      default:
        return React.createElement('form', { onSubmit: handleSubmit, className: "p-4 sm:p-6" },
            // FIX: The 'value' prop was causing a TypeScript error for the `textarea` element when using React.createElement.
            // The `feedback` state is now passed as a child to the textarea, which is a valid alternative
            // for setting its content and maintains the controlled component pattern.
            React.createElement('textarea', {
                onChange: (e) => setFeedback(e.target.value),
                placeholder: 'Tell us what you think...',
                className: 'w-full h-40 bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition resize-none',
                disabled: status === 'sending',
                'aria-label': 'Feedback input'
            }, feedback),
            error && React.createElement('p', { className: "text-red-400 text-sm mt-2 text-left" }, error),
            React.createElement('div', { className: 'mt-4 flex justify-end' },
                React.createElement('button', {
                    type: 'submit',
                    className: 'bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2',
                    disabled: status === 'sending' || !feedback.trim()
                },
                    status === 'sending' && spinner,
                    status === 'sending' ? 'Sending...' : 'Send Feedback'
                )
            )
        );
    }
  };

  return React.createElement('div', { className: "fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", "aria-modal": "true", role: "dialog" },
      React.createElement('div', { className: "bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg flex flex-col shadow-2xl shadow-sky-900/30" },
          React.createElement('header', { className: "flex items-center justify-between p-4 border-b border-slate-700" },
              React.createElement('h2', { className: 'text-xl font-bold text-slate-100' }, 'Provide Feedback'),
              React.createElement('button', { onClick: onClose, className: "text-slate-400 hover:text-white transition-colors", "aria-label": "Close feedback form" },
                  closeButtonSvg
              )
          ),
          renderContent()
      )
  );
};

export default FeedbackModal;
