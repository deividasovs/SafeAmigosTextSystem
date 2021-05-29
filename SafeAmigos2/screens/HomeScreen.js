import * as React from 'react';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
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
        <SafeAreaView >
            <View style={styles.BigDiv}>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../images/safeamigoslogo.png')} />
            </View>

                <View style={styles.button1}>
                    <TouchableOpacity
                        style={{
                            height: 120,
                            width: 120,
                            justifyContent: 'center',
                            elevation: 5,
                            borderRadius: 150 / 2,
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
                                fontSize: 24,
                                fontWeight: 'bold',
                            }}>SOS</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button2}>
                    <TouchableOpacity
                        style={{
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "#FF8C00",
                            borderRadius: 10,
                            borderWidth: 2,
                            width: 300,
                            borderColor: "#FF8C00",
                            elevation: 5,
                        }}

                        onPress={() => navigation.navigate('CreateContact')}>
                        <Text
                            style={{
                                color: "#ffffff",
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}>Add Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

    BigDiv: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 170,
        height: 150,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
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
        marginTop: 50,
    },
    button2: {
        margin: 20,
        marginTop: 100
    },
});

export default Home;