'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '../context/AdminContext';

export default function MountsPage() {
  const { state } = useAdmin();
  const [search, setSearch] = useState('');
  const [elementFilter, setElementFilter] = useState<string>('All');

  const filteredMounts = useMemo(() => {
    return state.mounts.filter(mount => {
      const matchesSearch = mount.name.toLowerCase().includes(search.toLowerCase());
      const matchesElement = elementFilter === 'All' || mount.element === elementFilter;
      return matchesSearch && matchesElement;
    });
  }, [state.mounts, search, elementFilter]);

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Life': return 'text-green-500 border-green-500';
      case 'Light': return 'text-yellow-500 border-yellow-500';
      case 'Fire': return 'text-red-500 border-red-500';
      case 'Ice': return 'text-blue-500 border-blue-500';
      case 'Destruction': return 'text-purple-500 border-purple-500';
      case 'Darkness': return 'text-pink-500 border-pink-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Mounts</h1>
          <p className="text-gray-400">{filteredMounts.length} of {state.mounts.length} mounts</p>
        </div>
        <Link
          href="/admin/mounts/new"
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors"
        >
          + Add Mount
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 border border-green-500/20 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Element</label>
            <select
              value={elementFilter}
              onChange={(e) => setElementFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
            >
              <option>All</option>
              <option>Life</option>
              <option>Light</option>
              <option>Fire</option>
              <option>Ice</option>
              <option>Destruction</option>
              <option>Darkness</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMounts.map(mount => (
          <Link
            key={mount.id}
            href={`/admin/mounts/${mount.id}/edit`}
            className="glass-card p-4 border border-green-500/20 rounded-lg hover:border-green-500/50 transition-all group"
          >
            <div className="space-y-3">
              {/* Mount Info */}
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-green-500 transition-colors">
                  <Image
                    src={mount.icon}
                    alt={mount.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate group-hover:text-green-500 transition-colors">
                    {mount.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded border ${getElementColor(mount.element)}`}>
                      {mount.element}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {mount.troopBenefit}
                  </div>
                </div>
              </div>

              {/* Awakened Skills */}
              {mount.awakenedSkills.length > 0 && (
                <div className="border-t border-gray-700 pt-3">
                  <div className="text-xs text-gray-400 mb-2">
                    {mount.awakenedSkills.length} Awakened Skills
                  </div>
                  <div className="flex gap-2">
                    {mount.awakenedSkills.map(skill => (
                      <div
                        key={skill.id}
                        className="relative w-10 h-10 rounded overflow-hidden border border-gray-700"
                      >
                        <Image
                          src={skill.iconDiamond}
                          alt={skill.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredMounts.length === 0 && (
        <div className="glass-card p-12 border border-green-500/20 rounded-lg text-center">
          <p className="text-gray-400 mb-4">
            {state.mounts.length === 0 ? 'No mounts created yet.' : 'No mounts found matching your filters.'}
          </p>
          {state.mounts.length === 0 && (
            <Link
              href="/admin/mounts/new"
              className="inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors"
            >
              Create Your First Mount
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
