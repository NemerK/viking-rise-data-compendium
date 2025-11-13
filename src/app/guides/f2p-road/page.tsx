import Image from 'next/image';
import Link from 'next/link';

export default function F2PRoadGuide() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
              F2P Road Guide
            </h1>
            <p className="text-sm text-gray-400 font-light drop-shadow-md">
              Complete Free-to-Play Strategy Guide
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/guides" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <span className="mr-2">←</span>
            Back to Guides
          </Link>
        </div>

        {/* Guide Content */}
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg px-6 py-3 mb-8">
            <h2 className="text-2xl font-bold text-black flex items-center">
              <span className="text-3xl mr-4">🛡️</span>
              F2P Road Guide
            </h2>
          </div>
          
          <div className="space-y-8">
            <p className="text-gray-300 text-lg">
              Complete guide for Free-to-Play players to maximize their account efficiency and build strong teams without spending money.
            </p>
            
            {/* F2P Teams Display */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-white mb-4">Recommended F2P Teams</h3>
              
              {/* Archer Team */}
              <div className="p-6 bg-gray-700/50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-400 mb-4">🏹 Archer Team</h4>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center -space-x-3">
                    <div className="relative">
                      <Image
                        src="/images/heroes/artur.png"
                        alt="Artur"
                        width={80}
                        height={80}
                        className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/heroes/verdandi.png"
                        alt="Verdandi"
                        width={80}
                        height={80}
                        className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                        style={{ marginLeft: '-12px' }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-10 h-10 bg-transparent rounded-full border-2 border-yellow-600">
                    <div className="text-yellow-600 text-xl font-bold">+</div>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src="/images/heroes/olena.png"
                      alt="Olena"
                      width={80}
                      height={80}
                      className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  
                  <span className="text-3xl">🏹</span>
                </div>
                <div className="mt-4 text-gray-300">
                  <p><span className="text-blue-400 font-semibold">Main Commander:</span> Artur</p>
                  <p><span className="text-blue-400 font-semibold">Secondary Commander:</span> Olena</p>
                  <p><span className="text-blue-400 font-semibold">Alternative:</span> Verdandi + Olena</p>
                </div>
              </div>

              {/* Pikeman Team */}
              <div className="p-6 bg-gray-700/50 rounded-lg">
                <h4 className="text-lg font-semibold text-green-400 mb-4">⚔️ Pikeman Team</h4>
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20"></div> {/* Spacer for alignment */}
                  <div className="relative">
                    <Image
                      src="/images/heroes/yvette.png"
                      alt="Yvette"
                      width={80}
                      height={80}
                      className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center w-10 h-10 bg-transparent rounded-full border-2 border-yellow-600">
                    <div className="text-yellow-600 text-xl font-bold">+</div>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src="/images/heroes/olena.png"
                      alt="Olena"
                      width={80}
                      height={80}
                      className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  
                  <span className="text-3xl">⚔️</span>
                </div>
                <div className="mt-4 text-gray-300">
                  <p><span className="text-green-400 font-semibold">Main Commander:</span> Yvette</p>
                  <p><span className="text-green-400 font-semibold">Secondary Commander:</span> Olena</p>
                  <p><span className="text-green-400 font-semibold">Note:</span> Yvette must be the main commander</p>
                </div>
              </div>

              {/* Infantry Team */}
              <div className="p-6 bg-gray-700/50 rounded-lg">
                <h4 className="text-lg font-semibold text-red-400 mb-4">⚔️ Infantry Team</h4>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center -space-x-3">
                    <div className="relative">
                      <Image
                        src="/images/heroes/gregory.png"
                        alt="Gregory"
                        width={80}
                        height={80}
                        className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src="/images/heroes/bjorn.png"
                        alt="Bjorn"
                        width={80}
                        height={80}
                        className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                        style={{ marginLeft: '-12px' }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-10 h-10 bg-transparent rounded-full border-2 border-yellow-600">
                    <div className="text-yellow-600 text-xl font-bold">+</div>
                  </div>
                  
                  <div className="relative">
                    <Image
                      src="/images/heroes/olena.png"
                      alt="Olena"
                      width={80}
                      height={80}
                      className="rounded-lg border-2 border-yellow-600 hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  
                  <span className="text-3xl">⚔️</span>
                </div>
                <div className="mt-4 text-gray-300">
                  <p><span className="text-red-400 font-semibold">Main Commander:</span> Gregory or Bjorn</p>
                  <p><span className="text-red-400 font-semibold">Secondary Commander:</span> Olena</p>
                  <p><span className="text-red-400 font-semibold">Note:</span> Both Gregory and Bjorn work well as main commander</p>
                </div>
              </div>
            </div>
            
            {/* Key Tips */}
            <div className="p-6 bg-blue-600/10 border border-blue-600/30 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Key Tips for F2P Players</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Primary Hero Focus</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Focus on <span className="text-yellow-400 font-semibold">Olena</span> as your primary F2P hero</li>
                    <li>• She's versatile and works well with multiple team compositions</li>
                    <li>• Invest heavily in her skills and talents</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Talent Point Allocation</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• <span className="text-blue-400 font-semibold">Archer Teams:</span> Use Archer HP, Archer ATK, Archer DEF talents</li>
                    <li>• <span className="text-green-400 font-semibold">Mixed Teams:</span> Use "Increase TROOP ATK" talent</li>
                    <li>• <span className="text-yellow-400 font-semibold">Bonus:</span> TROOP ATK gives 1.25% vs 1% for individual bonuses</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Team Building Strategy</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Start with one strong team before building multiple</li>
                    <li>• Prioritize heroes that synergize well with Olena</li>
                    <li>• Focus on awakening your main march first</li>
                    <li>• Use these team compositions for maximum efficiency</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Advanced Tips */}
            <div className="p-6 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Advanced F2P Strategies</h3>
              <div className="space-y-3 text-gray-300">
                <p>• <span className="text-yellow-400 font-semibold">Resource Management:</span> Focus on gathering heroes and efficient resource collection</p>
                <p>• <span className="text-yellow-400 font-semibold">Event Participation:</span> Join daily turtle and octopus hunts for XP and resources</p>
                <p>• <span className="text-yellow-400 font-semibold">Gear Crafting:</span> Craft gear that enhances your chosen team composition</p>
                <p>• <span className="text-yellow-400 font-semibold">Skill Investment:</span> Level up skills moderately, focus on awakening first</p>
                <p>• <span className="text-yellow-400 font-semibold">Long-term Planning:</span> Plan your hero ascensions and skill investments carefully</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
