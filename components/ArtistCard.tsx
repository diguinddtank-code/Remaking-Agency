
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  return (
    <motion.div
      className="group relative h-[480px] md:h-[600px] w-full overflow-hidden border-b md:border-r border-white/10 bg-[#0a0a0a] cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Cinematic Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={artist.image} 
          alt={artist.name} 
          className="h-full w-full object-cover will-change-transform"
          variants={{
            rest: { scale: 1.15, opacity: 0.35, filter: 'grayscale(100%) contrast(1.2) brightness(0.6)' },
            hover: { scale: 1.05, opacity: 0.9, filter: 'grayscale(0%) contrast(1.1) brightness(1)' }
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Shadow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-50" />
      </div>

      {/* Content Layout */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <motion.span 
             variants={{
               rest: { opacity: 0.6, y: -5 },
               hover: { opacity: 1, y: 0 }
             }}
             className="text-[9px] md:text-[10px] font-mono border border-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-2xl bg-white/5 tracking-[0.2em] uppercase"
           >
             {artist.day}
           </motion.span>
           <motion.div
             variants={{
               rest: { opacity: 0, scale: 0.5, rotate: -45 },
               hover: { opacity: 1, scale: 1, rotate: 0 }
             }}
             transition={{ type: 'spring', stiffness: 400, damping: 25 }}
             className="bg-white text-black rounded-full p-3.5 shadow-2xl"
           >
             <ArrowUpRight size={22} strokeWidth={2.5} />
           </motion.div>
        </div>

        <div className="relative z-10">
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-4xl md:text-6xl font-bold uppercase text-white tracking-tighter leading-[0.85] mb-4"
              variants={{
                rest: { y: 20, opacity: 0.7 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {artist.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </motion.h3>
          </div>
          <motion.p 
            className="text-[9px] md:text-xs font-mono uppercase tracking-[0.5em] text-[#a8fbd3] mt-6"
            variants={{
              rest: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {artist.genre}
          </motion.p>
          
          <motion.div 
            variants={{
              rest: { scaleX: 0, opacity: 0 },
              hover: { scaleX: 1, opacity: 1 }
            }}
            transition={{ duration: 0.8 }}
            className="w-16 h-[1.5px] bg-[#a8fbd3] mt-6 origin-left" 
          />
        </div>
      </div>
      
      {/* Inner Border on Hover */}
      <motion.div 
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.1 }
        }}
        className="absolute inset-0 border border-white pointer-events-none"
      />
    </motion.div>
  );
};

export default ArtistCard;
