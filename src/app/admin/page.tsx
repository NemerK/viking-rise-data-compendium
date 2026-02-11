'use client';

import Link from 'next/link';
import { useAdmin } from './context/AdminContext';

export default function AdminDashboard() {
  const { state, heroSkills, heroTalents, loading, error } = useAdmin();

  // Calculate statistics
  const heroesWithAllSkills = state.heroes.filter(h => {
    const skills = heroSkills.get(h.id) || [];
    return skills.length >= 3;
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
          <p className="text-gray-400">Loading data from Supabase...</p>
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
    <div className="space-y-6 max-w-6xl">
      {/* Header with Status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-500">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Manage heroes, skills, and talents</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Connected to Supabase</span>
        </div>
      </div>

      {/* Quick Actions - Primary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link
          href="/admin/heroes/new"
          className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors group"
        >
          <span className="text-2xl">➕</span>
          <div>
            <div className="text-amber-400 font-semibold group-hover:text-amber-300">Add Hero</div>
            <div className="text-xs text-gray-500">Create new hero</div>
          </div>
        </Link>
        <Link
          href="/admin/skills/new"
          className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors group"
        >
          <span className="text-2xl">✨</span>
          <div>
            <div className="text-purple-400 font-semibold group-hover:text-purple-300">Add Skill</div>
            <div className="text-xs text-gray-500">Slottable skill</div>
          </div>
        </Link>
        <Link
          href="/admin/heroes"
          className="flex items-center gap-3 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-colors group"
        >
          <span className="text-2xl">⚔️</span>
          <div>
            <div className="text-white font-semibold group-hover:text-amber-300">All Heroes</div>
            <div className="text-xs text-gray-500">{state.heroes.length} heroes</div>
          </div>
        </Link>
        <Link
          href="/admin/skills"
          className="flex items-center gap-3 p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-colors group"
        >
          <span className="text-2xl">🎯</span>
          <div>
            <div className="text-white font-semibold group-hover:text-purple-300">All Skills</div>
            <div className="text-xs text-gray-500">{state.skills.length} skills</div>
          </div>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <span>⚔️</span>
            <span>Total Heroes</span>
          </div>
          <div className="text-3xl font-bold text-amber-400">{state.heroes.length}</div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <span>🎯</span>
            <span>Hero Skills</span>
          </div>
          <div className="text-3xl font-bold text-purple-400">{totalHeroSkills}</div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <span>⭐</span>
            <span>Hero Talents</span>
          </div>
          <div className="text-3xl font-bold text-blue-400">{totalHeroTalents}</div>
        </div>
        <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <span>✨</span>
            <span>Slottable Skills</span>
          </div>
          <div className="text-3xl font-bold text-green-400">{state.skills.length}</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Data Completeness */}
        <div className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📊</span> Data Completeness
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Heroes with all 3 skills</span>
                <span className="text-amber-400 font-medium">{heroesWithAllSkills} / {state.heroes.length}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${state.heroes.length > 0 ? (heroesWithAllSkills / state.heroes.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Heroes with all 3 talents</span>
                <span className="text-blue-400 font-medium">{heroesWithAllTalents} / {state.heroes.length}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${state.heroes.length > 0 ? (heroesWithAllTalents / state.heroes.length) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="pt-2 border-t border-slate-700">
              <div className="text-xs text-gray-500">
                Missing skills: {state.heroes.length * 3 - totalHeroSkills} • 
                Missing talents: {state.heroes.length * 3 - totalHeroTalents}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📘</span> Quick Reference
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="w-1 bg-purple-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-white font-medium">Hero Skills (3 per hero)</div>
                <div className="text-gray-500">Skill 1, Skill 2, Awakened - unique to each hero</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-white font-medium">Hero Talents (3 per hero)</div>
                <div className="text-gray-500">Passive bonuses specific to each hero</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-green-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-white font-medium">Slottable Skills</div>
                <div className="text-gray-500">General skills any hero can equip in slots 3 &amp; 4</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div className="text-sm text-gray-300">
          <strong className="text-blue-400">Changes save automatically</strong> — Edit heroes or skills and the changes are live immediately. 
          No deployment needed. Just refresh the public pages to see your updates.
        </div>
      </div>
    </div>
  );
}
