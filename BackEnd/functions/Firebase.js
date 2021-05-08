
///Link to our DB = https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app/users.json?
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called
const haversine = require("haversine-distance");

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


////Function adds array of emergency contacts to our user
exports.GetEmergencyContacts = function (personsNumber, senderLocation) {

    return new Promise((resolve, reflect) => {
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function (snapshot) {
            dbValue = snapshot.val();
            i = 0;
            /*
            Iterate through database here to call person at minimum distance. Set i equal to position
            of data entry of minimum distance. Might need to use a priority queue adding each distance to it.
            */
            emContacts = [];
            loopDone = false;
            //Iterate through all emergency contacts and try contact until successful
            while (i < Object.keys(dbValue[personsNumber].EmergencyContacts).length) {

                toCallNumber = Object.values(dbValue[personsNumber].EmergencyContacts)[i];

                ///Haversine distance formulas
                contactsLocation = dbValue[personsNumber].Location;

                var senderLatIndex = senderLocation.search("latitude");
                var senderLonIndex = senderLocation.search("longitude");
                var senderLatitude = senderLocation.substring(senderLatIndex + 11, receiverLatIndex + 20); ///+ these numbers as that's how many digits of accuracy we are given
                var senderLongitude = senderLocation.substring(senderLonIndex + 13, senderLonIndex + 23);

                var receiverLatIndex = contactsLocation.search("latitude");
                var receiverLonIndex = contactsLocation.search("longitude");
                var receiverLatitude = contactsLocation.substring(receiverLatIndex + 11, receiverLatIndex + 20);
                var receiverLongitude = contactsLocation.substring(receiverLonIndex + 13, senderLonIndex + 23);

                const location1 = { latitude: senderLatitude, longitude: senderLongitude }
                const location2 = { latitude: receiverLatitude, longitude: receiverLongitude }

                ///Calculate the distance from location1 to location2
                var meterDistance = haversine(location1, location2);

                ///Create new contact object
                let contact = {
                    name: dbValue[toCallNumber].Name,
                    number: toCallNumber,
                    location: dbValue[toCallNumber].Location,
                    distance: meterDistance
                }

                ///add contact to our array
                emContacts.push(contact);

                ///Sort our contacts based on location
                emContacts.sort(compare);

                console.log(i + " User Num: " + contact.number);

                i += 1;

                //Check when to end this loop
                if (i >= Object.keys(dbValue[personsNumber].EmergencyContacts).length) {
                    loopDone = true;
                }
            }

            if (loopDone)
                resolve(emContacts); //Return number of person we want to call 

        }, function (errorObject) { ///Else if there was an error getting the data
            console.log("The read failed: " + errorObject.code);
            resolve("Error");
        })
    });
}

///Function that allows us to sort elements based on their distance to the user
function compare(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}
