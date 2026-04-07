# Eventzee Deployment Guide

## What is included

- Public Eventzee website on `/`
- Inquiry form API on `/api/inquiries`
- Admin login on `/admin/login`
- Admin dashboard on `/admin`
- Content CMS API and inquiry management

## 1) Local run

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Install

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### Configure env

- Copy `server/.env.example` to `server/.env`
- Fill MongoDB, JWT, admin credentials, SMTP

### Run dev mode

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`
Backend runs on `http://localhost:5000`

## 2) Production deploy (single backend host + static frontend)

This project is ready to deploy with one Node service that serves:

- API routes under `/api`
- React build from `client/dist`

### Build frontend

```bash
cd client
npm run build
```

### Start backend

```bash
cd ../server
npm start
```

## 3) Deploy on Render (recommended for speed)

### Create MongoDB

- Use MongoDB Atlas free/shared cluster
- Add DB user and IP/network access
- Copy connection string

### Create Render Web Service

- Connect your GitHub repo
- Root directory: `server`
- Build command:

```bash
cd ../client && npm install && npm run build && cd ../server && npm install
```

- Start command:

```bash
npm start
```

### Add environment variables in Render

Use values from `server/.env.example`:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URLS`
- `ADMIN_EMAIL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

If using one Render service for both frontend and backend, set `CLIENT_URLS` to your Render app URL.

## 4) Domain connection

- Buy a domain (for example from Namecheap)
- In Render: Settings -> Custom Domains
- Add your domain, then add DNS records at your registrar
- Wait for SSL to provision automatically

Typical records:

- `www` CNAME -> Render target
- root domain (`@`) A/ALIAS according to Render instructions

## 5) Admin login

- Visit `/admin/login`
- Use `ADMIN_EMAIL` and `ADMIN_PASSWORD` from env

## 6) Production checklist

- Change default admin password immediately
- Use strong `JWT_SECRET`
- Enable SMTP so inquiries email the team
- Add Mongo backups/retention
- Add uptime monitoring (UptimeRobot or Better Stack)
