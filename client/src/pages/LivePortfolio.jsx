import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TemplateMinimalist from '../components/templates/TemplateMinimalist';
import TemplateDarkMode from '../components/templates/TemplateDarkMode';
import TemplateTerminal from '../components/templates/TemplateTerminal';
import TemplateGradient from '../components/templates/TemplateGradient';

// Routes that should NOT be treated as usernames
const APP_ROUTES = ['login', 'register', 'dashboard', 'api', 'favicon.svg'];

export default function LivePortfolio() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // If the param matches an app route, redirect to it
  if (APP_ROUTES.includes(username?.toLowerCase())) {
    return <Navigate to={`/${username}`} replace />;
  }

  useEffect(() => {
    if (!username) return;
    fetchPortfolio();
  }, [username]);

  async function fetchPortfolio() {
    try {
      const res = await fetch(`/api/portfolio/${username}`);
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error('Server error');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-400 text-sm">Loading portfolio...</p>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-6">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
        <p className="text-gray-500 mb-6">
          No portfolio exists for <span className="font-mono text-indigo-600">/{username}</span>
        </p>
        <a href="/" className="btn-primary inline-block">
          Create Your Own Portfolio →
        </a>
      </div>
    </div>
  );

  const { portfolio, projects } = data;
  const combined = {
    theme_id: portfolio.theme_id,
    personal_info: portfolio.personal_info,
    social_links: portfolio.social_links,
    skills: portfolio.skills,
    projects
  };

  const templateProps = { data: combined, username, isPreview: false };

  switch (portfolio.theme_id) {
    case 'dark-mode': return <TemplateDarkMode {...templateProps} />;
    case 'terminal': return <TemplateTerminal {...templateProps} />;
    case 'gradient': return <TemplateGradient {...templateProps} />;
    default: return <TemplateMinimalist {...templateProps} />;
  }
}
