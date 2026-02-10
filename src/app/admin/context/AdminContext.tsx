'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Hero, Skill, Talent, Mount, AdminState } from '@/types';
import { supabase } from '@/lib/supabase';

// Hero skill from database
export interface DbHeroSkill {
  id?: number;
  hero_id: number;
  slot: 'skill1' | 'skill2' | 'awakened';
  name: string;
  type: string;
  probability: number;
  description: string;
  icon: string | null;
}

// Hero talent from database
export interface DbHeroTalent {
  id?: number;
  hero_id: number;
  slot: 'talent1' | 'talent2' | 'talent3';
  name: string;
  type: string;
  description: string;
  icon: string | null;
}

interface AdminContextType {
  // State
  state: AdminState;
  heroSkills: Map<number, DbHeroSkill[]>;
  heroTalents: Map<number, DbHeroTalent[]>;
  loading: boolean;
  saving: boolean;
  error: string | null;
  
  // Data refresh
  refreshData: () => Promise<void>;
  
  // Heroes - now async with Supabase
  addHero: (hero: Omit<Hero, 'id'>) => Promise<Hero | null>;
  updateHero: (id: number, hero: Partial<Hero>) => Promise<boolean>;
  deleteHero: (id: number) => Promise<boolean>;
  getHero: (id: number) => Hero | undefined;
  
  // Hero Skills (static, per-hero)
  getHeroSkills: (heroId: number) => DbHeroSkill[];
  updateHeroSkill: (heroId: number, slot: 'skill1' | 'skill2' | 'awakened', skill: Partial<DbHeroSkill>) => Promise<boolean>;
  
  // Hero Talents (static, per-hero)
  getHeroTalents: (heroId: number) => DbHeroTalent[];
  updateHeroTalent: (heroId: number, slot: 'talent1' | 'talent2' | 'talent3', talent: Partial<DbHeroTalent>) => Promise<boolean>;
  
  // Slottable Skills - now async with Supabase
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<Skill | null>;
  updateSkill: (id: number, skill: Partial<Skill>) => Promise<boolean>;
  deleteSkill: (id: number) => Promise<boolean>;
  getSkill: (id: number) => Skill | undefined;
  
  // Mounts (keeping local for now, can migrate later)
  addMount: (mount: Mount) => void;
  updateMount: (id: string, mount: Partial<Mount>) => void;
  deleteMount: (id: string) => void;
  getMount: (id: string) => Mount | undefined;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>({
    heroes: [],
    skills: [],
    talents: [],
    mounts: [],
    hasUnsavedChanges: false,
  });

