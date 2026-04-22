require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const siteRoutes = require('./routes/site');
const adminRoutes = require('./routes/admin');
const inquiryRoutes = require('./routes/inquiries');
const SiteContent = require('./models/SiteContent');
const User = require('./models/User');
const { defaultSiteContent } = require('./config/defaultContent');

const app = express();
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

async function ensureDefaultData() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@eventzee.in').toLowerCase();
  const adminUsername = (process.env.ADMIN_USERNAME || 'eventzee-admin').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

  await SiteContent.findOneAndUpdate(
    { slug: 'eventzee' },
    { $setOnInsert: defaultSiteContent },
    { upsert: true, new: true }
  );

  const existingAdmin = await User.findOne({ role: 'admin' });
  if (!existingAdmin) {
    const admin = new User({
      username: adminUsername,
      email: adminEmail,
      role: 'admin',
      password_hash: adminPassword
    });
    await admin.save();
    console.log(`✅ Seeded admin user: ${adminEmail}`);
  }
}

// Middleware
// Apply CORS only to API routes. Static frontend assets are same-origin and
// should never be blocked by Origin checks.
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS origin not allowed'));
  },
  credentials: true
};

app.use('/api', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', siteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', inquiryRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Eventzee API running' }));

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventzee')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return ensureDefaultData();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Eventzee running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
