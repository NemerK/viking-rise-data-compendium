export interface Hero {
  id: number;
  name: string;
  herotype: 'Infantry' | 'Pikeman' | 'Archers' | 'Leader' | 'Archer';
  heroclass: 'Basic attacker' | 'Counterattack' | 'Skills' | 'Support' | 'Mount';
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

export interface FilterOptions {
  herotype?: string;
  heroclass?: string;
  search?: string;
}