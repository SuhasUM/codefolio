import { useState } from 'react';

export default function ContactForm({ username, theme = 'light' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const isDark = theme === 'dark' || theme === 'terminal' || theme === 'gradient';

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`/api/contact/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  }

  const inputClass = isDark
    ? 'w-full px-3 py-2 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40'
    : 'w-full px-3 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white';

  if (status === 'success') return (
    <div className={`text-center py-8 ${isDark ? 'text-white' : 'text-gray-700'}`}>
      <div className="text-4xl mb-3">✉️</div>
      <p className="font-semibold">Message sent!</p>
      <p className={`text-sm mt-1 ${isDark ? 'text-white/70' : 'text-gray-500'}`}>
        I'll get back to you soon.
      </p>
      <button onClick={() => setStatus(null)} className={`mt-4 text-xs underline ${isDark ? 'text-white/60' : 'text-gray-400'}`}>
        Send another
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {status === 'error' && (
        <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>
          Failed to send. Please try again.
        </p>
      )}
      <div>
        <input
          type="text"
          className={inputClass}
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div>
        <input
          type="email"
          className={inputClass}
          placeholder="your@email.com"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>
      <div>
        <textarea
          className={`${inputClass} resize-none`}
          rows={4}
          placeholder="Your message..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-60 ${
          isDark
            ? 'bg-white text-gray-900 hover:bg-white/90'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
