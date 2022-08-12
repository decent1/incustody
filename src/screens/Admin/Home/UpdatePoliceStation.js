import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
  } from 'react-native';
  import React, {useState,useRef} from 'react';
  import {commonStyles} from '../../../utils/commonStyles';
  import {Colors} from '../../../utils/Colors';
  import {Fonts} from '../../../utils/Fonts';
  import {ImagePath} from '../../../utils/imagePath';
  import Drawer from 'react-native-drawer'
  import AdminDrawer from '../../../components/Drawer/AdminDrawer'
  import * as request from '../../../networking/request'
  import * as payload from '../../../networking/payload'
  import * as api from '../../../networking/api'
  import { useFocusEffect } from '@react-navigation/native'
  import Helper from '../../../utils/Helper'
  import Header from '../../../components/Header/Header';
  import Ionicons from 'react-native-vector-icons/Ionicons'
  import LinearGradient from 'react-native-linear-gradient';
import Input from '../../../components/Input/Input';
  const UpdatePoliceStation = ({navigation, route}) => {
    const _drawer = useRef(null);
    
    item = route.params.item
    const [name, setName] = useState(route.params.item.name)
    const [isLoading, setIsLoading] = useState(false)
  
    const closeControlPanel = () => {
      _drawer.current.close()
    };
    const openControlPanel = () => {
      _drawer.current.open()
    };
    
    async function onUpdate(){
        setIsLoading(true)
        const response = await request.PutRequestWithAuthentication(
            api.UpdateStationAPI(item.id),
            payload.UpdateStationPayload(name)
        );
        setIsLoading(false)
        if(response.success){
            console.log(JSON.stringify(response))
            Helper.showToast('Updated Successfully')
            navigation.goBack()
        }
        else{
        if(response.hasOwnProperty('message')){
            Helper.showToast(response.message)
        }
        else{
            Helper.showToast('Something went wrong')
        }
        }
    }
  
    return (
      <Drawer
        ref={_drawer}
        content={
          <AdminDrawer
            selected={'overview'}
            onClose={() => closeControlPanel()}
            navigation={navigation}
          />
        }
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={ratio => ({ main: {opacity: (2 - ratio) / 2}, })}>
          <View style={commonStyles.container}>
            <ScrollView>
              {/* <TouchableOpacity onPress={openControlPanel} style={{}}>
                <Image
                  style={commonStyles.drawerIconStyle}
                  source={ImagePath.drawerIcon}
                />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => {
            // openControlPanel()
            navigation.goBack()
          }} style={{
              height:30,
              width:30,
              alignItems:'center',
              justifyContent:'center',
              marginLeft:12
          }}>
            <Ionicons 
              size={24}
              name={'arrow-back'}
            />
          </TouchableOpacity>
              <Header onProfilePress={()=>navigation.navigate('AccountSettings')} />
              <View style={styles.mainView}>
                <Text style={styles.des}>{'Admin/ Update Stations'}</Text>
                <Text style={styles.title}>{'Update Police Stations'}</Text>
              </View>
               
                <Input 
                    style={{
                        marginTop:32
                    }}
                    value={name}
                    onChangeText={(text)=>setName(text)}
                    placeholder={'Name'}
                />
                <TouchableOpacity
        disabled={isLoading}
          onPress={() => onUpdate()}
          activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.primary, '#3b5998', '#192f6a']}
            style={styles.linearGradient}>
          {isLoading ? <ActivityIndicator size={'small'} color={'white'}/> : <Text style={styles.buttonText}>{'Update Now'}</Text>}
          </LinearGradient>
        </TouchableOpacity>
            </ScrollView>
        </View>
      </Drawer>
    );
  };
  
  export default UpdatePoliceStation;
  
  const styles = StyleSheet.create({
    mainView: {
      marginHorizontal: 16,
    },
    des: {
      fontFamily: Fonts.regular,
      marginTop: 16,
      color: '#798593',
    },
    title: {
      fontFamily: Fonts.medium,
      fontSize: 16,
      marginTop: 8,
      color: '#3E3F42',
    },
    accountType: {
      marginHorizontal: 8,
      fontSize: 14,
      color: '#3E3F42',
      fontFamily: Fonts.regular,
    },
    linearGradient: {
        height: 44,
        marginHorizontal: 64,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
      },
      buttonText: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: '#ffffff',
      },
  });
  