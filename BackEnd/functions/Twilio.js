const functions = require("firebase-functions");

//defining Twilio credentials
var accountSid = "AC895f8012d8375569596767cd1b8dc8cf";
var authToken = "24a17c6e0491283d120ab06b6f4a54ac";

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


///Ryans Part
function SendText(fromName, fromNum, toName, toNumber, location) {
    console.log("Sending Text to " + toNumber);
    url = `https://us-central1-safeamigos-66c18.cloudfunctions.net/ContactDecline`;

    ///Add number to url so we could know which number would be declining
    url += "?number=" + fromNum;

    client.messages.create({
        body: fromName + ` needs your help!!\n\nCall ` + fromNum +
        ` to help. \n\nClick ` + url + `
        to decline. \n\nFind them at ` + location,
        from: "+12702136552",
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
