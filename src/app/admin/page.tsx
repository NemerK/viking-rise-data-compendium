'use client';

import Link from 'next/link';
import { useAdmin } from './context/AdminContext';

export default function AdminDashboard() {
  const { state, heroSkills, heroTalents, loading, error } = useAdmin();

  // Calculate statistics - skills includes Skill 1, Skill 2, and Awakened (3 total)
  const heroesWithAllSkills = state.heroes.filter(h => {
    const skills = heroSkills.get(h.id) || [];
    return skills.length >= 3; // skill1, skill2, awakened
  }).length;

  const heroesWithAllTalents = state.heroes.filter(h => {
    const talents = heroTalents.get(h.id) || [];
    return talents.length >= 3;
  }).length;

  const totalHeroSkills = Array.from(heroSkills.values()).reduce((acc, skills) => acc + skills.length, 0);
  const totalHeroTalents = Array.from(heroTalents.values()).reduce((acc, talents) => acc + talents.length, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
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
    <div className="space-y-4 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-500">Admin Dashboard</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-green-400 text-xs font-medium">Connected</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Link href="/admin/heroes/new" className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors">
          <span className="text-lg">➕</span>
          <span className="text-amber-400 font-medium text-sm">Add Hero</span>
        </Link>
        <Link href="/admin/skills/new" className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors">
          <span className="text-lg">✨</span>
          <span className="text-purple-400 font-medium text-sm">Add Skill</span>
        </Link>
        <Link href="/admin/heroes" className="flex items-center gap-2 p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-colors">
          <span className="text-lg">⚔️</span>
          <span className="text-white font-medium text-sm">All Heroes</span>
        </Link>
        <Link href="/admin/skills" className="flex items-center gap-2 p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-colors">
          <span className="text-lg">🎯</span>
          <span className="text-white font-medium text-sm">All Skills</span>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-center">
          <div className="text-2xl font-bold text-amber-400">{state.heroes.length}</div>
          <div className="text-xs text-gray-500">Heroes</div>
        </div>
        <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{totalHeroSkills}</div>
          <div className="text-xs text-gray-500">Hero Skills</div>
        </div>
        <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{totalHeroTalents}</div>
          <div className="text-xs text-gray-500">Talents</div>
        </div>
        <div className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{state.skills.length}</div>
          <div className="text-xs text-gray-500">Slottable</div>
        </div>
      </div>

      {/* Data Completeness - Compact */}
      <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
        <h2 className="text-sm font-bold text-white mb-3">📊 Data Completeness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Skills (Skill 1 + Skill 2 + Awakened)</span>
              <span className="text-amber-400">{heroesWithAllSkills}/{state.heroes.length}</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${state.heroes.length > 0 ? (heroesWithAllSkills / state.heroes.length) * 100 : 0}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Talents (3 per hero)</span>
              <span className="text-blue-400">{heroesWithAllTalents}/{state.heroes.length}</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${state.heroes.length > 0 ? (heroesWithAllTalents / state.heroes.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference - Compact */}
      <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
        <h2 className="text-sm font-bold text-white mb-2">📘 Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="flex gap-2 items-start">
            <div className="w-1 h-full bg-purple-500 rounded-full flex-shrink-0"></div>
            <div>
              <span className="text-white font-medium">Hero Skills:</span>
              <span className="text-gray-500 ml-1">Skill 1, Skill 2, Awakened</span>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="w-1 h-full bg-blue-500 rounded-full flex-shrink-0"></div>
            <div>
              <span className="text-white font-medium">Hero Talents:</span>
              <span className="text-gray-500 ml-1">3 passive bonuses each</span>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="w-1 h-full bg-green-500 rounded-full flex-shrink-0"></div>
            <div>
              <span className="text-white font-medium">Slottable:</span>
              <span className="text-gray-500 ml-1">Equip in slots 3 &amp; 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
