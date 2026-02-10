// Utility to get hero skills from the legacy data
import { HeroesSkillsAndTalents } from '@/data/heroesskillsandtalents';

export interface HeroSkillData {
  skillOne: {
    name: string;
    type: string;
    probability: number;
    description: string;
  } | null;
  skillTwo: {
    name: string;
    type: string;
    probability: number;
    description: string;
  } | null;
  awakenedSkill: {
    name: string;
    type: string;
    probability: number;
    description: string;
  } | null;
  talents: {
    name: string;
    type: string;
    description: string;
  }[];
}

export function getHeroSkills(heroName: string): HeroSkillData | null {
  const heroData = HeroesSkillsAndTalents.find(
    (h: any) => h.name.toLowerCase() === heroName.toLowerCase()
  );
  
  if (!heroData) return null;
  
  return {
    skillOne: heroData.skillonename ? {
      name: heroData.skillonename,
      type: heroData.skillonetype,
      probability: heroData.skilloneprob,
      description: heroData.skillonedescr,
    } : null,
    skillTwo: heroData.skilltwoname ? {
      name: heroData.skilltwoname,
      type: heroData.skilltwotype,
      probability: typeof heroData.skilltwoprob === 'string' ? parseInt(heroData.skilltwoprob) : heroData.skilltwoprob,
      description: heroData.skilltwodescr,
    } : null,
    awakenedSkill: heroData.skillawakename ? {
      name: heroData.skillawakename,
      type: heroData.skillawaketype,
      probability: heroData.skillawakeprob,
      description: heroData.skillawakedescr,
    } : null,
    talents: [
      heroData.talentonename ? {
        name: heroData.talentonename,
        type: heroData.talentonetype,
        description: heroData.talentonedescr,
      } : null,
      heroData.talenttwoname ? {
        name: heroData.talenttwoname,
        type: heroData.talentwotype,
        description: heroData.talenttwodescr,
      } : null,
      heroData.talentthreename ? {
        name: heroData.talentthreename,
        type: heroData.talentthreetype,
        description: heroData.talentthreedescr,
      } : null,
    ].filter(Boolean) as { name: string; type: string; description: string }[],
  };
}

export function getHeroSkillsById(heroId: number): HeroSkillData | null {
  const heroData = HeroesSkillsAndTalents.find((h: any) => h.id === heroId);
  
  if (!heroData) return null;
  
  return {
    skillOne: heroData.skillonename ? {
      name: heroData.skillonename,
      type: heroData.skillonetype,
      probability: heroData.skilloneprob,
      description: heroData.skillonedescr,
    } : null,
    skillTwo: heroData.skilltwoname ? {
      name: heroData.skilltwoname,
      type: heroData.skilltwotype,
      probability: typeof heroData.skilltwoprob === 'string' ? parseInt(heroData.skilltwoprob) : heroData.skilltwoprob,
      description: heroData.skilltwodescr,
    } : null,
    awakenedSkill: heroData.skillawakename ? {
      name: heroData.skillawakename,
      type: heroData.skillawaketype,
      probability: heroData.skillawakeprob,
      description: heroData.skillawakedescr,
    } : null,
    talents: [
      heroData.talentonename ? {
        name: heroData.talentonename,
        type: heroData.talentonetype,
        description: heroData.talentonedescr,
      } : null,
      heroData.talenttwoname ? {
        name: heroData.talenttwoname,
        type: heroData.talentwotype,
        description: heroData.talenttwodescr,
      } : null,
      heroData.talentthreename ? {
        name: heroData.talentthreename,
        type: heroData.talentthreetype,
        description: heroData.talentthreedescr,
      } : null,
    ].filter(Boolean) as { name: string; type: string; description: string }[],
  };
}

// Get skill type color
export function getSkillTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    'Active': 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    'Passive': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    'Cooperation': 'text-green-400 bg-green-500/20 border-green-500/30',
    'Counterattack': 'text-red-400 bg-red-500/20 border-red-500/30',
    'Command': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  };
  return typeColors[type] || 'text-slate-400 bg-slate-500/20 border-slate-500/30';
}
