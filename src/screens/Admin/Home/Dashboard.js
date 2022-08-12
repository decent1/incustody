// import React,{useState,useRef} from 'react'
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
//     Image
// } from 'react-native'
// import { Colors } from '../../../utils/Colors'
// import { commonStyles } from '../../../utils/commonStyles'
// import { Fonts } from '../../../utils/Fonts'
// import Entypo from 'react-native-vector-icons/Entypo'
// import LinearGradient from 'react-native-linear-gradient';
// // import Header from '../../../components/Header'
// import { ImagePath } from '../../../utils/imagePath';
// import Drawer from 'react-native-drawer'
// import AdminDrawer from '../../../components/Drawer/AdminDrawer'
// import Header from '../../../components/Header/Header'

// export default function Dashboard({navigation}){
//     const [accountType, setAccountType] = React.useState([
//         {
//             id: 1,
//             name:"Solicitor",
//         },
//         {
//             id: 2,
//             name:"Agent",
//         }
//     ])
//     const [statisticsData, setStatisticsData] = useState([
//         {
//             id:'1',
//             name:'1',
//             value:'10%',
//         },
//         {
//             id:'2',
//             name:'2',
//             value:'8%',
//         },
//         {
//             id:'3',
//             name:'3',
//             value:'12%',
//         },
//         {
//             id:'4',
//             name:'4',
//             value:'17%',
//         },
//         {
//             id:'5',
//             name:'5',
//             value:'17%',
//         },
//         {
//             id:'6',
//             name:'6',
//             value:'27%',
//         },
//         {
//             id:'7',
//             name:'7',
//             value:'10%',
//         },
//         {
//             id:'8',
//             name:'8',
//             value:'8%',
//         },
//         {
//             id:'9',
//             name:'9',
//             value:'22%',
//         },
//         {
//             id:'10',
//             name:'10',
//             value:'7%',
//         },
//         {
//             id:'1',
//             name:'1',
//             value:'10%',
//         },
//         {
//             id:'2',
//             name:'2',
//             value:'8%',
//         },
//         {
//             id:'3',
//             name:'3',
//             value:'22%',
//         },
//         {
//             id:'4',
//             name:'4',
//             value:'7%',
//         },
//         {
//             id:'5',
//             name:'5',
//             value:'15%',
//         },
//         {
//             id:'6',
//             name:'6',
//             value:'17%',
//         },
//         {
//             id:'7',
//             name:'7',
//             value:'35%',
//         },
//         {
//             id:'8',
//             name:'8',
//             value:'8%',
//         },
//         {
//             id:'9',
//             name:'9',
//             value:'12%',
//         },
//         {
//             id:'10',
//             name:'10',
//             value:'50%',
//         },  
//     ])
//     const [selectedAccountType, setSelectedAccountType] = React.useState(1)
//     const [menuItem, setMenuItem] = React.useState([
//         {
//             id:'1',
//             name:"Unassigned Matters",
//             value:"03"
//         },
//         {
//             id:'2',
//             name:"Todays Matters",
//             value:"14",
//         },
//         {
//             id:'3',
//             name:"Total Matter to Date",
//             value:"1256",
//         },
//         {
//             id:'4',
//             name:"Total Matters of this Month",
//             value:"56",
//         }
//     ])
//     const _drawer = useRef(null);

//     const closeControlPanel = () => {
//       _drawer.current.close()
//     };
//     const openControlPanel = () => {
//       _drawer.current.open()
//     };
//     return (
//       <Drawer
//         ref={_drawer}
//         content={
//           <AdminDrawer
//             selected={'overview'}
//             onClose={() => closeControlPanel()}
//             navigation={navigation}
//           />
//         }
//         type="overlay"
//         tapToClose={true}
//         openDrawerOffset={0.2} // 20% gap on the right side of drawer
//         panCloseMask={0.2}
//         closedDrawerOffset={-3}
//         styles={{
//           drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
//           main: {paddingLeft: 3},
//         }}
//         tweenHandler={ratio => ({
//           main: {opacity: (2 - ratio) / 2},
//         })}>
//         <View style={commonStyles.container}>
//           <ScrollView>
//             <TouchableOpacity onPress={openControlPanel} style={{}}>
//               <Image
//                 style={{
//                   height: 30,
//                   width: 30,
//                   marginHorizontal: 12,
//                   marginTop: 8,
//                 }}
//                 source={ImagePath.drawerIcon}
//               />
//             </TouchableOpacity>
//             <Header
//               onProfilePress={() => navigation.navigate('AccountSettings')}
//             />

