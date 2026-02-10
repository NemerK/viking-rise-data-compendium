import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export interface DbHero {
  id: number;
  name: string;
  portrait: string;
  herotype: string | null;
  heroclass: string | null;
  rarity: string | null;
  season: string | null;
  // Combat ability flags
  burn: boolean;
  bleed: boolean;
  poison: boolean;
  retribution: boolean;
  slow: boolean;
  counterattack: boolean;
  basicattack: boolean;
  shield: boolean;
  heal: boolean;
  rage: boolean;
  silence: boolean;
  disarm: boolean;
  brokenblade: boolean;
  evasion: boolean;
  dispel: boolean;
  buff: boolean;
  debuff: boolean;
  directdamage: boolean;
  immunitycontrol: boolean;
  purify: boolean;
  devastation: boolean;
  damagereduction: boolean;
  lacerate: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbHeroSkill {
  id: number;
  hero_id: number;
  slot: 'skill1' | 'skill2' | 'awakened';
  name: string;
  type: string;
  probability: number;
  description: string;
  icon: string | null;
  created_at?: string;
}

export interface DbHeroTalent {
  id: number;
  hero_id: number;
  slot: 'talent1' | 'talent2' | 'talent3';
  name: string;
  type: string;
  description: string;
  icon: string | null;
  created_at?: string;
}

export interface DbSkill {
  id: number;
  name: string;
  type: string;
  probability: number;
  description: string;
  icon: string | null;
  icon_regular: string | null;
  icon_diamond: string | null;
  is_unique: boolean;
  // Effect flags
  burn: boolean;
  bleed: boolean;
  poison: boolean;
  retribution: boolean;
  slow: boolean;
  counterattack: boolean;
  basicattack: boolean;
  shield: boolean;
  heal: boolean;
  rage: boolean;
  silence: boolean;
  disarm: boolean;
  brokenblade: boolean;
  evasion: boolean;
  dispel: boolean;
  buff: boolean;
  debuff: boolean;
  directdamage: boolean;
  immunitycontrol: boolean;
  purify: boolean;
  devastation: boolean;
  damagereduction: boolean;
  lacerate: boolean;
  created_at?: string;
  updated_at?: string;
}

// Fetch functions
export async function fetchHeroes(): Promise<DbHero[]> {
  const { data, error } = await supabase
    .from('heroes')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error fetching heroes:', error);
    return [];
  }
  return data || [];
}

export async function fetchHeroSkills(heroId?: number): Promise<DbHeroSkill[]> {
  let query = supabase.from('hero_skills').select('*');
  
  if (heroId) {
    query = query.eq('hero_id', heroId);
  }
  
  const { data, error } = await query.order('hero_id').order('slot');
  
  if (error) {
    console.error('Error fetching hero skills:', error);
    return [];
  }
  return data || [];
}

export async function fetchHeroTalents(heroId?: number): Promise<DbHeroTalent[]> {
  let query = supabase.from('hero_talents').select('*');
  
  if (heroId) {
    query = query.eq('hero_id', heroId);
  }
  
  const { data, error } = await query.order('hero_id').order('slot');
  
  if (error) {
    console.error('Error fetching hero talents:', error);
    return [];
  }
  return data || [];
}

export async function fetchSkills(): Promise<DbSkill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data || [];
}

// Insert/Update functions for admin
export async function upsertHero(hero: Partial<DbHero>): Promise<DbHero | null> {
  const { data, error } = await supabase
    .from('heroes')
    .upsert(hero)
    .select()
    .single();
  
  if (error) {
    console.error('Error upserting hero:', error);
    return null;
  }
  return data;
}

export async function upsertSkill(skill: Partial<DbSkill>): Promise<DbSkill | null> {
  const { data, error } = await supabase
    .from('skills')
    .upsert(skill)
    .select()
    .single();
  
  if (error) {
    console.error('Error upserting skill:', error);
    return null;
  }
  return data;
}

export async function deleteHero(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('heroes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting hero:', error);
    return false;
  }
  return true;
}

export async function deleteSkill(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting skill:', error);
    return false;
  }
  return true;
}
