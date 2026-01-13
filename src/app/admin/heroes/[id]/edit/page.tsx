'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '../../../context/AdminContext';
import { Hero, HeroTalent, HeroUniqueSkill, HeroAwakenedSkill } from '@/types';
import ImageUploader from '../../../components/ImageUploader';

const emptyTalent: HeroTalent = { name: '', icon: '', description: '' };
const emptyUniqueSkill: HeroUniqueSkill = { name: '', icon: '', type: 'active', probability: 0, description: '' };
const emptyAwakenedSkill: HeroAwakenedSkill = { name: '', icon: '', description: '' };

export default function EditHeroPage() {
  const router = useRouter();
  const params = useParams();
  const { state, updateHero, deleteHero } = useAdmin();
  
  const heroId = parseInt(params.id as string);
  const existingHero = state.heroes.find(h => h.id === heroId);
  
  const [formData, setFormData] = useState<Partial<Hero> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (existingHero) {
      setFormData({
        ...existingHero,
        talent1: existingHero.talent1 || { ...emptyTalent },
        talent2: existingHero.talent2 || { ...emptyTalent },
        talent3: existingHero.talent3 || { ...emptyTalent },
        uniqueSkill1: existingHero.uniqueSkill1 || { ...emptyUniqueSkill },
        uniqueSkill2: existingHero.uniqueSkill2 || { ...emptyUniqueSkill },
        awakenedSkill: existingHero.awakenedSkill || { ...emptyAwakenedSkill },
      });
    }
  }, [existingHero]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.portrait) {
      alert('Please fill in required fields (Name, Portrait)');
      return;
    }
    updateHero(heroId, formData as Hero);
    router.push('/admin/heroes');
  };

  const handleDelete = () => {
    deleteHero(heroId);
    router.push('/admin/heroes');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const updateTalent = (talentNum: 1 | 2 | 3, field: keyof HeroTalent, value: string) => {
    const key = `talent${talentNum}` as const;
    setFormData(prev => prev ? {
      ...prev,
      [key]: { ...(prev[key] as HeroTalent || emptyTalent), [field]: value }
    } : null);
  };

  const updateUniqueSkill = (skillNum: 1 | 2, field: keyof HeroUniqueSkill, value: string | number) => {
    const key = `uniqueSkill${skillNum}` as const;
    setFormData(prev => prev ? {
      ...prev,
      [key]: { ...(prev[key] as HeroUniqueSkill || emptyUniqueSkill), [field]: value }
    } : null);
  };

  const updateAwakenedSkill = (field: keyof HeroAwakenedSkill, value: string) => {
    setFormData(prev => prev ? {
      ...prev,
      awakenedSkill: { ...(prev.awakenedSkill || emptyAwakenedSkill), [field]: value }
    } : null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-amber-500">Edit Hero: {existingHero.name}</h1>
          <p className="text-gray-400">Update hero information, talents, and skills</p>
        </div>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          🗑️ Delete Hero
        </button>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-red-500 max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Delete {existingHero.name}?</h3>
            <p className="text-gray-400 mb-6">This action cannot be undone. The hero and all associated data will be permanently removed.</p>
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
          <h2 className="text-xl font-bold text-white mb-4">📷 Hero Portrait & Basic Info</h2>
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
                  <option value="Legendary">Legendary (Yellow)</option>
                  <option value="Epic">Epic (Purple)</option>
                  <option value="Common">Common (Blue)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Season</label>
                <select
                  value={formData.season}
                  onChange={(e) => updateField('season', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Base">Base (No Label)</option>
                  <option value="S1">Season 1</option>
                  <option value="S2">Season 2</option>
                  <option value="S3">Season 3</option>
                  <option value="Sx">Season X</option>
                  <option value="Valhalla">Valhalla</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="glass-card p-6 border border-amber-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">🏷️ Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Troop Type</label>
              <select
                value={formData.troopType}
                onChange={(e) => updateField('troopType', e.target.value)}
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
              <label className="block text-sm text-gray-400 mb-2">Specialty</label>
              <select
                value={formData.specialty}
                onChange={(e) => updateField('specialty', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="PvP">PvP</option>
                <option value="Gathering">Gathering</option>
                <option value="Jungler">Jungler</option>
                <option value="Polymath">Polymath</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Excellence</label>
              <select
                value={formData.excellence}
                onChange={(e) => updateField('excellence', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="Counterattack">Counterattack</option>
                <option value="Skills">Skills</option>
                <option value="Support">Support</option>
                <option value="Mount Development">Mount Development</option>
                <option value="Basic Attack">Basic Attack</option>
                <option value="Defence">Defence</option>
              </select>
            </div>
          </div>
        </div>

        {/* Talents */}
        <div className="glass-card p-6 border border-blue-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-blue-500 mb-4">🎯 Hero Talents (3)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => {
              const talent = formData[`talent${num}` as keyof typeof formData] as HeroTalent || emptyTalent;
              return (
                <div key={num} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <ImageUploader
                      value={talent.icon}
                      onChange={(url) => updateTalent(num as 1 | 2 | 3, 'icon', url)}
                      folder="viking-rise/talents"
                      shape="circle"
                      size="small"
                    />
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Talent {num} Name</label>
                      <input
                        type="text"
                        value={talent.name}
                        onChange={(e) => updateTalent(num as 1 | 2 | 3, 'name', e.target.value)}
                        placeholder="Talent name..."
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      value={talent.description}
                      onChange={(e) => updateTalent(num as 1 | 2 | 3, 'description', e.target.value)}
                      placeholder="What this talent does..."
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unique Skills */}
        <div className="glass-card p-6 border border-purple-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-purple-500 mb-4">⚔️ Unique Skills (2)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((num) => {
              const skill = formData[`uniqueSkill${num}` as keyof typeof formData] as HeroUniqueSkill || emptyUniqueSkill;
              return (
                <div key={num} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <ImageUploader
                      value={skill.icon}
                      onChange={(url) => updateUniqueSkill(num as 1 | 2, 'icon', url)}
                      folder="viking-rise/skills"
                      shape="diamond"
                      size="medium"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Skill {num} Name</label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateUniqueSkill(num as 1 | 2, 'name', e.target.value)}
                          placeholder="Skill name..."
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Type</label>
                          <select
                            value={skill.type}
                            onChange={(e) => updateUniqueSkill(num as 1 | 2, 'type', e.target.value)}
                            className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                          >
                            <option value="active">Active</option>
                            <option value="passive">Passive</option>
                            <option value="command">Command</option>
                            <option value="rage">Rage</option>
                            <option value="counterattack">Counter</option>
                            <option value="cooperation">Coop</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Prob %</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.probability}
                            onChange={(e) => updateUniqueSkill(num as 1 | 2, 'probability', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      value={skill.description}
                      onChange={(e) => updateUniqueSkill(num as 1 | 2, 'description', e.target.value)}
                      placeholder="What this skill does..."
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Awakened Skill */}
        <div className="glass-card p-6 border border-amber-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-amber-500 mb-4">✨ Awakened Skill</h2>
          <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <div className="flex items-start gap-4">
              <ImageUploader
                value={formData.awakenedSkill?.icon || ''}
                onChange={(url) => updateAwakenedSkill('icon', url)}
                folder="viking-rise/skills/awakened"
                shape="diamond"
                size="medium"
              />
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Awakened Skill Name</label>
                  <input
                    type="text"
                    value={formData.awakenedSkill?.name || ''}
                    onChange={(e) => updateAwakenedSkill('name', e.target.value)}
                    placeholder="Awakened skill name..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea
                    value={formData.awakenedSkill?.description || ''}
                    onChange={(e) => updateAwakenedSkill('description', e.target.value)}
                    placeholder="Enhanced effect when awakened..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
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
            className="px-6 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
