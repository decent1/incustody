import React,{useState,useRef} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    Image
} from 'react-native'
import { Colors } from '../../../utils/Colors'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Input from '../../../components/Input/Input'
import PopUp from '../../../components/Modal/PopUp'
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import { ImagePath } from '../../../utils/imagePath'
import Header from '../../../components/Header/Header'

export default function MatterDetails({navigation}){
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
    const [isTermAccepted, setIsTermAccepted] = React.useState(false)
    const [selectedAccountType, setSelectedAccountType] = React.useState(1)
    const [modalVisible, setModalVisible] = useState(false);
    const [popMessage, setPopMessage] = useState()

    const [defenderName, setDefenderName] = useState('');
    const [Offence, setOffence] = useState('');
    const [station, setStation] = useState('')
    const [incharge, setIncharge] = useState('')
   const [contact, setContact] = useState('')
   const [status, setStatus] = useState('')
   const [note, setNote] = useState('')

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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
          <PopUp modalVisible={() => setModalVisible(!modalVisible)} popMessage={popMessage} />
            </Modal>
            <Text style={styles.des}>{'Agent/ Matters / Details:'}</Text>
            <Text style={styles.title}>{'Mohammad Butt at Guildford'}</Text>
            <View style={styles.formDetails}>
              <View style={styles.formHeaderContainer}>
                <Text style={styles.formHeader}>{'Matter Details'}</Text>
                <View style={styles.actionButtonContainer}>
                  <TouchableOpacity
                   onPress={() => {
                    setPopMessage('removed')
                    setModalVisible(true)}}
                    style={[
                      styles.actionButton,
                      {
                        marginRight: 8,
                        borderColor: '#F32020',
                      },
                    ]}>
                    <AntDesign name="close" color="#F32020" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setPopMessage('updated')
                      setModalVisible(true)
                    }}
                    style={[
                      styles.actionButton,
                      {
                        borderColor: '#007AFF',
                      },
                    ]}>
                    <Entypo size={10} name="edit" color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text
                style={[
                  styles.inputTitle,
                  {
                    marginTop: 24,
                  },
                ]}>{`Defender's Name`}</Text>
              <Input
                value={defenderName}
                onChangeText={text => setDefenderName(text)}
                placeholder="Jane"
                style={styles.input}
              />
              <Text
                style={[
                  styles.inputTitle,
                  {
                    marginTop: 24,
                  },
                ]}>{`Offence(s)`}</Text>
              <Input
                value={Offence}
                onChangeText={text => setOffence(text)}
                placeholder="Robbery"
                style={styles.input}
              />
              <Text
                style={[
                  styles.inputTitle,
                  {
                    marginTop: 24,
                  },
                ]}>
                {'Station (Station cannot be amended)'}
              </Text>

              <TouchableOpacity
                style={{
                  height: 40,
                  marginHorizontal: 16,
                  borderBottomWidth: 0.5,
                  borderColor: Colors.black,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // paddingHorizontal:10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.accountTypeText}>{'Guildford'}</Text>
                </View>
                <Entypo name={'chevron-down'} size={20} color={'#798593'} />
              </TouchableOpacity>
              <Text
                style={[
                  styles.inputTitle,
                  {
                    marginTop: 24,
                  },
                ]}>{`Officer In Charge`}</Text>
              <Input
                value={incharge}
                onChangeText={text => setIncharge(text)}
                placeholder=""
                style={styles.input}
              />
              <Text
                style={[
                  styles.inputTitle,
                  {
                    marginTop: 24,
                  },
                ]}>
                {'Contact'}
              </Text>

              <TouchableOpacity
                style={{
                  height: 40,
                  marginHorizontal: 16,
                  borderBottomWidth: 0.5,
                  borderColor: Colors.black,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // paddingHorizontal:10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.accountTypeText}>{'Solicitor'}</Text>
                </View>
                <Entypo name={'chevron-down'} size={20} color={'#798593'} />
              </TouchableOpacity>

              <Text
                style={[
                  styles.inputTitle,
                  {
                    marginTop: 24,
                  },
                ]}>
                {'Status'}
              </Text>

              <TouchableOpacity
                style={{
                  height: 40,
                  marginHorizontal: 16,
                  borderBottomWidth: 0.5,
                  borderColor: Colors.black,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // paddingHorizontal:10,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.accountTypeText}>{'Unassigned'}</Text>
                </View>
                <Entypo name={'chevron-down'} size={20} color={'#798593'} />
              </TouchableOpacity>

              <Text
                style={[
                  styles.inputTitle,
                  {
                    marginTop: 24,
                  },
                ]}>
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
                }}
              />

              <View
                style={{
                  height: 120,
                  marginHorizontal: 16,
                  marginTop: 24,
                  borderWidth: 1,
                  borderColor: '#707070',
                  borderStyle: 'dashed',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign size={32} color={'#007AFF'} name="upload" />
                <Text
                  style={{
                    fontSize: 18,
                    color: '#3E3F42',
                    marginTop: 8,
                    fontFamily: Fonts.regular,
                  }}>
                  {'Attach File'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setIsTermAccepted(!isTermAccepted)}
                  style={{
                    height: 20,
                    width: 20,
                    borderWidth: 1,
                    borderColor: '#D8DCE6',
                    borderRadius: 2,
                    backgroundColor: Colors.appBackgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {isTermAccepted && (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        backgroundColor: '#00A0E9',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    color: '#1665D8',
                    textAlign: 'center',
                    marginTop: 20,
                    marginLeft: 5,
                  }}>
                  {'Notify Dean McClean(Solicitor) about the update'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Matter2')}
              activeOpacity={0.8}>
              <LinearGradient
                colors={[Colors.primary, '#3b5998', '#192f6a']}
                style={{
                  height: 44,
                  marginHorizontal: 64,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 48,
                  marginBottom: 44,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: Fonts.bold,
                    color: '#ffffff',
                  }}>
                  Update Matter
                </Text>
              </LinearGradient>
            </TouchableOpacity>
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
        paddingBottom:16
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
})