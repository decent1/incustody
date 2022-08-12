import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import {ImagePath} from '../../utils/imagePath';
import react from 'react';

const PopUp = ({modalVisible, popMessage ,successFullMessage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <AntDesign
            onPress={() => {
              modalVisible();
            }}
            name="closecircleo"
            size={20}
            color={Colors.gray}
          />
        </View>
        {popMessage === 'updated' ? (
          <>
            <View style={styles.circle}>
              <View style={styles.checkBox}>
                <AntDesign name="check" size={20} style={styles.check} />
              </View>
            </View>
            <Text style={styles.title}>{'This Matter has been updated'}</Text>
          </>
        ) : null}
        {popMessage === 'removed' ? (
          <>
            <View style={styles.circle}>
              <View style={styles.checkBoxCross}>
                <Entypo name="cross" size={20} style={styles.cross} />
              </View>
            </View>
            <Text style={styles.title}>{'This Matter has been Removed'}</Text>
          </>
        ) : null}

        {
          successFullMessage === 'profile'?
          <>
            <View style={styles.circle}>
            <View style={styles.checkBox}>
                <AntDesign name="check" size={20} style={styles.check} />
              </View>
            </View>
            <Text style={styles.title}>{'Profile Updated Successfully'}</Text>
          </>
          : null
        }
        {
          successFullMessage === 'password'?
          <>
            <View style={styles.circle}>
            <View style={styles.checkBox}>
                <AntDesign name="check" size={20} style={styles.check} />
              </View>
            </View>
            <Text style={styles.title}>{'Password Updated Successfully'}</Text>
          </>
          : null

        }
      </View>
    </View>
  );
};

export default PopUp;

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
    width: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  title: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  circle: {
    backgroundColor: '#C9C8CE',
    width: 45,
    height: 45,
    borderRadius: 100,
    alignSelf: 'center',
  },
  checkBox: {
    width: 30,
    height: 30,
    backgroundColor: '#1991D6',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 5,
  },
  check: {
    alignSelf: 'center',
    marginTop: 5,
    color: Colors.white,
  },
  cross: {
    alignSelf: 'center',
    marginTop: 5,
    color: 'red',
  },
  checkBoxCross: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 20,
  },
});
