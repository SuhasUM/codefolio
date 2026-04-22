import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiUrl } from '../../utils/apiBase';

const emptyProject = {
  title: '',
  description: '',
  tech_stack: [],
  github_url: '',
  live_url: '',
  image_url: '',
  order: 0
};

function ProjectForm({ project, onSave, onCancel, saving }) {
  const [form, setForm] = useState(project);
  const [techInput, setTechInput] = useState('');

  function addTech() {
    const t = techInput.trim();
    if (!t || form.tech_stack.includes(t)) return;
    setForm(prev => ({ ...prev, tech_stack: [...prev.tech_stack, t] }));
    setTechInput('');
  }

  function removeTech(tech) {
    setForm(prev => ({ ...prev, tech_stack: prev.tech_stack.filter(t => t !== tech) }));
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
      <div>
        <label className="label">Project Title *</label>
        <input type="text" className="input-field" placeholder="My Awesome App"
          value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      </div>
      <div>
        <label className="label">Description</label>
        <textarea className="input-field resize-none" rows={3} placeholder="What does this project do?"
          value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      </div>
      <div>
        <label className="label">Tech Stack</label>
        <div className="flex gap-2 mb-2">
          <input type="text" className="input-field flex-1" placeholder="React, MongoDB..."
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTech(); } }}
          />
          <button onClick={addTech} className="btn-secondary text-xs px-2">Add</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.tech_stack.map(t => (
            <span key={t} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
              {t}
              <button onClick={() => removeTech(t)} className="text-indigo-400 hover:text-indigo-700">×</button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="label">GitHub URL</label>
        <input type="url" className="input-field" placeholder="https://github.com/..."
          value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} />
      </div>
      <div>
        <label className="label">Live URL</label>
        <input type="url" className="input-field" placeholder="https://myapp.com"
          value={form.live_url} onChange={e => setForm({ ...form, live_url: e.target.value })} />
      </div>
      <div>
        <label className="label">Cover Image URL</label>
        <input type="url" className="input-field" placeholder="https://..."
          value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onSave(form)}
          disabled={!form.title || saving}
          className="btn-primary text-xs py-2 px-4 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Project'}
        </button>
        <button onClick={onCancel} className="btn-secondary text-xs py-2 px-4">Cancel</button>
      </div>
    </div>
  );
}

export default function ProjectsEditor({ token }) {
  const { portfolioData, updateProjects } = usePortfolio();
  const [editingId, setEditingId] = useState(null); // null = not editing, 'new' = adding new
  const [saving, setSaving] = useState(false);
  const projects = portfolioData.projects || [];

  async function handleAdd(form) {
    setSaving(true);
    try {
      const res = await fetch(apiUrl('/api/projects'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, order: projects.length })
      });
      if (res.ok) {
        const data = await res.json();
        updateProjects([...projects, data.project]);
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(id, form) {
    setSaving(true);
    try {
      const res = await fetch(apiUrl(`/api/projects/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const data = await res.json();
        updateProjects(projects.map(p => p._id === id ? data.project : p));
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(apiUrl(`/api/projects/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) updateProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-3">
      {projects.map(project => (
        <div key={project._id}>
          {editingId === project._id ? (
            <ProjectForm
              project={project}
              saving={saving}
              onSave={(form) => handleUpdate(project._id, form)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{project.title}</p>
                  {project.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{project.description}</p>}
                  {project.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech_stack.slice(0, 4).map(t => (
                        <span key={t} className="bg-indigo-50 text-indigo-700 text-xs px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 ml-2 flex-shrink-0">
                  <button onClick={() => setEditingId(project._id)} className="text-xs text-indigo-600 hover:underline">Edit</button>
                  <span className="text-gray-300">|</span>
                  <button onClick={() => handleDelete(project._id)} className="text-xs text-red-500 hover:underline">Del</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {editingId === 'new' ? (
        <ProjectForm
          project={{ ...emptyProject, tech_stack: [] }}
          saving={saving}
          onSave={handleAdd}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <button
          onClick={() => setEditingId('new')}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
        >
          + Add Project
        </button>
      )}
    </div>
  );
}
