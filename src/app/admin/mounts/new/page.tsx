'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '../../context/AdminContext';
import { Mount, MountSkill } from '@/types';
import ImageUploader from '../../components/ImageUploader';

export default function NewMountPage() {
  const router = useRouter();
  const { addMount } = useAdmin();
  
  const [formData, setFormData] = useState<Partial<Mount>>({
    id: `mount-${Date.now()}`,
    name: '',
    element: 'Life',
    troopBenefit: 'Infantry',
    icon: '',
    awakenedSkills: [],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.icon) {
      alert('Please fill in required fields (Name, Icon)');
      return;
    }
    addMount(formData as Mount);
    router.push('/admin/mounts');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAwakenedSkill = () => {
    const newSkill: MountSkill = {
      id: `mount-skill-${Date.now()}`,
      name: '',
      iconDiamond: '',
      description: '',
      probability: 0,
      mountId: formData.id || '',
    };
    updateField('awakenedSkills', [...(formData.awakenedSkills || []), newSkill]);
  };

  const updateAwakenedSkill = (index: number, field: string, value: any) => {
    const skills = [...(formData.awakenedSkills || [])];
    skills[index] = { ...skills[index], [field]: value };
    updateField('awakenedSkills', skills);
  };

  const removeAwakenedSkill = (index: number) => {
    const skills = (formData.awakenedSkills || []).filter((_, i) => i !== index);
    updateField('awakenedSkills', skills);
  };

  const elementColors: Record<string, string> = {
    Life: 'text-green-500',
    Light: 'text-yellow-500',
    Fire: 'text-red-500',
    Ice: 'text-cyan-500',
    Destruction: 'text-purple-500',
    Darkness: 'text-rose-500',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-500">Add New Mount</h1>
        <p className="text-gray-400">Create a new mount with awakened skills</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mount Info & Image */}
        <div className="glass-card p-6 border border-green-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">📷 Mount Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <ImageUploader
                value={formData.icon || ''}
                onChange={(url) => updateField('icon', url)}
                folder="viking-rise/mounts"
                shape="square"
                size="large"
                label="Mount Image *"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Element</label>
                  <select
                    value={formData.element}
                    onChange={(e) => updateField('element', e.target.value)}
                    className={`w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-green-500 focus:outline-none ${elementColors[formData.element || 'Life']}`}
                  >
                    <option value="Life" className="text-green-500">Life (Infantry)</option>
                    <option value="Light" className="text-yellow-500">Light (Pikeman)</option>
                    <option value="Fire" className="text-red-500">Fire (Archer)</option>
                    <option value="Ice" className="text-cyan-500">Ice (Skill Defense)</option>
                    <option value="Destruction" className="text-purple-500">Destruction (Skill Attack)</option>
                    <option value="Darkness" className="text-rose-500">Darkness (All Troops)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Troop Benefit</label>
                  <select
                    value={formData.troopBenefit}
                    onChange={(e) => updateField('troopBenefit', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  >
                    <option value="Infantry">Infantry</option>
                    <option value="Pikeman">Pikeman</option>
                    <option value="Archer">Archer</option>
                    <option value="Skill Defense">Reduce Skill Damage</option>
                    <option value="Skill Attack">Increase Skill Damage</option>
                    <option value="All Troops">All Troops</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={2}
                  placeholder="Mount description..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Awakened Skills */}
        <div className="glass-card p-6 border border-amber-500/20 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-500">
              ✨ Awakened Skills ({(formData.awakenedSkills || []).length}/2)
            </h2>
            {(formData.awakenedSkills || []).length < 2 && (
              <button
                type="button"
                onClick={addAwakenedSkill}
                className="px-4 py-2 bg-amber-500/20 text-amber-500 border border-amber-500/50 rounded-lg hover:bg-amber-500/30 transition-colors"
              >
                + Add Skill
              </button>
            )}
          </div>

          {(formData.awakenedSkills || []).length === 0 && (
            <p className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
              No awakened skills added yet. Add up to 2 skills.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(formData.awakenedSkills || []).map((skill, index) => (
              <div key={index} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-amber-500">Skill {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeAwakenedSkill(index)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    ✕ Remove
                  </button>
                </div>
                
                <div className="flex items-start gap-3">
                  <ImageUploader
                    value={skill.iconDiamond}
                    onChange={(url) => updateAwakenedSkill(index, 'iconDiamond', url)}
                    folder="viking-rise/mounts/skills"
                    shape="diamond"
                    size="small"
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateAwakenedSkill(index, 'name', e.target.value)}
                      placeholder="Skill name..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-400 self-center">Prob:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={skill.probability || 0}
                        onChange={(e) => updateAwakenedSkill(index, 'probability', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none"
                      />
                      <span className="text-xs text-gray-400 self-center">%</span>
                    </div>
                  </div>
                </div>
                
                <textarea
                  value={skill.description}
                  onChange={(e) => updateAwakenedSkill(index, 'description', e.target.value)}
                  rows={2}
                  placeholder="What this skill does..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/mounts')}
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors"
          >
            Create Mount
          </button>
        </div>
      </form>
    </div>
  );
}
