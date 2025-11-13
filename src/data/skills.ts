import { Skill } from '../types';

// Helper function to map skill names to actual image files
function getSkillIcon(skillName: string): string {
  const imageMap: { [key: string]: string } = {
    'Furious Hack and Slash': 'Furious-Hack-and-Slash.png',
    'Poison Arrow': 'Poison-Arrow.png',
    'Shield Wall': 'Shield-Support.png',
    'Healing Light': 'Blessed-Healing.png',
    'Battle Cry': 'Battle-Hymn.png',
    'Counter Strike': 'Counterstrike.png',
    'Divine Protection': 'Divine-Shield.png',
    'Divine Shield': 'Divine-Shield.png',
    'Silence': 'Silencer.png',
    'Silent Assassin': 'Silent-Invasion.png',
    'Rapid Fire': 'Rapid-Attack.png',
    'Blood Rage': 'Bloody-Rage.png',
    'Divine Blessing': 'Divine-Blessing.png',
    'Fearless Charge': 'Fearless.png',
    'Enchanted Pursuit': 'Enchanted-Pursuit.png',
    'Rest and Counterattack': 'Rest-and-Counterattack.png',
    'Retaliate': 'Retaliate.png',
    'Siege': 'Siege.png',
    'Silent Invasion': 'Silent-Invasion.png',
    'Solitude': 'Solitude.png',
    'Splinter': 'Splinter.png',
    'Tenacity': 'Tenacity.png',
    'This Too Shall Pass': 'This-Too-Shall-Pass.png',
    'Thors Determination': 'Thors-Determination.png',
    'Tidal Attack': 'Tidal-Attack.png',
    'Trap of Despair': 'Trap-of-Despair.png',
    'Valkyries Gaze': 'Valkyries-Gaze.png',
    'Venom Aggregation': 'Venom-Agrregation.png',
    'Wild Indulgence': 'Wild-Indulgence.png',
    'Arrow of Truth': 'Arrow-of-Truth.png',
    'Awakening': 'Awakening.png',
    'Baldrs Blessing': 'Baldrs-Blessing.png',
    'Battle Role Shift': 'Batlle-Role-Shift.png',
    'Berserk Killing Machine': 'Berserk-Killing-Machine.png',
    'Blessed by Fate': 'Blessed-by-Fate.png',
    'Blessed Negation': 'Blessed-Negation.png',
    'Blood Eagle Punishment': 'Blood-Eagle-Punishment.png',
    'Bloodstained Icefield': 'Bloodstained-Icefield.png',
    'Blow of Chaos': 'Blow-of-Chaos.png',
    'Bone Corroding Arrow': 'Bone-corroding-Arrow.png',
    'Breaking Free': 'Breaking-Free.png',
    'Broken Armor': 'Broken-Armor.png',
    'Chance of Reversal': 'Chance-of-Reversal.png',
    'Containment': 'Containment.png',
    'Dampened Spirits': 'Dampened-Spirits.png',
    'Danger Omen': 'Danger-Omen.png',
    'Deadly Counterattack': 'Deadly-Counterattack.png',
    'Devastating Charge': 'Devastating-Charge.png',
    'Disarmament': 'Disarmament.png',
    'Einherjars Oath': 'Einherjars-Oath.png',
    'Enrage': 'Enrage.png',
    'Fading Battle': 'Fading-Battle.png',
    'Fiery Detonation': 'Fiery-Detonation.png',
    'Fiery Rage': 'Fiery-Rage.png',
    'First Strike': 'First-strike.png',
    'Freyas Blessing': 'Freyas-Blessing.png',
    'Gaining Momentum': 'Gaining-Momentum.png',
    'Green Chant': 'Green-Chant.png',
    'Halo of Sacrifice': 'Halo-of-Sacrifice.png',
    'Halo of Thorns': 'Halo-of-Thorns.png',
    'Heightened Chase': 'Heightened-Chase.png',
    'Heras Curse': 'Heras-Curse.png',
    'Hymn of Life': 'Hymn-of-Life.png',
    'Joint Offense': 'Joint-Offense.png',
    'Leshys Grudge': 'Leshys-Grudge.png',
    'Lokis Trick': 'Lokis-Trick.png',
    'Odins Asylum': 'Odins-Asylum.png',
    'On Alert': 'On-Alert.png',
    'Overdraft': 'Overdraft.png',
    'Rage Leech': 'Rage-Leech.png',
    'Rage Purge': 'Rage-Purge.png',
    'Shield Attacker': 'Shield-Attacker.png',
    'Shield Reflector': 'Shield-Reflector.png'
  };

  const imageFile = imageMap[skillName] || 'none.png';
  return `/images/skills/diamond/${imageFile}`;
}

