//initialising consts accountSID and authenticationToken to determine which project an API request is coming from
const accountSID = 'AC79b407975ae9f0b4d19af767e5da6b77';
const authenticationToken = 'ea8845abc935e2fbfcce8ee4e18b8994';
const client = require('twilio')(accountSID, authenticationToken);
const sender = '+19513632916'; //using a twilio-purchased number to test with

//send a new outgoing message from a Twilio phone number
client.messages.create({
    to: '+353861054656', //test number, this parameter determines the destination phone number for the SMS message
    from: sender, //this parameter determines the sender of the SMS message
    body: 'testUser is in trouble! Enter a call with' + ' ' + sender + ' ' + 'to see if they are ok!' //this parametr determines the body of the message being sent

}, function(err, message) {
    if (err) {
        console.log(err); //if there's an error, writes a message to log on the debugging console
    } else {
        console.log(message.sid) //else log message sid to console
    }
})