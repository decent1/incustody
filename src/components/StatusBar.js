import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native'


const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles2.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
);

export default class App extends React.Component{
    render(){
        if(Platform.OS == 'ios')
        {
            
            return <MyStatusBar 
                backgroundColor={this.props.backgroundColor} 
                barStyle={this.props.barStyle ? this.props.barStyle : "light-content"} 
            />
        }
        else{
            return <StatusBar
                backgroundColor={this.props.backgroundColor}
                barStyle={this.props.barStyle ? this.props.barStyle : "light-content"}
            />
        }
    }
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles2 = StyleSheet.create({  
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});