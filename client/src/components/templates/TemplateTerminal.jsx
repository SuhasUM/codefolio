import ContactForm from '../ui/ContactForm';

function TerminalLine({ prompt = '$', text, color = 'text-green-400' }) {
  return (
    <div className="flex gap-2">
      <span className="text-green-600 select-none">{prompt}</span>
      <span className={color}>{text}</span>
    </div>
  );
}

export default function TemplateTerminal({ data, username, isPreview }) {
  const { personal_info: p, social_links: s, skills, projects } = data;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono text-sm">
      {/* Terminal window chrome */}
      <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center gap-2 z-10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-xs mx-auto">
          {p.name ? `${p.name.toLowerCase().replace(/\s/g, '-')}.sh` : 'portfolio.sh'}
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {/* Intro */}
        <div className="space-y-1">
          <TerminalLine prompt=">" text={`whoami`} color="text-yellow-400" />
          <div className="pl-4 mt-2 space-y-1">
            <p className="text-white text-lg font-bold">{p.name || 'Your Name'}</p>
            <p className="text-green-300">{p.headline || 'Your Headline'}</p>
            {p.location && <p className="text-gray-500">location: {p.location}</p>}
          </div>
        </div>

        {p.bio && (
          <div className="space-y-1">
            <TerminalLine prompt=">" text="cat bio.txt" color="text-yellow-400" />
            <p className="pl-4 text-gray-300 leading-relaxed mt-1">{p.bio}</p>
          </div>
        )}

        {/* Social links */}
        <div className="space-y-1">
          <TerminalLine prompt=">" text="ls -la links/" color="text-yellow-400" />
          <div className="pl-4 mt-1 space-y-1">
            {s.github && <div><span className="text-gray-500">github    </span><a href={s.github} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">{s.github}</a></div>}
            {s.linkedin && <div><span className="text-gray-500">linkedin  </span><a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">{s.linkedin}</a></div>}
            {s.twitter && <div><span className="text-gray-500">twitter   </span><a href={s.twitter} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">{s.twitter}</a></div>}
            {p.resume_link && <div><span className="text-gray-500">resume    </span><a href={p.resume_link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">{p.resume_link}</a></div>}
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="space-y-1">
            <TerminalLine prompt=">" text="cat skills.json" color="text-yellow-400" />
            <div className="pl-4 mt-1">
              <span className="text-gray-500">{'['}</span>
              <div className="pl-4">
                {skills.map((skill, i) => (
                  <span key={skill}>
                    <span className="text-yellow-300">"{skill}"</span>
                    {i < skills.length - 1 && <span className="text-gray-500">, </span>}
                  </span>
                ))}
              </div>
              <span className="text-gray-500">{']'}</span>
            </div>
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div className="space-y-4">
            <TerminalLine prompt=">" text="ls -la projects/" color="text-yellow-400" />
            {projects.map((project, idx) => (
              <div key={project._id || project.title} className="pl-4 border-l border-green-900">
                <div className="flex gap-2">
                  <span className="text-gray-600">#{idx + 1}</span>
                  <span className="text-white font-bold">{project.title}</span>
                </div>
                {project.description && <p className="text-gray-400 mt-1 pl-5">{project.description}</p>}
                {project.tech_stack?.length > 0 && (
                  <p className="text-gray-500 text-xs mt-1 pl-5">
                    stack: {project.tech_stack.join(', ')}
                  </p>
                )}
                <div className="flex gap-4 mt-1 pl-5">
                  {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-400 text-xs">[github]</a>}
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-400 text-xs">[live]</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact */}
        <div className="space-y-2">
          <TerminalLine prompt=">" text="send --message" color="text-yellow-400" />
          <div className="pl-4">
            {isPreview ? (
              <p className="text-gray-500 italic">Contact form active on live portfolio.</p>
            ) : (
              <ContactForm username={username} theme="terminal" />
            )}
          </div>
        </div>

        {/* Cursor */}
        <div className="flex gap-2 text-green-400">
          <span className="text-green-600">$</span>
          <span className="terminal-cursor">▌</span>
        </div>

        <div className="pt-4 border-t border-gray-900 text-xs text-gray-700 text-center">
          Built with <a href="/" className="text-green-900 hover:text-green-600">CodeFolio</a>
        </div>
      </div>
    </div>
  );
}
