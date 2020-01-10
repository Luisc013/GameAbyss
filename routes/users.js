const express = require('express')
const router = express.Router()
const database = require('../config/database')
const User = require('../models/User')

//Get Users list
router.get('/', (req, res) => 
User.findAll()
    .then(users => {
        console.log(users)
        res.sendStatus(200)
    })
    .catch(err => console.log(err))
)

//Add a User
router.get('/add', (req, res) => {
    const data = {
        name: 'Sham',
      password: 'kill',
      email: 'Sham@example.com'
    }
    let { name, password, email } = data

    //Insert into table
    User.create({
        name,
        password,
        email
    })
    .then(user => res.redirect('/users'))
    .catch(err => console.log(err))
})


module.exports = router