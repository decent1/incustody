import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState,useRef} from 'react';
import {commonStyles} from '../../../utils/commonStyles';
import {Fonts} from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { ImagePath } from '../../../utils/imagePath';
import Drawer from 'react-native-drawer'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import Header from '../../../components/Header/Header';

const InvoiceDetail = ({navigation}) => {
  const [invoice, setInvoice] = useState([
    {
      id: 1,
      line: 1,
      description: 'Attendence at Hatified for jamel on 21',
    },
    {
      id: 2,
      line: 2,
      description: 'Disbursement - Mileage - 26.6',
    },
  ]);
  const [invoiceDetail, setInvoiceDetail] = useState([
    {
      id: 1,
      InvNo: 1234,
      MatterNo: 1394,
      For: 'Mohammed Po',
      Total: 118.0,
      Status: 'Status',
      InvDate: '24/10/2020',
      Client: 'Carson Kaye Solicitors',
      At: 'Brixton',
      DueDate: '23/11/2020',
      Status: 'Due',
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
            <Text style={styles.des}>{'Admin/ Invoices'}</Text>
            <Text style={styles.title}>{'Invoices'}</Text>
            <View style={styles.Box}>
              <Text style={styles.title}>Invoice Details</Text>
              <View style={styles.invoiceBox}>
                <Text style={styles.caption}>In Custody Limited</Text>
                <Text style={styles.Heading}>Invoice</Text>
                <Text style={styles.txt}>Account Payable</Text>
                <Text style={styles.txt}>Carson kaye Solicitors</Text>
                <Text style={styles.txt}>
                  154-160 Fleet Street,London,EC4A 2DQ
                </Text>
              </View>
              <View>
                {invoice && (
                  <View style={styles.inoviceTableContainer}>
                    <View style={styles.table}>
                      <View style={styles.line}>
                        <Text
                          style={[
                            styles.linetxt,
                            {
                              color: Colors.black,
                              fontFamily: Fonts.semiBold,
                              fontSize: 13,
                            },
                          ]}>
                          Line
                        </Text>
                      </View>
                      <View style={styles.description}>
                        <Text
                          style={[
                            styles.descriptionTxt,
                            {
                              color: Colors.black,
                              fontFamily: Fonts.semiBold,
                              fontSize: 13,
                            },
                          ]}>
                          Description
                        </Text>
                      </View>
                    </View>
                    {invoice.map((value, index) => {
                      return (
                        <View key={index} style={styles.table}>
                          <View style={styles.line}>
                            <Text style={styles.linetxt}>{value.line}</Text>
                          </View>
                          <View style={styles.description}>
                            <Text style={styles.descriptionTxt}>
                              {value.description}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
              <Text style={styles.terms}>Payment & Terms</Text>
              <Text>Unless otherwise stated or agreed payment terms</Text>
              <Text style={styles.txtOne}>
                Payment by transfer :
                <Text
                  style={{
                    color: '#798593',
                    fontSize: 14,
                    fontFamily: Fonts.regular,
                  }}>
                  {''} If you wish to pay electronically
                </Text>
              </Text>
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.txtOne}>
                  Bank :
                  <Text
                    style={{
                      color: '#798593',
                      fontSize: 14,
                      fontFamily: Fonts.regular,
                    }}>
                    {''} Santander
                  </Text>
                </Text>
                <Text style={styles.txtOne}>
                  Account Name :
                  <Text
                    style={{
                      color: '#798593',
                      fontSize: 14,
                      fontFamily: Fonts.regular,
                    }}>
                    {''} In Custody LTD
                  </Text>
                </Text>
                <Text style={styles.txtOne}>
                  Sort Code :
                  <Text
                    style={{
                      color: '#798593',
                      fontSize: 14,
                      fontFamily: Fonts.regular,
                    }}>
                    {''} 09-01-29
                  </Text>
                </Text>
                <Text style={styles.txtOne}>
                  Acount Number :
                  <Text
                    style={{
                      color: '#798593',
                      fontSize: 14,
                      fontFamily: Fonts.regular,
                    }}>
                    {''} 3555434343
                  </Text>
                </Text>
              </View>
              <Text style={styles.txtOne}>
                Payment by Cheque :
                <Text
                  style={{
                    color: '#798593',
                    fontSize: 14,
                    fontFamily: Fonts.regular,
                  }}>
                  {''} Please make cheques payable to
                </Text>
              </Text>
              {/* //Invoice detail */}
              {invoiceDetail.map((value, index) => {
                console.log(value);
                return (
                  <View key={index} style={styles.invoiceContainer}>
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
                  </View>
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('PoliceStation')}
            activeOpacity={0.8}>
            <LinearGradient
              colors={[Colors.primary, '#3b5998', '#192f6a']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>{'Update as Cleared'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Drawer>
  );
};

export default InvoiceDetail;

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
  Box: {
    padding: 12,
    borderRadius: 5,
    marginTop: '10%',
    ...commonStyles.shadow,
  },
  invoiceBox: {
    margin: 10,
  },
  caption: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  Heading: {
    fontSize: 40,
    fontFamily: Fonts.semiBold,
    color: Colors.black,
  },
  txt: {
    color: Colors.black,
  },
  table: {
    flexDirection: 'row',
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 5,
    width: 40,
  },
  description: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 5,
    flex: 1,
  },
  inoviceTableContainer: {
    marginTop: 20,
  },
  linetxt: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  descriptionTxt: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  terms: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.black,
    marginTop: 20,
  },

  invoiceContainer: {
    padding: 15,
  },
  invoiceFlexTxt: {
    flexDirection: 'row',
  },
  key: {
    fontSize: 14,
    color: '#9E9FA5',
    fontFamily: Fonts.regular,
  },
  value: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: Fonts.medium,
  },
  RightContainer: {
    flex: 1,
  },
  LeftContainer: {
    flex: 1,
  },
  smallBtn: {
    width: 73,
    borderRadius: 5,
    padding: 5,
    ...commonStyles.shadow,
    backgroundColor: '#D3D3D3',
  },
  txtOne: {
    color: Colors.black,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginTop: 10,
  },
  linearGradient: {
    height: 44,
    marginHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    marginBottom: 64,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: '#ffffff',
  },
});
