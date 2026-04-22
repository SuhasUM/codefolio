import { useEffect, useState } from 'react';
import { defaultSiteContent } from '../data/siteDefaults';
import { apiUrl } from '../utils/apiBase';

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow-pill">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function statTone(index) {
  const tones = ['tone-gold', 'tone-rose', 'tone-teal', 'tone-ink'];
  return tones[index % tones.length];
}

export default function HomePage() {
  const [content, setContent] = useState(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    event_date: '',
    guests: '',
    message: ''
  });

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const response = await fetch(apiUrl('/api/site-content'));
        if (response.ok) {
          const data = await response.json();
          if (active && data.content) {
            setContent(data.content);
          }
        }
      } catch (err) {
        // Use defaults when offline or during initial setup.
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadContent();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'pending', message: 'Sending your request...' });

    try {
      const response = await fetch(apiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send request');
      }

      setForm({ name: '', email: '', phone: '', event_type: '', event_date: '', guests: '', message: '' });
      setStatus({ type: 'success', message: 'Thanks. Your inquiry has been sent successfully.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  }

  const whatsappLink = `https://wa.me/${String(content.contact?.whatsapp || '').replace(/[^\d]/g, '')}`;

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand-mark">
          <div className="brand-badge">EZ</div>
          <div>
            <strong>{content.brandName}</strong>
            <span>Premium events and catering</span>
          </div>
        </div>

        <nav className="site-nav">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#gallery">Gallery</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a className="nav-button" href="/admin/login">Admin</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow-pill">{content.hero?.eyebrow}</span>
            <h1>{content.hero?.title}</h1>
            <p>{content.hero?.subtitle}</p>

            <div className="hero-actions">
              <a className="primary-button" href={content.hero?.primaryCtaLink || '#contact'}>
                {content.hero?.primaryCtaLabel}
              </a>
              <a className="secondary-button" href={content.hero?.secondaryCtaLink || '#services'}>
                {content.hero?.secondaryCtaLabel}
              </a>
            </div>

            <div className="hero-meta">
              <span>{content.contact?.hours}</span>
              <span>{content.contact?.responseTime}</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-card glow-card">
              <span className="mini-label">Now serving</span>
              <h3>Wedding catering, corporate planning, and luxury celebrations.</h3>
              <p>One team for menu design, decor coordination, guest experience, and delivery.</p>
            </div>
            <div className="hero-card stats-card">
              {content.stats?.map((stat, index) => (
                <div key={stat.label} className={`stat-item ${statTone(index)}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block about-block">
          <SectionHeading
            eyebrow="Why Eventzee"
            title={content.about?.title}
            description={content.about?.description}
          />
          <div className="about-grid">
            <div className="about-card">
              <ul className="check-list">
                {(content.about?.highlights || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="about-card highlight-card">
              <h3>Designed to feel premium.</h3>
              <p>
                Elegant presentation, clear communication, and reliable execution keep your event running smoothly from the first call to the final toast.
              </p>
              {loading ? <span className="status-chip">Loading live data...</span> : <span className="status-chip success">Connected to backend</span>}
            </div>
          </div>
        </section>

        <section id="services" className="section-block">
          <SectionHeading
            eyebrow="Our Services"
            title="Every detail of your celebration"
            description="From gourmet catering to complete event orchestration, we offer a full suite of services tailored to your vision."
          />
          <div className="card-grid three-up">
            {content.services?.map((service) => (
              <article className="service-card" key={service.title}>
                <span className="service-tag">Event service</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {(service.bullets || []).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section-block">
          <SectionHeading
            eyebrow="Our Process"
            title="How we bring your vision to life"
            description="A seamless three-step journey from your first call to the final toast."
          />
          <div className="card-grid three-up process-grid">
            {content.process?.map((step) => (
              <article className="process-card" key={step.step}>
                <span className="process-step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="section-block">
          <SectionHeading
            eyebrow="Portfolio"
            title="A glimpse into our celebrations"
            description="Atmospheric details, premium food presentation, and event styling that photographs beautifully."
          />
          <div className="gallery-grid">
            {content.gallery?.map((item, index) => (
              <article className={`gallery-card gallery-tone-${(index % 6) + 1}`} key={item.title}>
                <span className="mini-label">{item.title}</span>
                <h3>{item.caption}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <SectionHeading
            eyebrow="Client Love"
            title="What our clients say"
            description="Real stories from families and companies who trusted Eventzee with their special moments."
          />
          <div className="card-grid three-up">
            {content.testimonials?.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <p>"{testimonial.quote}"</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.event}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="section-block">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before you book"
            description="A few quick answers to the questions clients usually ask first."
          />
          <div className="faq-list">
            {content.faq?.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="section-block contact-section">
          <SectionHeading
            eyebrow="Contact"
            title="Ready to plan your dream celebration?"
            description="Tell us the date, guest count, and event type. We will reply with a tailored quote."
          />
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Talk to Eventzee</h3>
              <p>{content.contact?.address}</p>
              <a href={`tel:${content.contact?.phone}`}>{content.contact?.phone}</a>
              <a href={`mailto:${content.contact?.email}`}>{content.contact?.email}</a>
              <a href={whatsappLink} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              <span>{content.contact?.hours}</span>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row two-up">
                <label>
                  Name
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                  />
                </label>
              </div>
              <div className="form-row two-up">
                <label>
                  Phone
                  <input
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  />
                </label>
                <label>
                  Event type
                  <input
                    value={form.event_type}
                    onChange={(event) => setForm({ ...form, event_type: event.target.value })}
                    placeholder="Wedding, birthday, corporate..."
                  />
                </label>
              </div>
              <div className="form-row two-up">
                <label>
                  Event date
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={(event) => setForm({ ...form, event_date: event.target.value })}
                  />
                </label>
                <label>
                  Guest count
                  <input
                    value={form.guests}
                    onChange={(event) => setForm({ ...form, guests: event.target.value })}
                    placeholder="100, 250, 500..."
                  />
                </label>
              </div>
              <label>
                Tell us about the event
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  required
                />
              </label>
              <button className="primary-button submit-button" type="submit">Send Inquiry</button>
              {status.message ? <p className={`form-status ${status.type}`}>{status.message}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Eventzee. Premium event catering and management.</p>
        <div>
          <a href="/admin/login">Admin Login</a>
          <a href={content.socialLinks?.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={content.socialLinks?.facebook} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </footer>
    </div>
  );
}
