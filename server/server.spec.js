const expect = require('chai').expect;
const { User, Game, Submission } = require('./db/models');
const seed = require('../script/seed');
const app = require('supertest')(require('./index'));

const db = require('./db');

describe('Seeded models', ()=> {

  beforeEach(()=> seed());

  describe('Seeded Users', ()=> {
    it('has three users', async ()=> {
      const users = await User.findAll();
      expect(users.length).to.equal(3);
    });
  });

  describe('Seeded Game', ()=> {
    it('has one game', async ()=> {
      const games = await Game.findAll();
      expect(games.length).to.equal(1);
    });
  });

});


describe('Playing the game', ()=> {

  it('can play a full round', async ()=> {
    const zi = User.findOne({ where: { email: 'zi@email.com' }});
    const emily = User.findOne({ where: { email: 'emily@email.com' }});
    const cang = User.findOne({ where: { email: 'cang@email.com' }});
    return app.post('/api/games')
      .send({ players: [ 'zi', 'emily', 'cang' ] })
      .expect(200)
      .then( async (response) => {
        expect(response).to.be.ok;
        const createdGame = await Game.findOne({ where: { status: 'active' }, include: [Submission] });
        expect(createdGame).to.be.ok;
        expect(createdGame.submissions.length).to.equal(1);
        expect(createdGame.roundNumber).to.equal(0);

        return app.post(`/api/submissions/${createdGame.id}`)
          .send({ type: 'drawing', drawingUrl: 'placeholder-url', gameId: createdGame.id, userId: zi.id }) // a drawing submission
          .expect(200)
          .then( async (response)=> {
            const createdGame = await Game.findOne({
              where: { status: 'active' },
              include: [{
                model: Submission
              }],
              order: [
                [ Submission, 'createdAt', 'ASC']
              ]
            });

            expect(createdGame.roundNumber).to.equal(1);
            expect(createdGame.submissions.length).to.equal(2);
            expect(createdGame.submissions[1].type).to.equal('drawing');
            
            
          })
          

      })
  });
});


