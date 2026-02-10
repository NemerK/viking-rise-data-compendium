'use client';

import { useState, useMemo, useEffect, DragEvent } from 'react';
import Image from 'next/image';
import { Hero, Skill } from '@/types';
import { getHeroes, getSkills, getAllHeroSkills, HeroSkillData } from '@/lib/data-service';

interface TeamMember {
  hero: Hero | null;
  // 5 skill slots: slot 1-2 are hero's original skills (auto-filled), slot 3-4 are slottable, slot 5 is awakened
  skills: (Skill | null)[];
  awakenedActive: boolean; // Whether awakened skill is active
}

interface Team {
  id: number;
  members: TeamMember[];
}

type DragData = 
  | { type: 'hero'; hero: Hero; source?: { teamId: number; memberIndex: number } }
  | { type: 'skill'; skill: Skill; source?: { teamId: number; memberIndex: number; slot: number } };

// Skill tooltip component
function SkillTooltip({ 
  name, 
  type, 
  probability, 
  description, 
  isAwakened = false 
}: { 
  name: string; 
  type: string; 
  probability?: number; 
  description: string;
  isAwakened?: boolean;
}) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[100] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 min-w-[250px] max-w-[300px] shadow-xl">
        <div className={`text-sm font-bold mb-1 ${isAwakened ? 'text-yellow-400' : 'text-white'}`}>{name}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
            isAwakened ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
            type === 'Active' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
            type === 'Passive' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
            type === 'Cooperation' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
            type === 'Counterattack' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
            type === 'Command' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
            'bg-slate-500/20 text-slate-400 border border-slate-500/30'
          }`}>
            {type}
          </span>
          {probability !== undefined && probability > 0 && (
            <span className="text-[10px] text-slate-400">{probability}% chance</span>
          )}
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">{description}</p>
        
        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
      </div>
    </div>
  );
}

// Get a default skill icon based on type
function getSkillIcon(type: string, isAwakened: boolean = false): string {
  if (isAwakened) return '/images/skills/diamond/Awakening.png';
  
  // Use existing skill icons that match types as defaults
  const typeIcons: Record<string, string> = {
    'Active': '/images/skills/diamond/Fiery-Detonation.png',
    'Passive': '/images/skills/diamond/Shield-Support.png',
    'Cooperation': '/images/skills/diamond/Furious-Hack-and-Slash.png',
    'Counterattack': '/images/skills/diamond/Counterstrike.png',
    'Command': '/images/skills/diamond/Poison-Arrow.png',
  };
  return typeIcons[type] || '/images/skills/diamond/none.png';
}

export default function TeamBuilderPage() {
  // Data from Supabase
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [heroSkillsMap, setHeroSkillsMap] = useState<Map<number, HeroSkillData>>(new Map());
  const [loading, setLoading] = useState(true);

  const [teams, setTeams] = useState<Team[]>([
    { 
      id: 1, 
      members: [
        { hero: null, skills: [null, null, null, null, null], awakenedActive: true }, 
        { hero: null, skills: [null, null, null, null, null], awakenedActive: true }
      ] 
    },
  ]);
  
  const [activeTeamId, setActiveTeamId] = useState(1);
  const [activePanel, setActivePanel] = useState<'heroes' | 'skills'>('heroes');
  const [search, setSearch] = useState('');
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Mobile selection state
  const [selectedItem, setSelectedItem] = useState<DragData | null>(null);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [heroesData, skillsData, heroSkillsData] = await Promise.all([
          getHeroes(),
          getSkills(),
          getAllHeroSkills()
        ]);
        setHeroes(heroesData);
        setSkills(skillsData);
        setHeroSkillsMap(heroSkillsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const activeTeam = teams.find(t => t.id === activeTeamId)!;
  const heroTypes = useMemo(() => ['All', ...new Set(heroes.map(h => h.herotype).filter((t): t is string => !!t))], [heroes]);
  const skillTypes = useMemo(() => ['All', ...new Set(skills.map(s => s.type).filter((t): t is string => !!t && t !== 'N/A'))], [skills]);

  // Get heroes already used in the active team
  const usedHeroIds = useMemo(() => {
    return new Set(activeTeam.members.filter(m => m.hero).map(m => m.hero!.id));
  }, [activeTeam]);

  // Get skills already used in the active team
  const usedSkillIds = useMemo(() => {
    const ids = new Set<number>();
    activeTeam.members.forEach(m => {
      m.skills.forEach(skill => {
        if (skill) ids.add(skill.id);
      });
    });
    return ids;
  }, [activeTeam]);

  const filteredHeroes = useMemo(() => {
    return heroes.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || h.herotype === typeFilter;
      const notAlreadyUsed = !usedHeroIds.has(h.id);
      return matchesSearch && matchesType && notAlreadyUsed;
    });
  }, [heroes, search, typeFilter, usedHeroIds]);

  // Only show non-unique skills for slotting
  const filteredSkills = useMemo(() => {
    return skills.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || s.type === typeFilter;
      const notAlreadyUsed = !usedSkillIds.has(s.id as number);
      return matchesSearch && matchesType && !s.isUnique && notAlreadyUsed;
    });
  }, [skills, search, typeFilter, usedSkillIds]);

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

  // Handle hero being added to a slot
  const handleHeroDrop = (e: DragEvent | null, memberIndex: number, data?: DragData) => {
    if (e) e.preventDefault();
    setDragOver(null);
    const dragData = data || (e ? getDragData(e) : null);
    if (!dragData || dragData.type !== 'hero') return;
    
    // Check if hero is already in the team (unless we're moving from within the same team)
    const isFromSameTeamSlot = dragData.source && dragData.source.teamId === activeTeamId && dragData.source.memberIndex === memberIndex;
    const isAlreadyInTeam = activeTeam.members.some((m, idx) => 
      m.hero?.id === dragData.hero.id && !(dragData.source && dragData.source.teamId === activeTeamId && dragData.source.memberIndex === idx)
    );
    
    if (isAlreadyInTeam && !isFromSameTeamSlot) {
      setSelectedItem(null);
      return; // Prevent duplicate hero
    }
    
    // Clear source if dragging from another slot
    if (dragData.source) {
      setTeams(prev => prev.map(team => {
        if (team.id === dragData.source!.teamId) {
          const newMembers = [...team.members];
          newMembers[dragData.source!.memberIndex] = { hero: null, skills: [null, null, null, null, null], awakenedActive: true };
          return { ...team, members: newMembers };
        }
        return team;
      }));
    }
    
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const newMembers = [...team.members];
      newMembers[memberIndex] = { 
        ...newMembers[memberIndex], 
        hero: dragData.hero,
        skills: [null, null, null, null, null],
        awakenedActive: true
      };
      return { ...team, members: newMembers };
    }));
    
    setSelectedItem(null);
  };

  const handleSkillDrop = (e: DragEvent | null, memberIndex: number, slot: number, data?: DragData) => {
    if (e) e.preventDefault();
    setDragOver(null);
    const dragData = data || (e ? getDragData(e) : null);
    if (!dragData || dragData.type !== 'skill') return;
    
    // Only allow dropping in slots 2, 3 (slottable skills)
    if (slot < 2 || slot > 3) return;
    
    // Check if skill is already used in this team (unless moving from within same team)
    const isFromSameSlot = dragData.source && 
      dragData.source.teamId === activeTeamId && 
      dragData.source.memberIndex === memberIndex && 
      dragData.source.slot === slot;
    
    const isAlreadyUsed = activeTeam.members.some((m, mIdx) => 
      m.skills.some((s, sIdx) => 
        s?.id === dragData.skill.id && 
        !(dragData.source && dragData.source.teamId === activeTeamId && dragData.source.memberIndex === mIdx && dragData.source.slot === sIdx)
      )
    );
    
    if (isAlreadyUsed && !isFromSameSlot) {
      setSelectedItem(null);
      return; // Prevent duplicate skill
    }
    
    // Clear source if dragging from another slot
    if (dragData.source) {
      setTeams(prev => prev.map(team => {
        if (team.id === dragData.source!.teamId) {
          const newMembers = [...team.members];
          const newSkills = [...newMembers[dragData.source!.memberIndex].skills];
          newSkills[dragData.source!.slot] = null;
          newMembers[dragData.source!.memberIndex] = { ...newMembers[dragData.source!.memberIndex], skills: newSkills };
          return { ...team, members: newMembers };
        }
        return team;
      }));
    }
    
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const newMembers = [...team.members];
      const newSkills = [...newMembers[memberIndex].skills];
      newSkills[slot] = dragData.skill;
      newMembers[memberIndex] = { ...newMembers[memberIndex], skills: newSkills };
      return { ...team, members: newMembers };
    }));
    
    setSelectedItem(null);
  };

  // Mobile tap to select
  const handleItemTap = (data: DragData) => {
    if (selectedItem && selectedItem.type === data.type) {
      // Deselect if tapping same item
      if ((data.type === 'hero' && selectedItem.type === 'hero' && data.hero.id === selectedItem.hero.id) ||
          (data.type === 'skill' && selectedItem.type === 'skill' && data.skill.id === selectedItem.skill.id)) {
        setSelectedItem(null);
        return;
      }
    }
    setSelectedItem(data);
  };

  // Mobile tap on drop zone
  const handleDropZoneTap = (memberIndex: number, slot?: number) => {
    if (!selectedItem) return;
    
    if (selectedItem.type === 'hero' && slot === undefined) {
      handleHeroDrop(null, memberIndex, selectedItem);
    } else if (selectedItem.type === 'skill' && slot !== undefined) {
      handleSkillDrop(null, memberIndex, slot, selectedItem);
    }
  };

  const removeHero = (i: number) => {
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const m = [...team.members]; 
      m[i] = { hero: null, skills: [null, null, null, null, null], awakenedActive: true };
      return { ...team, members: m };
    }));
  };

  const removeSkill = (i: number, slot: number) => {
    // Only allow removing from slots 2, 3 (slottable skills)
    if (slot < 2 || slot > 3) return;
    
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const m = [...team.members];
      const newSkills = [...m[i].skills];
      newSkills[slot] = null;
      m[i] = { ...m[i], skills: newSkills };
      return { ...team, members: m };
    }));
  };

  const toggleAwakened = (memberIndex: number) => {
    setTeams(prev => prev.map(team => {
      if (team.id !== activeTeamId) return team;
      const m = [...team.members];
      m[memberIndex] = { ...m[memberIndex], awakenedActive: !m[memberIndex].awakenedActive };
      return { ...team, members: m };
    }));
  };

  const addTeam = () => {
    const newId = Math.max(...teams.map(t => t.id)) + 1;
    setTeams(prev => [...prev, { 
      id: newId, 
      members: [
        { hero: null, skills: [null, null, null, null, null], awakenedActive: true }, 
        { hero: null, skills: [null, null, null, null, null], awakenedActive: true }
      ] 
    }]);
    setActiveTeamId(newId);
  };

  const deleteTeam = (id: number) => {
    if (teams.length <= 1) return;
    setTeams(prev => prev.filter(t => t.id !== id));
    if (activeTeamId === id) setActiveTeamId(teams.find(t => t.id !== id)?.id || 1);
  };

  // Calculate stats
  const heroCount = activeTeam.members.filter(m => m.hero).length;
  const slottableSkillCount = activeTeam.members.reduce((acc, m) => {
    return acc + (m.skills[2] ? 1 : 0) + (m.skills[3] ? 1 : 0);
  }, 0);

  // Render a skill slot with icon and tooltip - using image as frame like hero portraits
  const renderSkillSlot = (
    member: TeamMember,
    memberIndex: number,
    slotIndex: number,
    heroSkillData: HeroSkillData | null
  ) => {
    const isOriginalSkill = slotIndex < 2;
    const isAwakened = slotIndex === 4;
    const isSlottable = slotIndex >= 2 && slotIndex <= 3;
    const dropId = `skill-${memberIndex}-${slotIndex}`;
    
    // Get skill data
    let skillName = '';
    let skillType = '';
    let skillDescription = '';
    let skillProbability: number | undefined;
    let skillIcon = '';
    let hasSkill = false;
    
    if (isOriginalSkill && heroSkillData) {
      const skill = slotIndex === 0 ? heroSkillData.skillOne : heroSkillData.skillTwo;
      if (skill) {
        skillName = skill.name;
        skillType = skill.type;
        skillDescription = skill.description;
        skillProbability = skill.probability;
        skillIcon = getSkillIcon(skill.type);
        hasSkill = true;
      }
    } else if (isAwakened && heroSkillData?.awakenedSkill) {
      skillName = heroSkillData.awakenedSkill.name;
      skillType = 'Awakened';
      skillDescription = heroSkillData.awakenedSkill.description;
      skillProbability = heroSkillData.awakenedSkill.probability;
      skillIcon = getSkillIcon('', true);
      hasSkill = true;
    } else if (isSlottable && member.skills[slotIndex]) {
      const skill = member.skills[slotIndex]!;
      skillName = skill.name;
      skillType = skill.type;
      skillDescription = skill.description;
      skillProbability = skill.probability;
      skillIcon = skill.icon || skill.iconRegular || skill.iconDiamond || getSkillIcon(skill.type);
      hasSkill = true;
    }
    
    const slotLabels = ['Skill 1', 'Skill 2', 'Slot 1', 'Slot 2', 'Awaken'];
    
    return (
      <div
        key={slotIndex}
        className="flex-shrink-0 relative group text-center"
        onDragOver={isSlottable ? (e) => handleDragOver(e, dropId) : undefined}
        onDragLeave={isSlottable ? handleDragLeave : undefined}
        onDrop={isSlottable ? (e) => handleSkillDrop(e, memberIndex, slotIndex) : undefined}
        onClick={isSlottable ? () => handleDropZoneTap(memberIndex, slotIndex) : (isAwakened && member.hero ? () => toggleAwakened(memberIndex) : undefined)}
      >
        {hasSkill ? (
          <div className="cursor-pointer">
            {/* Tooltip */}
            <SkillTooltip 
              name={skillName}
              type={skillType}
              probability={skillProbability}
              description={skillDescription}
              isAwakened={isAwakened}
            />
            
            {/* Skill image directly - like hero portraits */}
            <div 
              className={`relative w-16 h-16 transition-all ${
                isAwakened && !member.awakenedActive ? 'opacity-40 grayscale' : ''
              } ${dragOver === dropId ? 'scale-110' : 'hover:scale-105'} ${
                isAwakened && member.awakenedActive ? 'drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]' : 
                isSlottable ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]' : ''
              }`}
              draggable={isSlottable && !!member.skills[slotIndex]}
              onDragStart={isSlottable && member.skills[slotIndex] ? (e) => handleDragStart(e, { type: 'skill', skill: member.skills[slotIndex]!, source: { teamId: activeTeamId, memberIndex: memberIndex, slot: slotIndex } }) : undefined}
            >
              <Image 
                src={skillIcon} 
                alt={skillName} 
                fill 
                className="object-contain" 
                sizes="64px" 
                draggable={false}
              />
              
              {/* Remove button for slottable skills */}
              {isSlottable && (
                <button 
                  onClick={(e) => { e.stopPropagation(); removeSkill(memberIndex, slotIndex); }} 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
                >
                  ×
                </button>
              )}
            </div>
            
            {/* Skill type below */}
            <div className={`text-[9px] mt-1 truncate max-w-[64px] font-medium ${
              isAwakened 
                ? (member.awakenedActive ? 'text-yellow-400' : 'text-slate-600') 
                : skillType === 'Active' ? 'text-amber-400' 
                : skillType === 'Passive' ? 'text-blue-400'
                : skillType === 'Cooperation' ? 'text-green-400'
                : skillType === 'Counterattack' ? 'text-red-400'
                : skillType === 'Command' ? 'text-purple-400'
                : 'text-slate-400'
            }`}>
              {skillType.substring(0, 6)}
            </div>
            
            {/* Awakened ON/OFF indicator */}
            {isAwakened && (
              <div className={`text-[8px] ${member.awakenedActive ? 'text-yellow-500' : 'text-slate-600'}`}>
                {member.awakenedActive ? 'ON' : 'OFF'}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className={`w-16 h-16 rounded-lg border border-dashed flex flex-col items-center justify-center transition-all ${
              isSlottable 
                ? `border-slate-600 ${dragOver === dropId || (selectedItem?.type === 'skill') ? 'border-blue-400 bg-blue-400/20 scale-105' : 'hover:border-slate-500'}`
                : 'border-slate-700/50 bg-slate-800/30'
            }`}>
              {isSlottable && <span className="text-slate-600 text-xl">+</span>}
              {!isSlottable && !member.hero && <span className="text-[10px] text-slate-600">-</span>}
            </div>
            <div className="text-[9px] text-slate-600 mt-1">{slotLabels[slotIndex]}</div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading team builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">Team Builder</h1>
          <p className="text-sm text-slate-400">Drag and drop heroes and skills to build your team</p>
          <p className="text-xs text-slate-500 mt-1">On mobile: Tap to select, then tap a slot to place</p>
        </div>

        {/* Selection indicator */}
        {selectedItem && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-amber-500/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            Selected: {selectedItem.type === 'hero' ? selectedItem.hero.name : selectedItem.skill.name}
            <button 
              onClick={() => setSelectedItem(null)} 
              className="ml-2 text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left - Team Composition */}
          <div className="lg:col-span-3">
            {/* Team Tabs */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
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
              {activeTeam.members.map((member, index) => {
                const heroSkillData = member.hero ? heroSkillsMap.get(member.hero.id) || null : null;
                
                return (
                  <div key={index} className="glass-card p-5">
                    <div className="text-sm font-bold text-amber-400 mb-4 uppercase tracking-wide">
                      {index === 0 ? '👑 Main Commander' : '⚔️ Secondary Commander'}
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      {/* Hero + Skills Row */}
                      <div className="flex items-start gap-4">
                        {/* Hero Drop Zone */}
                        <div
                          onDragOver={(e) => handleDragOver(e, `hero-${index}`)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleHeroDrop(e, index)}
                          onClick={() => handleDropZoneTap(index)}
                          className="flex-shrink-0"
                        >
                          {member.hero ? (
                            <div 
                              className="relative group cursor-grab"
                              draggable
                              onDragStart={(e) => handleDragStart(e, { type: 'hero', hero: member.hero!, source: { teamId: activeTeamId, memberIndex: index } })}
                            >
                              <div className={`relative w-20 h-20 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)] transition-transform ${dragOver === `hero-${index}` ? 'scale-110' : ''}`}>
                                <Image src={member.hero.portrait} alt={member.hero.name} fill className="object-contain" sizes="80px" draggable={false} />
                              </div>
                              <div className="text-xs text-center text-amber-400 font-bold mt-1 truncate max-w-[80px]">{member.hero.name}</div>
                              <button onClick={(e) => { e.stopPropagation(); removeHero(index); }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </div>
                          ) : (
                            <div className={`w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${
                              dragOver === `hero-${index}` || (selectedItem?.type === 'hero') ? 'border-amber-400 bg-amber-400/20 scale-105' : 'border-slate-600'
                            }`}>
                              <span className="text-slate-500 text-2xl">+</span>
                            </div>
                          )}
                        </div>

                        {/* 5 Skill Slots in a Row */}
                        <div className="flex-1">
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {[0, 1, 2, 3, 4].map((slotIndex) => 
                              renderSkillSlot(member, index, slotIndex, heroSkillData)
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Stats */}
              <div className="glass-card p-5">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-amber-400">{heroCount}/2</div>
                    <div className="text-sm text-slate-400">Heroes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{slottableSkillCount}/4</div>
                    <div className="text-sm text-slate-400">Slotted Skills</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${heroCount === 2 ? 'text-green-400' : 'text-slate-500'}`}>
                      {heroCount === 2 ? '✓ Ready' : 'Incomplete'}
                    </div>
                    <div className="text-sm text-slate-400">Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Selection Panel */}
          <div className="lg:col-span-2">
            <div className="glass-card p-4 sticky top-20">
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => { setActivePanel('heroes'); setTypeFilter('All'); setSearch(''); setSelectedItem(null); }}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                    activePanel === 'heroes' ? 'bg-amber-500 text-white' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  ⚔️ Heroes
                </button>
                <button
                  onClick={() => { setActivePanel('skills'); setTypeFilter('All'); setSearch(''); setSelectedItem(null); }}
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
                    {filteredHeroes.map((hero) => {
                      const isSelected = selectedItem?.type === 'hero' && selectedItem.hero.id === hero.id;
                      return (
                        <div
                          key={hero.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, { type: 'hero', hero: hero as Hero })}
                          onClick={() => handleItemTap({ type: 'hero', hero: hero as Hero })}
                          className={`cursor-pointer group text-center transition-all ${isSelected ? 'ring-2 ring-amber-400 rounded-lg scale-105' : ''}`}
                        >
                          <div className="relative aspect-square transition-transform hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]">
                            <Image src={hero.portrait} alt={hero.name} fill className="object-contain" sizes="60px" draggable={false} />
                          </div>
                          <span className="text-[9px] text-slate-400 group-hover:text-amber-400 font-medium block truncate">{hero.name}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {filteredSkills.map((skill) => {
                      const isSelected = selectedItem?.type === 'skill' && selectedItem.skill.id === skill.id;
                      return (
                        <div
                          key={skill.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, { type: 'skill', skill: skill as Skill })}
                          onClick={() => handleItemTap({ type: 'skill', skill: skill as Skill })}
                          className={`cursor-pointer group p-2 bg-slate-800/40 rounded-lg hover:bg-slate-700/60 transition-colors text-center ${isSelected ? 'ring-2 ring-blue-400 scale-105' : ''}`}
                        >
                          <div className="relative w-10 h-10 mx-auto mb-1">
                            <Image src={skill.icon || '/images/skills/default.png'} alt={skill.name} fill className="object-contain" sizes="40px" draggable={false} />
                          </div>
                          <div className="text-[10px] text-white font-medium truncate">{skill.name}</div>
                          <div className="text-[9px] text-slate-500">{skill.type}</div>
                        </div>
                      );
                    })}
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
