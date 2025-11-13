'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroes } from '@/data/heroes';
import { skills } from '@/data/skills';
import { Hero, Skill, Mount, HeroClass, SkillType } from '@/types';
import html2canvas from 'html2canvas';

// Helper function to get diamond-shaped skill images for team composition
function getDiamondSkillIcon(skillName: string): string {
  const diamondImageMap: { [key: string]: string } = {
    'Furious Hack and Slash': 'Furious-Hack-and-Slash-small.png',
    'Poison Arrow': 'Poison-Arrow-small.png',
    'Shield Wall': 'Shield-Support-small.png',
    'Healing Light': 'Blessed-Healing-small.png',
    'Battle Cry': 'Battle-Hymn-small.png',
    'Counter Strike': 'Counterstrike-small.png',
    'Divine Protection': 'Divine-Shield-small.png',
    'Divine Shield': 'Divine-Shield-small.png',
    'Silence': 'Silencer-small.png',
    'Silent Assassin': 'Silent-Invasion-small.png',
    'Rapid Fire': 'Rapid-Attack-small.png',
    'Blood Rage': 'Bloody-Rage-small.png',
    'Divine Blessing': 'Divine-Blessing-small.png',
    'Fearless Charge': 'Fearless-small.png',
    'Enchanted Pursuit': 'Enchanted-Pursuit-small.png',
    'Rest and Counterattack': 'Rest-and-Counterattack-small.png',
    'Retaliate': 'Retaliate-small.png',
    'Siege': 'Siege-small.png',
    'Silent Invasion': 'Silent-Invasion-small.png',
    'Solitude': 'Solitude-small.png',
    'Splinter': 'Splinter-small.png',
    'Tenacity': 'Tenacity-small.png',
    'This Too Shall Pass': 'This-Too-Shall-Pass-small.png',
    'Thors Determination': 'Thors-Determination-small.png',
    'Tidal Attack': 'Tidal-Attack-small.png',
    'Trap of Despair': 'Trap-of-Despair-small.png',
    'Valkyries Gaze': 'Valkyries-Gaze-small.png',
    'Venom Aggregation': 'Venom-Agrregation-small.png',
    'Wild Indulgence': 'Wild-Indulgence-small.png',
    'First Strike': 'First-Strike-small.png',
    'Enrage': 'Enrage-small.png',
    'Odins Asylum': 'Odins-Asylum-small.png',
    'Rage Leech': 'Rage-Leech-small.png',
    'Hymn of Life': 'Hymn-of-Life-small.png',
    'Deadly Counterattack': 'Deadly-Counterattack-small.png',
    'Devastating Charge': 'Devastating-Charge-small.png',
    'Disarmament': 'Disarmament-small.png',
    'On Alert': 'On-Alert-small.png',
    'Blessed Negation': 'Blessed-Negation-small.png',
    'Blessed by Fate': 'Blessed-by-Fate-small.png',
    'Broken Armor': 'Broken-Armor-small.png',
    'Blow of Chaos': 'Blow-of-Chaos-small.png',
    'Shield Reflector': 'Shield-Reflector-small.png',
    'Blood Eagle Punishment': 'Blood-Eagle-Punishment-small.png',
    'Fiery Detonation': 'Fiery-Detonation-small.png',
    'Bloodstained Icefield': 'Bloodstained-Icefield-small.png',
    'Berserk Killing Machine': 'Berserk-Killing-Machine-small.png',
    'Fireball': 'Fiery-Detonation-small.png',
    'Ice Shard': 'Bloodstained-Icefield-small.png',
    'Berserker Rage': 'Berserk-Killing-Machine-small.png',
    'Disarm': 'Disarmament-small.png',
    'Evasion': 'On-Alert-small.png',
    'Dispel': 'Blessed-Negation-small.png',
    'Broken Blade': 'Broken-Armor-small.png',
    'Immunity Control': 'Divine-Shield-small.png',
    'Devastation': 'Devastating-Charge-small.png',
    'Damage Reduction': 'Divine-Shield-small.png',
    'Retribution': 'Retaliate-small.png',
    'Lacerate': 'Splinter-small.png'
  };

  const imageFile = diamondImageMap[skillName] || 'none-small.png';
  return `/images/skills/small/${imageFile}`;
}

interface TeamMember {
  hero: Hero | null;
  slottableSkill1: Skill | null;
  slottableSkill2: Skill | null;
  mount: Mount | null;
}

