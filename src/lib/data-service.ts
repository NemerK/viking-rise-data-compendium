/**
 * Data Service - Fetches data from Supabase and transforms to app format
 */

import { getSupabase, DbHero, DbHeroSkill, DbHeroTalent, DbSkill } from './supabase';
import { Hero, Skill } from '@/types';

// Transform database hero to app Hero format
function transformHero(dbHero: DbHero): Hero {
  return {
    id: dbHero.id,
    name: dbHero.name,
    portrait: dbHero.portrait,
    herotype: dbHero.herotype || undefined,
    heroclass: dbHero.heroclass || undefined,
    rarity: dbHero.rarity || undefined,
    season: dbHero.season || undefined,
    burn: dbHero.burn,
    bleed: dbHero.bleed,
    poison: dbHero.poison,
    retribution: dbHero.retribution,
    slow: dbHero.slow,
    counterattack: dbHero.counterattack,
    basicattack: dbHero.basicattack,
    shield: dbHero.shield,
    heal: dbHero.heal,
    rage: dbHero.rage,
    silence: dbHero.silence,
    disarm: dbHero.disarm,
    brokenblade: dbHero.brokenblade,
    evasion: dbHero.evasion,
    dispel: dbHero.dispel,
    buff: dbHero.buff,
    debuff: dbHero.debuff,
    directdamage: dbHero.directdamage,
    immunitycontrol: dbHero.immunitycontrol,
    purify: dbHero.purify,
    devastation: dbHero.devastation,
    damagereduction: dbHero.damagereduction,
    lacerate: dbHero.lacerate,
  };
}

// Transform database skill to app Skill format
function transformSkill(dbSkill: DbSkill): Skill {
  return {
    id: dbSkill.id,
    name: dbSkill.name,
    type: dbSkill.type,
    probability: dbSkill.probability,
    description: dbSkill.description,
    icon: dbSkill.icon || undefined,
    iconRegular: dbSkill.icon_regular || undefined,
    iconDiamond: dbSkill.icon_diamond || undefined,
    isUnique: dbSkill.is_unique,
    effects: {
      burn: dbSkill.burn,
      bleed: dbSkill.bleed,
      poison: dbSkill.poison,
      retribution: dbSkill.retribution,
      slow: dbSkill.slow,
      counterattack: dbSkill.counterattack,
      basicattack: dbSkill.basicattack,
      shield: dbSkill.shield,
      heal: dbSkill.heal,
      rage: dbSkill.rage,
      silence: dbSkill.silence,
      disarm: dbSkill.disarm,
      brokenblade: dbSkill.brokenblade,
      evasion: dbSkill.evasion,
      dispel: dbSkill.dispel,
      buff: dbSkill.buff,
      debuff: dbSkill.debuff,
      directdamage: dbSkill.directdamage,
      immunitycontrol: dbSkill.immunitycontrol,
      purify: dbSkill.purify,
      devastation: dbSkill.devastation,
      damagereduction: dbSkill.damagereduction,
      lacerate: dbSkill.lacerate,
    },
  };
}

// Hero skill data structure (matches existing getHeroSkills format)
export interface HeroSkillData {
  skillOne: { name: string; type: string; probability: number; description: string; icon?: string | null } | null;
  skillTwo: { name: string; type: string; probability: number; description: string; icon?: string | null } | null;
  awakenedSkill: { name: string; type: string; probability: number; description: string; icon?: string | null } | null;
  talents: { name: string; type: string; description: string; icon?: string | null }[];
}

// Cache for hero skills/talents (populated on first fetch)
let heroSkillsCache: Map<number, HeroSkillData> = new Map();
let cacheLoaded = false;
let cacheLoadingPromise: Promise<void> | null = null;

// Fetch all heroes
export async function getHeroes(): Promise<Hero[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('heroes')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching heroes:', error);
      return [];
    }

    return (data || []).map(transformHero);
  } catch (err) {
    console.error('Failed to initialize Supabase or fetch heroes:', err);
    return [];
  }
}

