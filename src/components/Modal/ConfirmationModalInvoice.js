import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as api from '../../networking/api'
import * as request from '../../networking/request'
import * as payload from '../../networking/payload'
import Helper from '../../utils/Helper'
export default function ConfirmationModalInvoice({
    onYes,
    modalVisible,
    matter_id
}){
    const [selectedFile, setSelectedFile] = useState('')
    const [invoice_document, setInvoice_document] = useState('')
    const [isLoading, setIsLoading] = useState('')

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
            // await setInvoice_document(response.data.value)
            return response.data.value
        }
    };
    async function UploadInvoice(){
        if(selectedFile == ''){
            Helper.showToast('Please upload document')
        }else{
            setIsLoading(true)
            var value = await uploadImage()
            
            console.log(invoice_document)
            let response = await request.PutRequestWithAuthentication(
                api.AddInvoiceToMatterAPI(matter_id),
                payload.AddInvoiceToMatterPayload(
                    value
                )
            )
            setIsLoading(false)
            if(response.success){
                onYes()
            }else{
                Helper.showToast(response.message)
            }
        }
    }
    return <View style={styles.container}>
        <View style={styles.modalView}>
            <View style={styles.header}>
                <Text style={styles.modalTitle}>{'Update Status Now?'}</Text>
                <TouchableOpacity 
                onPress={() => modalVisible()}
                style={styles.closeButton}>
                    <Fontisto 
                        name="close-a"
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </View>
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                disabled={isLoading}
                // onPress={() => onYes()}
                onPress={() => { UploadInvoice() }}
                style={styles.button}>
                    {
                        isLoading
                        ?
                        <ActivityIndicator 
                            size={'small'}
                            color={Colors.white}
                        />
                        :
                        <Text style={styles.buttonText}>{'YES'}</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity 
                disabled={isLoading}
                onPress={() => modalVisible()}
                style={styles.button}>
                    <Text style={styles.buttonText}>{'NO'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalView:{
        width:'80%',
        borderRadius:8,
        backgroundColor:Colors.white,
        paddingBottom:12

    },
    header:{
        height:44,
        width: '100%',
        borderBottomWidth:1,
        borderColor:'gray',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:12
    },
    closeButton:{
        height:30,
        width: 30,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.gray
    },
    modalTitle:{
        fontFamily:Fonts.semiBold,
        color:Colors.primary,
        fontSize:16
    },
    button:{
        height:36,
        width:'45%',
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.primary,
    },
    buttonText:{
        fontFamily:Fonts.semiBold,
        color:Colors.white,
    },
    buttonContainer:{ 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginTop:12
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
      }
})