
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Network, Zap, Video, MessageSquare, Cpu, Lock, Activity, Touchpad } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0 to 100
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  description: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const TEAM_DATA: TeamMember[] = [
  {
    id: 'rodrigo',
    name: 'Rodrigo Vieira',
    role: 'Systems Architect',
    specialty: 'Growth & Automation',
    image: 'https://imgur.com/oVGf3zv.png',
    icon: <Network className="w-5 h-5" />,
    description: "The architect behind the machine. Specialist in constructing autonomous AI pipelines and high-precision paid traffic ecosystems.",
    skills: [
      { name: 'AI Architecture', level: 98 },
      { name: 'Paid Traffic', level: 95 },
      { name: 'Data Logic', level: 92 }
    ]
  },
  {
    id: 'sabrina',
    name: 'Sabrina Silva',
    role: 'Visual Director',
    specialty: 'Brand Strategy & Film',
    image: 'https://imgur.com/luPTVYd.png',
    icon: <Video className="w-5 h-5" />,
    description: "Visual storyteller transforming brands into cinematic experiences. Aligning aesthetic precision with sales psychology.",
    skills: [
      { name: 'Cinematography', level: 96 },
      { name: 'Brand Story', level: 94 },
      { name: 'Art Direction', level: 90 }
    ]
  },
  {
    id: 'talita',
    name: 'Talita Spironello',
    role: 'Client Success Lead',
    specialty: 'Strategic Partnerships',
    image: 'https://imgur.com/L2sz8uj.png',
    icon: <MessageSquare className="w-5 h-5" />,
    description: "The bridge between vision and reality. Orchestrating the client roadmap and ensuring zero friction in execution.",
    skills: [
      { name: 'Negotiation', level: 95 },
      { name: 'Problem Solving', level: 98 },
      { name: 'Logistics', level: 90 }
    ]
  }
];

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3D Tilt Logic variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Only apply tilt transforms if NOT on mobile
  const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-10deg", "10deg"]);
  
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
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

  const handleMobileTap = () => {
    if (isMobile) {
      setHovered(!isHovered);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileTap}
      style={{ perspective: 1000 }}
      className="w-full h-[520px] md:h-[650px] cursor-pointer md:cursor-none"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden group transition-shadow duration-500 shadow-xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              filter: isHovered ? "grayscale(0%) contrast(1.1)" : "grayscale(100%) contrast(1.2) brightness(0.8)",
              scale: isHovered ? 1.05 : 1
            }}
          />
          {/* Enhanced gradient for text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/95" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Holographic Overlay (Desktop Only) */}
        {!isMobile && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 z-10 pointer-events-none"
            style={{ backgroundPosition: `${shineX}% ${shineY}%`, opacity: isHovered ? 1 : 0 }}
          />
        )}
        
        {/* Scan Line */}
        <motion.div 
           className="absolute left-0 right-0 h-[2px] bg-[#a8fbd3] shadow-[0_0_20px_#a8fbd3] z-10 pointer-events-none opacity-50"
           animate={{ top: ['0%', '100%'], opacity: [0, 0.8, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        />

        {/* Mobile Tap Hint */}
        {isMobile && !isHovered && (
          <div className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
            <Touchpad size={12} className="text-[#a8fbd3] animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest text-white/70">Tap info</span>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end transform-style-3d">
          
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: isHovered ? (isMobile ? -10 : -20) : 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ translateZ: 50 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-[#a8fbd3] text-black rounded-lg shadow-[0_0_15px_rgba(168,251,211,0.4)]">
                 {member.icon}
               </div>
               <span className="text-[#a8fbd3] font-mono text-[9px] uppercase tracking-[0.3em] bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-[#a8fbd3]/20">
                 {member.specialty}
               </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-none text-white tracking-tighter mb-2">
              {member.name}
            </h3>
            
            <p className="text-white/50 font-mono text-[10px] uppercase tracking-widest mb-6">
              // {member.role}
            </p>

            {/* Description & Skill Matrix Reveal */}
            <div className="overflow-hidden">
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                 transition={{ duration: 0.4 }}
               >
                 <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed border-l-2 border-[#a8fbd3] pl-4 mb-6">
                   {member.description}
                 </p>
                 
                 {/* Neural Skill Matrix */}
                 <div className="bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                   <div className="flex items-center gap-2 mb-3">
                     <Activity size={12} className="text-[#a8fbd3]" />
                     <span className="text-[9px] font-bold uppercase text-white tracking-widest">Neural Sync Status</span>
                   </div>
                   <div className="space-y-3">
                     {member.skills.map((skill, idx) => (
                       <div key={idx}>
                         <div className="flex justify-between mb-1">
                           <span className="text-[8px] font-mono uppercase text-gray-400">{skill.name}</span>
                           <span className="text-[8px] font-mono text-[#a8fbd3]">{skill.level}%</span>
                         </div>
                         <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: isHovered ? `${skill.level}%` : 0 }}
                             transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                             className="h-full bg-gradient-to-r from-[#a8fbd3] to-purple-500"
                           />
                         </div>
                       </div>
                     ))}
                   </div>
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
    <section id="team" className="relative z-10 py-16 md:py-40 bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[50vh] bg-[#a8fbd3]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-24 gap-6">
           <div className="max-w-3xl">
              <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block opacity-60">03. The Minds</span>
              {/* Standardized Title */}
              <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-[0.85] text-white">
                Neural <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white opacity-80">Architects</span>
              </h2>
           </div>
           <p className="hidden md:block text-gray-400 font-mono text-[10px] tracking-widest max-w-sm text-right pb-2">
             [ AUTHORIZED PERSONNEL ONLY ]<br/>
             MEET THE OPERATIVES BEHIND THE SCALE.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {TEAM_DATA.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
