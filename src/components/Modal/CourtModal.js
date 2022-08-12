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

export default function CourtModal({ 
    modalVisible,
    onSelect
 }) {
    const [isLoading, setIsLoading] = useState(false)
    const [current_page, setCurrent_page]= useState(1)        
    const [last_page, setLast_page]      = useState('')  
    const [per_page, setPer_page]        = useState(5)
    const [data, setData] = useState([])
    async function getData(current_page){
        setIsLoading(true)
        const response = await request.GetRequestWithAuthentication(api.CourtAPI(current_page,per_page))
        console.log(response)
        setIsLoading(false)
        if(response.success){
            setData(data.concat(response.data.data))
            setCurrent_page(response.data.meta.current_page)
            setLast_page(response.data.meta.last_page)
        }
    }
    useEffect(() => {
        getData(current_page)
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{'Select Court'}</Text>
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
                <FlatList 
                ListFooterComponent={
                    <View style={{   }}>
                    {isLoading &&
                        <ActivityIndicator 
                        size={'small'}
                        style={{marginTop:20}}
                        color={Colors.primary}
                    />
                    }
                </View>
                }
                scrollEventThrottle={250}
                onEndReached={info => {
                    if(current_page != last_page){
                        if(!isLoading){
                            getData(current_page + 1)
                        }
                    }
                }}
                data={data}
                onEndReachedThreshold={0.01}
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
        // height:40,
        paddingVertical:12,
        paddingHorizontal:4,
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
        fontFamily:Fonts.regular,
        color:Colors.black
    }
})