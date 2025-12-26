
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Zap, Layers } from 'lucide-react';

// --- DATA ---
interface Project {
  id: string;
  name: string;
  category: string;
  url: string;
  desktopImg: string;
  year: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'bilu',
    name: 'BILU BANK',
    category: 'FINTECH',
    year: '2024',
    url: 'https://bilu-form.vercel.app/',
    desktopImg: 'https://i.imgur.com/KUuLn9H.png',
    tags: ['Web App', 'Security', 'UI/UX']
  },
  {
    id: 'covered',
    name: 'COVERED BRIDGE',
    category: 'REAL ESTATE',
    year: '2024',
    url: 'https://covered-bridge-form.vercel.app/',
    desktopImg: 'https://i.imgur.com/bYpBYAw.png',
    tags: ['Lead Gen', 'Automation', 'Design']
  },
  {
    id: 'douglas',
    name: 'PSI DOUGLAS',
    category: 'HEALTHCARE',
    year: '2024',
    url: 'https://psi-douglas-alerrander.vercel.app',
    desktopImg: 'https://i.imgur.com/o3WLowO.png',
    tags: ['Branding', 'Landing Page', 'Conversion']
  },
  {
    id: 'star',
    name: 'STAR CLEANING',
    category: 'SERVICES',
    year: '2023',
    url: 'https://starcleaning-ten.vercel.app/',
    desktopImg: 'https://i.imgur.com/NZGOgev.png',
    tags: ['Local SEO', 'Growth', 'Web']
  }
];

const PortfolioSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="portfolio" className="relative bg-[#050505] py-20 md:py-32 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#a8fbd3]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="h-px w-8 bg-[#a8fbd3]" />
               <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.3em] uppercase">
                 The Archives
               </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase tracking-tighter text-white leading-[0.85]">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Works</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
             <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
               Index 01 — 04<br />
               Engineering Growth
             </p>
          </div>
        </div>

        {/* --- DESKTOP LAYOUT (SPLIT SCREEN) --- */}
        {!isMobile ? (
          <div className="flex gap-20">
            
            {/* LEFT: THE LIST */}
            <div className="w-1/2 flex flex-col justify-center gap-8 relative z-10">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  onHoverStart={() => setActiveIndex(index)}
                  className="group relative cursor-pointer"
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className={`font-mono text-xs transition-colors duration-300 ${activeIndex === index ? 'text-[#a8fbd3]' : 'text-gray-600'}`}>
                      0{index + 1}
                    </span>
                    <h3 
                      className={`text-6xl xl:text-7xl font-heading font-bold uppercase transition-all duration-500 leading-none ${
                        activeIndex === index 
                          ? 'text-white translate-x-4' 
                          : 'text-transparent stroke-text hover:opacity-100 opacity-30'
                      }`}
                      style={{ 
                        WebkitTextStroke: activeIndex === index ? '0px' : '1px rgba(255,255,255,0.5)' 
                      }}
                    >
                      {project.name}
                    </h3>
                  </div>
                  
                  {/* Additional Info Reveal */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeIndex === index ? 'auto' : 0,
                      opacity: activeIndex === index ? 1 : 0 
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pt-2 flex items-center gap-6">
                      <span className="text-[#a8fbd3] font-mono text-xs uppercase tracking-widest border border-[#a8fbd3]/20 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <div className="flex gap-2 text-gray-500 text-[10px] font-mono uppercase tracking-wider">
                        {project.tags.map(tag => <span key={tag}>// {tag}</span>)}
                      </div>
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-[#a8fbd3] transition-colors text-xs font-bold uppercase tracking-widest ml-auto"
                      >
                        View Case <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT: THE PREVIEW (STICKY) */}
            <div className="w-1/2 h-[600px] sticky top-32">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-[#111]">
                
                {/* Image Transition */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={PROJECTS[activeIndex].id}
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={PROJECTS[activeIndex].desktopImg}
                      alt={PROJECTS[activeIndex].name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Details */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                   <motion.div
                     key={`details-${activeIndex}`}
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                   >
                     <div className="flex justify-between items-end">
                       <div>
                         <p className="text-[#a8fbd3] font-mono text-xs mb-2">Deployed in {PROJECTS[activeIndex].year}</p>
                         <h4 className="text-3xl font-bold text-white uppercase">{PROJECTS[activeIndex].name}</h4>
                       </div>
                       <div className="p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                         <Layers className="text-white" size={24} />
                       </div>
                     </div>
                   </motion.div>
                </div>

                {/* Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat" />
              </div>
            </div>

          </div>
        ) : (
          /* --- MOBILE LAYOUT (HORIZONTAL SNAP CAROUSEL) --- */
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 custom-scrollbar">
            {PROJECTS.map((project, index) => (
              <div 
                key={project.id} 
                className="snap-center shrink-0 w-[85vw] md:w-[60vw] h-[500px] relative rounded-3xl overflow-hidden border border-white/10 bg-[#111]"
              >
                <img 
                  src={project.desktopImg} 
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <div className="flex items-center gap-2 mb-4">
                     <span className="bg-[#a8fbd3] text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                       {project.category}
                     </span>
                     <span className="text-white/60 text-[10px] font-mono border border-white/20 px-2 py-1 rounded">
                       {project.year}
                     </span>
                   </div>
                   
                   <h3 className="text-3xl font-heading font-bold text-white uppercase leading-none mb-6">
                     {project.name}
                   </h3>
                   
                   <a 
                     href={project.url}
                     target="_blank"
                     className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                   >
                     View Project <ArrowUpRight size={16} />
                   </a>
                </div>
              </div>
            ))}
            {/* Spacer for end of scroll */}
            <div className="w-6 shrink-0" />
          </div>
        )}

      </div>
    </section>
  );
};

export default PortfolioSection;
