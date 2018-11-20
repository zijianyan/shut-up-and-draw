const db = require('../db')

const Submission = db.define('submission', {
  type: {
    type: db.Sequelize.ENUM('drawing', 'guess')
  },
  guess: {
    type: db.Sequelize.STRING
  },
  drawingUrl: {
    type: db.Sequelize.STRING
  },
})

module.exports = Submission
