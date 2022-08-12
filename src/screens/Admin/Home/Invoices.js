import { StyleSheet, Text, TouchableOpacity, View, ScrollView ,Image} from 'react-native'
import React,{useState,useRef} from 'react'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { ImagePath } from '../../../utils/imagePath';
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import Header from '../../../components/Header/Header'

const Invoices = ({navigation}) => {
    const [invoiceDetail, setInvoiceDetail] = useState([
        {
            id:1,
            InvNo:1234,
            MatterNo:1394,
            For:'Mohammed Po',
            Total:118.00,
            Status:'Status',
            InvDate:'24/10/2020',
            Client:'Carson Kaye Solicitors',
            At:'Brixton',
            DueDate:'23/11/2020',
            Status:'CLEARED'
        },
        {
            id:2,
            InvNo:1234,
            MatterNo:1394,
            For:'Mohammed Po',
            Total:118.00,
            Status:'Status',
            InvDate:'24/10/2020',
            Client:'Carson Kaye Solicitors',
            At:'Brixton',
            DueDate:'23/11/2020',
            Status:'CLEARED'
        }
    ])
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
      <Header onProfilePress={()=>navigation.navigate('AccountSettings')} />
        <View style={styles.mainView}>
          <Text style={styles.des}>{'Admin / Invoices'}</Text>
          <Text style={styles.title}>{'Invoices'}</Text>
          {invoiceDetail.map((value, index) => {
            console.log(value);
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('InvoiceDetail')}
                activeOpacity={0.8}
                key={index}
                style={styles.invoiceContainer}>
                <View style={styles.invoiceFlexTxt}>
                  <View style={styles.LeftContainer}>
                    <Text style={styles.key}>InvNo</Text>
                    <Text style={styles.value}>{value.InvNo}</Text>
                  </View>
                  <View style={styles.RightContainer}>
                    <Text style={styles.key}>InvDate</Text>
                    <Text style={styles.value}>{value.InvDate}</Text>
                  </View>
                </View>
                <View style={styles.invoiceFlexTxt}>
                  <View style={styles.LeftContainer}>
                    <Text style={styles.key}>MatterNo</Text>
                    <Text style={styles.value}>{value.MatterNo}</Text>
                  </View>
                  <View style={styles.RightContainer}>
                    <Text style={styles.key}>Client</Text>
                    <Text style={styles.value}>{value.Client}</Text>
                  </View>
                </View>
                <View style={styles.invoiceFlexTxt}>
                  <View style={styles.LeftContainer}>
                    <Text style={styles.key}>For</Text>
                    <Text style={styles.value}>{value.For}</Text>
                  </View>
                  <View style={styles.RightContainer}>
                    <Text style={styles.key}>At</Text>
                    <Text style={styles.value}>{value.At}</Text>
                  </View>
                </View>
                <View style={styles.invoiceFlexTxt}>
                  <View style={styles.LeftContainer}>
                    <Text style={styles.key}>Total</Text>
                    <Text style={styles.value}>{value.Total}</Text>
                  </View>
                  <View style={styles.RightContainer}>
                    <Text style={styles.key}>DueDate</Text>
                    <Text style={styles.value}>{value.DueDate}</Text>
                  </View>
                </View>
                <View style={styles.invoiceFlexTxt}>
                  <View style={styles.LeftContainer}>
                    <Text style={styles.key}>Status</Text>
                    <TouchableOpacity style={styles.smallBtn}>
                      <Text
                        style={[
                          styles.value,
                          {
                            color: value.Status === 'CLEARED' ? 'green' : 'red',
                            textAlign: 'center',
                            marginTop: 3,
                          },
                        ]}>
                        Clear
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

export default Invoices

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