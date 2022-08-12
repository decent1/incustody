import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native'
import { ImagePath } from '../utils/imagePath';
import { Colors } from '../utils/Colors';
import Helper from '../utils/Helper';
import {useDispatch} from 'react-redux';
import {addUser} from '../redux'
export default function Splash({navigation}){
  const dispatch = useDispatch();  
  useEffect(() => {
    async function init(){
        let isAuthenticated = await Helper.isAuthenticated()
        if(isAuthenticated){
            let user = await Helper.getUser()
            let token = await Helper.getToken()
            console.log(token)
            console.log(user)
            dispatch(addUser({
              id: user.id,
              first_name:user.first_name,
              last_name:user.last_name,
              email:user.email,
              user_type:user.user_type,
              device_token:user.device_token,
              email_notify:user.email_notify,
              push_notify:user.push_notify,
              text_notify:user.text_notify,
              token:token.token,
              isLogin:true,

              address:user.address,
              city_id:user.city_id,
              phone:user.phone,
              post_code:user.post_code,

              preffered_stations:user.preffered_stations,
              firm:user.firm,
            }))

            if(user.user_type == 'solicitor'){
              navigation.replace('Solicitor')
            }else if(user.user_type == 'agent'){
              navigation.replace('Agent')
            }
            else if(user.user_type == 'admin'){
              navigation.replace('Admin')
            }
        }
        else{
          navigation.replace('SignIn')
        }
    }
    init()
  }, []);

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={ImagePath.incustodylogo} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.appBackgroundColor,
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    alignContent:'center',
    marginTop:-32
  },
});