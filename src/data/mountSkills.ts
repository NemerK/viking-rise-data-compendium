// // import { MountSkill } from '../types/index';

// // Helper function to get mount skill icon
// function getMountSkillIcon(skillName: string): string {
//   // Map skill names to their image files
//   const imageMap: { [key: string]: string } = {
//     'Crippling Strike': 'Crippling-Strike.png',
//     'Firewing Ashes': 'Firewing-Ashes.png',
//     'Bonegnaw Bug': 'Bonegnaw-Bug.png',
//     'Pain N Fury': 'Pain-N-Fury.png',
//     'Abyssal Maw': 'Abyssal-Maw.png',
//     'Bone Spurs': 'Bone-Spurs.png',
//     'Hard Shell': 'Hard-Shell.png',
//     'Untamed Wilderness': 'Untamed-Wilderness.png',
//     'Flame Serpent': 'Flame-Serpent.png',
//     'Razor Fangs': 'Razor-Fangs.png',
//     'Teeth N Claws': 'Teeth-N-Claws.png',
//     'Dragon Venomfire': 'Dragon-Venomfire.png',
//     'Ragebeast Soul': 'Ragebeast-Soul.png',
//     'Retaliation Fangs': 'Retaliation-Fangs.png',
//     'Pincer Strike': 'Pincer-Strike.png',
//     'Spiritual Blessing': 'Spiritual-Blessing.png',
//     'Beastly Rage': 'Beastly-Rage.png',
//     'Shatterbone Bite': 'Shatterbone-Bite.png',
//     'Impenetrable Scales': 'Impenetrable-Scales.png',
//     'Power Swipe': 'Power-Swipe.png',
//     'Healing Leaf': 'Healing-Leaf.png',
//     'Hoof Strike': 'Hoof-Strike.png',
//     'Corrosive Claws': 'Corrosive-Claws.png',
//     'Purple-Gold Scales': 'Purple-Gold-Scales.png',
//     'Stinging Tongue': 'Stinging-Tongue.png',
//     'Razor Sharp Spikes': 'Razor-Sharp-Spikes.png',
//     'Soul of Fury': 'Soul-of-Fury.png',
//     'Bone-shatter Jaw': 'Bone-shatter-Jaw.png',
//     'Bladed Spines': 'Bladed-Spines.png',
//     'Sturdy Bone Armor': 'Sturdy-Bone-Armor.png',
//     'Strangled Death': 'Strangled-Death.png',
//     'Bloody Jaws': 'Bloody-Jaws.png',
//     'Bloodthirst Gaze': 'Bloodthirst-Gaze.png',
//     'Severing Strike': 'Severing-Strike.png',
//     'Frost Jotun Roar': 'Frost-Jotun-Roar.png',
//     'Emerald Scales': 'Emerald-Scales.png',
//     'Firedrake Soul': 'Firedrake-Soul.png',
//     'Flaming Claws': 'Flaming-Claws.png',
//     'Poison N Heal': 'Poison-N-Heal.png',
//     'Venom Rip': 'Venom-Rip.png',
//     'Venom Impact': 'Venom-Impact.png',
//     'Blazing Wolf Spirit': 'Blazing-Wolf-Spirit.png',
//     'Ravens Breath': 'Ravens-Breath.png',
//     'Deer Blessing': 'Deer-Blessing.png',
//     'Lava Beast': 'Lava-Beast.png',
//     'Toxic Fly': 'Toxic-Fly.png',
//     'Deer Judgement': 'Deer-Judgement.png',
//     'Ancient Insight': 'Ancient-Insight.png',
//     'Blazing Firebird': 'Blazing-Firebird.png',
//     'Toxic Spike': 'Toxic-Spike.png',
//     'Corrosive Poison': 'Corrosive-Poison.png',
//     'Golden Feather': 'Golden-Feather.png',
//     'Razor Armor': 'Razor-Armor.png',
//     'Roaring Waves': 'Roaring-Waves.png',
//     'Evil Threat': 'Evil-Threat.png',
//     'Winged Guardian': 'Winged-Guardian.png',
//     'Moonlit Howl': 'Moonlit-Howl.png',
//     'Armor Chant': 'Armor-Chant.png',
//     'Reptile Heal': 'Reptile-Heal.png',
//     'Destructive Clamp': 'Destructive-Clamp.png',
//     'Scaly Rebirth': 'Scaly-Rebirth.png',
//     'Marsh Reptile': 'Marsh-Reptile.png',
//     'Bloodthirsty Eye': 'Bloodthirsty-Eye.png',
//     'Manic Heal': 'Manic-Heal.png',
//     'Wolfus Gnaw': 'Wolfus-Gnaw.png',
//     'Ripping Claws': 'Ripping-Claws.png',
//     'Deer Redemption': 'Deer-Redemption.png',
//     'Slaughter N Heal': 'Slaughter-N-Heal.png',
//     'Spiked Shield': 'Spiked-Shield.png',
//     'Icedrake Breath': 'Icedrake-Breath.png',
//     'Frostwing Fury': 'Frostwing-Fury.png',
//     'Kraken Touch': 'Kraken-Touch.png',
//     'Fatal Chomp': 'Fatal-Chomp.png',
//     'Agonizing Frost': 'Agonizing-Frost.png',
//     'Divine Awe': 'Divine-Awe.png',
//     'Blessed Dew': 'Blessed-Dew.png',
//     'Icicle Armor': 'Icicle-Armor.png',
//     'Bloodwing Assault': 'Bloodwing-Assault.png',
//     'Biting Chill': 'Biting-Chill.png',
//     'Steel Scale': 'Steel-Scale.png',
//     'Bloodthirst Recovery': 'Bloodthirst-Recovery.png'
//   };

