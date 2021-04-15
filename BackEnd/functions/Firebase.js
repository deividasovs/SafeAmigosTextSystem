
///Link to our DB = https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app/users.json?
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//Handling the DB
var admin = require("firebase-admin");
admin.initializeApp(); ///Required to initialize before any functions are called

var db = admin.database();
//users/user1/full_name
//References the database key to use
var ref = db.ref("users/");

//Vars to hold data about the person to call
var personsName = "";
var personsPhoneNumber = "";


///When this link is opened, call this function. 
exports.personValue = functions.https.onRequest((request, response) => {
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function (snapshot) {
        // console.log(snapshot.val());
        response.send(GetPersonToCall(snapshot.val()));
    }, function (errorObject) { ///Else if there was an error getting the data
        console.log("The read failed: " + errorObject.code);
    });
});


//Add new emergency user under our user that's already in the DB
//Only call me if it was accepted by the user
exports.addEmergencyUser = functions.https.onCall((data, context) => {

    var lastAddedContact = "Contact1";


    ///Get required data that was called from our app
    usersPhoneNumber = data.usersPhoneNumber;
    userLocation = data.location;
    name = data.name;
    number = data.toNumber;

    ///Get data from db and find the last entered contact
    ///Change db back to firebase.database if putting back in app.js in React
    db.ref('users/')
        .once('value')
        .then(snapshot => {
            var i = 1;
            ///Iterate through all available contacts, break when at contact that doesn't exist
            while (true) {
                if (!snapshot.child(usersPhoneNumber + "/Contact" + i).exists()) {
                    lastAddedContact = "Contact" + i;

                    const contactRef = db
                        .ref('/users/' + usersPhoneNumber)  //References all contacts added by current user
                        .child(lastAddedContact);

                    contactRef
                        .set({
                            Name: name,
                            Number: number
                        }).then(() => console.log('Emergency Contact data updated.'));

                    //Exit from loop when done
                    break;
                }
                i++;
            }
        });
});



function NextContact2(dbValue, fromNumber) {

    while (i < Object.keys(dbValue).length){
        i = 0;
        personsPhoneNumber = dbValue[Object.keys(dbValue)[i]].phone_number;
        
        SendCall(personsPhoneNumber, fromNumber)
        setTimeout(() => {this.setState({timePassed: true})}, 30)
          if( this.setState({timePassed: true})) {
            console.log("Call declined. Notifying next emergency contact")
            i++;
          } else {
            console.log("Called Succesfully");
            break;
          }
        }
}

////Get a random persons details that should get the text Message
function GetPersonToCall(dbValue) {

    i = Math.floor((Math.random() * Object.keys(dbValue).length));

    ///This returns the values from the ith key
    //console.log(dbValue[Object.keys(dbValue)[i]]);
    personsName = dbValue[Object.keys(dbValue)[i]].full_name;
    personsPhoneNumber = dbValue[Object.keys(dbValue)[i]].phone_number;

    return personsName + " " + personsPhoneNumber;
}
