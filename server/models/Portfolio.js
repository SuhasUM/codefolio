const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  theme_id: {
    type: String,
    enum: ['minimalist', 'dark-mode', 'terminal', 'gradient'],
    default: 'minimalist'
  },
  personal_info: {
    name: { type: String, default: '' },
    headline: { type: String, default: '' },
    bio: { type: String, default: '' },
    profile_image_url: { type: String, default: '' },
    resume_link: { type: String, default: '' },
    location: { type: String, default: '' }
  },
  social_links: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    personal_blog: { type: String, default: '' }
  },
  skills: [{ type: String }],
  updated_at: {
    type: Date,
    default: Date.now
  }
});

portfolioSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
