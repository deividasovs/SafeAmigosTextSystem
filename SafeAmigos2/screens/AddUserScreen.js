
import React,{ useState, useEffect } from 'react';
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
} from 'react-native';

import * as Location from 'expo-location';


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
        })().catch(error => {console.log("The location error was: \n" + error)});
    }, []);

    Function.userLocation = 'Waiting..';
    if (errorMsg) {
        Function.userLocation = errorMsg;
    } else if (location) {
        Function.userLocation = JSON.stringify(location);
        console.log("HERE");
    }

    console.log("The user's location is: \n\n" + Function.userLocation);

    return (
        <SafeAreaView>
            {/* <View style={styles.container} >
                {
                    <Image source={require('../images/safeamigoslogo.png')}
                        style={styles.image} />
                }
            </View>*/}

            <Text style={styles.header}>Your Details</Text>

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
                <Button
                    title="Set up account"
                    color="#FF8C00"
                    borderColor="#FF8C00"
                    onPress={() => {
                        navigation.replace('Home');
                        Function.AddNewUser(name, number);
                    }}
                />
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50,
    },
    image: {
        width: 210,
        height: 180,
        marginTop: 150,
    },
    inputDetails: {
        margin: 20
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#20232a",
    },
    textStyle: {
        fontSize: 25,
        marginTop: 10,
        padding: 10,
    },
    buttonView: {
        margin: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FF8C00",
        color: "#FF8C00",
        fontSize: 40,
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 150,
        borderRadius: 150 / 2,
        backgroundColor: "#D350BE",
    }
});

export default AddUserScreen;
