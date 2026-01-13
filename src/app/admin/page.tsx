import Link from 'next/link';
import { heroes } from '@/data/heroes';
import { skills } from '@/data/skills';
import { talents } from '@/data/talents';
import { mounts } from '@/data/mounts';

export default function AdminDashboard() {
  // Calculate statistics
  const legendaryHeroes = heroes.filter(h => h.rarity === 'Legendary').length;
  const epicHeroes = heroes.filter(h => h.rarity === 'Epic').length;
  const commonHeroes = heroes.filter(h => h.rarity === 'Common').length;
  const unclassifiedHeroes = heroes.filter(h => !h.rarity).length;

  const uniqueSkills = skills.filter(s => (s as any).isUnique).length;
  const generalSkills = skills.filter(s => !(s as any).isUnique).length;

  const stats = [
    { 
      label: 'Total Heroes', 
      value: heroes.length, 
      color: 'text-amber-500',
      breakdown: `${legendaryHeroes} Legendary, ${epicHeroes} Epic, ${commonHeroes} Common${unclassifiedHeroes > 0 ? `, ${unclassifiedHeroes} Unclassified` : ''}`
    },
    { 
      label: 'Total Skills', 
      value: skills.length,
      color: 'text-purple-500',
      breakdown: `${uniqueSkills} Unique, ${generalSkills} General`
    },
    { 
      label: 'Total Talents', 
      value: talents.length,
      color: 'text-blue-500',
      breakdown: 'Hero-specific talents'
    },
    { 
      label: 'Total Mounts', 
      value: mounts.length,
      color: 'text-green-500',
      breakdown: 'Mount types with skills'
    },
  ];

  const quickActions = [
    { label: 'Add Hero', href: '/admin/heroes/new', icon: '⚔️', color: 'amber' },
    { label: 'Add Skill', href: '/admin/skills/new', icon: '✨', color: 'purple' },
    { label: 'Add Talent', href: '/admin/talents/new', icon: '🎯', color: 'blue' },
    { label: 'Add Mount', href: '/admin/mounts/new', icon: '🐎', color: 'green' },
    { label: 'Export Data', href: '/admin/export', icon: '📤', color: 'red' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-amber-500 mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your Viking Rise database</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-6 border border-amber-500/20 rounded-lg"
          >
            <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
            <div className={`text-4xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">{stat.breakdown}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`
                glass-card p-6 rounded-lg
                border border-${action.color}-500/20
                hover:border-${action.color}-500/50
                hover:bg-${action.color}-500/10
                transition-all duration-200
                text-center
                group
              `}
            >
              <div className="text-4xl mb-2">{action.icon}</div>
              <div className={`text-${action.color}-500 font-medium group-hover:text-${action.color}-400`}>
                {action.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started / Help */}
      <div className="glass-card p-6 border border-blue-500/20 rounded-lg">
        <h2 className="text-xl font-bold text-blue-500 mb-4">📘 Getting Started</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            <strong className="text-white">1. Add/Edit Data:</strong> Use the sidebar to navigate to Heroes, Skills, Talents, or Mounts sections.
          </p>
          <p>
            <strong className="text-white">2. Manage Images:</strong> Go to the Images section to organize and validate your image files.
          </p>
          <p>
            <strong className="text-white">3. Export:</strong> When you&apos;re done editing, go to Export to download your data files.
          </p>
          <p>
            <strong className="text-white">4. Deploy:</strong> Copy the exported files to <code className="bg-gray-800 px-2 py-1 rounded">src/data/</code>, commit to GitHub, and Vercel will auto-deploy!
          </p>
        </div>
      </div>

      {/* Data Status */}
      <div className="glass-card p-6 border border-amber-500/20 rounded-lg">
        <h2 className="text-xl font-bold text-amber-500 mb-4">📊 Data Status</h2>
        <div className="space-y-2 text-gray-300">
          {unclassifiedHeroes > 0 && (
            <div className="flex items-center space-x-2 text-yellow-500">
              <span>⚠️</span>
              <span>{unclassifiedHeroes} heroes need rarity/season classification</span>
            </div>
          )}
          {talents.length === 0 && (
            <div className="flex items-center space-x-2 text-yellow-500">
              <span>⚠️</span>
              <span>No talents added yet - add hero talents to complete hero data</span>
            </div>
          )}
          {mounts.length === 0 && (
            <div className="flex items-center space-x-2 text-yellow-500">
              <span>⚠️</span>
              <span>No mounts added yet - add mounts and their skills</span>
            </div>
          )}
          {unclassifiedHeroes === 0 && talents.length > 0 && mounts.length > 0 && (
            <div className="flex items-center space-x-2 text-green-500">
              <span>✅</span>
              <span>Database is in good shape!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
