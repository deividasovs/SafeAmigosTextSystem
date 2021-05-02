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
import abc from 'test.js';

//import dd from '/ffda'

//require("test");
//import Functionality from './Functionality';

///Implementing Singleton Pattern
export default class Controller {

    static instance = Controller.instance || new Controller();


    screen1() {
     
        //  let Function = new Functionality();
     //   abc.test();

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

        var userLocation = 'Waiting..';
        if (errorMsg) {
            userLocation = errorMsg;
        } else if (location) {
            userLocation = JSON.stringify(location);
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
                    //value={text}
                    placeholder="John Smith"
                    autoCorrect={false}
                    maxLength={40}
                //=onChangeText={name => this.setName({name})}
                />
                <Text style={styles.textStyle}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumber}
                    value={number}
                    placeholder="0861234567"
                    keyboardType="numeric"
                    maxLength={15}
                // onChangeText={(text) => this.setNumber({number:text})}
                />

                <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
                    <Button
                        title="Add contact"
                        color="black"
                        onPress={() => {
                            // ChangePage(name, number);
                        }}
                    />
                </View>

                <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
                    <Button
                        title="Send Text"
                        color="red"
                        onPress={() => {
                            //SendText();
                            //  Function.TestFun();
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