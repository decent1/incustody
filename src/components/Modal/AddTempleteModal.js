import React,{useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    
} from 'react-native'
import { Colors } from '../../utils/Colors';
import { Fonts } from '../../utils/Fonts';
import { commonStyles } from '../../utils/commonStyles';
import LinearGradient from 'react-native-linear-gradient';
import * as api from '../../networking/api'
import * as payload from '../../networking/payload'
import * as request from '../../networking/request'

import Fontisto from 'react-native-vector-icons/Fontisto'
import Input from '../Input/Input';
import Helper from '../../utils/Helper';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddTempleteModal({ 
    modalVisible,
    onSuccess
 }) {
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [type, setType] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    

    async function addData(){
        setIsLoading(true)
        const respones = await request.PostRequestWithAuthentication(
            api.addTempleteAPI(),
            payload.addTempletePayload(title, subject, type,content)
        )
        console.log(respones)
        setIsLoading(false)
        if(respones.success){
            onSuccess()
        }
        else{
            if(respones.hasOwnProperty('error')){
              setErrors(respones.error)
            }
            else{
              if(respones.hasOwnProperty('message')){
                Helper.showToast(respones.message)
              }
              else{
                Helper.showToast('Something went wrong')
              }
            }
          }
    }
    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <ScrollView>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{'Add Templete'}</Text>
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
                <Text style={styles.inputTitle}>{'Title'}</Text>
               <Input 
                    placeholder={'Title'}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
               />
               {errors.filter(el => el.field == 'title').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'title')[0].message}
              </Text>
            ) : null}
               <Text style={[styles.inputTitle,{
                   marginTop:16
               }]}>{'Subject'}</Text>
               <Input 
                    placeholder={'Subject'}
                    value={subject}
                    onChangeText={(text) => setSubject(text)}
               />
               {errors.filter(el => el.field == 'subject').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'subject')[0].message}
              </Text>
            ) : null}
               <Text style={[styles.inputTitle,{
                   marginTop:16
               }]}>{'Content'}</Text>
               <Input 
                    placeholder={'Content'}
                    value={content}
                    onChangeText={(text) => setContent(text)}
               />
               {errors.filter(el => el.field == 'content').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'content')[0].message}
              </Text>
            ) : null}
               <Text style={[styles.inputTitle,{
                   marginTop:16
               }]}>{'Type'}</Text>
                <TouchableOpacity 
                    onPress={() => setType('email')}
                    style={styles.optionRow}>
                        <View style={styles.round}>
                            { type == 'email' && <View style={styles.roundChild} /> }
                        </View>
                        <Text style={styles.text}>
                            {'Email'}
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setType('sms')}
                    style={styles.optionRow}>
                        <View style={styles.round}>
                            { type == 'sms' && <View style={styles.roundChild} /> }
                        </View>
                        <Text style={styles.text}>
                            {'Text Message'}
                        </Text>
                </TouchableOpacity>
                {errors.filter(el => el.field == 'type').length > 0 ? (
              <Text style={styles.error}>
                {errors.filter(el => el.field == 'type')[0].message}
              </Text>
            ) : null}
                <TouchableOpacity
                    disabled={isLoading}
                    onPress={() => addData()}
                    activeOpacity={0.8}>
                    <LinearGradient
                        colors={[Colors.primary, '#3b5998', '#192f6a']}
                        style={styles.linearGradient}>
                    {isLoading ? <ActivityIndicator size={'small'} color={'white'}/> : <Text style={styles.buttonText}>Add</Text>}
                    </LinearGradient>
                </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalView:{
        minHeight:'60%',
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
        paddingHorizontal:16,
        marginTop:4,
        flexDirection:'row',
    },
    title:{
        fontSize:16,
        fontFamily:Fonts.semiBold,
        color:Colors.black
    },
    closeButton:{
        height:25,
        width: 25,
        borderRadius:12.5,
        backgroundColor:Colors.gray,
        alignItems:'center',
        justifyContent:'center'
    },
    itemContainer:{
        height:40,
        width: '80%',
        alignSelf:'center',
        borderWidth:1,
        borderColor:Colors.primary,
        marginTop:12,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    },
    itemName:{
        fontSize:16,
        fontFamily:Fonts.semiBold,
        color:Colors.black
    },
    inputTitle:{
        fontFamily:Fonts.regular,
        marginHorizontal:16,
        color:Colors.primary
    },
    optionRow:{
        flexDirection:'row',
        marginTop:12,
        alignItems: 'center',
        marginHorizontal:16
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
    marginVertical: 48,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#ffffff',
  },
  error: {
    fontFamily: Fonts.regular,
    color: 'red',
    marginTop: 5,
    marginHorizontal: 18,
  },
})