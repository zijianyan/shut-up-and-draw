
const twilio = require('twilio');


const twilioClient = twilio('AC9d3c93251038f476201a6ff834b0765e', process.env.TWILIO_AUTH);

// verify numbers twilio.com/user/account/phone-numbers/verified
const nudgeText = phoneNumber => {
  twilioClient.messages
    .create({
      from: process.env.TWILIO_NUM,
      body: `Your turn on EZC!`,
      to: phoneNumber
    })
    .catch(e => {
      console.log(` failed: ${e}`);
    });
};


module.exports = {
  nudgeText
};
