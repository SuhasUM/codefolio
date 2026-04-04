import ContactForm from '../ui/ContactForm';

export default function TemplateGradient({ data, username, isPreview }) {
  const { personal_info: p, social_links: s, skills, projects } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero with gradient */}
      <section className="gradient-bg text-white px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {p.profile_image_url && (
            <img src={p.profile_image_url} alt={p.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30 mx-auto mb-6"
              onError={e => e.target.style.display = 'none'} />
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-sm">
            {p.name || 'Your Name'}
          </h1>
          <p className="text-white/80 text-xl mt-3 font-light">
            {p.headline || 'Your Headline'}
          </p>
          {p.location && <p className="text-white/60 mt-2 text-sm">📍 {p.location}</p>}

          {/* Social links */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm">GitHub</a>}
            {s.linkedin && <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm">LinkedIn</a>}
            {s.twitter && <a href={s.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm">Twitter</a>}
            {s.personal_blog && <a href={s.personal_blog} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm">Blog</a>}
            {p.resume_link && <a href={p.resume_link} target="_blank" rel="noopener noreferrer" className="bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-bold transition-colors hover:bg-white/90">Resume ↓</a>}
          </div>
        </div>
      </section>

      {/* Bio */}
      {p.bio && (
        <section className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-gray-600 text-lg leading-relaxed">{p.bio}</p>
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map(skill => (
              <span key={skill}
                className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project._id || project.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title}
                    className="w-full h-40 object-cover"
                    onError={e => e.target.style.display = 'none'} />
                ) : (
                  <div className="w-full h-40 gradient-bg opacity-60 flex items-center justify-center">
                    <span className="text-white text-4xl">📦</span>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  {project.description && <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-3">{project.description}</p>}
                  {project.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech_stack.map(t => (
                        <span key={t} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50">
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">GitHub ↗</a>}
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Live Demo ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="gradient-bg px-6 py-20 mt-12">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Let's Connect</h2>
          <p className="text-white/70 mb-8 text-sm">Have a project in mind or just want to say hi?</p>
          {isPreview ? (
            <p className="text-white/50 italic text-sm">Contact form active on live portfolio.</p>
          ) : (
            <ContactForm username={username} theme="gradient" />
          )}
        </div>
      </section>

      <footer className="py-6 text-center text-xs text-gray-400">
        Built with <a href="/" className="text-indigo-500 hover:underline">CodeFolio</a>
      </footer>
    </div>
  );
}
