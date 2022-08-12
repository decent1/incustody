import { StyleSheet, Text, TouchableOpacity, View, ScrollView,Image } from 'react-native'
import React,{useState,useRef} from 'react'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts'
import { Colors } from '../../../utils/Colors'
import { ImagePath } from '../../../utils/imagePath';
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import Header from '../../../components/Header/Header'

const JoiningRequest3 = ({navigation}) => {
    const [invoiceDetail, setInvoiceDetail] = useState([
      {
        id: 1,
        Name: 'Kendall',
        Role: 'Solicitor',
        FirmName: 'Alizeh khan',
        Email: 'abc2gmailc.com',
        MobileNo: '123445 44',
        go: 'Help',
        Status: 'CLEARED',
      },
      {
        id: 2,
        Name: 'Kendall',
        Role: 'Solicitor',
        FirmName: 'Alizeh khan',
        Email: 'abc2gmailc.com',
        MobileNo: '123445 44',
        go: 'ActivityLog',
        Status: 'PENDING',
      },
    ]);
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
          <TouchableOpacity onPress={openControlPanel} style={{}}>
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
          <Header
            onProfilePress={() => navigation.navigate('AccountSettings')}
          />
          <View style={styles.mainView}>
            <Text style={styles.des}>{'Admin / Invoices'}</Text>
            <Text style={styles.title}>{'Joining Requests'}</Text>
            {invoiceDetail.map((value, index) => {
              console.log(value);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(value.go)}
                  activeOpacity={0.8}
                  key={index}
                  style={styles.invoiceContainer}>
                  <View style={styles.invoiceFlexTxt}>
                    <View style={styles.LeftContainer}>
                      <Text style={styles.key}>Name</Text>
                      <Text style={styles.value}>{value.Name}</Text>
                    </View>
                    <View style={styles.RightContainer}>
                      <Text style={styles.key}>Role</Text>
                      <Text style={styles.value}>{value.Role}</Text>
                    </View>
                  </View>
                  <View style={styles.invoiceFlexTxt}>
                    <View style={styles.LeftContainer}>
                      <Text style={styles.key}>Firm's Name</Text>
                      <Text style={styles.value}>{value.FirmName}</Text>
                    </View>
                    <View style={styles.RightContainer}>
                      <Text style={styles.key}>Email</Text>
                      <Text style={styles.value}>{value.Email}</Text>
                    </View>
                  </View>
                  <View style={styles.invoiceFlexTxt}>
                    <View style={styles.LeftContainer}>
                      <Text style={styles.key}>Mobile No</Text>
                      <Text style={styles.value}>{value.MobileNo}</Text>
                    </View>
                  </View>
                  <View style={styles.invoiceFlexTxt}>
                    <View style={styles.LeftContainer}>
                      <Text style={styles.key}>Status</Text>
                      <TouchableOpacity
                        style={[
                          styles.smallBtn,
                          {
                            backgroundColor:
                              value.Status === 'PENDING'
                                ? '#FF6666'
                                : Colors.gray,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.value,
                            {
                              color:
                                value.Status === 'CLEARED' ? 'green' : 'red',
                              textAlign: 'center',
                              marginTop: 3,
                            },
                          ]}>
                          {value.Status}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Drawer>
  );
}

export default JoiningRequest3

const styles = StyleSheet.create({
    mainView: {
      marginHorizontal: 16,
    },
    des: {
      fontFamily: Fonts.regular,
      marginTop: 16,
      color: '#798593',
    },
    title: {
      fontFamily: Fonts.medium,
      fontSize: 16,
      marginTop: 8,
      color: '#3E3F42',
    },
    invoiceContainer: {
      borderRadius: 10,
      padding:15,
      ...commonStyles.shadow,
      marginBottom:10
    },
    invoiceFlexTxt: {
      flexDirection: 'row',
  
    },
    key: {
      fontSize: 14,
      color: '#9E9FA5',
      fontFamily:Fonts.regular,
     
    },
    value: {
      fontSize: 12,
      color: Colors.black,
      fontFamily:Fonts.medium, 
    },
  RightContainer:{
      flex:1
  },
  LeftContainer:{
      flex:1
  },
  smallBtn:{
      width:73,
      borderRadius:5,
      padding:5,
      ...commonStyles.shadow,
      backgroundColor:'#D3D3D3'
  }
  });