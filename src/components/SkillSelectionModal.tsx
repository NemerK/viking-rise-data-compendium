'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Skill, SkillType } from '@/types';
import { skills } from '@/data/skills';

interface SkillSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSkill: (skill: Skill) => void;
  slotNumber: number;
  currentlySelectedSkill?: Skill | null;
}

const skillTypes: (SkillType | 'All')[] = ['All', 'Active', 'Passive', 'Counterattack', 'Cooperation', 'Command', 'Awaken'];

export default function SkillSelectionModal({ isOpen, onClose, onSelectSkill, slotNumber, currentlySelectedSkill }: SkillSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<SkillType | 'All'>('All');

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || skill.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="dark-card max-w-4xl w-full max-h-[80vh] overflow-hidden rounded-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Select Skill for Slot {slotNumber}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dark-input w-full px-4 py-2 rounded-lg"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as SkillType | 'All')}
                className="dark-select w-full px-4 py-2 rounded-lg"
              >
                {skillTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = currentlySelectedSkill?.id === skill.id;
              console.log('Skill:', skill.name, 'Currently Selected:', currentlySelectedSkill?.name, 'Is Selected:', isSelected);
              return (
                <div
                  key={skill.id}
                  onClick={() => onSelectSkill(skill)}
                  className={`dark-card p-4 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'border-4 border-green-400 bg-green-400/20 ring-2 ring-green-400/50' 
                      : 'border border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                <div className="flex items-center mb-3">
                  <div className="relative w-12 h-12 mr-3">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                    <p className="text-xs text-gray-400">{skill.type}</p>
                    <p className="text-xs text-gray-300">{skill.probability}%</p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">{skill.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(skill.effects).slice(0, 3).map(([ability, value]) =>
                    value && (
                      <span key={ability} className="px-1 py-0.5 bg-blue-600/20 text-blue-300 text-xs rounded">
                        {ability}
                      </span>
                    )
                  )}
                </div>
                </div>
              );
            })}
          </div>
          
          {filteredSkills.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No skills found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
