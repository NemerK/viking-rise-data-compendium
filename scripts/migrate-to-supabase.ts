/**
 * Migration script to populate Supabase with existing data
 * 
 * Run with: npx tsx scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import { heroes } from '../src/data/heroes';
import { skills } from '../src/data/skills';
import { HeroesSkillsAndTalents } from '../src/data/heroesskillsandtalents';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-project-url-here') {
  console.error('❌ Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateHeroes() {
  console.log('📦 Migrating heroes...');
  
  const heroData = heroes.map((hero: any) => ({
    id: hero.id,
    name: hero.name,
    portrait: hero.portrait,
    herotype: hero.herotype || null,
    heroclass: hero.heroclass || null,
    rarity: hero.rarity || null,
    season: hero.season || null,
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
  }));

  const { data, error } = await supabase
    .from('heroes')
    .upsert(heroData, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error migrating heroes:', error);
    return false;
  }
  
  console.log(`✅ Migrated ${heroData.length} heroes`);
  return true;
}

async function migrateHeroSkillsAndTalents() {
  console.log('📦 Migrating hero skills and talents...');
  
  const heroSkillsData: any[] = [];
  const heroTalentsData: any[] = [];

  HeroesSkillsAndTalents.forEach((hero: any) => {
    // Skill 1
    if (hero.skillonename) {
      heroSkillsData.push({
        hero_id: hero.id,
        slot: 'skill1',
        name: hero.skillonename,
        type: hero.skillonetype,
        probability: hero.skilloneprob || 100,
        description: hero.skillonedescr,
        icon: null,
      });
    }
    
    // Skill 2
    if (hero.skilltwoname) {
      heroSkillsData.push({
        hero_id: hero.id,
        slot: 'skill2',
        name: hero.skilltwoname,
        type: hero.skilltwotype,
        probability: typeof hero.skilltwoprob === 'string' ? parseInt(hero.skilltwoprob) : (hero.skilltwoprob || 100),
        description: hero.skilltwodescr,
        icon: null,
      });
    }
    
    // Awakened Skill
    if (hero.skillawakename) {
      heroSkillsData.push({
        hero_id: hero.id,
        slot: 'awakened',
        name: hero.skillawakename,
        type: hero.skillawaketype,
        probability: hero.skillawakeprob || 100,
        description: hero.skillawakedescr,
        icon: null,
      });
    }

    // Talent 1
    if (hero.talentonename) {
      heroTalentsData.push({
        hero_id: hero.id,
        slot: 'talent1',
        name: hero.talentonename,
        type: hero.talentonetype,
        description: hero.talentonedescr,
        icon: null,
      });
    }
    
    // Talent 2
    if (hero.talenttwoname) {
      heroTalentsData.push({
        hero_id: hero.id,
        slot: 'talent2',
        name: hero.talenttwoname,
        type: hero.talentwotype,
        description: hero.talenttwodescr,
        icon: null,
      });
    }
    
    // Talent 3
    if (hero.talentthreename) {
      heroTalentsData.push({
        hero_id: hero.id,
        slot: 'talent3',
        name: hero.talentthreename,
        type: hero.talentthreetype,
        description: hero.talentthreedescr,
        icon: null,
      });
    }
  });

  // Insert hero skills
  const { error: skillsError } = await supabase
    .from('hero_skills')
    .upsert(heroSkillsData, { onConflict: 'hero_id,slot' });

  if (skillsError) {
    console.error('❌ Error migrating hero skills:', skillsError);
    return false;
  }
  console.log(`✅ Migrated ${heroSkillsData.length} hero skills`);

  // Insert hero talents
  const { error: talentsError } = await supabase
    .from('hero_talents')
    .upsert(heroTalentsData, { onConflict: 'hero_id,slot' });

  if (talentsError) {
    console.error('❌ Error migrating hero talents:', talentsError);
    return false;
  }
  console.log(`✅ Migrated ${heroTalentsData.length} hero talents`);
  
  return true;
}

async function migrateSkills() {
  console.log('📦 Migrating general skills...');
  
  const skillsData = skills.map((skill: any) => ({
    id: skill.id,
    name: skill.name,
    type: skill.type,
    probability: skill.probability || 100,
    description: skill.description,
    icon: skill.icon || null,
    icon_regular: skill.iconRegular || null,
    icon_diamond: skill.iconDiamond || null,
    is_unique: skill.isUnique || false,
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
  }));

  const { data, error } = await supabase
    .from('skills')
    .upsert(skillsData, { onConflict: 'id' });

  if (error) {
    console.error('❌ Error migrating skills:', error);
    return false;
  }
  
  console.log(`✅ Migrated ${skillsData.length} skills`);
  return true;
}

async function main() {
  console.log('🚀 Starting migration to Supabase...\n');
  console.log(`   URL: ${supabaseUrl}\n`);

  const heroesSuccess = await migrateHeroes();
  if (!heroesSuccess) return;

  const skillsTalentsSuccess = await migrateHeroSkillsAndTalents();
  if (!skillsTalentsSuccess) return;

  const skillsSuccess = await migrateSkills();
  if (!skillsSuccess) return;

  console.log('\n🎉 Migration completed successfully!');
  console.log('\nYou can now view your data in the Supabase dashboard:');
  console.log(`   ${supabaseUrl.replace('.supabase.co', '.supabase.co/project/default/editor')}`);
}

main().catch(console.error);
