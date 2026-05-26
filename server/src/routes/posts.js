const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', controller.getPosts);
router.get('/all', adminAuth, controller.getAllPostsAdmin);
router.get('/:slug', controller.getPostBySlug);
router.post('/', adminAuth, controller.createPost);
router.patch('/:id', adminAuth, controller.updatePost);
router.delete('/:id', adminAuth, controller.deletePost);

module.exports = router;
