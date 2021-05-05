import {
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    TextInput
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Functionality from '../AppFunctionality';


///Initialise our Function object
let Function = new Functionality();
//Function.UploadImage();

///Implementing Singleton Pattern for UI
export default class Controller {

    static instance = Controller.instance || new Controller();

    screen1() {
        //Sample location code courtesy of https://docs.expo.io/versions/latest/sdk/location/
        const [location, setLocation] = useState(null);
        const [errorMsg, setErrorMsg] = useState(null);
        useEffect(() => {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            })();
        }, []);

        Function.userLocation = 'Waiting..';
        if (errorMsg) {
            Function.userLocation = errorMsg;
        } else if (location) {
            Function.userLocation = JSON.stringify(location);
        }

        const [name, setName] = React.useState('');
        const [number, setNumber] = React.useState('');

        return (
            <View>

                <Text style={styles.header}>Create New Contact</Text>

                <Text style={styles.textStyle}>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    placeholder="John Smith"
                    autoCorrect={false}
                    maxLength={40}
                />
                <Text style={styles.textStyle}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumber}
                    value={number}
                    placeholder="0861234567"
                    keyboardType="numeric"
                    maxLength={15}
                />

                <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
                    <Button
                        title="Add contact"
                        color="black"
                        onPress={() => {
                            Function.ChangePage(name,number);
                        }}
                    />
                </View>

                <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
                    <Button
                        title="Send Text"
                        color="red"
                        onPress={() => {
                            Function.SendCall();
                            Function.sendIt();
                        }}
                        
                    />
                </View>
                        

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: 50,
        marginTop: 50
    },
    input: {
        fontSize: 25,
        marginLeft: 10,
        padding: 4,
        borderWidth: 1,
        borderColor: "#20232a",
    },
    textStyle: {
        fontSize: 25,
        marginLeft: 10,
        padding: 10,
    }
});







/*an idea for read reciepts, taken from https://prodocs.cometchat.com/docs/js-messaging-receipts

var messageId = "MESSAGE_ID"; //The ID of the message above which all the messages for a particular conversation are to be marked as read.
var receiverId = "MESSAGE_SENDER_UID"; //In case of one to one conversation message's sender UID will be the receipt's receiver Id.
var receiverType = "user"; //Type of the receiver
CometChat.markAsRead(messageId, receiverId, receiverType);

let listenerId = "UNIQUE_LISTENER_ID";

CometChat.addMessageListener(
  "listenerId",
  new CometChat.MessageListener({
    onMessagesDelivered: messageReceipt => {
      console.log("MessageDeliverd", { messageReceipt });
    },
    onMessagesRead: messageReceipt => {
      console.log("MessageRead", { messageReceipt });
    }
  })
);

let messageId = msgId;
CometChat.getMessageReceipts(messageId).then(
  receipts => {
    console.log("Message details fetched:", receipts);
  },
  error => {
    console.log("Error in getting messag details ", error);
  }
); */