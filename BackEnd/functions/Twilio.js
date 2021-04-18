/*
@authors 
*/

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



///https://stackoverflow.com/questions/51861909/firebase-callable-function-not-receiving-arguments
//Code that receives details of whom to ring
exports.SendCall = functions.https.onCall((data, context) => {
    fromPhoneNumber = data.fromPhoneNumber;
    toNumber = data.toNumber;
    SendCall(toNumber, fromPhoneNumber);
});


///Functions same way as SendCall except for sending a text
exports.SendText = functions.https.onCall((data, context) => {
    fromName = data.fromName;
    fromPhoneNumber = data.fromPhoneNumber;
    toName = data.toName;
    toNumber = data.toNumber;
    SendText(fromName, fromPhoneNumber, toName, toNumber);
});

exports.DeclineContactRequest = functions.https.onCall((data, context) => {
    fromName = data.fromName;
    fromPhoneNumber = data.fromPhoneNumber;
    toName = data.toName;
    toNumber = data.toNumber;
    DeclineContactRequest(fromName, fromPhoneNumber, toName, toNumber);
});




///Elliotts Part
function SendCall(numberToCall, fromNum) {
    //create outbound call
    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml', //instructions fro when call connects
        to: numberToCall, //who is receiving 
        from: fromPhoneNumber //where call is coming from
    }, function (err, call) {
        if (err) {
            console.log(err); //if error, log error in console
        } else {
            console.log(call.sid) //else, log completed call
        }
    })
}

//Padraigs Part
//Function to contact next emergency contact if call is rejected
function NextContact () {
    //Call firebase function by name and pass json parameters relating to user
    
  
    var emergency_contacts = [fromPhoneNumber]
    setTimeout(() => {this.setState({timePassed: true})}, 30)
  
    for(i = 0; i < emergency_contacts.length; i++) {
      SendCall(toNumber, fromPhoneNumber)
      if( this.setState({timePassed: true})) {
        console.log("Call declined. Notifying next emergency contact")

      } else {
        console.log("Called Succesfully");
        break;
      }
    }
  
    
  }

function NextContact2(toNumber, fromPhoneNumber){
    
    var emergencyNum = toNumber;

    

}



///Ryans Part
function SendText(fromName, fromNum, toName, toNumber) {

    client.messages.create({
        body: 'Test Text Message from ' + fromName + ' for ' + toName,
        from: fromNum,
        to: toNumber
    }, function (err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}

function SendContactRequest(fromName, fromNum, toName, toNumber) {

    client.messages.create({
        body: 'You have been requested to be an emergency contact for: ' + fromName + 
        'on the SafeAmigos App. To accept, please click the following link: https://us-central1-safeamigos-66c18.cloudfunctions.net/AddEmergencyUser' +   
        'To decline, please click the following link: https://us-central1-safeamigos-66c18.cloudfunctions.net/DeclineContactRequest',
        from: fromNum,
        to: toNumber
    }, function (err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}

function DeclineContactRequest(fromName, fromNum, toName, toNumber) {

    client.messages.create({
        body: 'The request for ' + toName + 'to be added as an emergency contact on your SafeAmigos profile has been declined',
        from: toNumber,
        to: fromNumber
    }, function (err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message.sid)
        }
    })
}

/*
////Get a random persons details that should get the text Message
function GetPersonToCall(dbValue) {

    i = Math.floor((Math.random() * Object.keys(dbValue).length));

    ///This returns the values from the ith key
    //console.log(dbValue[Object.keys(dbValue)[i]]);
    personsName = dbValue[Object.keys(dbValue)[i]].full_name;
    personsPhoneNumber = dbValue[Object.keys(dbValue)[i]].phone_number;

    return personsName + " " + personsPhoneNumber;
}*/