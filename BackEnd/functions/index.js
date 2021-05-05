const functions = require("firebase-functions"); ///Make sure Firebase functions can be called
const FirebaseTools = require("./Firebase");
const OverLoadTools = require("./OverloadProcess");

//For exporting to firebase cloud
exports.EmergencyContact = FirebaseTools.emergencyContact;
exports.AddNewUser = OverLoadTools.AddNewUser;
exports.ContactDecline = OverLoadTools.contactDeclined;

///Sample function
exports.helloWorld = functions.https.onRequest((request, response) => {
    ///Handy little snippet for getting the page url https://stackoverflow.com/questions/51226826/retrieve-the-current-unique-url-of-a-firebase-function
   // const url = `https://${request.header('host')}/${process.env.FUNCTION_TARGET}${request.originalUrl}`;
   // console.log("Link is: " + url);
});

