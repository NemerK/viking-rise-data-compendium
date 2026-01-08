// Hero type matching actual data structure
export interface Hero {
  id: number;
  name: string;
  herotype: string;
  heroclass: string;
  portrait: string;
  // Combat abilities
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
}

// Skill type matching actual data structure
export interface Skill {
  id: number;
  name: string;
  type: string;
  probability: number;
  description: string;
  icon: string;
  effects: Record<string, boolean | undefined>;
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
}

export interface SkillFilters {
  type: string;
  search: string;
  effect: string;
}
