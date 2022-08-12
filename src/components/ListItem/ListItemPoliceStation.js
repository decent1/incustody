// import React from 'react'
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity
// } from 'react-native'
// import { Colors } from '../../utils/Colors'
// import { commonStyles } from '../../utils/commonStyles'
// import { Fonts } from '../../utils/Fonts'
// import { ImagePath } from '../../utils/imagePath'
// ImagePath

// export default function PoliceStationListItem({
//     item,
//     navigation
// }){
//     return <TouchableOpacity 
//     onPress={() => {
//         navigation.navigate('UpdatePoliceStation', {
//             item: item
//         })
//     }}
//     style={styles.container}>
//         <View style={styles.rowContainer}>
//             <View style={styles.itemContainer}>
//                 <Text style={styles.des}>{'Station'}</Text>
//                 <Text style={styles.title}>{`${item.name}`}</Text>
//             </View>
//         </View>
//         <View style={[styles.rowContainer,{
//             marginTop:20
//         }]}>
//             <View style={styles.itemContainer}>
//                 <Text style={styles.des}>{'Postcode'}</Text>
//                 <Text style={styles.title}>{item.post_code != null ? item.post_code : 'N/A'}</Text>
//             </View>
//             <View style={styles.itemContainer}>
//                 <Text style={styles.des}>{'Status'}</Text>
//                 <View style={[styles.statusButton,{
//                     backgroundColor: item.is_enable == 1 ? 'rgba(113, 180, 35, 0.2)' : '#ffcccb'
//                 }]}>
//                     <Text style={[styles.statusText,{
//                         color: item.is_enable == 1 ? '#62971A' : 'red'
//                     }]}>{item.is_enable == 1 ? 'ENABLED' : 'NOT ENABLED'}</Text>
//                 </View>
//             </View>
//         </View>
//     </TouchableOpacity>
// }
// const styles = StyleSheet.create({
//     container:{
//         marginHorizontal:16,
//         backgroundColor:Colors.appBackgroundColor,
//         ...commonStyles.shadow,
//         borderRadius:4,
//         marginTop:12,
//         paddingVertical:12,
//         paddingHorizontal:20
//     },
//     rowContainer:{
//         flexDirection:'row'
//     },
//     itemContainer:{
//         flex:1,
//     },
//     title:{
//         fontFamily:Fonts.regular,
//         color:Colors.black,
//         marginTop:4,
//         fontSize:16
//     },
//     des:{
//         fontFamily:Fonts.regular,
//         color:'#606060',
//     },
//     statusButton:{
//         height:24,
//         width:100,
//         alignItems:'center',
//         justifyContent:'center',
//         borderRadius:4,
//         marginTop:4
//     },
//     statusText:{
//         fontFamily:Fonts.regular,
//         fontSize:12,
//     }
// })

import React,{useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { commonStyles } from '../../utils/commonStyles'
import { Fonts } from '../../utils/Fonts'
import { ImagePath } from '../../utils/imagePath'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as api from '../../networking/api'
import * as request from '../../networking/request'
import * as payload from '../../networking/payload'
import Helper from '../../utils/Helper'

export default function ListItemPoliceStation({
    item,
    navigation,
    onSuccess
}){
    const [isLoading,setIsLoading] = useState(false)
    return <View 
    style={styles.container}>
        <View style={styles.rowContainer}>
            <View style={styles.itemContainer}>
                <Text style={styles.des}>{'Station'}</Text>
                <Text style={styles.title}>{item?.name}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.des}>{'Postcode'}</Text>
                <Text style={styles.title}>{item?.post_code}</Text>
            </View>
        </View>
        <View style={[styles.rowContainer,{ marginTop:20 }]}>
            <View style={styles.itemContainer}>
                <Text style={styles.des}>{'Country'}</Text>
                <Text style={styles.title}>{item?.country?.name}</Text>
            </View>
            
            <View style={styles.itemContainer}>
                <Text style={styles.des}>{'State'}</Text>
                <Text style={styles.title}>{item?.state?.name}</Text>
            </View>
        </View>
        <View style={[styles.rowContainer,{ marginTop:20 }]}>
            <View style={styles.itemContainer}>
                <Text style={styles.des}>{'City'}</Text>
                <Text style={styles.title}>{item?.city?.name}</Text>
            </View>
            
            <View style={styles.itemContainer}>
                <Text style={styles.des}>{'Status'}</Text>
                <View style={[styles.statusButton,{
                    backgroundColor: item?.is_enable == 1 ? 'rgba(113, 180, 35, 0.2)' : '#ffcccb'
                }]}>
                    <Text style={[styles.statusText,{
                        color: item?.is_enable == 1 ? '#62971A' : 'red'
                    }]}>{item?.is_enable == 1 ? 'ENABLED' : 'NOT ENABLED'}</Text>
                </View>
            </View>
        </View>
        <View style={[styles.rowContainer,{ marginTop:20 }]}>
            <View style={styles.itemContainer}>
                <Text style={styles.des}>{'Mobile'}</Text>
                <Text style={styles.title}>{item?.mobile}</Text>
            </View>
            
            
        </View>
        <View style={styles.actionButtonContainer}>
              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('UpdateStation',{
                      item:item
                    })
                  }} 
                  style={[
                    styles.actionButton,
                    {
                      marginRight: 16,
                      borderColor: Colors.primary,
                    },
                  ]}>
                  <AntDesign name="edit" color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Alert.alert(
                      'Are you sure you want to delete this station?',
                      '',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: async () => {
                          const response = await request.DeleteRequestWithAuthentication(api.DeleteStationAPI(item.id))
                          if(response.success){
                            Helper.showToast('Station Deleted Successfully')
                            onSuccess(item.id)
                          }
                          else{
                            if(response.hasOwnProperty('message')){
                              Helper.showToast(response.message)
                            }
                            else{
                              Helper.showToast('Something went wrong')
                            }
                          }
                        }},
                      ],
                      {cancelable: false},
                    );
                  }}
                  style={[
                    styles.actionButton,
                    {
                      marginRight: 4,
                      borderColor: '#F32020',
                    },
                  ]}>
                      <AntDesign name="delete" color="#F32020" />
                </TouchableOpacity>

                
              </View>
    </View>
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:16,
        backgroundColor:Colors.appBackgroundColor,
        ...commonStyles.shadow,
        borderRadius:4,
        marginTop:12,
        paddingVertical:12,
        paddingHorizontal:20
    },
    rowContainer:{
        flexDirection:'row'
    },
    itemContainer:{
        flex:1,
    },
    title:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        marginTop:4,
        fontSize:12,
    },
    des:{
        fontFamily:Fonts.regular,
        color:'#606060',
        fontSize:12,
    },
    statusButton:{
        height:24,
        width:100,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        marginTop:4
    },
    statusText:{
        fontFamily:Fonts.regular,
        fontSize:12,
    },
    actionButtonContainer:{
        flexDirection:'row',
        alignSelf:'flex-end',
        marginTop:16
    },
    actionButton:{
        height:20,
        width: 20,
        borderRadius:3,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
})