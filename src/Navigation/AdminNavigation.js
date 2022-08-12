import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../screens/Admin/Home/Dashboard'
import Matters from '../screens/Admin/Home/Matters'
import MatterHistory from '../screens/Admin/Home/MatterHistory';
import Solicitors from '../screens/Admin/Home/Solicitors'
import Agents from '../screens/Admin/Home/Agents';
import PoliceStations from '../screens/Admin/Home/PoliceStations';
import UpdatePoliceStation from '../screens/Admin/Home/UpdatePoliceStation';
import Help from '../screens/Admin/Home/Help'
import ActivityLog  from '../screens/Admin/Home/ActivityLog'
import AccountSetting from '../screens/Admin/Home/AccountSettings'
import UpdateSolicitor from '../screens/Admin/Home/UpdateSolicitor';
import Wallet from '../screens/Admin/Home/Wallet'
import Courts from '../screens/Admin/Home/Courts';
import AddCourt from '../screens/Admin/Home/AddCourt';
import UpdateCourt from '../screens/Admin/Home/UpdateCourt';
import AddStation from '../screens/Admin/Home/AddStation';
import UpdateStation from '../screens/Admin/Home/UpdateStation';


const AdminNavigation = () => {
    const Stack = createNativeStackNavigator();


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      headerMode={'none'}
      initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Matters" component={Matters} />
      <Stack.Screen name="MatterHistory" component={MatterHistory}/>
      <Stack.Screen name="Solicitors" component={Solicitors} />
      <Stack.Screen name="Agents" component={Agents} />
      <Stack.Screen name="PoliceStations" component={PoliceStations} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="ActivityLog" component={ActivityLog} />
      <Stack.Screen name="AccountSettings" component={AccountSetting} />
      <Stack.Screen name="UpdatePoliceStation" component={UpdatePoliceStation} />
      <Stack.Screen name="UpdateSolicitor" component={UpdateSolicitor} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Courts" component={Courts} />
      <Stack.Screen name="AddCourt" component={AddCourt} />
      <Stack.Screen name="UpdateCourt" component={UpdateCourt} />
      <Stack.Screen name="AddStation" component={AddStation} />
      <Stack.Screen name="UpdateStation" component={UpdateStation} />
    </Stack.Navigator>
  );
}

export default AdminNavigation

const styles = StyleSheet.create({})