
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    id: 'remaking',
    name: 'REMAKING AGENCY',
    category: 'AGENCY PORTFOLIO',
    year: '2025',
    url: 'https://remaking.vercel.app/',
    desktopImg: 'https://i.imgur.com/DBgr0yr.png',
    mobileImg: 'https://i.imgur.com/vz5DC0h.png'
  },
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
}

const Card: React.FC<CardProps> = ({ project, index, total }) => {
  // Calculate dynamic top offset for the stacking effect
  // Mobile: start at 80px, step 15px
  // Desktop: start at 100px, step 30px
  const topOffsetDesktop = 100 + (index * 30);
  const topOffsetMobile = 80 + (index * 15);

  return (
    <div 
      className="sticky w-full"
      style={{ 
        // We use CSS variables or simple calc for responsiveness inside the style tag logic 
        // to avoid complex JS window resizing listeners. 
        top: `calc(10vh + ${index * 25}px)` 
      }}
    >
      {/* CARD CONTAINER */}
      <motion.div 
        className="relative flex flex-col md:flex-row bg-[#080808] border-t border-white/15 overflow-hidden w-full max-w-[1600px] mx-auto min-h-[500px] md:h-[650px] rounded-t-[2rem] shadow-[-10px_-10px_30px_rgba(0,0,0,0.5)] origin-top"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
      >
        
        {/* LEFT COLUMN (TEXT) */}
        <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-6 md:mb-12">
              <span className="text-[#a8fbd3] font-mono text-xs tracking-[0.2em]">0{index + 1}</span>
              <span className="h-px w-12 bg-white/20"></span>
              <span className="text-white/50 font-mono text-xs tracking-[0.2em]">{project.year}</span>
            </div>

            <h3 className="text-[12vw] md:text-6xl lg:text-7xl font-heading font-bold uppercase leading-[0.85] text-white tracking-tighter mb-4">
              {project.name}
            </h3>
            <p className="text-[#a8fbd3] font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
              {project.category}
            </p>
          </div>

          <div className="mt-12 md:mt-0">
             <a 
               href={project.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="group inline-flex items-center gap-4 text-white hover:text-[#a8fbd3] transition-colors"
             >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#a8fbd3] group-hover:border-[#a8fbd3] group-hover:text-black transition-all duration-300">
                   <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">Visit Project</span>
             </a>
          </div>
        </div>

        {/* RIGHT COLUMN (IMAGE) */}
        <div className="w-full md:w-[55%] h-[300px] md:h-full relative overflow-hidden bg-white/5 group">
           <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
           
           {/* Desktop Image */}
           <img 
             src={project.desktopImg} 
             alt={project.name} 
             className="hidden md:block absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
           />
           
           {/* Mobile Image */}
           <img 
             src={project.mobileImg} 
             alt={project.name} 
             className="md:hidden absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
           />
        </div>

      </motion.div>
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="relative bg-[#050505] pt-24 md:pt-32 pb-24 px-4 md:px-6">
      
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto mb-16 md:mb-24 px-2 md:px-6">
          <span className="text-[#a8fbd3] font-mono text-[9px] md:text-sm tracking-[0.5em] uppercase mb-4 block opacity-60">Selected Works</span>
          <h2 className="text-[10vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-none text-white">
            Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white opacity-80">Benchmarks</span>
          </h2>
      </div>

      {/* Stack Container */}
      <div className="flex flex-col gap-12 md:gap-0 pb-20">
        {PROJECTS.map((project, index) => (
          <Card 
            key={project.id} 
            project={project} 
            index={index} 
            total={PROJECTS.length} 
          />
        ))}
      </div>

    </section>
  );
};

export default PortfolioSection;
