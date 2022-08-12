import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
    Modal,
    Alert
  } from 'react-native';
  import React, {useState,useRef} from 'react';
  import {commonStyles} from '../../../utils/commonStyles';
  import {Colors} from '../../../utils/Colors';
  import {Fonts} from '../../../utils/Fonts';
  import {ImagePath} from '../../../utils/imagePath';
  import Drawer from 'react-native-drawer'
  import AdminDrawer from '../../../components/Drawer/AdminDrawer'
  import * as request from '../../../networking/request'
  import * as api from '../../../networking/api'
  import * as payload from '../../../networking/payload'
  import Input from '../../../components/Input/Input';
  import Entypo from 'react-native-vector-icons/Entypo';
  import LinearGradient from 'react-native-linear-gradient';
  import Helper from '../../../utils/Helper'
  import Header from '../../../components/Header/Header';
import CountryModal from '../../../components/Modal/CountryModal';
import Ionicons from 'react-native-vector-icons/Ionicons'
import StateModal from '../../../components/Modal/StateModal';
import CityModal_Station from '../../../components/Modal/CityModal_Station';
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
  const UpdateCourt = ({navigation, route}) => {
      const item = route.params.item
    const _drawer = useRef(null);
   
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const [name, setName] = useState(item?.name)
    const [country_id, setCountry_id] = useState(item?.country_id)
    const [state_id, setState_id] = useState(item?.state_id)
    const [city_id, setCity_id] = useState(item?.city_id)
    const [post_code, setPost_code] = useState(item?.post_code)
    const [phone, setPhone] = useState(item?.phone)
    const [is_enable, setIs_enable] = useState(item?.is_enable)

    const [selectedCountry, setSelectedCountry] = useState(item?.country)
    const [modalVisibleCountry, setModalVisibleCountry] = useState(false)

    const [selectedState, setSelectedState] = useState(item?.state)
    const [modalVisibleState, setModalVisibleState] = useState(false)

    const [selectedCity, setSelectedCity] = useState(item?.city)
    const [modalVisibleCity, setModalVisibleCity] = useState(false)

    
  
    const closeControlPanel = () => {
      _drawer.current.close()
    };
    const openControlPanel = () => {
      _drawer.current.open()
    };
    async function addData(){
      setIsLoading(true)
      const response = await request.PutRequestWithAuthentication(
        api.UpdateCourtAPI(item.id),
        payload.addCourtPayload(
          name,
          country_id,
          state_id,
          city_id,
          post_code,
          phone,
          is_enable,
        )
      )
      setIsLoading(false) 
      if(response.success){
        navigation.goBack()
        Alert.alert('Success', 'Court updated successfully')
      }
      else{
        if(response.hasOwnProperty('error')){
          setErrors(response.error)
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
    }
  
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
        tweenHandler={ratio => ({ main: {opacity: (2 - ratio) / 2}, })}>

            {/* Country Modal */}
            <Modal
            visible={modalVisibleCountry}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { setModalVisibleCountry(false); }}>
            <CountryModal
              modalVisible={() => {
                setModalVisibleCountry(false)
              }}
              onSelect={item =>{
                setCountry_id(item.id);
                setSelectedCountry(item)
                setModalVisibleCountry(false)
              }}
            />
          </Modal>
          <Modal
            visible={modalVisibleState}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { setModalVisibleState(false); }}>
            <StateModal
              modalVisible={() => {
                setModalVisibleState(false)
              }}
              onSelect={item =>{
                setState_id(item.id);
                setSelectedState(item)
                setModalVisibleState(false)
              }}
              country_id={country_id}
            />
          </Modal>
          <Modal
            visible={modalVisibleCity}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { setModalVisibleCity(false); }}>
            <CityModal_Station
              modalVisible={() => {
                setModalVisibleCity(false)
              }}
              onSelect={item =>{
                setCity_id(item.id);
                setSelectedCity(item)
                setModalVisibleCity(false)
              }}
              country_id={country_id}
              state_id={state_id}
            />
          </Modal>

          <View style={commonStyles.container}>
          {/* <TouchableOpacity onPress={openControlPanel} style={{}}>
                <Image
                  style={commonStyles.drawerIconStyle}
                  source={ImagePath.drawerIcon}
                />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => {
            // openControlPanel()
            navigation.goBack()
          }} style={{
              height:30,
              width:30,
              alignItems:'center',
              justifyContent:'center',
              marginLeft:12
          }}>
            <Ionicons 
              size={24}
              name={'arrow-back'}
            />
          </TouchableOpacity>
            <ScrollView>
             
            <Header onProfilePress={()=>navigation.navigate('AccountSettings')} />
            <View style={styles.mainView}>
                <Text style={styles.des}>{'Admin/ Add Court'}</Text>
                <Text style={styles.title}>{'Add Court'}</Text>
            </View>

            {/* Name */}
            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>{`Name`}</Text>
            <Input
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Name"
            />
            {errors.filter(el => el.field == 'name').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'name')[0].message}
              </Text>
            ) : null}

            {/* Country */}
            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>{'Country'}</Text>
            <TouchableOpacity onPress={()=>{ setModalVisibleCountry(true) }} 
            style={styles.dropDownInput}>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={styles.accountTypeText}>{selectedCountry == '' ? 'Select Country' : selectedCountry.name}</Text>
            </View>
            <Entypo name={'chevron-down'} size={20} color={'#798593'} />
            </TouchableOpacity>
            {errors.filter(el => el.field == 'country_id').length > 0 ? (
            <Text style={styles.error}>
                {errors.filter(el => el.field == 'country_id')[0].message}
            </Text>
            ) : null}

            {/* State */}
            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>{'State'}</Text>
            <TouchableOpacity onPress={()=>{ if(country_id == ''){
                Alert.alert('Please select country')
            }else{
                setModalVisibleState(true)
            }
         }} 
            style={styles.dropDownInput}>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={styles.accountTypeText}>{selectedState == '' ? 'Select State' : selectedState.name}</Text>
            </View>
            <Entypo name={'chevron-down'} size={20} color={'#798593'} />
            </TouchableOpacity>
            {errors.filter(el => el.field == 'state_id').length > 0 ? (
            <Text style={styles.error}>
                {errors.filter(el => el.field == 'state_id')[0].message}
            </Text>
            ) : null}

            {/* City */}
            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>{'State'}</Text>
            <TouchableOpacity onPress={()=>{ if(state_id == ''){
                Alert.alert('Please select state')
            }else{
                setModalVisibleCity(true)
            }
         }} 
            style={styles.dropDownInput}>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={styles.accountTypeText}>{selectedCity == '' ? 'Select City' : selectedCity.name}</Text>
            </View>
            <Entypo name={'chevron-down'} size={20} color={'#798593'} />
            </TouchableOpacity>
            {errors.filter(el => el.field == 'city_id').length > 0 ? (
            <Text style={styles.error}>
                {errors.filter(el => el.field == 'city_id')[0].message}
            </Text>
            ) : null}

          <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>{`Post Code`}</Text>
            <Input
                value={post_code}
                onChangeText={text => setPost_code(text)}
                placeholder="Post Code"
            />
            {errors.filter(el => el.field == 'post_code').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'post_code')[0].message}
              </Text>
            ) : null}

          <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>{`Phone`}</Text>
            <Input
                value={phone}
                onChangeText={text => setPhone(text)}
                placeholder="Phone"
            />
            {errors.filter(el => el.field == 'phone').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'phone')[0].message}
              </Text>
            ) : null}

            <TouchableOpacity 
            onPress={() => {
              if(is_enable == 1){
                setIs_enable(0)
              }else{
                setIs_enable(1)
              }
            }}
            style={{
              flexDirection:'row',
              margin:16,
              alignItems:'center'
            }}>
              <View style={{
                height:25,
                width:25,
                borderRadius:4,
                borderWidth:1,
                borderColor:Colors.primary,
                alignItems:'center',
                justifyContent:'center'
              }}>
                {
                  is_enable == 1
                  ? 
                  <View 
                    style={{
                      height:16,
                      width:16,
                      borderRadius:4,
                      backgroundColor:Colors.primary,
                    }}
                  />
                  :
                  null
                  }

              </View>

              <Text style={{
                fontFamily:Fonts.regular,
                fontSize:16,
                marginLeft:16
              }}>{'Enabled ?'}</Text>
              </TouchableOpacity>

        <TouchableOpacity 
          disabled={isLoading}
          onPress={() => addData()} activeOpacity={0.8}>
            <LinearGradient colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.addMatterButton}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={styles.addMatterText}>
                  Update Court
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
               
               
            </ScrollView>
        </View>
      </Drawer>
    );
  };
  
  export default UpdateCourt;
  
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
    accountType: {
      marginHorizontal: 8,
      fontSize: 14,
      color: '#3E3F42',
      fontFamily: Fonts.regular,
    },
    inputTitle: {
        fontFamily: Fonts.regular,
        color: '#3E3F42',
        marginHorizontal: 16,
        fontSize: 16,
    },
    error: {
        fontFamily: Fonts.regular,
        color: 'red',
        marginTop: 5,
        marginHorizontal: 18,
    },
    dropDownInput: {
        height: 40,
        marginHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: Colors.black,
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row',
    },
    addMatterButton:{
      height: 44,
      marginHorizontal: 64,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 32,
      marginBottom: 44,
    },
    addMatterText:{
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: '#ffffff',
    }
  });
  