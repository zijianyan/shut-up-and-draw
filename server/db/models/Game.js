const db = require('../db')
const {nudgeText} = require('../../twilio')


const Game = db.define('game', {
  roundNumber: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0
  },
  players: {
    type: db.Sequelize.ARRAY(db.Sequelize.INTEGER)
  },
  status: {
    type: db.Sequelize.ENUM('active', 'complete'),
    defaultValue: 'active'
  },
  gameHash: {
    type: db.Sequelize.STRING,
    validate: {
      isUnique: (value, next) => {
        Game.findOne({
          where: {
            gameHash: value
          }
        })
        .done((err, game) => {
          if(err) {
            return next(err)
          }
          if(game) {
            return next('Please try again!')
          }
        })
        next()
      }
    }
  }
}, {
  hooks: {
    beforeUpdate: (game)=> {
      game.status = game.roundNumber+1 >= game.players ? 'complete' : 'active';
    }
  }
})

Game.prototype.getCurrentPlayer = function() {
  return this.players[this.roundNumber]; // check for off-by-one errors
};

Game.prototype.incrementRound = async function() {
  if(this.roundNumber+1 >= this.players.length) {
    this.status = 'complete'
  } else {
    this.roundNumber = this.roundNumber+1
  }
  User.findById(this.players[this.roundNumber])
  .then(user => {
    if (user) { // if it's the last submission, there won't be a user found
      nudgeText(user.phoneNumber)
      console.log('nudged the user', user.name)
    }
  })
  await this.save()
}

module.exports = Game
