import React,{useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native'
import { Colors } from '../../utils/Colors';
import { commonStyles } from '../../utils/commonStyles';
import * as api from '../../networking/api'
import * as request from '../../networking/request'
import { Fonts } from '../../utils/Fonts';
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function CityModal({ 
    modalVisible,
    onSelect
 }) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        async function get(){
            setIsLoading(true)
            const respones = await request.GetRequestWithAuthentication(api.GetCitiesAPI())
            console.log(respones)
            setIsLoading(false)
            if(respones.success){
                setData(respones.data.data)
            }
        }
        get()
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{'Select City'}</Text>
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
                {
                    isLoading && <ActivityIndicator 
                        size={'small'}
                        style={{marginTop:20}}
                        color={Colors.primary}
                    />
                }
                <FlatList 
                    data={data}
                    renderItem={({item}) => {
                        return <TouchableOpacity 
                        onPress={() => onSelect(item)}
                        style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableOpacity>
                    }}
                />
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
        height:'60%',
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
        marginTop:12,
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
    }
})