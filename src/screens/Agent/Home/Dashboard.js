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
import AgentDrawer from '../../../components/Drawer/AgentDrawer'
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
        content={<AgentDrawer 
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
                            style={{ alignSelf: 'flex-end',marginRight:8 }}>
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