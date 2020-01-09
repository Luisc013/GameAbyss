const express = require('express')
const router = express.Router()

    router.get('/', (req, res) => {
    // use res.render to load up an ejs view file
    res.render('home.ejs')
    })
    
    router.get('/indies', (req, res) => {
    res.render('indie.ejs')
    })
    
    router.get('/community', (req, res) => {
    res.render('../views/community.ejs')
    })
    
    router.get('/about', (req, res) => {
    res.render('about.ejs')
    })
    
    router.get('/profile', (req, res) => {
    res.render('index.ejs')
    })
    
    router.get('/login', (req, res) => {
    res.render('login.ejs')
    })
    
    router.get('/register', (req, res) => {
      res.render('register.ejs')
    })

    
    router.delete('/logout', (req, res) => {
      req.logOut()
      res.redirect('/login')
    })

    module.exports = router