///npm install twilio
///npm install dotenv


///Link to our DB = https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app/users.json?
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//Handling the DB
var admin = require("firebase-admin");
admin.initializeApp(); ///Required to initialize before any functions are called









///Try see if you can modify this to accept a variable from the request
exports.callInitiated = functions.https.onRequest((request, response) => {
    response.send("SomeName 1890222222");
    console.log("Called Successfully for SomeName");
});









////------------------FireBase DB------------------


var db = admin.database();
//users/user1/full_name
//References the database key to use
var ref = db.ref("users/");

//Vars to hold data about the person to call
var personsName = "";
var personsPhoneNumber = "";


///When this link is opened, call this function. 
exports.personValue = functions.https.onRequest((request, response) => {
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        // console.log(snapshot.val());
        response.send(GetPersonToCall(snapshot.val()));
    }, function(errorObject) { ///Else if there was an error getting the data
        console.log("The read failed: " + errorObject.code);
    });
});


////Get a random persons details that should get the text Message
function GetPersonToCall(dbValue) {

    i = Math.floor((Math.random() * Object.keys(dbValue).length));

    ///This returns the values from the ith key
    //console.log(dbValue[Object.keys(dbValue)[i]]);
    personsName = dbValue[Object.keys(dbValue)[i]].full_name;
    personsPhoneNumber = dbValue[Object.keys(dbValue)[i]].phone_number;

    return personsName + " " + personsPhoneNumber;
}
////--------------End of Firebase-------------


///Sample function
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});




/////--------------------Twilio------------------------

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

// Code for sending text messages. Only works for verified phone numbers.
/*
const accountSID = 'AC2a759941965bd0670a43ca5178083517';
const authenticationToken = '15e0b5829aa5e1ff3861567d9a63b0bc';
const client = require('twilio')(accountSID,authenticationToken);

client.messages.create({
    body: 'Test Text Message',
    from: '+17149092867',
    to: '+353871934130'
}, function(err, message) {
    if (err) {
        console.log(err);
    } else {
        console.log(message.sid)
    }
})
*/



/////--------------------END OF Twilio------------------------
