
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, Target, Cpu, Video, Globe, Menu, X, Brain, ChevronLeft, ChevronRight, Zap, ArrowRight, Quote, Plus, Sparkles, Layout, Copy, Check, MousePointerClick } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard';
import NeuralConfigurator from './components/NeuralConfigurator';
import PortfolioSection from './components/PortfolioSection';
import TeamSection from './components/TeamSection';
import AutomationShowcase from './components/AutomationShowcase';
import AIChat from './components/AIChat';
import MobileNavBar from './components/MobileNavBar';
import { Service, Testimonial } from './types';
import { generateMarketingCopy } from './services/geminiService';

// DATA TRANSLATED TO ENGLISH
const SERVICES_DATA: Service[] = [
  { 
    id: '1', 
    name: 'AI Automation', 
    category: 'Intelligent Systems', 
    tag: 'FUTURE', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    description: 'We deploy artificial intelligence to automate sales, support, and data analysis pipelines, scaling your business operations without increasing headcount.'
  },
  { 
    id: '2', 
    name: 'Paid Traffic Mastery', 
    category: 'Performance Marketing', 
    tag: 'SCALING', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'Absolute dominance of Meta Ads, Google Ads, and TikTok Ads focusing on real ROI. We don’t buy clicks; we acquire revenue.'
  },
  { 
    id: '3', 
    name: 'Social Media Control', 
    category: 'Ecosystem Management', 
    tag: 'AUTHORITY', 
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    description: 'Complete management of digital ecosystems. We transform profiles into sales channels through elite design and strategic narrative.'
  },
  { 
    id: '4', 
    name: 'Premium Production', 
    category: 'Cinematic Content', 
    tag: 'VISUAL', 
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
    description: 'Cinematic recording and editing. We produce ads and content that arrest attention and elevate your brand positioning instantly.'
  },
  { 
    id: '5', 
    name: 'Brand Strategy', 
    category: 'Strategic Planning', 
    tag: 'FOUNDATION', 
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
    description: 'End-to-end brand development. Identity, voice, and market positioning for brands seeking the top 1%.'
  },
  { 
    id: '6', 
    name: 'Growth Consulting', 
    category: 'Expert Advisory', 
    tag: 'RESULTS', 
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop',
    description: 'Direct advisory for CEOs and Founders on scaling through new channels and disruptive technologies.'
  },
];

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    quote: "Remaking tripled our revenue in 4 months via AI automation. They don't just deliver marketing; they engineer profit systems.",
    author: "Richard Silver",
    role: "CEO",
    company: "TechScale Solutions"
  },
  {
    id: '2',
    quote: "Their paid traffic is surgical. Every cent is invested with strategy, and the 8x ROI transformed our logistics operation completely.",
    author: "Amanda Coast",
    role: "Founder",
    company: "Bloom Luxury E-commerce"
  },
  {
    id: '3',
    quote: "The cinematic production elevated our brand to a level we never imagined. Perceived value skyrocketed instantly.",
    author: "Mark Vian",
    role: "CMO",
    company: "Nexus Global Corp"
  }
];

