/*
-Receive contact request
-Put details into object
-Put object into queue
-Keep clearing queue while it's not empty
*/

const FirebaseTools = require("./Firebase");
const TwilioTools = require("./Twilio");

var contactQueue = [];

var ShouldStart = false;

exports.AddNewUser = functions.https.onCall((data, context) => {
    AddUser(data.Name, data, PhoneNumber, data.Location);
});


//Add user to our queue to be processed
function AddUser(name, number, location) {

    for (var i = 0; i < contactQueue.length; i++) {
        ///if our queue already contains this number, quit the function.
        if (contactQueue[i].number = number) {
            return false; ////------------May have to turn this into a callback instead!!!!-------------
        }
    }

    newPerson = {
        Name: name,
        Number: number,
        Location: location
    }
    ShouldStart = true;

    contactQueue.push(newPerson);
    ContinuosProcess();
}

///keep clearing queue the whole time while there is a user to process
function ContinuosProcess() {
    if (ShouldStart) {
        while (!contactQueue.isEmpty()) {
            var personToProces = contactQueue.shift(); ///Shift for queue, pop for Stack

            ///Once we found our person to message, find the correct user to contact
            TwilioTools.SendText("", "", "", FirebaseTools.GetPersonToCall(personToProces.Number, personToProces.Location), "");
        }
        if(!contactQueue.isEmpty()) ShouldStart = false;
    }
}
