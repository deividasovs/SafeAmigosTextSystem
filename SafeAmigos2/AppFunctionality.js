import * as firebase from 'firebase';
require("firebase/functions");

export default class Functionality {


    usersName = "Peter";
    usersPhoneNumber = "0862242312";
    userLocation = "";
    contactsName = "Homer";
    contactsNumber = "+3538622";

    isUserPage = true;

    ////------------------Firebase Functionality--------------------

    ///Firebase android configuration tokens
    androidConfig = {
        clientId: '110138948795-ug5ls9o3658bc64spef468tedfgi3s3e.apps.googleusercontent.com',
        appId: '1:110138948795:android:f62dc6c1a519cf859dfd9e',
        apiKey: 'AIzaSyCj_mbhS5e94psZD3DYRe5CJP_wJt6GkC8',
        databaseURL: 'https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app', //  databaseURL: "http://localhost:9000/database/safeamigos-66c18-default-rtdb/data/",
        storageBucket: 'safeamigos-66c18.appspot.com',
        projectId: 'safeamigos-66c18',
        persistence: true,
    };

    //Init our app
    constructor(props) {
        ///Initialize Firebase app
        if (!firebase.apps.length) {
            firebase.initializeApp(this.androidConfig);
        } else {
            firebase.app(); // if already initialized, use previous app
        }

        //Set functions to run from emulator if in development mode
        if (__DEV__) {
            console.log("--------in Emulator--------");
            // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
            firebase.functions().useFunctionsEmulator('http://10.0.2.2:5001');
        }

    }

    //Adds contact to our Firebase Database
    ///---TO DO--- Run this on app launch and only update last added contact  for every new contact added
    AddEmergencyContact(name, number) {
        this.contactsName = name;
        this.contactsNumber = number;
        firebase.functions()
            .httpsCallable('EmergencyContact')({ fromName: this.usersName, fromPhoneNumber: this.usersPhoneNumber, name: name, toNumber: number, location: this.userLocation })
            .then(response => {
                console.log("Add Emergency User called succesfully!");
            })
            .catch((error) => console.log("****Issue adding emergency User request****" + error));

    }


    ///Similar to emergency contact   above except it creates a new user entry in db 
    AddNewUser(name, number) {
        this.usersName = name;
        this.usersPhoneNumber = number;
        console.log("Adding " + name + " " + number + "TO Db");
        ///Get data from db and find the last entered contact
        firebase.database()
            .ref('users/')
            .once('value')
            .then(snapshot => {
                //newReference = returned json object from db
                const userRef = firebase.database()
                    .ref('/users/') //References all contacts added by current user
                    .child(number);

                userRef
                    .set({
                        Name: name,
                        location: this.userLocation,
                    })
                    .then(() => console.log('Data updated.'));
            }).catch((error) => console.log("Issue adding user to db " + error));
    }

    ///-------------------End of Firebase-------------------------



    ///  to initiate a call to required phone number
    SendCall() {
        //Add our object to queue to get processed
        firebase.functions()
            .httpsCallable('AddNewUser')({ Name: this.usersName, PhoneNumber: this.usersPhoneNumber, Location: this.userLocation })
            .then(response => {
                console.log("Starting to process user " + this.userLocation);
            }).catch((error) => console.log("Issue adding user to be processed " + error));
    }



    ///  to initiate a call to required phone number
    SendText() {
        this.UploadFiles();
        console.log("Sending Text Message to " + this.contactsNumber);
        //Call firebase   by name and pass json parameters relating to user
        firebase.functions()
            .httpsCallable('TwilioText')({ fromName: this.usersName, fromPhoneNumber: this.usersPhoneNumber, toName: this.contactsName, toNumber: this.contactsNumber })
            .then(response => {
                console.log("Called Succesfully");
            });

    }

    DeclineContactRequest() {
        console.log("Sending Text Message to " + this.contactsNumber);
        //Call firebase   by name and pass json parameters relating to user
        firebase.functions()
            .httpsCallable('DeclineContactRequest')({ fromName: this.usersName, fromPhoneNumber: this.usersPhoneNumber, toName: this.contactsName, toNumber: this.contactsNumber })
            .then(response => {
                console.log("Request Declined Succesfully");
            }).catch(() => console.log("Issue declining request"));
    }

    ///Upload image and audio files to our Firebase Storage
    UploadFiles() {

        let reference = storage().ref("safeamigoslogo.png");
        let task = reference.putFile("./FilesToUpload/safeamigoslogo.png");

        task.then(() => {
            console.log('Image uploaded to the bucket!');
        }).catch((e) => console.log('uploading image error => ', e));

        let audioReference = storage().ref("PING.mp3");
        let audioTask = audioReference.putFile("./FilesToUpload/PING.mp3");

        audioTask.then(() => {
            console.log('Audio uploaded to the bucket!');
        }).catch((e) => console.log('uploading audio error => ', e));

    };

}
