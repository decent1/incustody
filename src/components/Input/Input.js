import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'

export default function Input({
    leftComponent,
    rightComponent,
    style,
    placeholder='Email Address',
    value='',
    onChangeText=()=>{},
    secureTextEntry=false,
    keyboardType,
    placeholderTextColor,
    multiline,
    numberOfLines,
    editable,
}){
    return(
        <View style={[styles.container,{
            ...style
        }]}>
            {leftComponent ? leftComponent : null}
            <TextInput 
                editable={editable}
                secureTextEntry={secureTextEntry}
                onChangeText={(text)=>onChangeText(text)}
                value={value}
                style={[styles.input,{
                    marginLeft:leftComponent ? 20 : 0
                }]}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor={placeholderTextColor}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            {rightComponent ? rightComponent : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:40,
        marginHorizontal:16,
        borderBottomWidth:0.5,
        borderColor:Colors.black,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row'
    },
    image:{
        width:27,
        height:16
    },
    countryCode:{
        fontSize:14,
        fontFamily:Fonts.regular,
        color:'#707070',
        marginLeft:12,
    },
    countryCodeContainer:{
        flexDirection:'row',
    },
    input:{
        flex:1,
        fontFamily:Fonts.regular,
        color:Colors.black,
        
    }
})