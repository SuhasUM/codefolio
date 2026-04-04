import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function SkillsEditor() {
  const { portfolioData, updateField } = usePortfolio();
  const [input, setInput] = useState('');
  const skills = portfolioData.skills || [];

  function addSkill() {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    updateField('root', 'skills', [...skills, trimmed]);
    setInput('');
  }

  function removeSkill(skill) {
    updateField('root', 'skills', skills.filter(s => s !== skill));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          className="input-field flex-1"
          placeholder="React, Node.js, Python..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addSkill} className="btn-primary text-sm px-3 py-2 whitespace-nowrap">
          Add
        </button>
      </div>
      <p className="text-xs text-gray-400 mb-3">Press Enter or comma to add</p>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1.5 rounded-full"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-indigo-400 hover:text-indigo-700 ml-0.5 leading-none"
            >
              ×
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-400 text-xs">No skills added yet</p>
        )}
      </div>
    </div>
  );
}
