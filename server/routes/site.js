const express = require('express');
const SiteContent = require('../models/SiteContent');

const router = express.Router();

router.get('/site-content', async (req, res) => {
  try {
    const content = await SiteContent.findOne({ slug: 'eventzee' });
    if (!content) {
      return res.status(404).json({ message: 'Site content not found' });
    }

    res.json({ content });
  } catch (err) {
    console.error('Fetch site content error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;