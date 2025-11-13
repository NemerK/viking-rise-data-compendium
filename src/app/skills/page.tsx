'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { skills } from '@/data/skills';

const skillTypes = ['All', 'Cooperation', 'Command', 'Passive', 'Active', 'Counterattack', 'N/A'];

// Skill Card Component
function SkillCard({ skill }: { skill: any }) {

  return (
    <Link href={`/skills/${skill.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
      <div className="dark-card rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
        {/* Skill Icon */}
        <div className="relative w-full h-24 mb-4">
          <Image
            src={skill.icon}
            alt={skill.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </div>

        {/* Skill Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            {skill.name}
          </h3>
          <div className="flex items-center justify-center mb-3">
            <span className={`px-3 py-1 text-white text-sm rounded ${
              skill.type === 'Cooperation' ? 'bg-blue-600' :
              skill.type === 'Command' ? 'bg-purple-600' :
              skill.type === 'Passive' ? 'bg-green-600' :
              skill.type === 'Active' ? 'bg-red-600' :
              skill.type === 'Counterattack' ? 'bg-orange-600' :
              'bg-gray-600'
            }`}>
              {skill.type}
            </span>
          </div>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-3">
            {skill.description}
          </p>
          
          <div className="text-xs text-gray-400 mb-3">
            Probability: {skill.probability}%
          </div>

          {/* Skill Effects */}
          <div className="flex flex-wrap gap-1 justify-center">
            {Object.entries(skill.effects).map(([effect, hasEffect]) => 
              hasEffect ? (
                <span key={effect} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                  {effect}
                </span>
              ) : null
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Auto-filtering logic
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || skill.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  // Auto-complete suggestions
  const searchSuggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return skills
      .filter(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5)
      .map(skill => skill.name);
  }, [searchTerm]);

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
            Skills Database
          </h1>
          <p className="text-sm text-gray-400 font-light drop-shadow-md">
            Complete collection of {skills.length} skills in Viking Rise
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="dark-card rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Auto-complete Search */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Skills</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type skill name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full dark-input px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Auto-complete dropdown */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(suggestion)}
                        className="w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Skill Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skill Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full dark-select px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {skillTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredSkills.length} of {skills.length} skills
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedType !== 'All' && ` of type "${selectedType}"`}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No skills found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedType('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
