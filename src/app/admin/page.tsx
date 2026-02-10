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

  const stats = [
    { 
      label: 'Heroes', 
      value: state.heroes.length, 
      color: 'text-amber-500',
      icon: '⚔️',
      detail: `${heroesWithAllSkills} with all skills`
    },
    { 
      label: 'Hero Skills', 
      value: totalHeroSkills, 
      color: 'text-purple-500',
      icon: '🎯',
      detail: `${Math.round(totalHeroSkills / 3)} heroes covered`
    },
    { 
      label: 'Hero Talents', 
      value: totalHeroTalents, 
      color: 'text-blue-500',
      icon: '⭐',
      detail: `${heroesWithAllTalents} heroes complete`
    },
    { 
      label: 'Slottable Skills', 
      value: state.skills.length, 
      color: 'text-green-500',
      icon: '✨',
      detail: 'Can be equipped by any hero'
    },
  ];

  const quickActions = [
    { label: 'Add Hero', href: '/admin/heroes/new', icon: '⚔️', color: 'amber' },
    { label: 'Add Skill', href: '/admin/skills/new', icon: '✨', color: 'purple' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-amber-500 mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your Viking Rise database</p>
      </div>

      {/* Connection Status */}
      <div className="glass-card p-4 border border-green-500/30 rounded-lg bg-green-500/5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 font-medium">Connected to Supabase</span>
          <span className="text-gray-500 text-sm">• Changes save automatically to database</span>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-6 border border-amber-500/20 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
            <div className={`text-4xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">{stat.detail}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="glass-card p-6 rounded-lg border border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-200 text-center group"
            >
              <div className="text-4xl mb-2">{action.icon}</div>
              <div className="text-amber-500 font-medium group-hover:text-amber-400">
                {action.label}
              </div>
            </Link>
          ))}
          <Link
            href="/admin/heroes"
            className="glass-card p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 text-center group"
          >
            <div className="text-4xl mb-2">📋</div>
            <div className="text-gray-400 font-medium group-hover:text-gray-300">
              View All Heroes
            </div>
          </Link>
          <Link
            href="/admin/skills"
            className="glass-card p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 text-center group"
          >
            <div className="text-4xl mb-2">📋</div>
            <div className="text-gray-400 font-medium group-hover:text-gray-300">
              View All Skills
            </div>
          </Link>
        </div>
      </div>

      {/* Data Completeness */}
      <div className="glass-card p-6 border border-amber-500/20 rounded-lg">
        <h2 className="text-xl font-bold text-amber-500 mb-4">📊 Data Completeness</h2>
        <div className="space-y-4">
          {/* Heroes with skills */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Heroes with all 3 skills</span>
              <span className="text-amber-400">{heroesWithAllSkills} / {state.heroes.length}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${state.heroes.length > 0 ? (heroesWithAllSkills / state.heroes.length) * 100 : 0}%` }}
              />
            </div>
          </div>
          
          {/* Heroes with talents */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Heroes with all 3 talents</span>
              <span className="text-blue-400">{heroesWithAllTalents} / {state.heroes.length}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${state.heroes.length > 0 ? (heroesWithAllTalents / state.heroes.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="glass-card p-6 border border-blue-500/20 rounded-lg">
        <h2 className="text-xl font-bold text-blue-500 mb-4">📘 How It Works</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            <strong className="text-white">1. Edit Data:</strong> Click on any hero or skill to edit. Changes save directly to Supabase.
          </p>
          <p>
            <strong className="text-white">2. Hero Skills & Talents:</strong> Each hero has 3 unique skills (skill1, skill2, awakened) and 3 talents - edit these on the hero&apos;s page.
          </p>
          <p>
            <strong className="text-white">3. Slottable Skills:</strong> These are general skills any hero can equip in slots 3 & 4. Manage them in the Skills section.
          </p>
          <p>
            <strong className="text-white">4. No Deploy Needed:</strong> Your changes are live immediately - just refresh the public pages to see updates!
          </p>
        </div>
      </div>
    </div>
  );
}
