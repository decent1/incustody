import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import {commonStyles} from '../../utils/commonStyles';
import { ImagePath } from '../../utils/imagePath';
import {useSelector} from 'react-redux'

const Header = ({onProfilePress = () => {}}) => {
  const user = useSelector(state => state.user)
  return (
    <View style={styles.topHeader}>
      <View style={styles.profileNameContainer}>
        <TouchableOpacity 
          style={styles.profileContainer}
          onPress={() => onProfilePress()}>
            <Text style={styles.profileShortName}>{`${user.first_name.slice(0,1)}${user.last_name.slice(0,1)}`}</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{`${user.first_name} ${user.last_name}`}</Text>
      </View>
      <View style={styles.accountTypeContainer}>
          <Text style={styles.accountTypeText}>
            {user.user_type}
          </Text>
      </View>
    </View>
  );
};

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
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.primary
    },
    accountTypeContainer:{
        height:40,
        backgroundColor:Colors.appBackgroundColor,
        borderRadius:5,
        borderColor:Colors.black,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
        ...commonStyles.shadow
    },
    accountTypeText:{
        marginHorizontal:16,
        fontSize:16,
        color:'#3E3F42',
        fontFamily:Fonts.regular
    },
    profileNameContainer:{
      flexDirection:'row',
      alignItems:'center'
    },
    name:{
      fontFamily:Fonts.regular,
      color:Colors.black,
      marginLeft:12
    },
    profileShortName:{
      fontFamily:Fonts.regular,
      color:Colors.white,
      fontSize:16
    }
})