//   return `/images/mount-skills/${imageMap[skillName] || 'none.png'}`;
// }

// // Convert mount skills data to TypeScript format
// export const mountSkills: MountSkill[] = [
//   {
//     id: 1,
//     name: 'Crippling Strike',
//     type: 'Command',
//     elementTypes: ['Fire', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, deal direct damage (Damage Factor 780) 1 time to target every 6s.',
//     icon: getMountSkillIcon('Crippling Strike'),
//     effects: {
//       directdamage: true
//     }
//   },
//   {
//     id: 2,
//     name: 'Firewing Ashes',
//     type: 'Command',
//     elementTypes: ['Fire', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, Burning DMG dealt by deployed Troop is increased by 50 % for 2s every 6s.',
//     icon: getMountSkillIcon('Firewing Ashes'),
//     effects: {
//       burn: true
//     }
//   },
//   {
//     id: 3,
//     name: 'Bonegnaw Bug',
//     type: 'Command',
//     elementTypes: ['Fire', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, Poison DMG dealt by deployed Troop is increased by 50 % for 2s every 6s.',
//     icon: getMountSkillIcon('Bonegnaw Bug'),
//     effects: {
//       poison: true
//     }
//   },
//   {
//     id: 4,
//     name: 'Pain N Fury',
//     type: 'Command',
//     elementTypes: ['Fire', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, deployed Troop recovers 155 Rage every 6s.',
//     icon: getMountSkillIcon('Pain N Fury'),
//     effects: {
//       rage: true
//     }
//   },
//   {
//     id: 5,
//     name: 'Abyssal Maw',
//     type: 'Command',
//     elementTypes: ['Fire', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, every 6s, deployed Troops Basic Attack Damage is increased by 100 %, and Counterattack DMG is increased by 100 % for 2s',
//     icon: getMountSkillIcon('Abyssal Maw'),
//     effects: {
//       counterattack: true,
//       basicattack: true
//     }
//   },
//   {
//     id: 6,
//     name: 'Bone Spurs',
//     type: 'Command',
//     elementTypes: ['Fire', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, deployed Troops DMG is increased by 16 % for 2s every 6s.',
//     icon: getMountSkillIcon('Bone Spurs'),
//     effects: {
//       damageincrease: true
//     }
//   },
//   {
//     id: 7,
//     name: 'Hard Shell',
//     type: 'Command',
//     elementTypes: ['Fire', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, deployed Troop receives 32 % less damage for 1s every 6s.',
//     icon: getMountSkillIcon('Hard Shell'),
//     effects: {
//       damagereduction: true
//     }
//   },
//   {
//     id: 8,
//     name: 'Untamed Wilderness',
//     type: 'Command',
//     elementTypes: ['Fire', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, every 6s, deal direct damage (Damage Factor 390) 1 time to target, and recover 40 Rage to deployed Troop for 2s.',
//     icon: getMountSkillIcon('Untamed Wilderness'),
//     effects: {
//       rage: true,
//       directdamage: true
//     }
//   },
//   {
//     id: 9,
//     name: 'Flame Serpent',
//     type: 'Command',
//     elementTypes: ['Fire', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, every 6s, deal direct damage (Damage Factor 390) 1 time to target, and increase deployed Troops Burning DMG by 9 % for 2s.',
//     icon: getMountSkillIcon('Flame Serpent'),
//     effects: {
//       burn: true,
//       directdamage: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 10,
//     name: 'Razor Fangs',
//     type: 'Command',
//     elementTypes: ['Fire', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, every 6s, deal direct damage (Damage Factor 390) 1 time to target, and increase deployed Troops Poison DMG by 9 % for 2s.',
//     icon: getMountSkillIcon('Razor Fangs'),
//     effects: {
//       poison: true,
//       directdamage: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 11,
//     name: 'Teeth N Claws',
//     type: 'Command',
//     elementTypes: ['Fire', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, every 6s, deal direct damage (Damage Factor 390) 1 time to target, and increase deployed Troops DMG by 8 % for 2s.',
//     icon: getMountSkillIcon('Teeth N Claws'),
//     effects: {
//       directdamage: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 12,
//     name: 'Dragon Venomfire',
//     type: 'Command',
//     elementTypes: ['Fire', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Command Skill Critical Rate increases by 2 %. Upon entering battle, every 6s, deployed Troops Burning DMG is increased by 35 %, and Poison DMG increased by 35 % for 2s.',
//     icon: getMountSkillIcon('Dragon Venomfire'),
//     effects: {
//       burn: true,
//       poison: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 13,
//     name: 'Ragebeast Soul',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives Active Skill Damage, there is a 100 % chance for deployed Troop to recover 105 Rage. Triggers up to 2 times every 8s.',
//     icon: getMountSkillIcon('Ragebeast Soul'),
//     effects: {
//       rage: true
//     }
//   },
//   {
//     id: 14,
//     name: 'Retaliation Fangs',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives a basic attack, there is a 15 % chance to increase deployed Iroops Counterattack damage by 150 % for 2s. Triggers up to 1 time every 4s.',
//     icon: getMountSkillIcon('Retaliation Fangs'),
//     effects: {
//       counterattack: true
//     }
//   },
//   {
//     id: 15,
//     name: 'Pincer Strike',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives a basic attack, there is a 15 % chance to deal direct damage (Damage Factor 650) 1 time to target. Triggers up to 1 time every 4s.',
//     icon: getMountSkillIcon('Pincer Strike'),
//     effects: {
//       counterattack: true,
//       directdamage: true
//     }
//   },
//   {
//     id: 16,
//     name: 'Spiritual Blessing',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives a basic attack, there is a 15 % chance to increase deployed Troops healing by 40 % for 2s. Triggers up to 1 time every 4s.',
//     icon: getMountSkillIcon('Spiritual Blessing'),
//     effects: {
//       counterattack: true,
//       heal: true
//     }
//   },
//   {
//     id: 17,
//     name: 'Beastly Rage',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives a basic attack, there is a 15 % chance for deployed Troop to recover 125 Rage. Triggers up to 1 time every 4s.',
//     icon: getMountSkillIcon('Beastly Rage'),
//     effects: {
//       counterattack: true,
//       rage: true
//     }
//   },
//   {
//     id: 18,
//     name: 'Shatterbone Bite',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives a basic attack, there is a 15 % chance to increase deployed Troops DMG by 12.5 % for 2s. Triggers up to 1 time every 4s.',
//     icon: getMountSkillIcon('Shatterbone Bite'),
//     effects: {
//       counterattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 19,
//     name: 'Impenetrable Scales',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives a basic attack, there is a 15 % chance to decrease deployed Troops damage received by 12.5 % for 2s. Triggers up to 1 time every 4s.',
//     icon: getMountSkillIcon('Impenetrable Scales'),
//     effects: {
//       counterattack: true,
//       damagereduction: true
//     }
//   },
//   {
//     id: 20,
//     name: 'Power Swipe',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives Active Skill Damage, there is a 100 % chance to deal direct damage (Damage Factor 500) 1 time to target. Triggers up to 2 times every 8s.',
//     icon: getMountSkillIcon('Power Swipe'),
//     effects: {
//       counterattack: true,
//       directdamage: true
//     }
//   },
//   {
//     id: 21,
//     name: 'Healing Leaf',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives Active Skill Damage, there is a 100 % chance to increase deployed Troops healing by 32.5 % for 2s. Triggers up to 2 times every 8s.',
//     icon: getMountSkillIcon('Healing Leaf'),
//     effects: {
//       counterattack: true,
//       heal: true
//     }
//   },
//   {
//     id: 22,
//     name: 'Hoof Strike',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives Active Skill Damage, there is a 100 % chance to increase deployed Troops Counterattack damage by 125 % for 2s. Triggers up to 2 times every 8s.',
//     icon: getMountSkillIcon('Hoof Strike'),
//     effects: {
//       counterattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 23,
//     name: 'Corrosive Claws',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives Active Skill Damage, there is a 100 % chance to increase deployed Troops DMG by 10.5 % for 2s. Triggers up to 2 times every 8s.',
//     icon: getMountSkillIcon('Corrosive Claws'),
//     effects: {
//       counterattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 24,
//     name: 'Purple-Gold Scales',
//     type: 'Counterattack',
//     elementTypes: ['Light', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Counterattack Skill Critical Rate increases by 2 %. When deployed Troop receives Active Skill Damage, there is a 100 % chance to decrease deployed Troops damage received by 10.5 % for 2s. Triggers up to 2 times every 8s.',
//     icon: getMountSkillIcon('Purple-Gold Scales'),
//     effects: {
//       counterattack: true,
//       damagereduction: true
//     }
//   },
//   {
//     id: 25,
//     name: 'Stinging Tongue',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop launches a basic attack, there is a 15 % chance to deal direct damage (Damage Factor 865) 1 time to target.',
//     icon: getMountSkillIcon('Stinging Tongue'),
//     effects: {
//       basicattack: true,
//       directdamage: true
//     }
//   },
//   {
//     id: 26,
//     name: 'Razor Sharp Spikes',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop launches a basic attack, there is a 15 % chance to increase deployed Troops Bleeding DMG by 58 % for 2s.',
//     icon: getMountSkillIcon('Razor Sharp Spikes'),
//     effects: {
//       bleed: true,
//       basicattack: true
//     }
//   },
//   {
//     id: 27,
//     name: 'Soul of Fury',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop launches a basic attack, there is a 15 % chance for deployed Troop to recover 180 Rage.',
//     icon: getMountSkillIcon('Soul of Fury'),
//     effects: {
//       basicattack: true,
//       rage: true
//     }
//   },
//   {
//     id: 28,
//     name: 'Bone-shatter Jaw',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop launches a basic attack, there is a 15 % chance to increase deployed Troops Basic Attack Damage by 215 % for 2s.',
//     icon: getMountSkillIcon('Bone-shatter Jaw'),
//     effects: {
//       basicattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 29,
//     name: 'Bladed Spines',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop launches a basic attack, there is a 15 % chance to increase deployed Troops DMG bv 18 % for 2s.',
//     icon: getMountSkillIcon('Bladed Spines'),
//     effects: {
//       basicattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 30,
//     name: 'Sturdy Bone Armor',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop launches a basic attack, there is a 15 % chance to decrease deployed Troops damage received by 18 % for 2s.',
//     icon: getMountSkillIcon('Sturdy Bone Armor'),
//     effects: {
//       basicattack: true,
//       damagereduction: true
//     }
//   },
//   {
//     id: 31,
//     name: 'Strangled Death',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop releases an active skill, there is a 100 % chance to deal direct damage (DMG Factor 725) 1 time to target.',
//     icon: getMountSkillIcon('Strangled Death'),
//     effects: {
//       basicattack: true,
//       directdamage: true
//     }
//   },
//   {
//     id: 32,
//     name: 'Bloody Jaws',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop releases an active skill, there is a 100 % chance to increase deployed Troops Bleeding DMG by 47.5 % for 2s.',
//     icon: getMountSkillIcon('Bloody Jaws'),
//     effects: {
//       bleed: true,
//       basicattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 33,
//     name: 'Bloodthirst Gaze',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Darkness'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop releases an active skill, there is a 100 % chance for deployed Troop to recover 150 Rage.',
//     icon: getMountSkillIcon('Bloodthirst Gaze'),
//     effects: {
//       basicattack: true,
//       rage: true
//     }
//   },
//   {
//     id: 34,
//     name: 'Severing Strike',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop releases an active skill, there is a 100 % chance to increase deployed Troops Basic Attack Damaqe by 180 % for 2s.',
//     icon: getMountSkillIcon('Severing Strike'),
//     effects: {
//       basicattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 35,
//     name: 'Frost Jotun Roar',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Ice'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop releases an active skill, there is a 100 % chance to increase deployed Troops DMG by 15 % for 2s.',
//     icon: getMountSkillIcon('Frost Jotun Roar'),
//     effects: {
//       basicattack: true,
//       damageincrease: true
//     }
//   },
//   {
//     id: 36,
//     name: 'Emerald Scales',
//     type: 'Cooperation',
//     elementTypes: ['Life', 'Destruction'],
//     mountSkillSlot: 1,
//     probability: 100,
//     description: 'Deployed Troops Cooperation Skill Critical Rate increases by 2 %. When deployed Troop releases an active skill, there is a 100 % chance to decrease deployed Troops damage received by 15 % for 2s.',
//     icon: getMountSkillIcon('Emerald Scales'),
//     effects: {
//       basicattack: true,
//       damagereduction: true
//     }
//   }
// ];

// // Export default for easier importing
// export default mountSkills;
