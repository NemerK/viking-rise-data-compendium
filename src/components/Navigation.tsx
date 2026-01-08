'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/heroes', label: 'Heroes', icon: '⚔️' },
  { href: '/skills', label: 'Skills', icon: '✨' },
  { href: '/team-builder', label: 'Team Builder', icon: '🛡️' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 text-white font-bold text-xl hover:text-blue-400 transition-colors"
          >
            <span className="text-2xl">⚔️</span>
            <span className="hidden sm:inline bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Viking Rise DB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                  title={item.label}
                >
                  <span className="text-lg">{item.icon}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
