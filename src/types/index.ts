// ===== ENHANCED TYPES FOR ADMIN SYSTEM =====

// Inline Talent for Hero (simplified)
export interface HeroTalent {
  name: string;
  icon: string; // circular icon URL (Cloudinary)
  description: string;
}

// Inline Unique Skill for Hero
export interface HeroUniqueSkill {
  name: string;
  icon: string; // skill icon URL (Cloudinary)
  type: string; // active, passive, etc.
  probability: number; // percentage
  description: string;
}

// Inline Awakened Skill for Hero
export interface HeroAwakenedSkill {
  name: string;
  icon: string; // awakened skill icon URL (Cloudinary)
  description: string;
}

// Standalone Talent Interface (legacy, for separate talents section)
export interface Talent {
  id: string;
  name: string;
  icon: string; // circular icon path
  description: string;
  levels: string[]; // descriptions for each level (e.g., 5 levels)
}

// Hero Skill Slots (legacy structure)
export interface HeroSkillSlots {
  slot1: Skill; // Unique skill (can awaken)
  slot1Awakened?: Skill; // Awakened version
  slot2: Skill; // Unique skill
  slot3: string | null; // ID of equipped general skill or null
  slot4: string | null; // ID of equipped general skill or null
  slot5: Skill | null; // Static awakened skill (null for Common heroes)
}

// Enhanced Hero Interface
export interface Hero {
  id: number;
  name: string;
  portrait: string; // regular image
  
  // Basic Info (optional for backward compatibility)
  rarity?: string; // 'Legendary' | 'Epic' | 'Common'
  season?: string; // 'Base' | 'S1' | 'S2' | 'S3' | 'Sx' | 'Valhalla'
  portraitDiamond?: string; // optional diamond version
  
  // Categories (optional for backward compatibility)
  troopType?: string; // 'Pikeman' | 'Infantry' | 'Archer' | 'Leader' | 'Porter'
  specialty?: string; // 'PvP' | 'Gathering' | 'Jungler' | 'Polymath'
  excellence?: string; // 'Counterattack' | 'Skills' | 'Support' | 'Mount Development' | 'Basic Attack' | 'Defence'
  
  // 3 Special Talents (inline with hero) - optional for backward compatibility
  talents?: Talent[]; // Legacy array format
  
  // NEW: Inline talents (simpler structure)
  talent1?: HeroTalent;
  talent2?: HeroTalent;
  talent3?: HeroTalent;
  
  // NEW: Inline unique skills
  uniqueSkill1?: HeroUniqueSkill;
  uniqueSkill2?: HeroUniqueSkill;
  
  // NEW: Inline awakened skill
  awakenedSkill?: HeroAwakenedSkill;
  
  // 5 Skill Slots - optional for backward compatibility (legacy)
  skills?: HeroSkillSlots;
  
  // Legacy fields (keep for backward compatibility)
  herotype?: string;
  heroclass?: string;
  abilities?: string[];
  
  // Combat abilities (legacy, for filtering)
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
}

// Enhanced Skill Interface
export interface Skill {
  id: string | number; // Allow both for backward compatibility
  name: string;
  
  // Visual (optional for backward compatibility)
  iconRegular?: string; // regular display
  iconDiamond?: string; // diamond display
  
  // Properties
  type: string; // Will be typed more strictly in admin
  probability: number; // percentage (0-100)
  description: string;
  
  // Metadata (optional for backward compatibility)
  isUnique?: boolean; // true = hero-specific, false = general obtainable
  heroId?: number; // if unique, which hero it belongs to
  
  // Effects (legacy, keep for filtering)
  effects: Record<string, boolean | undefined>;
  
  // Legacy fields (for backward compatibility)
  icon?: string;
}

// Strict skill type for admin forms
export type SkillType = 'rage' | 'active' | 'command' | 'counterattack' | 'cooperation' | 'passive' | 'awaken';

// Mount Skill Interface
export interface MountSkill {
  id: string;
  name: string;
  iconDiamond: string; // always diamond-shaped
  description: string;
  probability?: number;
  mountId: string; // parent mount
}

// Mount Interface
export interface Mount {
  id: string;
  name: string;
  
  // Type & Visual
  element: string; // 'Life' | 'Light' | 'Fire' | 'Ice' | 'Destruction' | 'Darkness'
  troopBenefit: string; // 'Infantry' | 'Pikeman' | 'Archer' | 'Skill Defense' | 'Skill Attack' | 'All Troops'
  icon: string;
  
  // Skills (2 when awakened)
  awakenedSkills: MountSkill[];
  
  description?: string;
}

// Team Builder types
export interface TeamMember {
  hero: Hero | null;
  skill1: Skill | null;
  skill2: Skill | null;
}

export interface Team {
  id: number;
  members: TeamMember[];
}

// Filter types
export interface HeroFilters {
  herotype: string;
  heroclass: string;
  search: string;
  ability: string;
  rarity?: string;
  season?: string;
  troopType?: string;
}

export interface SkillFilters {
  type: string;
  search: string;
  effect: string;
  isUnique?: boolean | null;
}

// ===== ADMIN TYPES =====

// Admin Context State
export interface AdminState {
  heroes: Hero[];
  skills: Skill[];
  talents: Talent[];
  mounts: Mount[];
  hasUnsavedChanges: boolean;
}

// Form validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
}

// Export options
export type ExportFormat = 'typescript' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  entities: ('heroes' | 'skills' | 'talents' | 'mounts')[];
}

// Change tracking
export interface DataChange {
  entity: 'hero' | 'skill' | 'talent' | 'mount';
  action: 'create' | 'update' | 'delete';
  entityId: string | number;
  timestamp: Date;
  data: any;
}
