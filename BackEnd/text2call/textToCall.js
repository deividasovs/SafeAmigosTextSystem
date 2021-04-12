const accountSID = 'AC79b407975ae9f0b4d19af767e5da6b77';
const authenticationToken = 'ea8845abc935e2fbfcce8ee4e18b8994';
const client = require('twilio')(accountSID, authenticationToken);
const sender = '+19513632916';

client.messages.create({
    to: '+353861054656',
    from: sender,
    body: 'testUser is in trouble! Enter a call with' + ' ' + sender + ' ' + 'to see if they are ok!'

}, function(err, message) {
    if (err) {
        console.log(err);
    } else {
        console.log(message.sid)
    }
})