'use client';

import Image from 'next/image';
import Link from 'next/link';
import { heroes } from '@/data/heroes';
import { skills } from '@/data/skills';

// Helper function to get season label
const getSeasonLabel = (season: string) => {
  if (season === 'Base Game' || season === 'Season 1') return 'S1';
  if (season === 'Season 2') return 'S2';
  if (season === 'Season 3') return 'S3';
  if (season === 'Valhalla Collaboration') return 'Valhalla';
  return 'Sx';
};

// Helper function to get class icon
const getClassIcon = (heroClass: string) => {
  switch (heroClass) {
    case 'Infantry': return '/images/infantry-icon.png';
    case 'Pikeman': return '/images/pikemen-icon.png';
    case 'Archer': return '/images/archer-icon.png';
    case 'Porter': return '/images/porter-icon.png';
    case 'Polymath': return '/images/porter-icon.png'; // Using porter icon as fallback
    default: return '/images/porter-icon.png';
  }
};

// Sample events data
const featuredEvents = [
  { id: 1, name: 'Hero Training Event', status: 'Active', description: 'Double XP for hero training', type: 'Training' },
  { id: 2, name: 'Resource Gathering', status: 'Upcoming', description: 'Increased resource collection', type: 'Gathering' },
  { id: 3, name: 'Alliance War', status: 'Ongoing', description: 'Weekly alliance battles', type: 'PvP' }
];