//             <View style={styles.headerTextContainer}>
//               <Text style={styles.headerTitle}>{'Monthly Overview'}</Text>
//               <View style={styles.countButton}>
//                 <Text style={styles.countText}>{'3'}</Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               style={[
//                 styles.accountTypeContainer,
//                 {
//                   marginHorizontal: 16,
//                   marginTop: 8,
//                   borderWidth: 0.5,
//                   borderColor: '#007AFF',
//                   width: 160,
//                 },
//               ]}>
//               <View style={styles.accountTypeChildContainer}>
//                 <Text
//                   style={[
//                     styles.accountTypeText,
//                     {
//                       fontSize: 12,
//                     },
//                   ]}>
//                   {'February, 2018'}
//                 </Text>
//               </View>
//               <Entypo name={'chevron-down'} size={20} color={'#798593'} />
//             </TouchableOpacity>
//             <View style={styles.statisticsBox}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   height: '100%',
//                   justifyContent: 'space-around',
//                   padding: 20,
//                 }}>
//                 {statisticsData.map((el, index) => {
//                   return (
//                     <View
//                       key={index}
//                       style={{
//                         alignSelf: 'flex-end',
//                       }}>
//                       <View
//                         style={{
//                           height: el.value,
//                           width: 4,
//                           backgroundColor: '#0EBBF4',
//                         }}></View>
//                       <Text
//                         style={{
//                           fontFamily: Fonts.regular,
//                           color: '#9EA0A5',
//                         }}>
//                         {el.name}
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 marginHorizontal: 8,
//                 marginTop: 16,
//               }}>
//               {menuItem.map((el, index) => {
//                 return (
//                   <View
//                     key={index}
//                     activeOpacity={0.8}
//                     style={{width: '50%'}}>
//                     <LinearGradient
//                       colors={[Colors.primary, '#3b5998', '#192f6a']}
//                       style={styles.menuButton}>
//                       <Text
//                         style={{
//                           fontFamily: Fonts.semiBold,
//                           fontSize: 18,
//                           marginHorizontal: 16,
//                           textAlign: 'center',
//                           color: Colors.white,
//                         }}>
//                         {el.name}
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: Fonts.bold,
//                           color: Colors.white,
//                           fontSize: 28,
//                         }}>
//                         {el.value}
//                       </Text>
//                     </LinearGradient>
//                   </View>
//                 );
//               })}
//             </View>
//           </ScrollView>
//         </View>
//       </Drawer>
//     );
// }

