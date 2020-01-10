const Sequelize = require('sequelize')
const database = require('../config/database')  

const User = database.define('user', {
    name: {
    type: Sequelize.STRING,
    required: true
  },
  password: {
    type: Sequelize.STRING,
    required: true
  },
  email: {
    type: Sequelize.STRING,
    required: true
  },
  fave_game: {
    type: Sequelize.STRING,
    required: true
  }
})

module.exports =  User;