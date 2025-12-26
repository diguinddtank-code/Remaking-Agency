
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Brain, Database, DollarSign, ArrowRight, Zap, Check } from 'lucide-react';

const steps = [
  { 
    id: 1, 
    label: 'Inbound Lead', 
    icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />, 
    desc: 'Customer sends a DM or fills a form.',
    color: 'text-white'
  },
  { 
    id: 2, 
    label: 'Neural Analysis', 
    icon: <Brain className="w-5 h-5 md:w-6 md:h-6" />, 
    desc: 'AI qualifies intent & sentiment instantly.',
    color: 'text-[#a8fbd3]'
  },
  { 
    id: 3, 
    label: 'CRM Sync', 
    icon: <Database className="w-5 h-5 md:w-6 md:h-6" />, 
    desc: 'Data extraction & pipeline update.',
    color: 'text-purple-400'
  },
  { 
    id: 4, 
    label: 'Conversion', 
    icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6" />, 
    desc: 'Meeting booked or sale closed automatically.',
    color: 'text-yellow-400'
  }
];

const AutomationShowcase: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500); // Cycle through steps every 2.5s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#080808] border border-white/10 rounded-[2.5rem] p-4 md:p-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a8fbd3]/20 to-transparent" />
      
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
        
        {/* Left: Explanation */}
        <div className="w-full lg:w-1/3 z-10 px-2 md:px-0">
           <div className="flex items-center gap-2 mb-4 md:mb-6">
             <div className="p-2 bg-[#a8fbd3]/10 rounded-lg">
               <Zap className="w-5 h-5 text-[#a8fbd3]" />
             </div>
             <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a8fbd3]">Live Protocol</span>
           </div>
           
           <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-tight text-white mb-4 md:mb-6">
             Zero <br /> Latency
           </h3>
           <p className="text-gray-400 text-sm md:text-base leading-relaxed">
             Watch how our autonomous agents handle the entire sales process while your team sleeps. Speed is the only currency that matters.
           </p>

           <div className="mt-6 md:mt-8 flex gap-2">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${idx === activeStep ? 'bg-[#a8fbd3]' : 'bg-white/10'}`} 
                />
              ))}
           </div>
        </div>

        {/* Right: Visualization */}
        <div className="w-full lg:w-2/3 relative min-h-[350px] md:h-[350px] bg-black/40 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-center p-4">
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
           
           {/* Connecting Lines (Desktop) */}
           <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block">
             <motion.path 
               d="M 10% 50% L 36% 50% L 62% 50% L 90% 50%"
               stroke="white"
               strokeWidth="2"
               strokeOpacity="0.1"
               fill="none"
             />
             <motion.path 
               d="M 10% 50% L 36% 50% L 62% 50% L 90% 50%"
               stroke="#a8fbd3"
               strokeWidth="2"
               fill="none"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ 
                 pathLength: [0, 1], 
                 opacity: [0, 1, 0] 
               }}
               transition={{ 
                 duration: 2.5, 
                 repeat: Infinity, 
                 ease: "linear",
                 repeatDelay: 0.5
               }}
             />
           </svg>

           {/* Mobile Vertical Connection Line */}
           <div className="absolute left-[2rem] top-[10%] bottom-[10%] w-[1px] bg-white/10 md:hidden block"></div>

           <div className="flex flex-col md:flex-row justify-between w-full max-w-3xl relative z-10 px-0 md:px-12 gap-6 md:gap-0">
             {steps.map((step, idx) => {
               const isActive = idx === activeStep;
               
               return (
                 <div key={step.id} className="relative flex md:flex-col items-center gap-4 md:gap-0">
                   {/* Icon Circle */}
                   <motion.div
                     animate={{ 
                       scale: isActive ? 1.1 : 1,
                       borderColor: isActive ? 'rgba(168, 251, 211, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                       backgroundColor: isActive ? 'rgba(168, 251, 211, 0.1)' : 'rgba(0,0,0,0.5)'
                     }}
                     className={`w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-2xl border flex items-center justify-center backdrop-blur-md transition-colors duration-500 z-20 ${isActive ? 'shadow-[0_0_30px_rgba(168,251,211,0.2)]' : ''}`}
                   >
                     <div className={`transition-colors duration-300 ${isActive ? step.color : 'text-gray-600'}`}>
                       {step.icon}
                     </div>
                     
                     {isActive && (
                       <motion.div 
                         layoutId="outline"
                         className="absolute -inset-2 rounded-3xl border border-[#a8fbd3] opacity-50"
                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       />
                     )}
                   </motion.div>

                   {/* Text Content */}
                   <motion.div 
                      className="md:absolute md:top-24 lg:top-28 md:text-center w-full md:w-32 flex flex-col justify-center"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: isActive ? 1 : 0.4 }}
                   >
                     <h4 className={`text-xs md:text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                       {step.label}
                     </h4>
                     <p className={`text-[10px] md:text-[9px] font-mono leading-tight ${isActive ? 'text-[#a8fbd3]' : 'text-gray-600 hidden md:block'}`}>
                       {step.desc}
                     </p>
                   </motion.div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationShowcase;
