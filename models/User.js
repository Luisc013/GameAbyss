const Sequelize = require('sequelize')
const database = require('../config/database')  

const User = database.define('user', {
    name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
})

module.exports =  User;