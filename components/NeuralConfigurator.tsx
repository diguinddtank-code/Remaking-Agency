
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Target, Zap, TrendingUp, Users, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

type Step = 'goal' | 'barrier' | 'processing' | 'result';

interface Option {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const GOALS: Option[] = [
  { id: 'scale', icon: <TrendingUp size={24} />, label: 'Scale Revenue' },
  { id: 'automate', icon: <Cpu size={24} />, label: 'Automate Operations' },
  { id: 'authority', icon: <Users size={24} />, label: 'Build Authority' },
];

const BARRIERS: Option[] = [
  { id: 'leads', icon: <Target size={24} />, label: 'Unqualified Leads' },
  { id: 'time', icon: <Zap size={24} />, label: 'Manual/Slow Process' },
  { id: 'roi', icon: <ShieldCheck size={24} />, label: 'Low Ad ROI' },
];

const NeuralConfigurator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('goal');
  const [selection, setSelection] = useState({ goal: '', barrier: '' });

  const handleGoalSelect = (id: string) => {
    setSelection(prev => ({ ...prev, goal: id }));
    setCurrentStep('barrier');
  };

  const handleBarrierSelect = (id: string) => {
    setSelection(prev => ({ ...prev, barrier: id }));
    setCurrentStep('processing');
    setTimeout(() => {
      setCurrentStep('result');
    }, 2500);
  };

  const getResultContent = () => {
    // Logic to determine recommendation based on inputs
    if (selection.goal === 'automate' || selection.barrier === 'time') {
      return {
        title: 'PROTOCOL: NEURAL EFFICIENCY',
        desc: 'Your operation requires autonomous AI agents for lead triage and CRM automation. We eliminate human error and accelerate closing velocity.',
        tag: 'IA AUTOMATION'
      };
    }
    if (selection.barrier === 'leads' || selection.goal === 'scale') {
      return {
        title: 'PROTOCOL: PRECISION SCALE',
        desc: 'Deployment of Data-Driven Paid Traffic. We optimize the pixel for profit, not just clicks, ensuring high-intent lead acquisition.',
        tag: 'PERFORMANCE ADS'
      };
    }
    return {
      title: 'PROTOCOL: AUTHORITY ECOSYSTEM',
      desc: 'Fusion of Cinematic Content with strategic distribution. We transform your brand into the undisputed market leader.',
      tag: 'BRAND STRATEGY'
    };
  };

  const result = getResultContent();

  return (
    <div className="w-full max-w-5xl mx-auto bg-black/40 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl relative min-h-[550px] flex flex-col shadow-2xl">
      {/* HUD Header */}
      <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#a8fbd3] rounded-full animate-pulse shadow-[0_0_10px_#a8fbd3]" />
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-[#a8fbd3] uppercase">Nexus Strategy Simulator v2.0</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`w-8 md:w-12 h-1 rounded-full transition-colors duration-500 ${
                (currentStep === 'goal' && step === 1) || 
                (currentStep === 'barrier' && step === 2) || 
                (currentStep === 'result' && step === 3) 
                ? 'bg-[#a8fbd3]' 
                : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-12 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: GOAL */}
          {currentStep === 'goal' && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <h3 className="text-2xl md:text-4xl font-heading font-bold mb-3">Step 01: The Objective</h3>
              <p className="text-gray-400 mb-10 font-light text-sm md:text-base">What is your company's highest priority this quarter?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {GOALS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleGoalSelect(opt.id)}
                    className="group flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border border-white/10 hover:border-[#a8fbd3] hover:bg-[#a8fbd3]/5 transition-all duration-300 text-center"
                  >
                    <div className="p-4 bg-white/5 rounded-full group-hover:bg-[#a8fbd3] group-hover:text-black transition-colors">
                      {opt.icon}
                    </div>
                    <span className="font-bold text-xs md:text-sm tracking-wide uppercase">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: BARRIER */}
          {currentStep === 'barrier' && (
            <motion.div
              key="barrier"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <h3 className="text-2xl md:text-4xl font-heading font-bold mb-3">Step 02: The Bottleneck</h3>
              <p className="text-gray-400 mb-10 font-light text-sm md:text-base">What is currently inhibiting your growth velocity?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BARRIERS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleBarrierSelect(opt.id)}
                    className="group flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border border-white/10 hover:border-[#a8fbd3] hover:bg-[#a8fbd3]/5 transition-all duration-300 text-center"
                  >
                    <div className="p-4 bg-white/5 rounded-full group-hover:bg-[#a8fbd3] group-hover:text-black transition-colors">
                      {opt.icon}
                    </div>
                    <span className="font-bold text-xs md:text-sm tracking-wide uppercase">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: PROCESSING */}
          {currentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center w-full h-full min-h-[300px]"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 md:w-24 md:h-24 border-t-2 border-l-2 border-[#a8fbd3] rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Cpu className="text-[#a8fbd3] opacity-50 w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
              <motion.div 
                className="mt-8 font-mono text-[#a8fbd3] uppercase tracking-[0.3em] text-xs md:text-sm"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Analysing Data Patterns...
              </motion.div>
              <div className="mt-2 text-[10px] md:text-xs text-gray-500 font-mono">
                Cross-referencing solution database
              </div>
            </motion.div>
          )}

          {/* STEP 4: RESULT */}
          {currentStep === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center md:text-left"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a8fbd3]/10 border border-[#a8fbd3]/20 text-[#a8fbd3] text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-6">
                     <CheckCircle2 size={12} />
                     Recommended Strategy Found
                   </div>
                   <h3 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 text-white">
                     {result.title}
                   </h3>
                   <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8">
                     {result.desc}
                   </p>
                   
                   <button 
                     onClick={() => document.getElementById('estratégia')?.scrollIntoView({ behavior: 'smooth' })}
                     className="bg-[#a8fbd3] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center gap-3 hover:bg-white transition-colors w-full md:w-auto shadow-[0_10px_30px_rgba(168,251,211,0.2)]"
                   >
                     Deploy Strategy <ArrowRight size={16} />
                   </button>
                </div>

                <div className="w-full md:w-1/2 bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                     <Cpu size={80} className="md:w-[100px] md:h-[100px]" />
                   </div>
                   <h4 className="font-mono text-gray-500 text-[10px] uppercase tracking-widest mb-2">Primary Module</h4>
                   <div className="text-xl md:text-2xl font-bold text-white mb-6">{result.tag}</div>
                   
                   <div className="space-y-4">
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-[#a8fbd3]" />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-gray-400 uppercase">
                        <span>Compatibility</span>
                        <span>98.2% Match</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#a8fbd3]/5 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

export default NeuralConfigurator;