// Fetch all skills
export async function getSkills(): Promise<Skill[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    return (data || []).map(transformSkill);
  } catch (err) {
    console.error('Failed to initialize Supabase or fetch skills:', err);
    return [];
  }
}

// Load hero skills and talents cache
async function loadHeroSkillsCache(): Promise<void> {
  // Already loaded
  if (cacheLoaded) return;
  
  // Already loading - wait for existing promise
  if (cacheLoadingPromise) {
    return cacheLoadingPromise;
  }

  // Start loading
  cacheLoadingPromise = (async () => {
    try {
      const supabase = getSupabase();
      const [skillsResult, talentsResult] = await Promise.all([
        supabase.from('hero_skills').select('*').order('hero_id'),
        supabase.from('hero_talents').select('*').order('hero_id'),
      ]);
      
      if (skillsResult.error) console.error('Error fetching hero_skills:', skillsResult.error);
      if (talentsResult.error) console.error('Error fetching hero_talents:', talentsResult.error);

      const skills = skillsResult.data || [];
      const talents = talentsResult.data || [];

      // Group by hero_id
      const skillsByHero = new Map<number, DbHeroSkill[]>();
      const talentsByHero = new Map<number, DbHeroTalent[]>();

      skills.forEach((s: DbHeroSkill) => {
        if (!skillsByHero.has(s.hero_id)) skillsByHero.set(s.hero_id, []);
        skillsByHero.get(s.hero_id)!.push(s);
      });

      talents.forEach((t: DbHeroTalent) => {
        if (!talentsByHero.has(t.hero_id)) talentsByHero.set(t.hero_id, []);
        talentsByHero.get(t.hero_id)!.push(t);
      });

      // Build cache
      const allHeroIds = new Set([...skillsByHero.keys(), ...talentsByHero.keys()]);
      
      allHeroIds.forEach((heroId) => {
        const heroSkills = skillsByHero.get(heroId) || [];
        const heroTalents = talentsByHero.get(heroId) || [];

        const skill1 = heroSkills.find(s => s.slot === 'skill1');
        const skill2 = heroSkills.find(s => s.slot === 'skill2');
        const awakened = heroSkills.find(s => s.slot === 'awakened');

        heroSkillsCache.set(heroId, {
          skillOne: skill1 ? {
            name: skill1.name,
            type: skill1.type,
            probability: skill1.probability,
            description: skill1.description,
            icon: skill1.icon,
          } : null,
          skillTwo: skill2 ? {
            name: skill2.name,
            type: skill2.type,
            probability: skill2.probability,
            description: skill2.description,
            icon: skill2.icon,
          } : null,
          awakenedSkill: awakened ? {
            name: awakened.name,
            type: awakened.type,
            probability: awakened.probability,
            description: awakened.description,
            icon: awakened.icon,
          } : null,
          talents: heroTalents.map(t => ({
            name: t.name,
            type: t.type,
            description: t.description,
            icon: t.icon,
          })),
        });
      });

      cacheLoaded = true;
    } finally {
      cacheLoadingPromise = null;
    }
  })();

  return cacheLoadingPromise;
}

// Get all hero skills at once (more efficient than calling getHeroSkillsById for each)
export async function getAllHeroSkills(): Promise<Map<number, HeroSkillData>> {
  await loadHeroSkillsCache();
  return new Map(heroSkillsCache);
}

// Get hero skills by ID (matches existing utility function signature)
export async function getHeroSkillsById(heroId: number): Promise<HeroSkillData | null> {
  await loadHeroSkillsCache();
  return heroSkillsCache.get(heroId) || null;
}

// Get hero skills by name
export async function getHeroSkillsByName(heroName: string, heroes: Hero[]): Promise<HeroSkillData | null> {
  const hero = heroes.find(h => h.name.toLowerCase() === heroName.toLowerCase());
  if (!hero) return null;
  return getHeroSkillsById(hero.id);
}

// Invalidate cache (call after updates)
export function invalidateCache(): void {
  heroSkillsCache.clear();
  cacheLoaded = false;
}

// Get skill type color (utility function)
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
