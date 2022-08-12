import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'
import { ImagePath } from '../../utils/imagePath'
import LinearGradient from 'react-native-linear-gradient';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import * as api from '../../networking/api'
import * as payload from '../../networking/payload'
import * as request from '../../networking/request'
import Helper from '../../utils/Helper'
export default function EnterCode({navigation, route}){
    const email = route.params.email;
    const from = route.params.from;
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState([]);
    async function onVerifyCode(_code){
        setIsLoading(true)
        const response = await request.PostRequest(
            api.VerifyAPI(),
            payload.VerifyPayload(email, _code),
        );
        setIsLoading(false)
        if(response.success){
            if(response.hasOwnProperty('message')){
                Helper.showToast(response.message)
            }
            else{
                Helper.showToast('Verified')
            }   
            if(from === 'signup'){
                navigation.replace('SignIn')
            }
            else{
                navigation.replace('SetNewPassword',{
                    email:email
                })
            }
            
        }
        else{
            if(response.hasOwnProperty('message')){
                Helper.showToast(response.message)
            }
            else{
                Helper.showToast('Something went wrong')
            }   
        }
        console.log(response)
    }
    return <View style={styles.container}>
        <Image style={styles.logo} source={ImagePath.incustodylogo} />
        <Text style={styles.title}>{'Enter OTP'}</Text>
        <Text style={styles.des}>{'Please enter your otp'}</Text>

        <View style={styles.otpView}>
            <SmoothPinCodeInput
                codeLength={4}
                cellSize={50}
                cellSpacing={15}
                value={code}
                onTextChange={code => setCode(code)}
                onFulfill={code => {
                    onVerifyCode(code);
                    Keyboard.dismiss();
                }}
                onBackspace={this._focusePrevInput}
                cellStyle={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    borderWidth:1,
                    borderColor:'lightgray'
                }}
                cellStyleFocused={{
                    borderWidth: 1,
                    borderColor: Colors.textBlue,
                }}
            />
        </View>

        <TouchableOpacity
            disabled={isLoading}
          onPress={() => onVerifyCode(code)}
          activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.primary, '#3b5998', '#192f6a']}
            style={styles.linearGradient}>
          {isLoading ? <ActivityIndicator size={'small'} color={'white'}/> : <Text style={styles.buttonText}>Verify</Text>}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomTextContainer}>
          <Text style={styles.signUpText}>
            {'Didn’t receive OTP?'}
          </Text>
          <TouchableOpacity
            onPress={() => {
                // resend code
            }}
            activeOpacity={0.8}>
            <Text style={styles.registerText}>{'Resend now'}</Text>
          </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.appBackgroundColor,
    },
    logo: {
        width: (622 / 100) * 30,
        height: (148 / 100) * 30,
        alignSelf: 'center',
        marginTop: 8,
    },
    title: {
        fontSize: 24,
        fontFamily: Fonts.medium,
        marginHorizontal: 16,
        marginTop: 32,
        color: Colors.black,
    },
    des:{
        fontSize: 16,
        fontFamily: Fonts.regular,
        marginHorizontal: 16,
        marginTop: 4,
        color: '#9EA0A5',
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
    bottomTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        width: '100%',
        // bottom:16,
    },
    signUpText: {
        fontFamily: Fonts.regular,
        color: Colors.black,
    },
    registerText: {
        fontFamily: Fonts.bold,
        color: Colors.primary,
        marginTop: 4,
    },
    otpView:{
        alignSelf:'center',
        marginTop:16
    }
})