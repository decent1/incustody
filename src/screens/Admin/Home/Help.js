import { StyleSheet, Text, View ,ScrollView,Image,TouchableOpacity} from 'react-native'
import React ,{useState,useRef}from 'react'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts';
import { Colors } from '../../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ImagePath } from '../../../utils/imagePath';
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import Header from '../../../components/Header/Header';

const Help = ({navigation}) => {
    const [display1, setDisplay1] = useState(false)
    const [display2, setDisplay2] = useState(false)
    const [display3, setDisplay3] = useState(false)
    const _drawer = useRef(null);

    const closeControlPanel = () => {
      _drawer.current.close()
    };
    const openControlPanel = () => {
      _drawer.current.open()
    };
  return (
    <Drawer
        ref={_drawer}
        content={
          <AdminDrawer
            selected={'overview'}
            onClose={() => closeControlPanel()}
            navigation={navigation}
          />
        }
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={{
          drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
          main: {paddingLeft: 3},
        }}
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2},
        })}>
    <View style={commonStyles.container}>
      <ScrollView>
      <TouchableOpacity onPress={openControlPanel}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginHorizontal: 12,
                marginTop: 8,
              }}
              source={ImagePath.drawerIcon}
            />
          </TouchableOpacity>
        <Header onProfilePress={() => navigation.navigate('AccountSettings')} />
        <Text style={styles.des}>{'Admin/ Help'}</Text>
          <Text style={styles.title}>{'Help'}</Text>
        <View style={styles.mainView}>
          
          <View style={styles.helpContainer}>
            <View style={styles.helpFlex}>
              <Text style={styles.helpTitle}>
                {'How to create a new matter?'}
              </Text>
              {display1 === true ? (
                <AntDesign
                  onPress={() => {
                    setDisplay1(!display1);
                  }}
                  name="minuscircleo"
                  size={20}
                />
              ) : (
                <AntDesign
                  onPress={() => {
                    setDisplay1(!display1);
                  }}
                  name="pluscircleo"
                  size={20}
                />
              )}
            </View>
            {display1 && (
              <Text>
                Creating a new matter is very straight forward. You simply need
                to click on create a new matter button and input details as
                needed. Creating a new matter is very straight forward. You
                simply need to click on create a new matter button.
              </Text>
            )}
          </View>
          <View style={styles.helpContainer}>
            <View style={styles.helpFlex}>
              <Text style={styles.helpTitle}>
                {'How to create a new matter?'}
              </Text>
              {display2 === true ? (
                <AntDesign
                  onPress={() => {
                    setDisplay2(!display2);
                  }}
                  name="minuscircleo"
                  size={20}
                />
              ) : (
                <AntDesign
                  onPress={() => {
                    setDisplay2(!display2);
                  }}
                  name="pluscircleo"
                  size={20}
                />
              )}
            </View>
            {display2 && (
              <Text>
                Creating a new matter is very straight forward. You simply need
                to click on create a new matter button and input details as
                needed. Creating a new matter is very straight forward. You
                simply need to click on create a new matter button.
              </Text>
            )}
          </View>
          <View style={styles.helpContainer}>
            <View style={styles.helpFlex}>
              <Text style={styles.helpTitle}>
                {'How to create a new matter?'}
              </Text>
              {display3 === true ? (
                <AntDesign
                  onPress={() => {
                    setDisplay3(!display3);
                  }}
                  name="minuscircleo"
                  size={20}
                />
              ) : (
                <AntDesign
                  onPress={() => {
                    setDisplay3(!display3);
                  }}
                  name="pluscircleo"
                  size={20}
                />
              )}
            </View>
            {display3 && (
              <Text style={{
                color:'#606060',
              fontFamily:Fonts.regular
              }}>
                Creating a new matter is very straight forward. You simply need
                to click on create a new matter button and input details as
                needed. Creating a new matter is very straight forward. You
                simply need to click on create a new matter button.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
    </Drawer>
  );
}

export default Help

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 16,
  },
  des: {
    fontFamily: Fonts.regular,
    marginHorizontal: 16,
    marginTop: 16,
    color: '#798593',
  },
  title: {
    fontFamily: Fonts.medium,
    marginHorizontal: 16,
    fontSize: 16,
    marginTop: 8,
    color: '#3E3F42',
  },
  helpContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginTop: 10,
  },
  helpTitle: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    color: Colors.darkBlue,
  },
  helpFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});