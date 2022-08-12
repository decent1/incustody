import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { commonStyles } from '../../utils/commonStyles'
import { Fonts } from '../../utils/Fonts'
import Fontisto from 'react-native-vector-icons/Fontisto'
import * as api from '../../networking/api'
import * as request from '../../networking/request'
import Helper from '../../utils/Helper'

export default function DeleteMatterModal({
    modalVisible,
    id,
    navigation
}){
    const [reason,setReason] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    return <View style={styles.container}>
        <View style={styles.modalView}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{'Delete Matter'}</Text>
                    <TouchableOpacity 
                    onPress={() => modalVisible()}
                    style={styles.closeButton}>
                        <Fontisto 
                            name="close-a"
                            size={12}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{
                    fontFamily:Fonts.regular,
                    color:Colors.black,
                    alignSelf:'center',
                    textAlign:'center',
                    marginHorizontal:12,
                }}>{'Are you sure you want to delete this matter?'}</Text>

                <TextInput 
                    value={reason}
                    onChangeText={(text) => setReason(text)}
                    multiline
                    numberOfLines={4}
                    style={{
                        marginHorizontal:12,
                        marginTop:12,
                        height:120,
                        backgroundColor:'whitesmoke',
                        ...commonStyles.shadow,
                        padding:12,
                        fontFamily:Fonts.regular,
                    }}
                    placeholder='Enter reason'
                />

                <View style={{
                    flexDirection:'row',
                    marginHorizontal:12,
                    marginTop:20,
                    marginBottom:12
                }}>
                    <TouchableOpacity 
                    onPress={() => modalVisible()}
                    style={{
                        flex:1,
                        height:40,
                        borderRadius:12,
                        backgroundColor:Colors.primary,
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:6
                    }}>
                        <Text
                            style={{
                                fontFamily:Fonts.semiBold,
                                color:Colors.white
                            }}
                        >{'NO'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    disabled={isLoading}
                    
                    onPress={async () => {
                        if(reason == ''){
                            Alert.alert('Please enter reason')
                        }else{
                            setIsLoading(true)
                          const response = await request.DeleteRequestWithAuthentication(api.DeleteMatterAPI(id))
                          setIsLoading(false)
                          if(response.success){
                            Helper.showToast('Matter Deleted Successfully')
                            modalVisible()
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
                    }}
                    style={{
                        flex:1,
                        height:40,
                        borderRadius:12,
                        backgroundColor:Colors.primary,
                        alignItems:'center',
                        justifyContent:'center',
                        marginLeft:6
                    }}>
                        {isLoading ? <ActivityIndicator 
                        size={'small'}
                        color={Colors.white}
                        /> : <Text
                            style={{
                                fontFamily:Fonts.semiBold,
                                color:Colors.white
                            }}
                        >{'YES'}</Text>}
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
        backgroundColor:Colors.white,
        borderRadius:12,
        ...commonStyles.shadow
    },
    topContainer:{
        height:45,
        width: '100%',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        flexDirection:'row'
    },
    title:{
        fontSize:20,
        fontFamily:Fonts.semiBold,
        color:Colors.black
    },
    closeButton:{
        height:30,
        width: 30,
        borderRadius:15,
        backgroundColor:Colors.gray,
        alignItems:'center',
        justifyContent:'center'
    },
})