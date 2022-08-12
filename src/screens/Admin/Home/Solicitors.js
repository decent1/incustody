import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator
  } from 'react-native';
  import React, {useState,useRef} from 'react';
  import {commonStyles} from '../../../utils/commonStyles';
  import {Colors} from '../../../utils/Colors';
  import {Fonts} from '../../../utils/Fonts';
  import {ImagePath} from '../../../utils/imagePath';
  import Drawer from 'react-native-drawer'
  import AdminDrawer from '../../../components/Drawer/AdminDrawer'
  import * as request from '../../../networking/request'
  import * as api from '../../../networking/api'
  import { useFocusEffect } from '@react-navigation/native'
  import Helper from '../../../utils/Helper'
  import Header from '../../../components/Header/Header';
  import SolicitorListItem from '../../../components/ListItem/SolicitorsListItem';
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  const Solicitors = ({navigation}) => {
    const _drawer = useRef(null);
   
    const [solicitors, setSolicitors] = React.useState([ ])
    const [isLoading, setIsLoading] = useState(false)
    const [current_page, setCurrent_page]= useState(1)        
    const [last_page, setLast_page]      = useState('')  
    const [per_page, setPer_page]        = useState(5)
  
    const closeControlPanel = () => {
      _drawer.current.close()
    };
    const openControlPanel = () => {
      _drawer.current.open()
    };
    async function getData(current_page){
      setIsLoading(true)
      const response = await request.GetRequestWithAuthentication(api.GetAllSolicitorsAPI(current_page,per_page));
      setIsLoading(false)
      if(response.success){
          setSolicitors(solicitors.concat(response.data.data));
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
    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;
        getData(current_page)
        return () => {
          isActive = false;
        };
      }, [])
    );
  
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
        tweenHandler={ratio => ({ main: {opacity: (2 - ratio) / 2}, })}>
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
              
              <Header onProfilePress={()=>navigation.navigate('AccountSettings')} />
              <View style={styles.mainView}>
                <Text style={styles.des}>{'Admin/ Solicitors'}</Text>
                <Text style={styles.title}>{'Solicitors'}</Text>
              </View>
               
                
                {
                    solicitors.map((el, index) => {
                        return <SolicitorListItem 
                            item={el}
                            key={index.toString()}
                            navigation={navigation}
                            text={'Solicitor'}
                        />
                        }
                    )
                }
                {
              isLoading && <ActivityIndicator 
                size={'small'}
                color={Colors.primary}
                style={{marginTop:'20%'}}
              />
            }
                <View style={{
                    height:150
                }}>

                </View>
            </ScrollView>
        </View>
      </Drawer>
    );
  };
  
  export default Solicitors;
  
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
    accountType: {
      marginHorizontal: 8,
      fontSize: 14,
      color: '#3E3F42',
      fontFamily: Fonts.regular,
    },
  });
  