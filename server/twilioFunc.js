const twilio = require('twilio');
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const nudgeText = (phoneNumber, game) => {
  console.log(game)
  twilioClient.messages
    .create({
      from: process.env.TWILIO_NUM,
      body: `Your turn to shut up and draw!: https://ezc.herokuapp.com/games/${game.id}/submission?gameHash=${game.gameHash}`,
      to: phoneNumber,
      mediaUrl: 'https://ezc.herokuapp.com/games/${game.id}/submission?gameHash=${game.gameHash}'
    })
    .catch(e => {
      console.log(`failed: ${e}`);
    });
};

module.exports = {nudgeText}
