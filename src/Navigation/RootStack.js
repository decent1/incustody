import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Solicitor from '../Navigation/SolicitorNavigation'
import Agent from '../Navigation/AgenNavigation'
import Admin from '../Navigation/AdminNavigation'

import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import EnterCode from '../screens/Auth/EnterCode';
import Splash from '../screens/Splash';
import ResetPassword from '../screens/Auth/ResetPassword'
import SetNewPassword from '../screens/Auth/SetNewPassword';
import FirmDetailsSolicitor from '../screens/Auth/FirmDetailsSolicitor';
import FirmDetailsAgent from '../screens/Auth/FirmDetailsAgent';


const AdminNavigation = () => {
    const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      headerMode={'none'}
      initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignIn" component={SignIn}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="EnterCode" component={EnterCode} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
          <Stack.Screen name="FirmDetailsSolicitor" component={FirmDetailsSolicitor} />
          <Stack.Screen name="FirmDetailsAgent" component={FirmDetailsAgent} />

          <Stack.Screen name="Solicitor" component={Solicitor} /> 
          <Stack.Screen name="Agent" component={Agent} /> 
          <Stack.Screen name="Admin" component={Admin} /> 
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AdminNavigation

const styles = StyleSheet.create({})