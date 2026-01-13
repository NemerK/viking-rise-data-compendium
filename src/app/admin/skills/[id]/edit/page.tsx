'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '../../../context/AdminContext';
import { Skill } from '@/types';
import ImageUploader from '../../../components/ImageUploader';

export default function EditSkillPage() {
  const router = useRouter();
  const params = useParams();
  const { getSkill, updateSkill, deleteSkill } = useAdmin();
  const skillId = params.id as string | number;
  
  const [formData, setFormData] = useState<Partial<Skill> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const skill = getSkill(skillId);
    if (skill) {
      setFormData(skill);
    } else {
      router.push('/admin/skills');
    }
  }, [skillId, getSkill, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !formData.name || !formData.description) {
      alert('Please fill in required fields (Name, Description)');
      return;
    }
    updateSkill(skillId, formData);
    router.push('/admin/skills');
  };

  const handleDelete = () => {
    deleteSkill(skillId);
    router.push('/admin/skills');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (!formData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-500">Edit Skill: {formData.name}</h1>
          <p className="text-gray-400">Update skill information</p>
        </div>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          🗑️ Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Icons & Basic Info */}
        <div className="glass-card p-6 border border-purple-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">📷 Skill Icons & Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-4">
              <ImageUploader
                value={formData.iconDiamond || ''}
                onChange={(url) => updateField('iconDiamond', url)}
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
                label="Regular Icon"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm text-gray-400 mb-2">ID</label>
                  <input
                    type="text"
                    value={formData.id}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400"
                    disabled
                  />
                </div>
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

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/skills')}
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass-card p-6 border border-red-500/50 rounded-lg max-w-md">
            <h3 className="text-xl font-bold text-red-500 mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <strong>{formData.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
