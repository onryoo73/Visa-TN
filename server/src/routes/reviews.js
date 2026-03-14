const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', controller.getReviews);
router.post('/', controller.createReview);
router.delete('/:id', adminAuth, controller.deleteReview);

module.exports = router;
