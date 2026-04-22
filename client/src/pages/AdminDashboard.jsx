import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { defaultSiteContent } from '../data/siteDefaults';
import { apiUrl } from '../utils/apiBase';

function mapContentToForm(content) {
  const safe = content || defaultSiteContent;

  return {
    brandName: safe.brandName || '',
    heroEyebrow: safe.hero?.eyebrow || '',
    heroTitle: safe.hero?.title || '',
    heroSubtitle: safe.hero?.subtitle || '',
    primaryCtaLabel: safe.hero?.primaryCtaLabel || '',
    primaryCtaLink: safe.hero?.primaryCtaLink || '',
    secondaryCtaLabel: safe.hero?.secondaryCtaLabel || '',
    secondaryCtaLink: safe.hero?.secondaryCtaLink || '',
    aboutTitle: safe.about?.title || '',
    aboutDescription: safe.about?.description || '',
    aboutHighlights: (safe.about?.highlights || []).join('\n'),
    statsJson: JSON.stringify(safe.stats || [], null, 2),
    servicesJson: JSON.stringify(safe.services || [], null, 2),
    processJson: JSON.stringify(safe.process || [], null, 2),
    galleryJson: JSON.stringify(safe.gallery || [], null, 2),
    testimonialsJson: JSON.stringify(safe.testimonials || [], null, 2),
    faqJson: JSON.stringify(safe.faq || [], null, 2),
    address: safe.contact?.address || '',
    phone: safe.contact?.phone || '',
    email: safe.contact?.email || '',
    whatsapp: safe.contact?.whatsapp || '',
    hours: safe.contact?.hours || '',
    responseTime: safe.contact?.responseTime || '',
    instagram: safe.socialLinks?.instagram || '',
    facebook: safe.socialLinks?.facebook || '',
    youtube: safe.socialLinks?.youtube || ''
  };
}

