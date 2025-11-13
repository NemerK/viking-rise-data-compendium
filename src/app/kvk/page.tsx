'use client';

import { useState } from 'react';
import Link from 'next/link';

const kvkPhases = [
  {
    id: 1,
    name: 'Preparation Phase',
    status: 'Active',
    description: 'Prepare your kingdom for the ultimate battle',
    duration: '7 days',
    objectives: [
      'Build up your army',
      'Form alliances',
      'Gather resources',
      'Plan strategies'
    ],
    rewards: ['Preparation Bonuses', 'Alliance Points', 'Resource Packs']
  },
  {
    id: 2,
    name: 'Battle Phase',
    status: 'Upcoming',
    description: 'Fight for supremacy against other kingdoms',
    duration: '14 days',
    objectives: [
      'Capture enemy territories',
      'Defend your lands',
      'Eliminate enemy forces',
      'Control strategic points'
    ],
    rewards: ['Victory Rewards', 'Territory Bonuses', 'Exclusive Items']
  },
  {
    id: 3,
    name: 'Settlement Phase',
    status: 'Upcoming',
    description: 'Claim your rewards and settle disputes',
    duration: '3 days',
    objectives: [
      'Claim victory rewards',
      'Negotiate peace treaties',
      'Rebuild damaged structures',
      'Plan for next KVK'
    ],
    rewards: ['Final Rewards', 'Peace Bonuses', 'Reconstruction Aid']
  }
];

const kingdoms = [
  { id: 1, name: 'Kingdom of Valhalla', power: 1250000, status: 'Active' },
  { id: 2, name: 'Northern Empire', power: 1180000, status: 'Active' },
  { id: 3, name: 'Frostborn Realm', power: 1120000, status: 'Active' },
  { id: 4, name: 'Ironhold Kingdom', power: 1080000, status: 'Active' },
  { id: 5, name: 'Stormwind Alliance', power: 1050000, status: 'Active' },
  { id: 6, name: 'Shadowmere Dominion', power: 1020000, status: 'Active' }
];

export default function KVKPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <span className="mr-2">←</span>
              Back to Home
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
            Kingdom vs Kingdom
          </h1>
          <p className="text-sm text-gray-400 font-light drop-shadow-md">
            The ultimate battle between kingdoms
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="dark-card rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-600">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'phases', label: 'Phases' },
                { id: 'kingdoms', label: 'Kingdoms' },
                { id: 'leaderboard', label: 'Leaderboard' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="dark-card rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">KVK Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Current Status</h3>
                  <p className="text-gray-300 mb-4">Preparation Phase - 3 days remaining</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Participating Kingdoms:</span>
                      <span className="text-white">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Players:</span>
                      <span className="text-white">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Phase:</span>
                      <span className="text-white">Battle Phase</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Massive kingdom battles</li>
                    <li>• Territory control system</li>
                    <li>• Alliance warfare</li>
                    <li>• Exclusive rewards</li>
                    <li>• Real-time strategy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phases Tab */}
        {activeTab === 'phases' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">KVK Phases</h2>
            {kvkPhases.map((phase) => (
              <div key={phase.id} className="dark-card rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                  <span className={`px-3 py-1 text-white text-sm rounded ${
                    phase.status === 'Active' ? 'bg-green-600' :
                    phase.status === 'Upcoming' ? 'bg-yellow-600' :
                    'bg-gray-600'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{phase.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Objectives</h4>
                    <ul className="space-y-1">
                      {phase.objectives.map((objective, index) => (
                        <li key={index} className="text-gray-300">• {objective}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Rewards</h4>
                    <div className="flex flex-wrap gap-1">
                      {phase.rewards.map((reward, index) => (
                        <span key={index} className="px-2 py-1 ability-badge rounded text-xs">
                          {reward}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 mt-2">Duration: {phase.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Kingdoms Tab */}
        {activeTab === 'kingdoms' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Participating Kingdoms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kingdoms.map((kingdom) => (
                <div key={kingdom.id} className="dark-card rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{kingdom.name}</h3>
                    <span className={`px-2 py-1 text-white text-xs rounded ${
                      kingdom.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {kingdom.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Power:</span>
                      <span className="text-white">{kingdom.power.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rank:</span>
                      <span className="text-white">#{kingdom.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">KVK Leaderboard</h2>
            <div className="dark-card rounded-lg p-6">
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">Leaderboard will be available during Battle Phase</p>
                <p className="text-gray-500">Track your kingdom's performance in real-time!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
