
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

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

interface ProjectCardProps {
  project: Project;
  index: number;
  targetScale: number;
  progress: MotionValue<number>;
  range: number[];
  total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  targetScale, 
  progress, 
  range,
  total
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Create a tighter parallax effect for the "file folder" look
  const topOffset = 100 + (index * 15); // Start at 100px, increment by only 15px

  return (
    <div ref={container} className="h-[50vh] md:h-[60vh] flex items-start justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale, 
          top: `calc(${topOffset}px)`
        }} 
        className="relative flex flex-col md:flex-row w-full max-w-5xl h-[420px] md:h-[480px] bg-[#0c0c0c] rounded-2xl border border-white/10 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] origin-top"
      >
        {/* Header Strip (Mobile Visual Aid) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#a8fbd3] to-transparent opacity-20" />

        {/* CONTENT */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between relative z-20 bg-[#0c0c0c] border-b md:border-b-0 md:border-r border-white/5">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-[#a8fbd3] animate-pulse" />
                   <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">Project 0{index + 1}</span>
                </div>
                <span className="text-[#a8fbd3] font-mono text-[10px] font-bold">{project.year}</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-[0.9] text-white tracking-tighter mb-3">
                {project.name}
              </h3>
              <p className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#a8fbd3] font-mono text-[9px] tracking-widest uppercase">
                {project.category}
              </p>
            </div>

            <div className="mt-6 md:mt-0">
               <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto group flex items-center justify-between md:justify-start gap-4 px-6 py-4 bg-white text-black hover:bg-[#a8fbd3] rounded-xl transition-all duration-300 font-bold uppercase text-xs tracking-widest"
               >
                 <span>View Case Study</span>
                 <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
               </a>
            </div>
        </div>

        {/* IMAGE */}
        <div className="w-full md:w-1/2 h-full relative overflow-hidden group">
           <img 
             src={project.desktopImg} 
             alt={project.name} 
             className="absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
           />
           {/* Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80 md:opacity-40" />
           
           <div className="absolute bottom-4 right-4 md:hidden">
              <div className="p-2 bg-black/50 backdrop-blur rounded-full border border-white/20">
                <ExternalLink size={16} className="text-white" />
              </div>
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
    <section id="portfolio" className="relative bg-[#050505] pt-16 md:pt-24 pb-12">
      <div className="px-6 max-w-[1600px] mx-auto mb-8 md:mb-12 flex flex-col md:flex-row items-end justify-between gap-4">
        <div>
          <span className="text-[#a8fbd3] font-mono text-[9px] md:text-xs tracking-[0.3em] uppercase block opacity-60 mb-2">Selected Works</span>
          <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase tracking-tighter leading-none text-white">
            Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white">Studies</span>
          </h2>
        </div>
        <div className="h-px w-full md:w-auto md:flex-1 bg-white/10 mx-8 mb-4 hidden md:block" />
        <p className="text-right text-gray-500 text-[10px] font-mono uppercase tracking-widest max-w-[200px]">
          [ Scroll to explore the archive ]
        </p>
      </div>

      <div ref={container} className="relative px-4 pb-[10vh]">
        {PROJECTS.map((project, i) => {
          const targetScale = 1 - ((PROJECTS.length - i) * 0.05);
          return (
            <ProjectCard 
              key={i} 
              index={i} 
              project={project} 
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              total={PROJECTS.length}
            />
          );
        })}
      </div>
    </section>
  );
};

export default PortfolioSection;
