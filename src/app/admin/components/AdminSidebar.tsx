'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '../context/AdminContext';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Heroes', href: '/admin/heroes', icon: '⚔️' },
  { name: 'Skills', href: '/admin/skills', icon: '✨' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { saving, loading } = useAdmin();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800/50 backdrop-blur-md border-r border-amber-500/20">
      {/* Logo/Header */}
      <div className="p-6 border-b border-amber-500/20">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">⚡</span>
          <div>
            <h1 className="text-xl font-bold text-amber-500">Admin Panel</h1>
            <p className="text-xs text-gray-400">Viking Rise DB</p>
          </div>
        </Link>
      </div>

      {/* Status Indicator */}
      <div className="px-4 py-2 border-b border-gray-700/50">
        <div className="flex items-center gap-2 text-xs">
          {loading ? (
            <>
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <span className="text-yellow-400">Loading...</span>
            </>
          ) : saving ? (
            <>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-blue-400">Saving...</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400">Connected to Supabase</span>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${isActive
                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-amber-400'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Info */}
      <div className="absolute bottom-16 left-0 right-0 px-4">
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-300">
            💾 Changes save directly to database - no deployment needed!
          </p>
        </div>
      </div>

      {/* Back to Site */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-500/20">
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-amber-500 transition-colors"
        >
          <span>←</span>
          <span>Back to Site</span>
        </Link>
      </div>
    </div>
  );
}
