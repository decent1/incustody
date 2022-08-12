import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {commonStyles} from '../../../utils/commonStyles';
import {Fonts} from '../../../utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../../components/Input/Input';
import Drawer from 'react-native-drawer';
import SolicitorDrawer from '../../../components/Drawer/SolicitorDrawer';
import {ImagePath} from '../../../utils/imagePath';
import Header from '../../../components/Header/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as api from '../../../networking/api';
import * as payload from '../../../networking/payload';
import * as request from '../../../networking/request';
import {useSelector} from 'react-redux';
import AccountTypeModal from '../../../components/Modal/AccountTypeModal';
import AssignedModal from '../../../components/Modal/AssignedModal';
import OffenceModal from '../../../components/Modal/OffenceModal';
import StationModal from '../../../components/Modal/StationModal';
import Helper from '../../../utils/Helper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentPicker from 'react-native-document-picker';
import CourtModal from '../../../components/Modal/CourtModal';
import AssignAgentModal from '../../../components/Modal/AssignAgentModal';

export default function MatterDetails({navigation}) {
  const user = useSelector(state => state.user);

  const [defender_name, setDefender_name] = useState('') //done
  const [office_incharge, setOffice_incharge] = useState('') //done

  const [offence_id, setOffence_id] = useState('') //done
  const [station_id, setStation_id] = useState('') //done
  const [court_id, setCourt_id] = useState('') //done
  const [assigned_agent_id, setAssigned_agent_id] = useState('')

  const [user_id, setUser_id] = useState(user.id) //done
  const [status, setStatus] = useState('') //done
  const [contact, setContact] = useState('') //done
  const [note, setNote] = useState('');
  const [attachment, setAttachment] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const [selectedOffence, setSelectedOffence] = useState('')
  const [modalVisibleOffence, setModalVisibleOffence] = useState(false);

  const [selectedStation, setSelectedStation] = useState('')
  const [modalVisibleStation, setModalVisibleStation] = useState(false);

  const [selectedCourt, setSelectedCourt] = useState('')
  const [modalVisibleCourt, setModalVisibleCourt] = useState(false);

  const [selectedAgent, setSelectedAgent] = useState('')
  const [modalVisibleAgent, setModalVisibleAgent] = useState(false);

  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [statusType, setStatusType] = useState([
    { id: 1, name: 'unassigned', },
    { id: 2, name: 'assigned', },
  ]);
  const [modalVisibleContact, setModalVisibleContact] = React.useState(false);
  const [accountType, setAccountType] = React.useState([
    { id: 1, name: 'solicitor', },
    { id: 2, name: 'agent', },
    { id: 3, name: 'admin', },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isTermAccepted, setIsTermAccepted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [matterChoice, setMatterChoice] = useState(1);
  //1 for police station
  //2 for court

  //Drawer useRef
  const _drawer = useRef(null);
  const closeControlPanel = () => { _drawer.current.close(); };
  const openControlPanel = () => { _drawer.current.open(); };

  let uploadImage = async () => {
      console.log(selectedFile)
      const file = {
        name: selectedFile.name,
        type: selectedFile.type,
        uri: selectedFile.uri,
      }
      const body = new FormData()
      body.append('attachment', file)
      let response = await request.PostRequestWithAuthentication_Image(
        api.UploadImage(), 
        body
      )
      if(response.success){
        // setAttachment(response.data.value)
        return response.data.value
      }
      // console.log(attachment)
  };

  const addMatter = async () => {
    setIsLoading(true)
    var value = await uploadImage()
    const response = await request.PostRequestWithAuthentication(
      api.AddMatterAPI(),
      payload.AddMatterPayload(
        defender_name,
        office_incharge,
        offence_id,
        station_id,
        user_id,  
        contact,
        note,
        value,
        assigned_agent_id,
        court_id
      )
    )
    setIsLoading(false)
    if(response.success){
      console.log(JSON.stringify(response))
      Alert.alert('Success', 'Matter added successfully')
      navigation.navigate('Matters')
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
  async function onSelectFile(){
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('res : ' + JSON.stringify(res));
      setSelectedFile(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  uploadDocument = async () => {
    
};
  return (
    <Drawer ref={_drawer}
      content={
        <SolicitorDrawer
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
      <View style={commonStyles.container}>
      <TouchableOpacity onPress={openControlPanel} style={{}}>
            <Image
              style={commonStyles.drawerIconStyle}
              source={ImagePath.drawerIcon}
            />
          </TouchableOpacity>
        <ScrollView>
          
          <Header onProfilePress={() => navigation.navigate('AccountSettings')} />

          {/* //second modal Contact*/}
          <Modal
            visible={modalVisibleContact}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { setModalVisibleContact(false); }}>
            <AccountTypeModal
              modalVisible={() => setModalVisibleContact(false)}
              accountTypes={accountType}
              onSelect={name => {
                setContact(name)
                setModalVisibleContact(false);
              }}
            />
          </Modal>
          {/* /third Modal Sttaus Open*/}
          <Modal
            visible={modalVisibleStatus}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { setModalVisibleStatus(false); }}>
            <AssignedModal
              statusTypes={statusType}
              onSelect={name => {
                setStatus(name)
                setModalVisibleStatus(false);
              }}
              modalVisible={() => setModalVisibleStatus(false)}
            />
          </Modal>
          {/* Offence Modal */}
          <Modal
            visible={modalVisibleOffence}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { setModalVisibleOffence(false); }}>
            <OffenceModal
              modalVisible={() => {
                setModalVisibleOffence(false)
              }}
              onSelect={item =>{
                setOffence_id(item.id);
                setSelectedOffence(item)
                setModalVisibleOffence(false)
              }}
            />
          </Modal>
          <Modal
            visible={modalVisibleStation}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
              setModalVisibleStation(false);
            }}>
            <StationModal
              modalVisible={() => setModalVisibleStation(false)}
              onSelect={item =>{
                setSelectedStation(item)
                setModalVisibleStation(false)
                setStation_id(item.id)
              }}
            />
          </Modal>
          <Modal
            visible={modalVisibleCourt}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
              setModalVisibleCourt(false);
            }}>
            <CourtModal
              modalVisible={() => setModalVisibleCourt(false)}
              onSelect={item =>{
                setSelectedCourt(item)
                setModalVisibleCourt(false)
                setCourt_id(item.id)
              }}
            />
          </Modal>
          <Modal
            visible={modalVisibleAgent}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
              setModalVisibleAgent(false);
            }}>
            <AssignAgentModal
              modalVisible={() => setModalVisibleAgent(false)}
              onSelect={item =>{
                setSelectedAgent(item)
                setModalVisibleAgent(false)
                setAssigned_agent_id(item.id)
              }}
            />
          </Modal>
          
          
          <Text style={styles.des}>{'Solicitor/ Create a new matter'}</Text>
          <View style={styles.formDetails}>
            
            {/* Defender's Name */}
            <Text
              style={[ styles.inputTitle, { marginTop: 24, }, ]}>{`Defender's Name`}</Text>
            <Input
              value={defender_name}
              onChangeText={text => setDefender_name(text)}
              placeholder="Jane"
              style={styles.input}
            />
            {errors.filter(el => el.field == 'defender_name').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'defender_name')[0].message}
              </Text>
            ) : null}

            {/* Office in charnge */}
            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>
                {`Officer In Charge`}
            </Text>
            <Input
              value={office_incharge}
              onChangeText={text => setOffice_incharge(text)}
              placeholder=""
              style={styles.input}
            />
            {errors.filter(el => el.field == 'office_incharge').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'office_incharge')[0].message}
              </Text>
            ) : null}

              {/* Offence */}
            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>
                {`Offence(s)`}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisibleOffence(true)}
              style={{
                paddingVertical:8,
                marginHorizontal: 16,
                borderBottomWidth: 0.5,
                borderColor: Colors.black,
                flexDirection: 'row',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={styles.accountTypeText}>{selectedOffence == '' ? 'Select Offence' : selectedOffence.name}</Text>
              </View>
              <Entypo name={'chevron-down'} size={20} color={'#798593'} />
            </TouchableOpacity>
            {errors.filter(el => el.field == 'offence_id').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'offence_id')[0].message}
              </Text>
            ) : null}
              <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}> {'Registered in ?'} </Text>

              <View style={styles.choiceContainer}>
                <TouchableOpacity 
                  onPress={() => setMatterChoice(1)}
                  style={[styles.choiceButton,{
                    marginRight:8,
                    backgroundColor:matterChoice == 1 ? Colors.primary : '#fff',
                  }]}>
                  <Text style={[styles.choiceButtonText,{
                    color:matterChoice == 1 ? '#fff' : Colors.primary,
                  }]}>{'Police Station'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setMatterChoice(2)}
                  style={[styles.choiceButton,{
                    marginLeft:8,
                    backgroundColor:matterChoice == 2 ? Colors.primary : '#fff',
                  }]}>
                  <Text style={[styles.choiceButtonText,{
                    color:matterChoice == 2 ? '#fff' : Colors.primary,
                  }]}>{'Court'}</Text>
                </TouchableOpacity>
              </View>

              {/* Station */}
            {
              matterChoice == 1 ? 
              <View>
              <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>
                {'Station (Station cannot be amended)'}
              </Text>
              <TouchableOpacity
                onPress={()=>{ setModalVisibleStation(true) }} 
                style={styles.dropDownInput}>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                  <Text style={styles.accountTypeText}>{selectedStation == '' ? 'Select Station' : selectedStation.name}</Text>
                </View>
                <Entypo name={'chevron-down'} size={20} color={'#798593'} />
              </TouchableOpacity>
              {errors.filter(el => el.field == 'station_id').length > 0 ? (
                <Text style={styles.error}>
                  {errors.filter(el => el.field == 'station_id')[0].message}
                </Text>
              ) : null}
            </View>
            :
              <View>
                <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>
                  {'Court'}
                </Text>
                <TouchableOpacity
                onPress={()=>{ setModalVisibleCourt(true) }} 
                style={styles.dropDownInput}>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                  <Text style={styles.accountTypeText}>{selectedCourt == '' ? 'Select Court' : selectedCourt.name}</Text>
                </View>
                <Entypo name={'chevron-down'} size={20} color={'#798593'} />
              </TouchableOpacity>
              {errors.filter(el => el.field == 'court_id').length > 0 ? (
                <Text style={styles.error}>
                  {errors.filter(el => el.field == 'court_id')[0].message}
                </Text>
              ) : null}
              </View>
            }

            


            {/* Contact */}
            <Text style={[ styles.inputTitle, { marginTop: 32, }, ]}>
              {'Contact'}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisibleContact(true)}
              style={styles.contactInput}>
              <MaterialCommunityIcons
                name={'account-outline'}
                size={20}
                color={'#798593'}
              />
              <View style={styles.accountTypeChildContainer}>
                <Text style={styles.accountTypeText}>
                  {contact == '' ? 'Select Contact Type' : contact}
                </Text>
              </View>
              <Entypo name={'chevron-down'} size={20} color={'#798593'} />
            </TouchableOpacity>
            {errors.filter(el => el.field == 'contact').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'contact')[0].message}
              </Text>
            ) : null}

            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>
              {'Assign to agent ?'}
            </Text>
            <TouchableOpacity
                onPress={()=>{ setModalVisibleAgent(true) }} 
                style={styles.dropDownInput}>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                  <Text style={styles.accountTypeText}>{selectedAgent == '' ? 'Select Agent' : `${selectedAgent.first_name} ${selectedAgent.last_name}`}</Text>
                </View>
                <Entypo name={'chevron-down'} size={20} color={'#798593'} />
                {
                  selectedAgent != '' && <TouchableOpacity 
                  onPress={() => {
                    setSelectedAgent('')
                    setAssigned_agent_id('')
                  }}
                  style={styles.removeIconContainer}>
                    <Ionicons 
                      size={16}
                      color={'red'}
                      name="remove-outline"
                    />
                  </TouchableOpacity>
                }
              </TouchableOpacity>
            
            

            {/* Note */}
            <Text style={[ styles.inputTitle, { marginTop: 24, }, ]}>
              {'Note'}
            </Text>
            <TextInput
              value={note}
              onChangeText={text => setNote(text)}
              multiline
              numberOfLines={4}
              style={{
                marginHorizontal: 16,
                borderRadius: 8,
                backgroundColor: Colors.appBackgroundColor,
                ...commonStyles.shadow,
                height: 80,
                marginTop: 16,
                padding:8,
                color: Colors.black,
              }}
            />

            {errors.filter(el => el.field == 'note').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'note')[0].message}
              </Text>
            ) : null}

            <TouchableOpacity onPress={() => { onSelectFile() }}
              style={styles.fileUploadContainer}>
              {
                selectedFile == ''
                ? 
                <View style={styles.iconContainer}>
                  <Ionicons 
                    size={24}
                    color={Colors.primary}
                    name="cloud-upload-outline"
                  />
                  <Text style={styles.fileUploadText}>{'Upload Document'}</Text>
                </View>
                :
                <View style={{ flexDirection:'row', }}>
                  <Text>{selectedFile.name}</Text>
                  <TouchableOpacity onPress={()=>{ setSelectedFile('') }} >
                    <Ionicons
                      name='md-remove-circle-sharp'
                      size={20}
                      style={{ marginLeft:12 }}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              }
            </TouchableOpacity>

            {errors.filter(el => el.field == 'attachment').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'attachment')[0].message}
              </Text>
            ) : null}

            {/* Checkbox */}
            {/* <View style={styles.termsContainer}>
              <TouchableOpacity
                onPress={() => setIsTermAccepted(!isTermAccepted)}
                style={styles.checkboxContainer}>
                {isTermAccepted && (
                  <View style={styles.checkboxChild} />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: '#1665D8',
                  // textAlign: 'center',
                  marginTop: 20,
                  marginLeft: 10,
                  flex: 1,
                }}>
                {'Notify Dean McClean(Solicitor) about the update'}
              </Text>
            </View> */}
          </View>


          <TouchableOpacity 
          disabled={isLoading}
          onPress={() => addMatter()} activeOpacity={0.8}>
            <LinearGradient colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.addMatterButton}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={styles.addMatterText}>
                  Add Matter
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>


        </ScrollView>
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    height: 60,
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: Colors.appBackgroundColor,
    ...commonStyles.shadow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  profileContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#B16EFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: Fonts.regular,
    color: Colors.white,
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
    marginHorizontal: 16,
    marginTop: 16,
    color: '#798593',
  },
  title: {
    fontFamily: Fonts.medium,
    marginHorizontal: 16,
    fontSize: 16,
    marginTop: 8,
    color: '#3E3F42',
  },
  formDetails: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.appBackgroundColor,
    ...commonStyles.shadow,
    paddingBottom: 16,
  },
  formHeaderContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'rgba(121, 133, 147, 0.53)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  formHeader: {
    fontSize: 20,
    fontFamily: Fonts.regular,
    color: '#001328',
  },
  actionButtonContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputTitle: {
    fontFamily: Fonts.regular,
    color: '#3E3F42',
    marginHorizontal: 16,
    fontSize: 16,
  },
  //
  contactInput: {
    height: 40,
    marginHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
  },
  error: {
    fontFamily: Fonts.regular,
    color: 'red',
    marginTop: 5,
    marginHorizontal: 18,
  },
  cancel: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    width: 100,
    alignSelf: 'center',
    borderColor: 'lightgrey',
    marginTop: 10,
  },
  cancelTxt: {
    textAlign: 'center',
    padding: 10,
    color: Colors.black,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  // drop down input
  dropDownInput: {
    height: 40,
    marginHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
  },
  termsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'center',
    marginHorizontal: 18,
  },
  checkboxContainer:{
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#D8DCE6',
    borderRadius: 2,
    backgroundColor: Colors.appBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChild:{
    height: 12,
    width: 12,
    backgroundColor: '#00A0E9',
    borderRadius: 2,
  },
  addMatterButton:{
    height: 44,
    marginHorizontal: 64,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    marginBottom: 44,
  },
  addMatterText:{
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: '#ffffff',
  },
  fileUploadContainer:{
    height:80,
    marginHorizontal:16,
    borderWidth:1,
    borderRadius:8,
    borderColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    marginTop:16
  },
  iconContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  fileUploadText:{
    fontFamily:Fonts.regular,
    color:Colors.primary,
    fontSize:12
  },
  choiceContainer:{
    marginHorizontal:16,
    flexDirection:'row',
    marginTop:12,
    height:40,
  },
  choiceButton:{
    flex:1,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:Colors.primary,
  },
  choiceButtonText:{
    fontFamily:Fonts.semiBold,
  },
  removeIconContainer:{
    height:20,
    width: 20,
    borderRadius: 10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'red',
  }
});
