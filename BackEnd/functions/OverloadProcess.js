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
let peopleBeingProcessed = [];///!!!!NEED TO REMOVE FROM THIS, CHECK ABOVE!!!!!

var ShouldStart = false;

exports.AddNewUser = functions.https.onCall((data, context) => {
  
    AddUser(data.Name, data.PhoneNumber, data.Location).then(() => ProcessAllUsers())
        .catch((error) => console.log("\n\nError Trying to process User " + error));
});

exports.contactDeclined = functions.https.onRequest((request, response) => {
    const url = `https://${request.header('host')}/${process.env.FUNCTION_TARGET}${request.originalUrl}`;
    var numFromUrl = url.substring(url.indexOf("number=") + 7);
    foundNum = false;

    console.log("\n\nGot a decline from: " + numFromUrl + " " + peopleBeingProcessed.length + " " 
    + contactQueue.length);

    ///Go through everybody being processed currently
    for (i = 0; i < peopleBeingProcessed.length; i++) {
        console.log("Reached Here");
        ///If we find a person being processed that matches the number that requested help, contact next number
        if (peopleBeingProcessed[i].number == numFromUrl) {
            KeepPoppingEmContacts(peopleBeingProcessed[i]);
            console.log("Found person at " + i + " " + peopleBeingProcessed[i].number)
            foundNum = true;
            return;
        }

        ///Reached End, person no longer being processed / not found in array
        if (i == peopleBeingProcessed.length - 1 && !foundNum)
        {
            console.log("Out of emergency Contacts :(");
            NoContactsLeft();
        }

    }

    response.send("Help declined");
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

        newPerson = new Person(name, number, location);

        ShouldStart = true;

        resolve(contactQueue.push(newPerson));

    });
}

///keep clearing queue the whole time while there is a user to process
function ProcessAllUsers() {
   
    if (ShouldStart) {

        while (contactQueue.length > 0) {
            var personToProcess = contactQueue.shift(); ///Shift for queue, pop for Stack
         
            ///Once we found our person to message, find the correct user to contact
            FirebaseTools.GetEmergencyContacts(personToProcess.number, personToProcess.location)
                .then(contacts => {
                    console.log("----------------" + personToProcess.name + personToProcess.number + personToProcess.location);

                    personToProcess.SetEmergencyContacts(contacts)
                        .then(value => {
                            peopleBeingProcessed.push(personToProcess);
                            KeepPoppingEmContacts(personToProcess);
                        })
                        .catch((error) => console.log("Issue with Setting Emergency Contact " + error));

                })
                .catch(error => { console.log("Error trying to call " + error) });
        }
        //If we have no users in our queue to process, stop this loop
        if (contactQueue.length == 0) ShouldStart = false;
    }
}


///Keep popping our emergency contacts until either someone accepts or there's no more left to contact
function KeepPoppingEmContacts(personToProcess) {

    console.log("People to be processed: " + peopleBeingProcessed.length);
    ///Traverse people to contact list, sending texts to each one.
    //Pop from array if Declined or timed out. Stop if empty or accepted
    if (personToProcess.GetEmergencyContacts().length <= 0) {
        //Find person to remove from our array and remove them
        for (i = 0; i < peopleBeingProcessed.length; i++) {
            if (peopleBeingProcessed[i].number == personToProcess.number) personToProcess.splice
        }
        return NoContactsLeft();
    }
    else {
        contact = personToProcess.GetContact();
        // console.log("Contacts name is: " + contact.number);
        TwilioTools.SendText({
            fromName: personToProcess.name, fromPhoneNumber: personToProcess.number,
            toName: "", toNumber: contact.number, Location: personToProcess.location
        })

        ///Once text message is sent out and nothing has happened, call this function again to get the next user
        setTimeout(function(){KeepPoppingEmContacts(personToProcess)}, 10000); ///6000m = 6 seconds 
    }
}



///What to do if no contact accepted our request
function NoContactsLeft() {
    console.log("Ran out of contacts");
}


class Person {

    name;
    number;
    location;
    emergencyContacts = [];

    constructor(name, number, location) {
        this.name = name;
        this.number = number;
        this.location = location;
    }

    GetName() {
        return this.name;
    }

    GetEmergencyContacts() {
        return this.emergencyContacts;
    }

    GetContact() {
        return this.emergencyContacts.pop();
    }

    SetEmergencyContacts(emergencyContacts) {
        return new Promise((resolve, reflect) => {
            resolve(this.emergencyContacts = emergencyContacts);
        });
    }

    AddEmergencyContact(number, distance) {
        contact = new Contact(number, distance);
        this.emergencyContacts.push(contact);
        emergencyContacts.sort(compare)
    }
}

function compare(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}

class Contact {
    number;
    distance;

    Contact(number, distance) {
        this.number = number;
        this.distance = distance;
    }
}