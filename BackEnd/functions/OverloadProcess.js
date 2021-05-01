/*
-Receive contact request
-Put details into object
-Put object into queue
-Keep clearing queue while it's not empty
*/

const functions = require("firebase-functions");

const FirebaseTools = require("./Firebase");
const TwilioTools = require("./Twilio");

var contactQueue = [];

var ShouldStart = false;

exports.AddNewUser = functions.https.onCall((data, context) => {

    AddUser(data.Name, data.PhoneNumber, data.Location).then(() => ContinuosProcess())
    .catch(() => console.log("Error Trying to process User"));
});


//Add user to our queue to be processed
function AddUser(name, number, location) {
    return new Promise((resolve, reflect) => {
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

        resolve(contactQueue.push(newPerson));
        
    });
}

///keep clearing queue the whole time while there is a user to process
function ContinuosProcess() {
    
    if (ShouldStart) {
        ///Issue here, ContactQueue never empty!!!!
        while (contactQueue.length > 0) {
            var personToProcess = contactQueue.shift(); ///Shift for queue, pop for Stack
           
            ///Once we found our person to message, find the correct user to contact
            //TwilioTools.SendText("", "", "", FirebaseTools.GetPersonToCall(personToProcess.Number, personToProcess.Location), "");
            FirebaseTools.GetPersonToCall(personToProcess.Number, personToProcess.Location)
                 .then(num => {
                     TwilioTools.Call({
                         toNumber: num, fromPhoneNumber: personToProcess.Number, Location: personToProcess.Location
                     })
                 })
                 .catch(error => { console.log("Error trying to call " + error) });
        }
        //If we have no users in our queue to process, stop this loop
        if (contactQueue.length == 0) ShouldStart = false;
    }
}
