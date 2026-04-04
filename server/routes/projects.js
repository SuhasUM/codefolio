const express = require('express');
const Project = require('../models/Project');
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/projects — Add project
router.post('/', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user_id: req.user.userId });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    const { title, description, tech_stack, github_url, live_url, image_url, order } = req.body;
    if (!title) return res.status(400).json({ message: 'Project title is required' });

    const project = new Project({
      portfolio_id: portfolio._id,
      title, description, tech_stack, github_url, live_url, image_url,
      order: order || 0
    });
    await project.save();
    res.status(201).json({ message: 'Project added', project });
  } catch (err) {
    console.error('Add project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/projects/:id — Update project
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user_id: req.user.userId });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    const project = await Project.findOne({ _id: req.params.id, portfolio_id: portfolio._id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const { title, description, tech_stack, github_url, live_url, image_url, order } = req.body;
    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (tech_stack !== undefined) project.tech_stack = tech_stack;
    if (github_url !== undefined) project.github_url = github_url;
    if (live_url !== undefined) project.live_url = live_url;
    if (image_url !== undefined) project.image_url = image_url;
    if (order !== undefined) project.order = order;

    await project.save();
    res.json({ message: 'Project updated', project });
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/projects/:id — Delete project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user_id: req.user.userId });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    const project = await Project.findOneAndDelete({ _id: req.params.id, portfolio_id: portfolio._id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
