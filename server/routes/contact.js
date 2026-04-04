const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

// POST /api/contact/:username — Send email to portfolio owner
router.post('/:username', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ username: req.params.username.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"CodeFolio Contact" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: `New message from your CodeFolio portfolio - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4f46e5;">📬 New Portfolio Contact</h2>
          <p>Someone reached out through your CodeFolio portfolio!</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">From:</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f0f0ff; border-radius: 6px;">
            <p style="font-weight: bold; color: #4f46e5;">Message:</p>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">This message was sent via CodeFolio. Your email address was not exposed.</p>
        </div>
      `
    };

    // Try to send, but don't fail if SMTP not configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Message sent successfully! The developer will get back to you soon.' });
    } else {
      console.log('📧 [DEV MODE] Email would be sent to:', user.email, '| From:', name, email);
      console.log('📧 [DEV MODE] Message:', message);
      res.json({ message: 'Message received! (Email not configured in dev mode)' });
    }
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
