
///import libs
import {
  View,
  Button,
} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }}>
      <Button
        title="Add Emergency Contact"
        color="black"
      />
    </View>
  );
};

export default HomeScreen;