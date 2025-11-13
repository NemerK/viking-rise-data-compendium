import Image from 'next/image';
import Link from 'next/link';

export default function Guides() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
              Player Guides
            </h1>
            <p className="text-sm text-gray-400 font-light drop-shadow-md">
              Strategies • Tips • Efficiency Guides
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <span className="mr-2">←</span>
            Back to Home
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* F2P Guide Card */}
          <Link href="/guides/f2p-road" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-600/50 hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg px-4 py-2 mb-6">
              <h2 className="text-xl font-bold text-black flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                F2P Road Guide
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300">
                Complete guide for Free-to-Play players to maximize their account efficiency and build strong teams without spending money.
              </p>
              
              {/* Preview of F2P Teams */}
              <div className="space-y-4">
                {/* Archer Team Preview */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center -space-x-2">
                    <div className="relative">
                      <Image
                        src="/images/heroes/artur.png"
                        alt="Artur"
                        width={40}
                        height={40}
                        className="rounded-lg border border-yellow-600"
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/heroes/verdandi.png"
                        alt="Verdandi"
                        width={40}
                        height={40}
                        className="rounded-lg border border-yellow-600"
                        style={{ marginLeft: '-8px' }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full border border-yellow-600">
                    <div className="text-yellow-600 text-sm font-bold">+</div>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src="/images/heroes/olena.png"
                      alt="Olena"
                      width={40}
                      height={40}
                      className="rounded-lg border border-yellow-600"
                    />
                  </div>
                  
                  <span className="text-lg">🏹</span>
                </div>

                {/* Pikeman Team Preview */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10"></div> {/* Spacer */}
                  <div className="relative">
                    <Image
                      src="/images/heroes/yvette.png"
                      alt="Yvette"
                      width={40}
                      height={40}
                      className="rounded-lg border border-yellow-600"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full border border-yellow-600">
                    <div className="text-yellow-600 text-sm font-bold">+</div>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src="/images/heroes/olena.png"
                      alt="Olena"
                      width={40}
                      height={40}
                      className="rounded-lg border border-yellow-600"
                    />
                  </div>
                  
                  <span className="text-lg">⚔️</span>
                </div>

                {/* Infantry Team Preview */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center -space-x-2">
                    <div className="relative">
                      <Image
                        src="/images/heroes/gregory.png"
                        alt="Gregory"
                        width={40}
                        height={40}
                        className="rounded-lg border border-yellow-600"
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/heroes/bjorn.png"
                        alt="Bjorn"
                        width={40}
                        height={40}
                        className="rounded-lg border border-yellow-600"
                        style={{ marginLeft: '-8px' }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full border border-yellow-600">
                    <div className="text-yellow-600 text-sm font-bold">+</div>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src="/images/heroes/olena.png"
                      alt="Olena"
                      width={40}
                      height={40}
                      className="rounded-lg border border-yellow-600"
                    />
                  </div>
                  
                  <span className="text-lg">⚔️</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                <h3 className="text-sm font-semibold text-white mb-2">Key Tips:</h3>
                <ul className="text-gray-300 space-y-1 text-xs">
                  <li>• Focus on Olena as your primary F2P hero</li>
                  <li>• Use Archer HP, ATK, DEF talents for archer teams</li>
                  <li>• Use "Increase TROOP ATK" for mixed teams</li>
                </ul>
              </div>
              
              <div className="mt-4 text-yellow-400 text-sm font-semibold group-hover:text-yellow-300 transition-colors">
                Read Full Guide →
              </div>
            </div>
          </Link>

          {/* Gathering Guide Card */}
          <Link href="/guides/gathering" className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-600/50 hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg px-4 py-2 mb-6">
              <h2 className="text-xl font-bold text-black flex items-center">
                <span className="text-2xl mr-3">⛏️</span>
                Gathering Guide
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300">
                Complete guide for efficient resource gathering and maximizing your collection rates in Viking Rise.
              </p>
              
              {/* Quick Summary Preview */}
              <div className="p-3 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
                <h3 className="text-sm font-semibold text-yellow-400 mb-2">📋 Quick Summary</h3>
                <ul className="text-gray-300 space-y-1 text-xs">
                  <li>• Gather level 4 if you need to do something soon</li>
                  <li>• Gather outside of the zone if none is available</li>
                  <li>• Gather 5 and 6 ONLY if uninterrupted</li>
                  <li>• Plan ahead, keep events in mind</li>
                </ul>
              </div>

              {/* Topics Preview */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="text-blue-400">📍</span>
                  <span>Resource Location Guide</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="text-green-400">🏭</span>
                  <span>Production Optimization</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="text-purple-400">⚔️</span>
                  <span>Hero Optimization</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="text-orange-400">🐎</span>
                  <span>Mount Strategies</span>
                </div>
              </div>
              
              <div className="mt-4 text-yellow-400 text-sm font-semibold group-hover:text-yellow-300 transition-colors">
                Read Full Guide →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
