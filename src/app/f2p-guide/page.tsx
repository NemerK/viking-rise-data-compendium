'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroes } from '@/data/heroes';
import BackButton from '@/components/BackButton';
import HeroClassIcon from '@/components/HeroClassIcon';

export default function F2PGuidePage() {
  const [hoveredHero, setHoveredHero] = useState<string | null>(null);

  // Find Olena and recommended heroes
  const olena = heroes.find(h => h.name === 'Olena');
  const recommendedHeroes = {
    archer: heroes.filter(h => ['Verdandi', 'Artur'].includes(h.name)),
    pikeman: heroes.filter(h => ['Yvette'].includes(h.name)),
    infantry: heroes.filter(h => ['Gregory', 'Bjorn'].includes(h.name)),
    unavailable: heroes.filter(h => ['Harald', 'Rollo'].includes(h.name))
  };

  const handleHeroHover = (heroName: string) => {
    setHoveredHero(heroName);
  };

  const handleHeroLeave = () => {
    setHoveredHero(null);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton href="/" text="← Back to Home" />
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🛡️ F2P Player's Road
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your complete guide to building a powerful team without spending money. 
            Focus on the right heroes and maximize your resources for long-term success.
          </p>
        </div>

        {/* Main Focus Section - Olena */}
        <div className="bg-gray-800/50 rounded-xl p-8 mb-12 border border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">
              ⭐ PRIMARY FOCUS: OLENA
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              <strong className="text-yellow-400">ALL F2P players should focus their purple hero shards on Olena.</strong> 
              She's incredibly powerful even in late game and remains viable despite being a gacha game that emphasizes spending.
            </p>
          </div>

          {olena && (
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Olena Card */}
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => handleHeroHover('Olena')}
                onMouseLeave={handleHeroLeave}
              >
                <div className="relative w-48 h-64 mx-auto">
                  <Image
                    src={olena.portrait}
                    alt={olena.name}
                    fill
                    className="object-cover rounded-lg shadow-2xl"
                    sizes="192px"
                  />
                  {/* Golden border overlay - only on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    backgroundImage: 'url(/images/heroes/glow2.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-yellow-400 mb-2">{olena.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <HeroClassIcon heroClass={olena.heroClass} size="sm" />
                        <span className="text-white text-sm">{olena.heroClass}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-white"><span className="text-red-400">Type:</span> Rage Hero</p>
                        <p className="text-white"><span className="text-green-400">Focus:</span> Build Rage</p>
                        <p className="text-white"><span className="text-purple-400">Season:</span> {olena.season}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-2xl font-bold text-yellow-400">{olena.name}</h3>
                  <p className="text-gray-300">The Ultimate F2P Hero</p>
                </div>
              </div>

              {/* Olena Details */}
              <div className="flex-1 space-y-6">
                <div className="dark-card p-6 rounded-lg border border-yellow-500/30">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Why Olena?</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚡</span>
                      <span><strong>Rage-focused:</strong> Builds rage quickly and unleashes devastating attacks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">🎯</span>
                      <span><strong>Archer synergy:</strong> Perfect for archer team compositions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">💎</span>
                      <span><strong>Late-game viable:</strong> Remains powerful even in endgame content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">🆓</span>
                      <span><strong>F2P friendly:</strong> Obtainable without spending money</span>
                    </li>
                  </ul>
                </div>

                <div className="dark-card p-6 rounded-lg border border-blue-500/30">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Talent Strategy</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">Archer Team Build:</h4>
                      <p className="text-gray-300">
                        Focus on <strong className="text-blue-400">Archer HP, Archer ATK, Archer DEF</strong> talents.
                        These provide <strong className="text-green-400">1.25% per talent</strong> - specialized bonuses.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-orange-300 mb-2">Mixed Team Build:</h4>
                      <p className="text-gray-300">
                        Use <strong className="text-orange-400">Troop ATK, Troop HP, Troop DEF</strong> talents.
                        These provide <strong className="text-yellow-400">1% per talent</strong> - general bonuses for flexibility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommended Team Compositions */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            🎯 Recommended Team Compositions
          </h2>

          {/* Archer Team - Most Recommended */}
          <div className="dark-card rounded-xl p-8 border-2 border-red-500/30">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-red-400 mb-2">
                🏹 ARCHER TEAM (Most Recommended)
              </h3>
              <p className="text-lg text-gray-300">
                Perfect synergy with Olena's archer class and rage mechanics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Olena */}
              {olena && (
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleHeroHover('Olena')}
                  onMouseLeave={handleHeroLeave}
                >
                  <div className="relative w-32 h-40 mx-auto">
                    <Image
                      src={olena.portrait}
                      alt={olena.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="128px"
                    />
                    {/* Golden border overlay - only on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      backgroundImage: 'url(/images/heroes/glow2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm font-bold text-red-400">{olena.name}</h4>
                        <div className="flex items-center gap-1">
                          <HeroClassIcon heroClass={olena.heroClass} size="sm" />
                          <p className="text-xs text-white">Rage Archer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-red-400">{olena.name}</h4>
                    <p className="text-sm text-gray-400">Main DPS</p>
                  </div>
                </div>
              )}

              {/* Archer Partners */}
              {recommendedHeroes.archer.map((hero) => (
                <div 
                  key={hero.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleHeroHover(hero.name)}
                  onMouseLeave={handleHeroLeave}
                >
                  <div className="relative w-32 h-40 mx-auto">
                    <Image
                      src={hero.portrait}
                      alt={hero.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="128px"
                    />
                    {/* Golden border overlay - only on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      backgroundImage: 'url(/images/heroes/glow2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm font-bold text-red-400">{hero.name}</h4>
                        <div className="flex items-center gap-1">
                          <HeroClassIcon heroClass={hero.heroClass} size="sm" />
                          <p className="text-xs text-white">{hero.heroClass}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-red-400">{hero.name}</h4>
                    <p className="text-sm text-gray-400">Archer Support</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 dark-card p-4 rounded-lg bg-red-500/10">
              <h4 className="text-lg font-semibold text-red-400 mb-2">Archer Team Benefits:</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Perfect synergy with Olena's archer talents (1.25% bonuses)</li>
                <li>• Rage builds faster with archer-specific abilities</li>
                <li>• High damage output and range advantage</li>
                <li>• Best for PvP and PvE content</li>
              </ul>
            </div>
          </div>

          {/* Pikeman Team */}
          <div className="dark-card rounded-xl p-8 border-2 border-yellow-500/30">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                🗡️ PIKEMAN TEAM (Rage Healing Focus)
              </h3>
              <p className="text-lg text-gray-300">
                Alternative build focusing on rage healing and sustainability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Olena */}
              {olena && (
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleHeroHover('Olena')}
                  onMouseLeave={handleHeroLeave}
                >
                  <div className="relative w-32 h-40 mx-auto">
                    <Image
                      src={olena.portrait}
                      alt={olena.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="128px"
                    />
                    {/* Golden border overlay - only on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      backgroundImage: 'url(/images/heroes/glow2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm font-bold text-yellow-400">{olena.name}</h4>
                        <p className="text-xs text-white">Rage Archer</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-yellow-400">{olena.name}</h4>
                    <p className="text-sm text-gray-400">Rage DPS</p>
                  </div>
                </div>
              )}

              {/* Yvette */}
              {recommendedHeroes.pikeman.map((hero) => (
                <div 
                  key={hero.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleHeroHover(hero.name)}
                  onMouseLeave={handleHeroLeave}
                >
                  <div className="relative w-32 h-40 mx-auto">
                    <Image
                      src={hero.portrait}
                      alt={hero.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="128px"
                    />
                    {/* Golden border overlay - only on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      backgroundImage: 'url(/images/heroes/glow2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm font-bold text-yellow-400">{hero.name}</h4>
                        <p className="text-xs text-white">{hero.heroClass}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-yellow-400">{hero.name}</h4>
                    <p className="text-sm text-gray-400">Rage Healer</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 dark-card p-4 rounded-lg bg-yellow-500/10">
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">Pikeman Team Benefits:</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Yvette provides rage-based healing</li>
                <li>• More sustainable for long battles</li>
                <li>• Good for defensive strategies</li>
                <li>• Use Troop ATK talents (1% bonuses) for flexibility</li>
              </ul>
            </div>
          </div>

          {/* Infantry Team */}
          <div className="dark-card rounded-xl p-8 border-2 border-green-500/30">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-green-400 mb-2">
                ⚔️ INFANTRY TEAM (Early Game)
              </h3>
              <p className="text-lg text-gray-300">
                Solid early game option with available heroes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Olena */}
              {olena && (
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleHeroHover('Olena')}
                  onMouseLeave={handleHeroLeave}
                >
                  <div className="relative w-32 h-40 mx-auto">
                    <Image
                      src={olena.portrait}
                      alt={olena.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="128px"
                    />
                    {/* Golden border overlay - only on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      backgroundImage: 'url(/images/heroes/glow2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm font-bold text-green-400">{olena.name}</h4>
                        <p className="text-xs text-white">Rage Archer</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-green-400">{olena.name}</h4>
                    <p className="text-sm text-gray-400">Rage DPS</p>
                  </div>
                </div>
              )}

              {/* Infantry Partners */}
              {recommendedHeroes.infantry.map((hero) => (
                <div 
                  key={hero.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleHeroHover(hero.name)}
                  onMouseLeave={handleHeroLeave}
                >
                  <div className="relative w-32 h-40 mx-auto">
                    <Image
                      src={hero.portrait}
                      alt={hero.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="128px"
                    />
                    {/* Golden border overlay - only on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      backgroundImage: 'url(/images/heroes/glow2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm font-bold text-green-400">{hero.name}</h4>
                        <p className="text-xs text-white">{hero.heroClass}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-green-400">{hero.name}</h4>
                    <p className="text-sm text-gray-400">Infantry Tank</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 dark-card p-4 rounded-lg bg-green-500/10">
              <h4 className="text-lg font-semibold text-green-400 mb-2">Infantry Team Benefits:</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Good early game option with available heroes</li>
                <li>• Infantry provides tanking and frontline support</li>
                <li>• Use Troop ATK talents (1% bonuses) for mixed team</li>
                <li>• Solid for PvE content and farming</li>
              </ul>
            </div>
          </div>

          {/* Unavailable Heroes Note */}
          <div className="dark-card rounded-xl p-8 border-2 border-gray-500/30">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-400 mb-2">
                ⚠️ UNAVAILABLE HEROES
              </h3>
              <p className="text-lg text-gray-300">
                These heroes are no longer obtainable but were previously recommended
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedHeroes.unavailable.map((hero) => (
                <div 
                  key={hero.id}
                  className="relative group cursor-pointer opacity-60"
                  onMouseEnter={() => handleHeroHover(hero.name)}
                  onMouseLeave={handleHeroLeave}
                >
                  <div className="relative w-32 h-40 mx-auto">
                    <Image
                      src={hero.portrait}
                      alt={hero.name}
                      fill
                      className="object-cover rounded-lg grayscale"
                      sizes="128px"
                    />
                    {/* Golden border overlay - only on hover */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      backgroundImage: 'url(/images/heroes/glow2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm font-bold text-gray-400">{hero.name}</h4>
                        <div className="flex items-center gap-1">
                          <HeroClassIcon heroClass={hero.heroClass} size="sm" />
                          <p className="text-xs text-white">{hero.heroClass}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      UNAVAILABLE
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-gray-400">{hero.name}</h4>
                    <p className="text-sm text-gray-500">No longer obtainable</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Management Tips */}
        <div className="mt-12 dark-card rounded-xl p-8 border-2 border-purple-500/30">
          <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
            💎 Resource Management Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-purple-300 mb-4">Purple Hero Shards</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-purple-400">Focus 100% on Olena</strong> - she's worth every shard</li>
                <li>• Don't spread shards across multiple heroes early</li>
                <li>• Olena's power scales incredibly well with investment</li>
                <li>• Save shards for her awakening and ascension</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-purple-300 mb-4">Talent Points</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-blue-400">Archer team:</strong> Use specialized talents (1.25%)</li>
                <li>• <strong className="text-orange-400">Mixed team:</strong> Use general talents (1%)</li>
                <li>• Focus on ATK talents first for damage</li>
                <li>• Balance HP and DEF based on content needs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link 
            href="/heroes" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Heroes →
          </Link>
        </div>
      </div>
    </div>
  );
}
