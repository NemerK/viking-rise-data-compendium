'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/heroes', label: 'Heroes', icon: '⚔️' },
    { href: '/skills', label: 'Skills', icon: '🎯' },
    { href: '/f2p-guide', label: 'F2P Guide', icon: '🛡️' },
    { href: '/events', label: 'Events', icon: '📅' },
    { href: '/kvk', label: 'KVK', icon: '👑' },
  ];

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md border-b border-gray-700 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-300 transition-colors">
              ⚔️ Viking Rise DB
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    pathname === item.href
                      ? 'text-white bg-blue-600/20 border border-blue-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
