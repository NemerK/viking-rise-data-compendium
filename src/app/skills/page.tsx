'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { skills } from '@/data/skills';

// Get effect label
function getEffectLabel(effect: string): { icon: string; label: string } {
  const effectMap: { [key: string]: { icon: string; label: string } } = {
    burn: { icon: '🔥', label: 'Burn' },
    bleed: { icon: '🩸', label: 'Bleed' },
    poison: { icon: '☠️', label: 'Poison' },
    slow: { icon: '❄️', label: 'Slow' },
    heal: { icon: '💚', label: 'Heal' },
    shield: { icon: '🛡️', label: 'Shield' },
    silence: { icon: '🔇', label: 'Silence' },
    rage: { icon: '😡', label: 'Rage' },
    buff: { icon: '⬆️', label: 'Buff' },
    debuff: { icon: '⬇️', label: 'Debuff' },
    counterattack: { icon: '⚡', label: 'Counter' },
    basicattack: { icon: '⚔️', label: 'Basic Attack' },
    directdamage: { icon: '💥', label: 'Direct DMG' },
    dispel: { icon: '✨', label: 'Dispel' },
    purify: { icon: '🌟', label: 'Purify' },
    evasion: { icon: '💨', label: 'Evasion' },
    brokenblade: { icon: '🗡️', label: 'Broken Blade' },
    damagereduction: { icon: '🛡️', label: 'DMG Reduction' },
    immunitycontrol: { icon: '🚫', label: 'Immunity' },
    retribution: { icon: '⚖️', label: 'Retribution' },
    devastation: { icon: '💀', label: 'Devastation' },
    disarm: { icon: '🔒', label: 'Disarm' },
    lacerate: { icon: '🩸', label: 'Lacerate' },
  };
  return effectMap[effect] || { icon: '⭐', label: effect };
}

// Get type color
function getTypeColor(type: string): string {
  switch (type) {
    case 'Active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Passive': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Command': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'Cooperation': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Counterattack': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
}

export default function SkillsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);

  // Get unique types
  const skillTypes = ['All', ...new Set(skills.map(s => s.type).filter(t => t !== 'N/A'))];

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || skill.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">Skills Database</h1>
          <p className="text-slate-400">Browse all {skills.length} skills in Viking Rise</p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-dark"
              />
            </div>
            
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="select-dark"
              >
                {skillTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-slate-400">
            Showing {filteredSkills.length} of {skills.length} skills
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="glass-card glass-card-hover p-4 text-left w-full"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="64px"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{skill.name}</h3>
                  <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(skill.type)}`}>
                    {skill.type}
                  </div>
                  
                  {/* Effects */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Object.entries(skill.effects)
                      .filter(([, value]) => value)
                      .slice(0, 3)
                      .map(([effect]) => {
                        const info = getEffectLabel(effect);
                        return (
                          <span key={effect} className="text-xs text-slate-400">
                            {info.icon}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* No Results */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No skills found</h3>
            <p className="text-slate-400">Try adjusting your search</p>
          </div>
        )}

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <div 
              className="glass-card max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={selectedSkill.icon}
                    alt={selectedSkill.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedSkill.name}</h2>
                  <div className={`inline-block px-3 py-1 rounded text-sm font-medium border mt-2 ${getTypeColor(selectedSkill.type)}`}>
                    {selectedSkill.type}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-2">Description</h3>
                <p className="text-slate-200">{selectedSkill.description}</p>
              </div>
              
              {/* Effects */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-2">Effects</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedSkill.effects)
                    .filter(([, value]) => value)
                    .map(([effect]) => {
                      const info = getEffectLabel(effect);
                      return (
                        <span key={effect} className="ability-badge ability-default">
                          <span>{info.icon}</span>
                          <span>{info.label}</span>
                        </span>
                      );
                    })}
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="btn-secondary w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
