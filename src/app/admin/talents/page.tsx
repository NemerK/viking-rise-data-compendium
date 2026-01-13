'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAdmin } from '../context/AdminContext';

export default function TalentsPage() {
  const { state } = useAdmin();
  const [search, setSearch] = useState('');

  const filteredTalents = useMemo(() => {
    return state.talents.filter(talent =>
      talent.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [state.talents, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-500">Talents</h1>
          <p className="text-gray-400">{filteredTalents.length} of {state.talents.length} talents</p>
        </div>
        <Link
          href="/admin/talents/new"
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors"
        >
          + Add Talent
        </Link>
      </div>

      {/* Search */}
      <div className="glass-card p-4 border border-blue-500/20 rounded-lg">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search talents by name..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Talents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTalents.map(talent => (
          <Link
            key={talent.id}
            href={`/admin/talents/${talent.id}/edit`}
            className="glass-card p-4 border border-blue-500/20 rounded-lg hover:border-blue-500/50 transition-all group"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-blue-500 transition-colors">
                <Image
                  src={talent.icon}
                  alt={talent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-500 transition-colors">
                  {talent.name}
                </h3>
                <div className="text-xs text-gray-500 mt-1">
                  {talent.levels.length} levels
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredTalents.length === 0 && (
        <div className="glass-card p-12 border border-blue-500/20 rounded-lg text-center">
          <p className="text-gray-400 mb-4">
            {state.talents.length === 0 ? 'No talents created yet.' : 'No talents found matching your search.'}
          </p>
          {state.talents.length === 0 && (
            <Link
              href="/admin/talents/new"
              className="inline-block px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors"
            >
              Create Your First Talent
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
