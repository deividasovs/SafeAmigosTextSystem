///npm install twilio
///npm install dotenv
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//After cleaning up files, import them and call their functions w/ "exports"
const FirebaseTools = require("./Firebase");
const TwilioTools = require("./Twilio");

exports.FirebaseTools = FirebaseTools.personValue;
//exports.TwilioTools = TwilioTools.SendText;


///Sample function
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
    console.log("Called");
    response.json({result: "Hello from the App"});
    return ["Hello from return array"];
});

///Function that extracts the url from the browser
exports.getURL = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("The request was: " + request);
});