  const [heroSkills, setHeroSkills] = useState<Map<number, DbHeroSkill[]>>(new Map());
  const [heroTalents, setHeroTalents] = useState<Map<number, DbHeroTalent[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data from Supabase
  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch heroes
      const { data: heroesData, error: heroesError } = await supabase
        .from('heroes')
        .select('*')
        .order('id');
      
      if (heroesError) throw heroesError;

      // Fetch slottable skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('id');
      
      if (skillsError) throw skillsError;

      // Fetch hero skills
      const { data: heroSkillsData, error: heroSkillsError } = await supabase
        .from('hero_skills')
        .select('*')
        .order('hero_id');
      
      if (heroSkillsError) throw heroSkillsError;

      // Fetch hero talents
      const { data: heroTalentsData, error: heroTalentsError } = await supabase
        .from('hero_talents')
        .select('*')
        .order('hero_id');
      
      if (heroTalentsError) throw heroTalentsError;

      // Transform heroes data
      const transformedHeroes: Hero[] = (heroesData || []).map((h: any) => ({
        id: h.id,
        name: h.name,
        portrait: h.portrait,
        herotype: h.herotype,
        heroclass: h.heroclass,
        rarity: h.rarity,
        season: h.season,
        burn: h.burn,
        bleed: h.bleed,
        poison: h.poison,
        retribution: h.retribution,
        slow: h.slow,
        counterattack: h.counterattack,
        basicattack: h.basicattack,
        shield: h.shield,
        heal: h.heal,
        rage: h.rage,
        silence: h.silence,
        disarm: h.disarm,
        brokenblade: h.brokenblade,
        evasion: h.evasion,
        dispel: h.dispel,
        buff: h.buff,
        debuff: h.debuff,
        directdamage: h.directdamage,
        immunitycontrol: h.immunitycontrol,
        purify: h.purify,
        devastation: h.devastation,
        damagereduction: h.damagereduction,
        lacerate: h.lacerate,
      }));

      // Transform skills data
      const transformedSkills: Skill[] = (skillsData || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        type: s.type,
        probability: s.probability,
        description: s.description,
        icon: s.icon,
        iconRegular: s.icon_regular,
        iconDiamond: s.icon_diamond,
        isUnique: s.is_unique,
        effects: {
          burn: s.burn,
          bleed: s.bleed,
          poison: s.poison,
          retribution: s.retribution,
          slow: s.slow,
          counterattack: s.counterattack,
          basicattack: s.basicattack,
          shield: s.shield,
          heal: s.heal,
          rage: s.rage,
          silence: s.silence,
          disarm: s.disarm,
          brokenblade: s.brokenblade,
          evasion: s.evasion,
          dispel: s.dispel,
          buff: s.buff,
          debuff: s.debuff,
          directdamage: s.directdamage,
          immunitycontrol: s.immunitycontrol,
          purify: s.purify,
          devastation: s.devastation,
          damagereduction: s.damagereduction,
          lacerate: s.lacerate,
        },
      }));

      // Group hero skills by hero_id
      const skillsMap = new Map<number, DbHeroSkill[]>();
      (heroSkillsData || []).forEach((s: DbHeroSkill) => {
        if (!skillsMap.has(s.hero_id)) skillsMap.set(s.hero_id, []);
        skillsMap.get(s.hero_id)!.push(s);
      });

      // Group hero talents by hero_id
      const talentsMap = new Map<number, DbHeroTalent[]>();
      (heroTalentsData || []).forEach((t: DbHeroTalent) => {
        if (!talentsMap.has(t.hero_id)) talentsMap.set(t.hero_id, []);
        talentsMap.get(t.hero_id)!.push(t);
      });

      setState(prev => ({
        ...prev,
        heroes: transformedHeroes,
        skills: transformedSkills,
      }));
      setHeroSkills(skillsMap);
      setHeroTalents(talentsMap);
      
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError(err.message || 'Failed to load data');
    }
    
    setLoading(false);
  }, []);

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // === HEROES ===
  const addHero = async (hero: Omit<Hero, 'id'>): Promise<Hero | null> => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('heroes')
        .insert({
          name: hero.name,
          portrait: hero.portrait,
          herotype: hero.herotype,
          heroclass: hero.heroclass,
          rarity: hero.rarity,
          season: hero.season,
          burn: hero.burn || false,
          bleed: hero.bleed || false,
          poison: hero.poison || false,
          retribution: hero.retribution || false,
          slow: hero.slow || false,
          counterattack: hero.counterattack || false,
          basicattack: hero.basicattack || false,
          shield: hero.shield || false,
          heal: hero.heal || false,
          rage: hero.rage || false,
          silence: hero.silence || false,
          disarm: hero.disarm || false,
          brokenblade: hero.brokenblade || false,
          evasion: hero.evasion || false,
          dispel: hero.dispel || false,
          buff: hero.buff || false,
          debuff: hero.debuff || false,
          directdamage: hero.directdamage || false,
          immunitycontrol: hero.immunitycontrol || false,
          purify: hero.purify || false,
          devastation: hero.devastation || false,
          damagereduction: hero.damagereduction || false,
          lacerate: hero.lacerate || false,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newHero = { ...hero, id: data.id } as Hero;
      setState(prev => ({ ...prev, heroes: [...prev.heroes, newHero] }));
      return newHero;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setSaving(false);
    }
  };

  const updateHero = async (id: number, updates: Partial<Hero>): Promise<boolean> => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('heroes')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        heroes: prev.heroes.map(h => h.id === id ? { ...h, ...updates } : h),
      }));
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteHero = async (id: number): Promise<boolean> => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('heroes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        heroes: prev.heroes.filter(h => h.id !== id),
      }));
      // Also remove from hero skills/talents maps
      setHeroSkills(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      setHeroTalents(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const getHero = (id: number) => state.heroes.find(h => h.id === id);

  // === HERO SKILLS (static, per-hero) ===
  const getHeroSkills = (heroId: number): DbHeroSkill[] => {
    return heroSkills.get(heroId) || [];
  };

  const updateHeroSkill = async (
    heroId: number, 
    slot: 'skill1' | 'skill2' | 'awakened', 
    skill: Partial<DbHeroSkill>
  ): Promise<boolean> => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('hero_skills')
        .upsert({
          hero_id: heroId,
          slot,
          name: skill.name,
          type: skill.type,
          probability: skill.probability || 100,
          description: skill.description,
          icon: skill.icon,
        }, { onConflict: 'hero_id,slot' });
      
      if (error) throw error;
      
      // Update local state
      setHeroSkills(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(heroId) || [];
        const skillIndex = existing.findIndex(s => s.slot === slot);
        const updatedSkill: DbHeroSkill = {
          hero_id: heroId,
          slot,
          name: skill.name || '',
          type: skill.type || '',
          probability: skill.probability || 100,
          description: skill.description || '',
          icon: skill.icon || null,
        };
        
        if (skillIndex >= 0) {
          existing[skillIndex] = updatedSkill;
        } else {
          existing.push(updatedSkill);
        }
        newMap.set(heroId, existing);
        return newMap;
      });
      
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // === HERO TALENTS (static, per-hero) ===
  const getHeroTalents = (heroId: number): DbHeroTalent[] => {
    return heroTalents.get(heroId) || [];
  };

  const updateHeroTalent = async (
    heroId: number, 
    slot: 'talent1' | 'talent2' | 'talent3', 
    talent: Partial<DbHeroTalent>
  ): Promise<boolean> => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('hero_talents')
        .upsert({
          hero_id: heroId,
          slot,
          name: talent.name,
          type: talent.type,
          description: talent.description,
          icon: talent.icon,
        }, { onConflict: 'hero_id,slot' });
      
      if (error) throw error;
      
      // Update local state
      setHeroTalents(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(heroId) || [];
        const talentIndex = existing.findIndex(t => t.slot === slot);
        const updatedTalent: DbHeroTalent = {
          hero_id: heroId,
          slot,
          name: talent.name || '',
          type: talent.type || '',
          description: talent.description || '',
          icon: talent.icon || null,
        };
        
        if (talentIndex >= 0) {
          existing[talentIndex] = updatedTalent;
        } else {
          existing.push(updatedTalent);
        }
        newMap.set(heroId, existing);
        return newMap;
      });
      
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // === SLOTTABLE SKILLS ===
  const addSkill = async (skill: Omit<Skill, 'id'>): Promise<Skill | null> => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert({
          name: skill.name,
          type: skill.type,
          probability: skill.probability,
          description: skill.description,
          icon: skill.icon,
          icon_regular: skill.iconRegular,
          icon_diamond: skill.iconDiamond,
          is_unique: false, // Slottable skills are not unique
          burn: skill.effects?.burn || false,
          bleed: skill.effects?.bleed || false,
          poison: skill.effects?.poison || false,
          retribution: skill.effects?.retribution || false,
          slow: skill.effects?.slow || false,
          counterattack: skill.effects?.counterattack || false,
          basicattack: skill.effects?.basicattack || false,
          shield: skill.effects?.shield || false,
          heal: skill.effects?.heal || false,
          rage: skill.effects?.rage || false,
          silence: skill.effects?.silence || false,
          disarm: skill.effects?.disarm || false,
          brokenblade: skill.effects?.brokenblade || false,
          evasion: skill.effects?.evasion || false,
          dispel: skill.effects?.dispel || false,
          buff: skill.effects?.buff || false,
          debuff: skill.effects?.debuff || false,
          directdamage: skill.effects?.directdamage || false,
          immunitycontrol: skill.effects?.immunitycontrol || false,
          purify: skill.effects?.purify || false,
          devastation: skill.effects?.devastation || false,
          damagereduction: skill.effects?.damagereduction || false,
          lacerate: skill.effects?.lacerate || false,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newSkill = { ...skill, id: data.id } as Skill;
      setState(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      return newSkill;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setSaving(false);
    }
  };

  const updateSkill = async (id: number, updates: Partial<Skill>): Promise<boolean> => {
    setSaving(true);
    try {
      // Transform to database format
      const dbUpdates: any = { ...updates };
      if (updates.effects) {
        Object.entries(updates.effects).forEach(([key, value]) => {
          dbUpdates[key] = value;
        });
        delete dbUpdates.effects;
      }
      if (updates.iconRegular !== undefined) {
        dbUpdates.icon_regular = updates.iconRegular;
        delete dbUpdates.iconRegular;
      }
      if (updates.iconDiamond !== undefined) {
        dbUpdates.icon_diamond = updates.iconDiamond;
        delete dbUpdates.iconDiamond;
      }
      if (updates.isUnique !== undefined) {
        dbUpdates.is_unique = updates.isUnique;
        delete dbUpdates.isUnique;
      }

      const { error } = await supabase
        .from('skills')
        .update(dbUpdates)
        .eq('id', id);
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s),
      }));
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteSkill = async (id: number): Promise<boolean> => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.id !== id),
      }));
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const getSkill = (id: number) => state.skills.find(s => s.id === id);

  // === MOUNTS (keeping local for now) ===
  const addMount = (mount: Mount) => {
    setState(prev => ({ ...prev, mounts: [...prev.mounts, mount] }));
  };

  const updateMount = (id: string, updates: Partial<Mount>) => {
    setState(prev => ({
      ...prev,
      mounts: prev.mounts.map(m => m.id === id ? { ...m, ...updates } : m),
    }));
  };

  const deleteMount = (id: string) => {
    setState(prev => ({
      ...prev,
      mounts: prev.mounts.filter(m => m.id !== id),
    }));
  };

  const getMount = (id: string) => state.mounts.find(m => m.id === id);

  const value: AdminContextType = {
    state,
    heroSkills,
    heroTalents,
    loading,
    saving,
    error,
    refreshData,
    addHero,
    updateHero,
    deleteHero,
    getHero,
    getHeroSkills,
    updateHeroSkill,
    getHeroTalents,
    updateHeroTalent,
    addSkill,
    updateSkill,
    deleteSkill,
    getSkill,
    addMount,
    updateMount,
    deleteMount,
    getMount,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
