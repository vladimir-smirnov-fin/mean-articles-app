const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Получить все статьи
router.get('/', async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json({
      success: true,
      posts: posts
    });
  } catch (err) {
    console.log('Error getting posts:', err);
    res.json({
      success: false,
      msg: 'Error loading posts'
    });
  }
});

// Получить одну статью по ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.getPostById(req.params.id);
    if (!post) {
      return res.json({
        success: false,
        msg: 'Article not found'
      });
    }
    res.json({
      success: true,
      post: post
    });
  } catch (err) {
    console.log('Error getting article:', err);
    res.json({
      success: false,
      msg: 'Error loading article'
    });
  }
});

// Добавить новую статью
router.post('/add', async (req, res) => {
  try {
    console.log('Attempting to add article:', req.body.title);
    
    let newPost = {
      title: req.body.title,
      anons: req.body.anons,
      text: req.body.text,
      author: req.body.author || 'Anonymous'
    };

    const post = await Post.addPost(newPost);
    console.log('Article successfully added:', post.title);
    
    res.json({
      success: true,
      msg: "Article successfully added!",
      post: post
    });
    
  } catch (err) {
    console.log('Error adding article:', err.message);
    res.json({
      success: false,
      msg: "Error adding article"
    });
  }
});

// Удалить статью
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.deletePost(req.params.id);
    if (!post) {
      return res.json({
        success: false,
        msg: 'Article not found'
      });
    }
    res.json({
      success: true,
      msg: 'Article successfully deleted'
    });
  } catch (err) {
    console.log('Error deleting article:', err);
    res.json({
      success: false,
      msg: 'Error deleting article'
    });
  }
});

// Обновить статью
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.json({
        success: false,
        msg: 'Article not found'
      });
    }
    res.json({
      success: true,
      msg: 'Article successfully updated',
      post: updatedPost
    });
  } catch (err) {
    console.log('Error updating article:', err);
    res.json({
      success: false,
      msg: 'Error updating article'
    });
  }
});

module.exports = router;