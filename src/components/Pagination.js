import { StyleSheet, Text, TextInput, View } from 'react-native'
import React ,{useState} from 'react'
import { commonStyles } from '../utils/commonStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Fonts } from '../utils/Fonts'
import { Colors } from '../utils/Colors'

const Pagination = () => {
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    // let decrementCounter = () => setCounter(counter - 1);
    const decrementCounter = () => {
        if(counter <= 1) {
          return;
        } else {
            setCounter(counter - 1);
        }
      }
    
  return (
      <View style={styles.Pagination}>
        <MaterialIcons name="arrow-left" size={40} style={styles.icon} onPress={decrementCounter} />
        <Text style={styles.num}>{counter}</Text>
        <Text style={styles.outOf}>Of 300</Text>
        <MaterialIcons name="arrow-right" size={40} style={styles.icon} onPress={incrementCounter} />
      </View>
  );
}

export default Pagination

const styles = StyleSheet.create({
  Pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop:'20%',
    marginBottom:20
  },
  num: {
    borderWidth: 1,
    borderRadius: 6,
    textAlign: 'center',
    fontFamily: Fonts.regular,
    color: Colors.primary,
    marginTop: '10%',
    padding:10,
    fontSize:14,
    borderColor:Colors.gray,
    width:50
  },
  outOf: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: '13%',
    marginLeft: 10,
  },
  icon: {
    marginTop: '10%',
  },
 
});