// Helper Component for the Purple Neural Effect
const NeuralNetworkEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Central Glow */}
      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px] animate-pulse" />
      
      <svg className="absolute w-[120%] h-[120%] z-0 opacity-40" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#d8b4fe" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Animated Synapses */}
        {[...Array(6)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 200,200 Q ${100 + Math.random() * 200},${50 + Math.random() * 100} ${50 + Math.random() * 300},${50 + Math.random() * 300}`}
            fill="none"
            stroke="url(#neuralGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.8, 0],
              strokeWidth: [1, 2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={100 + Math.random() * 200}
            cy={100 + Math.random() * 200}
            r="3"
            fill="#a78bfa"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // AI Copywriter State
  const [copyTopic, setCopyTopic] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navigateService = (direction: 'next' | 'prev') => {
    if (!selectedService) return;
    const currentIndex = SERVICES_DATA.findIndex(s => s.id === selectedService.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % SERVICES_DATA.length;
    } else {
      nextIndex = (currentIndex - 1 + SERVICES_DATA.length) % SERVICES_DATA.length;
    }
    // Reset AI state on navigation
    setCopyTopic('');
    setGeneratedCopy('');
    setSelectedService(SERVICES_DATA[nextIndex]);
  };

  const handleGenerateCopy = async () => {
    if (!copyTopic.trim() || !selectedService) return;
    setIsGeneratingCopy(true);
    const result = await generateMarketingCopy(selectedService.name, copyTopic);
    setGeneratedCopy(result);
    setIsGeneratingCopy(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    setCopyTopic('');
    setGeneratedCopy('');
  }

  // The provided logo URL
  const LOGO_URL = "https://i.imgur.com/kL00omR.png";

  return (
    <div className="relative min-h-screen text-white selection:bg-[#a8fbd3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden bg-[#0a0a0a]">
      <CustomCursor />
      <FluidBackground />
      <MobileNavBar />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 md:py-6 mix-blend-difference bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px] max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-default z-50 flex items-center"
        >
          {/* Logo Implementation */}
          <img 
            src={LOGO_URL} 
            alt="Remaking Agency Logo" 
            className="h-8 md:h-12 w-auto object-contain brightness-0 invert" 
          />
        </motion.div>
        
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-widest uppercase">
          {['Services', 'Method', 'Team', 'Portfolio', 'Simulator', 'Results'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase() === 'simulator' ? 'simulator' : item.toLowerCase())}
              className="hover:text-[#a8fbd3] transition-colors text-white cursor-pointer bg-transparent border-none outline-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => scrollToSection('estratégia')}
            className="hidden md:inline-flex border border-white px-8 py-3 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 text-white cursor-pointer bg-transparent"
            data-hover="true"
          >
            Book Session
          </button>

          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="text-white z-50 relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full bg-radial-gradient from-[#a8fbd3]/5 to-transparent pointer-events-none opacity-50" />
            
            <div className="flex flex-col items-center gap-8 md:gap-10 relative z-10 pb-20">
              {['Services', 'Method', 'Team', 'Portfolio', 'Simulator', 'Results'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                  onClick={() => scrollToSection(item.toLowerCase() === 'simulator' ? 'simulator' : item.toLowerCase())}
                  className="text-4xl md:text-7xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none tracking-tighter"
                >
                  {item}
                </motion.button>
              ))}
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => scrollToSection('estratégia')}
                className="mt-12 bg-white text-black px-12 md:px-20 py-5 md:py-6 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-4"
              >
                Talk to Advisor <Sparkles size={16} />
              </motion.button>
            </div>
            
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-10 text-white/20 text-[10px] font-mono tracking-widest uppercase">
              <span className="hover:text-[#a8fbd3] transition-colors">Instagram</span>
              <span className="hover:text-[#a8fbd3] transition-colors">LinkedIn</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-7xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-[9px] md:text-sm font-mono text-[#a8fbd3] tracking-[0.3em] md:tracking-[0.5em] uppercase mb-8 md:mb-10"
          >
            <span className="w-6 md:w-12 h-px bg-[#a8fbd3]/50"/>
            <span>ELITE AI & MARKETING AGENCY</span>
            <span className="w-6 md:w-12 h-px bg-[#a8fbd3]/50"/>
          </motion.div>

          {/* NEURAL LOGO CONTAINER */}
          <div className="relative w-full flex justify-center items-center px-4 overflow-visible mb-6 group">
            
            <NeuralNetworkEffect />

            {/* The Logo itself - REDUCED SIZE ON DESKTOP */}
            <img 
              src={LOGO_URL} 
              alt="REMAKING" 
              className="relative z-10 w-[85vw] md:w-[35vw] max-w-[500px] h-auto object-contain brightness-0 invert drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]" 
            />
            
            {/* Occasional Electric Glitch on Logo */}
            <motion.div 
               className="absolute inset-0 z-20 mix-blend-overlay pointer-events-none bg-purple-500/10"
               animate={{ opacity: [0, 0.2, 0] }}
               transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-sm md:text-2xl font-light max-w-[320px] md:max-w-4xl mx-auto text-white/70 leading-relaxed mt-4 md:mt-8 px-4"
          >
            Scaling businesses through <span className="text-purple-400 font-medium italic">AI Automation</span>, <span className="text-white font-medium">Performance Traffic</span>, and <span className="text-white font-medium">Brand Strategy</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 md:mt-16"
          >
             <button 
                onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex flex-col items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] hover:text-[#a8fbd3] transition-all"
             >
               <span className="hidden md:inline">Start AI Diagnostics</span>
               <div className="w-12 h-12 md:w-auto md:h-auto rounded-full bg-white/5 md:bg-transparent flex items-center justify-center border border-white/10 md:border-none">
                 <Brain className="w-6 h-6 md:group-hover:scale-110 transition-transform text-[#a8fbd3]" />
               </div>
             </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-[-10%] w-[150vw] h-[40vh] bg-gradient-to-t from-purple-900/20 to-transparent blur-[100px]"
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </header>

      {/* MARQUEE */}
      <div className="relative py-6 md:py-12 bg-white text-black z-20 overflow-hidden border-y-2 md:border-y-4 border-black">
        <motion.div 
          className="flex w-fit will-change-transform"
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((key) => (
            <div key={key} className="flex whitespace-nowrap shrink-0">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-2xl md:text-5xl lg:text-6xl font-heading font-black px-8 md:px-12 flex items-center gap-6">
                  TRAFFIC GENIUS <Plus className="w-4 h-4 md:w-8 md:h-8" /> 
                  SOCIAL AUTHORITY <Plus className="w-4 h-4 md:w-8 md:h-8" /> 
                  AI AUTOMATION <Plus className="w-4 h-4 md:w-8 md:h-8" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* SERVICES SECTION */}
      <section id="services" className="relative z-10 py-16 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col mb-16 md:mb-24 px-6 md:px-12">
            <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block opacity-60">01. Solutions</span>
            {/* Standardized Title */}
            <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase leading-[0.85] tracking-tighter">
              The <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] via-[#4fb7b3] to-[#a8fbd3] bg-[length:200%_auto] animate-[shimmer_6s_infinite_linear]">Ecosystem</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10">
            {SERVICES_DATA.map((service) => (
              <ServiceCard 
                key={service.id} 
                artist={{ 
                  id: service.id, 
                  name: service.name, 
                  genre: service.category, 
                  image: service.image, 
                  day: service.tag, 
                  description: service.description 
                }} 
                onClick={() => setSelectedService(service)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* METHOD SECTION */}
      <section id="method" className="relative z-10 py-16 md:py-32 bg-black/40 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="lg:col-span-6">
              <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.4em] uppercase mb-6 block opacity-60">02. The Logic</span>
              {/* Standardized Title */}
              <h2 className="text-[12vw] md:text-8xl font-heading font-bold mb-10 md:mb-12 leading-none tracking-tighter">
                Results over <br className="hidden md:block" /> <GradientText text="PROMISES" className="text-[12vw] md:text-8xl" />
              </h2>
              
              <div className="space-y-8 md:space-y-12">
                {[
                  { icon: Target, title: 'Performance ADS', desc: 'Surgical management of paid traffic focusing on scale, positive ROI, and data intelligence applied to your funnel.' },
                  { icon: Layout, title: 'Social Mastery', desc: 'Strategic social media management to build unshakable authority and communities of loyal buyers.' },
                  { icon: Zap, title: 'Workflow Automation', desc: 'We implement intelligent automations that resolve support and operational bottlenecks, optimizing your time.' },
                ].map((feature, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    key={i} 
                    className="flex items-start gap-6 group"
                  >
                    <div className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#a8fbd3] group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(168,251,211,0.2)] shrink-0">
                      <feature.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-2xl font-bold mb-2 font-heading tracking-tight">{feature.title}</h4>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-lg font-light">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-square md:aspect-auto md:h-[650px] group/method flex items-center justify-center">
              <div className="absolute inset-0 bg-[#a8fbd3]/10 blur-[120px] rounded-full animate-pulse" />
              
              {/* Container da Imagem de IA de Marketing */}
              <div className="relative w-full h-full max-w-[550px] flex items-center justify-center">
                <motion.img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop" 
                  alt="Neural Marketing Architecture" 
                  className="w-full h-auto object-contain mix-blend-lighten pointer-events-none select-none drop-shadow-[0_0_60px_rgba(168,251,211,0.5)]"
                  animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 5, -5, 0],
                    filter: ['brightness(0.8) contrast(1.2)', 'brightness(1.4) contrast(1.1)', 'brightness(0.8) contrast(1.2)']
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Data Stream Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[4rem]">
                   {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-[1.5px] h-[70px] bg-gradient-to-b from-transparent via-[#a8fbd3] to-transparent absolute"
                        style={{ left: `${10 + (i * 20)}%`, top: '-100px' }}
                        animate={{ top: ['-20%', '120%'], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5 + i, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
                      />
                   ))}
                </div>

                {/* Scanning Light Line */}
                <motion.div 
                  className="absolute left-0 right-0 h-[3px] bg-[#a8fbd3] shadow-[0_0_30px_#a8fbd3] z-20"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW AUTOMATION SHOWCASE SECTION */}
      <section className="relative z-10 py-16 md:py-24 bg-[#0a0a0a] border-t border-white/5">
         <div className="max-w-[1400px] mx-auto px-6">
            <AutomationShowcase />
         </div>
      </section>

      {/* TEAM SECTION (NEW) */}
      <TeamSection />

      {/* PORTFOLIO SECTION */}
      <PortfolioSection />

      {/* NEW INTERACTIVE SESSION: NEURAL CONFIGURATOR */}
      <section id="simulator" className="relative z-10 py-16 md:py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block opacity-60">04. Interactive Diagnostics</span>
            {/* Standardized Title with Interactive Cue */}
            <div className="relative inline-block">
               <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-none mb-6 relative z-10">
                 Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white">Strategy</span>
               </h2>
               {/* Visual Cue for Interaction */}
               <motion.div 
                 className="hidden md:flex absolute -right-12 top-0 text-[#a8fbd3] bg-white/5 p-2 rounded-full border border-white/10 items-center gap-2"
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 <MousePointerClick size={16} />
                 <span className="text-[9px] font-mono uppercase tracking-widest">Interactive</span>
               </motion.div>
            </div>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mt-4">
              Use our Neural Simulator to identify bottlenecks and discover which Remaking protocol adapts to your current scaling phase.
            </p>
            
            <motion.div 
               className="mt-6 flex justify-center md:hidden"
               animate={{ y: [0, 5, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
            >
               <span className="text-[#a8fbd3] text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 font-bold border border-[#a8fbd3]/30 px-4 py-2 rounded-full bg-[#a8fbd3]/5">
                 <MousePointerClick size={14} /> Tap to Configure
               </span>
            </motion.div>
          </div>
          
          <NeuralConfigurator />
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="results" className="relative z-10 py-16 md:py-32 border-t border-white/5 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#a8fbd3] font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block opacity-60">05. Impact</span>
            {/* Standardized Title */}
            <h2 className="text-[12vw] md:text-8xl font-heading font-bold uppercase tracking-tighter leading-none">
              Elite <br className="md:hidden" /><span className="text-white/20">Results</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group p-8 md:p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative hover:bg-white/[0.07] transition-all duration-700 backdrop-blur-sm"
              >
                <Quote className="absolute top-8 right-8 w-10 h-10 text-[#a8fbd3]/10" />
                <p className="text-sm md:text-lg font-light leading-relaxed mb-10 italic text-gray-300">
                  "{item.quote}"
                </p>
                <div className="mt-auto">
                  <h4 className="text-lg font-bold font-heading text-white tracking-tight">{item.author}</h4>
                  <p className="text-[9px] md:text-xs text-[#a8fbd3] font-mono uppercase tracking-[0.3em] mt-2 opacity-80">
                    {item.role} @ {item.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGY CALL SECTION */}
      <section id="estratégia" className="relative z-10 py-16 md:py-40 px-6 bg-black mb-20 md:mb-0">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-[#0c0c1a] to-[#050505] border border-white/10 p-10 md:p-32 rounded-[2.5rem] md:rounded-[4rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a8fbd3]/50 to-transparent" />
            
            {/* Standardized Title */}
            <motion.h2 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-[12vw] md:text-8xl font-heading font-bold mb-8 md:mb-12 tracking-tighter leading-none"
            >
              Ready to <br className="md:hidden"/> <span className="text-[#a8fbd3]">Remake?</span>
            </motion.h2>
            <p className="text-sm md:text-2xl text-gray-400 mb-12 md:mb-20 max-w-2xl mx-auto font-light leading-relaxed px-4">
              AI intelligence and ad performance are no longer optional. It's the only path to dominance. Shall we code your success?
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto bg-white text-black px-12 md:px-20 py-6 md:py-8 text-[11px] md:text-sm font-bold uppercase tracking-[0.5em] hover:bg-[#a8fbd3] transition-all duration-700 rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4 mx-auto"
            >
              Speak with Strategist <Sparkles size={18} />
            </motion.button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-16 md:py-24 bg-[#050505]/80 backdrop-blur-xl mb-24 md:mb-0">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col items-center gap-12">
          <div className="text-center flex flex-col items-center">
             <img 
               src={LOGO_URL} 
               alt="REMAKING" 
               className="h-10 md:h-16 w-auto object-contain brightness-0 invert opacity-50 mb-6" 
             />
             <p className="text-gray-600 text-[8px] md:text-xs font-mono uppercase tracking-[0.5em] px-4">THE NEURAL FRONTIER OF PERFORMANCE MARKETING.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-16">
            <span className="text-gray-500 hover:text-white font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] transition-all cursor-pointer">Instagram</span>
            <span className="text-gray-500 hover:text-white font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] transition-all cursor-pointer">LinkedIn</span>
            <span className="text-gray-500 hover:text-white font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] transition-all cursor-pointer">Behance</span>
            <span className="text-gray-500 hover:text-white font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em] transition-all cursor-pointer">X (Twitter)</span>
          </div>
          
          <div className="w-full max-w-sm h-px bg-white/5" />
          
          <p className="text-gray-700 text-[8px] font-mono tracking-widest uppercase">© 2025 REMAKING AGENCY. SOLVING PROBLEMS THROUGH PERFORMANCE.</p>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeServiceModal}
            className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 bg-black/98 backdrop-blur-2xl cursor-auto"
          >
            <motion.div
              initial={{ scale: 1.1, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full md:h-auto md:max-w-6xl bg-[#080808] md:border md:border-white/10 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button
                onClick={closeServiceModal}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 md:p-4 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative overflow-hidden">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name} 
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 md:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[#a8fbd3] font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase mb-6 block opacity-60"
                  >
                    {selectedService.category}
                  </motion.span>
                  <motion.h3 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-heading font-bold uppercase leading-tight mb-6 tracking-tighter"
                  >
                    {selectedService.name}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 leading-relaxed text-sm md:text-lg font-light mb-10"
                  >
                    {selectedService.description}
                  </motion.p>
                  
                  {/* Neural Copywriter Tool */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden group"
                  >
                     <div className="absolute top-0 right-0 p-3 opacity-20">
                       <Brain size={40} />
                     </div>
                     <h4 className="flex items-center gap-2 text-[#a8fbd3] font-mono text-xs uppercase tracking-widest mb-4 font-bold">
                       <Sparkles size={14} /> Neural Copywriter
                     </h4>
                     <p className="text-[10px] text-gray-500 mb-4">
                       Generate high-converting copy for this service instantly.
                     </p>
                     
                     <div className="flex gap-2 mb-4 flex-col md:flex-row">
                       <input 
                         type="text" 
                         value={copyTopic}
                         onChange={(e) => setCopyTopic(e.target.value)}
                         placeholder="Enter brand name, product, or topic..."
                         className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:border-[#a8fbd3] outline-none transition-colors"
                       />
                       <button 
                         onClick={handleGenerateCopy}
                         disabled={isGeneratingCopy || !copyTopic}
                         className="bg-white text-black px-4 py-3 md:py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#a8fbd3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full md:w-auto"
                       >
                         {isGeneratingCopy ? 'Processing...' : 'Generate'}
                       </button>
                     </div>

                     <AnimatePresence>
                       {generatedCopy && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           className="bg-black/40 rounded-lg p-4 text-xs text-gray-300 font-mono leading-relaxed border border-white/5 relative group/copy"
                         >
                           <button 
                             onClick={handleCopyToClipboard}
                             className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white"
                             title="Copy to clipboard"
                           >
                             {copySuccess ? <Check size={12} className="text-[#a8fbd3]" /> : <Copy size={12} />}
                           </button>
                           <div className="whitespace-pre-wrap">{generatedCopy}</div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </motion.div>

                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="w-full bg-[#a8fbd3] text-black hover:bg-white transition-all px-10 py-5 text-[10px] font-bold uppercase tracking-[0.4em] rounded-full shadow-[0_15px_30px_rgba(168,251,211,0.2)] flex items-center justify-center gap-3"
                  >
                    Synchronize Now <Sparkles size={14} />
                  </motion.button>
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5 shrink-0">
                   <button onClick={() => navigateService('prev')} className="flex items-center gap-3 text-white/30 hover:text-white transition-colors uppercase text-[9px] font-bold tracking-[0.3em]">
                     <ChevronLeft size={14} /> Prev
                   </button>
                   <button onClick={() => navigateService('next')} className="flex items-center gap-3 text-white/30 hover:text-white transition-colors uppercase text-[9px] font-bold tracking-[0.3em]">
                     Next <ChevronRight size={14} />
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 251, 211, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
