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

  const zi = User.findOne({ where: { email: 'zi@email.com' }});
  const emily = User.findOne({ where: { email: 'emily@email.com' }});
  const cang = User.findOne({ where: { email: 'cang@email.com' }});

  it('can play a full round', async ()=> {
    return app.post('/api/games')
      .send({ players: [ 'zi', 'emily', 'cang' ] })
      .expect(200)
      .then( async (response) => {
        expect(response).to.be.ok;
        const createdGame = await Game.findOne({ where: { status: 'active' }, include: [Submission] });
        expect(createdGame).to.be.ok;
        expect(createdGame.submissions.length).to.equal(1);
        expect(createdGame.roundNumber).to.equal(0);
        // console.log('createdGame:', createdGame.dataValues);

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

            // db.Page.findAll({
            //   include: [{
            //     model: db.Gallery
            //     include: [{
            //       model: db.Artwork
            //     }]
            //   }],
            //   order: [
            //     [ db.Gallery, 'order', 'DESC' ],
            //     [ db.Gallery, db.ArtWork, 'order', 'DESC' ]
            //   ]
            // })
            

            expect(createdGame.roundNumber).to.equal(1);
            expect(createdGame.submissions.length).to.equal(2);

            expect(createdGame.submissions[1].type).to.equal('drawing');
            
            // return app.post(
          })
          

      })
  });
});



// router.post('/gameId', async (req, res, next) => {
//   // POST a submission in association to the game it's being created within
//   // needs to come to this route with these attributes in the body
//   try {
//     const { type } = req.body;
//     let submission;

//     if(type === 'phrase') {
//       submission = await Submission.create({
//         type: req.body.type,
//         phrase: req.body.phrase,
//         gameId: req.params.gameId
//       });
//     } else {
//       // this is TBD because we haven't set up AWS and
//       // I'm unsure where the drawing URL is coming from
//       submission = await Submission.create({
//         type: req.body.type,
//         drawingUrl: req.body.drawing,
//         gameId: req.params.gameId
//       });
//     }

//     // after submission is created, we find the game and update the roundNumber pointer
//     const game = await Game.findById(req.params.gameId)
//     game.roundNumber++
//     await game.save()

//     res.send(submission);
//   } catch(err) {
//     next(err)
//   }
// })



// const Game = db.define('game', {
//   roundNumber: {
//     type: db.Sequelize.INTEGER,
//     defaultValue: 0
//   },
//   players: {
//     type: db.Sequelize.ARRAY(db.Sequelize.STRING)
//   },
//   status: {
//     type: db.Sequelize.ENUM('active', 'complete')
//   }
// })

// const Submission = db.define('submission', {
//   type: {
//     type: db.Sequelize.ENUM('drawing', 'phrase')
//   },
//   phrase: {
//     type: db.Sequelize.STRING
//   },
//   drawingUrl: {
//     type: db.Sequelize.STRING
//   },
// })

