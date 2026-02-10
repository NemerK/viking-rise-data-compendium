'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '../../context/AdminContext';
import ImageUploader from '../../components/ImageUploader';

export default function NewSkillPage() {
  const router = useRouter();
  const { addSkill, saving } = useAdmin();
  const [saveStatus, setSaveStatus] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    iconRegular: '',
    iconDiamond: '',
    type: 'active',
    probability: 100,
    description: '',
    effects: {} as Record<string, boolean>,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      alert('Please fill in required fields (Name, Description)');
      return;
    }
    
    setSaveStatus('Creating...');
    const result = await addSkill({
      name: formData.name,
      icon: formData.iconDiamond || formData.icon,
      iconRegular: formData.iconRegular,
      iconDiamond: formData.iconDiamond,
      type: formData.type,
      probability: formData.probability,
      description: formData.description,
      isUnique: false,
      effects: formData.effects,
    });
    
    if (result) {
      setSaveStatus('Created!');
      router.push('/admin/skills');
    } else {
      setSaveStatus('Error creating skill');
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEffect = (effect: string) => {
    setFormData(prev => ({
      ...prev,
      effects: { ...prev.effects, [effect]: !prev.effects[effect] }
    }));
  };

  const effectOptions = [
    'burn', 'bleed', 'poison', 'retribution', 'slow', 'counterattack',
    'basicattack', 'shield', 'heal', 'rage', 'silence', 'disarm',
    'brokenblade', 'evasion', 'dispel', 'buff', 'debuff', 'directdamage',
    'immunitycontrol', 'purify', 'devastation', 'damagereduction', 'lacerate'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-purple-500">Add New Slottable Skill</h1>
        <p className="text-gray-400">Create a skill that can be equipped by any hero in slots 3 &amp; 4</p>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-300 text-sm">
          <strong>Note:</strong> This creates a slottable skill that any hero can equip. 
          Hero-specific skills (skill 1, skill 2, awakened) are managed on each hero&apos;s edit page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Icons & Basic Info */}
        <div className="glass-card p-6 border border-purple-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Skill Icon &amp; Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-4">
              <ImageUploader
                value={formData.iconDiamond || ''}
                onChange={(url) => {
                  updateField('iconDiamond', url);
                  if (!formData.icon) updateField('icon', url);
                }}
                folder="viking-rise/skills/diamond"
                shape="diamond"
                size="large"
                label="Diamond Icon"
              />
              <ImageUploader
                value={formData.iconRegular || ''}
                onChange={(url) => updateField('iconRegular', url)}
                folder="viking-rise/skills"
                shape="square"
                size="medium"
                label="Regular Icon (optional)"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => updateField('type', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="passive">Passive</option>
                    <option value="command">Command</option>
                    <option value="rage">Rage</option>
                    <option value="counterattack">Counterattack</option>
                    <option value="cooperation">Cooperation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Probability (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.probability}
                    onChange={(e) => updateField('probability', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Effects */}
        <div className="glass-card p-6 border border-purple-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Skill Effects</h2>
          <p className="text-gray-400 text-sm mb-4">Select all effects this skill provides:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {effectOptions.map((effect) => (
              <button
                key={effect}
                type="button"
                onClick={() => toggleEffect(effect)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.effects[effect]
                    ? 'bg-purple-500 text-white'
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
              onClick={() => router.push('/admin/skills')}
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Skill'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
