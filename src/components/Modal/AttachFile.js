import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'
import { ImagePath } from '../../utils/imagePath'
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Helper from '../../utils/Helper'
import * as api from '../../networking/api'
import * as request from '../../networking/request'
import * as payload from '../../networking/payload'

const AttachFile = ({
  modalVisible,
  onSuccess
}) => {
    const [selectedFile, setSelectedFile] = useState('')
    const [document, setDocument] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
  const uploadImage = async () => {
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
      console.log(response)
      if(response.success){
          return response.data.value
      }
  };
  async function UploadInvoice(){
      // if(selectedFile == ''){
      //     Helper.showToast('Please upload document')
      // }else{
          setIsLoading(true)
          // var value = await uploadImage()
          
          let response = await request.PostRequestWithAuthentication(
              api.addDocumentAPI(),
              payload.addDocumentPayload(
                  'uploads/1649197280768.pdf'
              )
          )
          setIsLoading(false)
          if(response.success){
              onSuccess()
              modalVisible()
              Helper.showToast('Document uploaded successfully')
          }else{
              Helper.showToast(response.message)
          }
      // }
  }
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>Upload New File</Text>
          <AntDesign
            onPress={() => modalVisible()}
            name="close"
            size={20}
            color={Colors.gray}
          />
        </View>
        <Text style={[styles.subTitle, {marginTop: 5}]}>Files</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={[styles.subTitle, {color: Colors.black}]}>
            {selectedFile == '' ? 'No files attached.' : selectedFile.name}
          </Text>
          {
            selectedFile != '' && <TouchableOpacity onPress={()=>{ setSelectedFile('') }} >
            <Ionicons
              name='md-remove-circle-sharp'
              size={16}
              style={{ marginLeft:12 }}
              color={Colors.primary}
            />
          </TouchableOpacity>
          }
        </View>
        <TouchableOpacity 
        onPress={() => onSelectFile()}
        activeOpacity={0.8} style={styles.attachBtn}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="clouduploado" size={20} color={Colors.primary}  />
            <Text style={styles.attachTxt}>Attach File</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => {
                UploadInvoice()
                // uploadImage()
            }}
            activeOpacity={0.8}>
            <LinearGradient
              colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.linearGradient}>
              {
                isLoading 
                ? <ActivityIndicator size="small" color={Colors.white} /> 
                : <Text style={styles.buttonText}>{'Upload New'}</Text>
              }
            </LinearGradient>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default AttachFile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
  },
  circle: {
    backgroundColor: '#C9C8CE',
    width: 45,
    height: 45,
    borderRadius: 100,
    alignSelf: 'center',
  },
  checkBox: {
    width: 30,
    height: 30,
    backgroundColor: '#1991D6',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 5,
  },
  check: {
    alignSelf: 'center',
    marginTop: 5,
    color: Colors.white,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
  uploadLine: {
    padding: 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginTop: 5,
  },
  attachTxt: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.darkBlue,
  },
  attachBtn: {
    borderWidth: 1,
    borderColor: '#D8DCE6',
    width: 121,
    borderRadius: 5,
    padding:8,
    marginTop:5
  },
  linearGradient: {
    height: 44,
    marginHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#ffffff',
  },
});