import { Hero, Skill, Equipment, Mount, HeroPairing, SkillType } from '../types';

// Sample Skills Database
export const skills: Skill[] = [
  {
    id: 1,
    name: 'Furious Hack and Slash',
    type: 'Cooperation',
    probability: 100,
    description: 'When deployed Troop performs a basic attack, there is a 20% chance to inflict Bleed on the target, dealing continuous damage every second (Damage Factor 350) for 2s. There is also a 15% chance for this hero Troop to recover 60 Rage, and a 15% chance to inflict Silence on the target for 1s.',
    icon: '/images/skills/Furious-Hack-and-Slash.png',
    effects: {
      bleed: true,
      basicattack: true,
      rage: true,
      silence: true
    }
  },
  {
    id: 2,
    name: 'Poison Arrow',
    type: 'Command',
    probability: 100,
    description: 'When deployed Troop performs a basic attack, there is a 25% chance to inflict Poison on the target, dealing continuous damage every second (Damage Factor 300) for 3s.',
    icon: '/images/skills/Poison-Arrow.png',
    effects: {
      poison: true
    }
  },
  {
    id: 3,
    name: 'Shield Wall',
    type: 'Passive',
    probability: 100,
    description: 'Increases Defense of up to 4 ally troops in a circular range by 30% for 8 seconds. Also provides a shield that absorbs damage equal to 20% of max HP.',
    icon: '/images/skills/Shield-Support.png',
    effects: {
      shield: true,
      buff: true
    }
  },
  {
    id: 4,
    name: 'Healing Light',
    type: 'Active',
    probability: 100,
    description: 'Restores Health of up to 4 ally troops in a circular range by 25% of max HP. Also removes all debuffs from affected troops.',
    icon: '/images/skills/Blessed-Healing.png',
    effects: {
      heal: true,
      purify: true
    }
  },
  {
    id: 5,
    name: 'Counter Strike',
    type: 'Counterattack',
    probability: 100,
    description: 'When attacked, there is a 30% chance to counterattack, dealing damage equal to 150% of basic attack damage.',
    icon: '/images/skills/Counterstrike.png',
    effects: {
      counterattack: true,
      directdamage: true
    }
  }
];

// Sample Equipment
export const equipment: Equipment[] = [
  {
    id: 1,
    name: 'Iron Helmet',
    type: 'Head',
    quality: 'Blue',
    stats: { hp: 100, def: 50 },
    icon: '/images/equipment/iron-helmet.png',
    description: 'Basic defensive helmet'
  },
  {
    id: 2,
    name: 'Steel Sword',
    type: 'Weapon',
    quality: 'Purple',
    stats: { atk: 150, crit: 10 },
    icon: '/images/equipment/steel-sword.png',
    description: 'Sharp steel blade'
  }
];

// Sample Mounts
export const mounts: Mount[] = [
  {
    id: 1,
    name: 'Fire Wolf',
    element: 'Fire',
    quality: 'Gold',
    marchSpeed: 100,
    mainStat: { type: 'Archer ATK', value: 200 },
    slots: {
      tail: null,
      back: null,
      head: null
    },
    icon: '/images/mounts/fire-wolf.png',
    description: 'Legendary fire element mount for archers'
  },
  {
    id: 2,
    name: 'Life Bear',
    element: 'Life',
    quality: 'Gold',
    marchSpeed: 100,
    mainStat: { type: 'Infantry ATK', value: 200 },
    slots: {
      tail: null,
      back: null,
      head: null
    },
    icon: '/images/mounts/life-bear.png',
    description: 'Legendary life element mount for infantry'
  }
];

// Helper function to convert herotype to heroClass
function convertHeroType(herotype: string): 'Infantry' | 'Pikeman' | 'Archer' | 'Porter' | 'Polymath' {
  switch (herotype) {
    case 'Infantry': return 'Infantry';
    case 'Pikeman': return 'Pikeman';
    case 'Archers': return 'Archer';
    case 'Leader': return 'Polymath';
    case 'Archer': return 'Archer';
    default: return 'Infantry';
  }
}

