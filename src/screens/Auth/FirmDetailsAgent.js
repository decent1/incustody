import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import AccountTypeModal from '../../components/Modal/AccountTypeModal'
import * as api from '../../networking/api';
import * as payload from '../../networking/payload';
import * as request from '../../networking/request';
import {useDispatch, useSelector} from 'react-redux';

export default function FirmDetailsAgent({navigation, route}){
    const nextScreen = route.params.nextScreen;

    const user = useSelector(state => state.user)
    const [firmName, setFirmName] = React.useState('')
    const [officeAddress, setOfficeAddress] = React.useState('')
    const [firmDx, setFirmDx] = React.useState('')
    const [mobileNo,setMobileNo] = React.useState('')

    const [isTermAccepted, setIsTermAccepted] = React.useState(false)
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

const firm = async() =>{
  if (!isTermAccepted) {
    alert('Please accept the terms ad condition')
  }
  else {
  setLoading(true)
  const response = await  request.PostRequestWithAuthentication(
    api.AgentFirmAPI(),
    payload.AgentFirmPayload(
        firmName,
        officeAddress,
        firmDx,
        mobileNo
    )
  )
  setLoading(false);
  if (response.success) {
    navigation.replace(nextScreen)
  } else {
    if (response.hasOwnProperty('error') && response.error.length > 0) {
      setErrors(response.error);
    } else {
      Alert.alert('Error', response.message);
    }
  }
}
}

    return (
      <View style={commonStyles.container}>
        <ScrollView>
          <Image style={styles.logo} source={ImagePath.check} />
          <Text style={styles.title}>{'Congratulations!'}</Text>
          <Text style={styles.des}>
            {'Provide more Information about  your Agency'}
          </Text>

          <View style={styles.accountTypeContainer}>
            <View style={styles.accountTypeChildContainer}>
              <Text style={styles.accountTypeText}>
                {user.user_type}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.inputTitle,
              {
                marginTop: 20,
              },
            ]}>
            {'Agency Name'}
          </Text>
          <Input
            value={firmName}
            onChangeText={text => setFirmName(text)}
            placeholder="Jane"
            style={styles.input}
            leftComponent={
              <FontAwesome name={'building-o'} size={20} color={'#798593'} />
            }
          />
          {errors.filter(el => el.field == 'agency_name').length > 0 ? (
            <Text style={styles.error}>
              {errors.filter(el => el.field == 'agency_name')[0].message}
            </Text>
          ) : null}
          <Text
            style={[
              styles.inputTitle,
              {
                marginTop: 24,
              },
            ]}>
            {'Agency Office Address'}
          </Text>
          <Input
            value={officeAddress}
            onChangeText={text => setOfficeAddress(text)}
            placeholder="John"
            style={styles.input}
            leftComponent={
              <SimpleLineIcons
                name={'location-pin'}
                size={20}
                color={'#798593'}
              />
            }
          />
          {errors.filter(el => el.field == 'office_address').length > 0 ? (
            <Text style={styles.error}>
              {errors.filter(el => el.field == 'office_address')[0].message}
            </Text>
          ) : null}
          <Text
            style={[
              styles.inputTitle,
              {
                marginTop: 24,
              },
            ]}>
            {'Agency DX'}
          </Text>
          <Input
            value={firmDx}
            onChangeText={text => setFirmDx(text)}
            placeholder=""
            style={styles.input}
            leftComponent={
              <FontAwesome name={'building-o'} size={20} color={'#798593'} />
            }
          />
          {errors.filter(el => el.field == 'agency_dx').length > 0 ? (
            <Text style={styles.error}>
              {errors.filter(el => el.field == 'agency_dx')[0].message}
            </Text>
          ) : null}
          <Text
            style={[
              styles.inputTitle,
              {
                marginTop: 24,
              },
            ]}>
            {'Mobile No'}
          </Text>
          <Input
            value={mobileNo}
            onChangeText={text => setMobileNo(text)}
            placeholder="0123 33 33"
            style={styles.input}
            
            keyboardType={'phone-pad'}
            leftComponent={
              <AntDesign name={'phone'} size={20} color={'#798593'} />
            }
          />
          {errors.filter(el => el.field == 'mobile').length > 0 ? (
            <Text style={styles.error}>
              {errors.filter(el => el.field == 'mobile')[0].message}
            </Text>
          ) : null}
          <View style={styles.acceptContainer}>
            <TouchableOpacity
              onPress={() => setIsTermAccepted(!isTermAccepted)}
              style={styles.checkContainer}>
              {isTermAccepted && <View style={styles.checkChildContainer} />}
            </TouchableOpacity>
            <Text style={styles.acceptText}>
              <Text>{'I accept the '}</Text>
              <Text
                style={{
                  color: '#00A0E9',
                  textDecorationLine: 'underline',
                }}>
                {'Terms and Conditions'}
              </Text>
            </Text>
          </View>

          <TouchableOpacity onPress={firm} activeOpacity={0.8}>
            <LinearGradient
              colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.linearGradient}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={styles.buttonText}>{'Complete'}</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  profileContainer:{
    height:40,
    width: 40,
    borderRadius:20,
    backgroundColor:'#B16EFC',
    alignItems:'center',
    justifyContent:'center',

},
profileName:{
    fontFamily:Fonts.regular,
    color:Colors.white
},
  logo: {
    width: (256 / 100) * 30,
    height: (256 / 100) * 30,
    alignSelf: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.medium,
    marginHorizontal: 16,
    marginTop: 16,
    color: Colors.black,
    alignSelf: 'center',
  },
  des: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    // marginHorizontal: 16,
    marginTop: 4,
    color: '#9EA0A5',
    alignSelf: 'center',
  },
  input: {
    marginHorizontal: 32,
    
  },
  inputTitle: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    marginHorizontal: 32,
    fontSize: 16,
  },
  linearGradient: {
    height: 44,
    marginHorizontal: 64,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    marginBottom: 64,
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
    width: '100%',
    marginTop: 116,
    marginBottom: 11,
  },
  registerText: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginTop: 4,
  },
  accountTypeContainer: {
    height: 40,
    width: 120,
    backgroundColor: Colors.appBackgroundColor,
    borderRadius: 5,
    ...commonStyles.shadow,
    marginHorizontal: 32,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 20,
  },
  accountTypeChildContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  accountTypeText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: Colors.black,
  },
  acceptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 32,
    marginTop: 16,
  },
  checkContainer: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#D8DCE6',
    borderRadius: 2,
    backgroundColor: Colors.appBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    marginLeft: 8,
    fontFamily: Fonts.regular,
    color: '#9EA0A5',
  },
  checkChildContainer: {
    height: 12,
    width: 12,
    backgroundColor: '#00A0E9',
    borderRadius: 2,
  },
  error:{
    fontFamily: Fonts.regular,
    color: 'red',
    marginTop: 5,
    marginHorizontal: 32
  }
});
