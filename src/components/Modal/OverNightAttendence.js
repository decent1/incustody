import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../utils/Colors'
import { Fonts } from '../../utils/Fonts'
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const OverNightAttendence = ({modalVisible}) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>Overnight attendance charge</Text>
          <AntDesign
            onPress={() => modalVisible()}
            name="closecircleo"
            size={20}
            color={Colors.gray}
            style={{marginLeft: 10}}
          />
        </View>
        <Text style={styles.txt}>OVERNIGHT ATTENDANCE CHARGE</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#E2E5ED',
            height: 40,
            color: Colors.black,
            padding: 10,
            marginTop: 10,
          }}
          placeholder="120"
          placeholderTextColor={Colors.black}
        />
        <TouchableOpacity>
          <LinearGradient
            colors={[Colors.primary, '#3b5998', '#192f6a']}
            style={styles.newMatter}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Fonts.semiBold,
                color: '#ffffff',
              }}>
              Update Value
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OverNightAttendence

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEDF3',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#001328',
    fontSize: 16,
  },
  txt: {
    color: '#9EA0A5',
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 10,
  },
  newMatter:{
    borderColor:Colors.primary,
    borderRadius:5,
    marginHorizontal:16,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'10%'
  }
});