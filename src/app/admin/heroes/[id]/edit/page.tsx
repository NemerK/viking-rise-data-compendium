'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useAdmin, DbHeroSkill, DbHeroTalent } from '../../../context/AdminContext';
import { Hero } from '@/types';
import ImageUploader from '../../../components/ImageUploader';

export default function EditHeroPage() {
  const router = useRouter();
  const params = useParams();
  const { 
    state, 
    loading,
    saving,
    updateHero, 
    deleteHero,
    getHeroSkills,
    getHeroTalents,
    updateHeroSkill,
    updateHeroTalent,
  } = useAdmin();
  
  const heroId = parseInt(params.id as string);
  const existingHero = state.heroes.find(h => h.id === heroId);
  
  const [formData, setFormData] = useState<Partial<Hero> | null>(null);
  const [skillsData, setSkillsData] = useState<{
    skill1: Partial<DbHeroSkill>;
    skill2: Partial<DbHeroSkill>;
    awakened: Partial<DbHeroSkill>;
  }>({
    skill1: { name: '', type: 'Active', probability: 100, description: '', icon: null },
    skill2: { name: '', type: 'Active', probability: 100, description: '', icon: null },
    awakened: { name: '', type: 'Active', probability: 100, description: '', icon: null },
  });
  const [talentsData, setTalentsData] = useState<{
    talent1: Partial<DbHeroTalent>;
    talent2: Partial<DbHeroTalent>;
    talent3: Partial<DbHeroTalent>;
  }>({
    talent1: { name: '', type: 'Passive', description: '', icon: null },
    talent2: { name: '', type: 'Passive', description: '', icon: null },
    talent3: { name: '', type: 'Passive', description: '', icon: null },
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load hero data
  useEffect(() => {
    if (existingHero) {
      setFormData({ ...existingHero });
      
      // Load skills from context
      const skills = getHeroSkills(heroId);
      const skill1 = skills.find(s => s.slot === 'skill1');
      const skill2 = skills.find(s => s.slot === 'skill2');
      const awakened = skills.find(s => s.slot === 'awakened');
      
      setSkillsData({
        skill1: skill1 || { name: '', type: 'Active', probability: 100, description: '', icon: null },
        skill2: skill2 || { name: '', type: 'Active', probability: 100, description: '', icon: null },
        awakened: awakened || { name: '', type: 'Active', probability: 100, description: '', icon: null },
      });
      
      // Load talents from context
      const talents = getHeroTalents(heroId);
      const talent1 = talents.find(t => t.slot === 'talent1');
      const talent2 = talents.find(t => t.slot === 'talent2');
      const talent3 = talents.find(t => t.slot === 'talent3');
      
      setTalentsData({
        talent1: talent1 || { name: '', type: 'Passive', description: '', icon: null },
        talent2: talent2 || { name: '', type: 'Passive', description: '', icon: null },
        talent3: talent3 || { name: '', type: 'Passive', description: '', icon: null },
      });
    }
  }, [existingHero, heroId, getHeroSkills, getHeroTalents]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading hero data...</p>
        </div>
      </div>
    );
  }

  if (!existingHero) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl text-red-500 mb-4">Hero Not Found</h1>
        <button
          onClick={() => router.push('/admin/heroes')}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Back to Heroes
        </button>
      </div>
    );
  }

  if (!formData) {
    return <div className="text-center py-12 text-gray-400">Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.portrait) {
      alert('Please fill in required fields (Name, Portrait)');
      return;
    }

    setSaveStatus('Saving...');
    
    try {
      // Update hero basic info
      await updateHero(heroId, formData as Hero);
      
      // Update skills (only if they have names)
      if (skillsData.skill1.name) {
        await updateHeroSkill(heroId, 'skill1', skillsData.skill1 as DbHeroSkill);
      }
      if (skillsData.skill2.name) {
        await updateHeroSkill(heroId, 'skill2', skillsData.skill2 as DbHeroSkill);
      }
      if (skillsData.awakened.name) {
        await updateHeroSkill(heroId, 'awakened', skillsData.awakened as DbHeroSkill);
      }
      
      // Update talents (only if they have names)
      if (talentsData.talent1.name) {
        await updateHeroTalent(heroId, 'talent1', talentsData.talent1 as DbHeroTalent);
      }
      if (talentsData.talent2.name) {
        await updateHeroTalent(heroId, 'talent2', talentsData.talent2 as DbHeroTalent);
      }
      if (talentsData.talent3.name) {
        await updateHeroTalent(heroId, 'talent3', talentsData.talent3 as DbHeroTalent);
      }

      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (err) {
      setSaveStatus('Error saving');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleDelete = async () => {
    const success = await deleteHero(heroId);
    if (success) {
      router.push('/admin/heroes');
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const updateSkill = (slot: 'skill1' | 'skill2' | 'awakened', field: keyof DbHeroSkill, value: any) => {
    setSkillsData(prev => ({
      ...prev,
      [slot]: { ...prev[slot], [field]: value }
    }));
  };

  const updateTalent = (slot: 'talent1' | 'talent2' | 'talent3', field: keyof DbHeroTalent, value: any) => {
    setTalentsData(prev => ({
      ...prev,
      [slot]: { ...prev[slot], [field]: value }
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={existingHero.portrait}
              alt={existingHero.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-amber-500">Edit: {existingHero.name}</h1>
            <p className="text-gray-400">Update hero info, skills &amp; talents</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus && (
            <span className={`text-sm ${saveStatus === 'Saved!' ? 'text-green-400' : saveStatus === 'Error saving' ? 'text-red-400' : 'text-gray-400'}`}>
              {saveStatus}
            </span>
          )}
          {saving && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500"></div>
          )}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-red-500 max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Delete {existingHero.name}?</h3>
            <p className="text-gray-400 mb-6">This will permanently delete the hero and all associated skills/talents from the database.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
                label="Portrait *"
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Name <span className="text-red-500">*</span></label>
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
                  value={formData.rarity || ''}
                  onChange={(e) => updateField('rarity', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="Legendary">Legendary</option>
                  <option value="Epic">Epic</option>
                  <option value="Common">Common</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Troop Type</label>
                <select
                  value={formData.herotype || ''}
                  onChange={(e) => updateField('herotype', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="Infantry">Infantry</option>
                  <option value="Archer">Archer</option>
                  <option value="Pikeman">Pikeman</option>
                  <option value="Leader">Leader</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Hero Class</label>
                <input
                  type="text"
                  value={formData.heroclass || ''}
                  onChange={(e) => updateField('heroclass', e.target.value)}
                  placeholder="e.g., Basic attacker"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Season</label>
                <select
                  value={formData.season || ''}
                  onChange={(e) => updateField('season', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="Base">Base</option>
                  <option value="S1">Season 1</option>
                  <option value="S2">Season 2</option>
                  <option value="S3">Season 3</option>
                  <option value="Valhalla">Valhalla</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Skills (Static - per hero) */}
        <div className="glass-card p-6 border border-purple-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-2">Hero Skills</h2>
          <p className="text-gray-500 text-sm mb-4">Hero&apos;s unique skills - upload icons from Cloudinary</p>
          
          <div className="space-y-4">
            {/* Skill 1 */}
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-purple-400 font-bold">Skill 1</span>
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Original</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ImageUploader
                    value={skillsData.skill1.icon || ''}
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
                      value={skillsData.skill1.name || ''}
                      onChange={(e) => updateSkill('skill1', 'name', e.target.value)}
                      placeholder="Skill name..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                    <select
                      value={skillsData.skill1.type || 'Active'}
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
                      value={skillsData.skill1.probability || 100}
                      onChange={(e) => updateSkill('skill1', 'probability', parseInt(e.target.value) || 0)}
                      placeholder="Prob %"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={skillsData.skill1.description || ''}
                    onChange={(e) => updateSkill('skill1', 'description', e.target.value)}
                    placeholder="Skill description..."
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
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Original</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ImageUploader
                    value={skillsData.skill2.icon || ''}
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
                      value={skillsData.skill2.name || ''}
                      onChange={(e) => updateSkill('skill2', 'name', e.target.value)}
                      placeholder="Skill name..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                    <select
                      value={skillsData.skill2.type || 'Active'}
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
                      value={skillsData.skill2.probability || 100}
                      onChange={(e) => updateSkill('skill2', 'probability', parseInt(e.target.value) || 0)}
                      placeholder="Prob %"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={skillsData.skill2.description || ''}
                    onChange={(e) => updateSkill('skill2', 'description', e.target.value)}
                    placeholder="Skill description..."
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
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Enhanced</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <ImageUploader
                    value={skillsData.awakened.icon || ''}
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
                      value={skillsData.awakened.name || ''}
                      onChange={(e) => updateSkill('awakened', 'name', e.target.value)}
                      placeholder="Awakened skill name..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <select
                      value={skillsData.awakened.type || 'Active'}
                      onChange={(e) => updateSkill('awakened', 'type', e.target.value)}
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Passive</option>
                      <option>Cooperation</option>
                      <option>Counterattack</option>
                      <option>Command</option>
                    </select>
                    <input
                      type="number"
                      value={skillsData.awakened.probability || 100}
                      onChange={(e) => updateSkill('awakened', 'probability', parseInt(e.target.value) || 0)}
                      placeholder="Prob %"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={skillsData.awakened.description || ''}
                    onChange={(e) => updateSkill('awakened', 'description', e.target.value)}
                    placeholder="Awakened skill description..."
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
          <p className="text-gray-500 text-sm mb-4">Each hero has 3 unique talents - upload icons from Cloudinary</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['talent1', 'talent2', 'talent3'] as const).map((slot, index) => (
              <div key={slot} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-400 font-bold">Talent {index + 1}</span>
                </div>
                <div className="flex flex-col items-center mb-3">
                  <ImageUploader
                    value={talentsData[slot].icon || ''}
                    onChange={(url) => updateTalent(slot, 'icon', url)}
                    folder="viking-rise/talents"
                    shape="circle"
                    size="small"
                    label="Icon"
                  />
                </div>
                <input
                  type="text"
                  value={talentsData[slot].name || ''}
                  onChange={(e) => updateTalent(slot, 'name', e.target.value)}
                  placeholder="Talent name..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none mb-2"
                />
                <select
                  value={talentsData[slot].type || 'Passive'}
                  onChange={(e) => updateTalent(slot, 'type', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none mb-2"
                >
                  <option>Passive</option>
                  <option>Cooperation</option>
                  <option>Counterattack</option>
                </select>
                <textarea
                  value={talentsData[slot].description || ''}
                  onChange={(e) => updateTalent(slot, 'description', e.target.value)}
                  placeholder="Talent description..."
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
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
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
