// Hero Classes (5 main classes)
export type HeroClass = 'Infantry' | 'Pikeman' | 'Archer' | 'Porter' | 'Polymath';

// Hero Seasons
export type HeroSeason = 'Base Game' | 'Season 1' | 'Season 2' | 'Season 3' | 'Sx' | 'Valhalla Collaboration';

// Hero Sources
export type HeroSource = 'Base Game' | 'KVK Event' | 'Lucky Wheel' | 'Season Pass' | 'Special Event' | 'Gacha' | 'Valhalla Collaboration';

// Skill Types
export type SkillType = 'Cooperation' | 'Active' | 'Counterattack' | 'Passive' | 'Command' | 'Awaken';

// Equipment Types
export type EquipmentType = 'Head' | 'Weapon' | 'Chest' | 'Shoes';

// Equipment Quality
export type EquipmentQuality = 'White' | 'Green' | 'Blue' | 'Purple' | 'Gold';

// Mount Elements
export type MountElement = 'Fire' | 'Life' | 'Light' | 'Darkness' | 'Ice' | 'Destruction';

// Mount Quality
export type MountQuality = 'White' | 'Green' | 'Blue' | 'Purple' | 'Gold';

// Mount Slots
export type MountSlot = 'Tail' | 'Back' | 'Head';

export interface Skill {
  id: number;
  name: string;
  type: SkillType;
  probability: number;
  description: string;
  icon: string;
  
  // Effects
  effects: {
    burn?: boolean;
    bleed?: boolean;
    poison?: boolean;
    retribution?: boolean;
    slow?: boolean;
    counterattack?: boolean;
    basicattack?: boolean;
    shield?: boolean;
    heal?: boolean;
    rage?: boolean;
    silence?: boolean;
    disarm?: boolean;
    brokenblade?: boolean;
    evasion?: boolean;
    dispel?: boolean;
    buff?: boolean;
    debuff?: boolean;
    directdamage?: boolean;
    immunitycontrol?: boolean;
    purify?: boolean;
    devastation?: boolean;
    damagereduction?: boolean;
    lacerate?: boolean;
  };
}

export interface Equipment {
  id: number;
  name: string;
  type: EquipmentType;
  quality: EquipmentQuality;
  stats: {
    hp?: number;
    atk?: number;
    def?: number;
    crit?: number;
    dodge?: number;
  };
  icon: string;
  description: string;
}

export interface Mount {
  id: number;
  name: string;
  element: MountElement;
  quality: MountQuality;
  marchSpeed: number;
  mainStat: {
    type: string;
    value: number;
  };
  slots: {
    tail: MountSlotItem | null;
    back: MountSlotItem | null;
    head: MountSlotItem | null;
  };
  icon: string;
  description: string;
}

export interface MountSlotItem {
  id: number;
  name: string;
  quality: EquipmentQuality;
  stats: {
    hp?: number;
    atk?: number;
    def?: number;
    crit?: number;
    dodge?: number;
  };
  icon: string;
}

export interface HeroPairing {
  heroId: number;
  heroName: string;
  synergy: string;
  description: string;
  effectiveness: 'High' | 'Medium' | 'Low';
  recommendedSkills?: {
    name: string;
    skills: string[];
  }[];
}

export interface Hero {
  id: number;
  name: string;
  heroClass: HeroClass;
  season: HeroSeason;
  source: HeroSource;
  portrait: string;
  description: string;
  rarity: string;
  
  // Base Stats
  baseStats: {
    hp: number;
    atk: number;
    def: number;
  };
  
  // Talent Tree (3 static + 3 unique)
  talents: {
    static: {
      hpBonus: number; // 10% HP
      atkBonus: number; // 10% ATK
      defBonus: number; // 10% DEF
    };
    unique: {
      talent1: string;
      talent2: string;
      talent3: string;
    };
  };
  
  // Skills (2 base + 1 awaken + 2 slottable)
  skills: {
    baseSkill1: Skill;
    baseSkill2: Skill;
    awakenSkill?: Skill; // Available when hero is fully ascended
    recommendedSlottableSkills: Skill[];
  };
  
  // Equipment Slots
  equipment: {
    head: Equipment | null;
    weapon: Equipment | null;
    chest: Equipment | null;
    shoes: Equipment | null;
  };
  
  // Mount
  recommendedMount: Mount;
  
  // Hero Pairings (2-hero teams)
  recommendedPairings: HeroPairing[];
  
  // Combat Abilities (from your original data)
  abilities: {
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
    lacerate?: boolean;
  };
}

export interface FilterOptions {
  heroClass?: HeroClass;
  season?: HeroSeason;
  source?: HeroSource;
  search?: string;
}