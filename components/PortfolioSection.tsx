
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

// --- DATA ---
interface Project {
  id: string;
  name: string;
  category: string;
  url: string;
  desktopImg: string;
  mobileImg: string;
  year: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: 'bilu',
    name: 'BILU ECOSYSTEM',
    category: 'FINTECH PLATFORM',
    year: '2024',
    url: 'https://bilu-form.vercel.app/',
    desktopImg: 'https://i.imgur.com/KUuLn9H.png',
    mobileImg: 'https://i.imgur.com/2cz3Uqx.png',
    color: '#111111'
  },
  {
    id: 'covered',
    name: 'COVERED BRIDGE',
    category: 'REAL ESTATE',
    year: '2024',
    url: 'https://covered-bridge-form.vercel.app/',
    desktopImg: 'https://i.imgur.com/bYpBYAw.png',
    mobileImg: 'https://i.imgur.com/SHEMMPl.png',
    color: '#0f0f0f'
  },
  {
    id: 'douglas',
    name: 'PSI DOUGLAS',
    category: 'HEALTHCARE',
    year: '2024',
    url: 'https://psi-douglas-alerrander.vercel.app',
    desktopImg: 'https://i.imgur.com/o3WLowO.png',
    mobileImg: 'https://i.imgur.com/LwdoShJ.png',
    color: '#0d0d0d'
  },
  {
    id: 'star',
    name: 'STAR CLEANING',
    category: 'SERVICE BIZ',
    year: '2023',
    url: 'https://starcleaning-ten.vercel.app/',
    desktopImg: 'https://i.imgur.com/NZGOgev.png',
    mobileImg: 'https://i.imgur.com/ASRzssV.png',
    color: '#0a0a0a'
  }
];

// --- COMPONENTS ---

interface CardProps {
  i: number;
  project: Project;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({ i, project, progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div
        style={{
          scale,
          // Calculate top offset so cards stack nicely. 
          // Mobile: tighter stack (10px). Desktop: looser stack (25px).
          top: `calc(-5vh + ${i * 25}px)` 
        }}
        className="relative flex flex-col md:flex-row w-full max-w-[1200px] h-[65vh] md:h-[70vh] bg-[#101010] rounded-3xl md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl origin-top"
      >
        {/* --- LEFT SIDE (Content) --- */}
        {/* Mobile: Order 2 (Bottom), Desktop: Order 1 (Left) */}
        <div className="flex flex-col justify-between w-full md:w-[45%] h-[45%] md:h-full p-5 md:p-12 order-2 md:order-1 bg-[#101010] border-t md:border-t-0 md:border-r border-white/5 relative z-10">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between mb-3 md:mb-8">
               <div className="flex items-center gap-3">
                 <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#a8fbd3] animate-pulse" />
                 <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/50">
                   Project 0{i + 1}
                 </span>
               </div>
               <span className="font-mono text-[9px] md:text-[10px] font-bold text-[#a8fbd3] border border-[#a8fbd3]/20 px-2 py-1 rounded">
                 {project.year}
               </span>
            </div>

            <h3 className="text-2xl md:text-5xl lg:text-6xl font-heading font-bold text-white uppercase leading-[0.9] tracking-tighter mb-3 break-words">
              {project.name}
            </h3>
            
            <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <span className="font-mono text-[8px] md:text-[9px] text-[#a8fbd3] tracking-widest uppercase">
                {project.category}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-2 md:mt-0">
            <a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full md:w-fit bg-white text-black px-6 py-3 md:py-4 rounded-full font-bold uppercase text-[10px] md:text-xs tracking-widest hover:bg-[#a8fbd3] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* --- RIGHT SIDE (Image) --- */}
        {/* Mobile: Order 1 (Top), Desktop: Order 2 (Right) */}
        <div className="w-full md:w-[55%] h-[55%] md:h-full order-1 md:order-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent z-10 opacity-60 md:opacity-30" />
          
          <img 
            src={project.desktopImg} // We can stick to desktopImg or logic for mobileImg if desired, but object-cover handles it well.
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 md:scale-105 group-hover:scale-100 grayscale-[20%] group-hover:grayscale-0"
          />

          {/* External Link Hover Icon (Desktop) */}
          <div className="hidden md:flex absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
             <ExternalLink className="w-5 h-5 text-white" />
          </div>
        </div>

      </motion.div>
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="portfolio" className="relative bg-[#050505] z-10">
      
      {/* --- HEADER SECTION --- */}
      <div className="pt-24 pb-12 md:pt-40 md:pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <div className="max-w-4xl">
             <div className="flex items-center gap-3 mb-4 md:mb-6">
               <div className="h-px w-8 bg-[#a8fbd3]/50" />
               <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">
                 Selected Works
               </span>
             </div>
             
             {/* Standardized Title Typography */}
             <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase tracking-tighter text-white leading-[0.85]">
               Digital <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] via-white to-[#a8fbd3]">
                 Benchmarks
               </span>
             </h2>
          </div>

          <div className="hidden md:block text-right">
             <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
               [ Accessing Archive ] <br />
               Scroll to Explore
             </p>
          </div>

        </div>
      </div>

      {/* --- STICKY CARDS CONTAINER --- */}
      <div ref={container} className="relative pb-[10vh]">
        {PROJECTS.map((project, i) => {
          // Scale logic: the further down the list, the less it scales down initially
          const targetScale = 1 - ((PROJECTS.length - i) * 0.05);
          
          return (
            <Card 
              key={i} 
              i={i}
              project={project} 
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

    </section>
  );
};

export default PortfolioSection;
