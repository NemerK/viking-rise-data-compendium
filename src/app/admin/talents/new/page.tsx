'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '../../context/AdminContext';
import { Talent } from '@/types';

export default function NewTalentPage() {
  const router = useRouter();
  const { addTalent } = useAdmin();
  
  const [formData, setFormData] = useState<Partial<Talent>>({
    id: `talent-${Date.now()}`,
    name: '',
    icon: '',
    description: '',
    levels: ['', '', '', '', ''], // 5 levels by default
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.icon) {
      alert('Please fill in required fields (Name, Icon)');
      return;
    }
    addTalent(formData as Talent);
    router.push('/admin/talents');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLevel = (index: number, value: string) => {
    const newLevels = [...(formData.levels || [])];
    newLevels[index] = value;
    updateField('levels', newLevels);
  };

  const addLevel = () => {
    updateField('levels', [...(formData.levels || []), '']);
  };

  const removeLevel = (index: number) => {
    if ((formData.levels?.length || 0) <= 1) return;
    const newLevels = (formData.levels || []).filter((_, i) => i !== index);
    updateField('levels', newLevels);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-500">Add New Talent</h1>
        <p className="text-gray-400">Create a new talent entry</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card p-6 border border-blue-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => updateField('id', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Unique identifier</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">
                Icon Path (Circular) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => updateField('icon', e.target.value)}
                placeholder="/images/talents/TalentName.png"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Path to circular talent icon</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">General Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                placeholder="Overall description of the talent..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Talent Levels */}
        <div className="glass-card p-6 border border-blue-500/20 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Talent Levels</h2>
            <button
              type="button"
              onClick={addLevel}
              className="px-4 py-2 bg-blue-500/20 text-blue-500 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              + Add Level
            </button>
          </div>
          <div className="space-y-4">
            {(formData.levels || []).map((level, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-500 font-bold">
                  L{index + 1}
                </div>
                <div className="flex-1">
                  <textarea
                    value={level}
                    onChange={(e) => updateLevel(index, e.target.value)}
                    placeholder={`Description for Level ${index + 1}...`}
                    rows={2}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>
                {(formData.levels?.length || 0) > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLevel(index)}
                    className="flex-shrink-0 px-3 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/talents')}
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors"
          >
            Create Talent
          </button>
        </div>
      </form>
    </div>
  );
}
