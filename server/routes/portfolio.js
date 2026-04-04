const express = require('express');
const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/portfolio/me — Protected: Get logged-in user's portfolio
router.get('/me', authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.userId });
    if (!portfolio) {
      portfolio = new Portfolio({ user_id: req.user.userId });
      await portfolio.save();
    }
    const projects = await Project.find({ portfolio_id: portfolio._id }).sort({ order: 1 });
    res.json({ portfolio, projects });
  } catch (err) {
    console.error('Get portfolio error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/portfolio/me — Protected: Update portfolio
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { theme_id, personal_info, social_links, skills } = req.body;
    let portfolio = await Portfolio.findOne({ user_id: req.user.userId });
    if (!portfolio) {
      portfolio = new Portfolio({ user_id: req.user.userId });
    }
    if (theme_id) portfolio.theme_id = theme_id;
    if (personal_info) portfolio.personal_info = { ...portfolio.personal_info, ...personal_info };
    if (social_links) portfolio.social_links = { ...portfolio.social_links, ...social_links };
    if (skills !== undefined) portfolio.skills = skills;
    await portfolio.save();
    res.json({ message: 'Portfolio updated', portfolio });
  } catch (err) {
    console.error('Update portfolio error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/portfolio/:username — Public: Get portfolio by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'Portfolio not found' });

    const portfolio = await Portfolio.findOne({ user_id: user._id });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    const projects = await Project.find({ portfolio_id: portfolio._id }).sort({ order: 1 });

    res.json({
      username: user.username,
      portfolio,
      projects
    });
  } catch (err) {
    console.error('Public portfolio error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
