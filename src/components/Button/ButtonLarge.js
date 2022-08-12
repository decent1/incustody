import React from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'

export default function ButtonLarge({
    style,
    title,
    textStyle,
    onPress=() => {},
}){
    return <TouchableOpacity 
    onPress={() => onPress()}
    style={[styles.container,{
        ...style
    }]}>
        <Text style={[styles.title,{
            ...textStyle
        }]}>{title ? title : 'DONE'}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        height:44,
        marginHorizontal:16,
        borderRadius:30,
        backgroundColor:Colors.white,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        width:'100%',
    },
    title:{
        fontSize:16,
        fontFamily:Fonts.medium,
        color:Colors.black,
    }
})