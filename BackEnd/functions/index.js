///npm install twilio
///npm install dotenv
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//After cleaning up files, import them and call their functions w/ "exports"
const TwilioTools = require("./Twilio");
const FirebaseTools = require("./Firebase");


exports.AddEmergencyUser = FirebaseTools.addEmergencyUser;
exports.TwilioText = TwilioTools.SendText;
exports.DeclineContactRequest = TwilioTools.DeclineContactRequest;
exports.TwilioCall = TwilioTools.SendCall;


///Sample function
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

