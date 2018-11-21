/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Game = db.model('game')
const User = db.model('user')
const seed = require('../../script/seed');


describe('Game routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
      .then(()=> seed());
  });


  describe('/api/games/', () => {

    it('GET /api/games/', async () => {
      const game = await Game.findOne()
      console.log('game ', game.dataValues.id)
      const res = await request(app)
        .get(`/api/games/${game.id}`)
        .expect(200)

    })
  }) // end describe('/api/users')
}) // end describe('User routes')
