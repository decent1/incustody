import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../screens/Agent/Home/Dashboard'
import Matters from '../screens/Agent/Home/Matters'
import MatterHistory from '../screens/Agent/Home/MatterHistory'
import AccountSetting from '../screens/Agent/Home/AccountSetting'
import Help from '../screens/Agent/Home/Help'
import ActivityLog from '../screens/Agent/Home/ActivityLog'




const AgenNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        headerMode={'none'}
        initialRouteName="Dashboard">
       
        <Stack.Screen name="Dashboard" component={ Dashboard } />
         <Stack.Screen name="Matter" component={ Matters } />
        <Stack.Screen name="MatterHistory" component={MatterHistory} />
        <Stack.Screen name='AccountSettings' component={AccountSetting}/>
        <Stack.Screen name='Help' component={Help}/>
        <Stack.Screen name='ActivityLog' component={ActivityLog}/>
        
      </Stack.Navigator>
  );
};

export default AgenNavigation;

const styles = StyleSheet.create({});
