'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/types';
import { getHeroes, getHeroSkillsById, HeroSkillData, getSkillTypeColor } from '@/lib/data-service';

// Get type color
function getTypeColor(herotype: string): string {
  switch (herotype) {
    case 'Infantry': return 'from-green-500 to-green-600';
    case 'Pikeman': return 'from-blue-500 to-blue-600';
    case 'Archers': return 'from-red-500 to-red-600';
    case 'Archer': return 'from-red-500 to-red-600';
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
  
  const [hero, setHero] = useState<Hero | null>(null);
  const [heroSkills, setHeroSkills] = useState<HeroSkillData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchHeroData() {
      setLoading(true);
      try {
        const heroes = await getHeroes();
        const foundHero = heroes.find(h => h.name.toLowerCase() === decodedName.toLowerCase());
        
        if (!foundHero) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        setHero(foundHero);
        const skills = await getHeroSkillsById(foundHero.id);
        setHeroSkills(skills);
      } catch (error) {
        console.error('Error fetching hero:', error);
        setNotFound(true);
      }
      setLoading(false);
    }
    
    fetchHeroData();
  }, [decodedName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading hero...</p>
        </div>
      </div>
    );
  }

  if (notFound || !hero) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-3xl font-bold text-white mb-4">Hero Not Found</h1>
          <p className="text-slate-400 mb-6">Could not find a hero named &quot;{decodedName}&quot;</p>
          <Link href="/heroes" className="btn-primary">
            ← Back to Heroes
          </Link>
        </div>
      </div>
    );
  }

  // Get hero's active abilities (effect flags)
  const activeAbilities = Object.entries(abilityInfo).filter(([key]) => {
    return (hero as any)[key] === true;
  });

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/heroes" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors text-sm"
        >
          <span>←</span>
          <span>Back to Heroes</span>
        </Link>

        {/* Compact Hero Header */}
        <div className="glass-card p-4 mb-4">
          <div className="flex items-center gap-4">
            {/* Small Portrait */}
            <div className="relative w-20 h-20 flex-shrink-0 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
              <Image
                src={hero.portrait}
                alt={hero.name}
                fill
                className="object-contain"
                sizes="80px"
                priority
              />
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{hero.name}</h1>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(hero.herotype || 'Unknown')}`}>
                  {hero.herotype || 'Unknown'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-200 bg-slate-700/50">
                  {hero.heroclass || 'Unknown'}
                </span>
                {hero.rarity && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hero.rarity === 'Legendary' ? 'text-yellow-300 bg-yellow-500/20' :
                    hero.rarity === 'Epic' ? 'text-purple-300 bg-purple-500/20' :
                    'text-blue-300 bg-blue-500/20'
                  }`}>
                    {hero.rarity}
                  </span>
                )}
              </div>
            </div>

            {/* Team Builder CTA - Inline */}
            <Link 
              href="/team-builder" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 hover:bg-amber-500/30 transition-colors text-sm"
            >
              <span>🛡️</span>
              <span>Add to Team</span>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skills Section */}
          <div className="glass-card p-4">
            <h2 className="text-lg font-bold text-white mb-4">Hero Skills</h2>
            
            {heroSkills && (heroSkills.skillOne || heroSkills.skillTwo || heroSkills.awakenedSkill) ? (
              <div className="space-y-3">
                {/* Skill 1 */}
                {heroSkills.skillOne && (
                  <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <div className="flex items-start gap-3">
                      {heroSkills.skillOne.icon ? (
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={heroSkills.skillOne.icon}
                            alt={heroSkills.skillOne.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                          <span className="text-purple-400 text-lg font-bold">1</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-white">{heroSkills.skillOne.name}</h3>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${getSkillTypeColor(heroSkills.skillOne.type)}`}>
                            {heroSkills.skillOne.type}
                          </span>
                          {heroSkills.skillOne.probability < 100 && (
                            <span className="text-[10px] text-slate-400">
                              {heroSkills.skillOne.probability}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-3">{heroSkills.skillOne.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skill 2 */}
                {heroSkills.skillTwo && (
                  <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <div className="flex items-start gap-3">
                      {heroSkills.skillTwo.icon ? (
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={heroSkills.skillTwo.icon}
                            alt={heroSkills.skillTwo.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                          <span className="text-purple-400 text-lg font-bold">2</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-white">{heroSkills.skillTwo.name}</h3>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${getSkillTypeColor(heroSkills.skillTwo.type)}`}>
                            {heroSkills.skillTwo.type}
                          </span>
                          {heroSkills.skillTwo.probability < 100 && (
                            <span className="text-[10px] text-slate-400">
                              {heroSkills.skillTwo.probability}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-3">{heroSkills.skillTwo.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Awakened Skill */}
                {heroSkills.awakenedSkill && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      {heroSkills.awakenedSkill.icon ? (
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={heroSkills.awakenedSkill.icon}
                            alt={heroSkills.awakenedSkill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                          <span className="text-amber-400 text-lg">★</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-amber-300">{heroSkills.awakenedSkill.name}</h3>
                          <span className="text-[10px] px-1.5 py-0.5 rounded text-amber-400 bg-amber-500/20 border border-amber-500/30">
                            Awakened
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-3">{heroSkills.awakenedSkill.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-4 text-sm">
                No skills recorded yet.
              </p>
            )}
          </div>

          {/* Talents Section */}
          <div className="glass-card p-4">
            <h2 className="text-lg font-bold text-white mb-4">Hero Talents</h2>
            
            {heroSkills && heroSkills.talents.length > 0 ? (
              <div className="space-y-3">
                {heroSkills.talents.map((talent, index) => (
                  <div key={index} className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      {talent.icon ? (
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={talent.icon}
                            alt={talent.name}
                            fill
                            className="object-contain rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-blue-300">{talent.name}</h3>
                          {talent.type && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                              {talent.type}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2">{talent.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-4 text-sm">
                No talents recorded yet.
              </p>
            )}
          </div>
        </div>

        {/* Effect Flags Section - Compact */}
        {activeAbilities.length > 0 && (
          <div className="glass-card p-4 mt-4">
            <h2 className="text-lg font-bold text-white mb-3">Abilities &amp; Effects</h2>
            <div className="flex flex-wrap gap-2">
              {activeAbilities.map(([key, info]) => (
                <div key={key} className={`ability-badge ${info.color} text-xs`}>
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Team Builder CTA */}
        <div className="sm:hidden glass-card p-4 mt-4 text-center">
          <Link href="/team-builder" className="btn-primary inline-flex items-center gap-2 text-sm">
            <span>🛡️</span>
            <span>Add {hero.name} to Team</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
