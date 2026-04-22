import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import EditorPanel from '../components/EditorPanel';
import PreviewPanel from '../components/PreviewPanel';
import { apiUrl } from '../utils/apiBase';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const { loadPortfolioData, portfolioData, saving, setSaving, setSaveStatus, saveStatus } = usePortfolio();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('editor'); // mobile: 'editor' | 'preview'

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    try {
      const res = await fetch(apiUrl('/api/portfolio/me'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        loadPortfolioData(data.portfolio, data.projects);
      }
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveStatus(null);
    try {
      // Save portfolio
      const portfolioRes = await fetch(apiUrl('/api/portfolio/me'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          theme_id: portfolioData.theme_id,
          personal_info: portfolioData.personal_info,
          social_links: portfolioData.social_links,
          skills: portfolioData.skills
        })
      });
      if (!portfolioRes.ok) throw new Error('Failed to save portfolio');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setSaving(false);
    }
  }

  const portfolioUrl = `${window.location.origin}/${user?.username}`;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 text-sm">Loading your portfolio...</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">CF</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">CodeFolio Builder</p>
            <p className="text-xs text-gray-400">{user?.username}</p>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="flex lg:hidden bg-gray-100 rounded-lg p-1 gap-1">
          <button
            onClick={() => setActiveTab('editor')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${activeTab === 'editor' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${activeTab === 'preview' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            Preview
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline font-medium"
          >
            🔗 View Live
          </a>
          {saveStatus === 'saved' && <span className="text-green-600 text-xs font-medium">✓ Saved</span>}
          {saveStatus === 'error' && <span className="text-red-600 text-xs font-medium">✗ Error</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-xs py-1.5 px-3 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={logout}
            className="btn-secondary text-xs py-1.5 px-3"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor panel */}
        <div className={`${activeTab === 'preview' ? 'hidden' : 'flex'} lg:flex flex-col w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto`}>
          <EditorPanel token={token} />
        </div>

        {/* Preview panel */}
        <div className={`${activeTab === 'editor' ? 'hidden' : 'flex'} lg:flex flex-1 overflow-hidden bg-gray-200`}>
          <PreviewPanel username={user?.username} />
        </div>
      </div>
    </div>
  );
}
