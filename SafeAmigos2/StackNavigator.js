///Thanks to https://stackoverflow.com/questions/61436098/how-to-create-multiple-screens-on-react-native

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserPageBtn from "./UserPgButton";
import EmergencyPage from "./EmergencyContactPage";

const AuthStack = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="UserPage"
        component={UserPageBtn}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <AuthStack.Screen
        name="EmergencyPage"
        component={EmergencyPage}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStack;