
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
    color: '#1a1a1a'
  },
  {
    id: 'covered',
    name: 'COVERED BRIDGE',
    category: 'REAL ESTATE FORM',
    year: '2024',
    url: 'https://covered-bridge-form.vercel.app/',
    desktopImg: 'https://i.imgur.com/bYpBYAw.png',
    mobileImg: 'https://i.imgur.com/SHEMMPl.png',
    color: '#161616'
  },
  {
    id: 'douglas',
    name: 'PSI DOUGLAS',
    category: 'HEALTHCARE LANDING',
    year: '2024',
    url: 'https://psi-douglas-alerrander.vercel.app',
    desktopImg: 'https://i.imgur.com/o3WLowO.png',
    mobileImg: 'https://i.imgur.com/LwdoShJ.png',
    color: '#121212'
  },
  {
    id: 'star',
    name: 'STAR CLEANING',
    category: 'SERVICE BUSINESS',
    year: '2023',
    url: 'https://starcleaning-ten.vercel.app/',
    desktopImg: 'https://i.imgur.com/NZGOgev.png',
    mobileImg: 'https://i.imgur.com/ASRzssV.png',
    color: '#0a0a0a'
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
  targetScale: number;
  progress: MotionValue<number>;
  range: number[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  targetScale, 
  progress, 
  range 
}) => {
  const container = useRef(null);
  
  // Internal scroll progress for entrance animations (Parallax)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Image zooms out slightly as card enters viewport
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  
  // Card scales down as it moves up (stacking effect driven by parent progress)
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // Height reduced to h-auto min-h-[70vh] to remove "gigantic spaces" caused by excessive container height
    // Sticky top calc made much tighter (starts at 4rem, increments by only 25px)
    <div ref={container} className="h-auto min-h-[75vh] md:h-screen flex items-center justify-center sticky top-0 px-4 md:px-4">
      <motion.div 
        style={{ 
          scale, 
          // Compact Stacking Logic:
          // Starts at 4rem (header offset) + very small increment per index
          top: `calc(4rem + ${index * 25}px)` 
        }} 
        className="relative flex flex-col md:flex-row w-full max-w-6xl h-[60vh] md:h-[80vh] bg-[#09090b] rounded-2xl md:rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl origin-top"
      >
        {/* TEXT SECTION */}
        <div className="w-full md:w-5/12 p-6 md:p-12 flex flex-col justify-between relative z-20 order-2 md:order-1 bg-[#09090b]">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span className="text-[#a8fbd3] font-mono text-xs tracking-widest">0{index + 1}</span>
                <span className="h-px w-8 bg-white/20"></span>
                <span className="text-white/40 font-mono text-xs tracking-widest">{project.year}</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold uppercase leading-[0.9] text-white tracking-tighter mb-2 md:mb-4">
                {project.name}
              </h3>
              <p className="text-[#a8fbd3] font-mono text-[9px] md:text-xs tracking-[0.3em] uppercase opacity-80">
                {project.category}
              </p>
            </div>

            <div className="pt-6 md:pt-8">
               <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 hover:bg-[#a8fbd3] hover:text-black hover:border-[#a8fbd3] rounded-full transition-all duration-300"
               >
                 <span className="font-bold uppercase text-[9px] md:text-[10px] md:text-xs tracking-widest">View Project</span>
                 <ArrowUpRight className="w-4 h-4" />
               </a>
            </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="w-full md:w-7/12 h-[35%] md:h-full relative overflow-hidden order-1 md:order-2">
            <motion.div 
              style={{ scale: imageScale }}
              className="w-full h-full"
            >
               <img 
                 src={project.desktopImg} 
                 alt={project.name} 
                 className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
               />
               {/* Mobile Overlay Gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent md:hidden" />
               {/* Desktop Side Gradient */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-transparent to-transparent hidden md:block" />
            </motion.div>
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
    <section id="portfolio" className="relative bg-[#050505]">
      
      {/* Introduction */}
      <div className="pt-24 md:pt-32 pb-6 md:pb-10 px-6 max-w-[1600px] mx-auto">
        <span className="text-[#a8fbd3] font-mono text-[9px] md:text-sm tracking-[0.5em] uppercase mb-4 block opacity-60">Selected Works</span>
        <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-none text-white">
          Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white opacity-80">Benchmarks</span>
        </h2>
      </div>

      {/* Stack Container */}
      <div ref={container} className="relative pb-[5vh] md:pb-[10vh]">
        {PROJECTS.map((project, i) => {
          // The target scale logic: each subsequent card scales down slightly less than the previous one
          // to create the "stacked deck" depth effect
          const targetScale = 1 - ((PROJECTS.length - i) * 0.05);
          
          return (
            <ProjectCard 
              key={i} 
              index={i} 
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
