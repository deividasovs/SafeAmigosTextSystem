///npm install twilio
///npm install dotenv
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//After cleaning up files, import them and call their functions w/ "exports"
const TwilioTools = require("./Twilio");
const FirebaseTools = require("./Firebase");
const OverLoadTools = require("./OverloadProcess");

exports.EmergencyContact = FirebaseTools.emergencyContact;
exports.TwilioText = TwilioTools.SendText;
exports.DeclineContactRequest = TwilioTools.DeclineContactRequest;
exports.AddNewUser = OverLoadTools.AddNewUser;

///Sample function
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

