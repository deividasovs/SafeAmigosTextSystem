const functions = require("firebase-functions");

//defining Twilio credentials
var accountSid = "AC79b407975ae9f0b4d19af767e5da6b77";
var authToken = "ea8845abc935e2fbfcce8ee4e18b8994";

var client = require('twilio')(accountSid, authToken); //defining client variable

///https://stackoverflow.com/questions/51861909/firebase-callable-function-not-receiving-arguments
//receiving details of whom to ring
exports.Call= function SendCallToUser(data){
    SendCall(data.toNumber, data.fromPhoneNumber, data.Location);
}

///Functions same way as SendCall except for sending a text
exports.SendText = function SendTextToUser(data){
    SendText(data.fromName, data.fromPhoneNumber, data.toName, data.toNumber, data.Location);
}

exports.DeclineContactRequest = functions.https.onCall((data, context) => {
    DeclineContactRequest(data.fromName, data.fromPhoneNumber, data.toName, data.toNumber);
});


///Ryans Part
function SendText(fromName, fromNum, toName, toNumber, location) {
    console.log("Sending Text to " + toName);

    client.messages.create({
        body: fromName + ` needs your help!!\n\nCall ` + fromNum +
        ` to help. \n\nClick ` + `https://us-central1-safeamigos-66c18.cloudfunctions.net/DeclineContactRequest 
        to decline. \n\nFind them at ` + location,
        from: "+19513632916",
        to: toNumber
    }, function(err, message) {     
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}

///Elliott's Part
function SendCall(numberToCall, fromPhoneNumber, location) {
    
    console.log("Calling " + numberToCall + " From " + fromPhoneNumber);
    //create outbound call
    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml', //instructions fro when call connects
        to: numberToCall, //who is receiving 
        from: fromPhoneNumber //where call is coming from
    }, function(err, call) {
        if (err) {
            console.log(err); //if error, log error in console
        } else {
            console.log(call.sid) //else, log completed call
        }
    })
}
