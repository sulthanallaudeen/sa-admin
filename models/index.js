const Sequelize = require('sequelize');
var env = require('dotenv').config()

const sequelize = new Sequelize(env.parsed.DB_DATABASE, env.parsed.DB_USERNAME, env.parsed.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  api_token: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
}, {
  // options
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {User: User, sequelize : sequelize}