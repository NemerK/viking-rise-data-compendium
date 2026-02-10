'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '../context/AdminContext';

export default function SkillsPage() {
  const { state, loading, error } = useAdmin();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Only show slottable skills in this view (hero-specific skills are managed on the hero edit page)
  const filteredSkills = useMemo(() => {
    return state.skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || skill.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [state.skills, search, typeFilter]);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'active': return 'text-red-500 border-red-500 bg-red-500/10';
      case 'passive': return 'text-blue-500 border-blue-500 bg-blue-500/10';
      case 'command': return 'text-purple-500 border-purple-500 bg-purple-500/10';
      case 'rage': return 'text-orange-500 border-orange-500 bg-orange-500/10';
      case 'counterattack': return 'text-green-500 border-green-500 bg-green-500/10';
      case 'cooperation': return 'text-cyan-500 border-cyan-500 bg-cyan-500/10';
      case 'awaken': return 'text-amber-500 border-amber-500 bg-amber-500/10';
      default: return 'text-gray-500 border-gray-500 bg-gray-500/10';
    }
  };

  // Get unique types from skills
  const skillTypes = useMemo(() => {
    const types = new Set(state.skills.map(s => s.type).filter(Boolean));
    return ['All', ...Array.from(types)];
  }, [state.skills]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading skills from database...</p>
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
          <h1 className="text-3xl font-bold text-purple-500">Slottable Skills</h1>
          <p className="text-gray-400">
            {filteredSkills.length} of {state.skills.length} skills
            <span className="text-gray-600 ml-2">(Skills any hero can equip)</span>
          </p>
        </div>
        <Link
          href="/admin/skills/new"
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors"
        >
          + Add Skill
        </Link>
      </div>

      {/* Info Banner */}
      <div className="glass-card p-4 border border-blue-500/20 rounded-lg bg-blue-500/5">
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-xl">ℹ️</span>
          <div className="text-sm text-gray-300">
            <strong className="text-blue-400">Slottable Skills</strong> can be equipped by any hero in their slottable skill slots (slots 3 & 4).
            <br />
            <strong className="text-amber-400">Hero-specific skills</strong> (skills 1, 2, and awakened) are managed on each hero&apos;s edit page.
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 border border-purple-500/20 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              {skillTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <Link
            key={skill.id}
            href={`/admin/skills/${skill.id}/edit`}
            className="glass-card p-4 border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-start space-x-4">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-purple-500 transition-colors flex-shrink-0">
                <Image
                  src={skill.icon || '/images/skills/diamond/none.png'}
                  alt={skill.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white truncate group-hover:text-purple-400 transition-colors">
                  {skill.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded border ${getTypeColor(skill.type)}`}>
                    {skill.type}
                  </span>
                  {skill.probability && skill.probability < 100 && (
                    <span className="text-xs px-2 py-0.5 rounded border border-gray-600 text-gray-400">
                      {skill.probability}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {skill.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No skills found matching your filters.
        </div>
      )}
    </div>
  );
}
