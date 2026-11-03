import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! How can I help you with WeVersity today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-[#6D28D9] text-white shadow-xl hover:bg-[#5B21B6] transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-80 h-96 bg-white border border-purple-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 bg-purple-50 border-b border-purple-100 flex items-center justify-between">
            <h4 className="font-bold text-gray-900">WeVersity Bot</h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm p-3 rounded-2xl ${m.role === 'user' ? 'bg-purple-100 text-purple-900 self-end ml-auto' : 'bg-gray-100 text-gray-900'}`}>
                {m.text}
              </div>
            ))}
            {isLoading && <div className="text-sm text-gray-500">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-purple-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow text-sm border border-purple-100 rounded-xl px-3 py-2 focus:outline-none"
              placeholder="Type a message..."
            />
            <button onClick={handleSend} className="p-2 rounded-xl bg-[#6D28D9] text-white">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
