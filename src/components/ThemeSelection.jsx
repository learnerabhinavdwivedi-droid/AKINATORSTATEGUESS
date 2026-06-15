"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Simple decorative diamond component
const DiamondSparkle = ({ top, left, size, delay, opacity }) => (
  <motion.div
    className="absolute bg-white"
    style={{
      top,
      left,
      width: size,
      height: size,
      opacity,
      rotate: 45,
    }}
    animate={{
      y: [0, -10, 0],
      opacity: [opacity, opacity + 0.3, opacity],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

// Vintage Gold Filigree SVG Divider
const GoldFiligree = () => (
  <div className="flex justify-center items-center w-full mb-6">
    <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Gem */}
      <path d="M100 2L105 10L100 18L95 10L100 2Z" fill="#FBBF24" />
      {/* Left Swirls */}
      <path d="M90 10C80 5 70 15 60 10C50 5 40 10 30 10" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M75 10C65 15 55 5 45 10" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Right Swirls */}
      <path d="M110 10C120 5 130 15 140 10C150 5 160 10 170 10" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M125 10C135 15 145 5 155 10" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Connecting Lines */}
      <line x1="10" y1="10" x2="25" y2="10" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="175" y1="10" x2="190" y2="10" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

export default function ThemeSelection() {
  const [activeTheme, setActiveTheme] = useState('Regional History');

  const themes = [
    'Characters',
    'Objects',
    'Animals',
    'Famous States',
    'Regional History',
    'Cultural Landmarks'
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#b3d4f0] via-[#d0e5f2] to-[#e8f4fa] p-4 font-sans">
      
      {/* Background Layered Elements */}
      {/* Abstract fluid shapes to mimic the reference backdrop */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full">
          <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="rgba(165, 210, 235, 0.5)" />
          <path d="M0,70 Q30,40 60,70 T100,60 L100,100 L0,100 Z" fill="rgba(190, 225, 245, 0.4)" />
        </svg>
      </div>

      {/* Decorative Diamonds */}
      <DiamondSparkle top="20%" left="15%" size={24} delay={0} opacity={0.5} />
      <DiamondSparkle top="25%" left="13%" size={12} delay={1} opacity={0.3} />
      <DiamondSparkle top="70%" left="20%" size={16} delay={0.5} opacity={0.4} />
      <DiamondSparkle top="75%" left="22%" size={10} delay={1.5} opacity={0.2} />
      <DiamondSparkle top="45%" left="48%" size={14} delay={2} opacity={0.6} />
      <DiamondSparkle top="90%" left="90%" size={20} delay={0.2} opacity={0.5} />

      {/* Main Two-Column Layout */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: Character Vector */}
        <div className="flex justify-center md:justify-end items-end h-full relative">
          <motion.img 
            src="/genie.png" 
            alt="Ankanitor Genie" 
            className="w-2/3 md:w-4/5 max-w-[350px] drop-shadow-2xl z-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Right Column: Conversational Elements */}
        <div className="flex flex-col gap-8 items-center md:items-start z-10 w-full max-w-md mx-auto md:mx-0">
          
          {/* Speech Bubble Card */}
          <motion.div 
            className="relative bg-white/60 backdrop-blur-md shadow-xl border border-white/80 rounded-2xl p-6 text-center w-full"
            initial={{ scale: 0.9, opacity: 0, x: -20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Pointer Arrow on Left Edge (visible on desktop) */}
            <div className="hidden md:block absolute top-1/2 -left-[14px] -translate-y-1/2 w-8 h-8 bg-white/60 backdrop-blur-md border-l border-b border-white/80 rotate-45 transform origin-center shadow-[-2px_2px_4px_rgba(0,0,0,0.05)] rounded-sm"></div>
            
            {/* Pointer Arrow on Bottom Edge (visible on mobile) */}
            <div className="block md:hidden absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white/60 backdrop-blur-md border-r border-b border-white/80 rotate-45 transform origin-center shadow-[2px_2px_4px_rgba(0,0,0,0.05)] rounded-sm"></div>

            <h2 className="text-[1.35rem] font-bold text-slate-800 leading-snug tracking-wide">
              Select your preferred<br />challenge area, expert!
            </h2>
            <p className="text-slate-600 mt-3 text-[0.95rem] font-medium tracking-wide">
              Choose wisely to proceed.
            </p>
          </motion.div>

          {/* Theme Selection Panel */}
          <motion.div 
            className="w-full relative px-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GoldFiligree />

            <div className="flex flex-col gap-4">
              {themes.map((theme, index) => {
                const isActive = activeTheme === theme;
                return (
                  <motion.button
                    key={theme}
                    onClick={() => setActiveTheme(theme)}
                    whileHover={{ scale: isActive ? 1.02 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-b from-[#fceabb] via-[#f8b500] to-[#fceabb] border-2 border-amber-400 text-[#3b2a0c] shadow-[0_0_20px_rgba(251,191,36,0.6)] z-10 scale-105'
                        : 'bg-[#f4f7f9] border border-slate-300 text-slate-700 shadow-md hover:bg-white'
                      }
                    `}
                    style={isActive ? { textShadow: '0 1px 2px rgba(255,255,255,0.5)' } : {}}
                  >
                    {/* Inner highlight ring for active state */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-lg border border-white/40 pointer-events-none"></div>
                    )}
                    {theme}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
