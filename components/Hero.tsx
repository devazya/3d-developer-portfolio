'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, CodeXml, Terminal, Sparkles } from 'lucide-react';

export default function Hero() {
  // Mouse movement tracking for interactive lighting effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  // Smooth spring physics for ambient background tilt/glow
  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-100, 100]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-100, 100]), springConfig);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white"
    >
      {/* Interactive Ambient Mouse Glow */}
      <motion.div 
        style={{ x: spotlightX, y: spotlightY }}
        className="absolute pointer-events-none w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 rounded-full blur-[120px] -z-10"
      />

      {/* Grid Pattern Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center z-10">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md mb-8 shadow-inner"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-slate-300">
            Available for High-Ticket Full-Stack & Automation Contracts
          </span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        </motion.div>

        {/* Staggered Heading Reveal */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            Hi, I&apos;m <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Divyanshu Devajya</span>
          </motion.h1>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
            }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Full-Stack Software Engineer & Automation Specialist. I build scalable web platforms, custom data scrapers, and high-performance backend pipelines for global clients.
          </motion.p>
        </motion.div>

        {/* Magnetic Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200"
          >
            <Terminal className="w-4 h-4" />
            Explore Projects
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-medium transition-all duration-200"
          >
            <CodeXml className="w-4 h-4" />
            GitHub Profile
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}