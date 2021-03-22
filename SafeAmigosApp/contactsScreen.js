import React from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';

const CreateContacts = () => {
    const [text, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    return (
        <View>
          
            <Text style={styles.header}>Create New Contact</Text>
          
          <Text style={styles.textStyle}>Name:</Text>
          <TextInput
             style={styles.input}
             onChangeText={setName}
             value={text}
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
                maxLength={10}
        />
           
           <View style={{margin:20, borderRadius: 10, borderWidth: 2}}>
            <Button
              title="Add contact"
              color="black"
              />  
            </View>

          <View style={{margin:20, borderRadius: 10, borderWidth: 2}}>
            <Button
              title="Cancel"
              color="black"
              />  
            </View>
                   
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
      textAlign: "center",
      fontSize: 50,
      marginTop: 50
    },
    input:{
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

export default CreateContacts;
