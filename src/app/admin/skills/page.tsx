'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '../context/AdminContext';

export default function SkillsPage() {
  const { state } = useAdmin();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [uniqueFilter, setUniqueFilter] = useState<string>('All');

  const filteredSkills = useMemo(() => {
    return state.skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || skill.type === typeFilter;
      const matchesUnique = uniqueFilter === 'All' || 
        (uniqueFilter === 'Unique' && skill.isUnique) ||
        (uniqueFilter === 'General' && !skill.isUnique);
      return matchesSearch && matchesType && matchesUnique;
    });
  }, [state.skills, search, typeFilter, uniqueFilter]);

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'active': return 'text-red-500 border-red-500';
      case 'passive': return 'text-blue-500 border-blue-500';
      case 'command': return 'text-purple-500 border-purple-500';
      case 'rage': return 'text-orange-500 border-orange-500';
      case 'counterattack': return 'text-green-500 border-green-500';
      case 'cooperation': return 'text-cyan-500 border-cyan-500';
      case 'awaken': return 'text-amber-500 border-amber-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-500">Skills</h1>
          <p className="text-gray-400">{filteredSkills.length} of {state.skills.length} skills</p>
        </div>
        <Link
          href="/admin/skills/new"
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors"
        >
          + Add Skill
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 border border-purple-500/20 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <option>All</option>
              <option>active</option>
              <option>passive</option>
              <option>command</option>
              <option>rage</option>
              <option>counterattack</option>
              <option>cooperation</option>
              <option>awaken</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Unique/General</label>
            <select
              value={uniqueFilter}
              onChange={(e) => setUniqueFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option>All</option>
              <option>Unique</option>
              <option>General</option>
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
              <div className="flex flex-col space-y-2">
                {/* Diamond Icon */}
                {skill.iconDiamond && (
                  <div className="relative w-12 h-12 rounded overflow-hidden border border-gray-700 group-hover:border-purple-500 transition-colors">
                    <Image
                      src={skill.iconDiamond}
                      alt={`${skill.name} Diamond`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {/* Regular Icon */}
                {skill.iconRegular && (
                  <div className="relative w-12 h-12 rounded overflow-hidden border border-gray-700 group-hover:border-purple-500 transition-colors">
                    <Image
                      src={skill.iconRegular}
                      alt={`${skill.name} Regular`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {/* Legacy Icon Fallback */}
                {!skill.iconDiamond && !skill.iconRegular && skill.icon && (
                  <div className="relative w-12 h-12 rounded overflow-hidden border border-gray-700 group-hover:border-purple-500 transition-colors">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate group-hover:text-purple-500 transition-colors">
                  {skill.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded border ${getTypeColor(skill.type)}`}>
                    {skill.type}
                  </span>
                  {skill.isUnique ? (
                    <span className="text-xs px-2 py-0.5 rounded border border-amber-500 text-amber-500">
                      Unique
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded border border-gray-500 text-gray-400">
                      General
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {skill.probability}% probability
                </div>
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