// Helper function to determine season and source
function getSeasonAndSource(id: number, name: string): { season: 'Base Game' | 'Season 1' | 'Season 2' | 'Season 3' | 'Sx' | 'Valhalla Collaboration', source: 'Base Game' | 'KVK Event' | 'Lucky Wheel' | 'Season Pass' | 'Special Event' | 'Gacha' | 'Valhalla Collaboration' } {
  // Valhalla Collaboration heroes
  const valhallaHeroes = ['Rollo', 'Athelstan', 'Harald', 'Leif', 'Freydis', 'Heahmund'];
  if (valhallaHeroes.includes(name)) {
    return { season: 'Valhalla Collaboration', source: 'Valhalla Collaboration' };
  }
  
  // Regular season assignment
  if (id <= 10) return { season: 'Base Game', source: 'Base Game' };
  if (id <= 20) return { season: 'Season 1', source: 'KVK Event' };
  if (id <= 30) return { season: 'Season 2', source: 'Lucky Wheel' };
  if (id <= 40) return { season: 'Season 3', source: 'Season Pass' };
  return { season: 'Sx', source: 'Special Event' };
}

// Function to get specific hero recommendations
function getHeroRecommendations(heroName: string, heroId: number) {
  const recommendations: any[] = [];
  
  // Define all hero pairings with their skill sets
  const heroPairings = {
    'Bjorn': [
      {
        heroId: 1, // Lagertha
        heroName: 'Lagertha',
        synergy: 'Infantry Leadership',
        description: 'Bjorn (Main Leader) + Lagertha (Secondary Leader) create a strong infantry leadership team',
        effectiveness: 'High',
        recommendedSkills: [
          {
            name: 'Skill Set 1',
            skills: ['First Strike', 'Enrage', 'Divine Blessing', 'Odins Asylum']
          },
          {
            name: 'Skill Set 2',
            skills: ['First Strike', 'Enrage', 'Rage Leech', 'Odins Asylum']
          }
        ]
      },
      {
        heroId: 2, // Harald
        heroName: 'Harald',
        synergy: 'Infantry Duo',
        description: 'Bjorn (Main Leader) + Harald (Secondary Leader) form a powerful infantry team with complementary abilities',
        effectiveness: 'High',
        recommendedSkills: [
          {
            name: 'Skill Set 1',
            skills: ['First Strike', 'Enrage', 'Divine Blessing', 'Odins Asylum']
          },
          {
            name: 'Skill Set 2',
            skills: ['First Strike', 'Enrage', 'Rage Leech', 'Odins Asylum']
          }
        ]
      }
    ],
    'Harald': [
      {
        heroId: 6, // Bjorn
        heroName: 'Bjorn',
        synergy: 'Infantry Duo',
        description: 'Harald (Main Leader) + Bjorn (Secondary Leader) form a powerful infantry team with complementary abilities',
        effectiveness: 'High',
        recommendedSkills: [
          {
            name: 'Skill Set 1',
            skills: ['First Strike', 'Enrage', 'Divine Blessing', 'Odins Asylum']
          },
          {
            name: 'Skill Set 2',
            skills: ['First Strike', 'Enrage', 'Rage Leech', 'Odins Asylum']
          }
        ]
      }
    ],
    'Lagertha': [
      {
        heroId: 3, // Margit
        heroName: 'Margit',
        synergy: 'Infantry Duo',
        description: 'Margit (Main Leader) + Lagertha (Secondary Leader) form a powerful infantry team',
        effectiveness: 'High',
        recommendedSkills: [
          {
            name: 'Skill Set 1',
            skills: ['First Strike', 'Enrage', 'Odins Asylum', 'Divine Blessing']
          }
        ]
      },
      {
        heroId: 6, // Bjorn
        heroName: 'Bjorn',
        synergy: 'Infantry Leadership',
        description: 'Bjorn (Main Leader) + Lagertha (Secondary Leader) create a strong infantry leadership team',
        effectiveness: 'High',
        recommendedSkills: [
          {
            name: 'Skill Set 1',
            skills: ['First Strike', 'Enrage', 'Divine Blessing', 'Odins Asylum']
          },
          {
            name: 'Skill Set 2',
            skills: ['First Strike', 'Enrage', 'Rage Leech', 'Odins Asylum']
          }
        ]
      }
    ],
    'Margit': [
      {
        heroId: 1, // Lagertha
        heroName: 'Lagertha',
        synergy: 'Infantry Duo',
        description: 'Margit (Main Leader) + Lagertha (Secondary Leader) form a powerful infantry team',
        effectiveness: 'High',
        recommendedSkills: [
          {
            name: 'Skill Set 1',
            skills: ['First Strike', 'Enrage', 'Odins Asylum', 'Divine Blessing']
          }
        ]
      }
    ]
  };
  
  // Get recommendations for this specific hero
  if (heroPairings[heroName as keyof typeof heroPairings]) {
    recommendations.push(...heroPairings[heroName as keyof typeof heroPairings]);
  }
  
  // Default recommendation for heroes without specific recommendations
  if (recommendations.length === 0) {
    recommendations.push({
      heroId: heroId === 1 ? 2 : heroId - 1,
      heroName: `Hero ${heroId === 1 ? 2 : heroId - 1}`,
      synergy: 'General synergy',
      description: 'No specific recommendations available yet',
      effectiveness: 'Medium',
      recommendedSkills: []
    });
  }
  
  return recommendations;
}

