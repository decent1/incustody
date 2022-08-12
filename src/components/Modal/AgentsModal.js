import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'

import * as api from '../../networking/api'
import * as request from '../../networking/request'
import * as payload from '../../networking/payload'
import Helper from '../../utils/Helper'

export default function AgentsModal({
    item,
    onSelect,
    modalVisible,
    matter_id,
    onSuccess
}){
    const [isLoading, setIsLoading] = useState(false)
    async function AppriveAgent(id){
        setIsLoading(true)
        const response = await request.PutRequestWithAuthentication(
            api.ApproveAgentAPI(matter_id),
            payload.ApproveAgentPayload(id)
        )
        setIsLoading(false)
        if(response.success){
            Helper.showToast('Agent has been approved')
            modalVisible()
            onSuccess()
        }
        else{
            Helper.showToast('Something went wrong')
        }
    }
    return <View style={styles.container}>
        <View style={styles.modalView}>
            <View style={styles.header}>
                <Text style={styles.modalTitle}>{'Select Agent'}</Text>

                <TouchableOpacity 
                onPress={() => modalVisible()}
                style={styles.closeButton}>
                    <Fontisto 
                        name="close-a"
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </View>
            {
                isLoading ?
                <ActivityIndicator 
                    size={'small'}
                    color={Colors.primary}
                    style={{
                        position: 'absolute',
                        ...StyleSheet.absoluteFillObject
                    }}
                />
                :
                null
            }
            <FlatList 
                contentContainerStyle={{paddingBottom:20}}
                data={item}
                renderItem={({item}) => {
                    return <View style={styles.itemContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{'Name'}</Text>
                            <Text style={styles.itemText}>{`${item.user.first_name} ${item.user.last_name}`}</Text>

                            <Text style={[styles.title,{marginTop:8}]}>{'Email'}</Text>
                            <Text style={styles.itemText}>{`${item.user.email}`}</Text>

                            <Text style={[styles.title,{marginTop:8}]}>{'Phone'}</Text>
                            <Text style={styles.itemText}>{item.user.phone != null ? item.user.phone : 'N/A'}</Text>

                            <Text style={[styles.title,{marginTop:8}]}>{'Address'}</Text>
                            <Text style={styles.itemText}>{item.user.address != null ? item.user.address : 'N/A'}</Text>

                            <Text style={[styles.title,{marginTop:8}]}>{'Post Code'}</Text>
                            <Text style={styles.itemText}>{item.user.post_code != null ? item.user.post_code : 'N/A'}</Text>
                            
                        </View>

                        <TouchableOpacity 
                        onPress={() => AppriveAgent(item.user_id)}
                        style={styles.approveButton}>
                            <Text style={styles.approveText}>{'Approve'}</Text>
                        </TouchableOpacity>
                    </View>
                }}
            />
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
        height:'60%',
        borderRadius:12,
        backgroundColor:Colors.white,

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
    itemContainer:{
        paddingVertical:8,
        width: '90%',
        borderRadius:8,
        borderWidth:1,
        borderColor:Colors.primary,
        alignSelf:'center',
        marginTop:16,
        // alignItems:'center',
        paddingHorizontal:12
    },
    itemText:{
        fontFamily:Fonts.regular,
        color:Colors.primary,
        fontSize:12,
    },
    approveButton:{
        height:32,
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:12,
        borderRadius:4,
        alignSelf:'flex-end'
    },
    nameContainer:{
        flex:1,
    },
    approveText:{
        fontFamily:Fonts.regular,
        color:Colors.white
    },
    title:{
        fontFamily:Fonts.regular,
        fontSize:12,
    }
})