export default function Home() {
  // Static display - no auto-rotation
  const displayedHeroes = heroes.slice(0, 16);
  const displayedSkills = skills.slice(0, 9);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
            Viking Rise Compendium
          </h1>
          <p className="text-sm text-gray-400 font-light drop-shadow-md">
            Heroes • Skills • Strategies • Guides
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <Link href="/heroes" className="group">
            <div className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-700/70 transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-3 relative">
                <Image
                  src="/images/gui/guiknothero.png"
                  alt="Heroes"
                  width={64}
                  height={64}
                  className="object-contain group-hover:brightness-125 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-semibold text-white">Heroes</h3>
            </div>
          </Link>

          <Link href="/skills" className="group">
            <div className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-700/70 transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-3 relative">
                <Image
                  src="/images/gui/guiknotskill.png"
                  alt="Skills"
                  width={64}
                  height={64}
                  className="object-contain group-hover:brightness-125 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-semibold text-white">Skills</h3>
            </div>
          </Link>

          <Link href="/team-builder" className="group">
            <div className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-700/70 transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-3 relative">
                <Image
                  src="/images/gui/guiknottrain.png"
                  alt="Team Builder"
                  width={64}
                  height={64}
                  className="object-contain group-hover:brightness-125 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
                />
              </div>
              <h3 className="text-base font-semibold text-white">Team Builder</h3>
            </div>
          </Link>

          <Link href="/guides" className="group">
            <div className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-700/70 transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-base font-semibold text-white">Guides</h3>
            </div>
          </Link>

          <Link href="/events" className="group">
            <div className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-700/70 transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-base font-semibold text-white">Events</h3>
            </div>
          </Link>
        </div>

        {/* Heroes Section */}
        <div className="mb-12">
          <div className="mb-6">
            <div className="bg-transparent rounded-lg px-4 py-2 relative shadow-lg border-2 border-yellow-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 relative">
                    <Image
                      src="/images/gui/guiknothero.png"
                      alt="Heroes"
                      width={32}
                      height={32}
                      className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    />
                  </div>
                  <h2 className="text-lg font-bold text-white">Heroes</h2>
                </div>
                <Link href="/heroes" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center space-x-1">
                  <span>All Heroes</span>
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {displayedHeroes.map((hero, index) => (
              <Link key={hero.id} href={`/heroes/${hero.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                <div className="relative bg-transparent rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 border-yellow-600 hover:border-yellow-500 hover:shadow-yellow-600/20">
                  {/* Atmospheric glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  
                  <div className="relative w-full h-28 z-10">
        <Image
                      src={hero.portrait}
                      alt={hero.name}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 12vw"
                    />
                    
                    {/* Hero Class Icon */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-black bg-opacity-70 rounded">
            <Image
                        src={getClassIcon(hero.heroClass)}
                        alt={hero.heroClass}
                        width={32}
                        height={32}
                        className="object-contain p-0.5"
                      />
                    </div>
                    
                    {/* Season Badge */}
                    <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-black bg-opacity-70 text-white text-xs font-semibold">
                      {getSeasonLabel(hero.season)}
                    </div>
                  </div>
                  <div className="px-1 py-0.5 text-center relative z-10">
                    <h3 className="text-xs font-bold text-white truncate">
                      {hero.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Skills and F2P Guide Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Section */}
          <div>
            <div className="mb-6">
              <div className="bg-transparent rounded-lg px-4 py-2 relative shadow-lg border-2 border-yellow-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 relative">
                      <Image
                        src="/images/gui/guiknotskill.png"
                        alt="Skills"
                        width={32}
                        height={32}
                        className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                      />
                    </div>
                    <h2 className="text-lg font-bold text-white">Skills</h2>
                  </div>
                  <Link href="/skills" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center space-x-1">
                    <span>All Skills</span>
                    <span className="text-xs">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
              {displayedSkills.map((skill, index) => (
                <Link key={skill.id} href={`/skills/${skill.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                  <div className="relative group">
                    {/* Golden Border Card */}
                    <div className="bg-transparent rounded-lg p-3 border-2 border-yellow-600 hover:border-yellow-500 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-yellow-600/20 relative overflow-hidden">
                      {/* Atmospheric glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      
                      <div className="relative w-full h-24 mb-2 z-10">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                      <div className="text-center relative z-10">
                        <h3 className="text-xs font-semibold text-white mb-1 truncate">
                          {skill.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* F2P Road Section */}
          <div>
            <div className="bg-transparent rounded-lg px-4 py-2 mb-6 relative shadow-lg border-2 border-yellow-600">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 relative">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-lg font-bold text-white">F2P Road</h2>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Olena - The F2P Queen</h3>
                <p className="text-gray-400 text-sm">Perfect starting hero for free-to-play players</p>
              </div>
              
              {/* F2P Teams Layout - Compact and Beautiful */}
              <div className="space-y-4">
                {/* Team 1: Olena + Artur/Verdandi */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative">
                    <Image
                      src="/images/heroes/Olena.png"
                      alt="Olena"
                      width={50}
                      height={50}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-transparent border-2 border-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-xs font-bold">+</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="relative">
                      <Image
                        src="/images/heroes/Artur.png"
                        alt="Artur"
                        width={50}
                        height={50}
                        className="object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/heroes/Verdandi.png"
                        alt="Verdandi"
                        width={50}
                        height={50}
                        className="object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Team 2: Yvette + Olena */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative">
                      <Image
                        src="/images/heroes/Yvette.png"
                        alt="Yvette"
                        width={50}
                        height={50}
                        className="object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-transparent border-2 border-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-xs font-bold">+</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/images/heroes/Olena.png"
                      alt="Olena"
                      width={50}
                      height={50}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>

                {/* Team 3: Gregory/Bjorn + Olena */}
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="relative">
          <Image
                        src="/images/heroes/Gregory.png"
                        alt="Gregory"
                        width={50}
                        height={50}
                        className="object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                    <div className="relative">
          <Image
                        src="/images/heroes/Bjorn.png"
                        alt="Bjorn"
                        width={50}
                        height={50}
                        className="object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-transparent border-2 border-yellow-600 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-xs font-bold">+</span>
                    </div>
                  </div>
                  <div className="relative">
          <Image
                      src="/images/heroes/Olena.png"
                      alt="Olena"
                      width={50}
                      height={50}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Link href="/guides/f2p-road" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                  Guide
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Events and KVK Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Events Section */}
          <div>
            <div className="bg-transparent rounded-lg px-4 py-2 mb-6 relative shadow-lg border-2 border-yellow-600">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 relative">
                  <span className="text-2xl">⚡</span>
                </div>
                <h2 className="text-lg font-bold text-white">Events</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {featuredEvents.map((event) => (
                <div key={event.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-white">{event.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                      event.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{event.description}</p>
                  <div className="text-xs text-gray-500">{event.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* KVK Section */}
          <div>
            <div className="bg-transparent rounded-lg px-4 py-2 mb-6 relative shadow-lg border-2 border-yellow-600">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 relative">
                  <span className="text-2xl">⚔️</span>
                </div>
                <h2 className="text-lg font-bold text-white">Kingdom vs Kingdom</h2>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">The Ultimate Battle</h3>
                <p className="text-gray-400 mb-4 text-sm">12 Kingdoms compete for supremacy in the ultimate PvP event</p>
                <div className="text-sm text-gray-500 mb-4">Battle Phase starts in 3 days</div>
                <Link href="/kvk" className="text-yellow-400 hover:text-yellow-300 font-medium text-sm">
                  View KVK Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}