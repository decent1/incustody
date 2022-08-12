import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { commonStyles } from '../../utils/commonStyles'
import { Fonts } from '../../utils/Fonts'
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function AccountTypeModal({
    accountTypes=[],
    onSelect=()=>{},
    modalVisible=()=>{}
}){
    return <View style={styles.container}>
        <View style={styles.modalView}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Select Account Type</Text>
                <TouchableOpacity 
                onPress={() => modalVisible()}
                style={styles.closeButton}>
                    <Fontisto 
                        color={Colors.white}
                        name="close-a"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                {
                    accountTypes.map((accountType, index) => {
                        return <TouchableOpacity 
                        onPress={() => onSelect(accountType.name)}
                        key={index} style={styles.accountType}>
                            <Text style={styles.accountTypeText}>{accountType.name}</Text>
                        </TouchableOpacity>
                    })
                }
                </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modalView:{
        width:'80%',
        height:270,
        borderRadius:10,
        padding:16,
        backgroundColor:Colors.white,
        ...commonStyles.shadow
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    headerText:{
        fontFamily:Fonts.semiBold,
        color:Colors.black,
        fontSize:16
    },
    body:{
        width:'100%',
        marginTop:16,
        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    accountType:{
        height:44,
        width: '100%',
        borderRadius:8,
        borderWidth:1,
        borderColor:Colors.primary,
        marginTop:12,
        alignItems:'center',
        justifyContent:'center'
    },
    accountTypeText:{
        color:Colors.primary,
        fontFamily:Fonts.semiBold,
        
    },
    closeButton:{
        height:25,
        width: 25,
        borderRadius:12.5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'gray'
    }

})