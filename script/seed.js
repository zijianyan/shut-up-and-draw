'use strict'

const db = require('../server/db/db')
const Submission = require('../server/db/models/Submission')
const User = require('../server/db/models/user')
const Game = require('../server/db/models/Game')
const crypto = require('crypto')
const { HASH_SECRET } = require('../secrets')
const { game1drawing1, game1drawing2, game2drawing1, game2drawing2, game2drawing3 } = require('./drawings');

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    const [emily, cang, zi] = await Promise.all([
      User.create({ email: 'emily@email.com', password: 'EMILY', name: 'emily', phoneNumber: process.env.EMILY_PHONENUMBER }),
      User.create({ email: 'cang@email.com', password: 'CANG', name: 'cang' , phoneNumber: process.env.CANG_PHONENUMBER }),
      User.create({ email: 'zi@email.com', password: 'ZI', name: 'zi' , phoneNumber: process.env.ZI_PHONENUMBER}),
      User.create({ email: 'prof@email.com', password: 'PROF', name: 'Prof' , phoneNumber: process.env.ZI_PHONENUMBER}),
      User.create({ email: 'eliot@email.com', password: 'ELIOT', name: 'Eliot' , phoneNumber: process.env.ZI_PHONENUMBER}),
    ])

    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();


    const completedGameHash1 = await crypto.createHash('sha256').update('1').update(process.env.HASH_SECRET || HASH_SECRET).digest('hex')

    const completedGameHash2 = await crypto.createHash('sha256').update('2').update(process.env.HASH_SECRET || HASH_SECRET).digest('hex')

    console.log('completedGameHash1: ', completedGameHash1)

    // had to add 1 to the current date because this seed file was creating these games at the same time which resulted in the same hash number - I'm going to make the hash on the model unique
    const activeGameHash = await crypto.createHash('sha256').update('3').update(process.env.HASH_SECRET || HASH_SECRET).digest('hex')

    console.log('activeGameHash: ', activeGameHash)

    // setTimeout()


    const [completedGame1, completedGame2, activeGame] = await Promise.all([
      Game.create({ roundNumber: 2, status: 'complete', players: [cang.id, emily.id, zi.id], gameHash: completedGameHash1 }),
      Game.create({ roundNumber: 3, status: 'complete', players: [cang.id, emily.id, zi.id], gameHash: completedGameHash2 }),
      Game.create({ roundNumber: 1, status: 'active', players: [cang.id, emily.id, zi.id], gameHash: activeGameHash })
    ])

    //create submissions for completedGame1

      await Submission.create({ type: 'phrase', phrase: 'pigeon stole your bagel', userId: cang.id, gameId: completedGame1.id})
      await Submission.create({ type: 'drawing', drawingUrl: game1drawing1, userId: cang.id, gameId: completedGame1.id})
 
      await Submission.create({ type: 'phrase', phrase: 'avian bird flu', userId: emily.id, gameId: completedGame1.id})
      await Submission.create({ type: 'drawing', drawingUrl: game1drawing2, userId: zi.id, gameId: completedGame1.id})

    //create submissions for completedGame2

      await Submission.create({ type: 'phrase', phrase: 'Paul McCartney changes a tire', userId: cang.id, gameId: completedGame2.id})
      await Submission.create({ type: 'drawing', drawingUrl: game2drawing1, userId: cang.id, gameId: completedGame2.id})
 
      await Submission.create({ type: 'phrase', phrase: 'Failed Musician pays bills as a mechanic', userId: zi.id, gameId: completedGame2.id})
      await Submission.create({ type: 'drawing', drawingUrl: game2drawing2, userId: emily.id, gameId: completedGame2.id})

      await Submission.create({ type: 'phrase', phrase: 'Floating Wrench Man hates pianos', userId: cang.id, gameId: completedGame2.id})
      await Submission.create({ type: 'drawing', drawingUrl: game2drawing3, userId: zi.id, gameId: completedGame2.id})
      
      await Submission.create({ type: 'phrase', phrase: 'Dubstep', userId: emily.id, gameId: completedGame2.id})


    //create submissions for active game

      await Submission.create({ type: 'phrase', phrase: 'pigeon stole your bagel', userId: cang.id, gameId: activeGame.id})
      await Submission.create({ type: 'drawing', drawingUrl: '{"lines":[{"points":[{"x":296,"y":119.25},{"x":296,"y":119.25},{"x":290,"y":119.25},{"x":278,"y":119.25},{"x":276,"y":119.25},{"x":275,"y":119.25},{"x":275,"y":122.25},{"x":279,"y":127.25},{"x":284,"y":135.25},{"x":290,"y":144.25},{"x":304,"y":156.25},{"x":311,"y":160.25},{"x":319,"y":163.25},{"x":325,"y":165.25},{"x":329,"y":166.25},{"x":331,"y":166.25},{"x":332,"y":166.25},{"x":333,"y":164.25},{"x":334,"y":162.25},{"x":334,"y":160.25},{"x":334,"y":158.25},{"x":333,"y":155.25},{"x":331,"y":151.25},{"x":330,"y":147.25},{"x":324,"y":138.25},{"x":321,"y":133.25},{"x":317,"y":126.25},{"x":312,"y":117.25},{"x":308,"y":112.25},{"x":303,"y":109.25},{"x":299,"y":106.25},{"x":295,"y":105.25},{"x":291,"y":103.25},{"x":287,"y":102.25},{"x":283,"y":100.25},{"x":280,"y":100.25},{"x":276,"y":100.25},{"x":270,"y":100.25},{"x":266,"y":100.25},{"x":263,"y":102.25},{"x":259,"y":106.25},{"x":256,"y":110.25},{"x":253,"y":115.25},{"x":251,"y":119.25},{"x":247,"y":124.25},{"x":243,"y":131.25},{"x":240,"y":136.25},{"x":236,"y":142.25},{"x":234,"y":145.25},{"x":232,"y":149.25},{"x":230,"y":154.25},{"x":230,"y":156.25},{"x":230,"y":157.25},{"x":230,"y":159.25},{"x":230,"y":161.25},{"x":232,"y":166.25},{"x":236,"y":172.25},{"x":242,"y":180.25},{"x":251,"y":189.25},{"x":264,"y":200.25},{"x":280,"y":210.25},{"x":298,"y":219.25},{"x":304,"y":221.25},{"x":310,"y":224.25},{"x":314,"y":225.25},{"x":317,"y":227.25},{"x":319,"y":227.25},{"x":320,"y":228.25}],"brushColor":"#222","brushRadius":5}],"width":400,"height":400}', userId: cang.id, gameId: activeGame.id})

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
