import firebase from 'react-native-firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



export function updateContact(contact, updateComplete) {
  contact.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log("Updating contact in firebase");

  firebase.firestore()
    .collection('Contacts')
    .doc(contact.id).set(contact)
    .then(() => updateComplete(contact))
    .catch((error) => console.log(error));
}

export function deleteContact(contact, deleteComplete) {
  console.log(contact);

  firebase.firestore()
    .collection('Contacts')
    .doc(contact.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}

export async function getContacts(contactssRetreived) {

  var contactList = [];

  var snapshot = await firebase.firestore()
    .collection('Contacts')
    .orderBy('createdAt')
    .get()

  snapshot.forEach((doc) => {
    const contactItem = doc.data();
    contactItem.id = doc.id;
    contactList.push(contactItem);
  });

  contactsRetreived(contactList);
}

export function uploadContact(contact, onContactUploaded, { updating }) {

  if (contact.imageUri) {
    const fileExtension = contact.imageUri.split('.').pop();
    console.log("EXT: " + fileExtension);

    var uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName);

    var storageRef = firebase.storage().ref(`contacts/images/${fileName}`);

    storageRef.putFile(contact.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log("Success");
          }
        },
        error => {
          unsubscribe();
          console.log("image upload error: " + error.toString());
        },
        () => {
          storageRef.getDownloadURL()
            .then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);

              contact.image = downloadUrl;

              delete contact.imageUri;

              if (updating) {
                console.log("Updating....");
                updateContact(contact, onContactUploaded);
              } else {
                console.log("adding...");
                addContact(contact, onContactUploaded);
              }
            })
        }
      )
  } else {
    console.log("Skipping image upload");

    delete contact.imageUri;

    if (updating) {
      console.log("Updating....");
      updateContact(contact, onContactUploaded);
    } else {
      console.log("adding...");
      addContact(contact, onContactUploaded);
    }
  }
}

export function addContact(contact, addComplete) {
  contact.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  firebase.firestore()
    .collection('Contacts')
    .add(contact)
    .then((snapshot) => {
      contact.id = snapshot.id;
      snapshot.set(contact);
    }).then(() => addComplete(contact))
    .catch((error) => console.log(error));
}
