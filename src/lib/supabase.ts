import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized Supabase client (avoids build-time errors)
let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables!');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Set' : '✗ Missing');
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.');
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

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
