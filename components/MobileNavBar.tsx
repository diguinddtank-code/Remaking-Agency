
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
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'root', icon: <Home size={20} />, label: 'Home' }, 
    { id: 'services', icon: <Layers size={20} />, label: 'Services' },
    { id: 'team', icon: <Users size={20} />, label: 'Staff' }, 
    { id: 'portfolio', icon: <Briefcase size={20} />, label: 'Cases' },
    { id: 'simulator', icon: <Brain size={20} />, label: 'AI Sim' },
    { id: 'estratégia', icon: <Zap size={20} />, label: 'Book' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-[#050505]/90 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id === 'root' ? 'root' : item.id)}
            className="flex-1 flex flex-col items-center gap-1.5 active:scale-95 transition-transform relative"
          >
            <div className={`p-1.5 rounded-full transition-colors relative ${item.id === 'estratégia' ? 'text-[#a8fbd3] bg-[#a8fbd3]/10' : 'text-white/60'}`}>
              {item.icon}
              {/* Notification Badge for 'Book' item */}
              {item.id === 'estratégia' && (
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center border border-[#050505] animate-pulse">
                   <span className="text-[8px] font-bold text-white">1</span>
                </div>
              )}
            </div>
            <span className="text-[9px] font-medium uppercase tracking-wider text-white/50 truncate w-full text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      {/* Safe area padding for newer iPhones */}
      <div className="h-4 w-full bg-transparent" />
    </div>
  );
};

export default MobileNavBar;
