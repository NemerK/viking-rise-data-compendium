'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroes } from '@/data/heroes';
import { skills } from '@/data/skills';
import { Skill } from '@/types';
import SkillDetailModal from '@/components/SkillDetailModal';
import BackButton from '@/components/BackButton';

// Helper function to get diamond-shaped skill images for recommendations
function getDiamondSkillIcon(skillName: string): string {
  const diamondImageMap: { [key: string]: string } = {
    'Furious Hack and Slash': 'Furious-Hack-and-Slash-small.png',
    'Poison Arrow': 'Poison-Arrow-small.png',
    'Shield Wall': 'Shield-Support-small.png',
    'Healing Light': 'Blessed-Healing-small.png',
    'Battle Cry': 'Battle-Hymn-small.png',
    'Counter Strike': 'Counterstrike-small.png',
    'Divine Protection': 'Divine-Shield-small.png',
    'Divine Shield': 'Divine-Shield-small.png',
    'Silence': 'Silencer-small.png',
    'Silent Assassin': 'Silent-Invasion-small.png',
    'Rapid Fire': 'Rapid-Attack-small.png',
    'Blood Rage': 'Bloody-Rage-small.png',
    'Divine Blessing': 'Divine-Blessing-small.png',
    'Fearless Charge': 'Fearless-small.png',
    'Enchanted Pursuit': 'Enchanted-Pursuit-small.png',
    'Rest and Counterattack': 'Rest-and-Counterattack-small.png',
    'Retaliate': 'Retaliate-small.png',
    'Siege': 'Siege-small.png',
    'Silent Invasion': 'Silent-Invasion-small.png',
    'Solitude': 'Solitude-small.png',
    'Splinter': 'Splinter-small.png',
    'Tenacity': 'Tenacity-small.png',
    'This Too Shall Pass': 'This-Too-Shall-Pass-small.png',
    'Thors Determination': 'Thors-Determination-small.png',
    'Tidal Attack': 'Tidal-Attack-small.png',
    'Trap of Despair': 'Trap-of-Despair-small.png',
    'Valkyries Gaze': 'Valkyries-Gaze-small.png',
    'Venom Aggregation': 'Venom-Agrregation-small.png',
    'Wild Indulgence': 'Wild-Indulgence-small.png',
    'First Strike': 'First-Strike-small.png',
    'Enrage': 'Enrage-small.png',
    'Odins Asylum': 'Odins-Asylum-small.png',
    'Rage Leech': 'Rage-Leech-small.png',
    'Hymn of Life': 'Hymn-of-Life-small.png',
    'Deadly Counterattack': 'Deadly-Counterattack-small.png',
    'Devastating Charge': 'Devastating-Charge-small.png',
    'Disarmament': 'Disarmament-small.png',
    'On Alert': 'On-Alert-small.png',
    'Blessed Negation': 'Blessed-Negation-small.png',
    'Blessed by Fate': 'Blessed-by-Fate-small.png',
    'Broken Armor': 'Broken-Armor-small.png',
    'Blow of Chaos': 'Blow-of-Chaos-small.png',
    'Shield Reflector': 'Shield-Reflector-small.png',
    'Blood Eagle Punishment': 'Blood-Eagle-Punishment-small.png',
    'Fiery Detonation': 'Fiery-Detonation-small.png',
    'Bloodstained Icefield': 'Bloodstained-Icefield-small.png',
    'Berserk Killing Machine': 'Berserk-Killing-Machine-small.png',
    'Fireball': 'Fiery-Detonation-small.png',
    'Ice Shard': 'Bloodstained-Icefield-small.png',
    'Berserker Rage': 'Berserk-Killing-Machine-small.png',
    'Disarm': 'Disarmament-small.png',
    'Evasion': 'On-Alert-small.png',
    'Dispel': 'Blessed-Negation-small.png',
    'Broken Blade': 'Broken-Armor-small.png',
    'Immunity Control': 'Divine-Shield-small.png',
    'Devastation': 'Devastating-Charge-small.png',
    'Damage Reduction': 'Divine-Shield-small.png',
    'Retribution': 'Retaliate-small.png',
    'Lacerate': 'Splinter-small.png'
  };

  const imageFile = diamondImageMap[skillName] || 'none-small.png';
  return `/images/skills/small/${imageFile}`;
}

