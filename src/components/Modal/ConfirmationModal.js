import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'

export default function ConfirmationModal({
    onYes,
    modalVisible,
}){
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={() => onYes()}
                style={styles.button}>
                    <Text style={styles.buttonText}>{'YES'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
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
    }
})