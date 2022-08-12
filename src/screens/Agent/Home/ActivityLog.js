import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import React , {useState,useRef, useEffect} from 'react';
import {commonStyles} from '../../../utils/commonStyles';
import {Fonts} from '../../../utils/Fonts';
import { Colors } from '../../../utils/Colors';
import Drawer from 'react-native-drawer'
import AgentDrawer from '../../../components/Drawer/AgentDrawer'
import { ImagePath } from '../../../utils/imagePath'
import Header from '../../../components/Header/Header';
import * as api from '../../../networking/api'
import * as request from '../../../networking/request'
import Helper from '../../../utils/Helper';
import { useSelector } from 'react-redux';
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
const ActivityLog = ({navigation}) => {
  const user = useSelector(state => state.user);
    const [list, setlist] = useState([]);
  const [isLoading, setIsLoading] = useState([])
  const [current_page, setCurrent_page]= useState(1)        
    const [last_page, setLast_page]      = useState('')  
    const [per_page, setPer_page]        = useState(15)

    async function getData(current_page){
      setIsLoading(true)
        const response = await request.GetRequestWithAuthentication(api.getActivityLogsAPI(current_page,per_page))
        setIsLoading(false)
        if(response.success){
          setlist(list.concat(response.data.data));
          setCurrent_page(response.data.meta.current_page)
          setLast_page(response.data.meta.last_page)
        }
        else{
          if(response.hasOwnProperty('message')){
            Helper.showToast(response.message)
          }
          else{
            Helper.showToast('Something went wrong')
          }
        }
    }

    useEffect(() => {
      getData(current_page)
    },[])
    
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
      <AgentDrawer
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
    <TouchableOpacity onPress={openControlPanel} style={{}}>
            <Image
              style={commonStyles.drawerIconStyle}
              source={ImagePath.drawerIcon}
            />
          </TouchableOpacity>
      <ScrollView
      scrollEventThrottle={250}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          if(current_page != last_page){
            if(!isLoading){
                getData(current_page + 1)
            }
          }
        }
      }}
      >
      
        <Header onProfilePress={() => navigation.navigate('AccountSettings')} />
        <Text style={styles.des}>{'Solicitor / Activity Log'}</Text>
          <Text style={styles.title}>{'Activity Log'}</Text>
        <View style={styles.mainView}>
          
          {list.map((value, index) => {
            return (
              <View key={index} style={styles.activity_list}>
                  {/* <Image source={ImagePath.profilePic}
                    style={styles.profilePic}
                  /> */}
                   <View 
          style={{
            height:40,
        width: 40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.primary
          }}
          onPress={() => onProfilePress()}>
            <Text style={{
              fontFamily:Fonts.regular,
              color:Colors.white,
              fontSize:16
            }}>{`${user.first_name.slice(0,1)}${user.last_name.slice(0,1)}`}</Text>
        </View>
                <View style={{marginLeft:12,}}>
                  <Text style={styles.activity_text}>{value.description}</Text>
                  <Text style={styles.ago}>{`Time : ${Helper.tConvert(value.created_at.split('T')[1].split('.')[0])}`}</Text>
                </View>
              </View>
            );
          })}
        </View>
        {
          isLoading && <ActivityIndicator 
          size={'small'}
          color={Colors.primary}
          style={{marginTop:'20%'}}
        />
        }
        {
          !isLoading && list.length == 0 && <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontFamily:Fonts.medium,color:Colors.primary}}>No Activity Logs</Text>
          </View>
        }
      </ScrollView>
    </View>
    </Drawer>
  );
};

export default ActivityLog;

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 16,
    marginBottom:'10%'
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
  viewAll: {
    fontFamily: Fonts.regular,
    color: Colors.primary,
    alignSelf: 'flex-end',
    marginTop: '10%',
  },
  activity_list: {
    marginHorizontal:16,
    flexDirection:'row',
    marginTop:16
  },
  activity_view: {
    flexDirection: 'row',
  },
  profilePic:{
      width:50,
      height:50,
  },
  activity_text:{
      flex:1,
      fontSize:12,
      fontFamily:Fonts.medium,
      color:'#3E3F42'
  },
  ago:{
      fontSize:12,
      fontFamily:Fonts.regular,
      color:'#798593'
  }
});
