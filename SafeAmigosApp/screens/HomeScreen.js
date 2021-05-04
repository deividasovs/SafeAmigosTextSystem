import React, { useState, useEffect } from 'react';
///import libs
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
  AppRegistry,
  TextInput
} from 'react-native';

const HomeScreen = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);
      }
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return(
  <SafeAreaView>
    <Text style={{ textAlign: "center", fontSize: 30, padding: 20}}>Welcome Back!</Text>
    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
       <Button style={styles.button}
    title = "Send Distress Signal"
    color = "black"
    onPress={() => {
            SendCall();
          }}
    />
    </View>
   
    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }}>
    <Button
    title = "Add Emergency Contact"
    color= "black"
    onPress={() => props.navigation.navigate('CreateContact')}
  />
    </View>

    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }}>
    <Button
    title = "Add Your Details"
    color= "black"
    onPress={() => props.navigation.navigate('CreateUser')}
  />
    </View>

    <Text style = {{paddingTop: 20, fontSize: 20, marginLeft: 20}}>Your Location: {"\n"}
    {userLocation}</Text>

    <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    fontSize: 100,
    marginTop: 500
  }
});

export default HomeScreen;