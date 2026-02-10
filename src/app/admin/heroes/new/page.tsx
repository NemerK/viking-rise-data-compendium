'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin, DbHeroSkill, DbHeroTalent } from '../../context/AdminContext';
import ImageUploader from '../../components/ImageUploader';

export default function NewHeroPage() {
  const router = useRouter();
  const { addHero, updateHeroSkill, updateHeroTalent, saving } = useAdmin();
  const [saveStatus, setSaveStatus] = useState<string>('');
  
  // Basic hero info
  const [formData, setFormData] = useState({
    name: '',
    portrait: '',
    herotype: 'Infantry',
    heroclass: 'PvP',
    rarity: 'Legendary',
    season: 'Base',
    // Effect flags
    burn: false,
    bleed: false,
    poison: false,
    retribution: false,
    slow: false,
    counterattack: false,
    basicattack: false,
    shield: false,
    heal: false,
    rage: false,
    silence: false,
    disarm: false,
    brokenblade: false,
    evasion: false,
    dispel: false,
    buff: false,
    debuff: false,
    directdamage: false,
    immunitycontrol: false,
    purify: false,
    devastation: false,
    damagereduction: false,
    lacerate: false,
  });

  // Skills with icons
  const [skillsData, setSkillsData] = useState({
    skill1: { name: '', type: 'Active', probability: 100, description: '', icon: '' },
    skill2: { name: '', type: 'Active', probability: 100, description: '', icon: '' },
    awakened: { name: '', type: 'Passive', probability: 100, description: '', icon: '' },
  });

  // Talents with icons
  const [talentsData, setTalentsData] = useState({
    talent1: { name: '', type: 'Passive', description: '', icon: '' },
    talent2: { name: '', type: 'Passive', description: '', icon: '' },
    talent3: { name: '', type: 'Passive', description: '', icon: '' },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.portrait) {
      alert('Please fill in required fields (Name, Portrait)');
      return;
    }
    
    setSaveStatus('Creating hero...');
    
    const newHero = await addHero({
      name: formData.name,
      portrait: formData.portrait,
      herotype: formData.herotype,
      heroclass: formData.heroclass,
      rarity: formData.rarity,
      season: formData.season,
      burn: formData.burn,
      bleed: formData.bleed,
      poison: formData.poison,
      retribution: formData.retribution,
      slow: formData.slow,
      counterattack: formData.counterattack,
      basicattack: formData.basicattack,
      shield: formData.shield,
      heal: formData.heal,
      rage: formData.rage,
      silence: formData.silence,
      disarm: formData.disarm,
      brokenblade: formData.brokenblade,
      evasion: formData.evasion,
      dispel: formData.dispel,
      buff: formData.buff,
      debuff: formData.debuff,
      directdamage: formData.directdamage,
      immunitycontrol: formData.immunitycontrol,
      purify: formData.purify,
      devastation: formData.devastation,
      damagereduction: formData.damagereduction,
      lacerate: formData.lacerate,
    });
    
    if (!newHero) {
      setSaveStatus('Error creating hero');
      return;
    }
    
    setSaveStatus('Saving skills...');
    
    if (skillsData.skill1.name) {
      await updateHeroSkill(newHero.id, 'skill1', {
        ...skillsData.skill1,
        icon: skillsData.skill1.icon || null,
      } as DbHeroSkill);
    }
    if (skillsData.skill2.name) {
      await updateHeroSkill(newHero.id, 'skill2', {
        ...skillsData.skill2,
        icon: skillsData.skill2.icon || null,
      } as DbHeroSkill);
    }
    if (skillsData.awakened.name) {
      await updateHeroSkill(newHero.id, 'awakened', {
        ...skillsData.awakened,
        icon: skillsData.awakened.icon || null,
      } as DbHeroSkill);
    }
    
    setSaveStatus('Saving talents...');
    
    if (talentsData.talent1.name) {
      await updateHeroTalent(newHero.id, 'talent1', {
        ...talentsData.talent1,
        icon: talentsData.talent1.icon || null,
      } as DbHeroTalent);
    }
    if (talentsData.talent2.name) {
      await updateHeroTalent(newHero.id, 'talent2', {
        ...talentsData.talent2,
        icon: talentsData.talent2.icon || null,
      } as DbHeroTalent);
    }
    if (talentsData.talent3.name) {
      await updateHeroTalent(newHero.id, 'talent3', {
        ...talentsData.talent3,
        icon: talentsData.talent3.icon || null,
      } as DbHeroTalent);
    }
    
    setSaveStatus('Created!');
    router.push('/admin/heroes');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSkill = (slot: 'skill1' | 'skill2' | 'awakened', field: string, value: any) => {
    setSkillsData(prev => ({
      ...prev,
      [slot]: { ...prev[slot], [field]: value }
    }));
  };

  const updateTalent = (slot: 'talent1' | 'talent2' | 'talent3', field: string, value: any) => {
    setTalentsData(prev => ({
      ...prev,
      [slot]: { ...prev[slot], [field]: value }
    }));
  };

  const effectFlags = [
    'burn', 'bleed', 'poison', 'retribution', 'slow', 'counterattack',
    'basicattack', 'shield', 'heal', 'rage', 'silence', 'disarm',
    'brokenblade', 'evasion', 'dispel', 'buff', 'debuff', 'directdamage',
    'immunitycontrol', 'purify', 'devastation', 'damagereduction', 'lacerate'
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-500">Add New Hero</h1>
        <p className="text-gray-400">Create a new hero with skills and talents</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Portrait & Basic Info */}
        <div className="glass-card p-6 border border-amber-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <ImageUploader
                value={formData.portrait || ''}
                onChange={(url) => updateField('portrait', url)}
                folder="viking-rise/heroes"
                shape="square"
                size="large"
                label="Hero Portrait *"
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Rarity</label>
                <select
                  value={formData.rarity}
                  onChange={(e) => updateField('rarity', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Legendary">Legendary</option>
                  <option value="Epic">Epic</option>
                  <option value="Common">Common</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Season</label>
                <select
                  value={formData.season}
                  onChange={(e) => updateField('season', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Base">Base</option>
                  <option value="S1">Season 1</option>
                  <option value="S2">Season 2</option>
                  <option value="S3">Season 3</option>
                  <option value="Sx">Season X</option>
                  <option value="Valhalla">Valhalla</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Hero Type</label>
                <select
                  value={formData.herotype}
                  onChange={(e) => updateField('herotype', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Infantry">Infantry</option>
                  <option value="Archer">Archer</option>
                  <option value="Pikeman">Pikeman</option>
                  <option value="Leader">Leader</option>
                  <option value="Porter">Porter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Hero Class</label>
                <select
                  value={formData.heroclass}
                  onChange={(e) => updateField('heroclass', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="PvP">PvP</option>
                  <option value="Gathering">Gathering</option>
                  <option value="Jungler">Jungler</option>
                  <option value="Polymath">Polymath</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Skills */}
        <div className="glass-card p-6 border border-purple-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-2">Hero Skills</h2>
          <p className="text-gray-500 text-sm mb-4">Skills unique to this hero - upload icons from Cloudinary</p>
          
          <div className="space-y-4">
            {/* Skill 1 */}
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-purple-400 font-bold">Skill 1</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ImageUploader
                    value={skillsData.skill1.icon}
                    onChange={(url) => updateSkill('skill1', 'icon', url)}
                    folder="viking-rise/skills"
                    shape="diamond"
                    size="medium"
                    label="Icon"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={skillsData.skill1.name}
                      onChange={(e) => updateSkill('skill1', 'name', e.target.value)}
                      placeholder="Skill name"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                    <select
                      value={skillsData.skill1.type}
                      onChange={(e) => updateSkill('skill1', 'type', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Passive</option>
                      <option>Cooperation</option>
                      <option>Counterattack</option>
                      <option>Command</option>
                    </select>
                    <input
                      type="number"
                      value={skillsData.skill1.probability}
                      onChange={(e) => updateSkill('skill1', 'probability', parseInt(e.target.value) || 0)}
                      placeholder="Probability %"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={skillsData.skill1.description}
                    onChange={(e) => updateSkill('skill1', 'description', e.target.value)}
                    placeholder="Description..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Skill 2 */}
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-purple-400 font-bold">Skill 2</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ImageUploader
                    value={skillsData.skill2.icon}
                    onChange={(url) => updateSkill('skill2', 'icon', url)}
                    folder="viking-rise/skills"
                    shape="diamond"
                    size="medium"
                    label="Icon"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={skillsData.skill2.name}
                      onChange={(e) => updateSkill('skill2', 'name', e.target.value)}
                      placeholder="Skill name"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                    <select
                      value={skillsData.skill2.type}
                      onChange={(e) => updateSkill('skill2', 'type', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Passive</option>
                      <option>Cooperation</option>
                      <option>Counterattack</option>
                      <option>Command</option>
                    </select>
                    <input
                      type="number"
                      value={skillsData.skill2.probability}
                      onChange={(e) => updateSkill('skill2', 'probability', parseInt(e.target.value) || 0)}
                      placeholder="Probability %"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={skillsData.skill2.description}
                    onChange={(e) => updateSkill('skill2', 'description', e.target.value)}
                    placeholder="Description..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Awakened Skill */}
            <div className="p-4 bg-amber-500/5 border border-amber-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400 font-bold">Awakened Skill</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ImageUploader
                    value={skillsData.awakened.icon}
                    onChange={(url) => updateSkill('awakened', 'icon', url)}
                    folder="viking-rise/skills/awakened"
                    shape="diamond"
                    size="medium"
                    label="Icon"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={skillsData.awakened.name}
                      onChange={(e) => updateSkill('awakened', 'name', e.target.value)}
                      placeholder="Awakened skill name"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <select
                      value={skillsData.awakened.type}
                      onChange={(e) => updateSkill('awakened', 'type', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                    >
                      <option>Passive</option>
                      <option>Active</option>
                    </select>
                    <input
                      type="number"
                      value={skillsData.awakened.probability}
                      onChange={(e) => updateSkill('awakened', 'probability', parseInt(e.target.value) || 0)}
                      placeholder="Probability %"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={skillsData.awakened.description}
                    onChange={(e) => updateSkill('awakened', 'description', e.target.value)}
                    placeholder="Description..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Talents */}
        <div className="glass-card p-6 border border-blue-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-blue-400 mb-2">Hero Talents</h2>
          <p className="text-gray-500 text-sm mb-4">Talents unique to this hero - upload icons from Cloudinary</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['talent1', 'talent2', 'talent3'] as const).map((slot, idx) => (
              <div key={slot} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-400 font-bold">Talent {idx + 1}</span>
                </div>
                <div className="flex flex-col items-center mb-3">
                  <ImageUploader
                    value={talentsData[slot].icon}
                    onChange={(url) => updateTalent(slot, 'icon', url)}
                    folder="viking-rise/talents"
                    shape="circle"
                    size="small"
                    label="Icon"
                  />
                </div>
                <input
                  type="text"
                  value={talentsData[slot].name}
                  onChange={(e) => updateTalent(slot, 'name', e.target.value)}
                  placeholder="Talent name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none mb-2"
                />
                <select
                  value={talentsData[slot].type}
                  onChange={(e) => updateTalent(slot, 'type', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none mb-2"
                >
                  <option>Passive</option>
                  <option>Cooperation</option>
                  <option>Counterattack</option>
                </select>
                <textarea
                  value={talentsData[slot].description}
                  onChange={(e) => updateTalent(slot, 'description', e.target.value)}
                  placeholder="Description..."
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Effect Flags */}
        <div className="glass-card p-6 border border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Effect Flags</h2>
          <p className="text-gray-400 text-sm mb-4">Select effects this hero&apos;s skills provide (for filtering):</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {effectFlags.map((effect) => (
              <button
                key={effect}
                type="button"
                onClick={() => updateField(effect, !formData[effect as keyof typeof formData])}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData[effect as keyof typeof formData]
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {effect}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {saveStatus && (
              <span className={saveStatus.includes('Error') ? 'text-red-400' : 'text-green-400'}>
                {saveStatus}
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/heroes')}
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Hero'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
