const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, default: '' },
  event_type: { type: String, default: '' },
  event_date: { type: String, default: '' },
  guests: { type: String, default: '' },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'confirmed', 'closed'],
    default: 'new'
  },
  notes: { type: String, default: '' },
  source: { type: String, default: 'website' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);