import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator
} from 'react-native';
import React, {useState,useRef, useEffect} from 'react';
import {commonStyles} from '../../../utils/commonStyles';
import PopUp from '../../../components/Modal/PopUp'
import {Fonts} from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../../components/Input/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Drawer from 'react-native-drawer'
import AgentDrawer from '../../../components/Drawer/AgentDrawer'
import { ImagePath } from '../../../utils/imagePath'  
import Header from '../../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as request from '../../../networking/request'
import * as api from '../../../networking/api'
import * as payload from '../../../networking/payload'
import { useSelector, useDispatch } from 'react-redux';
import {addUser} from '../../../redux'
import Helper from '../../../utils/Helper';
import mycities from '../../../data/cityes'
import CityModal from '../../../components/Modal/CityModal';

const AccountSetting = ({navigation}) => {
  const _drawer = useRef(null);
  const [show, setShow] = useState(1)
  const [stations, setStations] = useState([])
  const [preferedStations, setPreferedStations] = useState([])

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [email_notify,setEmail_notify] = useState(user.email_notify)
  const [push_notify,setPush_notify] = useState(user.push_notify)
  const [text_notify,setText_notify] = useState(user.text_notify)
  const [isLoading_Notification, setInLoading_Notification] = useState(false)
  
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [phone, setPhone] = useState(user?.phone);
  const [postCode, setPostCode] = useState(user?.post_code);
  const [city, setCity] = useState(user.city_id == '' || user.city_id == null ? {
    id: 2,
    name: "Arinsal",
    state_id: 493,
    state_code: "04",
    country_id: 6,
    created_at: "2019-10-05T18:28:06.000+01:00",
    updated_at: "2019-10-05T18:28:06.000+01:00"
  }: mycities.find(item => item.id == user.city_id));
  const [city_id, setCity_id] = useState(user.city_id == '' || user.city_id == null ? 2 : user.city_id);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [isLoading_Profile, setIsLoading_Profile] = useState(false);
  
  const [modalVisible_City, setModalVisible_City] = useState(false);

  const [password, setPassword] = useState('')
  const [new_password, setNew_password] = useState('')
  const [confirmed_password, setConfirmed_password] = useState('')
  const [isLoading_Password, setIsLoading_Password] = useState(false)
  const [error_Password, setError_Password] = useState([])
  
  // detail settings button
  const [detail_button, setDetail_button] = useState([
    { id:1, name:'Account Settings', },
    { id:2, name:'Notification Settings', },
    { id:3, name:'Password Settings', },
    { id:4, name:'Preferred Stations', }
  ])

  useEffect(() => {
    async function getStations(){
      try {
        const response = await request.GetRequestWithAuthentication(
          api.StationAPI(1,10), 
        )
        if(response.success){
          setStations(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    async function setPreferedStationsIds(){
        setPreferedStations(user.preffered_stations)
    }
    setPreferedStationsIds()
    getStations()
  },[])


  async function addPreferedStations(){
      const response = await request.PostRequestWithAuthentication(
        api.addPreferedStationsAPI(),
        payload.addPreferedStationsPayload(
          preferedStations
        )
      )
      if(response.success){
        Helper.showToast('Sattings Saved!')
        dispatch(addUser({
          preffered_stations:preferedStations,
        }))
        let user = await Helper.getUser()
        Helper.saveUser({
          ...user,
          preffered_stations:preferedStations,
        })
      }
      else{
        Helper.showToast('Something went wrong!')
      }
  }

  const closeControlPanel = () => {
    _drawer.current.close()
  };

  const openControlPanel = () => {
    _drawer.current.open()
  };

  saveNotificationSettings = async () => {
    setInLoading_Notification(true)
    const response = await request.PutRequestWithAuthentication(
      api.NotificationSettingsAPI(),
      payload.NotificationSettingsPayload(
        email_notify,
        push_notify,
        text_notify
      ))
      setInLoading_Notification(false)
      if(response.success){
        Helper.showToast('Notifications Settings Updated Successfully')
        dispatch(addUser({
          email_notify:email_notify,
          push_notify:push_notify,
          text_notify:text_notify,
        }))
        let user = await Helper.getUser()
        Helper.saveUser({
          ...user,
          email_notify:email_notify,
          push_notify:push_notify,
          text_notify:text_notify,
        })
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

  async function updateProfile(){
    setIsLoading_Profile(true)
    const response = await request.PutRequestWithAuthentication(
      api.UpdateProfileAPI(),
      payload.UpdateProfilePayload(
        firstName,
        lastName,
        phone,
        postCode,
        city_id.toString(),
        address,
        email
      )
    )
    setIsLoading_Profile(false)
    if(response.success){
      Helper.showToast('Profile Updated Successfully')
      console.log(city_id)
      dispatch(
        addUser({
          first_name:firstName,
          last_name:lastName,
          email:email,
          address:address,
          city_id:city_id,
          phone:phone,
          post_code:postCode
        })
      )
      let user = await Helper.getUser()
      Helper.saveUser({
        ...user,
        first_name:firstName,
        last_name:lastName,
        email:email,
        address:address,
        city_id:city_id,
        phone:phone,
        post_code:postCode,
      })
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

  async function ChangePassword(){
    setIsLoading_Password(true)
    const response = await request.PostRequestWithAuthentication(
      api.ChangePasswordAPI(),
      payload.ChangePasswordPayload(
        password,
        new_password,
        confirmed_password
      )
    )
    setIsLoading_Password(false)
    if(response.success){
      Helper.showToast('Password Updated Successfully')
      Helper.showToast('Please Login Again')
      AsyncStorage.clear().then(() => {
        navigation.replace('SignIn');
      });
    }
    else{
      if(response.hasOwnProperty('error') && response.error.length > 0){
        setError_Password(response.error);
      }else{
        if(response.hasOwnProperty('message')){
          Helper.showToast(response.message)
        }
        else{
          Helper.showToast('Something went wrong')
        }
      }
      
    }
  }

  return (
    <Drawer ref={_drawer}
      content={
        <AgentDrawer
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
         <Modal
          visible={modalVisible_City}
          transparent={true}
          animationType="fade"
          onRequestClose={() => { setModalVisible_City(false); }}>
          <CityModal
            modalVisible={() => setModalVisible_City(false)}
            onSelect={item =>{
              setCity_id(item.id);
              setCity(item)
              setModalVisible_City(false)
            }}
          />
        </Modal>
      <View style={commonStyles.container}>
      <TouchableOpacity onPress={openControlPanel} style={{}}>
            <Image style={commonStyles.drawerIconStyle}
              source={ImagePath.drawerIcon}
            />
          </TouchableOpacity>
        <ScrollView>
         
         
          <Header onProfilePress={() => navigation.navigate('AccountSettings')}/>
          <View style={{marginHorizontal: 16}}>
            <Text style={styles.des}>{'Agent/ Preferences '}</Text>
            <Text style={styles.title}>{'Preferences'}</Text>
            <View style={styles.Profile}>
              {/* <Image source={ImagePath.profilePic} style={styles.img} /> */}
              <View style={{
                   width: 100,
                   height: 100,
                   alignSelf: 'center',
                   marginTop: '10%',
                   backgroundColor:Colors.primary,
                   borderRadius:50,
                   alignItems:'center',
                   justifyContent:'center'
                }}>
                  <Text><Text style={[styles.userName,{
                    fontSize:24,
                    color:Colors.white
                  }]}>{`${user.first_name.slice(0,1)} ${user.last_name.slice(0,1)}`}</Text></Text>
                </View>
              <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
              {
                user.city_id == '' || user.city_id == null  
                ? null 
                : <Text style={styles.info}>{mycities.find(el => el.id == user.city_id).name}</Text>
              }
            </View>
            <View style={styles.setting}>
              <Text style={[styles.title, {paddingLeft: 10}]}>
                YOUR DETAILS
              </Text>
              {/* Normal Button */}
              {detail_button.map((value, index) => {
                return value.id === show ? (
                  <TouchableOpacity
                    onPress={() => setShow(value.id)}
                    key={index}
                    activeOpacity={0.8}>
                    <LinearGradient
                      colors={[Colors.primary, '#3b5998', '#192f6a']}
                      style={styles.linearGradient}>
                      <Text
                        style={[styles.buttonText, {color: Colors.white}]}>
                        {value.name}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setShow(value.id)}
                    activeOpacity={0.8}
                    key={index}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>{value.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Account view */}
            {show === 1 ? (
              <View>
                <View style={styles.accountSettings}>
                  <View style={{padding: 15}}>
                    <Text style={styles.account_title}>
                      {'Account Settings'}
                    </Text>
                    <Text style={styles.account_des}>
                      {
                        'Basic information about you and your contact details.'
                      }
                    </Text>
                  </View>
                  <View style={styles.hr}></View>
                  <View style={{padding: 15,paddingBottom:'20%'}}>
                    <Text style={[styles.inputTitle]}>{'First Name'}</Text>
                    <Input
                      value={firstName}
                      onChangeText={text => setFirstName(text)}
                      placeholder="John"
                      style={styles.input}
                      placeholderTextColor={Colors.gray}
                    />
                    <Text style={[styles.inputTitle]}>{'Last Name'}</Text>
                    <Input
                      value={lastName}
                      onChangeText={text => setLastName(text)}
                      placeholder="Doe"
                      style={styles.input}
                      placeholderTextColor={Colors.gray}
                    />
                    <Text style={[styles.inputTitle]}>{'Email Adress'}</Text>
                    <Input
                      editable={false}
                      value={email}
                      onChangeText={text => setEmail(text)}
                      placeholder="abc@example.com"
                      keyboardType={'email-address'}
                      style={styles.input}
                      placeholderTextColor={Colors.gray}
                    />
                    <Text style={[styles.inputTitle]}>{'Phone Number'}</Text>
                    <Input
                      value={phone}
                      onChangeText={text => setPhone(text)}
                      placeholder=""
                      style={styles.input}
                      keyboardType={'number-pad'}
                      placeholderTextColor={Colors.gray}
                    />
                    <Text style={[styles.inputTitle]}>{'Address'}</Text>
                    <Input
                      value={address}
                      onChangeText={text => setAddress(text)}
                      placeholder="Street Address"
                      style={styles.input}
                      placeholderTextColor={Colors.gray}
                    />
                    <Text style={[styles.inputTitle]}>{'City'}</Text>
                    
                    <TouchableOpacity 
                    onPress={() => {
                      setModalVisible_City(true)
                    }}
                    style={{
                      height:45,
                      borderBottomWidth:1,
                      borderColor:Colors.black,
                      marginHorizontal:16,
                      justifyContent:'center',
                      paddingHorizontal:8,
                    }}>
                      <Text
                        style={{
                          fontFamily:Fonts.regular,
                          color:Colors.black
                        }}
                      >{city == '' ? 'Select City' : city.name}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.inputTitle]}>{'Post Code'}</Text>
                    <Input
                      value={postCode}
                      onChangeText={text => setPostCode(text)}
                      placeholder="Wr45 5d7"
                      style={styles.input}
                    />
                  </View>                   
                </View>
                <TouchableOpacity 
                disabled={isLoading_Profile}
                activeOpacity={0.8} onPress={()=>{
                    updateProfile()
                }} >
                  <LinearGradient
                    colors={[Colors.primary, '#3b5998', '#192f6a']}
                    style={[
                      styles.linearGradient,
                      {marginTop: '10%', marginBottom: '10%'},
                    ]}>
                    {
                      isLoading_Profile ? <ActivityIndicator size="small" color={Colors.white} /> : <Text style={[styles.buttonText, {color: Colors.white, alignSelf:'center'}]}>{'Update Settings'}</Text>
                    }
                  </LinearGradient>
                </TouchableOpacity>

              </View>
            ) : null}

            {/* Notification */}
            {show === 2 ? (
              <View>
                <View style={styles.accountSettings}>
                  <View style={{padding: 15}}>
                    <Text style={styles.account_title}>
                      {'Notification Settings'}
                    </Text>
                    <Text style={styles.account_des}>
                      {
                        'You can select how you want to receive notifications Changes can be altered anytime.'
                      }
                    </Text>
                  </View>
                  <View style={styles.hr}></View>
                  <View style={{padding: 15}}>
                    <Text style={styles.receive_sms}>
                      Receive SMS notifications to phone number:
                    </Text>
                    <View style={styles.matter}>
                      <Text style={styles.matter_txt}>Notifications</Text>
                      <View style={styles.checkContainer}>
                        <TouchableOpacity
                        onPress={() => {
                          if(email_notify == 1){
                            setEmail_notify(0)
                          }
                          else{
                            setEmail_notify(1)
                          }
                          
                        }}
                        >
                         {email_notify == 1 ? <LinearGradient
                          style={styles.checkBox}
                            colors={[Colors.primary, '#3b5998', '#192f6a']}>
                            <AntDesign
                              size={10}
                              name="check"
                              style={styles.checkIcon}
                            />
                          </LinearGradient> : <View style={styles.checkBox}/>
                          
                          }
                        </TouchableOpacity>
                        <Text style={styles.checkTxt}>Email</Text>
                      </View>

                      <TouchableOpacity style={styles.checkContainer}

                      onPress={() => {
                          
                          if(push_notify == 1){
                            setPush_notify(0)
                          }
                          else{
                            setPush_notify(1)
                          }
                        }}
                        >
                         {push_notify == 1 ? <LinearGradient
                          style={styles.checkBox}
                            colors={[Colors.primary, '#3b5998', '#192f6a']}>
                            <AntDesign
                              size={10}
                              name="check"
                              style={styles.checkIcon}
                            />
                          </LinearGradient> : <View style={styles.checkBox}/>
                          
                          }
                        <Text style={styles.checkTxt}>
                          Push notifications
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.checkContainer}
                      onPress={() => {
                          
                          if(text_notify == 1){
                            setText_notify(0)
                          }
                          else{
                            setText_notify(1)
                          }
                        }}
                        >
                         {text_notify == 1 ? <LinearGradient
                          style={styles.checkBox}
                            colors={[Colors.primary, '#3b5998', '#192f6a']}>
                            <AntDesign
                              size={10}
                              name="check"
                              style={styles.checkIcon}
                            />
                          </LinearGradient> : <View style={styles.checkBox}/>
                          
                          }
                        <Text style={styles.checkTxt}>Text messages</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                disabled={isLoading_Notification}
                onPress={() => {
                  saveNotificationSettings()
                }}
                activeOpacity={0.8}>
                  <LinearGradient
                    colors={[Colors.primary, '#3b5998', '#192f6a']}
                    style={[
                      styles.linearGradient,
                      {marginTop: '10%', marginBottom: '10%'},
                    ]}>
                    {
                      isLoading_Notification ? <ActivityIndicator 
                        size={'small'}
                        color={Colors.white}
                      /> :
                      <Text style={[styles.UpdateBtn]}>Save Setting</Text>
                      }
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}

            {/* Password View */}
            {show === 3 ? (
              <View>
                <View style={styles.accountSettings}>
                  <View style={{padding: 15}}>
                    <Text style={styles.account_title}>
                      {'Password Settings'}
                    </Text>
                    <Text style={styles.account_des}>
                      {'To Change your password'}
                    </Text>
                  </View>
                  <View style={styles.hr}></View>
                  <View style={{padding: 15}}>
                    <Text style={styles.password_txt}>
                      {'Current Password'}
                    </Text>
                    <TextInput
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      secureTextEntry={true}
                      keyboardType={'default'}
                      style={styles.password_input}
                      placeholder=""
                      
                      placeholderTextColor={Colors.gray}
                    />
                    {error_Password.filter(el => el.field == 'password').length > 0 ? (
                      <Text style={styles.error}>
                        {error_Password.filter(el => el.field == 'password')[0].message}
                      </Text>
                    ) : null}
                    <Text style={styles.password_txt}>{'New Password'}</Text>
                    <TextInput
                      value={new_password}
                      onChangeText={(text) => setNew_password(text)}
                      secureTextEntry={true}
                      keyboardType={'default'}
                      style={styles.password_input}
                      placeholder=""
                      placeholderTextColor={Colors.gray}

                    />
                     {error_Password.filter(el => el.field == 'new_password').length > 0 ? (
                      <Text style={styles.error}>
                        {error_Password.filter(el => el.field == 'new_password')[0].message}
                      </Text>
                    ) : null}
                    <Text style={styles.password_txt}>
                      {'Confirm Password'}
                    </Text>
                    <TextInput
                      value={confirmed_password}
                      onChangeText={(text) => setConfirmed_password(text)}
                      secureTextEntry={true}
                      keyboardType={'default'}
                      style={styles.password_input}
                      placeholder=""
                      placeholderTextColor={Colors.gray}
                    />
                      {error_Password.filter(el => el.field == 'confirmed_password').length > 0 ? (
                      <Text style={styles.error}>
                        {error_Password.filter(el => el.field == 'confirmed_password')[0].message}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                ChangePassword()
              }} >
                  <LinearGradient
                    colors={[Colors.primary, '#3b5998', '#192f6a']}
                    style={[
                      styles.linearGradient,
                      {marginTop: '10%', marginBottom: '10%'},
                    ]}>
                    {
                      isLoading_Password ? <ActivityIndicator
                        size={'small'}
                        color={Colors.white}
                      /> :
                      <Text style={[styles.UpdateBtn]}>Reset Password</Text>
                    }
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}

            {/* Availability */}
            {show === 4 ? (
              <View>
                <View style={styles.accountSettings}>
                  <View style={{padding: 15}}>
                    <Text style={styles.account_title}>
                      {'Preferred Station'}
                    </Text>
                    <Text style={styles.account_des}>
                      {
                        'Basic information about you and your contact details.'
                      }
                    </Text>
                  </View>
                  <View style={styles.hr}></View>
                  <View 
                    style={{padding: 15}}
                  >
                    
                    {stations.map(item => <TouchableOpacity 
                    onPress={async () => {
                      var old_setPreferedStations = preferedStations
                      var isAvailable = false
                      for(let i = 0; i < old_setPreferedStations.length; i++){
                        if(old_setPreferedStations[i] == item.id){
                          isAvailable = true
                          old_setPreferedStations.splice(i, 1)
                          break
                        }
                      }
                      if(!isAvailable){
                        old_setPreferedStations.push(item.id)
                      }
                      setPreferedStations([...old_setPreferedStations])
                    }}
                    style={styles.matter}>
                      <View style={styles.checkContainer}>
                        <View style={[styles.checkBox,{
                          alignItems:'center',
                          justifyContent:'center'
                        }]}>
                          {
                            preferedStations.includes(item.id) ? 
                              <AntDesign
                                size={10}
                                name="check"
                                color={Colors.primary}
                            />
                            : null
                          }
                        </View>
                        <Text style={styles.checkTxt}>
                          {item.name}
                        </Text>
                      </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <TouchableOpacity 
                onPress={() => {
                  addPreferedStations()
                }}
                activeOpacity={0.8}>
                  <LinearGradient
                    colors={[Colors.primary, '#3b5998', '#192f6a']}
                    style={[
                      styles.linearGradient,
                      {marginTop: '10%', marginBottom: '10%'},
                    ]}>
                    <Text style={[styles.UpdateBtn]}>Save Setting</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </Drawer>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  topHeader:{
    height:60,
    // marginHorizontal:16,
    marginTop:20,
    backgroundColor:Colors.appBackgroundColor,
    ...commonStyles.shadow,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:16,
    justifyContent:'space-between'
},
profileContainer:{
    height:40,
    width: 40,
    borderRadius:20,
    backgroundColor:'#B16EFC',
    alignItems:'center',
    justifyContent:'center'
},
profileName:{
    fontFamily:Fonts.regular,
    color:Colors.white
},
accountTypeContainer:{
    height:40,
    width:140,
    backgroundColor:Colors.appBackgroundColor,
    borderRadius:5,
    borderColor:Colors.black,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,
    flexDirection:'row',
},
accountTypeChildContainer:{
    flex:1,
    justifyContent:'center',
},
accountTypeText:{
    marginHorizontal:16,
    fontSize:16,
    color:'#3E3F42',
    fontFamily:Fonts.regular
},
  //
  des: {
    fontFamily: Fonts.regular,
    marginTop: 16,
    color: '#798593',
  },
  title: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    marginTop: 8,
    color: Colors.darkBlue,
    marginBottom: 10,
  },
  Profile: {
    borderRadius: 5,
    borderColor: Colors.gray,
    ...commonStyles.shadow,
    backgroundColor: Colors.appBackgroundColor,
    marginBottom: 20,
  },
  edit: {
    position: 'absolute',
    right: 20,
    top: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '20%',
    borderRadius: 5,
  },
  edit_txt: {
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 5,
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: '10%',
  },
  userName: {
    fontFamily: Fonts.regular,
    fontSize: 22,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  info: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    paddingBottom: 20,
  },
  setting: {
    borderRadius: 5,
    borderColor: Colors.gray,
    ...commonStyles.shadow,
    backgroundColor: Colors.appBackgroundColor,
    padding: 5,
    marginBottom: 20,
  },
  linearGradient: {
    height: 44,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.gray,
    paddingLeft: 20,
  },
  accountSettings: {
    borderRadius: 5,
    borderColor: Colors.gray,
    ...commonStyles.shadow,
    backgroundColor: Colors.appBackgroundColor,
    marginBottom: 10,
  },
  account_title: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
  },
  account_des: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.gray,
    paddingLeft: 10,
  },
  hr: {
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    marginTop: 10,
  },

  inputTitle: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: 16,
    marginTop: 30,
    marginLeft: 10,
  },
  input:{
  color:Colors.black
  },
  UpdateBtn: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
  receive_sms: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 15,
    color:'#6B6C6F'
  },
  // country code
  image: {
    width: 27,
    height: 16,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#707070',
    marginLeft: 12,
  },
  countryCodeContainer: {
    height: 37,
    width: 113,
    backgroundColor: Colors.appBackgroundColor,
    borderRadius: 5,
    borderColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderWidth: 1,
    marginTop: 7,
  },
  phoneNumberInput: {
    borderWidth: 1,
    width: 164,
    borderRadius: 5,
    marginTop: 14,
    borderColor: Colors.gray,
    paddingLeft: 20,
    height: 37,
    color:'#3E3F42'
  },
  //Matter Box
  matter: {
    // marginTop: 15,
  },
  matter_txt: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.darkBlue,
  },
  checkContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor:Colors.primary
  },
  checkTxt: {
    fontSize: 14,
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,
    marginLeft: 10,
  },
  checkIcon: {
    textAlign: 'center',
    color: Colors.white,
    marginTop: 2,
  },
  //Change password
  password_txt: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    marginTop: 15,
  },
  password_input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    width: 282,
    height: 37,
    borderRadius: 5,
    marginTop: 5,
    paddingLeft: 15,
    color:Colors.black
  },
  //AvailAbilty
  availabilitySetting: {
    borderRadius: 5,
    borderColor: Colors.gray,
    ...commonStyles.shadow,
    backgroundColor: Colors.appBackgroundColor,
    marginBottom: 10,
    padding: 15,
  },
  availability_title: {
    fontSize: 18,
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,
  },
  availability_des: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  search: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 14,
  },
  error:{
    fontFamily: Fonts.regular,
    color: 'red',
    marginTop: 5,
  }
});
