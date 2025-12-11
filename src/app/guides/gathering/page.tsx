import Image from 'next/image';
import Link from 'next/link';

export default function GatheringGuide() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
              Gathering Guide
            </h1>
            <p className="text-sm text-gray-400 font-light drop-shadow-md">
              Complete Resource Gathering Strategy
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
              <span className="text-3xl mr-4">⛏️</span>
              Gathering Guide
            </h2>
          </div>
          
          <div className="space-y-8">
            <p className="text-gray-300 text-lg">
              Complete guide for efficient resource gathering and maximizing your collection rates in Viking Rise.
            </p>
            
            {/* Quick Summary */}
            <div className="p-6 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">📋 QUICK SUMMARY</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Gather level 4 if you need to do something soon, don't start level 5 or 6</li>
                <li>• Gather outside of the zone if none is available</li>
                <li>• Gather outside of the zone as you go away from the game for many hours</li>
                <li>• Gather 5 and 6 ONLY if you KNOW that your gathering will go uninterrupted</li>
                <li>• Plan ahead, make sure to keep events in mind as well</li>
                <li>• MARK IT ON YOUR MAP if you leave resources unattended!</li>
              </ul>
            </div>

            {/* How to Find Last Resource */}
            <div className="p-6 bg-gray-700/50 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">📍 How to Find Your Last Resource</h3>
              <div className="text-gray-300 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400 font-bold text-lg">1.</span>
                  <p>Click <span className="text-blue-400 font-semibold">MAIL</span></p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400 font-bold text-lg">2.</span>
                  <p>Click <span className="text-blue-400 font-semibold">GATHERING REPORT</span></p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400 font-bold text-lg">3.</span>
                  <p>Click on the <span className="text-blue-400 font-semibold">COORDINATES</span> of the resource you've taken but left UNFINISHED</p>
                </div>
              </div>
            </div>

            {/* Production Tips */}
            <div className="p-6 bg-gray-700/50 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">🏭 Production Optimization</h3>
              <div className="text-gray-300 space-y-3">
                <div>
                  <p><span className="text-green-400 font-semibold">PRODUCTION:</span> Always be producing Porters from Porter barracks</p>
                  <p className="text-sm text-gray-400 ml-4">Keep your production lines active at all times</p>
                </div>
                <div>
                  <p><span className="text-green-400 font-semibold">MOST EFFICIENT:</span> Consistently produce level 1 grunts</p>
                  <p className="text-sm text-gray-400 ml-4">Thanks to Shmontey for this optimization tip!</p>
                </div>
                <div>
                  <p><span className="text-green-400 font-semibold">TIME OPTIMIZATION:</span> Create different tier units to fill time gaps when away</p>
                  <p className="text-sm text-gray-400 ml-4">If going to sleep for 8 hours, create higher tier units</p>
                </div>
                <div>
                  <p><span className="text-green-400 font-semibold">HIGH TIER:</span> Use high tier soldiers for massive resource nodes during events</p>
                  <p className="text-sm text-gray-400 ml-4">Higher tier Porters gather more efficiently for long-term gathering</p>
                </div>
              </div>
            </div>

            {/* Hero Optimization */}
            <div className="p-6 bg-gray-700/50 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">⚔️ Hero Optimization</h3>
              <div className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">LEVELING HEROES</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Level up and ascend your gathering heroes to at least level 40</li>
                    <li>• Join daily turtle and octopus hunt for XP</li>
                    <li>• Higher level = more soldiers capacity</li>
                    <li>• More soldiers = faster gathering rates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">HERO ASCENSION</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Invest in correct skills for gathering rate</li>
                    <li>• 5 Star heroes get better stats naturally</li>
                    <li>• Focus on awakening your main march first</li>
                    <li>• Ascension impacts gathering rate significantly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">HERO TALENTS</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Specialize heroes in ONE resource type</li>
                    <li>• Don't mix gold and lumber efficiency on same hero</li>
                    <li>• Use talent points wisely for maximum performance</li>
                    <li>• Each hero should focus on their best resource</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">HERO SKILLS</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Slot gathering skills on heroes accordingly</li>
                    <li>• Example: Sveinn gets two gold gathering skills</li>
                    <li>• Level up skills moderately, focus on awakening first</li>
                    <li>• Skills provide additional gathering bonuses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mounts */}
            <div className="p-6 bg-gray-700/50 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">🐎 Mounts</h3>
              <div className="text-gray-300 space-y-3">
                <div>
                  <p><span className="text-orange-400 font-semibold">NOT RECOMMENDED:</span> Investing heavily in mounts due to limited resources</p>
                  <p className="text-sm text-gray-400 ml-4">Resources are precious and should be prioritized elsewhere</p>
                </div>
                <div>
                  <p><span className="text-orange-400 font-semibold">ALTERNATIVE:</span> Give heroes BASE LEVEL mounts that fit their gathering assignments</p>
                  <p className="text-sm text-gray-400 ml-4">No leveling up until much later due to lack of resources</p>
                </div>
                <div>
                  <p><span className="text-orange-400 font-semibold">EXAMPLE:</span> Waltham (Food gathering hero) gets food-focused mount</p>
                  <p className="text-sm text-gray-400 ml-4">Match mount element to hero's primary resource</p>
                </div>
              </div>
            </div>

            {/* Resource Nodes */}
            <div className="p-6 bg-gray-700/50 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">🗺️ Resource Nodes Strategy</h3>
              <div className="text-gray-300 space-y-3">
                <div>
                  <p><span className="text-red-400 font-semibold">HIGH LEVEL NODES:</span> Only go for level 5-6 if you KNOW they won't be interrupted</p>
                  <p className="text-sm text-gray-400 ml-4">No excuse to make your tribe suffer while looking for fresh resources</p>
                </div>
                <div>
                  <p><span className="text-red-400 font-semibold">NO LEFTOVERS:</span> Always gather the FULL resource node</p>
                  <p className="text-sm text-gray-400 ml-4">Complete the entire node or don't start it</p>
                </div>
                <div>
                  <p><span className="text-red-400 font-semibold">PLANNING:</span> Look for level 4 resources if going hunting soon</p>
                  <p className="text-sm text-gray-400 ml-4">Plan your gathering around your schedule</p>
                </div>
                <div>
                  <p><span className="text-red-400 font-semibold">AWAY TIME:</span> If away 6+ hours, gather outside tribe zone</p>
                  <p className="text-sm text-gray-400 ml-4">Your marches will be back home before you return</p>
                </div>
                <div>
                  <p><span className="text-red-400 font-semibold">TRIBE CONSIDERATION:</span> Let available players take zone resources</p>
                  <p className="text-sm text-gray-400 ml-4">Everyone has a private life and cannot be in game at all times</p>
                </div>
              </div>
            </div>

            {/* Key Principles */}
            <div className="p-6 bg-blue-600/10 border border-blue-600/30 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Key Principles</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Always gather when idle</li>
                <li>• Use correct heroes, mounts AND gear when gathering</li>
                <li>• Clean up consistently, even if tile isn't yours</li>
                <li>• Craft gear that helps your heroes</li>
                <li>• Plan ahead and keep events in mind</li>
                <li>• Make sure to always clean up if you're consistently online</li>
                <li>• Resources are of utmost importance in Viking Rise</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
