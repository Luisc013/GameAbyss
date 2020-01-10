const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('home'))

    router.get('/', (req, res) => {
      // use res.render to load up an ejs view file
      res.render('home.ejs')
      })

      router.get('/dashboard', ensureAuthenticated, (req, res) =>
      res.render('dashboard', {
        user: req.user
      })
    );
    
    router.get('/indies', (req, res) => {
        res.render('indie.ejs')
        })
      
      router.get('/community', (req, res) => {
        res.render('community.ejs')
        })
        
        router.get('/about', (req, res) => {
res.render('about.ejs')
})

module.exports = router