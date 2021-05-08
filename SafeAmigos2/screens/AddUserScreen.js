
import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';

import Function from '../global';
///import libs
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Button,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import * as Location from 'expo-location';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

function AddUserScreen({ navigation }) {


    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })().catch(error => { console.log("The location error was: \n" + error) });
    }, []);

    Function.userLocation = 'Waiting..';
    if (errorMsg) {
        Function.userLocation = errorMsg;
    } else if (location) {
        Function.userLocation = JSON.stringify(location);
    }


    return (
        <SafeAreaView>
            <Text style={styles.header}>Enter Your Details</Text>

            <View style={styles.inputDetails}>
                <Text style={styles.textStyle}>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="John Smith"
                    autoCorrect={false}
                    maxLength={40}

                />
                <Text style={styles.textStyle}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumber}
                    placeholder="0861234567"
                    value={number}
                    keyboardType="numeric"
                    maxLength={15}

                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={{
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#FF8C00",
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "#FF8C00",
                        elevation: 5,
                    }}
                    title="Set up account"

                    onPress={() => {
                        navigation.replace('Home');
                        Function.AddNewUser(name, number);
                    }}>
                    <Text
                        style={{
                            color: "#ffffff",
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Add Account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.circle}>
                    <Text style={styles.smallText}>Feel Safer & Reassured</Text>
                </View>
            </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: 40,
        marginTop: 40,
    },
    inputDetails: {
        margin: 20,
        marginTop: 10
    },
    input: {
        fontSize: 25,
        marginLeft: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#20232a",
    },
    textStyle: {
        fontSize: 25,
        marginTop: 10,
        padding: 10,
    },
    buttonView: {
        margin: 30,
        marginTop: 20
    },
    smallText: {
        marginBottom: 130,
        color: "#ffffff",
        fontSize: 20,
    },
    container: {
        marginTop: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        height: 200,
        borderRadius: 300 ,
        backgroundColor: "#D350BE",
    }
});

export default AddUserScreen;
