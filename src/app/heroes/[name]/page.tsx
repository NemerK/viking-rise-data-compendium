'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { heroes } from '@/data/heroes';

// Get type color
function getTypeColor(herotype: string): string {
  switch (herotype) {
    case 'Infantry': return 'from-green-500 to-green-600';
    case 'Pikeman': return 'from-blue-500 to-blue-600';
    case 'Archers': return 'from-red-500 to-red-600';
    case 'Leader': return 'from-purple-500 to-purple-600';
    default: return 'from-slate-500 to-slate-600';
  }
}

// All abilities with their display info
const abilityInfo: { [key: string]: { icon: string; label: string; color: string } } = {
  burn: { icon: '🔥', label: 'Burn', color: 'ability-burn' },
  bleed: { icon: '🩸', label: 'Bleed', color: 'ability-bleed' },
  poison: { icon: '☠️', label: 'Poison', color: 'ability-poison' },
  slow: { icon: '❄️', label: 'Slow', color: 'ability-slow' },
  heal: { icon: '💚', label: 'Heal', color: 'ability-heal' },
  shield: { icon: '🛡️', label: 'Shield', color: 'ability-shield' },
  silence: { icon: '🔇', label: 'Silence', color: 'ability-silence' },
  rage: { icon: '😡', label: 'Rage', color: 'ability-rage' },
  buff: { icon: '⬆️', label: 'Buff', color: 'ability-buff' },
  debuff: { icon: '⬇️', label: 'Debuff', color: 'ability-debuff' },
  counterattack: { icon: '⚡', label: 'Counterattack', color: 'ability-default' },
  basicattack: { icon: '⚔️', label: 'Basic Attack', color: 'ability-default' },
  directdamage: { icon: '💥', label: 'Direct Damage', color: 'ability-default' },
  dispel: { icon: '✨', label: 'Dispel', color: 'ability-default' },
  purify: { icon: '🌟', label: 'Purify', color: 'ability-default' },
  evasion: { icon: '💨', label: 'Evasion', color: 'ability-default' },
  brokenblade: { icon: '🗡️', label: 'Broken Blade', color: 'ability-default' },
  damagereduction: { icon: '🛡️', label: 'Damage Reduction', color: 'ability-default' },
  immunitycontrol: { icon: '🚫', label: 'Immunity Control', color: 'ability-default' },
  retribution: { icon: '⚖️', label: 'Retribution', color: 'ability-default' },
  devastation: { icon: '💀', label: 'Devastation', color: 'ability-default' },
  disarm: { icon: '🔒', label: 'Disarm', color: 'ability-default' },
  lacerate: { icon: '🩸', label: 'Lacerate', color: 'ability-bleed' },
};

export default function HeroDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const decodedName = decodeURIComponent(name);
  const hero = heroes.find(h => h.name.toLowerCase() === decodedName.toLowerCase());

  if (!hero) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-3xl font-bold text-white mb-4">Hero Not Found</h1>
          <p className="text-slate-400 mb-6">Could not find a hero named "{decodedName}"</p>
          <Link href="/heroes" className="btn-primary">
            ← Back to Heroes
          </Link>
        </div>
        </div>
      );
  }

  // Get hero's active abilities
  const activeAbilities = Object.entries(abilityInfo).filter(([key]) => {
    return (hero as any)[key] === true;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/heroes" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <span>←</span>
          <span>Back to Heroes</span>
        </Link>

        {/* Hero Header */}
        <div className="glass-card p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Portrait - No frame, image is pre-framed */}
            <div className="relative w-48 h-48 mx-auto md:mx-0 flex-shrink-0 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                <Image
                  src={hero.portrait}
                  alt={hero.name}
                  fill
                className="object-contain"
                sizes="192px"
                priority
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-3">{hero.name}</h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getTypeColor(hero.herotype)}`}>
                  {hero.herotype}
                </span>
                <span className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-200 bg-slate-700/50">
                  {hero.heroclass}
                </span>
                <span className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-300 bg-slate-800/50">
                  ID: {hero.id}
                </span>
              </div>

              <p className="text-slate-400">
                {hero.name} is a {hero.heroclass.toLowerCase()} type {hero.herotype.toLowerCase()} hero 
                with {activeAbilities.length} special abilities.
              </p>
            </div>
          </div>
        </div>

        {/* Abilities Section */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Hero Abilities</h2>
          
          {activeAbilities.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {activeAbilities.map(([key, info]) => (
                <div key={key} className={`ability-badge ${info.color}`}>
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
            <p className="text-slate-400 text-center py-8">
              No special abilities recorded for this hero yet.
            </p>
                        )}
                      </div>

        {/* Team Builder CTA */}
        <div className="glass-card p-6 mt-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-3">Build a Team with {hero.name}</h3>
          <p className="text-slate-400 mb-4">
            Add {hero.name} to your team composition in the Team Builder
          </p>
          <Link href="/team-builder" className="btn-primary inline-flex items-center gap-2">
            <span>🛡️</span>
            <span>Open Team Builder</span>
          </Link>
          </div>
      </div>
    </div>
  );
}
