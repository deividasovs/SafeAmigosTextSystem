/*
@authors 
*/

const functions = require("firebase-functions");

//defining credentials
var accountSid = "AC79b407975ae9f0b4d19af767e5da6b77";
var authToken = "ea8845abc935e2fbfcce8ee4e18b8994";

var twilio = require('twilio');
var client = require('twilio')(accountSid, authToken); //defining client variable


/*Old auth code*/
// Code for sending text messages. Only works for verified phone numbers.
/*
const accountSID = 'AC2a759941965bd0670a43ca5178083517';
const authenticationToken = '15e0b5829aa5e1ff3861567d9a63b0bc';
const client = require('twilio')(accountSID,authenticationToken);

*/



///Elliotts Part
function SendCall() {
    //create outbound call
    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml', //instructions fro when call connects
        to: '+353861054656', //who is receiving 
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
function SendText() {

    client.messages.create({
        body: 'Test Text Message',
        from: '+17149092867',
        to: '+353871934130'
    }, function (err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}