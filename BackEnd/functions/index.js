///npm install twilio
///npm install dotenv
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//After cleaning up files, import them and call their functions w/ "exports"
const TwilioTools = require("./Twilio");
const FirebaseTools = require("./Firebase");

exports.TwilioText = TwilioTools.SendText;
exports.DeclineContactRequest = TwilioTools.DeclineContactRequest;
exports.TwilioCall = TwilioTools.SendCall;
exports.AddEmergencyUser = FirebaseTools.addEmergencyUser;

///Sample function
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

