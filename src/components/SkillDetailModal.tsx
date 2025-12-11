'use client';

import Image from 'next/image';
import { Skill } from '@/types';

interface SkillDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
}

export default function SkillDetailModal({ isOpen, onClose, skill }: SkillDetailModalProps) {
  if (!isOpen || !skill) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="dark-card max-w-2xl w-full rounded-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative w-16 h-16 mr-4">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{skill.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-white text-xs rounded ${
                    skill.type === 'Active' ? 'bg-blue-600' :
                    skill.type === 'Passive' ? 'bg-green-600' :
                    skill.type === 'Counterattack' ? 'bg-red-600' :
                    skill.type === 'Cooperation' ? 'bg-purple-600' :
                    skill.type === 'Command' ? 'bg-yellow-600' :
                    skill.type === 'Awaken' ? 'bg-orange-600' :
                    'bg-gray-600'
                  }`}>
                    {skill.type}
                  </span>
                  <span className="text-gray-300 text-sm">Probability: {skill.probability}%</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed">{skill.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Effects</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(skill.effects).map(([ability, value]) =>
                value && (
                  <span key={ability} className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded">
                    {ability}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-200 mb-1">Skill ID</h4>
              <p className="text-gray-300">{skill.id}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-1">Type</h4>
              <p className="text-gray-300">{skill.type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
