import Link from 'next/link';
import Image from 'next/image';
import { heroes } from '@/data/heroes';

export default function Home() {
  const featuredHeroes = heroes.slice(0, 12);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Viking Rise
              </span>
              <br />
              <span className="text-white text-3xl md:text-4xl">Heroes Database</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Complete guide to {heroes.length} heroes, skills, and team compositions
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/heroes" className="btn-primary flex items-center gap-2 text-sm">
                <span>⚔️</span>
                <span>All Heroes</span>
              </Link>
              <Link href="/team-builder" className="btn-secondary flex items-center gap-2 text-sm">
                <span>🛡️</span>
                <span>Team Builder</span>
              </Link>
              <Link href="/skills" className="btn-secondary flex items-center gap-2 text-sm">
                <span>✨</span>
                <span>Skills</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Heroes - Compact Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Featured Heroes</h2>
            <Link href="/heroes" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
            {featuredHeroes.map((hero) => (
              <Link 
                key={hero.id} 
                href={`/heroes/${encodeURIComponent(hero.name)}`}
                className="group relative"
              >
                <div className="relative w-full aspect-square transition-all duration-300 hover:scale-110 hover:z-10 group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]">
                  <Image
                    src={hero.portrait}
                    alt={hero.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                {/* Name tooltip on hover */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-[10px] font-bold text-amber-400 drop-shadow-lg">{hero.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{heroes.length}</div>
              <div className="text-xs text-slate-400">Heroes</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {heroes.filter(h => h.herotype === 'Infantry').length}
              </div>
              <div className="text-xs text-slate-400">Infantry</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {heroes.filter(h => h.herotype === 'Pikeman').length}
              </div>
              <div className="text-xs text-slate-400">Pikeman</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-red-400">
                {heroes.filter(h => h.herotype === 'Archers').length}
              </div>
              <div className="text-xs text-slate-400">Archers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Type Legend */}
      <section className="py-4 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-400">Infantry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-slate-400">Pikeman</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-slate-400">Archers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-slate-400">Leader</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
