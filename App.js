import React from 'react';
import {View, TouchableOpacity, Text,StyleSheet} from 'react-native';
import StatusBar from './src/components/StatusBar'
import { Colors } from './src/utils/Colors';
import { commonStyles } from './src/utils/commonStyles';
import RootStack from './src/Navigation/RootStack'
import { Provider } from 'react-redux';
import store from './src/redux//store'

export default function App({}){
    return <Provider store={ store }>
      <View style={{ flex: 1, }}>
        <StatusBar
          backgroundColor={Colors.statusBarBackgroundColor}
          barStyle={commonStyles.statusBarStyleDark}
        />
        <RootStack />
      </View>
  </Provider>
}
