'use strict'

const db = require('../server/db')
const {User, Game, Submission} = require('../server/db/models')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const [emily, zi, cang] = await Promise.all([
      User.create({ email: 'emily@email.com', password: 'EMILY', name: 'emily' }),
      User.create({ email: 'cang@email.com', password: 'CANG', name: 'cang' }),
      User.create({ email: 'zi@email.com', password: 'ZI', name: 'zi' }),
    ])
    const [completedGame, activeGame] = await Promise.all([
      Game.create({ roundNumber: 2, status: 'complete', players: [cang.id, emily.id, zi.id]}),
      Game.create({ roundNumber: 1, status: 'active', players: [cang.id, emily.id, zi.id]})
    ])
    //create submissions for completedGame
    await Promise.all([
      Submission.create({ type: 'phrase', phrase: 'horse', userId: zi.id, gameId: completedGame.id}),
      Submission.create({ type: 'drawing', drawingUrl: 'img.jpeg', userId: zi.id, gameId: completedGame.id}),
      Submission.create({ type: 'phrase', phrase: 'donkey', userId: emily.id, gameId: completedGame.id}),
      Submission.create({ type: 'drawing', drawingUrl: 'img.jpeg', userId: cang.id, gameId: completedGame.id})
    ])

    //create submissions for active game
    await Promise.all([
      Submission.create({ type: 'phrase', phrase: 'pirate', userId: zi.id, gameId: activeGame.id}),
      Submission.create({ type: 'drawing', drawingUrl: 'img.jpeg', userId: zi.id, gameId: activeGame.id}),
    ])

    // console.log(`seeded game ${Game1.id}`)
    // console.log(`seeded successfully`)
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
