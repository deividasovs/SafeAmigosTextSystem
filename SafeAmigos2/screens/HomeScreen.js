import * as React from 'react';
import 'react-native-gesture-handler';

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

import Function from '../global';

function Home({ navigation }) {
    console.log("The user's location is: \n\n\n" + Function.userLocation);
    return (
        <SafeAreaView>
            <Text style={styles.header}>Welcome Back</Text>
            <View style={styles.BigDiv}>

                <View style={styles.button2}>
                    <Button
                        title="Add Emergency Contact"
                        color="#FF8C00"
                        borderColor="#FF8C00"
                        onPress={() => navigation.navigate('CreateContact')}
                    />
                </View>

                <View style={styles.button1}>
                    <Button
                        title="Get Help"
                        color="#FF0000"
                        onPress={() => {
                            Function.SendCall();
                            Function.sendIt();
                        }}
                    />
                </View>

                <View style={styles.container} >

                </View >
            </View>

        </SafeAreaView>
    );
};
//  <Image source={require('../images/safeamigoslogo.png')} />


const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: 50,
        marginTop: 80
    },
    BigDiv: {
        marginTop: 100,
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
        margin: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FF0000",
    },
    button2: {
        margin: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FF8C00",
        color: "#FF8C00",
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