interface FilterOptions {
  heroClass: HeroClass | 'All';
  season: string;
  searchTerm: string;
  skillType: SkillType | 'All';
  skillSearchTerm: string;
  mountElement: string;
  mountQuality: string;
}

export default function TeamBuilderPage() {
  const [teams, setTeams] = useState<TeamMember[][]>([
    [
      { hero: null, slottableSkill1: null, slottableSkill2: null, mount: null },
      { hero: null, slottableSkill1: null, slottableSkill2: null, mount: null }
    ]
  ]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const [filters, setFilters] = useState<FilterOptions>({
    heroClass: 'All',
    season: 'All',
    searchTerm: '',
    skillType: 'All',
    skillSearchTerm: '',
    mountElement: 'All',
    mountQuality: 'All'
  });

  const [activeTab, setActiveTab] = useState<'heroes' | 'skills' | 'mounts'>('heroes');
  const [selectedSlot, setSelectedSlot] = useState<{ memberIndex: number; slotNumber: 1 | 2 } | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [teamToShare, setTeamToShare] = useState<number | null>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  // Filter heroes
  const filteredHeroes = useMemo(() => {
    return heroes.filter(hero => {
      const matchesClass = filters.heroClass === 'All' || hero.heroClass === filters.heroClass;
      const matchesSeason = filters.season === 'All' || hero.season === filters.season;
      const matchesSearch = hero.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return matchesClass && matchesSeason && matchesSearch;
    });
  }, [filters]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesType = filters.skillType === 'All' || skill.type === filters.skillType;
      const matchesSearch = skill.name.toLowerCase().includes(filters.skillSearchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [filters]);

  const handleHeroSelect = (hero: Hero) => {
    const newTeams = [...teams];
    const currentTeam = [...newTeams[currentTeamIndex]];
    
    // Check if hero is already selected in this team
    const isHeroAlreadySelected = currentTeam.some(member => member.hero?.id === hero.id);
    if (isHeroAlreadySelected) {
      return; // Don't allow duplicate heroes in the same team
    }
    
    if (selectedSlot && selectedSlot.slotNumber === 1) {
      // Manual slot selection - fill the specific slot
      currentTeam[selectedSlot.memberIndex] = { ...currentTeam[selectedSlot.memberIndex], hero };
    } else {
      // Sequential fill logic: slot 0 first, then slot 1, then replace slot 1 if both full
      if (!currentTeam[0].hero) {
        // Slot 1 is empty, fill it
        currentTeam[0] = { ...currentTeam[0], hero };
      } else if (!currentTeam[1].hero) {
        // Slot 1 is full, slot 2 is empty, fill slot 2
        currentTeam[1] = { ...currentTeam[1], hero };
      } else {
        // Both slots full, replace slot 2 (last slot)
        currentTeam[1] = { ...currentTeam[1], hero };
      }
    }
    
    newTeams[currentTeamIndex] = currentTeam;
    setTeams(newTeams);
    
    // Clear selected slot after selection
    setSelectedSlot(null);
  };

  const handleHeroRemove = (memberIndex: number) => {
    const newTeams = [...teams];
    const currentTeam = [...newTeams[currentTeamIndex]];
    currentTeam[memberIndex] = { ...currentTeam[memberIndex], hero: null };
    newTeams[currentTeamIndex] = currentTeam;
    setTeams(newTeams);
  };

  const handleSkillSelect = (skill: Skill) => {
    if (selectedSlot) {
      // Manual slot selection - override auto-fill logic
      const newTeams = [...teams];
      const currentTeam = [...newTeams[currentTeamIndex]];
      if (selectedSlot.slotNumber === 1) {
        currentTeam[selectedSlot.memberIndex].slottableSkill1 = skill;
      } else {
        currentTeam[selectedSlot.memberIndex].slottableSkill2 = skill;
      }
      newTeams[currentTeamIndex] = currentTeam;
      setTeams(newTeams);
      setSelectedSlot(null);
    } else {
      // No slot selected, use sequential fill logic
      const newTeams = [...teams];
      const currentTeam = [...newTeams[currentTeamIndex]];
      
      // Sequential fill: Member 0 Slot 1 → Member 0 Slot 2 → Member 1 Slot 1 → Member 1 Slot 2
      if (!currentTeam[0].slottableSkill1) {
        currentTeam[0].slottableSkill1 = skill;
      } else if (!currentTeam[0].slottableSkill2) {
        currentTeam[0].slottableSkill2 = skill;
      } else if (!currentTeam[1].slottableSkill1) {
        currentTeam[1].slottableSkill1 = skill;
      } else if (!currentTeam[1].slottableSkill2) {
        currentTeam[1].slottableSkill2 = skill;
      } else {
        // All slots full, replace the last skill slot (Member 1 Slot 2)
        currentTeam[1].slottableSkill2 = skill;
      }
      
      newTeams[currentTeamIndex] = currentTeam;
      setTeams(newTeams);
    }
  };

  const handleSkillRemove = (memberIndex: number, slotNumber: 1 | 2) => {
    const newTeams = [...teams];
    const currentTeam = [...newTeams[currentTeamIndex]];
    if (slotNumber === 1) {
      currentTeam[memberIndex].slottableSkill1 = null;
    } else {
      currentTeam[memberIndex].slottableSkill2 = null;
    }
    newTeams[currentTeamIndex] = currentTeam;
    setTeams(newTeams);
  };

  const handleSlotClick = (memberIndex: number, slotNumber: 1 | 2, teamIndex: number) => {
    setCurrentTeamIndex(teamIndex);
    setSelectedSlot({ memberIndex, slotNumber });
    setActiveTab('skills');
  };

  const handleHeroSlotClick = (memberIndex: number, teamIndex: number) => {
    setCurrentTeamIndex(teamIndex);
    setSelectedSlot({ memberIndex, slotNumber: 1 }); // Use slotNumber 1 for hero selection
    setActiveTab('heroes');
  };

  const handleMountSlotClick = (memberIndex: number, teamIndex: number) => {
    setCurrentTeamIndex(teamIndex);
    setSelectedSlot({ memberIndex, slotNumber: 1 }); // Use slotNumber 1 for mount selection
    setActiveTab('mounts');
  };

  const createNewTeam = () => {
    const newTeam = [
      { hero: null, slottableSkill1: null, slottableSkill2: null, mount: null },
      { hero: null, slottableSkill1: null, slottableSkill2: null, mount: null }
    ];
    setTeams([...teams, newTeam]);
    setCurrentTeamIndex(teams.length);
  };

  const switchTeam = (teamIndex: number) => {
    setCurrentTeamIndex(teamIndex);
  };

  const isCurrentTeamComplete = () => {
    const currentTeam = teams[currentTeamIndex];
    return currentTeam.every(member => member.hero !== null);
  };

  const shareTeam = (teamIndex: number) => {
    setTeamToShare(teamIndex);
    setShowShareModal(true);
  };

  const handlePlatformShare = async (platform: 'discord' | 'telegram' | 'whatsapp' | 'clipboard') => {
    if (teamToShare === null || !teamRef.current) return;
    
    try {
      // Wait a bit to ensure all images are loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Double-check the ref is still available
      if (!teamRef.current) {
        throw new Error('Team element not found');
      }
      
      // Take screenshot of the team composition
      const canvas = await html2canvas(teamRef.current, {
        backgroundColor: '#1f2937', // gray-800 background
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for better image handling
        allowTaint: true,
        foreignObjectRendering: true,
        logging: false,
        width: teamRef.current.offsetWidth,
        height: teamRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: teamRef.current.offsetWidth,
        windowHeight: teamRef.current.offsetHeight
      });
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png', 0.9);
      });
      
      // Create file from blob
      const file = new File([blob], `viking-rise-team-${teamToShare + 1}.png`, { type: 'image/png' });
      
      // Use Web Share API for all platforms
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Viking Rise Team ${teamToShare + 1}`,
          text: 'Check out my team composition!',
          files: [file]
        });
      } else {
        // Fallback: download image for manual sharing
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `viking-rise-team-${teamToShare + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('Team screenshot downloaded! You can now share it manually.');
      }
    } catch (error) {
      console.error('Screenshot failed:', error);
      console.log('Team ref element:', teamRef.current);
      console.log('Team to share:', teamToShare);
      alert(`Screenshot failed: ${(error as Error).message}. Falling back to text sharing.`);
      
      // Fallback to text sharing
      const team = teams[teamToShare];
      const teamText = team.map((member, index) => {
        const heroName = member.hero?.name || 'Empty';
        const skill1 = member.slottableSkill1?.name || 'Empty';
        const skill2 = member.slottableSkill2?.name || 'Empty';
        const mount = member.mount ? 'Mount Selected' : 'No Mount';
        
        return `${index === 0 ? 'Main Commander' : 'Secondary Commander'}: ${heroName}\nSkills: ${skill1}, ${skill2}\nMount: ${mount}`;
      }).join('\n\n');

      const shareText = `🏰 Viking Rise Team Composition\n\n${teamText}\n\nBuilt with Viking Rise Heroes Database`;
      navigator.clipboard.writeText(shareText);
    }
    
    setShowShareModal(false);
    setTeamToShare(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
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
            Team Builder
          </h1>
          <p className="text-sm text-gray-400 font-light drop-shadow-md">
            Create and customize your perfect hero teams
          </p>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Team Composition */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Team Composition</h2>
                  {isCurrentTeamComplete() && (
                    <button
                      onClick={createNewTeam}
                      disabled={!isCurrentTeamComplete()}
                      className="w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      <span className="text-xl font-light">+</span>
                    </button>
                  )}
                </div>
              </div>

              {/* All Teams */}
              {teams.map((team, teamIndex) => (
                <div 
                  key={teamIndex} 
                  className={`mb-6 cursor-pointer transition-all duration-200 ${
                    teamIndex === currentTeamIndex 
                      ? 'bg-gray-700/50 rounded-lg p-3' 
                      : 'hover:bg-gray-700/30 rounded-lg p-3'
                  }`}
                  onClick={() => setCurrentTeamIndex(teamIndex)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-lg font-semibold ${
                      teamIndex === currentTeamIndex ? 'text-white' : 'text-gray-300'
                    }`}>
                      Team {teamIndex + 1}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        shareTeam(teamIndex);
                      }}
                      className="p-2 transition-colors group"
                    >
                      <Image
                        src="/images/gui/share.png"
                        alt="Share"
                        width={32}
                        height={32}
                        className="object-contain group-hover:hidden"
                      />
                      <Image
                        src="/images/gui/share-active.png"
                        alt="Share Active"
                        width={32}
                        height={32}
                        className="object-contain hidden group-hover:block"
                      />
                    </button>
                  </div>
                  
                  <div 
                    ref={teamToShare === teamIndex ? teamRef : null}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {/* Team Title for Screenshot */}
                    <div className="md:col-span-2 text-center mb-2">
                      <h4 className="text-lg font-bold text-white">Team {teamIndex + 1}</h4>
                    </div>
                    {team.map((member, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-3">
                        {/* Compact Hero + Skills Layout */}
                        <div className="flex items-center space-x-3">
                          {/* Hero Section */}
                          <div className="flex-shrink-0">
                            <div className="text-center mb-2">
                              <span className="text-xs text-gray-400">{index === 0 ? 'Main' : 'Secondary'}</span>
                            </div>
                            
                            {member.hero ? (
                              <div className="relative w-24 h-24 group">
                                <button
                                  onClick={() => handleHeroSlotClick(index, teamIndex)}
                                  className="w-full h-full hover:opacity-80 transition-opacity"
                                >
                                  <Image
                                    src={member.hero.portrait}
                                    alt={member.hero.name}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="64px"
                                  />
                                </button>
                                {/* Hover remove button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleHeroRemove(index);
                                  }}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-105 z-20 shadow-md border border-red-400"
                                >
                                  <span className="text-xs font-medium leading-none">×</span>
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleHeroSlotClick(index, teamIndex)}
                                className="relative w-24 h-24 hover:opacity-80 transition-opacity"
                              >
                                <Image
                                  src="/images/heroes/addhero.png"
                                  alt="Add Hero"
                                  fill
                                  className="object-contain rounded-lg"
                                  sizes="80px"
                                />
                              </button>
                            )}
                            
                            {/* Hero Name */}
                            <div className="text-center mt-1">
                              {member.hero ? (
                                <>
                                  <p className="text-white font-medium text-sm">{member.hero.name}</p>
                                  <p className="text-gray-400 text-xs">{member.hero.heroClass}</p>
                                </>
                              ) : (
                                <p className="text-gray-400 text-xs">Select Hero</p>
                              )}
                            </div>
                          </div>

                          {/* Skills Section - Horizontal Layout */}
                          <div className="flex-1">
                            <div className="text-center mb-2">
                              <span className="text-xs text-gray-400">Skills</span>
                            </div>
                            <div className="flex space-x-2 justify-center">
                              {/* Skill 1 */}
                              <div className="flex-shrink-0">
                                <div className="relative w-16 h-16">
                                  {member.slottableSkill1 ? (
                                    <div className="relative w-full h-full group">
                                      <Image
                                        src={getDiamondSkillIcon(member.slottableSkill1.name)}
                                        alt={member.slottableSkill1.name}
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="64px"
                                      />
                                      {/* Hover remove button */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSkillRemove(index, 1);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white w-3 h-3 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-105 z-20 shadow-md border border-red-400"
                                      >
                                        <span className="text-xs font-medium leading-none">×</span>
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => handleSlotClick(index, 1, teamIndex)}
                                      className="w-full h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                                    >
                                      <Image
                                        src="/images/skills/small/add.png"
                                        alt="Add Skill"
width={64}
height={64}
                                        className="object-contain"
                                      />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Skill 2 */}
                              <div className="flex-shrink-0">
                                <div className="relative w-16 h-16">
                                  {member.slottableSkill2 ? (
                                    <div className="relative w-full h-full group">
                                      <Image
                                        src={getDiamondSkillIcon(member.slottableSkill2.name)}
                                        alt={member.slottableSkill2.name}
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="64px"
                                      />
                                      {/* Hover remove button */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSkillRemove(index, 2);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white w-3 h-3 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-105 z-20 shadow-md border border-red-400"
                                      >
                                        <span className="text-xs font-medium leading-none">×</span>
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => handleSlotClick(index, 2, teamIndex)}
                                      className="w-full h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                                    >
                                      <Image
                                        src="/images/skills/small/add.png"
                                        alt="Add Skill"
width={64}
height={64}
                                        className="object-contain"
                                      />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Mount Section - Compact */}
                          <div className="flex-shrink-0">
                            <div className="text-center mb-2">
                              <span className="text-xs text-gray-400">Mount</span>
                            </div>
                            <button
                              onClick={() => handleMountSlotClick(index, teamIndex)}
                              className="w-16 h-16 flex items-center justify-center hover:opacity-80 transition-opacity"
                            >
                              {member.mount ? (
                                <span className="text-xs font-medium">M</span>
                              ) : (
                                <Image
                                  src="/images/skills/small/add.png"
                                  alt="Add Mount"
width={64}
height={64}
                                  className="object-contain"
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="mb-6">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('heroes')}
                  className={`p-2 transition-colors ${
                    activeTab === 'heroes'
                      ? 'opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src="/images/gui/guiknothero.png"
                    alt="Heroes"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`p-2 transition-colors ${
                    activeTab === 'skills'
                      ? 'opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src="/images/gui/guiknotskill.png"
                    alt="Skills"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </button>
                <button
                  onClick={() => setActiveTab('mounts')}
                  className={`p-2 transition-colors ${
                    activeTab === 'mounts'
                      ? 'opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src="/images/gui/guiknotmount.png"
                    alt="Mounts"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Filters */}
            {activeTab === 'heroes' && (
              <div className="mb-6">
                {/* Class and Season in one row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Class</label>
                    <select
                      value={filters.heroClass}
                      onChange={(e) => setFilters({ ...filters, heroClass: e.target.value as HeroClass | 'All' })}
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                    >
                      <option value="All">All Classes</option>
                      <option value="Infantry">Infantry</option>
                      <option value="Pikeman">Pikeman</option>
                      <option value="Archer">Archer</option>
                      <option value="Porter">Porter</option>
                      <option value="Polymath">Polymath</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Season</label>
                    <select
                      value={filters.season}
                      onChange={(e) => setFilters({ ...filters, season: e.target.value })}
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                    >
                      <option value="All">All Seasons</option>
                      <option value="Season 1">S1</option>
                      <option value="Season 2">S2</option>
                      <option value="Season 3">S3</option>
                      <option value="Valhalla Collaboration">Valhalla</option>
                    </select>
                  </div>
                </div>

                {/* Search in separate row */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                  <input
                    type="text"
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                    placeholder="Search heroes..."
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={filters.skillType}
                    onChange={(e) => setFilters({ ...filters, skillType: e.target.value as SkillType | 'All' })}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                  >
                    <option value="All">All Types</option>
                    <option value="Active">Active</option>
                    <option value="Passive">Passive</option>
                    <option value="Command">Command</option>
                    <option value="Cooperation">Cooperation</option>
                    <option value="Counterattack">Counterattack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                  <input
                    type="text"
                    value={filters.skillSearchTerm}
                    onChange={(e) => setFilters({ ...filters, skillSearchTerm: e.target.value })}
                    placeholder="Search skills..."
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            )}

            {/* Selection Grid */}
            <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
              {activeTab === 'heroes' && (
                <div className="grid grid-cols-1 gap-3">
                  {filteredHeroes.map((hero) => {
                        const isSelectedInCurrentTeam = teams[currentTeamIndex].some(member => member.hero?.id === hero.id);
                        
                        return (
                          <button
                            key={hero.id}
                            onClick={() => {
                              if (isSelectedInCurrentTeam) {
                                // If hero is already selected, remove it
                                const memberIndex = teams[currentTeamIndex].findIndex(member => member.hero?.id === hero.id);
                                if (memberIndex !== -1) {
                                  handleHeroRemove(memberIndex);
                                }
                              } else {
                                // If hero is not selected, add it (will replace last slot if full)
                                handleHeroSelect(hero);
                              }
                            }}
                            className={`rounded-lg p-4 transition-colors text-left ${
                              isSelectedInCurrentTeam
                                ? 'bg-green-700 text-green-300 hover:bg-red-700 hover:text-red-300'
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={hero.portrait}
                              alt={hero.name}
                              fill
                              className="object-contain rounded-lg"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-base text-white font-semibold">{hero.name}</p>
                            <p className="text-sm text-gray-400">{hero.heroClass}</p>
                            {isSelectedInCurrentTeam && (
                              <p className="text-sm text-green-300 font-bold">✓ Selected</p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 gap-3">
                  {filteredSkills.map((skill) => {
                    // Check if this skill is currently selected in any slot
                    const isSelectedInCurrentTeam = teams[currentTeamIndex].some(member => 
                      member.slottableSkill1?.id === skill.id || member.slottableSkill2?.id === skill.id
                    );
                    
                        return (
                          <button
                            key={skill.id}
                            onClick={() => {
                              if (isSelectedInCurrentTeam) {
                                // If skill is already selected, remove it
                                const currentTeam = teams[currentTeamIndex];
                                for (let memberIndex = 0; memberIndex < currentTeam.length; memberIndex++) {
                                  const member = currentTeam[memberIndex];
                                  if (member.slottableSkill1?.id === skill.id) {
                                    handleSkillRemove(memberIndex, 1);
                                    return;
                                  } else if (member.slottableSkill2?.id === skill.id) {
                                    handleSkillRemove(memberIndex, 2);
                                    return;
                                  }
                                }
                              } else {
                                // If skill is not selected, add it (will replace last slot if full)
                                handleSkillSelect(skill);
                              }
                            }}
                            className={`rounded-lg p-4 transition-colors ${
                              isSelectedInCurrentTeam
                                ? 'bg-green-700 text-green-300 hover:bg-red-700 hover:text-red-300'
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                      >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain rounded-lg"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-white font-semibold">{skill.name}</p>
                          <p className="text-sm text-gray-400">{skill.type}</p>
                          <p className="text-xs text-gray-500">{skill.probability}%</p>
                          {isSelectedInCurrentTeam && (
                            <p className="text-xs text-green-300 font-bold">✓ Selected</p>
                          )}
                        </div>
                      </div>
                    </button>
                    );
                  })}
                </div>
              )}

              {activeTab === 'mounts' && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Mount selection coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Share Team {teamToShare !== null ? teamToShare + 1 : ''}</h3>
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setTeamToShare(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">Choose a platform to share your team composition:</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handlePlatformShare('discord')}
                className="flex flex-col items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
              >
                <Image
                  src="/images/gui/discord.png"
                  alt="Discord"
                  width={48}
                  height={48}
                  className="object-contain mb-2"
                />
                <span className="text-white font-medium">Discord</span>
                <span className="text-xs text-gray-400">Copy to clipboard</span>
              </button>
              
              <button
                onClick={() => handlePlatformShare('telegram')}
                className="flex flex-col items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl font-bold">T</span>
                </div>
                <span className="text-white font-medium">Telegram</span>
                <span className="text-xs text-gray-400">Open in app</span>
              </button>
              
              <button
                onClick={() => handlePlatformShare('whatsapp')}
                className="flex flex-col items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl font-bold">W</span>
                </div>
                <span className="text-white font-medium">WhatsApp</span>
                <span className="text-xs text-gray-400">Open in app</span>
              </button>
              
              <button
                onClick={() => handlePlatformShare('clipboard')}
                className="flex flex-col items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Clipboard</span>
                <span className="text-xs text-gray-400">Copy text</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
