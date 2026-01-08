'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Norse runes for floating effect
    const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'];

    // Create red falling embers
    const createEmbers = () => {
      for (let i = 0; i < 40; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.left = `${Math.random() * 100}%`;
        ember.style.animationDuration = `${15 + Math.random() * 20}s`;
        ember.style.animationDelay = `${Math.random() * 15}s`;
        ember.style.width = `${2 + Math.random() * 4}px`;
        ember.style.height = ember.style.width;
        container.appendChild(ember);
      }
    };

    // Create blue floating runes
    const createRunes = () => {
      for (let i = 0; i < 12; i++) {
        const rune = document.createElement('div');
        rune.className = 'rune';
        rune.textContent = runes[Math.floor(Math.random() * runes.length)];
        rune.style.left = `${Math.random() * 100}%`;
        rune.style.animationDuration = `${25 + Math.random() * 20}s`;
        rune.style.animationDelay = `${Math.random() * 20}s`;
        rune.style.fontSize = `${20 + Math.random() * 16}px`;
        container.appendChild(rune);
      }
    };

    // Create sparkling stars
    const createStars = () => {
      for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${12 + Math.random() * 15}s`;
        star.style.animationDelay = `${Math.random() * 12}s`;
        container.appendChild(star);
      }
    };

    // Initialize particles
    createEmbers();
    createRunes();
    createStars();

    // Cleanup
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
}
