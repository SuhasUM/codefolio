const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true, default: 'eventzee' },
  brandName: { type: String, default: 'Eventzee' },
  hero: { type: Object, default: {} },
  stats: { type: Array, default: [] },
  about: { type: Object, default: {} },
  services: { type: Array, default: [] },
  process: { type: Array, default: [] },
  gallery: { type: Array, default: [] },
  testimonials: { type: Array, default: [] },
  faq: { type: Array, default: [] },
  contact: { type: Object, default: {} },
  socialLinks: { type: Object, default: {} },
  updated_at: { type: Date, default: Date.now }
});

siteContentSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('SiteContent', siteContentSchema);