import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import {commonStyles} from '../../utils/commonStyles';
import {ImagePath} from '../../utils/imagePath';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import Input from '../../components/Input/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as api from '../../networking/api';
import * as payload from '../../networking/payload';
import * as request from '../../networking/request';

import Helper from '../../utils/Helper'

import {useDispatch} from 'react-redux';
import {addUser} from '../../redux'

export default function SetNewPassword({navigation, route}) {
    var email = ''
    try{
        email = route.params.email;
    }
    catch(e){
    }
  const [password, setPassword] = React.useState('');
   const [confirmed_password, setConfirmed_password] = React.useState('');

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const login = async () => {
    setLoading(true);
    const response = await request.PostRequest(
      api.setNewPasswordAPI(),
      payload.setNewPasswordPayload(email, password, confirmed_password),
    );
    console.log(response)
    setLoading(false);
    if (response.success) {
      Helper.showToast('Password changed successfully, please login with new password')
        navigation.navigate('SignIn')
    } else {
      if (response.hasOwnProperty('error') && response.error.length > 0) {
        setErrors(response.error);
      } else {
        if(response.hasOwnProperty('message')){
          Helper.showToast(response.message)
        }
        else{
          Helper.showToast('Something went wrong')
        }
      }
    }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView>
        <Image style={styles.logo} source={ImagePath.incustodylogo} />
        <Text style={styles.title}>{'Hi There!'}</Text>
        <Text style={styles.des}>{'We’re happy to have you here again!'}</Text>

        
        <Text style={[styles.inputTitle]}>{'Password'}</Text>
        <Input
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          style={styles.input}
          leftComponent={<Feather name={'lock'} size={20} color={'#798593'} />}
          rightComponent={
            <Feather
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.black}
            />
          }
          secureTextEntry={secureTextEntry}
        />
        {errors.filter(el => el.field == 'password').length > 0 ? (
          <Text style={styles.error}>
            {errors.filter(el => el.field == 'password')[0].message}
          </Text>
        ) : null}

<Text style={[styles.inputTitle]}>{'Confirm Password'}</Text>
        <Input
          value={confirmed_password}
          onChangeText={text => setConfirmed_password(text)}
          placeholder="Password"
          style={styles.input}
          leftComponent={<Feather name={'lock'} size={20} color={'#798593'} />}
          rightComponent={
            <Feather
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.black}
            />
          }
          secureTextEntry={secureTextEntry}
        />
        {errors.filter(el => el.field == 'confirmed_password').length > 0 ? (
          <Text style={styles.error}>
            {errors.filter(el => el.field == 'confirmed_password')[0].message}
          </Text>
        ) : null}
        
        <TouchableOpacity
          onPress={login}
          activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.primary, '#3b5998', '#192f6a']}
            style={styles.linearGradient}>
          {loading ? <ActivityIndicator size={'small'} color={'white'}/> : <Text style={styles.buttonText}>Reset Now</Text>}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomTextContainer}>
          <Text style={styles.signUpText}>
            {'Don’t have a inCustody account yet?'}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.8}>
            <Text style={styles.registerText}>{'Register now'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  des: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginHorizontal: 16,
    marginTop: 4,
    color: '#9EA0A5',
  },
  input: {
    marginHorizontal: 32,
  },
  inputTitle: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    marginHorizontal: 32,
    fontSize: 16,
    marginTop: 20,
  },
  forgotText: {
    fontFamily: Fonts.medium,
    color: Colors.black,
    alignSelf: 'flex-end',
    marginRight: 32,
    marginTop: 8,
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
  orTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  row: {
    height: 1,
    width: 100,
    backgroundColor: Colors.gray,
  },
  or: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.gray,
    marginHorizontal: 8,
  },
  loginWith: {
    fontFamily: Fonts.medium,
    color: Colors.black,
    alignSelf: 'center',
    marginTop: 16,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  socialIcon: {
    height: 32,
    width: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  socialImage: {
    height: '100%',
    width: '100%',
  },
  signUpText: {
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  bottomTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    width: '100%',
    // bottom:16,
  },
  registerText: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginTop: 4,
  },
  error:{
    fontFamily: Fonts.regular,
    color: 'red',
    marginTop: 5,
    marginHorizontal: 32
  }
});
