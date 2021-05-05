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
var peopleBeingProcessed = [];

var ShouldStart = false;

exports.AddNewUser = functions.https.onCall((data, context) => {
    AddUser(data.Name, data.PhoneNumber, data.Location).then(() => ProcessAllUsers())
        .catch((error) => console.log("Error Trying to process User " + error));
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
            //TwilioTools.SendText("", "", "", FirebaseTools.GetPersonToCall(personToProcess.Number, personToProcess.Location), "");
            FirebaseTools.GetEmergencyContacts(personToProcess.number, personToProcess.location)
                .then(contacts => {
                    /*TwilioTools.Call({
                        toNumber: num, fromPhoneNumber: personToProcess.number, Location: personToProcess.location
                    })*/

                    //console.log("----------------" + personToProcess.name + personToProcess.number + num + personToProcess.location);

                    personToProcess.SetEmergencyContacts(contacts)
                        .then(value => { 
                            KeepPoppingEmContacts(personToProcess);
                            peopleBeingProcessed.push(personToProcess);
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

    ///Traverse people to contact list, sending texts to each one.
    //Pop if Declined or timed out. Stop if empty or accepted
    if (personToProcess.GetEmergencyContacts().length <= 0)
    {
        //peopleBeingProcessed.re
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
        setTimeout(KeepPoppingEmContacts(personToProcess), 30000); ///6000m = 6 seconds 
    }
}

exports.contactDeclined = functions.https.onCall((data, context) => {

    const url = `https://${request.header('host')}/${process.env.FUNCTION_TARGET}${request.originalUrl}`;
    numFromUrl = url.substring(url.indexOf("number="));
    foundNum = false;

    for(i = 0; i < peopleBeingProcessed.length; i++)
    {
        if(peopleBeingProcessed[i].number == numFromUrl)
        {
            KeepPoppingEmContacts(person);
            foundNum = true;
            return;
        }

        ///Reached End, person no longer being processed
        if(i == peopleBeingProcessed.length-1 && !foundNum)
            NoContactsLeft();
        
    }        
});

///What to do if no contact accepted our request
function NoContactsLeft()
{
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