// Helper function to create hero from original data
function createHero(originalHero: any, heroSkillsData: any): Hero {
  const { id, name, herotype, heroclass, ...abilities } = originalHero;
  const { season, source } = getSeasonAndSource(id, name);
  
  // Find the corresponding skills data for this hero
  const heroSkills = heroSkillsData.find((h: any) => h.name === name);
  
  // Create base skills from the actual data
  const baseSkill1: Skill = {
    id: id * 100 + 1,
    name: heroSkills?.skillonename || `${name}'s First Skill`,
    type: (heroSkills?.skillonetype as SkillType) || 'Active',
    probability: heroSkills?.skilloneprob || 100,
    description: heroSkills?.skillonedescr || `${name}'s first skill description`,
    icon: `/images/skills/diamond/none.png`, // Hero base skills don't have specific images
    effects: {
      basicattack: abilities.basicattack || false,
      directdamage: abilities.directdamage || false,
      bleed: abilities.bleed || false,
      slow: abilities.slow || false,
      heal: abilities.heal || false,
      shield: abilities.shield || false,
      buff: abilities.buff || false,
      debuff: abilities.debuff || false
    }
  };
  
  const baseSkill2: Skill = {
    id: id * 100 + 2,
    name: heroSkills?.skilltwoname || `${name}'s Second Skill`,
    type: (heroSkills?.skilltwotype as SkillType) || 'Passive',
    probability: heroSkills?.skilltwoprob || 100,
    description: heroSkills?.skilltwodescr || `${name}'s second skill description`,
    icon: `/images/skills/diamond/none.png`, // Hero base skills don't have specific images
    effects: {
      basicattack: abilities.basicattack || false,
      directdamage: abilities.directdamage || false,
      bleed: abilities.bleed || false,
      slow: abilities.slow || false,
      heal: abilities.heal || false,
      shield: abilities.shield || false,
      buff: abilities.buff || false,
      debuff: abilities.debuff || false
    }
  };
  
  const awakenSkill: Skill = {
    id: id * 100 + 3,
    name: heroSkills?.skillawakename || `${name}'s Awakened Skill`,
    type: (heroSkills?.skillawaketype as SkillType) || 'Awaken',
    probability: heroSkills?.skillawakeprob || 100,
    description: heroSkills?.skillawakedescr || `${name}'s awakened skill description`,
    icon: `/images/skills/diamond/Awakening.png`, // Use the Awakening image for awakened skills
    effects: {
      basicattack: abilities.basicattack || false,
      directdamage: abilities.directdamage || false,
      bleed: abilities.bleed || false,
      slow: abilities.slow || false,
      heal: abilities.heal || false,
      shield: abilities.shield || false,
      buff: abilities.buff || false,
      debuff: abilities.debuff || false,
      devastation: abilities.devastation || false
    }
  };
  
  return {
    id,
    name,
    heroClass: convertHeroType(herotype),
    season,
    source,
    portrait: `/images/heroes/${name}.png`,
    description: `${name} is a powerful ${convertHeroType(herotype)} hero`,
    rarity: 'Epic',
    
    baseStats: {
      hp: 1000 + (id * 10),
      atk: 150 + (id * 5),
      def: 100 + (id * 3)
    },
    
    talents: {
      static: {
        hpBonus: 10,
        atkBonus: 10,
        defBonus: 10
      },
      unique: {
        talent1: heroSkills?.talentonename || `${name}'s unique talent 1`,
        talent2: heroSkills?.talenttwoname || `${name}'s unique talent 2`,
        talent3: heroSkills?.talentthreename || `${name}'s unique talent 3`
      }
    },
    
    skills: {
      baseSkill1,
      baseSkill2,
      awakenSkill,
      recommendedSlottableSkills: [skills[4]]
    },
    
    equipment: {
      head: equipment[0],
      weapon: equipment[1],
      chest: null,
      shoes: null
    },
    
    recommendedMount: herotype === 'Archers' || herotype === 'Archer' ? mounts[0] : mounts[1],
    
    recommendedPairings: getHeroRecommendations(name, id),
    
    abilities: {
      burn: abilities.burn || false,
      bleed: abilities.bleed || false,
      poison: abilities.poison || false,
      retribution: abilities.retribution || false,
      slow: abilities.slow || false,
      counterattack: abilities.counterattack || false,
      basicattack: abilities.basicattack || false,
      shield: abilities.shield || false,
      heal: abilities.heal || false,
      rage: abilities.rage || false,
      silence: abilities.silence || false,
      disarm: abilities.disarm || false,
      brokenblade: abilities.brokenblade || false,
      evasion: abilities.evasion || false,
      dispel: abilities.dispel || false,
      buff: abilities.buff || false,
      debuff: abilities.debuff || false,
      directdamage: abilities.directdamage || false,
      immunitycontrol: abilities.immunitycontrol || false,
      purify: abilities.purify || false,
      devastation: abilities.devastation || false,
      damagereduction: abilities.damagereduction || false,
      lacerate: abilities.lacerate || false
    }
  };
}

