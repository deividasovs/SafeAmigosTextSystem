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
    ///Handy little snippet for getting the page url https://stackoverflow.com/questions/51226826/retrieve-the-current-unique-url-of-a-firebase-function
    const url = `https://${request.header('host')}/${process.env.FUNCTION_TARGET}${request.originalUrl}`;
    console.log("Link is: " + url);
});

