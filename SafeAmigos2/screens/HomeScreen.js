import * as React from 'react';
import 'react-native-gesture-handler';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

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

import Function from '../global';

function Home({ navigation }) {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../images/safeamigoslogo.png')} />
            </View>

            <Text style={styles.header}>Welcome Back</Text>
            <View style={styles.BigDiv}>
                <View style={styles.button2}>
                    <TouchableOpacity
                        style={{
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "#FF8C00",
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: "#FF8C00",
                            elevation: 5,
                        }}


                        onPress={() => navigation.navigate('CreateContact')}>
                        <Text
                            style={{
                                color: "#ffffff",
                                fontSize: 20,
                            }}>Add Emergency Contact</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button1}>
                    <TouchableOpacity
                        style={{
                            height: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "#FF0000",
                        }}

                        onPress={() => {
                            Function.SendCall();
                            alert("Message sent out successfully");
                        }}>
                        <Text
                            style={{
                                color: "#ffffff",
                                fontSize: 23,
                                fontWeight: 'bold',
                            }}>Get Help</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: 40,
        marginTop: 10
    },
    BigDiv: {
        marginTop: 10,
    },
    image: {
        width: 140,
        height: 120,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 80,
    },
    input: {
        fontSize: 25,
        marginLeft: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#20232a",
    },
    button1: {
        marginTop: 130
    },
    button2: {
        margin: 20,
        marginTop: 100
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

export default Home;