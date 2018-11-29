const db = require('../db')
const Game = require ('./Game')
const User = require ('./user')
const Submission = require ('./Submission')


Game.hasMany(Submission);
Submission.belongsTo(Game);

User.hasMany(Submission);
Submission.belongsTo(User);


module.exports = {
  User,
  Game,
  Submission
}
