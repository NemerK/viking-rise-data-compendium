'use client';

import { useState, useMemo, DragEvent } from 'react';
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

type DragData = 
  | { type: 'hero'; hero: Hero; source?: { teamId: number; memberIndex: number } }
  | { type: 'skill'; skill: Skill; source?: { teamId: number; memberIndex: number; slot: 1 | 2 } };

export default function TeamBuilderPage() {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, members: [{ hero: null, skill1: null, skill2: null }, { hero: null, skill1: null, skill2: null }] },
  ]);
  
  const [activeTeamId, setActiveTeamId] = useState(1);
  const [activePanel, setActivePanel] = useState<'heroes' | 'skills'>('heroes');
  const [search, setSearch] = useState('');
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('All');

  const activeTeam = teams.find(t => t.id === activeTeamId)!;
  const heroTypes = ['All', ...new Set(heroes.map(h => h.herotype))];
  const skillTypes = ['All', ...new Set(skills.map(s => s.type).filter(t => t !== 'N/A'))];

  const filteredHeroes = useMemo(() => {
    return heroes.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || h.herotype === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const filteredSkills = useMemo(() => {
    return skills.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || s.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const handleDragStart = (e: DragEvent, data: DragData) => {
    const jsonData = JSON.stringify(data);
    e.dataTransfer.setData('text/plain', jsonData);
    e.dataTransfer.setData('application/json', jsonData);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent, dropId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(dropId);
  };

  const handleDragLeave = () => setDragOver(null);

  const getDragData = (e: DragEvent): DragData | null => {
    try {
      const jsonString = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');
      return jsonString ? JSON.parse(jsonString) : null;
    } catch { return null; }
  };

  const handleHeroDrop = (e: DragEvent, memberIndex: number) => {
    e.preventDefault();
    setDragOver(null);
    const data = getDragData(e);
    if (!data || data.type !== 'hero') return;
    
    if (data.source) {
      setTeams(prev => prev.map(team => {
        if (team.id === data.source!.teamId) {
          const newMembers = [...team.members];
          newMembers[data.source!.memberIndex] = { hero: null, skill1: null, skill2: null };
          return { ...team, members: newMembers };
        }
        return team;
      }));
    }
    
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const newMembers = [...team.members];
      newMembers[memberIndex] = { ...newMembers[memberIndex], hero: data.hero };
      return { ...team, members: newMembers };
    }));
  };

  const handleSkillDrop = (e: DragEvent, memberIndex: number, slot: 1 | 2) => {
    e.preventDefault();
    setDragOver(null);
    const data = getDragData(e);
    if (!data || data.type !== 'skill') return;
    
    if (data.source) {
      setTeams(prev => prev.map(team => {
        if (team.id === data.source!.teamId) {
          const newMembers = [...team.members];
          newMembers[data.source!.memberIndex] = { ...newMembers[data.source!.memberIndex], [data.source!.slot === 1 ? 'skill1' : 'skill2']: null };
          return { ...team, members: newMembers };
        }
        return team;
      }));
    }
    
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const newMembers = [...team.members];
      newMembers[memberIndex] = { ...newMembers[memberIndex], [slot === 1 ? 'skill1' : 'skill2']: data.skill };
      return { ...team, members: newMembers };
    }));
  };

  const removeHero = (i: number) => {
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const m = [...team.members]; m[i] = { hero: null, skill1: null, skill2: null };
      return { ...team, members: m };
    }));
  };

  const removeSkill = (i: number, slot: 1 | 2) => {
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const m = [...team.members]; m[i] = { ...m[i], [slot === 1 ? 'skill1' : 'skill2']: null };
      return { ...team, members: m };
    }));
  };

  const addTeam = () => {
    const newId = Math.max(...teams.map(t => t.id)) + 1;
    setTeams(prev => [...prev, { id: newId, members: [{ hero: null, skill1: null, skill2: null }, { hero: null, skill1: null, skill2: null }] }]);
    setActiveTeamId(newId);
  };

  const deleteTeam = (id: number) => {
    if (teams.length <= 1) return;
    setTeams(prev => prev.filter(t => t.id !== id));
    if (activeTeamId === id) setActiveTeamId(teams.find(t => t.id !== id)?.id || 1);
  };

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">Team Builder</h1>
          <p className="text-sm text-slate-400">Drag and drop heroes and skills to build your team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Team Composition */}
          <div>
            {/* Team Tabs */}
            <div className="flex items-center gap-2 mb-4">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setActiveTeamId(team.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTeamId === team.id ? 'bg-amber-500 text-white' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  Team {team.id}
                  {teams.length > 1 && (
                    <span onClick={(e) => { e.stopPropagation(); deleteTeam(team.id); }} className="ml-1 hover:text-red-400">×</span>
                  )}
                </button>
              ))}
              <button onClick={addTeam} className="px-3 py-2 rounded-lg bg-slate-800/60 text-green-400 hover:bg-slate-700/60 text-sm">+ New</button>
            </div>

            {/* Team Cards */}
            <div className="space-y-4">
              {activeTeam.members.map((member, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="text-xs font-bold text-amber-400 mb-3 uppercase tracking-wide">
                    {index === 0 ? '👑 Main Commander' : '⚔️ Secondary Commander'}
                  </div>
                  
                  <div className="flex gap-4">
                    {/* Hero Drop Zone */}
                    <div
                      onDragOver={(e) => handleDragOver(e, `hero-${index}`)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleHeroDrop(e, index)}
                    >
                      {member.hero ? (
                        <div 
                          className="relative group cursor-grab"
                          draggable
                          onDragStart={(e) => handleDragStart(e, { type: 'hero', hero: member.hero!, source: { teamId: activeTeamId, memberIndex: index } })}
                        >
                          <div className={`relative w-16 h-16 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-transform ${dragOver === `hero-${index}` ? 'scale-110' : ''}`}>
                            <Image src={member.hero.portrait} alt={member.hero.name} fill className="object-contain" sizes="64px" draggable={false} />
                          </div>
                          <div className="text-[10px] text-center text-amber-400 font-bold mt-1">{member.hero.name}</div>
                          <button onClick={() => removeHero(index)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                        </div>
                      ) : (
                        <div className={`w-16 h-16 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${
                          dragOver === `hero-${index}` ? 'border-amber-400 bg-amber-400/20 scale-110' : 'border-slate-600'
                        }`}>
                          <span className="text-slate-500 text-xl">+</span>
                        </div>
                      )}
                    </div>

                    {/* Skill Drop Zones */}
                    <div className="flex-1 space-y-2">
                      {[1, 2].map((slot) => {
                        const skill = slot === 1 ? member.skill1 : member.skill2;
                        const dropId = `skill-${index}-${slot}`;
                        return (
                          <div
                            key={slot}
                            onDragOver={(e) => handleDragOver(e, dropId)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleSkillDrop(e, index, slot as 1 | 2)}
                          >
                            {skill ? (
                              <div 
                                className={`flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg group cursor-grab transition-all ${dragOver === dropId ? 'ring-2 ring-blue-400' : ''}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, { type: 'skill', skill, source: { teamId: activeTeamId, memberIndex: index, slot: slot as 1 | 2 } })}
                              >
                                <div className="relative w-9 h-9 flex-shrink-0">
                                  <Image src={skill.icon || skill.iconRegular || skill.iconDiamond || '/images/skills/none.png'} alt={skill.name} fill className="object-contain rounded" sizes="36px" draggable={false} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-white font-medium truncate">{skill.name}</div>
                                  <div className="text-[10px] text-slate-400">{skill.type}</div>
                                </div>
                                <button onClick={() => removeSkill(index, slot as 1 | 2)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                              </div>
                            ) : (
                              <div className={`h-[52px] rounded-lg border border-dashed flex items-center justify-center gap-2 transition-all ${
                                dragOver === dropId ? 'border-blue-400 bg-blue-400/20' : 'border-slate-600'
                              }`}>
                                <span className="text-slate-500 text-sm">+ Skill {slot}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Stats */}
              <div className="glass-card p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-amber-400">{activeTeam.members.filter(m => m.hero).length}/2</div>
                    <div className="text-xs text-slate-400">Heroes</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400">{activeTeam.members.filter(m => m.skill1).length + activeTeam.members.filter(m => m.skill2).length}/4</div>
                    <div className="text-xs text-slate-400">Skills</div>
                  </div>
                  <div>
                    <div className={`text-xl font-bold ${activeTeam.members.every(m => m.hero && m.skill1 && m.skill2) ? 'text-green-400' : 'text-slate-500'}`}>
                      {activeTeam.members.every(m => m.hero && m.skill1 && m.skill2) ? '✓ Ready' : 'Incomplete'}
                    </div>
                    <div className="text-xs text-slate-400">Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Selection Panel */}
          <div>
            <div className="glass-card p-4 sticky top-20">
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => { setActivePanel('heroes'); setTypeFilter('All'); setSearch(''); }}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                    activePanel === 'heroes' ? 'bg-amber-500 text-white' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  ⚔️ Heroes
                </button>
                <button
                  onClick={() => { setActivePanel('skills'); setTypeFilter('All'); setSearch(''); }}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                    activePanel === 'skills' ? 'bg-blue-500 text-white' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  ✨ Skills
                </button>
              </div>

              {/* Search & Filter */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-dark text-sm h-10 flex-1"
                />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="select-dark text-sm h-10 w-28"
                >
                  {(activePanel === 'heroes' ? heroTypes : skillTypes).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Items Grid */}
              <div className="h-[420px] overflow-y-auto pr-1">
                {activePanel === 'heroes' ? (
                  <div className="grid grid-cols-5 gap-2">
                    {filteredHeroes.map((hero) => (
                      <div
                        key={hero.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, { type: 'hero', hero: hero as Hero })}
                        className="cursor-grab group text-center"
                      >
                        <div className="relative aspect-square transition-transform hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]">
                          <Image src={hero.portrait} alt={hero.name} fill className="object-contain" sizes="60px" draggable={false} />
                        </div>
                        <span className="text-[9px] text-slate-400 group-hover:text-amber-400 font-medium block truncate">{hero.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, { type: 'skill', skill: skill as Skill })}
                        className="cursor-grab group p-2 bg-slate-800/40 rounded-lg hover:bg-slate-700/60 transition-colors text-center"
                      >
                        <div className="relative w-10 h-10 mx-auto mb-1">
                          <Image src={skill.icon} alt={skill.name} fill className="object-contain" sizes="40px" draggable={false} />
                        </div>
                        <div className="text-[10px] text-white font-medium truncate">{skill.name}</div>
                        <div className="text-[9px] text-slate-500">{skill.type}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Count */}
              <div className="mt-3 pt-3 border-t border-slate-700/50 text-center text-xs text-slate-500">
                {activePanel === 'heroes' ? filteredHeroes.length : filteredSkills.length} {activePanel} available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
