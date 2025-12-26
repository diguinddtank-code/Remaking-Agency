
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
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  progress, 
  range,
  targetScale
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ 
          scale,
          top: `calc(10vh + ${index * 30}px)` 
        }} 
        className="relative flex flex-col md:flex-row w-full max-w-[1200px] h-[65vh] md:h-[70vh] bg-[#101010] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl origin-top"
      >
        <div className="w-full md:w-[45%] p-6 md:p-12 flex flex-col justify-between relative z-20 bg-[#101010] border-b md:border-b-0 md:border-r border-white/5">
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                   <span className="w-2 h-2 rounded-full bg-[#a8fbd3] animate-pulse" />
                   <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">Project 0{index + 1}</span>
                </div>
                <span className="text-[#a8fbd3] font-mono text-[10px] font-bold border border-[#a8fbd3]/20 px-2 py-1 rounded-md">{project.year}</span>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-[0.9] text-white tracking-tighter mb-4 break-words">
                {project.name}
              </h3>
              <p className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#a8fbd3] font-mono text-[9px] tracking-widest uppercase">
                {project.category}
              </p>
            </div>

            <div className="mt-8">
               <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 bg-white text-black hover:bg-[#a8fbd3] rounded-full transition-all duration-300 font-bold uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,251,211,0.3)]"
               >
                 <span>View Case Study</span>
                 <ArrowUpRight className="w-4 h-4" />
               </a>
            </div>
        </div>

        <div className="w-full md:w-[55%] h-full relative overflow-hidden group">
           <img 
             src={project.desktopImg} 
             alt={project.name} 
             className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
           
           <div className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
              <ExternalLink className="text-white w-5 h-5" />
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
    <section id="portfolio" className="relative bg-[#050505]">
      <div className="pt-24 md:pt-40 pb-10 md:pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-4xl">
             <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.4em] uppercase block opacity-60 mb-4">Selected Works</span>
             <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-[0.85] text-white">
               Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white opacity-80">Benchmarks</span>
             </h2>
          </div>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest text-right hidden md:block pb-2">
            [ Scrolling Enabled ] <br/>
            Archive Access
          </p>
        </div>
      </div>

      <div ref={container} className="relative pb-[10vh]">
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
            />
          );
        })}
      </div>
    </section>
  );
};

export default PortfolioSection;
