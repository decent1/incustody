import React,{useState,useRef} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    Image,
    ActivityIndicator
} from 'react-native'
import { Colors } from '../../../utils/Colors'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts'
import FontAwesome5 from'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Input from '../../../components/Input/Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PopUp from '../../../components/Modal/PopUp'
import Drawer from 'react-native-drawer'
import AgentDrawer from '../../../components/Drawer/AgentDrawer'
import { ImagePath } from '../../../utils/imagePath'
import Header from '../../../components/Header/Header'
import Helper from '../../../utils/Helper'
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons'
import * as api from '../../../networking/api'
import * as request from '../../../networking/request'
import * as payload from '../../../networking/payload'

import AgentsModal from '../../../components/Modal/AgentsModal'
import ConfirmationModal from '../../../components/Modal/ConfirmationModal'
import ConfirmationModalInvoice from '../../../components/Modal/ConfirmationModalInvoice'

export default function MatterHistory({navigation, route}){
  const [isLoading_Publish, setIsLoading_Publish] = useState(false)
  const [modalVisible_Agents, setModalVisible_Agents] = useState(false)
  const [modalVisible_Confirmation, setModalVisible_Confirmation] = useState(false)
  const [modalVisible_ConfirmationInvoice, setModalVisible_ConfirmationInvoice] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')

  const ChangeStatus = async (status) => {
    setIsLoading_Publish(true)
    const response = await request.PutRequestWithAuthentication(
      api.ChangeStatusAPI(route.params.item.id),
      payload.ChangeStatusPayload(
        status
      )
    )
    setIsLoading_Publish(false)
    if(response.success){
      Helper.showToast('Matter Status Updated Successfully')
      updateData()
    }
  }
    const [accountType, setAccountType] = React.useState([
        {
            id: 1,
            name:"Solicitor",
        },
        {
            id: 2,
            name:"Agent",
        }
    ])
   
    const [item, setItem] = useState(route.params.item)
    const [isLoading_Update, setIsLoading_Update] = useState(false)

    async function updateData(){
      setIsLoading_Update(true)
      const response = await request.GetRequestWithAuthentication(api.GetMatterAPI());
      setIsLoading_Update(false)
      if(response.success){
        setItem(response.data.find(item => item.id == route.params.item.id))
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

    const [modalVisible, setModalVisible] = useState(false);
    const [popMessage, setPopMessage] = useState()


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
        styles={{
          drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
          main: {paddingLeft: 3},
        }}
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2},
        })}>
        <View style={commonStyles.container}>
        {
          isLoading_Update && 
            <ActivityIndicator 
            size={'small'}
            color={Colors.primary}
            style={{
              position:'absolute',
              ...StyleSheet.absoluteFill,
              zIndex:100000,
            }}
          />
        }
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
         
            <Header
              onProfilePress={() => navigation.navigate('AccountSettings')}
            />
            
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible_Confirmation}
              onRequestClose={() => {
                setModalVisible_Confirmation(false);
              }}>
              <ConfirmationModal 
                modalVisible={() => {
                  setModalVisible_Confirmation(false)
                }}
                onYes={() => {
                  setModalVisible_Confirmation(false)
                  ChangeStatus(selectedStatus)
                }}
              />
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible_ConfirmationInvoice}
              onRequestClose={() => {
                setModalVisible_ConfirmationInvoice(false);
              }}>
              <ConfirmationModalInvoice 
                modalVisible={() => {
                  setModalVisible_ConfirmationInvoice(false)
                }}
                onYes={() => {
                  setModalVisible_ConfirmationInvoice(false)
                  ChangeStatus(selectedStatus)
                }}
                matter_id={item.id}
              />
            </Modal>
            <View style={styles.formDetails}>
              <View style={styles.formHeaderContainer}>
                <Text style={styles.formHeader}>{'Matter Details'}</Text>
               
              </View>
              <View
                style={{
                  padding: 12,
                }}>
                <View
                  style={[
                    styles.detailRow,
                    {
                      marginTop: 0,
                    },
                  ]}>
                  <Text style={styles.detailTitle}>{'Defendant'}</Text>
                  <Text style={styles.detailDes}>{item.defender_name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{'Offence(s)'}</Text>
                  <Text style={styles.detailDes}>{item.offence.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{'OIC'}</Text>
                  <Text style={styles.detailDes}>{'-'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{'DSCC Ref.'}</Text>
                  <Text style={styles.detailDes}>{'-'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{'Contact'}</Text>
                  <Text style={styles.detailDes}>
                    {item.contact}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{'Note'}</Text>
                  <View style={{
                  flex:1,
                }}>
                  <Text style={styles.detailDes}>
                    {item.note}
                  </Text>
                </View>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{'Date'}</Text>
                  <Text style={styles.detailDes}>{Helper.parseDate(item.created_at.split('T')[0])}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailTitle}>{'Status'}</Text>
                  <Text
                    style={[
                      styles.detailDes,
                      {
                        backgroundColor:Helper.getBackgroundColor(item.status),
                        color: Helper.getTextColor(item.status),
                        paddingHorizontal:8,
                        paddingVertical:4,
                      },
                    ]}>
                    {item.status}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                <Text style={styles.detailTitle}>{'Attechment'}</Text>
              </View>
              <View style={{
                borderWidth:1,
                borderColor:'#E5E5E5',
                height:200,
                marginTop:12,
              }}>
                <Image 
                    style={{
                      height:'100%',
                      width:"100%",
                      resizeMode:'stretch',      
                    }}
                    source={{
                      uri:`https://api.emanchemicals.com/api/matters/attachment/${item.id}`,
                    }}
                    defaultSource={ImagePath.default}
                />
              </View>
              </View>
            </View>
                <View style={{
                  // height:60,
                  paddingVertical:12,
                  marginHorizontal:16,
                  backgroundColor:'white',
                  ...commonStyles.shadow,
                  marginTop:16,
                  justifyContent:'center',
                  paddingHorizontal:12
                }}>
                  {
                    item.status === 'completed-without-invoice' || item.status === 'completed-with-invoice' ?
                    null
                    :
                    <Text style={{
                    fontFamily:Fonts.semiBold,
                    fontSize:16
                  }}>{'Update Status'}</Text>
                  
                  }

                  {
                    item.histories[item.histories.length - 1].status == 'agent-enroute'
                    ?
                      <TouchableOpacity 
                      onPress={() => {
                        // ChangeStatus('arrived-at-ps')
                        setSelectedStatus('arrived-at-ps')
                        setModalVisible_Confirmation()
                      }}
                      style={styles.changeStatusButton}>
                        {
                          isLoading_Publish
                          ?
                          <ActivityIndicator size={'small'} color={'white'}/>
                          :
                        
                          <Text style={styles.changeStatusButtonText}>{'arrived-at-ps'}</Text>
                        }
                      </TouchableOpacity>
                    :
                    item.histories[item.histories.length - 1].status == 'arrived-at-ps'
                    ?
                      <TouchableOpacity 
                      onPress={() => {
                        // ChangeStatus('interview-finished')
                        setSelectedStatus('interview-finished')
                        setModalVisible_Confirmation()
                      }}
                      style={styles.changeStatusButton}>
                         {
                          isLoading_Publish
                          ?
                          <ActivityIndicator size={'small'} color={'white'}/>
                          :
                        
                        <Text style={styles.changeStatusButtonText}>{'interview-finished'}</Text>
                         }
                      </TouchableOpacity>
                    :
                    item.histories[item.histories.length - 1].status == 'interview-finished'
                    ?
                      <TouchableOpacity 
                      onPress={() => {
                        // ChangeStatus('departed-from-ps')
                        setSelectedStatus('departed-from-ps')
                        setModalVisible_Confirmation()
                      }}
                      style={styles.changeStatusButton}>
                         {
                          isLoading_Publish
                          ?
                          <ActivityIndicator size={'small'} color={'white'}/>
                          :
                        
                        <Text style={styles.changeStatusButtonText}>{'departed-from-ps'}</Text>
                         }
                      </TouchableOpacity> 
                    :
                    item.histories[item.histories.length - 1].status == 'departed-from-ps'
                    ?
                      <View>
                        <TouchableOpacity 
                        onPress={() => {
                          // ChangeStatus('completed-with-invoice')
                          setSelectedStatus('completed-with-invoice')
                          setModalVisible_ConfirmationInvoice()
                        }}
                        style={styles.changeStatusButton}>
                        {
                          isLoading_Publish
                          ?
                          <ActivityIndicator size={'small'} color={'white'}/>
                          :
                        
                          <Text style={styles.changeStatusButtonText}>{'completed-with-invoice'}</Text>
                        }
                        </TouchableOpacity> 
                        <TouchableOpacity 
                        onPress={() => {
                          // ChangeStatus('completed-without-invoice')
                          setSelectedStatus('completed-without-invoice')
                          setModalVisible_Confirmation()
                        }}
                        style={styles.changeStatusButton}>
                        {
                          isLoading_Publish
                          ?
                          <ActivityIndicator size={'small'} color={'white'}/>
                          :
                        
                          <Text style={styles.changeStatusButtonText}>{'completed-without-invoice'}</Text>
                        }
                        </TouchableOpacity> 
                      </View>
                    :
                    item.histories[item.histories.length - 1].status == 'completed-with-invoice' ||  item.histories[item.histories.length - 1].status == 'completed-without-invoice'
                    ?
                      <TouchableOpacity style={styles.changeStatusButton}>
                        <Text style={styles.changeStatusButtonText}>{'Case Closed'}</Text>
                      </TouchableOpacity> 
                    :  
                      null  
                  }

                {/* 
                  
                  
                  
                  
                  
                */}
                </View>
                <View style={styles.formDetails}>
                  <View style={styles.formHeaderContainer}>
                    <Text style={styles.formHeader}>{'Matter History'}</Text>
                  </View>
                  <View
                    style={{
                      padding: 16,
                    }}>
                    {item.histories.map((el, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <View style={styles.marks}>
                          <View style={styles.circle}>
                              <AntDesign
                                name="exclamation"
                                size={10}
                                style={[styles.icon]}
                              />
                          </View>
                          <View style={styles.verticalLine}></View>
                        </View>
                        <View>
                          <View style={styles.dateBox}>
                            <Text style={styles.dateText}>
                              {`${Helper.parseDate(el.created_at.split('T')[0])}, ${Helper.tConvert(el.created_at.split('T')[1])}`}
                            </Text>
                          </View>
                          <View style={styles.historyCard}>
                            <Text style={styles.bookingStartedText}>{Helper.getStatusText(el.status)}</Text>
                            {/* <Text style={styles.nameText}>
                              {'Dene McClean (Solicitor)'}
                            </Text> */}

                            <View
                              style={{
                                backgroundColor:Helper.getBackgroundColor(el.status),
                                padding: 4,
                                borderRadius: 4,
                                width: 'auto',
                                marginTop: 8,
                              }}>
                              <Text
                                style={{
                                  color:Helper.getTextColor(el.status),
                                  color:Colors.primary,
                                  fontFamily: Fonts.regular,
                                  fontSize: 12,
                                }}>
                                {el.status}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                  </View>
                </View>
    {/* 
                <View style={styles.formDetails}>
                  <View style={styles.formHeaderContainer}>
                    <Text style={styles.formHeader}>{'Matter History'}</Text>
                  </View>
                  <View
                    style={{
                      padding: 16,
                    }}>
                    {matterHistory.map((el, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginBottom: 32,
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <View style={styles.marks}>
                          <View style={styles.circle}>
                            {el.status === 'DRAFT' ? (
                              <AntDesign
                                name="exclamation"
                                size={10}
                                style={[styles.icon]}
                              />
                            ) : el.status === 'UNASSIGNED' ? (
                              <AntDesign
                                name="close"
                                size={10}
                                style={styles.icon}
                              />
                            ) : el.status === 'FINDING AGENT' ? (
                              <AntDesign
                                name="question"
                                size={10}
                                style={styles.icon}
                              />
                            ) : el.status === 'AGENT EN-ROUTE' ? (
                              <AntDesign
                                name="check"
                                size={10}
                                style={styles.icon}
                              />
                            ) : el.status === 'ARRIVED AT PS' ? (
                              <Entypo
                                name="location-pin"
                                size={10}
                                style={styles.icon}
                              />
                            ) : el.status === 'INTERVIEW FINISHED' ? (
                              <AntDesign
                                name="check"
                                size={10}
                                style={styles.icon}
                              />
                            ) : el.status === 'DEPARTED FROM PS' ? (
                              <FontAwesome5
                                name="location-arrow"
                                size={10}
                                style={styles.icon}
                              />
                            ) : el.status === 'INVOICE SUBMITTED' ? (
                              <AntDesign
                                name="staro"
                                size={10}
                                style={styles.icon}
                              />
                            ) : null}
                          </View>
                          <View style={styles.verticalLine}></View>
                        </View>
                        <View>
                          <View style={styles.dateBox}>
                            <Text style={styles.dateText}>
                              {'04/03/2020 12:52'}
                            </Text>
                          </View>
                          <View style={styles.historyCard}>
                            <Text style={styles.bookingStartedText}>{el.name}</Text>
                            <Text style={styles.nameText}>
                              {'Dene McClean (Solicitor)'}
                            </Text>

                            <View
                              style={{
                                backgroundColor: `rgba(${el.backgroundColor},${el.opacity})`,
                                padding: 4,
                                borderRadius: 4,
                                width: 'auto',
                                marginTop: 8,
                              }}>
                              <Text
                                style={{
                                  color: el.textColor,
                                  fontFamily: Fonts.regular,
                                  fontSize: 12,
                                }}>
                                {el.status}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                  </View>
                </View> */}
          </ScrollView>
        </View>
      </Drawer>
    );
}

const styles = StyleSheet.create({
    topHeader:{
        height:60,
        marginHorizontal:16,
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
        marginHorizontal:8,
        fontSize:16,
        color:'#3E3F42',
        fontFamily:Fonts.regular
    },
    des:{
        fontFamily:Fonts.regular,
        marginHorizontal:16,
        marginTop:16,
        color:'#798593'
    },
    title:{
        fontFamily:Fonts.medium,
        marginHorizontal:16,
        fontSize:16,
        marginTop:8,
        color:'#3E3F42'
    },
    formDetails:{
        marginHorizontal:16,
        marginTop:16,
        backgroundColor: Colors.appBackgroundColor,
        ...commonStyles.shadow,
    },
    formHeaderContainer:{
        height:50,
        borderBottomWidth:1,
        borderColor:'rgba(121, 133, 147, 0.53)',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:8,
    },
    formHeader:{
        fontSize:20,
        fontFamily:Fonts.regular,
        color:'#001328'
    },
    actionButtonContainer:{
        flexDirection:'row'
    },
    actionButton:{
        height:20,
        width: 20,
        borderRadius:3,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    inputTitle:{
        fontFamily:Fonts.regular,
        color:'#3E3F42',
        marginHorizontal:16,
        fontSize:16,
    },
    detailRow:{
        flexDirection:'row',
        marginTop:8
    },
    detailTitle:{
        color:'#9EA0A5',
        fontFamily:Fonts.regular,
        width:'30%'
    },
    detailDes:{
        color:Colors.black,
        fontFamily:Fonts.regular,
    },
    dateBox:{
        height:24,
        width: 128,
        backgroundColor: '#1991D6',
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center'
    },
    dateText:{
        fontFamily:Fonts.regular,
        fontSize:10,
        color:Colors.white
    },
    historyCard:{
        padding:12,
        backgroundColor:Colors.appBackgroundColor,
        ...commonStyles.shadow,
        marginTop:8,
        width:289

    },
    bookingStartedText:{
        fontFamily:Fonts.regular,
        color:'#001328'
    },
    nameText:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        fontSize:12,

    },
    circle:{
      borderWidth:1,
      width:20,
      height:20,
      borderRadius:50,
      marginRight:5
    },
    icon:{
      alignSelf:'center',
      marginTop:4
    },
    verticalLine:{
      height: 130,
      width: 1,
      backgroundColor: '#909090',
      alignSelf:'center',
      marginRight:7
    },
    changeStatusButton:{
        height:40,
        width: '100%',
        backgroundColor:Colors.primary,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        marginTop:12
    },
    changeStatusButtonText:{
      fontFamily:Fonts.regular,
      fontSize:16,
      color:Colors.white
    }
})