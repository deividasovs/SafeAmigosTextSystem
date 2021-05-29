
import React, { useRef } from 'react';
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
    TouchableOpacity,
    Image,
} from 'react-native';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

function CreateEmergencyContactScreen() {


    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');

    return (
        <SafeAreaView>
            <Text style={styles.header}>Contact Details</Text>

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
            <View style={styles.button}>
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
                    title="Add Contact"

                    onPress={() => {
                        Function.AddEmergencyContact(name, number);
                        alert("Emergency Contact added successfully");
                        setName("");
                        setNumber("");
                    }}>
                    <Text
                        style={{
                            color: "#ffffff",
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Add Contact</Text>
                </TouchableOpacity>
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
    button: {
        margin: 30,
        marginTop: 30
    },
    inputDetails: {
        margin: 20,
        marginTop: 10
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

export default CreateEmergencyContactScreen;
