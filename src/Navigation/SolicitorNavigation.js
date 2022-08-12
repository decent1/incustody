import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../screens/Solicitor/Home/Dashboard'
import AddMatter from '../screens/Solicitor/Home/AddMatter.js';
import UpdateMatter from '../screens/Solicitor/Home/UpdateMatter';
import Matters from '../screens/Solicitor/Home/Matters';
import MatterHistory from '../screens/Solicitor/Home/MatterHistory'
import AccountSetting from '../screens/Solicitor/Home/AccountSettings'
import Help from '../screens/Solicitor/Home/Help'
import ActivityLog from '../screens/Solicitor/Home/ActivityLog';
import Splash from '../screens/Splash'
const Stack = createNativeStackNavigator();

const SolicitorNavigation = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        headerMode={'none'}
        initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddMatter" component={AddMatter} />
        <Stack.Screen name="UpdateMatter" component={UpdateMatter} />
        <Stack.Screen name="Matters" component={Matters} />
        <Stack.Screen name="MatterHistory" component={MatterHistory} />
        <Stack.Screen name="AccountSettings" component={AccountSetting} />
        <Stack.Screen name='Help' component={Help}/>
        <Stack.Screen name='ActivityLog' component={ActivityLog}/>
      </Stack.Navigator>
    </>
  );
};


export default SolicitorNavigation

const styles = StyleSheet.create({})
