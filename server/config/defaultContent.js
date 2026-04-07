const defaultSiteContent = {
  slug: 'eventzee',
  brandName: 'Eventzee',
  hero: {
    eyebrow: 'Premium Event Planning & Catering',
    title: 'Celebrations that feel extraordinary.',
    subtitle: 'From intimate dinners to grand weddings, Eventzee plans, caters, and executes unforgettable experiences across India.',
    primaryCtaLabel: 'Book Your Event',
    primaryCtaLink: '#contact',
    secondaryCtaLabel: 'Explore Services',
    secondaryCtaLink: '#services'
  },
  stats: [
    { value: '500+', label: 'Events Completed' },
    { value: '50K+', label: 'Happy Guests Served' },
    { value: '12+', label: 'Years of Excellence' },
    { value: '100%', label: 'Client Satisfaction' }
  ],
  about: {
    title: 'Where excellence meets celebration',
    description: 'We do not just plan events. We design complete experiences with premium menus, elegant decor, and coordination that keeps every moment smooth.',
    highlights: [
      'Curated cuisine and live counters',
      'Trusted planning, styling, and setup',
      'Delivery for weddings, birthdays, corporate and private events'
    ]
  },
  services: [
    {
      title: 'Wedding Catering',
      description: 'Exquisite multi-cuisine menus crafted for your special day.',
      bullets: ['Custom menus', 'Live food stations', 'Dessert bars']
    },
    {
      title: 'Birthday Celebrations',
      description: 'Themed parties with gourmet food and stunning setups.',
      bullets: ['Thematic decor', 'Kid-friendly menus', 'Photo moments']
    },
    {
      title: 'Corporate & College Events',
      description: 'Professional catering and management for business and campus gatherings.',
      bullets: ['On-time execution', 'Scalable menus', 'Brand-friendly styling']
    },
    {
      title: 'Reception Catering',
      description: 'Elegant dining experiences for engagements and receptions.',
      bullets: ['Premium plating', 'Seamless serving', 'Guest comfort']
    },
    {
      title: 'Decoration & Setup',
      description: 'Breathtaking decor that transforms any venue into magic.',
      bullets: ['Stage styling', 'Floral concepts', 'Venue transformation']
    },
    {
      title: 'Full Event Management',
      description: 'End-to-end planning, coordination, and flawless execution.',
      bullets: ['Vendor coordination', 'Run-of-show planning', 'On-site support']
    }
  ],
  process: [
    {
      step: '01',
      title: 'Share Your Vision',
      description: 'Tell us about your dream event, preferences, budget, and timeline.'
    },
    {
      step: '02',
      title: 'Custom Planning',
      description: 'We design a tailored plan with menu, decor, logistics, and guest flow.'
    },
    {
      step: '03',
      title: 'Seamless Execution',
      description: 'Our team delivers a polished, memorable experience from start to finish.'
    }
  ],
  gallery: [
    { title: 'Wedding Catering', caption: 'Elegant buffet and plated dining.' },
    { title: 'Stage Decor', caption: 'Bold backdrops and floral styling.' },
    { title: 'Food Presentation', caption: 'Premium plating with attention to detail.' },
    { title: 'Floral Decor', caption: 'Fresh installations for luxury events.' },
    { title: 'Outdoor Events', caption: 'Beautifully managed open-air gatherings.' },
    { title: 'Celebration Spaces', caption: 'Full setup for birthday and corporate nights.' }
  ],
  testimonials: [
    {
      name: 'Priya & Arjun Sharma',
      event: 'Wedding',
      quote: 'Eventzee made our wedding absolutely magical. The food was extraordinary, the decor was breathtaking, and every detail was handled with such care.'
    },
    {
      name: 'Rahul Mehta',
      event: 'Corporate Gala',
      quote: 'Professional, punctual, and world-class catering. The team exceeded every expectation for our annual gala.'
    },
    {
      name: 'Sneha Patel',
      event: 'Birthday Party',
      quote: 'They turned my daughter’s first birthday into a dream come true. The theme setup and food were both excellent.'
    }
  ],
  faq: [
    {
      question: 'Do you handle both catering and decor?',
      answer: 'Yes. Eventzee provides end-to-end event support including menus, styling, setup, and on-site coordination.'
    },
    {
      question: 'Can you customize menus for dietary needs?',
      answer: 'Yes. We handle vegetarian, vegan, Jain, and other dietary preferences based on guest requirements.'
    },
    {
      question: 'Do you provide services for corporate events?',
      answer: 'Absolutely. We manage corporate lunches, conferences, campus events, product launches, and gala nights.'
    },
    {
      question: 'How early should we book?',
      answer: 'For large weddings and peak-season events, book as early as possible. For smaller events, a few weeks is often enough.'
    },
    {
      question: 'Do you serve outside Mumbai?',
      answer: 'Yes. We can support selected events across India depending on scale, logistics, and venue requirements.'
    }
  ],
  contact: {
    address: '42, Event Plaza, MG Road, Mumbai, Maharashtra 400001',
    phone: '+91 98765 43210',
    email: 'hello@eventzee.in',
    whatsapp: '+919876543210',
    hours: 'Mon-Sat, 9:00 AM - 7:00 PM',
    responseTime: 'Replies within 2 hours'
  },
  socialLinks: {
    instagram: 'https://instagram.com/eventzee',
    facebook: 'https://facebook.com/eventzee',
    youtube: 'https://youtube.com/@eventzee'
  }
};

module.exports = { defaultSiteContent };