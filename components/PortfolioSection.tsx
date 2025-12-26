
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
}

const PROJECTS: Project[] = [
  {
    id: 'bilu',
    name: 'BILU ECOSYSTEM',
    category: 'FINTECH PLATFORM',
    year: '2024',
    url: 'https://bilu-form.vercel.app/',
    desktopImg: 'https://i.imgur.com/KUuLn9H.png',
    mobileImg: 'https://i.imgur.com/2cz3Uqx.png'
  },
  {
    id: 'covered',
    name: 'COVERED BRIDGE',
    category: 'REAL ESTATE FORM',
    year: '2024',
    url: 'https://covered-bridge-form.vercel.app/',
    desktopImg: 'https://i.imgur.com/bYpBYAw.png',
    mobileImg: 'https://i.imgur.com/SHEMMPl.png'
  },
  {
    id: 'douglas',
    name: 'PSI DOUGLAS',
    category: 'HEALTHCARE LANDING',
    year: '2024',
    url: 'https://psi-douglas-alerrander.vercel.app',
    desktopImg: 'https://i.imgur.com/o3WLowO.png',
    mobileImg: 'https://i.imgur.com/LwdoShJ.png'
  },
  {
    id: 'star',
    name: 'STAR CLEANING',
    category: 'SERVICE BUSINESS',
    year: '2023',
    url: 'https://starcleaning-ten.vercel.app/',
    desktopImg: 'https://i.imgur.com/NZGOgev.png',
    mobileImg: 'https://i.imgur.com/ASRzssV.png'
  }
];

interface CardProps {
  project: Project;
  index: number;
  total: number;
  range: [number, number];
  targetScale: number;
  progress: MotionValue<number>;
}

const Card: React.FC<CardProps> = ({ project, index, total, progress, range, targetScale }) => {
  
  // Create a scale effect based on the scroll progress of the container
  // As the card moves up the stack (gets covered), it scales down slightly to create depth
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div 
      className="sticky h-screen flex items-center justify-center"
      style={{ 
        // This ensures they stick at the top but with a tiny offset so we see the "stack" edge
        top: `calc(10% + ${index * 15}px)`,
        marginBottom: index === total - 1 ? 0 : '-20vh' // Pulls the next card up sooner
      }}
    >
      {/* CARD CONTAINER */}
      <motion.div 
        className="relative flex flex-col md:flex-row bg-[#111] border border-white/10 overflow-hidden w-full max-w-[1400px] mx-auto h-[60vh] md:h-[600px] rounded-[2rem] shadow-[0_-50px_100px_rgba(0,0,0,0.7)] origin-top"
        style={{ 
            scale,
            // Dynamic Z-index to ensure correct layering
            zIndex: index 
        }}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-10%" }}
      >
        
        {/* LEFT COLUMN (TEXT) */}
        <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between relative z-10 bg-[#111]">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#a8fbd3] font-mono text-xs tracking-[0.2em]">0{index + 1}</span>
              <span className="h-px w-12 bg-white/20"></span>
            </div>

            <div>
                <motion.h3 
                    className="text-[10vw] md:text-5xl lg:text-6xl font-heading font-bold uppercase leading-[0.9] text-white tracking-tighter mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                {project.name}
                </motion.h3>
                <motion.p 
                    className="text-purple-400 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                {project.category}
                </motion.p>
            </div>

            <div className="mt-8 md:mt-0">
                <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest">View Live</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (IMAGE) */}
        <div className="w-full md:w-[55%] h-full relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#111] z-10 opacity-50 md:opacity-100" />
           
           {/* Desktop Image */}
           <img 
             src={project.desktopImg} 
             alt={project.name} 
             className="hidden md:block absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           />
           
           {/* Mobile Image */}
           <img 
             src={project.mobileImg} 
             alt={project.name} 
             className="md:hidden absolute inset-0 w-full h-full object-cover object-top"
           />
        </div>

      </motion.div>
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} id="portfolio" className="relative bg-[#050505] pt-24 pb-24 px-4 md:px-6">
      
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto mb-12 md:mb-24 px-2 md:px-6 text-center md:text-left">
          <span className="text-[#a8fbd3] font-mono text-[9px] md:text-sm tracking-[0.5em] uppercase mb-4 block opacity-60">Selected Works</span>
          <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-none text-white">
            Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-white opacity-90">Architecture</span>
          </h2>
      </div>

      {/* Stack Container */}
      <div className="flex flex-col w-full">
        {PROJECTS.map((project, index) => {
          // Calculate scale target for depth effect
          // The further down the list, the less it scales down because it's on top
          const targetScale = 1 - ((PROJECTS.length - index) * 0.05);
          
          return (
            <Card 
                key={project.id} 
                project={project} 
                index={index} 
                total={PROJECTS.length}
                progress={scrollYProgress}
                range={[index * 0.25, 1]}
                targetScale={targetScale}
            />
          );
        })}
      </div>

    </section>
  );
};

export default PortfolioSection;
