import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import countries from '../../data/countries.json'

export default function CountryCodeModal({
    modalVisible,
    onSelect
}){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.modalView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {'Select Country'}
                    </Text>
                    <TouchableOpacity 
                    onPress={() => modalVisible()}
                    style={styles.closeButton}>
                        <AntDesign 
                            size={20}
                            color={Colors.black}
                            name={'close'}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList 
                    data={countries.slice(0,50)}
                    renderItem={({item}) => <TouchableOpacity 
                    onPress={() => onSelect(item)}
                    style={styles.itemContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.codeContainer}>
                            <Text style={styles.code}>{item.callingCodes[0]}</Text>
                            <View style={styles.flagContainer}>
                                <Image 
                                    style={styles.flag}
                                    source={{
                                        uri: item.flags.png
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>}
                    keyExtractor={(item) => item.name}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,   
    },
    modalView:{
        flex:1,
        backgroundColor:Colors.white
    },
    header:{
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    headerText:{
        fontSize:16,
        fontFamily:Fonts.regular,
        color:Colors.black,
    },
    name:{
        fontFamily:Fonts.regular,   
        color:Colors.black,   
    },
    itemContainer:{
        height:40,
        borderBottomWidth:1,
        borderColor:'#e6e6e6',
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    codeContainer:{
        flexDirection:'row',
    },
    flag:{
        width:'100%',
        height:'100%',

    },
    flagContainer:{
        height:20,
        width:30,
    },
    code:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        marginRight:10,
    },
    closeButton:{
        height:50,
        width:50,
        position:'absolute',
        right:0,
        alignItems:'center',
        justifyContent:'center'
    }
})