
import * as React from 'react';
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



function CreateEmergencyContactScreen() {

    
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');

    Function.test();

    return (
        <SafeAreaView>
            <Text style={styles.header}>Contact Details</Text>

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
            <View style={styles.button}>
                <Button style={styles.button}
                    title="Add contact"
                    color="#FF8C00"
                    borderColor="#FF8C00"
                    onPress={() => {
                        this.textInputNumber.clear();
                        this.textInputName.clear();
                        Function.AddEmergencyContact(name,number);
                    }}
                />
            </View>


            <View style={styles.container} >
                {/*<Image source={require('../images/safeamigoslogo.png')} />*/}
            </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    header: {
        textAlign: "center",
        fontSize: 50,
        marginTop: 50
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
        marginLeft: 10,
        padding: 10,
    },
    button: {
        margin: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FF8C00",
        color: "#FF8C00"
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
