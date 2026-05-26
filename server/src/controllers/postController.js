const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    next(err);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

exports.getAllPostsAdmin = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, slug, excerpt, content, category, image } = req.body;
    if (!title || !slug || !excerpt || !content || !category) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const existing = await Post.findOne({ slug });
    if (existing) {
      return res.status(409).json({ success: false, message: 'A post with this slug already exists' });
    }
    const post = await Post.create({ title, slug, excerpt, content, category, image });
    res.status(201).json({ success: true, message: 'Post created', data: post });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};
    const fields = ['title', 'slug', 'excerpt', 'content', 'category', 'image', 'published'];
    for (const field of fields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    updates.updatedAt = new Date();
    if (Object.keys(updates).length <= 1) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }
    const post = await Post.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, message: 'Post updated', data: post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};
