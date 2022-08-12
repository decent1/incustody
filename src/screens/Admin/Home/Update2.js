import { StyleSheet, Text, View ,TouchableOpacity, ScrollView,Image} from 'react-native'
import React, {useState,useRef} from 'react';
import { commonStyles } from '../../../utils/commonStyles'
import { Colors } from '../../../utils/Colors'
import { Fonts } from '../../../utils/Fonts'
import Entypo from 'react-native-vector-icons/Entypo'
import Input from '../../../components/Input/Input';
import LinearGradient from 'react-native-linear-gradient';
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import { ImagePath } from '../../../utils/imagePath'
import Header from '../../../components/Header/Header';

const Update2 = ({navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [firm, setFirm] = useState('');
  const [isTermActive, setIsTermActive] = useState(false);
  const [isTermInactive, setIsTermInactive] = useState(false);
  const [isAvailabiity, setIsAvailabiity] = useState(false);
  const [isNotAvailabiity, setIsNotAvailabiity] = useState(false);
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
            <Text style={styles.des}>{'Admin / Matters/Update'}</Text>
            <Text style={styles.title}>{'Update'}</Text>

            <View style={styles.MatterBox}>
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
                <Text style={[styles.inputTitle]}>{'Mobile No'}</Text>
                <Input
                  value={mobileNumber}
                  onChangeText={text => setMobileNumber(text)}
                  placeholder="1244 7588 3773"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                {/* <Text style={[styles.inputTitle]}>{' '}</Text> */}
                <Input placeholder="-" style={styles.input} />
              </View>
              {/* EXCLUDE MATTERS FROM */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>
                  {'EXCLUDE MATTERS FROM'}
                </Text>
                <View style={styles.inputContainerTxt}>
                  <Text style={styles.txt}>
                    {'STOKOE PARTNERSHIP SOLICITORS'}
                  </Text>
                  <Entypo name="cross" size={20} style={{marginLeft: 5}} />
                </View>
              </View>
              {/* AVAILABILITY*/}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'AVAILABILITY '}</Text>
                <View style={[styles.acceptContainer, {marginTop: 10}]}>
                  <TouchableOpacity
                    onPress={() => setIsAvailabiity(!isAvailabiity)}
                    style={[
                      styles.checkContainer,
                      {
                        backgroundColor: isAvailabiity
                          ? '#00A0E9'
                          : Colors.white,
                      },
                    ]}>
                    {isAvailabiity && (
                      <View
                        style={[
                          styles.checkChildContainer,
                          {
                            backgroundColor: isAvailabiity
                              ? Colors.white
                              : null,
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.acceptText}>
                    <Text>{'Available to attend'}</Text>
                  </Text>
                </View>
              </View>
              <View style={[styles.acceptContainer, {marginTop: 10}]}>
                <TouchableOpacity
                  onPress={() => setIsNotAvailabiity(!isNotAvailabiity)}
                  style={[
                    styles.checkContainer,
                    {
                      backgroundColor: isNotAvailabiity
                        ? '#00A0E9'
                        : Colors.white,
                    },
                  ]}>
                  {isNotAvailabiity && (
                    <View
                      style={[
                        styles.checkChildContainer,
                        {
                          backgroundColor: isNotAvailabiity
                            ? Colors.white
                            : null,
                        },
                      ]}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.acceptText}>
                  <Text>{'Not available to attend'}</Text>
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Status '}</Text>
                <View style={styles.acceptContainer}>
                  <TouchableOpacity
                    onPress={() => setIsTermActive(!isTermActive)}
                    style={[
                      styles.checkContainer,
                      {
                        backgroundColor: isTermActive
                          ? '#00A0E9'
                          : Colors.white,
                      },
                    ]}>
                    {isTermActive && (
                      <View
                        style={[
                          styles.checkChildContainer,
                          {
                            backgroundColor: isTermActive ? Colors.white : null,
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.acceptText}>
                    <Text>{'Active'}</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsTermInactive(!isTermInactive)}
                    style={[
                      styles.checkContainer,
                      {
                        marginLeft: 20,
                        backgroundColor: isTermInactive
                          ? '#00A0E9'
                          : Colors.white,
                      },
                    ]}>
                    {isTermInactive && (
                      <View
                        style={[
                          styles.checkChildContainer,
                          {
                            backgroundColor: isTermInactive
                              ? Colors.white
                              : null,
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.acceptText}>
                    <Text>{'Inactive'}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Invoices')}
            activeOpacity={0.8}>
            <LinearGradient
              colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>{'Update Settings'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Drawer>
  );
};

export default Update2

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 16,
  },
  accountTypeContainer: {
    height: 40,
    width: 140,
    backgroundColor: Colors.appBackgroundColor,
    borderRadius: 5,
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
    marginHorizontal: 8,
    fontSize: 16,
    color: '#3E3F42',
    fontFamily: Fonts.regular,
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
  filterContainer: {
    flexDirection: 'row',
  },
  accountType: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#3E3F42',
    fontFamily: Fonts.regular,
  },

  //MatterBox
  MatterBox: {
    // borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    borderColor: Colors.gray,
    padding: 12,
    ...commonStyles.shadow,
    backgroundColor: Colors.appBackgroundColor,
  },

  //input
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
    // marginTop: 10,
    marginHorizontal: 16,
  },
  
  checkContainer: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#D8DCE6',
    borderRadius: 50,
    backgroundColor: '#00A0E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    marginLeft: 8,
    fontFamily: Fonts.regular,
    color: '#9EA0A5',
  },
  checkChildContainer: {
    height: 8,
    width: 8,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  linearGradient: {
    height: 44,
    marginHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    marginBottom: 64,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: '#ffffff',
  },
  inputContainerTxt: {
    flexDirection:'row',
    alignSelf: 'center',
    padding:5,
    borderRadius:5,
    ...commonStyles.shadow,
    backgroundColor: '#D3D3D3',
    margin:10
  },
  txt: {
    textAlign: 'center',
  },
});