// Original heroes data from your file
const originalHeroes = [
  { name: "Gregory", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: false, slow: true, counterattack: false, basicattack: true, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 1 },
  { name: "Harald", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: false, poison: false, retribution: false, slow: true, counterattack: false, basicattack: true, shield: false, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 2 },
  { name: "Lagertha", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: true, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 3 },
  { name: "Rollo", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: false, slow: true, counterattack: false, basicattack: true, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 4 },
  { name: "Jens", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 5 },
  { name: "Bjorn", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: false, slow: true, counterattack: false, basicattack: true, shield: false, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 6 },
  { name: "Hobert", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: false, poison: false, retribution: false, slow: true, counterattack: false, basicattack: true, shield: true, heal: false, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: true, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: true, devastation: false, damagereduction: true, id: 7 },
  { name: "Vali", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: true, slow: true, counterattack: false, basicattack: true, shield: true, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 8 },
  { name: "Sephina", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: true, slow: true, counterattack: false, basicattack: true, shield: false, heal: false, rage: false, silence: true, disarm: false, brokenblade: false, evasion: false, dispel: true, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 9 },
  { name: "Margit", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: false, slow: true, counterattack: false, basicattack: true, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: true, devastation: false, damagereduction: false, id: 10 },
  { name: "Cecia", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 11 },
  { name: "Rosky", herotype: "Pikeman", heroclass: "Skills", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 12 },
  { name: "Helgar", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 13 },
  { name: "Laird", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 14 },
  { name: "Leif", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 15 },
  { name: "Sigurd", herotype: "Pikeman", heroclass: "Skills", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: false, heal: false, rage: false, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 16 },
  { name: "Rolfe", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: true, rage: false, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 17 },
  { name: "Naya", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: false, rage: false, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 18 },
  { name: "Yvette", herotype: "Pikeman", heroclass: "Support", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 19 },
  { name: "Wooder", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 20 },
  { name: "Verdandi", herotype: "Archers", heroclass: "Skills", burn: true, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 21 },
  { name: "Freydis", herotype: "Archers", heroclass: "Skills", burn: true, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 22 },
  { name: "Artur", herotype: "Archers", heroclass: "Skills", burn: true, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 23 },
  { name: "Leandra", herotype: "Archers", heroclass: "Counterattack", burn: true, bleed: false, poison: true, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: true, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 24 },
  { name: "Sasha", herotype: "Archers", heroclass: "Skills", burn: false, bleed: false, poison: true, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: true, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 25 },
  { name: "Alf", herotype: "Archers", heroclass: "Skills", burn: true, bleed: false, poison: true, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: false, silence: false, disarm: false, brokenblade: false, evasion: true, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 26 },
  { name: "Yulmi", herotype: "Archers", heroclass: "Counterattack", burn: false, bleed: false, poison: true, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: true, id: 27 },
  { name: "Olena", herotype: "Archers", heroclass: "Skills", burn: true, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 28 },
  { name: "Ragnar", herotype: "Leader", heroclass: "Support", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: false, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 29 },
  { name: "Ivana", herotype: "Leader", heroclass: "Support", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: false, silence: true, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 30 },
  { name: "Aethelflaed", herotype: "Leader", heroclass: "Mount", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: false, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 31 },
  { name: "Leidolf", herotype: "Leader", heroclass: "Support", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: true, shield: false, heal: true, rage: false, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: true, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, id: 32 },
  { name: "Gunnar", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: true, rage: false, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: true, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: true, lacerate: true, id: 33 },
  { name: "Hilda", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: true, rage: true, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: false, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: true, devastation: false, damagereduction: false, lacerate: true, id: 34 },
  { name: "Athelstan", herotype: "Archer", heroclass: "Skills", burn: true, bleed: false, poison: true, retribution: false, slow: false, counterattack: false, basicattack: false, shield: false, heal: true, rage: true, silence: false, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, lacerate: false, id: 35 },
  { name: "Heahmund", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: false, basicattack: false, shield: true, heal: true, rage: false, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: false, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: true, devastation: false, damagereduction: true, lacerate: false, id: 36 },
  { name: "Charlton", herotype: "Archers", heroclass: "Skills", burn: true, bleed: false, poison: true, retribution: false, slow: false, counterattack: false, basicattack: false, shield: false, heal: true, rage: true, silence: false, disarm: false, brokenblade: false, evasion: true, dispel: true, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: false, lacerate: false, id: 37 },
  { name: "Heidrun", herotype: "Archers", heroclass: "Skills", burn: true, bleed: false, poison: true, retribution: false, slow: false, counterattack: false, basicattack: false, shield: false, heal: true, rage: true, silence: false, disarm: false, brokenblade: false, evasion: true, dispel: true, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: true, devastation: false, damagereduction: false, lacerate: false, id: 38 },
  { name: "Greta", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: true, slow: true, counterattack: false, basicattack: true, shield: true, heal: true, rage: false, silence: true, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: true, lacerate: false, id: 39 },
  { name: "Sigrid", herotype: "Infantry", heroclass: "Basic attacker", burn: false, bleed: true, poison: false, retribution: true, slow: true, counterattack: false, basicattack: true, shield: true, heal: true, rage: false, silence: true, disarm: false, brokenblade: false, evasion: false, dispel: false, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: true, devastation: false, damagereduction: false, lacerate: false, id: 40 },
  { name: "Tiroti", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: true, rage: true, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: false, buff: false, debuff: false, directdamage: true, immunitycontrol: false, purify: true, devastation: false, damagereduction: false, lacerate: true, id: 41 },
  { name: "Signy", herotype: "Pikeman", heroclass: "Counterattack", burn: false, bleed: false, poison: false, retribution: false, slow: false, counterattack: true, basicattack: false, shield: true, heal: true, rage: false, silence: false, disarm: false, brokenblade: true, evasion: false, dispel: true, buff: true, debuff: true, directdamage: true, immunitycontrol: false, purify: false, devastation: false, damagereduction: true, lacerate: true, id: 42 }
];

