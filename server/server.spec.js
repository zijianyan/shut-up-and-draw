const expect = require('chai').expect
const { User, Game, Submission } = require('./db/models')
const { syncAndSeed } = require('./db');

const db = require('./db');

describe('models', ()=> {

  beforeEach(()=> async ()=> {
    await db.sync({ force: true })
    const [moe] = await Promise.all([
      User.create({ email: 'moe@moe.com' })
    ])
  })

  

  // it('they exist', ()=> {
  //   expect(User).to.be.ok
  //   expect(Game).to.be.ok
  //   expect(Submission).to.be.ok
  // })

  


})