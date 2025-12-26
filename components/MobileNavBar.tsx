
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Home, Layers, Briefcase, Zap, Brain } from 'lucide-react';

const MobileNavBar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset para compensar header fixo
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'root', icon: <Home size={20} />, label: 'Home' }, // Scroll to top
    { id: 'services', icon: <Layers size={20} />, label: 'Services' },
    { id: 'portfolio', icon: <Briefcase size={20} />, label: 'Cases' },
    { id: 'simulator', icon: <Brain size={20} />, label: 'AI Sim' },
    { id: 'estratégia', icon: <Zap size={20} />, label: 'Book' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-6 pb-6 pt-4 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl border-t border-white/10">
      <div className="flex justify-between items-end bg-[#111] rounded-full px-2 py-3 border border-white/5 shadow-2xl relative">
        {/* Glow effect behind the bar */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#a8fbd3]/20 via-purple-500/20 to-[#a8fbd3]/20 blur-xl -z-10 rounded-full opacity-50" />
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id === 'root' ? 'root' : item.id)}
            className="flex-1 flex flex-col items-center gap-1.5 group active:scale-90 transition-transform"
          >
            <div className={`p-1.5 rounded-full transition-colors group-hover:bg-white/10 ${item.id === 'estratégia' ? 'text-[#a8fbd3]' : 'text-white/70'}`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavBar;
