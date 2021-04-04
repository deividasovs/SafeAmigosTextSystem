/*
@authors 
*/

const functions = require("firebase-functions");

//defining credentials
var accountSid = "AC79b407975ae9f0b4d19af767e5da6b77";
var authToken = "ea8845abc935e2fbfcce8ee4e18b8994";

var twilio = require('twilio');
var client = require('twilio')(accountSid, authToken); //defining client variable

//Variables setting data relating to requested user
var usersName = "";
var usersNumber = "";


///https://stackoverflow.com/questions/51861909/firebase-callable-function-not-receiving-arguments
//Code that receives details of whom to ring
exports.SendCall = functions.https.onCall((data, context) => {
    usersNumber = data.phoneNumber;
    SendCall(usersNumber);
});

///Functions same way as SendCall except for sending a text
exports.SendText = functions.https.onCall((data, context) => {
    usersNumber = data.phoneNumber;
    usersName = data.name;
    SendText(usersname, usersNumber);
});



///Elliotts Part
function SendCall(numberToCall) {
    //create outbound call
    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml', //instructions fro when call connects
        to: numberToCall, //who is receiving 
        from: '+353862246656' //where call is coming from
    }, function (err, call) {
        if (err) {
            console.log(err); //if error, log error in console
        } else {
            console.log(call.sid) //else, log completed call
        }
    })
}



///Ryans Part
function SendText(fromName, toNumber) {

    client.messages.create({
        body: 'Test Text Message from ' + fromName,
        from: '+17149092867',
        to: toNumber
    }, function (err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}