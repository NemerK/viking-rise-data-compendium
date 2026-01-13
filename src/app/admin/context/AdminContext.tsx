'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hero, Skill, Talent, Mount, AdminState, DataChange } from '@/types';
import { heroes as initialHeroes } from '@/data/heroes';
import { skills as initialSkills } from '@/data/skills';
import { talents as initialTalents } from '@/data/talents';
import { mounts as initialMounts } from '@/data/mounts';

interface AdminContextType {
  // State
  state: AdminState;
  changes: DataChange[];
  
  // Heroes
  addHero: (hero: Hero) => void;
  updateHero: (id: number, hero: Partial<Hero>) => void;
  deleteHero: (id: number) => void;
  getHero: (id: number) => Hero | undefined;
  
  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string | number, skill: Partial<Skill>) => void;
  deleteSkill: (id: string | number) => void;
  getSkill: (id: string | number) => Skill | undefined;
  
  // Talents
  addTalent: (talent: Talent) => void;
  updateTalent: (id: string, talent: Partial<Talent>) => void;
  deleteTalent: (id: string) => void;
  getTalent: (id: string) => Talent | undefined;
  
  // Mounts
  addMount: (mount: Mount) => void;
  updateMount: (id: string, mount: Partial<Mount>) => void;
  deleteMount: (id: string) => void;
  getMount: (id: string) => Mount | undefined;
  
  // Utility
  resetChanges: () => void;
  hasUnsavedChanges: () => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>({
    heroes: [...initialHeroes],
    skills: [...initialSkills],
    talents: [...initialTalents],
    mounts: [...initialMounts],
    hasUnsavedChanges: false,
  });

  const [changes, setChanges] = useState<DataChange[]>([]);

  // Track changes
  const addChange = (change: Omit<DataChange, 'timestamp'>) => {
    setChanges(prev => [...prev, { ...change, timestamp: new Date() }]);
    setState(prev => ({ ...prev, hasUnsavedChanges: true }));
  };

  // Heroes
  const addHero = (hero: Hero) => {
    setState(prev => ({
      ...prev,
      heroes: [...prev.heroes, hero],
    }));
    addChange({ entity: 'hero', action: 'create', entityId: hero.id, data: hero });
  };

  const updateHero = (id: number, updates: Partial<Hero>) => {
    setState(prev => ({
      ...prev,
      heroes: prev.heroes.map(h => h.id === id ? { ...h, ...updates } : h),
    }));
    addChange({ entity: 'hero', action: 'update', entityId: id, data: updates });
  };

  const deleteHero = (id: number) => {
    setState(prev => ({
      ...prev,
      heroes: prev.heroes.filter(h => h.id !== id),
    }));
    addChange({ entity: 'hero', action: 'delete', entityId: id, data: null });
  };

  const getHero = (id: number) => {
    return state.heroes.find(h => h.id === id);
  };

  // Skills
  const addSkill = (skill: Skill) => {
    setState(prev => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
    addChange({ entity: 'skill', action: 'create', entityId: skill.id, data: skill });
  };

  const updateSkill = (id: string | number, updates: Partial<Skill>) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s),
    }));
    addChange({ entity: 'skill', action: 'update', entityId: id, data: updates });
  };

  const deleteSkill = (id: string | number) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
    addChange({ entity: 'skill', action: 'delete', entityId: id, data: null });
  };

  const getSkill = (id: string | number) => {
    return state.skills.find(s => s.id === id);
  };

  // Talents
  const addTalent = (talent: Talent) => {
    setState(prev => ({
      ...prev,
      talents: [...prev.talents, talent],
    }));
    addChange({ entity: 'talent', action: 'create', entityId: talent.id, data: talent });
  };

  const updateTalent = (id: string, updates: Partial<Talent>) => {
    setState(prev => ({
      ...prev,
      talents: prev.talents.map(t => t.id === id ? { ...t, ...updates } : t),
    }));
    addChange({ entity: 'talent', action: 'update', entityId: id, data: updates });
  };

  const deleteTalent = (id: string) => {
    setState(prev => ({
      ...prev,
      talents: prev.talents.filter(t => t.id !== id),
    }));
    addChange({ entity: 'talent', action: 'delete', entityId: id, data: null });
  };

  const getTalent = (id: string) => {
    return state.talents.find(t => t.id === id);
  };

  // Mounts
  const addMount = (mount: Mount) => {
    setState(prev => ({
      ...prev,
      mounts: [...prev.mounts, mount],
    }));
    addChange({ entity: 'mount', action: 'create', entityId: mount.id, data: mount });
  };

  const updateMount = (id: string, updates: Partial<Mount>) => {
    setState(prev => ({
      ...prev,
      mounts: prev.mounts.map(m => m.id === id ? { ...m, ...updates } : m),
    }));
    addChange({ entity: 'mount', action: 'update', entityId: id, data: updates });
  };

  const deleteMount = (id: string) => {
    setState(prev => ({
      ...prev,
      mounts: prev.mounts.filter(m => m.id !== id),
    }));
    addChange({ entity: 'mount', action: 'delete', entityId: id, data: null });
  };

  const getMount = (id: string) => {
    return state.mounts.find(m => m.id === id);
  };

  // Utility
  const resetChanges = () => {
    setChanges([]);
    setState(prev => ({ ...prev, hasUnsavedChanges: false }));
  };

  const hasUnsavedChanges = () => {
    return state.hasUnsavedChanges;
  };

  const value: AdminContextType = {
    state,
    changes,
    addHero,
    updateHero,
    deleteHero,
    getHero,
    addSkill,
    updateSkill,
    deleteSkill,
    getSkill,
    addTalent,
    updateTalent,
    deleteTalent,
    getTalent,
    addMount,
    updateMount,
    deleteMount,
    getMount,
    resetChanges,
    hasUnsavedChanges,
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
