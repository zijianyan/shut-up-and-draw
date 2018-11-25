const twilio = require('twilio');


const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// verify numbers twilio.com/user/account/phone-numbers/verified
const nudgeText = phoneNumber => {
  twilioClient.messages
    .create({
      from: process.env.TWILIO_NUM,
      body: `Your turn on EZC!`,
      to: phoneNumber
    })
    .catch(e => {
      console.log(`sendWelcomeText failed: ${e}`);
    });
};


module.exports = {
  nudgeText
};
