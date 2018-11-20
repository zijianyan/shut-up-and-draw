const User = require('./user')
const db = require('../db')
// const Game = require('./game')
// const Submission = require('./submission')


const Game = db.define('game', {
  roundNumber: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0
  },
  players: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING)
  },
  status: {
    type: db.Sequelize.ENUM('active', 'complete')
  }
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


User.hasMany(Game);
Game.belongsTo(User); // zi: should a game belong to many users?

Game.hasMany(Submission);
Submission.belongsTo(Game);

User.hasMany(Submission);
Submission.belongsTo(User);

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
