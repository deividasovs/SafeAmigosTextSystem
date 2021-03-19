const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});


//defining credentials
var accountSid = "AC79b407975ae9f0b4d19af767e5da6b77";
var authToken = "ea8845abc935e2fbfcce8ee4e18b8994";

var twilio = require('twilio');
var client = require('twilio')(accountSid, authToken); //defining client variable

//create outbound call
client.calls.create({
    url: 'http://demo.twilio.com/docs/voice.xml', //instructions fro when call connects
    to: '+353861054656', //who is receiving 
    from: '+353862246656' //where call is coming from
}, function(err, call) {
    if (err) {
        console.log(err); //if error, log error in console
    } else {
        console.log(call.sid) //else, log completed call
    }
})