import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator
} from 'react-native'
import React,{
  useState,
  useRef,
  useEffect
} from 'react'
import { commonStyles } from '../../../utils/commonStyles'
import Header from '../../../components/Header/Header'
import { Fonts } from '../../../utils/Fonts'
import { Colors } from '../../../utils/Colors'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AttachFile from '../../../components/Modal/AttachFile'
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import { ImagePath } from '../../../utils/imagePath'

import * as api from '../../../networking/api'
import * as request from '../../../networking/request'
import * as payload from '../../../networking/payload'
import Helper from '../../../utils/Helper'
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
const Wallet = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [documents, setDocuments] = useState([])
    const [current_page, setCurrent_page]= useState(1)        
    const [last_page, setLast_page]      = useState('')  
    const [per_page, setPer_page]        = useState(5)

    async function getData(current_page){
      setIsLoading(true)
      let response = await request.GetRequestWithAuthentication(api.getAllDocuments(current_page,per_page))
      setIsLoading(false)
      if(response.success){
          setDocuments(documents.concat(response.data.data));
          setCurrent_page(response.data.meta.current_page)
          setLast_page(response.data.meta.last_page)
      }
    }

    useEffect(() => {
      getData(current_page)
    },[])
    async function onDownload(id){
      setIsLoading(true)
      let response = await request.GetRequestWithAuthentication(
        api.downloadDocument(id)
      )
      setIsLoading(false)
      console.log(response)
    }
  

    const [modalVisible, setModalVisible] = useState(false);
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
    <TouchableOpacity onPress={openControlPanel} style={{}}>
            <Image
              style={commonStyles.drawerIconStyle}
              source={ImagePath.drawerIcon}
            />
          </TouchableOpacity>
      <ScrollView
        scrollEventThrottle={250}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if(current_page != last_page){
              if(!isLoading){
                  getData(current_page + 1)
              }
            }
          }
        }}
      >
      
      <Header onProfilePress={()=>navigation.navigate('AccountSettings')} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <AttachFile 
          onSuccess={() => {
            getData()
          }}
          modalVisible={() => setModalVisible(!modalVisible)} />
        </Modal>
        <View style={styles.mainView}>
          <Text style={styles.des}>{'Admin/ Document Wallet'}</Text>
          <Text style={styles.title}>{'Document Wallet'}</Text>
          <TouchableOpacity
            onPress={() => {
             setModalVisible(true);
            }}
            style={styles.updateBtn}
            activeOpacity={0.8}>
            <Text style={styles.updatedNew}>{'Upload New'}</Text>
          </TouchableOpacity>

          {
            isLoading && <ActivityIndicator 
              size={'small'}
              color={Colors.primary}
              style={{
                position:'absolute',
                ...StyleSheet.absoluteFill,
                zIndex:1,
              }}
            />
          }  

          {
          documents.map(item => <View style={styles.wallet}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <Text style={[styles.time, {marginRight: 5}]}>
              {`${Helper.parseDate(item.created_at.split('T')[0])}, ${Helper.tConvert(item.created_at.split('T')[1])}`}
              </Text>
            </View>
            
            <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
              <Text style={styles.DocumentName}>{item.file_path}</Text>
            </View>
            <TouchableOpacity 
            onPress={() => {
              onDownload(item.id)
            }}
            style={styles.downloadBtn}>
                <Text style={styles.downloadTxt}>Download</Text>
              </TouchableOpacity>
          </View>
          )
          }


        </View>
      </ScrollView>
    </View>
    </Drawer>
  );
}

export default Wallet

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
  updateBtn: {
    alignSelf: 'flex-start',
    marginTop: 12,
    ...commonStyles.shadow,
    borderRadius: 5,
    backgroundColor: Colors.appBackgroundColor,
  },
  updatedNew: {
    fontFamily: Fonts.regular,
    color: Colors.primary,
    fontSize: 10,
    padding: 8,
    textAlign:'center'
  },
  wallet: {
    padding: 12,
    borderRadius: 5,
    borderColor: Colors.gray,
    marginBottom: 10,
    marginTop: 16,
    borderWidth:1,
    borderColor:'lightgray'
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  DocumentName: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: Fonts.regular,
  },
  //
  actionButton: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtn: {
   padding:5,
   borderRadius:5,
   alignSelf:'flex-end',
   backgroundColor:Colors.primary,
  
  },
  downloadTxt:{
      fontSize:12,
      color:Colors.white,
      fontFamily:Fonts.regular
  }
});