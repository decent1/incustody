import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native'
import { commonStyles } from '../../utils/commonStyles'
import { ImagePath } from '../../utils/imagePath'
import { Colors } from '../../utils/Colors'
import {Fonts} from '../../utils/Fonts'
import Input from '../../components/Input/Input'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
import * as api from '../../networking/api';
import * as payload from '../../networking/payload';
import * as request from '../../networking/request';
import {useDispatch} from 'react-redux';

export default function ResetPassword({navigation}){
    const [email,setEmail] = React.useState('')
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

const forgotPassword = async () =>{
  setLoading(true)
  const response = await request.PostRequest(
    api.ForgotPasswordAPI(),
    payload.ForgotPasswordPayload(email)
  )
  setLoading(false)
  if (response.success) {
    navigation.navigate('EnterCode',{
        email:email,
        from:'reset'
      })
  }else {
    if (response.hasOwnProperty('error') && response.error.length > 0) {
      setErrors(response.error);
    } else {
      Alert.alert('Error', response.message);
    }
  }
}

    return (
      <View style={commonStyles.container}>
        <Image style={styles.logo} source={ImagePath.incustodylogo} />
        <Text style={styles.title}>{'Password Assistance'}</Text>
        <Text style={styles.des}>
          {'To reset your password, enter your email'}
        </Text>

        <Text
          style={[
            styles.inputTitle,
            {
              marginTop: 48,
            },
          ]}>
          {'Email Address'}
        </Text>
        <Input
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="abc@gmail.com"
          style={styles.input}
          leftComponent={
            <Fontisto name={'email'} size={20} color={'#798593'} />
          }
        />
        {errors.filter(el => el.field == 'email').length > 0 ? (
          <Text style={styles.error}>
            {errors.filter(el => el.field == 'email')[0].message}
          </Text>
        ) : null}
        <TouchableOpacity activeOpacity={0.8} onPress={forgotPassword}>
          <LinearGradient
            colors={[Colors.primary, '#3b5998', '#192f6a']}
            style={styles.linearGradient}>
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={styles.buttonText}>{'Request Reset'}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.acceptText}>
          <Text>{`Didn't receive email? `}</Text>
          <Text
            style={{
              color: '#00A0E9',
              textDecorationLine: 'underline',
            }}>
            {'Send Again'}
          </Text>
        </Text>
      </View>
    );
};

const styles = StyleSheet.create({
    logo:{
        width:(622/100)*30,
        height:(148/100)*30,
        alignSelf:'center',
        marginTop:8,
    },
    title:{
        fontSize:24,
        fontFamily:Fonts.medium,
        marginHorizontal:16,
        marginTop:32,
        color:Colors.black
    },
    des:{
        fontSize:16,
        fontFamily:Fonts.regular,
        marginHorizontal:16,
        marginTop:4,
        color:'#9EA0A5'
    },
    input:{
        marginHorizontal:32,
    },
    inputTitle:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        marginHorizontal:32,
        fontSize:16,
    },
    forgotText:{
        fontFamily:Fonts.medium,
        color:Colors.black,
        alignSelf:'flex-end',
        marginRight:32,
        marginTop:8
    },
    linearGradient: {
        height:44,
        marginHorizontal:64,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        marginTop:48
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: '#ffffff',
    },
    orTextContainer:{  
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:32
    },
    row:{
        height:1,
        width: 100,
        backgroundColor: Colors.gray,
    },
    or:{
        fontFamily:Fonts.regular,
        fontSize:16,
        color:Colors.gray,
        marginHorizontal:8
    },
    loginWith:{
        fontFamily:Fonts.medium,
        color:Colors.black,
        alignSelf:'center',
        marginTop:16
    },
    socialMediaContainer:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        marginTop:16
    },
    socialIcon:{
        height:32,
        width: 32,
        borderRadius:16,
        overflow:'hidden'
    },
    socialImage:{
        height:'100%',
        width: '100%',
    },
    signUpText:{
        fontFamily:Fonts.regular,
        color:Colors.black,
    },
    bottomTextContainer:{
        alignItems:'center',
        justifyContent:'center',
        height:50,
        width: '100%',
        position: 'absolute',
        bottom:16,
    },
    registerText:{
        fontFamily:Fonts.bold,
        color:Colors.primary,
        marginTop:4
    },
    acceptText:{
        marginLeft:8,
        fontFamily:Fonts.regular,
        color:'#9EA0A5',
        alignSelf:'center',
        marginTop:12
    },
    error:{
      fontFamily: Fonts.regular,
      color: 'red',
      marginTop: 5,
      marginHorizontal: 32
    }
})
