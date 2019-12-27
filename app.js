const express = require('express')
const path = require('path')

const app = express()

// for body parser
app.use(express.urlencoded({ extended: false }))

// serve static files 
app.use(express.static(path.join(__dirname, 'public')))

// template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(3000, () => {
    console.log('server is running on port 3000')
})

module.exports = app