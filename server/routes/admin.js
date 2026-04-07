const express = require('express');
const SiteContent = require('../models/SiteContent');
const Inquiry = require('../models/Inquiry');
const requireAdmin = require('../middleware/admin');

const router = express.Router();

router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const [totalInquiries, newInquiries, confirmedInquiries, latestInquiries, content] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Inquiry.countDocuments({ status: 'confirmed' }),
      Inquiry.find().sort({ created_at: -1 }).limit(10),
      SiteContent.findOne({ slug: 'eventzee' })
    ]);

    res.json({
      summary: {
        totalInquiries,
        newInquiries,
        confirmedInquiries
      },
      latestInquiries,
      content
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/content', requireAdmin, async (req, res) => {
  try {
    const content = await SiteContent.findOne({ slug: 'eventzee' });
    res.json({ content });
  } catch (err) {
    console.error('Fetch admin content error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/content', requireAdmin, async (req, res) => {
  try {
    const payload = req.body;
    const content = await SiteContent.findOneAndUpdate(
      { slug: 'eventzee' },
      { ...payload, slug: 'eventzee' },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Content updated successfully', content });
  } catch (err) {
    console.error('Update admin content error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/inquiries', requireAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ created_at: -1 });
    res.json({ inquiries });
  } catch (err) {
    console.error('Fetch inquiries error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { ...(status ? { status } : {}), ...(notes !== undefined ? { notes } : {}) },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({ message: 'Inquiry updated', inquiry });
  } catch (err) {
    console.error('Update inquiry error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;