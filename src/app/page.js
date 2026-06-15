"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mystic glowing orb component for the background
const GlowingOrb = ({ top, left, size, color, delay }) => (
  <motion.div
    className={`absolute rounded-full blur-[100px] ${color} pointer-events-none`}
    style={{ top, left, width: size, height: size }}
    animate={{ 
      scale: [1, 1.2, 1], 
      opacity: [0.3, 0.5, 0.3] 
    }}
    transition={{ 
      duration: 8 + Math.random() * 4, 
      repeat: Infinity, 
      ease: "easeInOut", 
      delay: delay 
    }}
  />
);

export default function AnkanitorApp() {
  const [screen, setScreen] = useState("start"); // "start", "game", "result"
  
  // Game Logic State
  const [gameState, setGameState] = useState({
    currentTurn: 0,
    certaintyProgress: 0,
    questionText: "Awakening the Genie...",
    isFinalGuess: false,
    guessedStateName: null,
    topCandidates: []
  });
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(null);

  const processTurn = async (latestUserResponse, latestAttributeKey, currentHistory) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ankanitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: currentHistory,
          latestUserResponse,
          latestAttributeKey
        })
      });

      if (!response.ok) throw new Error("API failed");
      const data = await response.json();
      
      setGameState({
        currentTurn: data.currentTurn || (gameState.currentTurn + 1),
        certaintyProgress: data.certaintyProgress || 0,
        questionText: data.questionText || "Let me think...",
        isFinalGuess: data.isFinalGuess || false,
        guessedStateName: data.guessedStateName || null,
        topCandidates: data.topCandidates || []
      });

      if (data.isFinalGuess) {
        setTimeout(() => setScreen("result"), 600);
      }
    } catch (error) {
      console.error(error);
      alert("Error contacting the Genie API!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    setScreen("game");
    setHistory([]);
    setCorrectGuess(null);
    processTurn("START", "START", []);
  };

  const handleAnswer = (answer) => {
    if (isLoading) return;
    const currentQ = gameState.questionText;
    const newHistory = [...history, { question: currentQ, answer }];
    setHistory(newHistory);
    processTurn(answer, currentQ, newHistory);
  };

  // -------------------------------------------------------------
  // RENDER: START SCREEN (Landing Page)
  // -------------------------------------------------------------
  if (screen === 'start') {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans text-white">
        {/* Background Canvas: Deep slate with glowing orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <GlowingOrb top="10%" left="20%" size="40vw" color="bg-indigo-900" delay={0} />
          <GlowingOrb top="60%" left="60%" size="50vw" color="bg-purple-900" delay={2} />
          <GlowingOrb top="40%" left="-10%" size="30vw" color="bg-blue-900" delay={4} />
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column: Hero Text Hub */}
          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* Vector Asset Placeholder / Logo */}
            <div className="w-16 h-16 md:w-20 md:h-20 mb-2 drop-shadow-[0_0_15px_rgba(243,210,145,0.6)]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#F3D291]">
                <path d="M12 2C12 2 14 5 14 7C14 8.5 12.5 9 12 11C11.5 13 15 14 15 16C15 18 10 18.5 7 18.5C4 18.5 2 17 2 15C2 13 6 12.5 8 11.5C10 10.5 10 9 10 7C10 5 12 2 12 2Z" fill="currentColor" opacity="0.8"/>
                <path d="M4 21C4 20.4477 4.44772 20 5 20H19C19.5523 20 20 20.4477 20 21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21Z" fill="currentColor"/>
                <path d="M19 15C19 13.5 22 13 22 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest leading-tight uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 drop-shadow-md">
              THE MIND <br /> READER <br /> RETURNS.
            </h1>
            
            <p className="text-[#F3D291] text-lg md:text-xl font-medium tracking-wide max-w-md drop-shadow-sm">
              Think of an Indian State or Union Territory. He will guess it with amazing accuracy.
            </p>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 relative inline-flex items-center justify-center px-16 py-4 min-w-[240px] rounded-full font-extrabold text-2xl tracking-[0.3em] pl-[0.3em] uppercase whitespace-nowrap shadow-[0_0_30px_rgba(220,38,38,0.5)] border-4 border-[#F3D291] text-white bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:shadow-[0_0_40px_rgba(243,210,145,0.6)] transition-all duration-300"
            >
              START
            </motion.button>
          </motion.div>

          {/* Right Column: Genie Showcase */}
          <div className="flex justify-center items-center h-full relative">
            {/* Outer Div handles the 1.6s Entrance Fly-In */}
            <motion.div
              initial={{ y: 300, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="relative z-20 w-full max-w-[400px]"
            >
              {/* Inner Div handles the Zig-Zag and Full Body Sway Animation */}
              <motion.div
                animate={{ 
                  y: [0, -20, 10, -15, 0], 
                  x: [0, 15, -10, 15, 0],
                  rotate: [0, 3, -3, 2, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="origin-bottom"
              >
                {/* Innermost Image handles the breathing stretch and Wink Callout Pulse */}
                <motion.img 
                  src="/genie.png" 
                  alt="Ankanitor Genie" 
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  animate={{ scale: [1, 1.02, 1, 1.01, 1], scaleX: [1, 1.02, 0.98, 1, 1] }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    times: [0, 0.05, 0.1, 0.5, 1]
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: GAME & RESULT SCREENS
  // -------------------------------------------------------------
  let speechBubbleContent;
  let panelContent;

  if (screen === 'game') {
    speechBubbleContent = (
      <h2 className="text-[1.35rem] font-bold text-slate-900 leading-snug tracking-wide">
        {isLoading ? "Consulting the mystic arts..." : gameState.questionText}
      </h2>
    );

    const answerOptions = [
      { id: 'YES', label: 'Yes' },
      { id: 'PROBABLY', label: 'Probably' },
      { id: 'DONT_KNOW', label: "Don't Know" },
      { id: 'PROBABLY_NOT', label: 'Probably Not' },
      { id: 'NO', label: 'No' }
    ];

    panelContent = (
      <div className="flex flex-col gap-4 mt-2 w-full">
        {answerOptions.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-800/80 backdrop-blur-md border border-[#F3D291]/50 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-slate-700 hover:border-[#F3D291] hover:shadow-[0_0_15px_rgba(243,210,145,0.4)] disabled:opacity-50 w-full transition-all"
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    );
  } else if (screen === 'result') {
    speechBubbleContent = (
      <>
        <h2 className="text-[1.35rem] font-bold text-slate-900 leading-snug tracking-wide">
          I sense you are thinking of...<br/>
          <span className="text-red-700 text-3xl mt-2 block drop-shadow-sm font-extrabold uppercase tracking-wider">{gameState.guessedStateName || "—"}</span>
        </h2>
      </>
    );

    panelContent = (
      <div className="flex flex-col gap-4 mt-4 w-full">
        {correctGuess === null && (
          <>
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => setCorrectGuess(true)} 
              className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 border border-[#F3D291] text-white font-bold text-lg py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.6)]"
            >
              🎉 You got it!
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={() => setCorrectGuess(false)} 
              className="bg-slate-800 border border-slate-500 text-slate-300 font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-slate-700 hover:text-white"
            >
              😅 Not quite...
            </motion.button>
          </>
        )}
        
        {correctGuess !== null && (
          <>
            <p className="text-center font-bold text-[#F3D291] text-xl mb-4 drop-shadow-md">
              {correctGuess ? "🧞 My mystic powers are unmatched!" : "Ah, the realm of thoughts is clouded today."}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => handleStart()} 
              className="bg-transparent border-2 border-[#F3D291] text-[#F3D291] hover:bg-[#F3D291] hover:text-slate-950 font-bold text-lg py-3 px-6 rounded-full shadow-[0_0_15px_rgba(243,210,145,0.3)] transition-all"
            >
              Play Again
            </motion.button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans text-white">
      
      {/* Background Layered Elements - Mystic Game Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GlowingOrb top="10%" left="20%" size="40vw" color="bg-indigo-900" delay={0} />
        <GlowingOrb top="60%" left="60%" size="50vw" color="bg-purple-900" delay={2} />
        <GlowingOrb top="40%" left="-10%" size="30vw" color="bg-blue-900" delay={4} />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Floating Header UI */}
      {screen === 'game' && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-6 right-6 flex flex-col md:flex-row gap-2 md:gap-4 z-50"
        >
          <div className="bg-slate-900/60 backdrop-blur-md shadow-lg border border-[#F3D291]/30 px-4 py-2 rounded-full font-bold text-[#F3D291] text-sm md:text-base tracking-widest uppercase">
            Q: {gameState.currentTurn || 1}
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md shadow-lg border border-[#F3D291]/30 px-4 py-2 rounded-full font-bold text-[#F3D291] text-sm md:text-base tracking-widest uppercase">
            Cert: {gameState.certaintyProgress}%
          </div>
        </motion.div>
      )}

      {/* Main Two-Column Layout */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-16 md:pt-0 px-6">
        
        {/* Left Column: Character Vector */}
        <div className="flex justify-center md:justify-end items-end h-full relative">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-2/3 md:w-4/5 max-w-[350px] relative z-20"
          >
            <motion.img 
              src="/genie.png" 
              alt="Ankanitor Genie" 
              className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        </div>

        {/* Right Column: Conversational Elements */}
        <div className="flex flex-col gap-6 items-center md:items-start z-10 w-full max-w-md mx-auto md:mx-0">
          
          {/* Speech Bubble Card */}
          <motion.div 
            key={`bubble-${screen}-${gameState.currentTurn}`}
            className="relative bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)] border-2 border-[#F3D291] rounded-2xl p-6 text-center w-full"
            initial={{ scale: 0.9, opacity: 0, x: -20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pointer Arrows */}
            <div className="hidden md:block absolute top-1/2 -left-[16px] -translate-y-1/2 w-8 h-8 bg-white border-l-2 border-b-2 border-[#F3D291] rotate-45 transform origin-center shadow-[-4px_4px_10px_rgba(0,0,0,0.1)] rounded-sm z-[-1]"></div>
            <div className="block md:hidden absolute -bottom-[16px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-r-2 border-b-2 border-[#F3D291] rotate-45 transform origin-center shadow-[4px_4px_10px_rgba(0,0,0,0.1)] rounded-sm z-[-1]"></div>

            <div className="relative z-10">
              {speechBubbleContent}
            </div>
          </motion.div>

          {/* Dynamic Panel */}
          <motion.div 
            key={`panel-${screen}`}
            className="w-full relative px-2 flex flex-col items-center md:items-stretch"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {panelContent}
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
