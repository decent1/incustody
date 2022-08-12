import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'
import { ImagePath } from '../../utils/imagePath'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Octicons from 'react-native-vector-icons/Octicons'
export default function AdminDrawer({selected = '', onClose = () => {}, navigation}) {
  const SignOut= ()=> {
    AsyncStorage.clear().then(() => {
      navigation.replace('SignIn');
    });
  };
  return (
    <View
      style={{
        backgroundColor: '#001328',
        flex: 1,
      }}>
      <View style={{marginHorizontal: 12}}>
        <TouchableOpacity onPress={() => onClose()} style={{}}>
          <Image
            style={{
              height: 30,
              width: 30,

              marginTop: 8,
              tintColor: 'white',
            }}
            source={ImagePath.drawerIcon}
          />
        </TouchableOpacity>

        <Image source={ImagePath.drawerLogo} style={styles.logo}/>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Dashboard');
          }}
          style={styles.dir}>
          <AntDesign size={20} name="barschart" style={styles.icon} />
          <Text style={styles.text}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Matters');
          }}
          style={styles.dir}>
          <Ionicons
            size={20}
            name="document-text-outline"
            style={styles.icon}
          />
          <Text style={styles.text}>Matters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Solicitors');
          }}
          style={styles.dir}>
          <FontAwesome
            size={20}
            name="user-o"
            style={styles.icon}
          />
          <Text style={styles.text}>Solicitors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Agents');
          }}
          style={styles.dir}>
          <FontAwesome
            size={20}
            name="user-o"
            style={styles.icon}
          />
          <Text style={styles.text}>Agents</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('PoliceStations');
          }}
          style={styles.dir}>
          <MaterialCommunityIcons
            size={20}
            name="police-badge-outline"
            style={styles.icon}
          />
          <Text style={styles.text}>Police Stations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Courts');
          }}
          style={styles.dir}>
          <Octicons
            size={20}
            name="law"
            style={styles.icon}
          />
          <Text style={styles.text}>Courts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('ActivityLog');
          }}
          style={styles.dir}>
          <AntDesign size={20} name="bars" style={styles.icon} />
          <Text style={styles.text}>Activity Log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('AccountSettings');
          }}
          style={styles.dir}>
          <AntDesign size={20} name="setting" style={styles.icon} />
          <Text style={styles.text}>Preferences</Text>
        </TouchableOpacity>

          

        
        
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Wallet');
          }}
          style={styles.dir}>
          <FontAwesome5 size={20} name="wallet" style={styles.icon} />
          <Text style={styles.text}>Document Wallet Log</Text>
        </TouchableOpacity>

        
      </View>
      <View
        style={{
          height: 100,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          marginHorizontal: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Help');
          }}
          style={styles.dir}>
          <Text style={styles.bottonTxt}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            // navigation.navigate('Home');
            SignOut()
          }}
          style={styles.dir}>
          <Text style={styles.bottonTxt}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
title:{
fontSize:30,
fontFamily:Fonts.semiBold,
color:Colors.white,
marginTop:'10%',
},
dir:{
    flexDirection:'row',
    marginTop:20
},
text:{
    color:Colors.white,
    marginLeft:'10%',
    fontSize:16,
    fontFamily:Fonts.regular
},
icon:{
    color:Colors.white,
},
bottonTxt:{
  color:Colors.white,
  fontSize:16,
},
newMatter:{
  borderColor:Colors.primary,
  borderRadius:5,
  marginHorizontal:16,
  height: 44,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:'10%'
},
logo:{
  width:200,
  height:50,
  resizeMode:'contain',
  marginTop:20,
  marginLeft:10
}
})