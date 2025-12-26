
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { Fingerprint, Lock, Unlock, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

const NeuralSyncPortal: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const progressValue = useMotionValue(0);
  const controls = useAnimation();
  const requestRef = useRef<number>(0);
  
  // Transform progress for visual effects
  const scale = useTransform(progressValue, [0, 100], [1, 1.2]);
  const opacity = useTransform(progressValue, [0, 100], [0.5, 1]);
  const glow = useTransform(progressValue, [0, 100], [0, 20]);

  // Unlock prediction data
  const prediction = {
    revenue: "Exponential",
    efficiency: "+840%",
    status: "Market Leader"
  };

  const startScan = () => {
    if (status === 'complete') return;
    setStatus('scanning');
    
    let start: number;
    const duration = 2000; // 2 seconds to unlock

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(p);
      progressValue.set(p);

      if (p < 100) {
        requestRef.current = requestAnimationFrame(step);
      } else {
        completeScan();
      }
    };
    
    requestRef.current = requestAnimationFrame(step);
  };

  const stopScan = () => {
    if (status === 'complete') return;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    setStatus('idle');
    // Spring back animation
    animate(progressValue, 0, { duration: 0.5 });
    setProgress(0);
  };

  const completeScan = () => {
    setStatus('complete');
    // Haptic feedback pattern (simulated visual shake)
    controls.start({
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    });
  };

  const handleClaim = () => {
    // Redirect to Instagram or external conversion link
    window.open('https://instagram.com', '_blank');
  };

  return (
    <div className="relative w-full py-24 md:py-32 bg-black border-y border-white/5 overflow-hidden select-none">
      
      {/* Background Tech Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#a8fbd3] to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#a8fbd3] to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,251,211,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,251,211,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Header Text */}
        <motion.div 
          animate={{ opacity: status === 'complete' ? 0 : 1, y: status === 'complete' ? -20 : 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4 backdrop-blur-md">
            <Lock size={12} className="text-[#a8fbd3]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Secure Neural Uplink</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white mb-2">
            Sync Your <br /> <span className="text-[#a8fbd3]">Potential</span>
          </h2>
          <p className="text-gray-500 text-xs md:text-sm font-mono uppercase tracking-widest mt-4">
            {status === 'idle' && "Touch & Hold to analyze brand DNA"}
            {status === 'scanning' && "Establishing Neural Connection..."}
          </p>
        </motion.div>

        {/* THE SCANNER INTERFACE */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          
          {/* Success State (Result Card) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={status === 'complete' ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#a8fbd3] rounded-2xl p-6 shadow-[0_0_50px_rgba(168,251,211,0.2)] pointer-events-auto">
               <div className="flex justify-center mb-4">
                 <div className="p-3 bg-[#a8fbd3] rounded-full text-black">
                   <Unlock size={24} />
                 </div>
               </div>
               <h3 className="text-xl font-bold text-white uppercase mb-1">Access Granted</h3>
               <p className="text-[10px] text-gray-400 font-mono mb-6 uppercase tracking-wider">Analysis Complete</p>
               
               <div className="space-y-3 mb-6">
                 {Object.entries(prediction).map(([key, value], i) => (
                   <div key={key} className="flex justify-between items-center border-b border-white/10 pb-2">
                     <span className="text-[10px] text-gray-500 uppercase">{key}</span>
                     <motion.span 
                       initial={{ opacity: 0, x: 10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.2 + (i * 0.1) }}
                       className="text-sm font-bold text-[#a8fbd3]"
                     >
                       {value}
                     </motion.span>
                   </div>
                 ))}
               </div>

               <button 
                  onClick={handleClaim}
                  className="w-full bg-white text-black py-3 rounded-lg font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#a8fbd3] transition-colors cursor-pointer"
                >
                  Claim Future <ChevronRight size={14} />
               </button>
            </div>
          </motion.div>

          {/* Scanner Button (Active State) */}
          <motion.button
             className="relative z-10 w-full h-full rounded-full flex items-center justify-center outline-none group"
             animate={controls}
             onMouseDown={startScan}
             onMouseUp={stopScan}
             onMouseLeave={stopScan}
             onTouchStart={startScan}
             onTouchEnd={stopScan}
             style={{ 
               pointerEvents: status === 'complete' ? 'none' : 'auto',
               opacity: status === 'complete' ? 0 : 1
             }}
          >
             {/* Progress Ring */}
             <svg className="absolute inset-0 w-full h-full -rotate-90">
               <circle 
                 cx="50%" cy="50%" r="48%" 
                 stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" 
               />
               <motion.circle 
                 cx="50%" cy="50%" r="48%" 
                 stroke="#a8fbd3" strokeWidth="4" fill="none"
                 strokeDasharray="301" // Approx circumf
                 strokeDashoffset={useTransform(progressValue, [0, 100], [301, 0])}
                 strokeLinecap="round"
               />
             </svg>

             {/* Central Fingerprint/Icon */}
             <motion.div 
               style={{ scale, opacity }}
               className="relative w-32 h-32 md:w-40 md:h-40 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-white/20 shadow-2xl"
             >
                {/* Glow Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-[#a8fbd3]"
                  style={{ filter: useTransform(glow, (v) => `blur(${v}px)`), opacity: 0.4 }}
                />
                
                {status === 'scanning' ? (
                  <Zap size={48} className="text-white animate-pulse relative z-10" />
                ) : (
                  <Fingerprint size={48} className="text-white/50 group-hover:text-[#a8fbd3] transition-colors relative z-10" />
                )}
             </motion.div>

             {/* Scanning Particles (Decoration) */}
             {status === 'scanning' && (
               <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                 <div className="absolute top-0 left-1/2 w-1 h-4 bg-[#a8fbd3] -translate-x-1/2" />
                 <div className="absolute bottom-0 left-1/2 w-1 h-4 bg-[#a8fbd3] -translate-x-1/2" />
                 <div className="absolute left-0 top-1/2 w-4 h-1 bg-[#a8fbd3] -translate-y-1/2" />
                 <div className="absolute right-0 top-1/2 w-4 h-1 bg-[#a8fbd3] -translate-y-1/2" />
               </div>
             )}
          </motion.button>

        </div>
      </div>
    </div>
  );
};

export default NeuralSyncPortal;
