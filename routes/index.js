const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('home'))

    router.get('/', (req, res) => {
      // use res.render to load up an ejs view file
      res.render('home.ejs')
      })
    
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