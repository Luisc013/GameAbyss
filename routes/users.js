const express = require('express')
const router = express.Router()
const User = require('../models/user')

    // All users route
    router.get('/', (req, res) => { 
    res.render('users/index')
    })

    // New users route
    router.get('/new', (req, res) => {
    res.render('users/new', { user: new User() })
    })

    // Create user route
    router.post('/', (req, res) => {
        const user = new User({
            name: req.body.name
        })
        user.save((error, newUser) => {
            if(err) {
                res.render ('users/new', {
                    user: user, 
                    errorMessage: "Error creating profile"
                })
            } else {
                // res.redirect(`users/${newUser.id}`)
                res.redirect(`users`)
            }
        })
    res.send(req.body.name)
    })
    
    module.exports = router