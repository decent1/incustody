import React,{useState,useRef} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native'
import { Colors } from '../../../utils/Colors'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import { ImagePath } from '../../../utils/imagePath'
import Helper from '../../../utils/Helper'
import AgentsModal from '../../../components/Modal/AgentsModal'

import * as api from '../../../networking/api'
import * as request from '../../../networking/request'
import * as payload from '../../../networking/payload'
import Header from '../../../components/Header/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function MatterHistory({
  navigation, 
  route
}){
  const _drawer = useRef(null);
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
  const closeControlPanel = () => {
    _drawer.current.close()
  };
  const openControlPanel = () => {
    _drawer.current.open()
  };

  return (
    <Drawer ref={_drawer}
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
        <ScrollView>
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
          <Header onProfilePress={() => navigation.navigate('AccountSettings')}/>
        
          <View style={styles.formDetails}>
            <View style={styles.formHeaderContainer}>
              <Text style={styles.formHeader}>{'Matter Details'}</Text>
              <View style={styles.actionButtonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Alert.alert(
                      'Are you sure you want to delete this matter?',
                      '',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: async () => {
                          
                          const response = await request.DeleteRequestWithAuthentication(api.DeleteMatterAPI(item.id))
                          
                          if(response.success){
                            Helper.showToast('Matter Deleted Successfully')
                            navigation.goBack()
                          }
                          else{
                            if(response.hasOwnProperty('message')){
                              Helper.showToast(response.message)
                            }
                            else{
                              Helper.showToast('Something went wrong')
                            }
                          }
                        }},
                      ],
                      {cancelable: false},
                    );
                  }}
                  style={[
                    styles.actionButton,
                    {
                      marginRight: 8,
                      borderColor: '#F32020',
                    },
                  ]}>
                  <AntDesign name="delete" color="#F32020" />
                </TouchableOpacity>
               
              </View>
            </View>
            <View style={{ padding: 12, }}>
              <View style={[ styles.detailRow, { marginTop: 0, }, ]}>
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
                <Text style={[ styles.detailDes, {
                        backgroundColor:Helper.getBackgroundColor(item.status),
                        color: Helper.getTextColor(item.status),
                        paddingHorizontal:8,
                        paddingVertical:4,
                      }, ]}>
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
          
          <View style={styles.formDetails}>
            <View style={styles.formHeaderContainer}>
              <Text style={styles.formHeader}>{'Matter History'}</Text>
            </View>
            <View style={{ padding: 16, }}>
              {
                item.histories.map((el, index) => {
                  return (
                    <View key={index}
                      style={styles.historyContainer}>
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
                          <View style={[styles.statusContainer,{
                            backgroundColor:Helper.getBackgroundColor(el.status),
                          }]}>
                            <Text style={[styles.statusContainerText,{
                              color:Helper.getTextColor(el.status),
                            }]}>
                              {el.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })
              }
            </View>
          </View>
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
        // width:'80%',
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
    publishNowButton:{
      height: 44,
      marginHorizontal: 64,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 48,
    },
    publishNowButtonText:{
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: '#ffffff',
    },
    agenstDetailContainer:{
      height:60,
      marginHorizontal:16,
      backgroundColor:'white',
      ...commonStyles.shadow,
      marginTop:16,
      alignItems:'center',
      flexDirection:'row',
      paddingHorizontal:12
    },
    viewAllAgentsButton:{
      height:32,
      paddingHorizontal:8,
      borderRadius:4,
      backgroundColor:Colors.primary,
      alignItems:'center',
      justifyContent:'center'
    },
    viewAllAgentsButtonText:{
      fontFamily:Fonts.regular,
      fontSize:12,
      color:'white',
    },
    historyContainer:{
      // marginBottom: 32,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    statusContainer:{
      padding: 4,
      borderRadius: 4,
      width: 'auto',
      marginTop: 8,
    },
    statusContainerText:{
      fontFamily: Fonts.regular,
      fontSize: 12,
    }
})