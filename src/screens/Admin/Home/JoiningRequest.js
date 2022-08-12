// JoiningRequest
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState,useRef} from 'react';
import {commonStyles} from '../../../utils/commonStyles';
import {Fonts} from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';
import Input from '../../../components/Input/Input';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { ImagePath } from '../../../utils/imagePath';
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import Header from '../../../components/Header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign'

const JoiningRequest = ({navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [qualified, setQualified] = useState('');
  const [role, setRole] = useState('');
  const [isTermAccepted, setIsTermAccepted] = useState(false);
  const _drawer = useRef(null);

    const closeControlPanel = () => {
      _drawer.current.close()
    };
    const openControlPanel = () => {
      _drawer.current.open()
    };
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
      styles={{
        drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
        main: {paddingLeft: 3},
      }}
      tweenHandler={ratio => ({
        main: {opacity: (2 - ratio) / 2},
      })}>
      <View style={commonStyles.container}>
        <ScrollView>
          <TouchableOpacity onPress={openControlPanel} style={{}}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginHorizontal: 12,
                marginTop: 8,
              }}
              source={ImagePath.drawerIcon}
            />
          </TouchableOpacity>
          <Header
            onProfilePress={() => navigation.navigate('AccountSettings')}
          />
          <View style={styles.mainView}>
            <Text style={styles.des}>{'Admin / Invoices'}</Text>
            <Text style={styles.title}>{'Joining Requests'}</Text>
            <View style={styles.MatterBox}>
              <View style={styles.heading}>
                <Text style={styles.title}>Applicant Details</Text>
                <View>
                  <Text style={{fontSize: 12, color: '#9EA0A5', padding: 5}}>
                    Applicant Status
                  </Text>
                  <TouchableOpacity style={styles.formBtn}>
                    <Text style={styles.formTxt}>Pending</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'First Name'}</Text>
                <Input
                  value={firstname}
                  onChangeText={text => setFirstName(text)}
                  placeholder="Ernest"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Last Name'}</Text>
                <Input
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                  placeholder="abc@gmail,com"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Display Name'}</Text>
                <Input
                  value={displayName}
                  onChangeText={text => setDisplayName(text)}
                  placeholder="1244 7588 3773"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Email'}</Text>
                <Input
                  value={email}
                  onChangeText={text => setEmail(text)}
                  placeholder="1244 7588 3773"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Role'}</Text>
                <Input
                  value={role}
                  onChangeText={text => setRole(text)}
                  placeholder="Role"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Qualified '}</Text>
                <Input
                  value={qualified}
                  onChangeText={text => setQualified(text)}
                  placeholder="yes?"
                  style={styles.input}
                />
              </View>
              <View style={styles.acceptContainer}>
                <TouchableOpacity
                  onPress={() => setIsTermAccepted(!isTermAccepted)}>
                  {isTermAccepted === true ? (
                    <LinearGradient
                      style={styles.checkContainer}
                      colors={[Colors.primary, '#3b5998', '#192f6a']}>
                      <AntDesign
                        size={10}
                        name="check"
                        style={styles.checkIcon}
                      />
                    </LinearGradient>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setIsTermAccepted(!isTermAccepted)}
                      style={styles.checkContainer}></TouchableOpacity>
                  )}
                </TouchableOpacity>
                <Text style={styles.acceptText}>
                  <Text>{'Enable applicant for operation'}</Text>
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('JoiningRequest2')}
                  activeOpacity={0.8}>
                  <LinearGradient
                    colors={[Colors.primary, '#3b5998', '#192f6a']}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>Approve Application</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Help')}
                  activeOpacity={0.8}
                  style={[
                    styles.linearGradient,
                    {borderWidth: 1, borderColor: Colors.primary},
                  ]}>
                  <Text>
                    <Text style={[styles.buttonText, {color: Colors.primary}]}>
                      Reject Application
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Drawer>
  );
};

export default JoiningRequest;

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
  PoliceStationBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 5,
    ...commonStyles.shadow,
  },
  key: {
    fontSize: 14,
    color: '#9E9FA5',
    fontFamily: Fonts.regular,
  },
  value: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: Fonts.medium,
  },
  RightContainer: {
    flex: 1,
  },
  LeftContainer: {
    flex: 1,
  },
  value: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  smallBtn: {
    width: 73,
    borderRadius: 5,
    padding: 5,
    ...commonStyles.shadow,
    backgroundColor: '#D3D3D3',
  },
  inputTitle: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    marginHorizontal: 16,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 10,
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
    color: '#3E3F42',
    fontSize: 14,
  },
  checkChildContainer: {
    height: 12,
    width: 12,
    backgroundColor: '#00A0E9',
    borderRadius: 2,
  },
  linearGradient: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#ffffff',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //MatterBox
  MatterBox: {
    borderRadius: 10,
    marginTop: 20,
    borderColor: Colors.gray,
    padding: 12,
    ...commonStyles.shadow,
    backgroundColor: Colors.appBackgroundColor,
  },
  formBtn: {
    borderRadius: 5,
    width: 73,
    alignSelf: 'center',
    ...commonStyles.shadow,
  },
  formTxt: {
    padding: 5,
    textAlign: 'center',
    color: '#FFBA00',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  checkIcon: {
    textAlign: 'center',
    color: Colors.white,
    marginTop: 2,
    justifyContent:'center',
    alignSelf:'center'
  },
  
});

