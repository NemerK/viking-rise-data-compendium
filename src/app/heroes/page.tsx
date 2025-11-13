'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroes } from '@/data/heroes';
import BackButton from '@/components/BackButton';

const heroClasses = ['All', 'Infantry', 'Pikeman', 'Archer', 'Porter', 'Polymath'];
const heroSeasons = ['All', 'Base Game', 'Season 1', 'Season 2', 'Season 3', 'Sx', 'Valhalla Collaboration'];
const heroSources = ['All', 'Base Game', 'KVK Event', 'Lucky Wheel', 'Season Pass', 'Special Event', 'Gacha', 'Valhalla Collaboration'];

// Hero Card Component
function HeroCard({ hero }: { hero: any }) {

  return (
    <Link href={`/heroes/${hero.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
      <div className="relative dark-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group hero-glow">
        <div className="relative w-full h-32">
          <Image
            src={hero.portrait}
            alt={hero.name}
            fill
            className="object-contain p-1"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          />
          
          {/* Glow Effect Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/images/heroes/glow2.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            />
          </div>
          
          {/* Hero Class Badge */}
          <div className={`absolute top-1 left-1 px-1 py-0.5 rounded text-white text-xs font-semibold ${
            hero.heroClass === 'Infantry' ? 'bg-green-500' :
            hero.heroClass === 'Pikeman' ? 'bg-blue-500' :
            hero.heroClass === 'Archer' ? 'bg-red-500' :
            hero.heroClass === 'Porter' ? 'bg-yellow-500' :
            hero.heroClass === 'Polymath' ? 'bg-purple-500' :
            'bg-gray-500'
          }`}>
            {hero.heroClass}
          </div>
          
          {/* Season Badge */}
          <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-black bg-opacity-70 text-white text-xs font-semibold">
            {hero.season}
          </div>
        </div>

        <div className="p-1 text-center">
          <h3 className="text-xs font-bold text-white truncate">
            {hero.name}
          </h3>
          <p className="text-xs text-gray-400 truncate">
            {hero.source}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function HeroesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');

  // Auto-filtering logic
  const filteredHeroes = useMemo(() => {
    return heroes.filter(hero => {
      const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'All' || hero.heroClass === selectedClass;
      const matchesSeason = selectedSeason === 'All' || hero.season === selectedSeason;
      const matchesSource = selectedSource === 'All' || hero.source === selectedSource;
      
      return matchesSearch && matchesClass && matchesSeason && matchesSource;
    });
  }, [searchTerm, selectedClass, selectedSeason, selectedSource]);

  // Auto-complete suggestions
  const searchSuggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return heroes
      .filter(hero => hero.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5)
      .map(hero => hero.name);
  }, [searchTerm]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton href="/" text="Back to Home" />
          </div>
          <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
            Heroes Database
          </h1>
          <p className="text-sm text-gray-400 font-light drop-shadow-md">
            Complete collection of {heroes.length} heroes in Viking Rise
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="dark-card rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Auto-complete Search */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Heroes</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type hero name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full dark-input px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Auto-complete dropdown */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(suggestion)}
                        className="w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Hero Class Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Hero Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full dark-select px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {heroClasses.map(heroClass => (
                  <option key={heroClass} value={heroClass}>{heroClass}</option>
                ))}
              </select>
            </div>

            {/* Hero Season Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Season</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full dark-select px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {heroSeasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* Hero Source Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full dark-select px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {heroSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredHeroes.length} of {heroes.length} heroes
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedClass !== 'All' && ` of class "${selectedClass}"`}
            {selectedSeason !== 'All' && ` from "${selectedSeason}"`}
            {selectedSource !== 'All' && ` from "${selectedSource}"`}
          </p>
        </div>

        {/* Heroes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredHeroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
        </div>

        {filteredHeroes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No heroes found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('All');
                setSelectedSeason('All');
                setSelectedSource('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
