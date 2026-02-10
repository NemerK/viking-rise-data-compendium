'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '../context/AdminContext';

export default function HeroesPage() {
  const { state, heroSkills, heroTalents, loading, error } = useAdmin();
  const [search, setSearch] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('All');
  const [troopTypeFilter, setTroopTypeFilter] = useState<string>('All');

  const filteredHeroes = useMemo(() => {
    return state.heroes.filter(hero => {
      const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase());
      const matchesRarity = rarityFilter === 'All' || hero.rarity === rarityFilter || (!hero.rarity && rarityFilter === 'Unclassified');
      const matchesTroopType = troopTypeFilter === 'All' || hero.troopType === troopTypeFilter || hero.herotype === troopTypeFilter || (!hero.troopType && !hero.herotype && troopTypeFilter === 'Legacy');
      return matchesSearch && matchesRarity && matchesTroopType;
    });
  }, [state.heroes, search, rarityFilter, troopTypeFilter]);

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-amber-500 border-amber-500';
      case 'Epic': return 'text-purple-500 border-purple-500';
      case 'Common': return 'text-blue-500 border-blue-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading heroes from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-xl mb-4">Error loading data</div>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-amber-500">Heroes</h1>
          <p className="text-gray-400">{filteredHeroes.length} of {state.heroes.length} heroes</p>
        </div>
        <Link
          href="/admin/heroes/new"
          className="px-6 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
        >
          + Add Hero
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 border border-amber-500/20 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Rarity</label>
            <select
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
            >
              <option>All</option>
              <option>Legendary</option>
              <option>Epic</option>
              <option>Common</option>
              <option>Unclassified</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Troop Type</label>
            <select
              value={troopTypeFilter}
              onChange={(e) => setTroopTypeFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
            >
              <option>All</option>
              <option>Infantry</option>
              <option>Archer</option>
              <option>Pikeman</option>
              <option>Leader</option>
              <option>Porter</option>
              <option>Legacy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Heroes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredHeroes.map(hero => {
          const skills = heroSkills.get(hero.id) || [];
          const talents = heroTalents.get(hero.id) || [];
          const hasAllSkills = skills.length >= 3;
          const hasAllTalents = talents.length >= 3;
          
          return (
            <Link
              key={hero.id}
              href={`/admin/heroes/${hero.id}/edit`}
              className="glass-card p-4 border border-amber-500/20 rounded-lg hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-amber-500 transition-colors">
                  <Image
                    src={hero.portrait}
                    alt={hero.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate group-hover:text-amber-500 transition-colors">
                    {hero.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hero.rarity && (
                      <span className={`text-xs px-2 py-0.5 rounded border ${getRarityColor(hero.rarity)}`}>
                        {hero.rarity}
                      </span>
                    )}
                    {(hero.troopType || hero.herotype) && (
                      <span className="text-xs px-2 py-0.5 rounded border border-gray-500 text-gray-400">
                        {hero.troopType || hero.herotype}
                      </span>
                    )}
                  </div>
                  {/* Skills & Talents status */}
                  <div className="flex gap-2 mt-2 text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded ${hasAllSkills ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {skills.length}/3 Skills
                    </span>
                    <span className={`px-1.5 py-0.5 rounded ${hasAllTalents ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {talents.length}/3 Talents
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredHeroes.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No heroes found matching your filters.
        </div>
      )}
    </div>
  );
}
