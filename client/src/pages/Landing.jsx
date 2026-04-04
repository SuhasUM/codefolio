import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CF</span>
          </div>
          <span className="text-xl font-bold text-gray-900">CodeFolio</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="btn-secondary text-sm">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          For Developers
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Your Portfolio.<br />
          <span className="text-indigo-600">Beautifully Built.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Create a stunning developer portfolio in minutes. Choose a theme, add your projects, and share a clean public URL — no coding required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn-primary text-base px-8 py-3">
            Build My Portfolio →
          </Link>
          <a href="#features" className="btn-secondary text-base px-8 py-3">
            See How It Works
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">Everything you need</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Real-Time Preview',
              desc: 'See your portfolio update live as you type. No waiting, no refreshing.'
            },
            {
              icon: '🎨',
              title: '4 Beautiful Themes',
              desc: 'Minimalist, Dark Mode, Terminal, and Gradient. All fully responsive.'
            },
            {
              icon: '🔗',
              title: 'Instant Public URL',
              desc: 'Share your portfolio at codefolio.app/yourname the moment you sign up.'
            },
            {
              icon: '📦',
              title: 'Project Showcase',
              desc: 'Add your GitHub projects with live links, tech stack tags, and images.'
            },
            {
              icon: '📬',
              title: 'Built-in Contact Form',
              desc: 'Visitors can reach you directly — no email address exposed publicly.'
            },
            {
              icon: '🛡️',
              title: 'Secure & Private',
              desc: 'JWT auth, hashed passwords, and zero data sold to third parties.'
            }
          ].map(f => (
            <div key={f.title} className="card hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Themes preview */}
      <section className="bg-gray-900 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">4 Themes. One Great Portfolio.</h2>
          <p className="text-gray-400 mb-12">Switch themes instantly — your content stays, the look changes.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Minimalist', bg: 'bg-white', text: 'text-gray-900', border: 'border-gray-200' },
              { name: 'Dark Mode', bg: 'bg-gray-900', text: 'text-green-400', border: 'border-gray-700' },
              { name: 'Terminal', bg: 'bg-black', text: 'text-green-500', border: 'border-green-800' },
              { name: 'Gradient', bg: 'gradient-bg', text: 'text-white', border: 'border-purple-400' }
            ].map(t => (
              <div key={t.name} className={`${t.bg} ${t.border} border rounded-lg p-4 h-28 flex items-end`}>
                <span className={`${t.text} text-xs font-semibold`}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-8 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to stand out?</h2>
        <p className="text-gray-500 mb-8">Join developers who share their work with style.</p>
        <Link to="/register" className="btn-primary text-base px-10 py-3">
          Create My Portfolio — It's Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>© 2024 CodeFolio. Built for developers, by developers.</p>
      </footer>
    </div>
  );
}
