const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Post = require('../models/Post');
const Sequelize = require('sequelize');

// Get post feed
router.get('/', (req, res) => 
  Post.findAll()
    .then(posts => res.render('posts', {
        posts
      }))
    .catch(err => console.log(err)));

// Display post form
router.get('/add', (req, res) => res.render('addpost'));

// Add a post
router.post('/add', (req, res) => {
  let { title, description} = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  // Check for errors
  if(errors.length > 0) {
    res.render('posts', {
      errors,
      title, 
      description
    });
  } else {

    // Insert into table
    Post.create({
      title,
      description,
    })
      .then(post => res.redirect('/posts'))
      .catch(err => console.log(err));
  }
});


module.exports = router;