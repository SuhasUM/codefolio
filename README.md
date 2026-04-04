# 🚀 CodeFolio — Portfolio Builder for Developers

A full-stack SaaS platform where developers can sign up, build a portfolio with a live real-time preview, and share it via a public URL like `yourdomain.com/username`.

---

## ✨ Features

- 🔐 **JWT Authentication** — Register/login with hashed passwords
- ⚡ **Real-Time Preview** — See your changes instantly as you type
- 🎨 **4 Themes** — Minimalist, Dark Mode, Terminal, Gradient
- 📦 **Project Showcase** — Add projects with tech stack, GitHub & live links
- 🛠️ **Skills Section** — Tag-based skill editor
- 📬 **Built-in Contact Form** — Visitors email you without seeing your address
- 🔗 **Public Portfolio URL** — Shareable at `/:username`
- 📱 **Fully Responsive** — Works on all screen sizes

---

## 🗂️ Project Structure

```
codefolio/
├── package.json              # Root: runs both client & server concurrently
├── server/
│   ├── index.js              # Express entry point
│   ├── .env.example          # Environment variable template
│   ├── models/
│   │   ├── User.js           # User schema (username, email, password_hash)
│   │   ├── Portfolio.js      # Portfolio schema (theme, bio, skills, links)
│   │   └── Project.js        # Project schema (title, stack, URLs)
│   ├── routes/
│   │   ├── auth.js           # POST /register, POST /login, GET /me
│   │   ├── portfolio.js      # GET|PUT /me, GET /:username (public)
│   │   ├── projects.js       # POST|PUT|DELETE /projects/:id
│   │   └── contact.js        # POST /contact/:username (email trigger)
│   └── middleware/
│       └── auth.js           # JWT verification middleware
└── client/
    ├── vite.config.js        # Vite + API proxy to :5000
    ├── tailwind.config.js
    └── src/
        ├── App.jsx            # Routes: /, /login, /register, /dashboard, /:username
        ├── context/
        │   ├── AuthContext.jsx       # Global auth state + token management
        │   └── PortfolioContext.jsx  # Global portfolio state for live preview
        ├── pages/
        │   ├── Landing.jsx          # Marketing landing page
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx        # Split-screen builder (editor + preview)
        │   ├── LivePortfolio.jsx    # Public portfolio renderer
        │   └── NotFound.jsx
        └── components/
            ├── EditorPanel.jsx      # Left panel: accordion form sections
            ├── PreviewPanel.jsx     # Right panel: live template preview
            ├── ui/
            │   ├── SkillsEditor.jsx     # Tag-based skills input
            │   ├── ProjectsEditor.jsx   # Full CRUD for projects
            │   └── ContactForm.jsx      # Reusable contact form
            └── templates/
                ├── TemplateMinimalist.jsx
                ├── TemplateDarkMode.jsx
                ├── TemplateTerminal.jsx
                └── TemplateGradient.jsx
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone & Install

```bash
git clone https://github.com/yourname/codefolio.git
cd codefolio

# Install all dependencies (root + server + client)
npm run install:all
```

### 2. Configure Environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/codefolio
JWT_SECRET=your_super_secret_key_change_this
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail".

> **Dev mode:** If SMTP is not configured, contact form submissions are logged to the console instead of sending emails — so you can develop without email setup.

### 3. Run in Development

```bash
npm run dev
```

This starts:
- **Backend** at `http://localhost:5000`
- **Frontend** at `http://localhost:5173` (with proxy to backend)

---

## 🌐 Deployment

### Database — MongoDB Atlas
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Add a database user and whitelist `0.0.0.0/0` for IP access
3. Copy the connection string into your `.env`

### Backend — Render / Railway
1. Push your code to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Root directory: `server`, Build command: `npm install`, Start command: `node index.js`
4. Add all environment variables from `.env`

### Frontend — Vercel / Netlify
1. Create a new project from your GitHub repo
2. Root directory: `client`, Build command: `npm run build`, Output dir: `dist`
3. Add environment variable: `VITE_API_URL=https://your-render-api.onrender.com`

> **Important:** Update the `fetch` calls in the client to use `import.meta.env.VITE_API_URL` as the base URL when deploying (currently uses Vite's dev proxy `/api`).

---

## 📋 API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |

### Portfolio
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/portfolio/me` | ✅ | Get my portfolio + projects |
| PUT | `/api/portfolio/me` | ✅ | Update portfolio |
| GET | `/api/portfolio/:username` | ❌ | **Public** — get any portfolio |

### Projects
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/projects` | ✅ | Add project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |

### Contact
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact/:username` | ❌ | Send email to portfolio owner |

---

## 🧪 Testing Checklist

- [ ] Register with username `testdev`
- [ ] Fill in bio, headline, profile image URL
- [ ] Add 2 mock projects with tech stack and GitHub links
- [ ] Select a different theme and verify preview updates
- [ ] Click **Save** and verify persistence
- [ ] Open incognito window → navigate to `http://localhost:5173/testdev`
- [ ] Verify public portfolio renders correctly
- [ ] Submit contact form and check console/email

---

## 🎨 Themes

| Theme | Style | Best For |
|-------|-------|----------|
| **Minimalist** | Clean white, indigo accents | Professional, corporate |
| **Dark Mode** | Dark gray, green accents | Systems/backend devs |
| **Terminal** | Pure black, green mono font | Hackers, CLI enthusiasts |
| **Gradient** | Purple-indigo gradient hero | Creative, frontend devs |

---

## 🔧 Customization Tips

- **Add a new theme:** Create `TemplateMyTheme.jsx` in `client/src/components/templates/`, add it to `THEMES` in `EditorPanel.jsx`, and handle the case in `PreviewPanel.jsx` and `LivePortfolio.jsx`
- **Custom domain:** Point a wildcard DNS `*.yourdomain.com → your server`, then parse `req.hostname` in the backend to look up the user
- **Image uploads:** Replace URL input with a file upload using [Cloudinary](https://cloudinary.com) or AWS S3
- **Analytics:** Add a `views` counter to the Portfolio model, increment on `GET /api/portfolio/:username`

---

## 📄 License

MIT — free to use, modify, and deploy.
