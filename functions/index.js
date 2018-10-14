const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const AccessToken = require('twilio').jwt.AccessToken;


const ChatGrant = AccessToken.IpMessagingGrant;


let config = {
  accountSid: 'ACfadb650fc47f730e09bcfc240a6063b0',
  chatServiceSid: 'IS95938c018c0b4a57b457665d394f4358',
  apiKey: 'SKc216c19799a909a490bdaf56e8915064',
  apiSecret: 'Y00iRXlhRS5zj8vzJMIy74ueHJxgIZxc'
}

exports.getToken = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {

    const identity = req.query.identity;
    // console.log(req);
    // console.log(req.query.identity)
    // console.log(req.params)
    const accessToken = new AccessToken(config.accountSid, config.apiKey, config.apiSecret);
    const chatGrant = new ChatGrant({
      serviceSid: config.chatServiceSid,
      endpointId: `${identity}:browser`
    });
    accessToken.addGrant(chatGrant);
    accessToken.identity = identity;
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
      token: accessToken.toJwt(),
      identity: identity
    }));
  });
});
