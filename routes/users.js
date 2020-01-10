const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const database = require('../config/database')
const User = require('../models/User')



//Get Users list
router.get('/login', (req, res) => 
    res.render('login'))

router.get('/register', (req, res) => 
res.render('register'))

//Add a User
router.post('/register', (req, res) => {
    const { name, password, email, fave_game } = req.body
    let errors = []
    
    //error check required fields
    if(!name || !password || !email || !fave_game ) {
        errors.push({ msg: "Please fill in all fields"})
    }

    //Check password length
    if(password.length < 6) {
        errors.push({msg: "Password should be at least 6 characters"})
    }
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            password,
            email,
            fave_game
        })
    }   else {
        //Validation Success
        User.findOne({ email: email})
        .then(user => {
            if(user) {
                //User exist
                errors.push({ msg: 'Email is already registered'})
                res.render('register', {
                errors,
                name,
                password,
                email,
                fave_game
            })
         }   else {
                const newUser = new User({
                    name,
                    password,
                    email,
                    fave_game
                })
                console.log(newUser)
                res.send('hello')
            }
        })
    }

    //Insert into table
    // User.create({
    //     name,
    //     password,
    //     email,
    //     birthday,
    //     fave_game
    // })
    // .then(user => res.redirect('/users'))
    // .catch(err => console.log(err))
})


module.exports = router