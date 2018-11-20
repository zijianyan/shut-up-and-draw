const User = require('./user')
const Game = require('./Game')
const Submission = require('./Submission')


Submission.belongsTo(Game)
Submission.belongsTo(User)


// const syncAndSeed = async ()=> {
//   try {
//     await db.sync({force: true})
//     const [Emily, Cang, Zi] = await Promise.all([
//         User.create({ name: 'emily'}),
//         User.create({ name: 'cang' }),
//         User.create({ name: 'zi' }),
//     ])
//     const [Game1] = await Promise.all([
//       Game.create({ roundNumber: 1}),
//     ])


//     const [answer1] = await Promise.all([
//       Submission.create({ guess: 'dog'}),
//     ])
//     const [response1, response2] = await Promise.all([
//       Submission.create({ type: 'guess', guess: 'horse'}),
//       Submission.create({ type: 'drawing', drawingUrl: 'img.jpeg'}),
//     ])


//     await Promise.all([
//       answer1.setGame(Game1),
//       answer1.setUser(Zi),
//       response1.setUser(Cang),
//       response2.setUser(Emily),
//     ])
//   } catch(error) {
//     console.log(error)
//   }

// };



/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

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