export default function AdminDashboard() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [summary, setSummary] = useState({ totalInquiries: 0, newInquiries: 0, confirmedInquiries: 0 });
  const [latestInquiries, setLatestInquiries] = useState([]);
  const [allInquiries, setAllInquiries] = useState([]);
  const [contentForm, setContentForm] = useState(mapContentToForm(defaultSiteContent));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (user?.role !== 'admin') {
      return;
    }

    loadDashboard();
    loadAllInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user]);

  async function loadDashboard() {
    try {
      const response = await fetch(apiUrl('/api/admin/dashboard'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load dashboard');
      }

      setSummary(data.summary || summary);
      setLatestInquiries(data.latestInquiries || []);
      setContentForm(mapContentToForm(data.content));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadAllInquiries() {
    try {
      const response = await fetch(apiUrl('/api/admin/inquiries'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setAllInquiries(data.inquiries || []);
      }
    } catch (err) {
      // Keep the dashboard usable even if the list refresh fails.
    }
  }

  function updateField(field, value) {
    setContentForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSaveContent(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const payload = {
        brandName: contentForm.brandName,
        hero: {
          eyebrow: contentForm.heroEyebrow,
          title: contentForm.heroTitle,
          subtitle: contentForm.heroSubtitle,
          primaryCtaLabel: contentForm.primaryCtaLabel,
          primaryCtaLink: contentForm.primaryCtaLink,
          secondaryCtaLabel: contentForm.secondaryCtaLabel,
          secondaryCtaLink: contentForm.secondaryCtaLink
        },
        about: {
          title: contentForm.aboutTitle,
          description: contentForm.aboutDescription,
          highlights: contentForm.aboutHighlights.split('\n').map((item) => item.trim()).filter(Boolean)
        },
        stats: JSON.parse(contentForm.statsJson || '[]'),
        services: JSON.parse(contentForm.servicesJson || '[]'),
        process: JSON.parse(contentForm.processJson || '[]'),
        gallery: JSON.parse(contentForm.galleryJson || '[]'),
        testimonials: JSON.parse(contentForm.testimonialsJson || '[]'),
        faq: JSON.parse(contentForm.faqJson || '[]'),
        contact: {
          address: contentForm.address,
          phone: contentForm.phone,
          email: contentForm.email,
          whatsapp: contentForm.whatsapp,
          hours: contentForm.hours,
          responseTime: contentForm.responseTime
        },
        socialLinks: {
          instagram: contentForm.instagram,
          facebook: contentForm.facebook,
          youtube: contentForm.youtube
        }
      };

      const response = await fetch(apiUrl('/api/admin/content'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save content');
      }

      setMessage('Content updated successfully.');
      setContentForm(mapContentToForm(data.content));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function updateInquiry(id, currentStatus, notes) {
    try {
      const response = await fetch(apiUrl(`/api/admin/inquiries/${id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: currentStatus, notes })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update inquiry');
      }

      setAllInquiries((prev) => prev.map((item) => (item._id === id ? data.inquiry : item)));
      setLatestInquiries((prev) => prev.map((item) => (item._id === id ? data.inquiry : item)));
      setMessage('Inquiry updated successfully.');
    } catch (err) {
      setError(err.message);
    }
  }

  if (authLoading || loading) {
    return <div className="auth-shell"><div className="auth-card center-card"><p>Loading dashboard...</p></div></div>;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link to="/" className="auth-brand">
          <span>EZ</span>
          <strong>Eventzee</strong>
        </Link>
        <div className="sidebar-note">
          <strong>{user.username}</strong>
          <span>Administrator</span>
        </div>
        <div className="sidebar-actions">
          <Link to="/" className="secondary-button">View site</Link>
          <button className="secondary-button" onClick={logout}>Logout</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow-pill">Backend connected</span>
            <h1>Eventzee admin dashboard</h1>
          </div>
          <div className="header-links">
            <a href="/">Open public site</a>
            <a href="/admin/login">Switch account</a>
          </div>
        </header>

        {error ? <div className="alert error">{error}</div> : null}
        {message ? <div className="alert success">{message}</div> : null}

        <section className="summary-grid admin-summary">
          <div className="summary-card tone-gold">
            <p>Total inquiries</p>
            <strong>{summary.totalInquiries}</strong>
          </div>
          <div className="summary-card tone-rose">
            <p>New inquiries</p>
            <strong>{summary.newInquiries}</strong>
          </div>
          <div className="summary-card tone-teal">
            <p>Confirmed inquiries</p>
            <strong>{summary.confirmedInquiries}</strong>
          </div>
        </section>

        <section className="admin-grid">
          <div className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow-pill">Content editor</span>
                <h2>Update the live website</h2>
              </div>
            </div>

            <form className="editor-form" onSubmit={handleSaveContent}>
              <div className="form-row two-up">
                <label>
                  Brand name
                  <input value={contentForm.brandName} onChange={(event) => updateField('brandName', event.target.value)} />
                </label>
                <label>
                  Response time
                  <input value={contentForm.responseTime} onChange={(event) => updateField('responseTime', event.target.value)} />
                </label>
              </div>

              <div className="form-row two-up">
                <label>
                  Hero eyebrow
                  <input value={contentForm.heroEyebrow} onChange={(event) => updateField('heroEyebrow', event.target.value)} />
                </label>
                <label>
                  Hero title
                  <input value={contentForm.heroTitle} onChange={(event) => updateField('heroTitle', event.target.value)} />
                </label>
              </div>

              <label>
                Hero subtitle
                <textarea rows="4" value={contentForm.heroSubtitle} onChange={(event) => updateField('heroSubtitle', event.target.value)} />
              </label>

              <div className="form-row two-up">
                <label>
                  Primary CTA label
                  <input value={contentForm.primaryCtaLabel} onChange={(event) => updateField('primaryCtaLabel', event.target.value)} />
                </label>
                <label>
                  Primary CTA link
                  <input value={contentForm.primaryCtaLink} onChange={(event) => updateField('primaryCtaLink', event.target.value)} />
                </label>
              </div>

              <div className="form-row two-up">
                <label>
                  Secondary CTA label
                  <input value={contentForm.secondaryCtaLabel} onChange={(event) => updateField('secondaryCtaLabel', event.target.value)} />
                </label>
                <label>
                  Secondary CTA link
                  <input value={contentForm.secondaryCtaLink} onChange={(event) => updateField('secondaryCtaLink', event.target.value)} />
                </label>
              </div>

              <label>
                About title
                <input value={contentForm.aboutTitle} onChange={(event) => updateField('aboutTitle', event.target.value)} />
              </label>

              <label>
                About description
                <textarea rows="3" value={contentForm.aboutDescription} onChange={(event) => updateField('aboutDescription', event.target.value)} />
              </label>

              <label>
                About highlights, one per line
                <textarea rows="4" value={contentForm.aboutHighlights} onChange={(event) => updateField('aboutHighlights', event.target.value)} />
              </label>

              <div className="form-row two-up">
                <label>
                  Contact address
                  <textarea rows="3" value={contentForm.address} onChange={(event) => updateField('address', event.target.value)} />
                </label>
                <label>
                  Contact details
                  <textarea rows="3" value={contentForm.phone + '\n' + contentForm.email + '\n' + contentForm.whatsapp} readOnly />
                </label>
              </div>

              <div className="form-row two-up">
                <label>
                  Phone
                  <input value={contentForm.phone} onChange={(event) => updateField('phone', event.target.value)} />
                </label>
                <label>
                  Email
                  <input value={contentForm.email} onChange={(event) => updateField('email', event.target.value)} />
                </label>
              </div>

              <div className="form-row two-up">
                <label>
                  WhatsApp number
                  <input value={contentForm.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} />
                </label>
                <label>
                  Hours
                  <input value={contentForm.hours} onChange={(event) => updateField('hours', event.target.value)} />
                </label>
              </div>

              <label>
                Stats JSON
                <textarea rows="5" value={contentForm.statsJson} onChange={(event) => updateField('statsJson', event.target.value)} />
              </label>

              <label>
                Services JSON
                <textarea rows="10" value={contentForm.servicesJson} onChange={(event) => updateField('servicesJson', event.target.value)} />
              </label>

              <label>
                Process JSON
                <textarea rows="6" value={contentForm.processJson} onChange={(event) => updateField('processJson', event.target.value)} />
              </label>

              <label>
                Gallery JSON
                <textarea rows="6" value={contentForm.galleryJson} onChange={(event) => updateField('galleryJson', event.target.value)} />
              </label>

              <label>
                Testimonials JSON
                <textarea rows="6" value={contentForm.testimonialsJson} onChange={(event) => updateField('testimonialsJson', event.target.value)} />
              </label>

              <label>
                FAQ JSON
                <textarea rows="6" value={contentForm.faqJson} onChange={(event) => updateField('faqJson', event.target.value)} />
              </label>

              <div className="form-row two-up">
                <label>
                  Instagram
                  <input value={contentForm.instagram} onChange={(event) => updateField('instagram', event.target.value)} />
                </label>
                <label>
                  Facebook
                  <input value={contentForm.facebook} onChange={(event) => updateField('facebook', event.target.value)} />
                </label>
              </div>

              <label>
                YouTube
                <input value={contentForm.youtube} onChange={(event) => updateField('youtube', event.target.value)} />
              </label>

              <button className="primary-button" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save website content'}
              </button>
            </form>
          </div>

          <div className="panel-card">
            <div className="panel-head">
              <div>
                <span className="eyebrow-pill">Inbox</span>
                <h2>Recent inquiries</h2>
              </div>
            </div>

            <div className="inquiry-list">
              {(latestInquiries.length ? latestInquiries : allInquiries).map((inquiry) => (
                <article className="inquiry-card" key={inquiry._id}>
                  <div className="inquiry-top">
                    <div>
                      <strong>{inquiry.name}</strong>
                      <span>{inquiry.event_type || 'General inquiry'}</span>
                    </div>
                    <select
                      value={inquiry.status}
                      onChange={(event) =>
                        setAllInquiries((prev) => prev.map((item) => (item._id === inquiry._id ? { ...item, status: event.target.value } : item)))
                      }
                    >
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="quoted">quoted</option>
                      <option value="confirmed">confirmed</option>
                      <option value="closed">closed</option>
                    </select>
                  </div>
                  <p>{inquiry.message}</p>
                  <textarea
                    rows="3"
                    value={inquiry.notes || ''}
                    onChange={(event) =>
                      setAllInquiries((prev) => prev.map((item) => (item._id === inquiry._id ? { ...item, notes: event.target.value } : item)))
                    }
                    placeholder="Internal notes"
                  />
                  <div className="inquiry-meta">
                    <span>{inquiry.email}</span>
                    <span>{inquiry.phone || '-'}</span>
                    <span>{inquiry.event_date || '-'}</span>
                  </div>
                  <button
                    className="secondary-button"
                    onClick={() => updateInquiry(inquiry._id, inquiry.status, inquiry.notes || '')}
                    type="button"
                  >
                    Save inquiry
                  </button>
                </article>
              ))}
              {!latestInquiries.length && !allInquiries.length ? <p>No inquiries yet.</p> : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
