import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import { Colors } from '../utils/Colors'
import { Fonts } from '../utils/Fonts'
import { commonStyles } from '../utils/commonStyles'
import Entypo from 'react-native-vector-icons/Entypo'


const Header = (
  {
    onProfilePress=()=>{},
    navigation
  }
) => {
    const [accountType, setAccountType] = React.useState([
      {
        id: 1,
        name: 'Solicitor',
      },
      {
        id: 2,
        name: 'Agent',
      },
    ]);
    const [selectedAccountType, setSelectedAccountType] = React.useState(1)

  return (
    <View style={styles.topHeader}>
      <TouchableOpacity
         onPress={() => onProfilePress()}
        style={styles.profileContainer}>
        <Text style={styles.profileName}>{'JD'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.accountTypeContainer,
          {
            ...commonStyles.shadow,
          },
        ]}>
        <View style={styles.accountTypeChildContainer}>
          <Text style={styles.accountTypeText}>
            {accountType.find(el => el.id == selectedAccountType).name}
          </Text>
        </View>
        <Entypo name={'chevron-down'} size={20} color={'#798593'} />
      </TouchableOpacity>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
    topHeader:{
        height:60,
        marginHorizontal:16,
        marginTop:20,
        backgroundColor:Colors.appBackgroundColor,
        ...commonStyles.shadow,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:16,
        justifyContent:'space-between'
    },
    profileContainer:{
        height:40,
        width: 40,
        borderRadius:20,
        backgroundColor:'#B16EFC',
        alignItems:'center',
        justifyContent:'center'
    },
    profileName:{
        fontFamily:Fonts.regular,
        color:Colors.white
    },
    accountTypeContainer:{
        height:40,
        width:140,
        backgroundColor:Colors.appBackgroundColor,
        borderRadius:5,
        borderColor:Colors.black,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
    },
    accountTypeChildContainer:{
        flex:1,
        justifyContent:'center',
    },
    accountTypeText:{
        marginHorizontal:16,
        fontSize:16,
        color:'#3E3F42',
        fontFamily:Fonts.regular
    },
})