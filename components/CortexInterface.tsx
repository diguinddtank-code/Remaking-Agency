
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Zap, TrendingUp, Activity } from 'lucide-react';

const CortexInterface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let animationFrameId: number;

    // Grid Configuration
    const spacing = 40;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    const points: Point[] = [];

    // Mouse State
    const mouse = { x: -1000, y: -1000, radius: 200 };

    class Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      friction: number;
      ease: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.9; // Damping
        this.ease = 0.1; // Spring strength
      }

      update() {
        // Distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion Force (The "Distortion")
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = 0;

        if (distance < mouse.radius) {
          force = (mouse.radius - distance) / mouse.radius;
          // Push away
          this.vx -= forceDirectionX * force * 5; 
          this.vy -= forceDirectionY * force * 5;
        }

        // Return to origin (Spring)
        const returnX = this.originX - this.x;
        const returnY = this.originY - this.y;
        
        this.vx += returnX * this.ease;
        this.vy += returnY * this.ease;

        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Update position
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    // Initialize Grid
    const init = () => {
      points.length = 0;
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push(new Point(i * spacing, j * spacing));
        }
      }
    };

    // Draw Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update Points
      points.forEach(point => point.update());

      // Draw Grid Lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 251, 211, 0.15)'; // #a8fbd3 low opacity
      
      // We need to connect neighbors. Since it's a 1D array representing 2D grid:
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Connect to right neighbor
        if ((i + 1) % rows !== 0 && points[i + 1]) {
           ctx.moveTo(point.x, point.y);
           ctx.lineTo(points[i + 1].x, points[i + 1].y);
        }

        // Connect to bottom neighbor
        if (points[i + rows]) {
           ctx.moveTo(point.x, point.y);
           ctx.lineTo(points[i + rows].x, points[i + rows].y);
        }
      }
      ctx.stroke();

      // Draw Active Nodes (dots)
      points.forEach(point => {
        // Only draw dots that have moved significantly or are near mouse
        const dist = Math.abs(point.x - point.originX) + Math.abs(point.y - point.originY);
        if (dist > 1) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
            ctx.fillStyle = '#a8fbd3';
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setIsHovering(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
       const rect = canvas.getBoundingClientRect();
       mouse.x = e.touches[0].clientX - rect.left;
       mouse.y = e.touches[0].clientY - rect.top;
       setIsHovering(true);
    };

    window.addEventListener('resize', init);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] md:h-[800px] bg-black overflow-hidden cursor-none border-y border-white/5">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* VIGNETTE & SCANLINES */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-10"></div>

      {/* FLOATING HUD ELEMENTS */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
        
        {/* Title Layer */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="text-center mb-12 mix-blend-difference"
        >
           <h2 className="text-4xl md:text-8xl font-heading font-bold uppercase tracking-tighter text-white mb-4">
             Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-white blur-[1px]">Distortion</span>
           </h2>
           <p className="text-[#a8fbd3] font-mono text-xs md:text-sm uppercase tracking-[0.4em] animate-pulse">
             Interact to disrupt the status quo
           </p>
        </motion.div>

        {/* Floating Data Nodes - They appear nicely positioned around the center */}
        <div className="absolute inset-0 w-full h-full max-w-6xl mx-auto">
            {/* Node 1 */}
            <motion.div 
              className="absolute top-[20%] left-[10%] md:left-[20%] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
               <div className="p-2 bg-[#a8fbd3]/20 rounded-lg text-[#a8fbd3]"><Zap size={20} /></div>
               <div>
                 <div className="text-[10px] font-mono text-gray-400 uppercase">Conversion Velocity</div>
                 <div className="text-xl font-bold text-white">+340%</div>
               </div>
            </motion.div>

            {/* Node 2 */}
            <motion.div 
              className="absolute bottom-[25%] right-[10%] md:right-[20%] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
               <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><TrendingUp size={20} /></div>
               <div>
                 <div className="text-[10px] font-mono text-gray-400 uppercase">Market Share</div>
                 <div className="text-xl font-bold text-white">DOMINANT</div>
               </div>
            </motion.div>

            {/* Node 3 (Hidden on mobile) */}
            <motion.div 
              className="hidden md:flex absolute top-[60%] left-[15%] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl items-center gap-4"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
               <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Activity size={20} /></div>
               <div>
                 <div className="text-[10px] font-mono text-gray-400 uppercase">Algorithm Status</div>
                 <div className="text-xl font-bold text-white">HACKED</div>
               </div>
            </motion.div>
        </div>
      </div>
      
      {/* Interactive Cursor Hint */}
      {!isHovering && (
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30 opacity-60">
            <MousePointer2 className="w-6 h-6 text-[#a8fbd3] animate-bounce" />
            <span className="text-[9px] uppercase tracking-widest text-white">Engage The Grid</span>
         </div>
      )}
    </div>
  );
};

export default CortexInterface;
