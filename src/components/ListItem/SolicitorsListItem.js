import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { commonStyles } from '../../utils/commonStyles'
import { Fonts } from '../../utils/Fonts'
import { ImagePath } from '../../utils/imagePath'
ImagePath

export default function SolicitorListItem({
    item,
    navigation,
    text = '',
}){
    return <TouchableOpacity 
    onPress={() => {
        navigation.navigate('UpdateSolicitor', {
            item: item,
            text: text,
        })
    }}
    style={styles.container}>
        <View style={styles.nameContainer}>
            <View style={styles.profilePic}>
            <Text style={styles.profileShortName}>{`${item.first_name.slice(0,1)}${item.last_name.slice(0,1)}`}</Text>
            </View>
            <Text style={styles.nameText}>{`${item?.first_name} ${item?.last_name}`}</Text>
        </View>
        <Text style={styles.title}>{'Firm'}</Text>
        <Text style={styles.des}>{text == 'Solicitor' ? item?.firm?.name : item?.agency?.agency_name}</Text>
        <View style={styles.hr}/>
        
        <Text style={styles.title}>{'Email'}</Text>
        <Text style={styles.des}>{`${item.email}`}</Text>
        <View style={styles.hr}/>

        <Text style={styles.title}>{'Mobile No'}</Text>
        <Text style={styles.des}>{`${item.phone}`}</Text>
        <View style={styles.hr}/>

        <Text style={styles.title}>{'Account Status'}</Text>
        <View style={[styles.statusButton,{
            backgroundColor: item.status === 'active' ? 'rgba(113, 180, 35, 0.2)' : 'rgba(242, 0, 0, 0.1)'
        }]}>
            <Text style={[styles.statusText,{
                color: item.status === 'active' ? '#62971A' : '#F20000'
            }]}>{item.status != null ? item.status : 'inactive'}</Text>
        </View>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:16,
        backgroundColor:Colors.appBackgroundColor,
        ...commonStyles.shadow,
        borderRadius:4,
        marginTop:12,
        padding:12
    },
    nameContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    profilePic:{
        height:48,
        width: 48,
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:24
    },
    nameText:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        fontSize:16,
        marginLeft:12
    },
    title:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        marginTop:8
    },
    des:{
        fontFamily:Fonts.regular,
        color:'#606060', 
        marginTop:4  
    },
    hr:{
        width:'100%',
        height:1,
        backgroundColor:'rgba(121, 133, 147, 0.5)',
        marginTop:4,
    },
    statusButton:{
        
        height:24,
        width:80,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        marginTop:4
    },
    statusText:{
        fontFamily:Fonts.regular,
        fontSize:12,
    },
    profileShortName:{
        fontFamily:Fonts.regular,
        color:Colors.white,
        fontSize:18
      }
})