-- Viking Rise Database Schema for Supabase
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- =====================================================
-- HEROES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS heroes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  portrait VARCHAR(500) NOT NULL,
  herotype VARCHAR(50),
  heroclass VARCHAR(100),
  rarity VARCHAR(20),
  season VARCHAR(20),
  
  -- Combat ability flags
  burn BOOLEAN DEFAULT FALSE,
  bleed BOOLEAN DEFAULT FALSE,
  poison BOOLEAN DEFAULT FALSE,
  retribution BOOLEAN DEFAULT FALSE,
  slow BOOLEAN DEFAULT FALSE,
  counterattack BOOLEAN DEFAULT FALSE,
  basicattack BOOLEAN DEFAULT FALSE,
  shield BOOLEAN DEFAULT FALSE,
  heal BOOLEAN DEFAULT FALSE,
  rage BOOLEAN DEFAULT FALSE,
  silence BOOLEAN DEFAULT FALSE,
  disarm BOOLEAN DEFAULT FALSE,
  brokenblade BOOLEAN DEFAULT FALSE,
  evasion BOOLEAN DEFAULT FALSE,
  dispel BOOLEAN DEFAULT FALSE,
  buff BOOLEAN DEFAULT FALSE,
  debuff BOOLEAN DEFAULT FALSE,
  directdamage BOOLEAN DEFAULT FALSE,
  immunitycontrol BOOLEAN DEFAULT FALSE,
  purify BOOLEAN DEFAULT FALSE,
  devastation BOOLEAN DEFAULT FALSE,
  damagereduction BOOLEAN DEFAULT FALSE,
  lacerate BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- HERO SKILLS TABLE (unique skills per hero)
-- =====================================================
CREATE TABLE IF NOT EXISTS hero_skills (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
  slot VARCHAR(20) NOT NULL CHECK (slot IN ('skill1', 'skill2', 'awakened')),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  probability INTEGER DEFAULT 100,
  description TEXT NOT NULL,
  icon VARCHAR(500),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(hero_id, slot)
);

-- =====================================================
-- HERO TALENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS hero_talents (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
  slot VARCHAR(20) NOT NULL CHECK (slot IN ('talent1', 'talent2', 'talent3')),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(500),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(hero_id, slot)
);

-- =====================================================
-- GENERAL SKILLS TABLE (obtainable skills)
-- =====================================================
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL,
  probability INTEGER DEFAULT 100,
  description TEXT NOT NULL,
  icon VARCHAR(500),
  icon_regular VARCHAR(500),
  icon_diamond VARCHAR(500),
  is_unique BOOLEAN DEFAULT FALSE,
  
  -- Effect flags
  burn BOOLEAN DEFAULT FALSE,
  bleed BOOLEAN DEFAULT FALSE,
  poison BOOLEAN DEFAULT FALSE,
  retribution BOOLEAN DEFAULT FALSE,
  slow BOOLEAN DEFAULT FALSE,
  counterattack BOOLEAN DEFAULT FALSE,
  basicattack BOOLEAN DEFAULT FALSE,
  shield BOOLEAN DEFAULT FALSE,
  heal BOOLEAN DEFAULT FALSE,
  rage BOOLEAN DEFAULT FALSE,
  silence BOOLEAN DEFAULT FALSE,
  disarm BOOLEAN DEFAULT FALSE,
  brokenblade BOOLEAN DEFAULT FALSE,
  evasion BOOLEAN DEFAULT FALSE,
  dispel BOOLEAN DEFAULT FALSE,
  buff BOOLEAN DEFAULT FALSE,
  debuff BOOLEAN DEFAULT FALSE,
  directdamage BOOLEAN DEFAULT FALSE,
  immunitycontrol BOOLEAN DEFAULT FALSE,
  purify BOOLEAN DEFAULT FALSE,
  devastation BOOLEAN DEFAULT FALSE,
  damagereduction BOOLEAN DEFAULT FALSE,
  lacerate BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES for faster queries
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_heroes_herotype ON heroes(herotype);
CREATE INDEX IF NOT EXISTS idx_heroes_heroclass ON heroes(heroclass);
CREATE INDEX IF NOT EXISTS idx_hero_skills_hero_id ON hero_skills(hero_id);
CREATE INDEX IF NOT EXISTS idx_hero_talents_hero_id ON hero_talents(hero_id);
CREATE INDEX IF NOT EXISTS idx_skills_type ON skills(type);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- Enable read access for everyone, write access for authenticated users
-- =====================================================

-- Enable RLS
ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access on heroes" ON heroes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on hero_skills" ON hero_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on hero_talents" ON hero_talents FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);

-- For now, also allow public insert/update/delete (you can restrict this later with auth)
CREATE POLICY "Allow public write access on heroes" ON heroes FOR ALL USING (true);
CREATE POLICY "Allow public write access on hero_skills" ON hero_skills FOR ALL USING (true);
CREATE POLICY "Allow public write access on hero_talents" ON hero_talents FOR ALL USING (true);
CREATE POLICY "Allow public write access on skills" ON skills FOR ALL USING (true);

-- =====================================================
-- AUTO-UPDATE timestamp trigger
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_heroes_updated_at BEFORE UPDATE ON heroes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
