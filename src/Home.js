import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from './utils/commonStyles'
import { Colors } from './utils/Colors';

const Home = ({navigation}) => {
  return (
    <View style={commonStyles.container}>
      <View style={{marginHorizontal: 16, marginTop: '20%'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Solicitor')}
          activeOpacity={0.8}
          style={styles.btn}>
          <Text style={styles.txt}>Solicitor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Agent')}
          activeOpacity={0.8}
          style={styles.btn}>
          <Text style={styles.txt}>Agent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Admin')}
          activeOpacity={0.8}
          style={styles.btn}>
          <Text style={styles.txt}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: Colors.primary,
    padding: 10,
    width: '80%',
    marginTop: '10%',
    ...commonStyles.shadow,
  },
  txt: {
    textAlign: 'center',
    color: Colors.darkBlue,
    fontSize: 14,
  },
});