// Import the complete hero skills data
import { HeroesSkillsAndTalents } from './heroesskillsandtalents.js';

// Convert all heroes to the new format with actual skills data
export const heroes: Hero[] = originalHeroes.map(hero => {
  try {
    return createHero(hero, HeroesSkillsAndTalents);
  } catch (error) {
    console.error(`Error creating hero ${hero.name}:`, error);
    return null;
  }
}).filter(Boolean) as Hero[];

// Temporary simple test - commented out to restore full functionality
// export const heroes: Hero[] = originalHeroes.map(hero => ({
//   id: hero.id,
//   name: hero.name,
//   heroClass: 'Infantry' as const,
//   season: 'Base Game' as const,
//   source: 'Base Game' as const,
//   portrait: `/images/heroes/${hero.name}.png`,
//   baseStats: { hp: 1000, atk: 150, def: 100 },
//   talents: { static: { hpBonus: 10, atkBonus: 10, defBonus: 10 }, unique: { talent1: 'Test', talent2: 'Test', talent3: 'Test' } },
//   skills: {
//     baseSkill1: { id: 1, name: 'Test Skill 1', type: 'Active', probability: 100, description: 'Test', icon: '/images/skills/diamond/none.png', effects: {} },
//     baseSkill2: { id: 2, name: 'Test Skill 2', type: 'Passive', probability: 100, description: 'Test', icon: '/images/skills/diamond/none.png', effects: {} },
//     awakenSkill: { id: 3, name: 'Test Awaken', type: 'Awaken', probability: 100, description: 'Test', icon: '/images/skills/diamond/Awakening.png', effects: {} }
//   },
//   equipment: { head: null, weapon: null, chest: null, shoes: null },
//   mount: null,
//   pairings: [],
//   description: `${hero.name} is a test hero`,
//   rarity: 'Epic'
// }));