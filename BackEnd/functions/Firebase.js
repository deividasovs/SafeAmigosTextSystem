
///Link to our DB = https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app/users.json?
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//Handling the DB
var admin = require("firebase-admin");
//const { object } = require("firebase-functions/lib/providers/storage"); whats this for?
admin.initializeApp(); ///Required to initialize before any functions are called

var db = admin.database();
//users/user1/full_name
//References the database key to use
var ref = db.ref("users/");



//Add new emergency user under our user that's already in the DB
exports.emergencyContact = functions.https.onCall((data, context) => {


    var lastAddedContact = "Contact1";
    ///Get required data that was called from our app
    usersPhoneNumber = data.fromPhoneNumber;//Current users number
    userLocation = data.location;
    name = data.name; //Name to be added
    number = data.toNumber; ///Number to be added

    ///Get data from db and find the last entered contact
    ///Change db back to firebase.database if putting back in app.js in React
    db.ref('users/')
        .once('value')
        .then(snapshot => {
            var i = 1;
            ///Iterate through all available emergency contacts, break when at contact that doesn't exist
            while (true) {
                //If Emergency Contacts field does not currently exist, add it to db
                if (!snapshot.child(usersPhoneNumber + "/EmergencyContacts").exists()) {
                    db.ref('/users/' + usersPhoneNumber)  //References all contacts added by current user
                        .child("EmergencyContacts");
                }

                if (!snapshot.child(usersPhoneNumber + "/EmergencyContacts/Contact" + i).exists()) {
                    lastAddedContact = "Contact" + i;

                    const contactRef = db
                        .ref('/users/' + usersPhoneNumber + "/EmergencyContacts/");  //References all contacts added by current user

                    contactRef
                        .update({
                            [lastAddedContact]: number
                        }).then(() => console.log('Emergency Contact data updated.'));

                    //Exit from loop when done
                    break;
                }
                i++;
            }
        });
});


function NextContact2(dbValue, fromNumber) {

    while (i < Object.keys(dbValue).length) {
        i = 0;

        ///Send call to users phone number from users phone number
        SendCall(dbValue[Object.keys(dbValue)[i]].phone_number, fromNumber)
        setTimeout(() => { this.setState({ timePassed: true }) }, 30)
        if (this.setState({ timePassed: true })) {
            console.log("Call declined. Notifying next emergency contact")
            i++;
        } else {
            console.log("Called Succesfully");
            break;
        }
    }
}

exports.AddEmergencyLocations = function()
{

}


////Function gets db details from database and finds correct user to call based on if they are listed as an emergency contact
exports.GetPersonToCall = function (personsNumber, personsLocation) {

    return new Promise((resolve, reflect) => {
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function (snapshot) {
            dbValue = snapshot.val();
            i = 0;
            //var closestDistance = MAX_SAFE_INTEGER;

            /*
            Iterate through database here to call person at minimum distance. Set i equal to position
            of data entry of minimum distance. Might need to use a priority queue adding each distance to it.
            */

            ///2 different ways of iterating through the db below
            //Iterative way, go through all emergency contacts and try contact until successful
            while (i < Object.keys(dbValue[personsNumber].EmergencyContacts).length) {
              

                toCallNumber = Object.values(dbValue[personsNumber].EmergencyContacts)[i];

                //Iterate through outer array finding user fields correlating with the one we want to call
                contactsLocation = dbValue[toCallNumber].Location;
                contactsName = dbValue[toCallNumber].Name;

                console.log(contactsName + " " + contactsLocation + " Number to call " + toCallNumber);

                ///Could iterate once, add all distances to priortiy queue here
                ///Wait, Check if response accepted, if not continue w loop.
                //else 
                ///Nobody is willing to help :(

                //Return number of person we want to call 
                //--------may have to create callback----------
                i += 1;
                console.log(i + " User Num: " + Object.values(dbValue[personsNumber].EmergencyContacts)[i]);
                resolve(toCallNumber);


                /*senderLocation = dbValue[personsNumber].Location;

                const haversine = require("haversine-distance");

                var senderLatIndex = senderLocation.search("Latitude");
                var senderLonIndex = senderLocation.search("Longitude");
                var senderLatitude = senderLocation.substring(senderLatIndex+11, receiverLatIndex+20);
                var senderLongitude = senderLocation.substring(senderLonIndex+13, senderLonIndex+23);

                var receiverLatIndex = contactsLocation.search("Latitude");
                var receiverLonIndex = contactsLocation.search("Longitude");
                var receiverLatitude = contactsLocation.substring(receiverLatIndex+11, receiverLatIndex+20);
                var receiverLongitude = contactsLocation.substring(receiverLonIndex+13, senderLonIndex+23);

                const location1 = { latitude: senderLatitude, longitude: senderLongitude }
                const location2 = { latitude: receiverLatitude, longitude: receiverLongitude }

                var meterDistance = (haversine(location1, location2));
                if(meterDistance < closestDistance)
                {
                    closestDistance = meterDistance;
                }

                //Add emergency contact to array
                console.log(closestDistance);*/
            }



        }, function (errorObject) { ///Else if there was an error getting the data
            console.log("The read failed: " + errorObject.code);
            resolve("Error");
        })
    });


}

///Recursive function that calls itself until it finds an available number to call.
//Can also be called at specific number position
//Could pass the priorityQueue as a param to "emergencyContacts"
///----Not in use yet----
function returnContact(emergencyContacts, i) {
    if (i >= Object.keys(dbValue[personsNumber].EmergencyContacts).length) return null;

    //If we haven't found a person to call, keep going until we've reached the end of the db
    returnContact(emergencyContacts, i++);

}

///Allow functions to be called by other files
///module.exports = { GetPersonToCall }; This breaks file for some reason