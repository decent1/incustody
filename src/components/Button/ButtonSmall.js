import React from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'

export default function ButtonSmall({
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
        width: 200,
        borderRadius:30,
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    title:{
        fontSize:16,
        fontFamily:Fonts.bold,
        color:Colors.white,
    }
})