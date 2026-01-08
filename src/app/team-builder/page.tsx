'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { heroes } from '@/data/heroes';
import { skills } from '@/data/skills';
import { Hero, Skill } from '@/types';

interface TeamMember {
  hero: Hero | null;
  skill1: Skill | null;
  skill2: Skill | null;
}

interface Team {
  id: number;
  members: TeamMember[];
}

export default function TeamBuilderPage() {
  // Teams state
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      members: [
        { hero: null, skill1: null, skill2: null },
        { hero: null, skill1: null, skill2: null },
      ],
    },
  ]);
  
  // UI state
  const [activeTeamId, setActiveTeamId] = useState(1);
  const [selectionMode, setSelectionMode] = useState<'hero' | 'skill' | null>(null);
  const [selectionTarget, setSelectionTarget] = useState<{ memberIndex: number; skillSlot?: 1 | 2 } | null>(null);
  const [heroSearch, setHeroSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  // Get active team
  const activeTeam = teams.find(t => t.id === activeTeamId)!;

  // Filter heroes
  const filteredHeroes = useMemo(() => {
    return heroes.filter(h => h.name.toLowerCase().includes(heroSearch.toLowerCase()));
  }, [heroSearch]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter(s => s.name.toLowerCase().includes(skillSearch.toLowerCase()));
  }, [skillSearch]);

  // Open hero selection
  const openHeroSelection = (memberIndex: number) => {
    setSelectionMode('hero');
    setSelectionTarget({ memberIndex });
    setHeroSearch('');
  };

  // Open skill selection
  const openSkillSelection = (memberIndex: number, skillSlot: 1 | 2) => {
    setSelectionMode('skill');
    setSelectionTarget({ memberIndex, skillSlot });
    setSkillSearch('');
  };

  // Select hero
  const selectHero = (hero: typeof heroes[0]) => {
    if (!selectionTarget) return;
    
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      
      const newMembers = [...team.members];
      newMembers[selectionTarget.memberIndex] = {
        ...newMembers[selectionTarget.memberIndex],
        hero: hero as Hero,
      };
      
      return { ...team, members: newMembers };
    }));
    
    setSelectionMode(null);
    setSelectionTarget(null);
  };

  // Select skill
  const selectSkill = (skill: typeof skills[0]) => {
    if (!selectionTarget || !selectionTarget.skillSlot) return;
    
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      
      const newMembers = [...team.members];
      const skillKey = selectionTarget.skillSlot === 1 ? 'skill1' : 'skill2';
      newMembers[selectionTarget.memberIndex] = {
        ...newMembers[selectionTarget.memberIndex],
        [skillKey]: skill as unknown as Skill,
      };
      
      return { ...team, members: newMembers };
    }));
    
    setSelectionMode(null);
    setSelectionTarget(null);
  };

  // Remove hero
  const removeHero = (memberIndex: number) => {
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      
      const newMembers = [...team.members];
      newMembers[memberIndex] = { hero: null, skill1: null, skill2: null };
      
      return { ...team, members: newMembers };
    }));
  };

  // Remove skill
  const removeSkill = (memberIndex: number, skillSlot: 1 | 2) => {
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      
      const newMembers = [...team.members];
      const skillKey = skillSlot === 1 ? 'skill1' : 'skill2';
      newMembers[memberIndex] = {
        ...newMembers[memberIndex],
        [skillKey]: null,
      };
      
      return { ...team, members: newMembers };
    }));
  };

  // Add new team
  const addTeam = () => {
    const newId = Math.max(...teams.map(t => t.id)) + 1;
    setTeams(prev => [
      ...prev,
      {
        id: newId,
        members: [
          { hero: null, skill1: null, skill2: null },
          { hero: null, skill1: null, skill2: null },
        ],
      },
    ]);
    setActiveTeamId(newId);
  };

  // Delete team
  const deleteTeam = (teamId: number) => {
    if (teams.length <= 1) return;
    
    setTeams(prev => prev.filter(t => t.id !== teamId));
    if (activeTeamId === teamId) {
      setActiveTeamId(teams.find(t => t.id !== teamId)?.id || 1);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Team Builder</h1>
          <p className="text-slate-400">Create and customize your hero teams</p>
      </div>

        {/* Team Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {teams.map((team) => (
                    <button
              key={team.id}
              onClick={() => setActiveTeamId(team.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTeamId === team.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <span>Team {team.id}</span>
              {teams.length > 1 && (
                <span
                      onClick={(e) => {
                        e.stopPropagation();
                    deleteTeam(team.id);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-red-500/50 text-xs"
                >
                  ×
                </span>
              )}
            </button>
          ))}
          <button
            onClick={addTeam}
            className="px-4 py-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 font-medium transition-all"
          >
            + Add Team
                    </button>
                  </div>
                  
        {/* Team Composition */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">Team {activeTeamId} Composition</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTeam.members.map((member, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="text-sm font-medium text-slate-400 mb-3">
                  {index === 0 ? 'Main Commander' : 'Secondary Commander'}
                            </div>
                            
                <div className="flex gap-4">
                  {/* Hero Slot */}
                  <div className="flex-shrink-0">
                    {member.hero ? (
                      <div className="relative group">
                        <div className="relative w-24 h-24 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] transition-all">
                          <Image
                            src={member.hero.portrait}
                            alt={member.hero.name}
                            fill
                            className="object-contain"
                            sizes="96px"
                          />
                        </div>
                        <div className="text-center mt-1">
                          <span className="text-xs font-bold text-amber-400">{member.hero.name}</span>
                        </div>
                        <button
                          onClick={() => removeHero(index)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => openHeroSelection(index)}
                        className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 hover:border-amber-500 hover:text-amber-400 transition-colors"
                      >
                        <span className="text-3xl">+</span>
                      </button>
                    )}
                  </div>

                  {/* Skill Slots */}
                  <div className="flex flex-col gap-2 flex-1">
                    {[1, 2].map((slot) => {
                      const skill = slot === 1 ? member.skill1 : member.skill2;
                      return (
                        <div key={slot} className="flex items-center gap-2">
                          {skill ? (
                            <div className="flex items-center gap-2 flex-1 bg-slate-700/50 rounded-lg p-2 group relative">
                              <div className="relative w-10 h-10 flex-shrink-0">
                                <Image
                                  src={skill.icon}
                                  alt={skill.name}
                                  fill
                                  className="object-contain rounded"
                                  sizes="40px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">{skill.name}</div>
                                <div className="text-xs text-slate-400">{skill.type}</div>
                              </div>
                              <button
                                onClick={() => removeSkill(index, slot as 1 | 2)}
                                className="w-5 h-5 bg-red-500/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => openSkillSelection(index, slot as 1 | 2)}
                              className="flex-1 h-14 rounded-lg border border-dashed border-slate-600 flex items-center justify-center gap-2 text-slate-500 hover:border-blue-500 hover:text-blue-400 transition-colors"
                            >
                              <span>+</span>
                              <span className="text-sm">Skill {slot}</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* Quick Stats */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Team Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {activeTeam.members.filter(m => m.hero).length}
              </div>
              <div className="text-sm text-slate-400">Heroes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {activeTeam.members.filter(m => m.skill1).length + activeTeam.members.filter(m => m.skill2).length}
                  </div>
              <div className="text-sm text-slate-400">Skills</div>
                  </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {teams.length}
                </div>
              <div className="text-sm text-slate-400">Teams</div>
                </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {activeTeam.members.filter(m => m.hero && m.skill1 && m.skill2).length === 2 ? '✓' : '○'}
              </div>
              <div className="text-sm text-slate-400">Complete</div>
            </div>
          </div>
        </div>
                </div>

      {/* Selection Modal */}
      {selectionMode && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectionMode(null);
            setSelectionTarget(null);
          }}
        >
          <div 
            className="glass-card max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-700/50">
              <h2 className="text-xl font-bold text-white">
                {selectionMode === 'hero' ? 'Select Hero' : 'Select Skill'}
              </h2>
                  <input
                    type="text"
                placeholder={`Search ${selectionMode === 'hero' ? 'heroes' : 'skills'}...`}
                value={selectionMode === 'hero' ? heroSearch : skillSearch}
                onChange={(e) => selectionMode === 'hero' ? setHeroSearch(e.target.value) : setSkillSearch(e.target.value)}
                className="input-dark mt-3"
                autoFocus
                  />
                </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {selectionMode === 'hero' ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                  {filteredHeroes.map((hero) => (
                    <button
                      key={hero.id}
                      onClick={() => selectHero(hero)}
                      className="relative group text-center"
                    >
                      <div className="relative w-full aspect-square transition-all duration-200 hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]">
                        <Image
                          src={hero.portrait}
                          alt={hero.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 25vw, 16vw"
                        />
                      </div>
                      <div className="mt-1">
                        <span className="text-[10px] font-bold text-slate-300 group-hover:text-amber-400 transition-colors">{hero.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredSkills.map((skill) => (
                          <button
                            key={skill.id}
                      onClick={() => selectSkill(skill)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-left"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                          className="object-contain rounded"
                          sizes="48px"
                          />
                        </div>
                      <div>
                        <div className="font-medium text-white">{skill.name}</div>
                        <div className="text-xs text-slate-400">{skill.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
      </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-700/50">
              <button
                onClick={() => {
                  setSelectionMode(null);
                  setSelectionTarget(null);
                }}
                className="btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
