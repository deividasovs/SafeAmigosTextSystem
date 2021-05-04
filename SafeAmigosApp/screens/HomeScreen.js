
///import libs
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import {
  View,
  Button,
} from 'react-native';

const HomeScreen = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, scdetIsPreview] = useState(false);
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
        title="Add Emergency Contact"
        color="black"
      />
    </View>

    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }}>
    <Button
    title = "Camera"
    color= "black"
    onPress={( takePicture())}
  />
    </View>

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

export default HomeScreen;