import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
import {commonStyles} from '../../utils/commonStyles';
import {ImagePath} from '../../utils/imagePath';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import Input from '../../components/Input/Input';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import AccountTypeModal from '../../components/Modal/AccountTypeModal';
import * as api from '../../networking/api';
import * as payload from '../../networking/payload';
import * as request from '../../networking/request';
import {useDispatch} from 'react-redux';
import { addUser } from '../../redux';
import Helper from '../../utils/Helper';
const URL_AGENT = 'https://incustody.net/join/agent/';
const URL_SOLICITOR = 'https://incustody.net/join/solicitor/';

export default function SignUp({navigation}) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [accountType, setAccountType] = React.useState([
    {
      id: 1,
      name: 'Solicitor',
    },
    {
      id: 2,
      name: 'Agent',
    },
    {
      id: 3,
      name: 'Admin',
    },
  ]);
  const [selectedAccountType, setSelectedAccountType] =
    React.useState('Solicitor');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isTermAccepted, setIsTermAccepted] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const UserRegister = async () => {
    if (!isTermAccepted) {
      alert('Please accept the terms ad condition')
    }
    else{
    setLoading(true);
    
    const response = await request.PostRequest(
      api.RegisterAPI(),
      payload.RegisterPayload(
        email,
        password,
        selectedAccountType,
        firstName,
        lastName,
      ),
    );
    console.log(response)
    setLoading(false);
    if (response.success) {
      console.log('data from api', response);
      dispatch(addUser({
          id: response.data.id,
          first_name:response.data.first_name,
          last_name:response.data.last_name,
          email:response.data.email,
          user_type:response.data.user_type,
      }));
      Helper.saveUser(response.data)
      navigation.navigate('EnterCode',{
        email:email,
        from:'signup'
      })
    } else {
      if (response.hasOwnProperty('error') && response.error.length > 0) {
        setErrors(response.error);
      } else {
        Alert.alert('Error', response.message);
      }
    }
  }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <AccountTypeModal
            accountTypes={accountType}
            onSelect={name => {
              setSelectedAccountType(name);
              setModalVisible(false);
            }}
            modalVisible={() => {
              setModalVisible(false);
            }}
          />
        </Modal>
        <Image style={styles.logo} source={ImagePath.incustodylogo} />
        <Text style={styles.title}>{'Register now'}</Text>
        <Text style={styles.des}>{'& Get Started'}</Text>

        <Text
          style={[
            styles.inputTitle,
            {
              marginTop: 24,
            },
          ]}>
          {'First Name'}
        </Text>
        <Input
          value={firstName}
          onChangeText={text => setFirstName(text)}
          placeholder="John"
          style={styles.input}
          leftComponent={
            <MaterialCommunityIcons
              name={'account-outline'}
              size={20}
              color={'#798593'}
            />
          }
        />
        {errors.filter(el => el.field == 'first_name').length > 0 ? (
          <Text
            style={styles.error}>
            {errors.filter(el => el.field == 'first_name')[0].message}
          </Text>
        ) : null}
        <Text
          style={[
            styles.inputTitle,
            {
              marginTop: 32,
            },
          ]}>
          {'Last Name'}
        </Text>
        <Input
          value={lastName}
          onChangeText={text => setLastName(text)}
          placeholder="Doe"
          style={styles.input}
          leftComponent={
            <MaterialCommunityIcons
              name={'account-outline'}
              size={20}
              color={'#798593'}
            />
          }
        />
        {errors.filter(el => el.field == 'last_name').length > 0 ? (
          <Text
            style={styles.error}>
            {errors.filter(el => el.field == 'last_name')[0].message}
          </Text>
        ) : null}
        <Text
          style={[
            styles.inputTitle,
            {
              marginTop: 32,
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
            <Fontisto name={'email'} size={18} color={'#798593'} />
          }
        />
         {errors.filter(el => el.field == 'email').length > 0 ? (
          <Text
            style={styles.error}>
            {errors.filter(el => el.field == 'email')[0].message}
          </Text>
        ) : null}
        <Text
          style={[
            styles.inputTitle,
            {
              marginTop: 32,
            },
          ]}>
          {'Password'}
        </Text>
        <Input
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          style={styles.input}
          leftComponent={<Feather name={'lock'} size={18} color={'#798593'} />}
          rightComponent={
            <Feather
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={18}
              color={'#798593'}
            />
          }
          secureTextEntry={secureTextEntry}
        />
         {errors.filter(el => el.field == 'password').length > 0 ? (
          <Text
            style={styles.error}>
            {errors.filter(el => el.field == 'password')[0].message}
          </Text>
        ) : null}
        <Text
          style={[
            styles.inputTitle,
            {
              marginTop: 32,
            },
          ]}>
          {'Account Type'}
        </Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.accountTypeContainer}>
          <MaterialCommunityIcons
            name={'account-outline'}
            size={20}
            color={'#798593'}
          />
          <View style={styles.accountTypeChildContainer}>
            <Text style={styles.accountTypeText}>
              {selectedAccountType}
            </Text>
          </View>
          <Entypo name={'chevron-down'} size={20} color={'#798593'} />
        </TouchableOpacity>

        <View style={styles.acceptContainer}>
          <TouchableOpacity
            onPress={() => setIsTermAccepted(!isTermAccepted)}
            style={styles.checkContainer}>
            {isTermAccepted && <View style={styles.checkChildContainer} />}
          </TouchableOpacity>
          <Text style={styles.acceptText}>
            <Text>{'I accept the '}</Text>
            <Text
              onPress={() => {
                if(selectedAccountType == 'Solicitor'){
                  Linking.openURL(URL_SOLICITOR);
                }
                else{
                  Linking.openURL(URL_AGENT);
                }

                
              }}
              style={{
                color: '#00A0E9',
                textDecorationLine: 'underline',
              }}>
              {'Terms and Conditions'}
            </Text>
          </Text>
        </View>
   
      <TouchableOpacity
      disabled={loading}
      onPress={UserRegister}
      activeOpacity={0.8}>
      <LinearGradient
        colors={[Colors.primary, '#3b5998', '#192f6a']}
        style={styles.linearGradient}>
       {loading ? <ActivityIndicator size={'small'} color={'white'}/> : <Text style={styles.buttonText}>Register Now</Text> }
      </LinearGradient>
    </TouchableOpacity>
      

        <View style={styles.bottomTextContainer}>
          <Text style={styles.signUpText}>
            {'Already on Buildings? Let us take you to '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            activeOpacity={0.8}>
            <Text style={styles.registerText}>{'Sign In'}</Text>
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
    alignSelf: 'center',
  },
  des: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginHorizontal: 16,
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
    marginTop: 50,
    marginBottom: 50,
  },
  registerText: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginTop: 4,
  },
  accountTypeContainer: {
    height: 40,
    marginHorizontal: 32,
    borderBottomWidth: 0.5,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
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
