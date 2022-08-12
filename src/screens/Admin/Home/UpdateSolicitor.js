import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator
  } from 'react-native';
  import React, {useState,useRef} from 'react';
  import {commonStyles} from '../../../utils/commonStyles';
  import {Colors} from '../../../utils/Colors';
  import {Fonts} from '../../../utils/Fonts';
  import {ImagePath} from '../../../utils/imagePath';
  import Drawer from 'react-native-drawer'
  import AdminDrawer from '../../../components/Drawer/AdminDrawer'
  import * as request from '../../../networking/request'
  import * as payload from '../../../networking/payload'
  import * as api from '../../../networking/api'
  import { useFocusEffect } from '@react-navigation/native'
  import Helper from '../../../utils/Helper'
  import LinearGradient from 'react-native-linear-gradient';
  import Header from '../../../components/Header/Header';
  import SolicitorListItem from '../../../components/ListItem/SolicitorsListItem';
  import Ionicons from 'react-native-vector-icons/Ionicons'
  const _status = ["inactive","active"]
  const UpdateSolicitor = ({navigation, route}) => {
    const _drawer = useRef(null);
   const item = route.params.item;
   const text = route.params.text;
    const [selectedAvailability, setSelectedAvailability] = useState(route.params.item.available)
    const [selectedStatus, setSelectedStatus] = useState(route.params.item.status != null ? route.params.item.status : 'inactive')
    const [isLoading, setIsLoading] = useState(false)
  
    const closeControlPanel = () => {
      _drawer.current.close()
    };
    const openControlPanel = () => {
      _drawer.current.open()
    };
    
    async function onUpdate(){
        setIsLoading(true)
        const response = await request.PutRequestWithAuthentication(
            api.UpdateSolicitorsAPI(item.id),
            payload.UpdateSolicitorPayload(
                selectedAvailability,
                selectedStatus,
                item.first_name,
                item.last_name,
                item.phone == null ? ' ' : item.phone
            )
        );
        setIsLoading(false)
        if(response.success){
            Helper.showToast('Updated Successfully')
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
          <View style={commonStyles.container}>
            <ScrollView>
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
              <Header onProfilePress={()=>navigation.navigate('AccountSettings')} />
              <View style={styles.mainView}>
                <Text style={styles.des}>{`Admin/ Update ${text}`}</Text>
                <Text style={styles.title}>{`Update ${text}`}</Text>
              </View>
               
                
                <SolicitorListItem 
                    item={item}
                    navigation={navigation}
                />

                <View style={styles.optionContainer}>
                    <Text style={styles.avText}>
                        {'AVAILABILITY'}
                    </Text>
                    <TouchableOpacity 
                    onPress={() => setSelectedAvailability(1)}
                    style={styles.optionRow}>
                        <View style={styles.round}>
                            {
                                selectedAvailability == 1 && <View 
                                    style={styles.roundChild}
                                />
                            }
                        </View>
                        <Text style={styles.text}>
                            {'Available to attend'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => setSelectedAvailability(0)}
                    style={styles.optionRow}>
                        <View style={styles.round}>
                            {
                                selectedAvailability == 0 && <View 
                                    style={styles.roundChild}
                                />
                            }
                        </View>
                        <Text style={styles.text}>
                            {'Not available to attend'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.avText}>
                        {'STATUS'}
                    </Text>
                   <View style={{
                       flexDirection:'row'
                   }}>
                    <TouchableOpacity 
                        onPress={() => setSelectedStatus('active')}
                        style={styles.optionRow}>
                            <View style={styles.round}>
                                {
                                    selectedStatus == 'active' && <View 
                                        style={styles.roundChild}
                                    />
                                }
                            </View>
                            <Text style={styles.text}>
                                {'Active'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => setSelectedStatus('inactive')}
                        style={[styles.optionRow,{
                            marginLeft:16
                        }]}>
                            <View style={styles.round}>
                                {
                                    selectedStatus == 'inactive' && <View 
                                        style={styles.roundChild}
                                    />
                                }
                            </View>
                            <Text style={styles.text}>
                                {'Inactive'}
                            </Text>
                        </TouchableOpacity>
                   </View>
                </View>

                <TouchableOpacity
        disabled={isLoading}
          onPress={() => onUpdate()}
          activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.primary, '#3b5998', '#192f6a']}
            style={styles.linearGradient}>
          {isLoading ? <ActivityIndicator size={'small'} color={'white'}/> : <Text style={styles.buttonText}>{'Update Now'}</Text>}
          </LinearGradient>
        </TouchableOpacity>
                        
            </ScrollView>
        </View>
      </Drawer>
    );
  };
  
  export default UpdateSolicitor;
  
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
    optionContainer:{
        marginHorizontal:16,
        marginTop:16
    },
    avText:{
        fontFamily:Fonts.regular,
        color:Colors.black
    },
    optionRow:{
        flexDirection:'row',
        marginTop:8,
        alignItems: 'center',
    },
    round:{
        height:20,
        width: 20,
        borderRadius:12.5,
        borderWidth:1,
        borderColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center'
    },
    roundChild:{
        height:10,
        width:10,
        backgroundColor:Colors.primary,
        borderRadius:5
    },
    text:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        marginLeft:8
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
  });
  