// const styles = StyleSheet.create({
//     topHeader:{
//         height:60,
//         marginHorizontal:16,
//         marginTop:20,
//         backgroundColor:Colors.appBackgroundColor,
//         ...commonStyles.shadow,
//         flexDirection:'row',
//         alignItems:'center',
//         paddingHorizontal:16,
//         justifyContent:'space-between'
//     },
//     profileContainer:{
//         height:40,
//         width: 40,
//         borderRadius:20,
//         backgroundColor:'#B16EFC',
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     profileName:{
//         fontFamily:Fonts.regular,
//         color:Colors.white
//     },
//     accountTypeContainer:{
//         height:40,
//         width:140,
//         backgroundColor:Colors.appBackgroundColor,
//         borderRadius:5,
//         borderColor:Colors.black,
//         flexDirection:'row',
//         alignItems:'center',
//         paddingHorizontal:10,
//         flexDirection:'row',
//     },
//     accountTypeChildContainer:{
//         flex:1,
//         justifyContent:'center',
//     },
//     accountTypeText:{
//         marginHorizontal:16,
//         fontSize:16,
//         color:'#3E3F42',
//         fontFamily:Fonts.regular
//     },
//     headerTextContainer:{
//         marginHorizontal:16,
//         marginTop:20,
//         flexDirection:'row',
//         alignItems:'center',
//         justifyContent:'space-between'
//     },
//     headerTitle:{
//         fontSize:18,
//         fontFamily:Fonts.medium,
//         color:'#3E3F42'
//     },
//     countButton:{
//         height:32,
//         width: 32,
//         alignItems:'center',
//         justifyContent:'center',
//         backgroundColor:'#F20000',
//         borderRadius:16,
//     },
//     countText:{
//         fontFamily:Fonts.regular,
//         color:Colors.white,
//         fontSize:16
//     },
//     statisticsBox:{
//         marginHorizontal:16,
//         marginTop:20,
//         height:200,
//         backgroundColor:"#F0F0F0",
//         borderRadius:5,
//         ...commonStyles.shadow,
//     },
//     menuButton:{
//         height:140,
//         margin:8,
//         borderRadius:8,
//         alignItems:'center',
//         justifyContent:'space-between',
//         paddingVertical:16,
//     }
// })

import React,{useState, useRef,useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native'
import { Colors } from '../../../utils/Colors'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import Drawer from 'react-native-drawer'
import { ImagePath } from '../../../utils/imagePath'
import AdminDrawer from '../../../components/Drawer/AdminDrawer'
import Header from '../../../components/Header/Header'
import * as api from '../../../networking/api';
import * as payload from '../../../networking/payload';
import * as request from '../../../networking/request';
import Helper from '../../../utils/Helper'

export default function Dashboard({navigation}){
    const [isLoading, setIsLoading] = useState(false)
    const [month_matters, setMonth_matters] = useState([]);
    const [data, setData] = useState(
      {
        "month_matters_count": 0,
        "today_matters_count": 0,
        "total_matters_count": 0,
        "unassigned_matters_count": 0,
      }
    )
    
    const _drawer = useRef(null);
    const closeControlPanel = () => {
      _drawer.current.close()
    };
    const openControlPanel = () => {
      _drawer.current.open()
    };

    const Dashboard_Data = async () => {
      setIsLoading(true)
      const response = await request.GetRequestWithAuthentication(
        api.DashboardAPI(),
      );
      setIsLoading(false)
      if(response.success) {
        console.log('getAPI dashboard', response.data);
        setData(response.data)  
        setMonth_matters(response.data.month_matters) 
      } else {
        if(response.hasOwnProperty('message')){
          Helper.showToast(response.message)
        }
        else{
          Helper.showToast('Something went wrong')
        }
      }
    };
  
    useEffect(() => {
      Dashboard_Data();
    }, []);

    return (
      <Drawer
        ref={_drawer}
        content={<AdminDrawer 
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
         tweenHandler={(ratio) => ({ main: { opacity:(2-ratio)/2 } })}
        >
        <View style={commonStyles.container}>
          {
            isLoading && <ActivityIndicator 
              size={'small'}
              color={Colors.primary}
              style={styles.indicatorStyle}
            />
          }
          <ScrollView>
            <TouchableOpacity onPress={openControlPanel}>
              <Image style={commonStyles.drawerIconStyle}
                  source={ImagePath.drawerIcon}
              />
            </TouchableOpacity>
      
            <Header onProfilePress={()=>navigation.navigate('AccountSettings')} />

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{'Monthly Overview'}</Text>
            </View>

            <TouchableOpacity
              style={styles.accountTypeContainer}>
              <View style={styles.accountTypeChildContainer}>
                <Text style={styles.accountTypeText}>
                  {`${Helper.getMonth(new Date().getMonth())}, ${new Date().getFullYear()}`}
                </Text>
              </View>
              <Entypo name={'chevron-down'} size={20} color={'#798593'} />
            </TouchableOpacity>

            <View style={styles.statisticsBox}>
              <View style={styles.statisticsContainer}>
                <View style={styles.stateLine}>
                  {
                    [0,1,2,3,4,5,'10+'].reverse().map((item,index) => <Text
                        key={index.toString()}
                        style={styles.stateLineText}>
                          {item}
                        </Text>
                      )
                  }
                </View>
                <ScrollView horizontal
                  style={{marginLeft:10}}>
                  {
                      month_matters.map((el, index) => {
                        return (
                          el.matterCount > 0 && <View key={index}
                            style={{ alignSelf: 'flex-end', marginRight:8 }}>
                            <View style={[styles.statisticsLine,{ height: `${(el.matterCount/6)*100}%`,}]}/>
                            <Text style={styles.statisticsData}>
                              {el.day}
                            </Text>
                          </View>
                        )
                      })
                    }
                </ScrollView>
              </View>
            </View>

            <View style={styles.menuItemContainer}>
                <View activeOpacity={0.8}
                  style={{width: '50%'}}>
                  <LinearGradient style={styles.menuButton}
                    colors={[Colors.primary, '#3b5998', '#192f6a']}>
                    <Text style={styles.menuItemName}>
                      {'Unassigned Matters'}
                    </Text>
                    <Text style={styles.menuItemValue}>
                      {data.unassigned_matters_count}
                    </Text>
                  </LinearGradient>
                </View>
                <View activeOpacity={0.8}
                  style={{width: '50%'}}>
                  <LinearGradient style={styles.menuButton}
                    colors={[Colors.primary, '#3b5998', '#192f6a']}>
                    <Text style={styles.menuItemName}>
                      {'Todays Matters'}
                    </Text>
                    <Text style={styles.menuItemValue}>
                      {data.today_matters_count}
                    </Text>
                  </LinearGradient>
                </View>
                <View activeOpacity={0.8}
                  style={{width: '50%'}}>
                  <LinearGradient style={styles.menuButton}
                    colors={[Colors.primary, '#3b5998', '#192f6a']}>
                    <Text style={styles.menuItemName}>
                      {'Total Matter to Date'}
                    </Text>
                    <Text style={styles.menuItemValue}>
                      {data.total_matters_count}
                    </Text>
                  </LinearGradient>
                </View>
                <View activeOpacity={0.8}
                  style={{width: '50%'}}>
                  <LinearGradient style={styles.menuButton}
                    colors={[Colors.primary, '#3b5998', '#192f6a']}>
                    <Text style={styles.menuItemName}>
                      {'Total Matters of this Month'}
                    </Text>
                    <Text style={styles.menuItemValue}>
                      {data.month_matters_count}
                    </Text>
                  </LinearGradient>
                </View>
            </View>
          </ScrollView>
        </View>
      </Drawer>
    );
}

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
        backgroundColor:Colors.appBackgroundColor,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
        marginHorizontal: 16,
        marginTop: 8,
        borderWidth: 0.5,
        borderColor: '#007AFF',
        width: 160,
    },
    accountTypeChildContainer:{
        flex:1,
        justifyContent:'center',
    },
    accountTypeText:{
        marginHorizontal:16,
        color:'#3E3F42',
        fontFamily:Fonts.regular,
        fontSize: 12,
    },
    headerTextContainer:{
        marginHorizontal:16,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    headerTitle:{
        fontSize:18,
        fontFamily:Fonts.medium,
        color:'#3E3F42'
    },
    statisticsBox:{
        marginHorizontal:16,
        marginTop:20,
        height:200,
        backgroundColor:"#F0F0F0",
        borderRadius:5,
        ...commonStyles.shadow,
    },
    menuButton:{
        height:140,
        margin:8,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:16,
    },
    statisticsContainer:{
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'space-around',
      padding: 20,
    },
    statisticsLine:{
      width: 4,
      backgroundColor: '#0EBBF4',
    },
    statisticsData:{
      fontFamily: Fonts.regular,
      color: Colors.black,
      fontSize:12,
      marginTop:4
    },
    menuItemContainer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 8,
      marginTop: 16,
    },
    menuItemName:{
      fontFamily: Fonts.semiBold,
      fontSize: 18,
      marginHorizontal: 16,
      textAlign: 'center',
      color: Colors.white,
    },
    menuItemValue:{
      fontFamily: Fonts.bold,
      color: Colors.white,
      fontSize: 28,
    },
    indicatorStyle:{
      position:'absolute',
      ...StyleSheet.absoluteFill,
      zIndex:1,
    },
    stateLine:{
      height:'95%',
      alignItems:'center',
      marginTop:-5,
      justifyContent:'space-evenly'
    },
    stateLineText:{
      color:Colors.black,
      fontSize:12,
      fontFamily:Fonts.regular,
    }
})