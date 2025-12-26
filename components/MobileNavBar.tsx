
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Home, Layers, Briefcase, Zap, Brain, Users } from 'lucide-react';

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
    { id: 'root', icon: <Home size={18} />, label: 'Home' }, 
    { id: 'services', icon: <Layers size={18} />, label: 'Services' },
    { id: 'team', icon: <Users size={18} />, label: 'Staff' }, 
    { id: 'portfolio', icon: <Briefcase size={18} />, label: 'Cases' },
    { id: 'simulator', icon: <Brain size={18} />, label: 'AI Sim' },
    { id: 'estratégia', icon: <Zap size={18} />, label: 'Book' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pt-2 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl border-t border-white/10">
      <div className="flex justify-between items-end bg-[#0f0f0f] rounded-2xl px-1 py-3 border border-white/5 shadow-2xl relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#a8fbd3]/10 via-purple-500/10 to-[#a8fbd3]/10 blur-xl -z-10 rounded-full opacity-50" />
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id === 'root' ? 'root' : item.id)}
            className="flex-1 flex flex-col items-center gap-1 group active:scale-90 transition-transform min-w-0"
          >
            <div className={`p-1.5 rounded-xl transition-colors group-hover:bg-white/10 ${item.id === 'estratégia' ? 'text-[#a8fbd3] bg-white/5' : 'text-white/60'}`}>
              {item.icon}
            </div>
            <span className="text-[8px] font-bold uppercase tracking-wide text-white/40 group-hover:text-white transition-colors truncate w-full text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavBar;
