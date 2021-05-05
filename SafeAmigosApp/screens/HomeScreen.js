
///import libs
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import {
  View,
  Button,
} from 'react-native';

const HomeScreen = props => {
  return(
    <SafeAreaView>
      <Text style={{ textAlign: "center", fontSize: 30, padding: 20, fontWeight: 350}}>Welcome Back!</Text>
      <View style={styles.button}>
         <Button style={styles.button}
      title = "Send Distress Signal"
      color= "#FF8C00"
      borderColor = "#FF8C00"
      onPress={() => {
              SendCall();
            }}
      />
      </View>
     
      <View style={styles.button}>
      <Button
      title = "Add Emergency Contact"
      color= "#FF8C00"
      borderColor = "#FF8C00"
      onPress={() => props.navigation.navigate('CreateContact')}
    />
      </View>
  
      <View style={styles.button}>
        <Button
          title="Your Details"
          color="#FF8C00"
          borderColor = "#FF8C00"
        />
      </View>
  
  
      <View style={styles.container}>
       <View style={styles.circle}/>
       <Image source={require('./images/safeamigoslogo.png')} />
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
        padding: 4,
        borderWidth: 1,
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
      circle:{
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 150,
      borderRadius: 150 / 2,
      backgroundColor: "#D350BE",
  
        }
    });
  
export default HomeScreen;