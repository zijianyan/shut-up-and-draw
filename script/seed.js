'use strict'

const db = require('../server/db')
const {User, Game, Submission} = require('../server/db/models')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const [Emily, Zi, Cang] = await Promise.all([
      User.create({ email: 'emily@email.com'}),
      User.create({ email: 'cang@email.com' }),
      User.create({ email: 'zi@email.com' }),
    ])
    const [Game1] = await Promise.all([
      Game.create({ roundNumber: 1, status: 'closed'}),
    ])
    const [response1, response2] = await Promise.all([
      Submission.create({ type: 'phrase', phrase: 'horse'}),
      Submission.create({ type: 'drawing', drawingUrl: 'img.jpeg'}),
    ])
    await Promise.all([
      response1.setGame(Game1),
      response1.setUser(Zi),
      response2.setUser(Cang),
      response2.setGame(Game1),

    ])
    console.log(`seeded game ${Game1.id}`)
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
