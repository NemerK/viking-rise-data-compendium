'use client';

import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function DeployPage() {
  const { state, changes, resetChanges } = useAdmin();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<{
    success?: boolean;
    message?: string;
    files?: string[];
    details?: string;
    hint?: string;
  } | null>(null);

  const deploy = async () => {
    setIsDeploying(true);
    setDeployStatus(null);

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heroes: state.heroes,
          skills: state.skills,
          talents: state.talents,
          mounts: state.mounts,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setDeployStatus({
          success: true,
          message: data.message,
          files: data.files,
        });
        resetChanges();
      } else {
        setDeployStatus({
          success: false,
          message: data.error || 'Deployment failed',
          details: data.details,
          hint: data.hint,
        });
      }
    } catch (error) {
      setDeployStatus({
        success: false,
        message: String(error),
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const validateData = () => {
    const issues: string[] = [];

    state.heroes.forEach(hero => {
      if (!hero.name) issues.push(`Hero ${hero.id} missing name`);
      if (!hero.portrait) issues.push(`Hero ${hero.name || hero.id} missing portrait`);
    });

    state.skills.forEach(skill => {
      if (!skill.name) issues.push(`Skill ${skill.id} missing name`);
      if (!skill.description) issues.push(`Skill ${skill.name || skill.id} missing description`);
    });

    state.mounts.forEach(mount => {
      if (!mount.name) issues.push(`Mount ${mount.id} missing name`);
      if (!mount.icon) issues.push(`Mount ${mount.name || mount.id} missing icon`);
    });

    return issues;
  };

  const validationIssues = validateData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-500">🚀 Deploy to Production</h1>
        <p className="text-gray-400">One-click deployment to your live site</p>
      </div>

      {/* Deploy Button */}
      <div className="glass-card p-8 border border-green-500/30 rounded-lg text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-6xl">🚀</div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Ready to Deploy?</h2>
            <p className="text-gray-400">
              This will push all your data to GitHub and Vercel will automatically deploy your updated site.
            </p>
          </div>
          
          {changes.length > 0 && (
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <span className="text-yellow-500 font-medium">
                {changes.length} change(s) pending deployment
              </span>
            </div>
          )}

          <button
            onClick={deploy}
            disabled={isDeploying}
            className={`
              w-full py-4 px-8 text-xl font-bold rounded-lg transition-all
              ${isDeploying
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-lg hover:shadow-green-500/30'
              }
            `}
          >
            {isDeploying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Deploying...
              </span>
            ) : (
              '🚀 Deploy Now'
            )}
          </button>

          <p className="text-xs text-gray-500">
            Deployment takes ~2 minutes after pushing to GitHub
          </p>
        </div>
      </div>

      {/* Deploy Status */}
      {deployStatus && (
        <div className={`
          glass-card p-6 border rounded-lg
          ${deployStatus.success ? 'border-green-500/50' : 'border-red-500/50'}
        `}>
          {deployStatus.success ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">✅</span>
                <div>
                  <h3 className="text-xl font-bold text-green-500">Deployment Successful!</h3>
                  <p className="text-gray-400">{deployStatus.message}</p>
                </div>
              </div>
              {deployStatus.files && (
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Files updated:</p>
                  <div className="flex flex-wrap gap-2">
                    {deployStatus.files.map((file, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-500 rounded text-sm">
                        {file}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-400">
                🎉 Your site will be live at your Vercel URL in about 2 minutes!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">❌</span>
                <div>
                  <h3 className="text-xl font-bold text-red-500">Deployment Failed</h3>
                  <p className="text-gray-400">{deployStatus.message}</p>
                </div>
              </div>
              {deployStatus.details && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400 font-mono">{deployStatus.details}</p>
                </div>
              )}
              {deployStatus.hint && (
                <p className="text-sm text-yellow-500">💡 {deployStatus.hint}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Changes Summary */}
      {changes.length > 0 && (
        <div className="glass-card p-6 border border-yellow-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">
            📝 Pending Changes ({changes.length})
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {changes.slice(-10).reverse().map((change, idx) => (
              <div
                key={idx}
                className="text-sm text-gray-300 p-2 bg-gray-800/50 rounded border border-gray-700"
              >
                <span className={`font-medium ${
                  change.action === 'create' ? 'text-green-500' :
                  change.action === 'update' ? 'text-blue-500' :
                  'text-red-500'
                }`}>
                  {change.action.toUpperCase()}
                </span>
                {' '}
                <span className="text-gray-400">{change.entity}</span>
                {' '}
                <span className="text-white">{change.entityId}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation */}
      {validationIssues.length > 0 && (
        <div className="glass-card p-6 border border-yellow-500/20 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">⚠️ Validation Warnings</h2>
          <ul className="text-sm text-gray-300 space-y-1 max-h-48 overflow-y-auto">
            {validationIssues.map((issue, idx) => (
              <li key={idx}>• {issue}</li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            You can still deploy, but fixing these issues is recommended.
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 border border-amber-500/20 rounded-lg text-center">
          <div className="text-3xl font-bold text-amber-500">{state.heroes.length}</div>
          <div className="text-sm text-gray-400 mt-1">Heroes</div>
        </div>
        <div className="glass-card p-4 border border-purple-500/20 rounded-lg text-center">
          <div className="text-3xl font-bold text-purple-500">{state.skills.length}</div>
          <div className="text-sm text-gray-400 mt-1">Skills</div>
        </div>
        <div className="glass-card p-4 border border-blue-500/20 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-500">{state.talents.length}</div>
          <div className="text-sm text-gray-400 mt-1">Talents</div>
        </div>
        <div className="glass-card p-4 border border-green-500/20 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-500">{state.mounts.length}</div>
          <div className="text-sm text-gray-400 mt-1">Mounts</div>
        </div>
      </div>

      {/* Environment Variables Info */}
      <div className="glass-card p-6 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">⚙️ Required Environment Variables</h2>
        <p className="text-gray-400 text-sm mb-4">
          These must be set in Vercel for deployment to work:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <code className="text-green-400">GITHUB_TOKEN</code>
            <p className="text-xs text-gray-500 mt-1">Personal access token with repo access</p>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <code className="text-green-400">GITHUB_OWNER</code>
            <p className="text-xs text-gray-500 mt-1">Your GitHub username</p>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <code className="text-green-400">GITHUB_REPO</code>
            <p className="text-xs text-gray-500 mt-1">Repository name (e.g., viking-rise-db)</p>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <code className="text-green-400">CLOUDINARY_*</code>
            <p className="text-xs text-gray-500 mt-1">For image uploads (already configured)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
