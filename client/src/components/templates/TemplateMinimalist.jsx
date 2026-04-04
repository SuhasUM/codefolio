import ContactForm from '../ui/ContactForm';

function SocialIcon({ href, label }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-gray-500 hover:text-indigo-600 text-sm underline transition-colors">
      {label}
    </a>
  );
}

export default function TemplateMinimalist({ data, username, isPreview }) {
  const { personal_info: p, social_links: s, skills, projects } = data;
  const hasContent = p.name || p.headline;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {p.profile_image_url && (
            <img src={p.profile_image_url} alt={p.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
              onError={e => e.target.style.display = 'none'} />
          )}
          <div>
            {p.name ? (
              <h1 className="text-3xl font-bold text-gray-900">{p.name}</h1>
            ) : (
              <h1 className="text-3xl font-bold text-gray-300">Your Name</h1>
            )}
            {p.headline ? (
              <p className="text-indigo-600 font-medium mt-1">{p.headline}</p>
            ) : (
              <p className="text-gray-300 mt-1">Your headline will appear here</p>
            )}
            {p.location && <p className="text-gray-400 text-sm mt-1">📍 {p.location}</p>}
          </div>
        </div>

        {/* Bio */}
        {p.bio && (
          <p className="mt-8 text-gray-600 leading-relaxed max-w-2xl">{p.bio}</p>
        )}

        {/* Social links */}
        <div className="flex flex-wrap gap-4 mt-6">
          <SocialIcon href={s.github} label="GitHub" />
          <SocialIcon href={s.linkedin} label="LinkedIn" />
          <SocialIcon href={s.twitter} label="Twitter" />
          <SocialIcon href={s.personal_blog} label="Blog" />
          {p.resume_link && (
            <a href={p.resume_link} target="_blank" rel="noopener noreferrer"
              className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
              Resume
            </a>
          )}
        </div>
      </section>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Projects</h2>
          <div className="grid gap-6">
            {projects.map(project => (
              <div key={project._id || project.title} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
                {project.image_url && (
                  <img src={project.image_url} alt={project.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                    onError={e => e.target.style.display = 'none'} />
                )}
                <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                {project.description && (
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{project.description}</p>
                )}
                {project.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tech_stack.map(t => (
                      <span key={t} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-4">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-indigo-600 underline transition-colors">GitHub ↗</a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-indigo-600 underline transition-colors">Live Demo ↗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Get In Touch</h2>
        <div className="max-w-lg">
          {isPreview ? (
            <p className="text-gray-400 text-sm italic">Contact form is active on the live portfolio.</p>
          ) : (
            <ContactForm username={username} theme="light" />
          )}
        </div>
      </section>

      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
        Built with <a href="/" className="text-indigo-500 hover:underline">CodeFolio</a>
      </footer>
    </div>
  );
}
