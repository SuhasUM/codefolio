const express = require('express');
const nodemailer = require('nodemailer');
const Inquiry = require('../models/Inquiry');
const SiteContent = require('../models/SiteContent');

const router = express.Router();

router.post('/inquiries', async (req, res) => {
  try {
    const { name, email, phone, event_type, event_date, guests, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      event_type,
      event_date,
      guests,
      message
    });

    const content = await SiteContent.findOne({ slug: 'eventzee' });
    const contactEmail = content?.contact?.email || process.env.SMTP_USER;

    if (contactEmail && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"Eventzee Website" <${process.env.SMTP_USER}>`,
        to: contactEmail,
        subject: `New event inquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="margin: 0 0 16px; color: #8b5cf6;">New Eventzee Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || '-'}</p>
            <p><strong>Event type:</strong> ${event_type || '-'}</p>
            <p><strong>Date:</strong> ${event_date || '-'}</p>
            <p><strong>Guests:</strong> ${guests || '-'}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line; background: #faf5ff; padding: 16px; border-radius: 10px;">${message}</p>
          </div>
        `
      });
    }

    res.status(201).json({ message: 'Inquiry sent successfully', inquiry });
  } catch (err) {
    console.error('Create inquiry error:', err);
    res.status(500).json({ message: 'Failed to send inquiry' });
  }
});

module.exports = router;