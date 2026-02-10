'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/types';
import { getHeroes, getAllHeroSkills, getSkillTypeColor, HeroSkillData } from '@/lib/data-service';

// All abilities for filtering
const abilityOptions = [
  { key: 'burn', label: 'Burn', icon: '🔥' },
  { key: 'bleed', label: 'Bleed', icon: '🩸' },
  { key: 'poison', label: 'Poison', icon: '☠️' },
  { key: 'slow', label: 'Slow', icon: '❄️' },
  { key: 'heal', label: 'Heal', icon: '💚' },
  { key: 'shield', label: 'Shield', icon: '🛡️' },
  { key: 'silence', label: 'Silence', icon: '🔇' },
  { key: 'rage', label: 'Rage', icon: '😡' },
  { key: 'counterattack', label: 'Counter', icon: '⚡' },
  { key: 'lacerate', label: 'Lacerate', icon: '🗡️' },
  { key: 'brokenblade', label: 'Broken Blade', icon: '⚔️' },
];

// Skill Tooltip Component
function SkillTooltip({ skills, heroName }: { skills: HeroSkillData | null; heroName: string }) {
  if (!skills) return null;
  
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 min-w-[280px] max-w-[320px] shadow-xl">
        <div className="text-xs font-bold text-amber-400 mb-2 text-center">{heroName}</div>
        
        {/* Skills */}
        <div className="space-y-2">
          {skills.skillOne && (
            <div className="flex items-start gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${getSkillTypeColor(skills.skillOne.type)}`}>
                {skills.skillOne.type}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">{skills.skillOne.name}</div>
              </div>
            </div>
          )}
          
          {skills.skillTwo && (
            <div className="flex items-start gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${getSkillTypeColor(skills.skillTwo.type)}`}>
                {skills.skillTwo.type}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">{skills.skillTwo.name}</div>
              </div>
            </div>
          )}
          
          {skills.awakenedSkill && (
            <div className="flex items-start gap-2 pt-1 border-t border-slate-700/50">
              <span className="text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 text-yellow-400 bg-yellow-500/20 border-yellow-500/30">
                Awakened
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-yellow-300 truncate">{skills.awakenedSkill.name}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
      </div>
    </div>
  );
}

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [heroSkillsMap, setHeroSkillsMap] = useState<Map<number, HeroSkillData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [abilityFilter, setAbilityFilter] = useState('All');

  // Fetch heroes and skills from Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch heroes and skills in parallel
        const [heroesData, skillsMap] = await Promise.all([
          getHeroes(),
          getAllHeroSkills()
        ]);
        setHeroes(heroesData);
        setHeroSkillsMap(skillsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Get unique types and classes (filter out undefined/empty values)
  const heroTypes = useMemo(() => 
    ['All', ...new Set(heroes.map(h => h.herotype).filter((t): t is string => !!t))],
    [heroes]
  );
  const heroClasses = useMemo(() => 
    ['All', ...new Set(heroes.map(h => h.heroclass).filter((c): c is string => !!c))],
    [heroes]
  );

  // Filter heroes
  const filteredHeroes = useMemo(() => {
    return heroes.filter(hero => {
      const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || hero.herotype === typeFilter;
      const matchesClass = classFilter === 'All' || hero.heroclass === classFilter;
      const matchesAbility = abilityFilter === 'All' || (hero as any)[abilityFilter] === true;
      
      return matchesSearch && matchesType && matchesClass && matchesAbility;
    });
  }, [heroes, search, typeFilter, classFilter, abilityFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading heroes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Heroes Database</h1>
          <p className="text-sm text-slate-400">{heroes.length} heroes available</p>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Search */}
            <div className="col-span-2 sm:col-span-1">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-dark text-sm h-10 w-full"
              />
            </div>
            
            {/* Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="select-dark h-10 w-full"
              >
                {heroTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Class Filter */}
            <div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="select-dark h-10 w-full"
              >
                {heroClasses.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            
            {/* Ability Filter */}
            <div>
              <select
                value={abilityFilter}
                onChange={(e) => setAbilityFilter(e.target.value)}
                className="select-dark h-10 w-full"
              >
                <option value="All">All Abilities</option>
                {abilityOptions.map(ability => (
                  <option key={ability.key} value={ability.key}>{ability.icon} {ability.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-3 text-xs text-slate-500">
            Showing {filteredHeroes.length} of {heroes.length} heroes
          </div>
        </div>

        {/* Heroes Grid - Clean Item Style with skill tooltips */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
          {filteredHeroes.map((hero) => (
            <Link
              key={hero.id}
              href={`/heroes/${encodeURIComponent(hero.name)}`}
              className="group relative pb-5"
            >
              {/* Skill Tooltip on hover */}
              <SkillTooltip skills={heroSkillsMap.get(hero.id) || null} heroName={hero.name} />
              
              <div className="relative w-full aspect-square transition-all duration-300 hover:scale-110 hover:z-10 group-hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
                <Image
                  src={hero.portrait}
                  alt={hero.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 20vw, (max-width: 1024px) 12vw, 8vw"
                />
              </div>
              
              {/* Name below portrait */}
              <div className="absolute -bottom-0 left-0 right-0 text-center">
                <span className="text-[10px] font-bold text-slate-300 group-hover:text-amber-400 transition-colors">{hero.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredHeroes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-white mb-1">No heroes found</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters</p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="text-slate-400">Infantry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-slate-400">Pikeman</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <span className="text-slate-400">Archers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
            <span className="text-slate-400">Leader</span>
          </div>
        </div>
      </div>
    </div>
  );
}
