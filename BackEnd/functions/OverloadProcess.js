/*
-Receive contact request
-Put details into object
-Put object into queue
-Keep clearing queue while it's not empty
*/

const FirebaseTools = require("./Firebase");

var contactQueue = [];


var personToProces = null;


//If the user to call already exists in our queue, return false. Only allow them to be entered once
exports.AddNewUser = function ContainsUser(name, number, location) {

    for (var i = 0; i < contactQueue.length; i++) {
        if(contactQueue[i].number = this.number)
        {
            return false; ////------------May have to turn this intoa  callback instead!!!!-------------
        }
    }

    newPerson = {
        Name: name,
        Number: number,
        Location: location
    }

    contactQueue.push(newPerson);
}

///keep clearing queue the whole time while there is something to process
while (!contactQueue.isEmpty()) {
    personToProces = contactQueue.shift(); ///Shift for queue, pop for Stack
    SendMessage(personToProces);

    ///Once we found our person to message, find the correct user to contact
    FirebaseTools.GetPersonToCall(personToProces.Number, personToProces.Location);
}

