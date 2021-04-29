const functions = require("firebase-functions");
const FirebaseTools = require("./Firebase");

/*
var admin = require("firebase-admin");
admin.initializeApp(); ///Required to initialize before any functions are called

var db = admin.database();
//References the database key to use
var ref = db.ref("users/");*/

//defining Twilio credentials
var accountSid = "AC79b407975ae9f0b4d19af767e5da6b77";
var authToken = "ea8845abc935e2fbfcce8ee4e18b8994";

var twilio = require('twilio');
var client = require('twilio')(accountSid, authToken); //defining client variable

//Variables setting data relating to requested user
var fromName = "";
var fromPhoneNumber = "";

var toName = "";
var toNumber = "";

//console.log(FirebaseTools.GetPersonToCall("0862242312"));

///https://stackoverflow.com/questions/51861909/firebase-callable-function-not-receiving-arguments
//receiving details of whom to ring
exports.SendCall = functions.https.onCall((data, context) => {
    SendCall(data.toNumber, data.fromPhoneNumber, data.Location);
});

///Functions same way as SendCall except for sending a text
exports.SendText = functions.https.onCall((data, context) => {
    SendText(data.fromName, data.fromPhoneNumber, data.toName, data.toNumber, data.Location);
});

exports.DeclineContactRequest = functions.https.onCall((data, context) => {
    DeclineContactRequest(data.fromName, data.fromPhoneNumber, data.toName, data.toNumber);
});


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


///Ryans Part
function SendText(fromName, fromNum, toName, toNumber, location) {

    client.messages.create({
        body: 'Test Text Message from ' + fromName + ' for ' + toName,
        from: fromNum,
        to: toNumber
    }, function(err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}


//Padraig's Part
//Function to contact next emergency contact if call is rejected
function NextContact() {
    //Call firebase function by name and pass json parameters relating to user
    var emergency_contacts = [fromPhoneNumber]
    setTimeout(() => { this.setState({ timePassed: true }) }, 30)

    for (i = 0; i < emergency_contacts.length; i++) {
        SendCall(toNumber, fromPhoneNumber)
        if (this.setState({ timePassed: true })) {
            console.log("Call declined. Notifying next emergency contact")
        } else {
            console.log("Called Succesfully");
            break;
        }
    }


}


function NextContact2(toNumber, fromPhoneNumber) {
    var emergencyNum = toNumber;
}

/*These are not in use!!!
//function for sending offer of emergency contact role
function SendContactRequest(fromName, fromNum, toName, toNumber) {

    client.messages.create({
        body: 'You have been requested to be an emergency contact for: ' + fromName +
            'on the SafeAmigos App. To accept, please click the following link: https://us-central1-safeamigos-66c18.cloudfunctions.net/AddEmergencyUser' +
            'To decline, please click the following link: https://us-central1-safeamigos-66c18.cloudfunctions.net/DeclineContactRequest',
        from: fromNum,
        to: toNumber
    }, function(err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}

//function for if someone declines responsibility of emergency contact
function DeclineContactRequest(fromName, fromNum, toName, toNumber) {

    client.messages.create({
        body: 'The request for ' + toName + 'to be added as an emergency contact on your SafeAmigos profile has been declined',
        from: toNumber,
        to: fromNumber
    }, function(err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}*/

// npm install --save haversine-distance
// https://www.npmjs.com/package/haversine-distance
function haversineDistance() {
    const haversine = require("haversine-distance");

    // TODO Variables to be taken from the database
    const location1 = { latitude: 37.8136, longitude: 144.9631 }
    const location2 = { latitude: 33.8650, longitude: 151.2094 }

    var meterDistance = (haversine(location1, location2));
    var kilometerDistance = (haversine(location1, location2) / 1000)
    console.log(meterDistance) // in meters
    console.log(kilometerDistance) // in KM
}



