'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '../../../context/AdminContext';
import { Mount, MountSkill } from '@/types';

export default function EditMountPage() {
  const router = useRouter();
  const params = useParams();
  const { getMount, updateMount, deleteMount } = useAdmin();
  const mountId = params.id as string;
  
  const [formData, setFormData] = useState<Partial<Mount> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const mount = getMount(mountId);
    if (mount) {
      setFormData(mount);
    } else {
      router.push('/admin/mounts');
    }
  }, [mountId, getMount, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !formData.name || !formData.icon) {
      alert('Please fill in required fields (Name, Icon)');
      return;
    }
    updateMount(mountId, formData);
    router.push('/admin/mounts');
  };

  const handleDelete = () => {
    deleteMount(mountId);
    router.push('/admin/mounts');
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const addAwakenedSkill = () => {
    if (!formData) return;
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
    if (!formData) return;
    const skills = [...(formData.awakenedSkills || [])];
    skills[index] = { ...skills[index], [field]: value };
    updateField('awakenedSkills', skills);
  };

  const removeAwakenedSkill = (index: number) => {
    if (!formData) return;
    const skills = (formData.awakenedSkills || []).filter((_, i) => i !== index);
    updateField('awakenedSkills', skills);
  };

  if (!formData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-green-500">Edit Mount: {formData.name}</h1>
        <p className="text-gray-400">Update mount information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 border border-green-500/20 rounded-lg">
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
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
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
            <div>
              <label className="block text-sm text-gray-400 mb-2">Icon Path</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => updateField('icon', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Element</label>
              <select
                value={formData.element}
                onChange={(e) => updateField('element', e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
              >
                <option value="Life">Life</option>
                <option value="Light">Light</option>
                <option value="Fire">Fire</option>
                <option value="Ice">Ice</option>
                <option value="Destruction">Destruction</option>
                <option value="Darkness">Darkness</option>
              </select>
            </div>
            <div className="md:col-span-2">
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
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border border-green-500/20 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              Awakened Skills ({(formData.awakenedSkills || []).length}/2)
            </h2>
            {(formData.awakenedSkills || []).length < 2 && (
              <button
                type="button"
                onClick={addAwakenedSkill}
                className="px-4 py-2 bg-green-500/20 text-green-500 border border-green-500/50 rounded-lg hover:bg-green-500/30"
              >
                + Add Skill
              </button>
            )}
          </div>
          <div className="space-y-4">
            {(formData.awakenedSkills || []).map((skill, index) => (
              <div key={index} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-green-500">Skill {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeAwakenedSkill(index)}
                    className="px-3 py-1 bg-red-500/20 text-red-500 text-sm border border-red-500/50 rounded"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateAwakenedSkill(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Icon Path</label>
                    <input
                      type="text"
                      value={skill.iconDiamond}
                      onChange={(e) => updateAwakenedSkill(index, 'iconDiamond', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Probability (%)</label>
                    <input
                      type="number"
                      value={skill.probability || 0}
                      onChange={(e) => updateAwakenedSkill(index, 'probability', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      value={skill.description}
                      onChange={(e) => updateAwakenedSkill(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-3 bg-red-500/20 text-red-500 font-medium rounded-lg hover:bg-red-500/30 border border-red-500/50"
          >
            Delete Mount
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/mounts')}
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass-card p-6 border border-red-500/50 rounded-lg max-w-md">
            <h3 className="text-xl font-bold text-red-500 mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <strong>{formData.name}</strong>?
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
