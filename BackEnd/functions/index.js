///npm install twilio
///npm install dotenv
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//After cleaning up files, import them and call their functions w/ "exports"
const TwilioTools = require("./Twilio");

exports.TwilioText = TwilioTools.SendText;
exports.TwilioCall = TwilioTools.SendCall;


///Sample function
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

