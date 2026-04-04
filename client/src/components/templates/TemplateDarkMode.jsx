import ContactForm from '../ui/ContactForm';

export default function TemplateDarkMode({ data, username, isPreview }) {
  const { personal_info: p, social_links: s, skills, projects } = data;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-mono">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-green-400 font-bold">{p.name || 'Developer'}</span>
          <div className="flex gap-6 text-sm text-gray-400">
            {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">GitHub</a>}
            {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">LinkedIn</a>}
            {s.twitter && <a href={s.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">Twitter</a>}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <div className="flex items-center gap-6">
          {p.profile_image_url && (
            <img src={p.profile_image_url} alt={p.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-400/30"
              onError={e => e.target.style.display = 'none'} />
          )}
          <div>
            <p className="text-green-400 text-sm mb-2">Hello, I'm</p>
            <h1 className="text-4xl font-bold text-white">{p.name || 'Your Name'}</h1>
            <p className="text-gray-300 mt-2">{p.headline || 'Your Headline'}</p>
            {p.location && <p className="text-gray-500 text-sm mt-1">📍 {p.location}</p>}
          </div>
        </div>
        {p.bio && <p className="mt-8 text-gray-400 leading-relaxed max-w-2xl">{p.bio}</p>}
        <div className="flex gap-4 mt-8 flex-wrap">
          {p.resume_link && (
            <a href={p.resume_link} target="_blank" rel="noopener noreferrer"
              className="bg-green-400 text-gray-950 font-bold text-sm px-5 py-2 rounded hover:bg-green-300 transition-colors">
              Resume
            </a>
          )}
          {s.personal_blog && (
            <a href={s.personal_blog} target="_blank" rel="noopener noreferrer"
              className="border border-gray-600 text-gray-300 text-sm px-5 py-2 rounded hover:border-green-400 hover:text-green-400 transition-colors">
              Blog
            </a>
          )}
        </div>
      </section>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="max-w-4xl mx-auto px-8 py-12 border-t border-gray-800">
          <h2 className="text-sm text-green-400 uppercase tracking-widest mb-6">// Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1.5 rounded text-sm hover:border-green-400/50 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="max-w-4xl mx-auto px-8 py-12 border-t border-gray-800">
          <h2 className="text-sm text-green-400 uppercase tracking-widest mb-8">// Projects</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map(project => (
              <div key={project._id || project.title}
                className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-green-400/30 transition-all">
                {project.image_url && (
                  <img src={project.image_url} alt={project.title}
                    className="w-full h-36 object-cover rounded mb-4 opacity-80"
                    onError={e => e.target.style.display = 'none'} />
                )}
                <h3 className="font-bold text-white">{project.title}</h3>
                {project.description && <p className="text-gray-400 text-sm mt-2 leading-relaxed">{project.description}</p>}
                {project.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tech_stack.map(t => (
                      <span key={t} className="bg-gray-800 text-green-400 text-xs px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-4 text-sm">
                  {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">GitHub ↗</a>}
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">Live ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="max-w-4xl mx-auto px-8 py-12 border-t border-gray-800">
        <h2 className="text-sm text-green-400 uppercase tracking-widest mb-6">// Contact</h2>
        <div className="max-w-lg">
          {isPreview ? (
            <p className="text-gray-500 text-sm italic">Contact form is active on the live portfolio.</p>
          ) : (
            <ContactForm username={username} theme="dark" />
          )}
        </div>
      </section>

      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        Built with <a href="/" className="text-green-400/60 hover:text-green-400">CodeFolio</a>
      </footer>
    </div>
  );
}
