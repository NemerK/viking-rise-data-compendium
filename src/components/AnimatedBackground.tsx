'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create embers
    const createEmbers = () => {
      const emberCount = 50;
      for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.left = Math.random() * 100 + '%';
        ember.style.animationDuration = (Math.random() * 20 + 30) + 's';
        ember.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(ember);
      }
    };

    // Create floating runes
    const createRunes = () => {
      const runeCount = 15;
      const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'];
      
      for (let i = 0; i < runeCount; i++) {
        const rune = document.createElement('div');
        rune.className = 'rune';
        rune.textContent = runes[Math.floor(Math.random() * runes.length)];
        rune.style.left = Math.random() * 100 + '%';
        rune.style.animationDuration = (Math.random() * 25 + 30) + 's';
        rune.style.animationDelay = Math.random() * 15 + 's';
        container.appendChild(rune);
      }
    };

    // Create sparkling stars
    const createStars = () => {
      const starCount = 30;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 15 + 20) + 's';
        star.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(star);
      }
    };

    // Create all particles
    createEmbers();
    createRunes();
    createStars();

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="animated-background" />
      <div className="background-overlay" />
    </>
  );
};

export default AnimatedBackground;
