/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Game = db.model('game')

describe('Game model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let game

      beforeEach(async () => {
        game = await Game.create({})
      })

      it('adds', ()=> {
        expect(1+1).to.equal(2)
      })
      it('game can be created', ()=> {
        expect(game.id).to.be.ok
      })


    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
