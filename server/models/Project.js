const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  portfolio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tech_stack: [{ type: String }],
  github_url: { type: String, default: '' },
  live_url: { type: String, default: '' },
  image_url: { type: String, default: '' },
  order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
