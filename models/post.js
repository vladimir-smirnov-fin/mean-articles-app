const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  anons: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// СОЗДАЕМ МОДЕЛЬ
const Post = mongoose.model('Post', PostSchema);

// ЭКСПОРТИРУЕМ МОДЕЛЬ
module.exports = Post;

// Метод для добавления статьи
module.exports.addPost = async function(newPost) {
  try {
    const post = new Post(newPost);
    return await post.save();
  } catch (error) {
    throw error;
  }
};

// Метод для получения всех статей
module.exports.getAllPosts = async function() {
  try {
    return await Post.find().sort({ date: -1 }); // Сортировка по дате (новые сверху)
  } catch (error) {
    throw error;
  }
};

// Метод для получения одной статьи по ID
module.exports.getPostById = async function(id) {
  try {
    return await Post.findById(id);
  } catch (error) {
    throw error;
  }
};

// Метод для удаления статьи
module.exports.deletePost = async function(id) {
  try {
    return await Post.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

// Метод для обновления статьи
module.exports.updatePost = async function(id, updatedData) {
  try {
    return await Post.findByIdAndUpdate(id, updatedData, { new: true });
  } catch (error) {
    throw error;
  }
};