export const skills: Skill[] = [
  {
    id: 1,
    name: 'Furious Hack and Slash',
    type: 'Cooperation',
    probability: 100,
    description: 'When deployed Troop performs a basic attack, there is a 20% chance to inflict Bleed on the target, dealing continuous damage every second (Damage Factor 350) for 2s. There is also a 15% chance for this hero Troop to recover 60 Rage, and a 15% chance to inflict Silence on the target for 1s.',
    icon: getSkillIcon('Furious Hack and Slash'),
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
    icon: getSkillIcon('Poison Arrow'),
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
    icon: getSkillIcon('Shield Wall'),
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
    icon: getSkillIcon('Healing Light'),
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
    icon: getSkillIcon('Counter Strike'),
    effects: {
      counterattack: true,
      directdamage: true
    }
  },
  {
    id: 6,
    name: 'Fireball',
    type: 'Active',
    probability: 100,
    description: 'Launches a fireball at the target, dealing damage equal to 200% of basic attack damage and has a 40% chance to inflict Burn for 3 seconds.',
    icon: getSkillIcon('Fiery Detonation'),
    effects: {
      burn: true,
      directdamage: true
    }
  },
  {
    id: 7,
    name: 'Ice Shard',
    type: 'Active',
    probability: 100,
    description: 'Launches an ice shard at the target, dealing damage equal to 180% of basic attack damage and has a 35% chance to inflict Slow for 2 seconds.',
    icon: getSkillIcon('Bloodstained Icefield'),
    effects: {
      slow: true,
      directdamage: true
    }
  },
  {
    id: 8,
    name: 'Berserker Rage',
    type: 'Passive',
    probability: 100,
    description: 'Increases Attack of up to 4 ally troops in a circular range by 35% for 10 seconds. Also increases Rage generation by 50%.',
    icon: getSkillIcon('Berserk Killing Machine'),
    effects: {
      rage: true,
      buff: true
    }
  },
  {
    id: 9,
    name: 'Silence',
    type: 'Command',
    probability: 100,
    description: 'Silences the target for 3 seconds, preventing them from using active skills.',
    icon: getSkillIcon('Silence'),
    effects: {
      silence: true,
      debuff: true
    }
  },
  {
    id: 10,
    name: 'Disarm',
    type: 'Command',
    probability: 100,
    description: 'Disarms the target for 2 seconds, reducing their attack damage by 50%.',
    icon: getSkillIcon('Disarmament'),
    effects: {
      disarm: true,
      debuff: true
    }
  },
  {
    id: 11,
    name: 'Evasion',
    type: 'Passive',
    probability: 100,
    description: 'Increases Evasion of up to 4 ally troops in a circular range by 25% for 8 seconds.',
    icon: getSkillIcon('On Alert'),
    effects: {
      evasion: true,
      buff: true
    }
  },
  {
    id: 12,
    name: 'Dispel',
    type: 'Active',
    probability: 100,
    description: 'Removes all buffs from up to 3 enemy troops in a circular range.',
    icon: getSkillIcon('Blessed Negation'),
    effects: {
      dispel: true,
      debuff: true
    }
  },
  {
    id: 13,
    name: 'Broken Blade',
    type: 'Command',
    probability: 100,
    description: 'Reduces the target\'s attack damage by 40% for 4 seconds.',
    icon: getSkillIcon('Broken Armor'),
    effects: {
      brokenblade: true,
      debuff: true
    }
  },
  {
    id: 14,
    name: 'Immunity Control',
    type: 'Passive',
    probability: 100,
    description: 'Provides immunity to control effects for up to 4 ally troops in a circular range for 6 seconds.',
    icon: getSkillIcon('Divine Protection'),
    effects: {
      immunitycontrol: true,
      buff: true
    }
  },
  {
    id: 15,
    name: 'Devastation',
    type: 'Active',
    probability: 100,
    description: 'Deals massive damage equal to 300% of basic attack damage to the target.',
    icon: getSkillIcon('Blow of Chaos'),
    effects: {
      devastation: true,
      directdamage: true
    }
  },
  {
    id: 16,
    name: 'Damage Reduction',
    type: 'Passive',
    probability: 100,
    description: 'Reduces damage taken by up to 4 ally troops in a circular range by 25% for 8 seconds.',
    icon: getSkillIcon('Divine Shield'),
    effects: {
      damagereduction: true,
      buff: true
    }
  },
  {
    id: 17,
    name: 'Retribution',
    type: 'Counterattack',
    probability: 100,
    description: 'When attacked, reflects 30% of the damage back to the attacker.',
    icon: getSkillIcon('Shield Reflector'),
    effects: {
      retribution: true,
      counterattack: true
    }
  },
  {
    id: 18,
    name: 'Lacerate',
    type: 'Command',
    probability: 100,
    description: 'Inflicts a deep wound on the target, causing them to bleed for 5 seconds with increased damage.',
    icon: getSkillIcon('Blood Eagle Punishment'),
    effects: {
      lacerate: true,
      bleed: true,
      debuff: true
    }
  },
  {
    id: 19,
    name: 'First Strike',
    type: 'Active',
    probability: 100,
    description: 'Deals damage equal to 200% of basic attack damage and has a 40% chance to inflict Silence for 2 seconds.',
    icon: getSkillIcon('First Strike'),
    effects: {
      directdamage: true,
      silence: true
    }
  },
  {
    id: 20,
    name: 'Enrage',
    type: 'Passive',
    probability: 100,
    description: 'Increases Attack of up to 4 ally troops in a circular range by 35% for 10 seconds. Also increases Rage generation by 50%.',
    icon: getSkillIcon('Enrage'),
    effects: {
      rage: true,
      buff: true
    }
  },
  {
    id: 21,
    name: 'Divine Blessing',
    type: 'Active',
    probability: 100,
    description: 'Restores Health of up to 4 ally troops in a circular range by 25% of max HP. Also removes all debuffs from affected troops.',
    icon: getSkillIcon('Divine Blessing'),
    effects: {
      heal: true,
      purify: true
    }
  },
  {
    id: 22,
    name: 'Odins Asylum',
    type: 'Passive',
    probability: 100,
    description: 'Provides immunity to control effects for up to 4 ally troops in a circular range for 6 seconds.',
    icon: getSkillIcon('Odins Asylum'),
    effects: {
      immunitycontrol: true,
      buff: true
    }
  },
  {
    id: 23,
    name: 'Rage Leech',
    type: 'Command',
    probability: 100,
    description: 'When deployed Troop performs a basic attack, there is a 20% chance to steal 50 Rage from the target.',
    icon: getSkillIcon('Rage Leech'),
    effects: {
      rage: true,
      basicattack: true
    }
  },
  {
    id: 24,
    name: 'Hymn of Life',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Hymn of Life'),
    effects: {
      heal: true,
      buff: true
    }
  },
  {
    id: 25,
    name: 'Rest and Counterattack',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Rest and Counterattack'),
    effects: {
      counterattack: true,
      heal: true
    }
  },
  {
    id: 26,
    name: 'Deadly Counterattack',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Deadly Counterattack'),
    effects: {
      counterattack: true,
      directdamage: true
    }
  },
  {
    id: 27,
    name: 'Retaliate',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Retaliate'),
    effects: {
      counterattack: true
    }
  },
  {
    id: 28,
    name: 'Siege',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Siege'),
    effects: {
      directdamage: true
    }
  },
  {
    id: 29,
    name: 'Silent Invasion',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Silent Invasion'),
    effects: {
      silence: true,
      directdamage: true
    }
  },
  {
    id: 30,
    name: 'Solitude',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Solitude'),
    effects: {
      buff: true
    }
  },
  {
    id: 31,
    name: 'Splinter',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Splinter'),
    effects: {
      directdamage: true
    }
  },
  {
    id: 32,
    name: 'Tenacity',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Tenacity'),
    effects: {
      buff: true
    }
  },
  {
    id: 33,
    name: 'This Too Shall Pass',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('This Too Shall Pass'),
    effects: {
      purify: true
    }
  },
  {
    id: 34,
    name: 'Thors Determination',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Thors Determination'),
    effects: {
      buff: true
    }
  },
  {
    id: 35,
    name: 'Tidal Attack',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Tidal Attack'),
    effects: {
      directdamage: true
    }
  },
  {
    id: 36,
    name: 'Trap of Despair',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Trap of Despair'),
    effects: {
      debuff: true
    }
  },
  {
    id: 37,
    name: 'Valkyries Gaze',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Valkyries Gaze'),
    effects: {
      buff: true
    }
  },
  {
    id: 38,
    name: 'Venom Aggregation',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Venom Aggregation'),
    effects: {
      poison: true
    }
  },
  {
    id: 39,
    name: 'Wild Indulgence',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Wild Indulgence'),
    effects: {
      rage: true
    }
  },
  {
    id: 40,
    name: 'Divine Shield',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Divine Shield'),
    effects: {
      shield: true,
      buff: true
    }
  },
  {
    id: 41,
    name: 'Blessed by Fate',
    type: 'N/A',
    probability: 0,
    description: 'Skill details coming soon.',
    icon: getSkillIcon('Blessed by Fate'),
    effects: {
      buff: true,
      blessing: true
    }
  }
];
