import React,{useState,useRef, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native'
import { Colors } from '../../../utils/Colors'
import { commonStyles } from '../../../utils/commonStyles'
import { Fonts } from '../../../utils/Fonts'
import Drawer from 'react-native-drawer'
import SolicitorDrawer from '../../../components/Drawer/SolicitorDrawer'
import { ImagePath } from '../../../utils/imagePath'
import Header from '../../../components/Header/Header'
import ListItemMatter from '../../../components/ListItem/ListItemMatter'
import * as request from '../../../networking/request'
import * as api from '../../../networking/api'
import Helper from '../../../utils/Helper'
import { useFocusEffect } from '@react-navigation/native'
import Filters from '../../../components/Filters/Filters'
import moment from 'moment'
var origionalMatters = []
var d = new Date()
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default function Matters({navigation}){
    const [isLoading, setIsLoading] = useState(false)
    const [current_page, setCurrent_page]= useState(1)        
    const [last_page, setLast_page]      = useState('')  
    const [per_page, setPer_page]        = useState(5)

    // const [start, setStart] = useState(0)
    // const [end, setEnd] = useState(10)

    const [allMatters, setAllMatters] = React.useState([ ])
    async function getData(current_page){
      setIsLoading(true)
      const response = await request.GetRequestWithAuthentication(api.GetMatterAPI(current_page, per_page));
      setIsLoading(false)
      if(response.success){
        // origionalMatters = response.data
        // setAllMatters(response.data)
        setAllMatters(allMatters.concat(response.data.data))
        origionalMatters = origionalMatters.concat(response.data.data)
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
          <SolicitorDrawer
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
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2},
        })}>
        <View style={commonStyles.container}>
        <TouchableOpacity onPress={openControlPanel} style={{}}>
              <Image style={commonStyles.drawerIconStyle}
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
            <Text style={styles.des}>{'Solicitor / Matters'}</Text>
            <Text style={styles.title}>{'Matters'}</Text>
            <View style={{ marginHorizontal: 16, }}>
                <Filters 
                  onFilterClick={(id) => {
                    // { id: 1, name: `All Matters`,  },
                    // { id: 2, name: `New Matters`, },
                    // { id: 3, name: `Complete Matters`, },
                    // { id: 4, name: `Cancelled Matters`, },
                    // { id: 5, name: `Invoice Submitteed`, },
                    if(id == 1){
                      setAllMatters(origionalMatters)
                    }
                    else if(id == 2){
                      setAllMatters(origionalMatters.filter(matter => matter.created_at.split('T')[0] == moment(d).format('YYYY-MM-DD')))
                    }
                    else if(id == 3){
                      setAllMatters(origionalMatters.filter(matter => matter.status == 'completed-without-invoice' || matter.status == 'completed-with-invoice'))
                    }
                    else if(id == 4){
                      setAllMatters(origionalMatters.filter(matter => matter.status == 'cencelled'))
                    }
                    else if(id == 4){
                      setAllMatters(origionalMatters.filter(matter => matter.status == 'completed-with-invoice'))
                    }
                  }}
                  onSortClick={(id) => {
                    console.log('sorting')
                    if(id == 1){
                      //New to old
                      var sorted = allMatters?.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
                      setAllMatters([...sorted])
                    }
                    else{
                      //old to new
                      var sorted = allMatters?.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
                      setAllMatters([...sorted])
                    }
                  }}
                /> 
            </View>
            {
              !isLoading && allMatters.length == 0 &&
              <View style={styles.noMattersTextContainer}>
                <Text style={styles.noMattersText}> {'No matters found'}</Text>
              </View>
            }           
            {
              allMatters.map((el, index) => {
                return <ListItemMatter 
                  el={el}
                  navigation={navigation}
                />
              })
            }
            {
              isLoading && <ActivityIndicator 
                size={'small'}
                color={Colors.primary}
                style={{marginTop:'20%'}}
              />
            }
            <View style={{height:150}}/>
          </ScrollView>
        </View>
      </Drawer>
    );
}

const styles = StyleSheet.create({
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
  noMattersTextContainer:{
    marginTop:'10%',
    alignSelf:'center',
  },
  noMattersText:{
    fontFamily: Fonts.regular,
    color: '#ADADAD',
  }
});