export default function HeroDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const hero = heroes.find(h => h.name.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase());
  
  // Modal states
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isSkillDetailOpen, setIsSkillDetailOpen] = useState(false);


  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsSkillDetailOpen(true);
  };

  if (!hero) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Hero Not Found</h1>
            <BackButton href="/heroes" text="Back to Heroes" />
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen">
      {/* Compact Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <BackButton href="/heroes" text="Back to Heroes" />
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src={hero.portrait}
                  alt={hero.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {hero.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    hero.heroClass === 'Infantry' ? 'bg-green-500' :
                    hero.heroClass === 'Pikeman' ? 'bg-yellow-500' :
                    hero.heroClass === 'Archer' ? 'bg-red-500' :
                    hero.heroClass === 'Porter' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`}>
                    {hero.heroClass}
                  </span>
                  <span className="text-xs text-gray-400">{hero.season}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Skills and Description Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Skills Section */}
          <div className="lg:col-span-2 bg-gray-800/50 rounded-xl p-3 border border-gray-700">
            <h2 className="text-base font-bold text-white mb-2">Skills</h2>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Base Skill 1 */}
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-1">
                  <Image
                    src={hero.skills.baseSkill1.icon}
                    alt={hero.skills.baseSkill1.name}
                    fill
                    className="object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => handleSkillClick(hero.skills.baseSkill1)}
                    sizes="64px"
                  />
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">
                  {hero.skills.baseSkill1.name}
                </h3>
                <p className="text-xs text-gray-400">{hero.skills.baseSkill1.type}</p>
                <p className="text-xs text-gray-300">{hero.skills.baseSkill1.probability}%</p>
              </div>

              {/* Base Skill 2 */}
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-1">
                  <Image
                    src={hero.skills.baseSkill2.icon}
                    alt={hero.skills.baseSkill2.name}
                    fill
                    className="object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                    onClick={() => handleSkillClick(hero.skills.baseSkill2)}
                    sizes="64px"
                  />
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">
                  {hero.skills.baseSkill2.name}
                </h3>
                <p className="text-xs text-gray-400">{hero.skills.baseSkill2.type}</p>
                <p className="text-xs text-gray-300">{hero.skills.baseSkill2.probability}%</p>
              </div>

              {/* Awakened Skill */}
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-1">
                  {hero.skills.awakenSkill && (
                    <>
                      <Image
                        src={hero.skills.awakenSkill.icon}
                        alt={hero.skills.awakenSkill.name}
                        fill
                        className="object-contain cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={() => hero.skills.awakenSkill && handleSkillClick(hero.skills.awakenSkill)}
                        sizes="64px"
                      />
                    </>
                  )}
                </div>
                {hero.skills.awakenSkill && (
                  <>
                    <h3 className="text-sm font-bold text-white mb-0.5">
                      {hero.skills.awakenSkill.name}
                    </h3>
                    <p className="text-xs text-gray-400">{hero.skills.awakenSkill.type}</p>
                    <p className="text-xs text-gray-300">{hero.skills.awakenSkill.probability}%</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description and Stats Section */}
          <div className="lg:col-span-1 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">Hero Info</h2>
            
            {/* Description */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Description</h3>
              <p className="text-sm text-gray-400">
                {hero.description}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Base Stats</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Health:</span>
                  <span className="text-white font-semibold">{hero.baseStats.hp}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Attack:</span>
                  <span className="text-white font-semibold">{hero.baseStats.atk}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Defense:</span>
                  <span className="text-white font-semibold">{hero.baseStats.def}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Speed:</span>
                  <span className="text-white font-semibold">100</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Source:</span>
                <span className="text-white font-semibold">{hero.source}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Rarity:</span>
                <span className="text-white font-semibold">{hero.rarity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">Hero Recommendations</h2>
          
          {hero.recommendedPairings && hero.recommendedPairings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hero.recommendedPairings.map((pairing, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors">
                    {/* Effectiveness Badge */}
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        pairing.effectiveness === 'High' ? 'bg-green-600 text-white' :
                        pairing.effectiveness === 'Medium' ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {pairing.effectiveness === 'High' ? '🔥' : pairing.effectiveness === 'Medium' ? '⚡' : '❄️'} {pairing.effectiveness}
                      </span>
                    </div>

                    {/* Hero Photos and Skills in Same Row */}
                    <div className="flex items-start space-x-4">
                      {/* Hero Photos */}
                      <div className="flex items-center space-x-3">
                        {/* Main Commander Photo */}
                        <div className="relative w-20 h-20 cursor-pointer group">
                          <Image
                            src={`/images/heroes/${pairing.heroName}.png`}
                            alt={pairing.heroName}
                            fill
                            className="object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform"
                            sizes="80px"
                          />
                          {/* Golden border on hover */}
                          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                            backgroundImage: 'url(/images/heroes/glow2.png)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }} />
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                            <div className="font-semibold">{pairing.heroName}</div>
                            <div className="text-xs text-gray-300">Main Commander</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                        
                        {/* Secondary Commander Photo */}
                        <div className="relative w-20 h-20 cursor-pointer group">
                          <Image
                            src={hero.portrait}
                            alt={hero.name}
                            fill
                            className="object-contain rounded-lg shadow-lg group-hover:scale-105 transition-transform"
                            sizes="80px"
                          />
                          {/* Golden border on hover */}
                          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                            backgroundImage: 'url(/images/heroes/glow2.png)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }} />
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                            <div className="font-semibold">{hero.name}</div>
                            <div className="text-xs text-gray-300">Secondary Commander</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </div>

                      {/* Skills Section - Inline with Heroes */}
                      <div className="flex-1">
                        {pairing.recommendedSkills && pairing.recommendedSkills.length > 0 ? (
                          <div className="space-y-2">
                            {pairing.recommendedSkills.map((skillSet, skillIndex) => (
                              <div key={skillIndex} className="flex justify-start gap-2">
                                {skillSet.skills.map((skillName, skillNameIndex) => {
                                  const skill = skills.find(s => s.name === skillName);
                                  return (
                                    <div key={skillNameIndex} className="relative cursor-pointer group">
                                      <div className="relative w-12 h-12">
                                        <Image
                                          src={getDiamondSkillIcon(skillName)}
                                          alt={skillName}
                                          fill
                                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                                          sizes="48px"
                                        />
                                      </div>
                                      
                                      {/* Individual Skill Tooltip */}
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
                                        <div className="font-semibold">{skillName}</div>
                                        <div className="text-gray-300">{skill?.type || 'Unknown'}</div>
                                        <div className="text-gray-400">{skill?.probability || 100}%</div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-left py-2">
                            <p className="text-gray-400 text-sm">No skill recommendations</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤷‍♂️</div>
                <p className="text-gray-400 text-lg">No recommendations available yet</p>
                <p className="text-gray-500 text-sm mt-2">Recommendations for {hero.name} will be added soon!</p>
              </div>
            )}
          </div>
      </div>

      {/* Modals */}
      <SkillDetailModal
        isOpen={isSkillDetailOpen}
        onClose={() => setIsSkillDetailOpen(false)}
        skill={selectedSkill}
      />

    </div>
  );
}
