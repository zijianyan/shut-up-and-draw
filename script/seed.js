'use strict'

const db = require('../server/db')
const {User, Game, Submission} = require('../server/db/models')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const [emily, cang, zi] = await Promise.all([
      User.create({ email: 'emily@email.com', password: 'EMILY', name: 'emily' }),
      User.create({ email: 'cang@email.com', password: 'CANG', name: 'cang' }),
      User.create({ email: 'zi@email.com', password: 'ZI', name: 'zi' }),
    ])
    const [completedGame, activeGame] = await Promise.all([
      Game.create({ roundNumber: 2, status: 'complete', players: [cang.id, emily.id, zi.id]}),
      Game.create({ roundNumber: 1, status: 'active', players: [cang.id, emily.id, zi.id]})
    ])
    //create submissions for completedGame

      await Submission.create({ type: 'phrase', phrase: 'pigeon stole your bagel', userId: cang.id, gameId: completedGame.id})
      await Submission.create({ type: 'drawing', drawingUrl: '{"lines":[{"points":[{"x":105,"y":103.25},{"x":105,"y":103.25},{"x":133,"y":117.25},{"x":185,"y":144.25},{"x":230,"y":173.25},{"x":269,"y":198.25},{"x":288,"y":209.25},{"x":301,"y":218.25},{"x":311,"y":226.25},{"x":314,"y":229.25},{"x":315,"y":231.25},{"x":316,"y":232.25},{"x":316,"y":233.25},{"x":317,"y":234.25},{"x":317,"y":235.25},{"x":318,"y":237.25},{"x":320,"y":239.25},{"x":320,"y":240.25},{"x":320,"y":236.25}],"brushColor":"#222","brushRadius":5},{"points":[{"x":315,"y":50.25},{"x":315,"y":50.25},{"x":308,"y":60.25},{"x":290,"y":83.25},{"x":277,"y":98.25},{"x":268,"y":110.25},{"x":238,"y":150.25},{"x":224,"y":173.25},{"x":216,"y":184.25},{"x":206,"y":200.25},{"x":195,"y":216.25},{"x":189,"y":225.25},{"x":186,"y":230.25},{"x":184,"y":234.25},{"x":182,"y":237.25},{"x":181,"y":238.25},{"x":181,"y":239.25},{"x":180,"y":241.25},{"x":178,"y":244.25},{"x":176,"y":248.25},{"x":173,"y":253.25},{"x":168,"y":259.25},{"x":164,"y":267.25},{"x":158,"y":277.25},{"x":156,"y":281.25},{"x":154,"y":283.25},{"x":153,"y":283.25}],"brushColor":"#222","brushRadius":5}],"width":400,"height":400}', userId: cang.id, gameId: completedGame.id})
      await Submission.create({ type: 'phrase', phrase: 'avian bird flu', userId: emily.id, gameId: completedGame.id})
      await Submission.create({ type: 'drawing', drawingUrl: '{"lines":[{"points":[{"x":105,"y":103.25},{"x":105,"y":103.25},{"x":133,"y":117.25},{"x":185,"y":144.25},{"x":230,"y":173.25},{"x":269,"y":198.25},{"x":288,"y":209.25},{"x":301,"y":218.25},{"x":311,"y":226.25},{"x":314,"y":229.25},{"x":315,"y":231.25},{"x":316,"y":232.25},{"x":316,"y":233.25},{"x":317,"y":234.25},{"x":317,"y":235.25},{"x":318,"y":237.25},{"x":320,"y":239.25},{"x":320,"y":240.25},{"x":320,"y":236.25}],"brushColor":"#222","brushRadius":5},{"points":[{"x":315,"y":50.25},{"x":315,"y":50.25},{"x":308,"y":60.25},{"x":290,"y":83.25},{"x":277,"y":98.25},{"x":268,"y":110.25},{"x":238,"y":150.25},{"x":224,"y":173.25},{"x":216,"y":184.25},{"x":206,"y":200.25},{"x":195,"y":216.25},{"x":189,"y":225.25},{"x":186,"y":230.25},{"x":184,"y":234.25},{"x":182,"y":237.25},{"x":181,"y":238.25},{"x":181,"y":239.25},{"x":180,"y":241.25},{"x":178,"y":244.25},{"x":176,"y":248.25},{"x":173,"y":253.25},{"x":168,"y":259.25},{"x":164,"y":267.25},{"x":158,"y":277.25},{"x":156,"y":281.25},{"x":154,"y":283.25},{"x":153,"y":283.25}],"brushColor":"#222","brushRadius":5}],"width":400,"height":400}', userId: zi.id, gameId: completedGame.id})


    //create submissions for active game

      await Submission.create({ type: 'phrase', phrase: 'pigeon stole your bagel', userId: cang.id, gameId: activeGame.id})
      await Submission.create({ type: 'drawing', drawingUrl: 'img.jpeg', userId: cang.id, gameId: activeGame.id})

    // console.log(`seeded game ${Game1.id}`)
    console.log(`seeded successfully`)
  } catch (error) {
    console.log(error)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
