import React,{useState} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Menu } from 'react-native-material-menu';
import { Colors } from '../../utils/Colors';
import { Fonts } from '../../utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import matterFilter from '../../data/matterFilter'
import matterSort from '../../data/matterSort';

export default function ({
  onFilterClick=()=>{},
  onSortClick=()=>{},
}) {
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const [visible2, setVisible2] = useState(false);
    const hideMenu2 = () => setVisible2(false);
    const showMenu2 = () => setVisible2(true)

    const [selectedFilter, setSelectedFilter] = useState(1)
    const [selectedSort, setSelectedSort] = useState(1)

    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>{'Filter'}</Text>
            <Menu visible={visible} 
              anchor={
                <TouchableOpacity onPress={showMenu} style={[styles.filterContainer]}>
                  <View style={styles.menu_main}>
                    <Text style={styles.menu_title}>
                      {matterFilter.find(item=>item.id===selectedFilter).name}
                    </Text>
                  </View>
                  <Entypo name={'chevron-down'} size={20} color={'#798593'} />
                </TouchableOpacity>
              } 
              onRequestClose={hideMenu} 
              animationDuration={100} 
              style={[styles.MenuContainer,{height:140}]}>

                <View style={{flex:1}}>
                  <ScrollView>
                    {
                      matterFilter.map((value,index)=>{
                        return (
                          <TouchableOpacity 
                            key={index} 
                            onPress={() => {
                              setSelectedFilter(value.id)
                              console.log('Filter =>', value.name)
                              hideMenu()
                              onFilterClick(value.id)
                            }} 
                            activeOpacity={0.8}  
                            style={{borderBottomWidth:1,borderBottomColor:'#9E9FA5'}}>
                              <Text style={styles.menuTxt}>
                                  {value.name}
                              </Text> 
                          </TouchableOpacity>
                        );  
                      })
                    }
                  </ScrollView>
                </View>

            </Menu>
          </View>
          <View style={{marginLeft: 16, }}>
            <Text style={{fontFamily: Fonts.regular,color: '#ADADAD',}}> {'Sort'}</Text>
            <Menu
              visible={visible2}
              anchor={
                <TouchableOpacity 
                  onPress={showMenu2} 
                  style={[styles.filterContainer]}>
                    <View style={styles.menu_main}>
                      <Text style={styles.menu_title}>
                        {matterSort.find(item=>item.id===selectedSort).name}
                      </Text>
                    </View>
                  <Entypo name={'chevron-down'} size={20} color={'#798593'} />
                </TouchableOpacity>
              } 
              onRequestClose={hideMenu2} 
              animationDuration={100} 
              style={[styles.MenuContainer,{height:'7%'}]}>
              <View>
                <ScrollView>
                  {
                    matterSort.map((value,index)=>{
                      return (
                        <TouchableOpacity 
                          onPress={() => {
                            setSelectedSort(value.id)
                            console.log('Sort =>', value.name)
                            hideMenu2()
                            onSortClick(value.id)
                          }} 
                          activeOpacity={0.8} 
                          style={{borderBottomWidth:1,borderBottomColor:'#9E9FA5'}}>
                            <Text style={styles.menuTxt}>{value.name}</Text> 
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              </View>
            </Menu>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginTop: 12,
    },
    text:{
        fontFamily: Fonts.regular,
        color: '#ADADAD',
    },
    filterContainer: {
        marginTop: 8,
        borderWidth: 0.5,
        width: 150,
        height: 40,
        backgroundColor: Colors.appBackgroundColor,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    menu_main: {
        flex: 1,
        justifyContent: 'center',
    },
    menu_title: {
        fontSize: 12,
        color: '#3E3F42',
        fontFamily: Fonts.regular,
    },
    MenuContainer: {
        backgroundColor: Colors.appBackgroundColor,
        marginTop: '15%',
        width: 140,
    },
    menuTxt: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        marginTop: 15,
        marginLeft: 15,
        color:'#3E3F42'
    },
})