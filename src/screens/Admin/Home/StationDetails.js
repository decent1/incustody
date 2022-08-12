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

const StationDetails = ({navigation}) => {
    const [stationName, setStationName] = useState('');
    const [borough, setBorough] = useState('');
    const [town, setTown] = useState('');
     const [country, setCountry] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [postcode , sePostcode ] = useState('')
    const [isTermAccepted, setIsTermAccepted] = useState(false)
    const [isTermDisable, setIsTermDisable] = useState(false)
    const [gender, setGender] = useState('')
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
            <Text style={styles.des}>{'Admin / Station/ Station Details'}</Text>
            <Text style={styles.title}>{'Station Details'}</Text>

            <View style={styles.MatterBox}>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Station Name'}</Text>
                <Input
                  value={stationName}
                  onChangeText={text => setStationName(text)}
                  placeholder="Ernest"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Borough'}</Text>
                <Input
                  value={borough}
                  onChangeText={text => setBorough(text)}
                  placeholder="Ernest"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Gender'}</Text>
                <Input
                  value={gender}
                  onChangeText={text => setGender(text)}
                  placeholder="gender"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Town/City'}</Text>
                <Input
                  value={town}
                  onChangeText={text => setTown(text)}
                  placeholder="london"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Country'}</Text>
                <Input
                  value={country}
                  onChangeText={text => setCountry(text)}
                  placeholder="england"
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
                  keyboardType={'phone-pad'}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Postcode'}</Text>
                <Input
                  value={postcode}
                  onChangeText={text => sePostcode(text)}
                  placeholder="w13 2ab"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.inputTitle]}>{'Status '}</Text>
                <View style={styles.acceptContainer}>
                  <TouchableOpacity
                    onPress={() => setIsTermAccepted(!isTermAccepted)}
                    style={[
                      styles.checkContainer,
                      {
                        backgroundColor: isTermAccepted
                          ? '#00A0E9'
                          : Colors.white,
                      },
                    ]}>
                    {isTermAccepted && (
                      <View
                        style={[
                          styles.checkChildContainer,
                          {
                            backgroundColor: isTermAccepted
                              ? Colors.white
                              : null,
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.acceptText}>
                    <Text>{'Enabled'}</Text>
                  </Text>

                  <TouchableOpacity
                    onPress={() => setIsTermDisable(!isTermDisable)}
                    style={[
                      styles.checkContainer,
                      {
                        marginLeft: 20,
                        marginLeft: 20,
                        backgroundColor: isTermDisable
                          ? '#00A0E9'
                          : Colors.white,
                      },
                    ]}>
                    {isTermDisable && (
                      <View style={styles.checkChildContainer} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.acceptText}>
                    <Text>{'Disabled'}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('JoiningRequest')}
            activeOpacity={0.8}>
            <LinearGradient
              colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>{'Update Details'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Drawer>
  );
}

export default StationDetails

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
    active_btn: {
      padding: 12,
      width: 100,
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 5,
      ...commonStyles.shadow,
      backgroundColor: '#D3D3D3',
    },
    active_btn_txt: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: '#62971A',
      textAlign: 'center',
    },
    //
    acceptContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
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
      height:44,
      marginHorizontal:40,
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      marginTop:48,
      marginBottom:64,
  },
  buttonText: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: '#ffffff',
  },
  });