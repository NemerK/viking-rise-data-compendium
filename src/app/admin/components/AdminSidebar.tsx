'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Heroes', href: '/admin/heroes', icon: '⚔️' },
  { name: 'Skills', href: '/admin/skills', icon: '✨' },
  { name: 'Mounts', href: '/admin/mounts', icon: '🐎' },
  { name: 'Deploy', href: '/admin/export', icon: '🚀' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

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
