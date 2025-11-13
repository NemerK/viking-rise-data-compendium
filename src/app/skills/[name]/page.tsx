'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { skills } from '@/data/skills';
import BackButton from '@/components/BackButton';

export default function SkillDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const skill = skills.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase());


  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Skill Not Found</h1>
          <BackButton href="/skills" text="← Back to Skills" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <BackButton href="/skills" text="← Back to Skills" />
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32">
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
                {skill.name}
              </h1>
              <div className="flex items-center space-x-4 mb-2">
                <span className={`px-3 py-1 rounded text-white font-semibold ${
                  skill.type === 'Cooperation' ? 'bg-blue-600' :
                  skill.type === 'Command' ? 'bg-purple-600' :
                  skill.type === 'Passive' ? 'bg-green-600' :
                  skill.type === 'Active' ? 'bg-red-600' :
                  skill.type === 'Counterattack' ? 'bg-orange-600' :
                  'bg-gray-600'
                }`}>
                  {skill.type}
                </span>
                <span className="px-3 py-1 bg-gray-600 text-white rounded">
                  {skill.probability}% Probability
                </span>
              </div>
              <p className="text-gray-300">Skill ID: {skill.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Skill Description */}
          <div className="dark-card rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Skill Effects */}
          <div className="dark-card rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Effects</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(skill.effects).map(([effect, hasEffect]) => (
                <div key={effect} className={`p-3 rounded text-center ${
                  hasEffect ? 'ability-badge' : 'bg-gray-800'
                }`}>
                  <span className={`text-sm font-semibold ${
                    hasEffect ? 'text-blue-300' : 'text-gray-500'
                  }`}>
                    {effect}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Stats */}
          <div className="dark-card rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Skill Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Type:</span>
                <span className="text-white font-semibold">{skill.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Probability:</span>
                <span className="text-white font-semibold">{skill.probability}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Skill ID:</span>
                <span className="text-white font-semibold">{skill.id}</span>
              </div>
            </div>
          </div>

          {/* Recommended Heroes */}
          <div className="dark-card rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Recommended Heroes</h2>
            <p className="text-gray-300">
              This skill works well with heroes that have complementary abilities. 
              Look for heroes that can benefit from this skill's effects or can enhance its effectiveness.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
