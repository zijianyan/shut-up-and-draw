const User = require('./user')
const db = require('../db')
// const Game = require('./game')
// const Submission = require('./submission')


const Game = db.define('game', {
  roundNumber: {
    type: db.Sequelize.INTEGER
  },
  players: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING)
  },
  status: db.Sequelize.ENUM('active', 'closed')
})


const Submission = db.define('submission', {
  type: {
    type: db.Sequelize.ENUM('drawing', 'phrase')
  },
  phrase: {
    type: db.Sequelize.STRING
  },
  drawingUrl: {
    type: db.Sequelize.STRING
  },
})
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Submission.belongsTo(Game)
Submission.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Game,
  Submission
}
