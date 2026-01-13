'use client';

import { useState } from 'react';

export default function ImagesPage() {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const imageStructure = [
    {
      folder: 'heroes',
      path: '/images/heroes/',
      description: 'Hero portraits (regular)',
      examples: ['Ragnar.png', 'Bjorn.png', 'Lagertha.png'],
    },
    {
      folder: 'heroes/diamond',
      path: '/images/heroes/diamond/',
      description: 'Hero portraits (diamond shape)',
      examples: ['Ragnar.png', 'Bjorn.png'],
    },
    {
      folder: 'skills',
      path: '/images/skills/',
      description: 'Skill icons (regular)',
      examples: ['First-strike.png', 'Shield-Support.png'],
    },
    {
      folder: 'skills/diamond',
      path: '/images/skills/diamond/',
      description: 'Skill icons (diamond shape)',
      examples: ['First-strike.png', 'Shield-Support.png'],
    },
    {
      folder: 'skills/Small',
      path: '/images/skills/Small/',
      description: 'Skill icons (small versions)',
      examples: ['First-strike.png'],
    },
    {
      folder: 'talents',
      path: '/images/talents/',
      description: 'Talent icons (circular)',
      examples: ['TalentName.png'],
    },
    {
      folder: 'mounts',
      path: '/images/mounts/',
      description: 'Mount icons',
      examples: ['MountName.png'],
    },
    {
      folder: 'mounts/skills',
      path: '/images/mounts/skills/',
      description: 'Mount skill icons (diamond)',
      examples: ['SkillName.png'],
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-500">Image Management</h1>
        <p className="text-gray-400">Organize and validate your image files</p>
      </div>

      {/* Instructions */}
      <div className="glass-card p-6 border border-blue-500/20 rounded-lg">
        <h2 className="text-xl font-bold text-blue-500 mb-4">📘 How to Add Images</h2>
        <div className="space-y-3 text-gray-300">
          <div>
            <strong className="text-white">1. Screenshot the Image:</strong>
            <p className="text-sm">Open Viking Rise, screenshot the hero/skill/talent/mount icon you need.</p>
          </div>
          <div>
            <strong className="text-white">2. Save to Correct Folder:</strong>
            <p className="text-sm">Save the image to the appropriate folder shown below (in your local project).</p>
          </div>
          <div>
            <strong className="text-white">3. Use Proper Naming:</strong>
            <p className="text-sm">Name the file using the exact hero/skill name (e.g., <code className="bg-gray-800 px-2 py-1 rounded">Ragnar.png</code>).</p>
          </div>
          <div>
            <strong className="text-white">4. Copy Path:</strong>
            <p className="text-sm">Click "Copy Path" below and paste it into the admin form.</p>
          </div>
          <div>
            <strong className="text-white">5. Commit to GitHub:</strong>
            <p className="text-sm">After adding all images, commit them to GitHub along with your data exports.</p>
          </div>
        </div>
      </div>

      {/* Image Directory Structure */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📁 Image Directory Structure</h2>
        {imageStructure.map((folder) => (
          <div
            key={folder.folder}
            className="glass-card p-4 border border-amber-500/20 rounded-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{folder.folder}</h3>
                <p className="text-sm text-gray-400">{folder.description}</p>
              </div>
              <button
                onClick={() => copyToClipboard(folder.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  copiedPath === folder.path
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-500/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500/30'
                }`}
              >
                {copiedPath === folder.path ? '✓ Copied!' : 'Copy Path'}
              </button>
            </div>
            <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
              <div className="text-xs text-gray-500 mb-1">Path:</div>
              <code className="text-sm text-amber-500">{folder.path}</code>
            </div>
            {folder.examples.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-1">Examples:</div>
                <div className="flex flex-wrap gap-2">
                  {folder.examples.map((example) => (
                    <code
                      key={example}
                      className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300"
                    >
                      {example}
                    </code>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Naming Conventions */}
      <div className="glass-card p-6 border border-amber-500/20 rounded-lg">
        <h2 className="text-xl font-bold text-amber-500 mb-4">📝 Naming Conventions</h2>
        <div className="space-y-3 text-gray-300">
          <div>
            <strong className="text-white">Heroes:</strong>
            <p className="text-sm">Use exact hero name: <code className="bg-gray-800 px-2 py-1 rounded">Ragnar.png</code>, <code className="bg-gray-800 px-2 py-1 rounded">Bjorn.png</code></p>
          </div>
          <div>
            <strong className="text-white">Skills:</strong>
            <p className="text-sm">Use skill name with hyphens: <code className="bg-gray-800 px-2 py-1 rounded">First-strike.png</code>, <code className="bg-gray-800 px-2 py-1 rounded">Shield-Support.png</code></p>
          </div>
          <div>
            <strong className="text-white">File Format:</strong>
            <p className="text-sm">Use <code className="bg-gray-800 px-2 py-1 rounded">.png</code> format for transparency and quality.</p>
          </div>
          <div>
            <strong className="text-white">Case Sensitive:</strong>
            <p className="text-sm">Match the exact capitalization used in the game.</p>
          </div>
        </div>
      </div>

      {/* Background Removal Tip */}
      <div className="glass-card p-6 border border-purple-500/20 rounded-lg">
        <h2 className="text-xl font-bold text-purple-500 mb-4">💡 Pro Tip: Background Removal</h2>
        <p className="text-gray-300 mb-3">
          For cleaner hero portraits and icons, you can use AI background removers:
        </p>
        <div className="space-y-2 text-sm text-gray-400">
          <div>• <strong className="text-white">remove.bg</strong> - Quick online tool</div>
          <div>• <strong className="text-white">Photoshop</strong> - Select and remove background tool</div>
          <div>• <strong className="text-white">GIMP</strong> - Free alternative to Photoshop</div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Note: Most game icons already have proper backgrounds, so this is optional.
        </p>
      </div>
    </div>
  );
}
