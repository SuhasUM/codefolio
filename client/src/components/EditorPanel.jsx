import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectsEditor from './ui/ProjectsEditor';
import SkillsEditor from './ui/SkillsEditor';

const THEMES = [
  { id: 'minimalist', label: 'Minimalist', color: 'bg-white border-gray-300', textColor: 'text-gray-800' },
  { id: 'dark-mode', label: 'Dark Mode', color: 'bg-gray-800 border-gray-600', textColor: 'text-green-400' },
  { id: 'terminal', label: 'Terminal', color: 'bg-black border-green-700', textColor: 'text-green-500' },
  { id: 'gradient', label: 'Gradient', color: 'bg-gradient-to-r from-indigo-500 to-purple-600 border-transparent', textColor: 'text-white' }
];

function Accordion({ title, icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <span>{icon}</span> {title}
        </span>
        <span className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

export default function EditorPanel({ token }) {
  const { portfolioData, updateField } = usePortfolio();
  const { personal_info, social_links, theme_id } = portfolioData;

  return (
    <div className="flex-1">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Portfolio Editor</h2>
        <p className="text-xs text-gray-400 mt-0.5">Changes reflect instantly in preview</p>
      </div>

      {/* Theme picker */}
      <Accordion title="Theme & Design" icon="🎨" defaultOpen>
        <p className="text-xs text-gray-500 mb-3">Choose a look for your portfolio</p>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => updateField('root', 'theme_id', t.id)}
              className={`${t.color} border-2 rounded-lg p-3 h-16 flex items-end transition-all ${theme_id === t.id ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:opacity-80'}`}
            >
              <span className={`${t.textColor} text-xs font-semibold`}>{t.label}</span>
            </button>
          ))}
        </div>
      </Accordion>

      {/* Personal Info */}
      <Accordion title="Personal Info" icon="👤" defaultOpen>
        {[
          { label: 'Full Name', field: 'name', placeholder: 'Jane Doe', type: 'text' },
          { label: 'Headline', field: 'headline', placeholder: 'Full-Stack Developer & Open Source Contributor', type: 'text' },
          { label: 'Location', field: 'location', placeholder: 'San Francisco, CA', type: 'text' },
          { label: 'Profile Image URL', field: 'profile_image_url', placeholder: 'https://avatars.githubusercontent.com/...', type: 'url' },
          { label: 'Resume Link', field: 'resume_link', placeholder: 'https://drive.google.com/...', type: 'url' },
        ].map(({ label, field, placeholder, type }) => (
          <div key={field}>
            <label className="label">{label}</label>
            <input
              type={type}
              className="input-field"
              placeholder={placeholder}
              value={personal_info[field] || ''}
              onChange={e => updateField('personal_info', field, e.target.value)}
            />
          </div>
        ))}
        <div>
          <label className="label">Bio</label>
          <textarea
            className="input-field resize-none"
            rows={4}
            placeholder="Write a short bio about yourself, your experience, and what you're passionate about..."
            value={personal_info.bio || ''}
            onChange={e => updateField('personal_info', 'bio', e.target.value)}
          />
        </div>
      </Accordion>

      {/* Social Links */}
      <Accordion title="Social Links" icon="🔗">
        {[
          { label: 'GitHub URL', field: 'github', placeholder: 'https://github.com/username' },
          { label: 'LinkedIn URL', field: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
          { label: 'Twitter / X URL', field: 'twitter', placeholder: 'https://twitter.com/username' },
          { label: 'Personal Blog / Website', field: 'personal_blog', placeholder: 'https://myblog.com' },
        ].map(({ label, field, placeholder }) => (
          <div key={field}>
            <label className="label">{label}</label>
            <input
              type="url"
              className="input-field"
              placeholder={placeholder}
              value={social_links[field] || ''}
              onChange={e => updateField('social_links', field, e.target.value)}
            />
          </div>
        ))}
      </Accordion>

      {/* Skills */}
      <Accordion title="Skills" icon="🛠️">
        <SkillsEditor />
      </Accordion>

      {/* Projects */}
      <Accordion title="Projects" icon="📦" defaultOpen>
        <ProjectsEditor token={token} />
      </Accordion>
    </div>
  );
}
