const Review = require('../models/Review');

// GET /api/reviews — public, list all (newest first)
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

// POST /api/reviews — public, clients may submit a review with optional rating
exports.createReview = async (req, res, next) => {
  try {
    const { name, quote, rating } = req.body;
    if (!name || !quote) {
      return res.status(400).json({ success: false, message: 'Name and quote are required' });
    }
    let r = parseInt(rating, 10);
    if (Number.isNaN(r)) r = 5;
    if (r < 1) r = 1;
    if (r > 5) r = 5;
    const review = await Review.create({ name: name.trim(), quote: quote.trim(), rating: r });
    res.status(201).json({ success: true, message: 'Review added', data: review });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/reviews/:id — admin only
exports.deleteReview = async (req, res, next) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};
