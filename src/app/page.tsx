import Image from 'next/image';
import { heroes } from '@/data/heroes';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Viking Rise Heroes Database
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Your complete guide to {heroes.length} heroes in Viking Rise
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">All Heroes</h2>
          <p className="text-lg text-gray-600">Click on any hero to view details</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {heroes.map((hero) => (
            <div key={hero.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={hero.portrait}
                  alt={hero.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={`absolute top-2 left-2 px-2 py-1 rounded text-white text-xs font-semibold ${
                  hero.herotype === 'Infantry' ? 'bg-green-500' :
                  hero.herotype === 'Pikeman' ? 'bg-blue-500' :
                  hero.herotype === 'Archers' ? 'bg-red-500' :
                  hero.herotype === 'Leader' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`}>
                  {hero.herotype}
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black bg-opacity-50 text-white text-xs">
                  {hero.heroclass}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{hero.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="font-semibold">ID: {hero.id}</span>
                  <span>{[
                    hero.burn && 'Burn',
                    hero.bleed && 'Bleed',
                    hero.poison && 'Poison',
                    hero.slow && 'Slow',
                    hero.heal && 'Heal',
                    hero.shield && 'Shield',
                    hero.silence && 'Silence',
                    hero.dispel && 'Dispel',
                    hero.purify && 'Purify',
                    hero.rage && 'Rage',
                    hero.evasion && 'Evasion',
                    hero.brokenblade && 'Broken Blade',
                    hero.damagereduction && 'Damage Reduction',
                    hero.lacerate && 'Lacerate'
                  ].filter(Boolean).length} Abilities</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    hero.burn && 'Burn',
                    hero.bleed && 'Bleed',
                    hero.poison && 'Poison',
                    hero.slow && 'Slow',
                    hero.heal && 'Heal',
                    hero.shield && 'Shield',
                    hero.silence && 'Silence',
                    hero.dispel && 'Dispel',
                    hero.purify && 'Purify',
                    hero.rage && 'Rage',
                    hero.evasion && 'Evasion',
                    hero.brokenblade && 'Broken Blade',
                    hero.damagereduction && 'Damage Reduction',
                    hero.lacerate && 'Lacerate'
                  ].filter(Boolean).slice(0, 4).map((ability, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 rounded text-xs">
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
