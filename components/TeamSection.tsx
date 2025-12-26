
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Network, Zap, Video, MessageSquare, Linkedin, Instagram } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  description: string;
  stats: { label: string; value: string }[];
  icon: React.ReactNode;
}

const TEAM_DATA: TeamMember[] = [
  {
    id: 'rodrigo',
    name: 'Rodrigo Vieira',
    role: 'Systems Architect',
    specialty: 'Growth & Automation',
    image: 'https://imgur.com/oVGf3zv.png',
    icon: <Network className="w-6 h-6" />,
    description: "The architect behind the machine. Specialist in constructing autonomous AI pipelines and high-precision paid traffic ecosystems that dominate market share.",
    stats: [
      { label: 'Auto', value: '100%' },
      { label: 'Scale', value: 'MAX' }
    ]
  },
  {
    id: 'sabrina',
    name: 'Sabrina Silva',
    role: 'Visual Director',
    specialty: 'Brand Strategy & Film',
    image: 'https://imgur.com/luPTVYd.png',
    icon: <Video className="w-6 h-6" />,
    description: "Visual storyteller transforming brands into cinematic experiences. She aligns aesthetic precision with sales psychology to elevate perceived value instantly.",
    stats: [
      { label: 'Vision', value: '4K' },
      { label: 'Brand', value: 'Elite' }
    ]
  },
  {
    id: 'talita',
    name: 'Talita Kelly',
    role: 'Client Success Lead',
    specialty: 'Strategic Partnerships',
    image: 'https://imgur.com/L2sz8uj.png',
    icon: <MessageSquare className="w-6 h-6" />,
    description: "The bridge between vision and reality. She orchestrates the client roadmap, translating complex needs into actionable victories and ensuring zero friction.",
    stats: [
      { label: 'Sync', value: 'Real-time' },
      { label: 'Flow', value: 'Liquid' }
    ]
  }
];

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setHovered] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Shine effect moving opposite to mouse
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseXRel = (e.clientX - rect.left) / width - 0.5;
    const mouseYRel = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXRel);
    y.set(mouseYRel);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="w-full h-[550px] md:h-[650px] cursor-none"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden group transition-shadow duration-500 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(168,251,211,0.15)]"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              filter: isHovered ? "grayscale(0%) contrast(1.1)" : "grayscale(100%) contrast(1.2) brightness(0.8)",
              scale: isHovered ? 1.1 : 1
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Holographic Scanner Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 z-10 pointer-events-none"
          style={{
            backgroundPosition: `${shineX}% ${shineY}%`,
            opacity: isHovered ? 1 : 0
          }}
        />
        
        {/* Animated Scan Line */}
        <motion.div 
           className="absolute left-0 right-0 h-[2px] bg-[#a8fbd3] shadow-[0_0_20px_#a8fbd3] z-10 pointer-events-none opacity-50"
           animate={{ top: ['0%', '100%'], opacity: [0, 0.8, 0] }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform-style-3d">
          
          {/* Floating Stats - Reveal on Hover */}
          <div className="absolute top-8 right-8 flex flex-col gap-2 items-end">
             {member.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/60 backdrop-blur-md border border-[#a8fbd3]/30 px-3 py-1.5 rounded-lg"
                >
                   <span className="text-[9px] font-mono text-gray-400 uppercase mr-2">{stat.label}</span>
                   <span className="text-xs font-bold text-[#a8fbd3] font-mono">{stat.value}</span>
                </motion.div>
             ))}
          </div>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -20 : 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ translateZ: 50 }}
          >
            {/* Role Tag */}
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-[#a8fbd3] text-black rounded-lg">
                 {member.icon}
               </div>
               <span className="text-[#a8fbd3] font-mono text-[10px] uppercase tracking-[0.3em] bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-[#a8fbd3]/20">
                 {member.specialty}
               </span>
            </div>

            {/* Name */}
            <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-[0.9] text-white tracking-tighter mb-2">
              {member.name.split(' ').map((n, i) => (
                <span key={i} className="block">{n}</span>
              ))}
            </h3>
            
            {/* Role Title */}
            <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-6">
              // {member.role}
            </p>

            {/* Description Reveal */}
            <div className="overflow-hidden">
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                 transition={{ duration: 0.4 }}
               >
                 <p className="text-sm text-gray-300 font-light leading-relaxed border-l-2 border-[#a8fbd3] pl-4 mb-4">
                   {member.description}
                 </p>
                 <div className="flex gap-4 pt-2">
                   <button className="text-white/50 hover:text-[#a8fbd3] transition-colors"><Linkedin size={18} /></button>
                   <button className="text-white/50 hover:text-[#a8fbd3] transition-colors"><Instagram size={18} /></button>
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="relative z-10 py-24 md:py-40 bg-[#050505] overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[50vh] bg-[#a8fbd3]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
           <div className="max-w-3xl">
              <span className="text-[#a8fbd3] font-mono text-[9px] md:text-sm tracking-[0.5em] uppercase mb-4 block opacity-60">03. The Minds</span>
              <h2 className="text-[10vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-[0.85] text-white">
                Neural <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white opacity-80">Architects</span>
              </h2>
           </div>
           <p className="hidden md:block text-gray-400 font-mono text-xs tracking-widest max-w-sm text-right pb-2">
             [ AUTHORIZED PERSONNEL ONLY ]<br/>
             MEET THE OPERATIVES BEHIND THE SCALE.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6">
          {TEAM_DATA.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
