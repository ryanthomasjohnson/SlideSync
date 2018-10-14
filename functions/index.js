const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const cors = require('cors')({ origin: true });
const AccessToken = require('twilio').jwt.AccessToken;


const ChatGrant = AccessToken.IpMessagingGrant;




exports.getToken = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {

    let config = {
      accountSid: functions.config().twilio.accountsid,
      chatServiceSid: functions.config().twilio.chatservicesid,
      apiKey: functions.config().twilio.apikey,
      apiSecret: functions.config().twilio.apisecret
    }
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
