
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AILoader = () => (
  <div className="flex flex-col items-start gap-4 py-3">
    <div className="relative flex items-center justify-center w-10 h-10">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-[#a8fbd3] rounded-full"
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ 
            opacity: 0, 
            scale: 2.2,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
        />
      ))}
      <motion.div 
        className="relative z-10 w-8 h-8 bg-[#a8fbd3] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,251,211,0.5)]"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Cpu className="w-4 h-4 text-black" />
      </motion.div>
    </div>
    <div className="flex items-center gap-2">
      <motion.span 
        className="text-[9px] font-mono text-[#a8fbd3] uppercase tracking-[0.2em] font-bold"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Neural Core Processing
      </motion.span>
    </div>
  </div>
);

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings. I am REM-AI. How can I optimize your growth strategy today? 📈' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    // Updated bottom position for mobile (bottom-24) to account for Mobile Nav Bar
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[100] flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-32px)] md:w-[400px] bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
          >
            {/* Header */}
            <div className="bg-white text-black p-5 md:p-6 flex justify-between items-center relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 bg-black rounded-xl shadow-lg">
                  <Cpu className="w-4 h-4 text-[#a8fbd3]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase leading-none">REM-AI CONSULTANT</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[7px] font-mono uppercase opacity-50 tracking-[0.2em] font-bold">Encrypted Link</span>
                  </div>
                </div>
              </div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={22} />
              </motion.button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-[350px] md:h-[450px] overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar bg-gradient-to-b from-transparent to-white/[0.02]"
            >
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 md:p-5 text-[13px] md:text-sm leading-relaxed relative ${
                      msg.role === 'user'
                        ? 'bg-[#a8fbd3] text-black rounded-2xl rounded-tr-none font-bold shadow-[0_10px_30px_rgba(168,251,211,0.1)]'
                        : 'bg-white/5 text-gray-200 rounded-2xl rounded-tl-none border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <AILoader />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-5 md:p-6 border-t border-white/5 bg-black/40">
              <div className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-full p-1.5 pl-6 group focus-within:border-[#a8fbd3]/40 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Ask for strategic analysis..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-[11px] md:text-xs focus:outline-none tracking-wide"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#a8fbd3] w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center disabled:opacity-20 transition-all shadow-[0_0_20px_rgba(168,251,211,0.3)]"
                >
                  <Send size={18} className="text-black" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-white flex items-center justify-center shadow-2xl z-50 group overflow-hidden transition-colors ${isOpen ? 'bg-white' : 'hover:bg-[#a8fbd3]'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#a8fbd3]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X size={26} className="text-black relative z-10" />
        ) : (
          <div className="relative z-10">
             <MessageSquare size={26} className="text-black" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#a8fbd3] rounded-full border-2 border-white shadow-lg animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
