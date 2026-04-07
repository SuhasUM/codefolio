# Eventzee Full-Stack Website

Production-ready event management and catering website with:

- modern public marketing website
- contact/inquiry form connected to MongoDB
- admin login and dashboard
- content management (edit hero/services/faq/testimonials/contact)
- inquiry status and notes management
- optional SMTP email notifications

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Atlas or local)
- Auth: JWT

## Main Routes

- `/` public Eventzee site
- `/admin/login` admin login
- `/admin` admin dashboard
- `/api/site-content` public content API
- `/api/inquiries` inquiry create API
- `/api/admin/*` admin APIs

## Local Development

1. Install dependencies

```bash
npm install
cd server && npm install
cd ../client && npm install
```

2. Configure env

- Copy `server/.env.example` to `server/.env`
- Fill MongoDB, JWT, admin, and SMTP settings

3. Run app

```bash
npm run dev
```

## Production Deploy

See `DEPLOYMENT.md` for complete instructions (Render + MongoDB Atlas + domain setup).
