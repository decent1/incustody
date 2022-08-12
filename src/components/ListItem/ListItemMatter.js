import React,{useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { commonStyles } from '../../utils/commonStyles'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Entypo from 'react-native-vector-icons/Entypo'
import { Fonts } from '../../utils/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Helper from '../../utils/Helper';
import * as request from '../../networking/request'
import * as api from '../../networking/api'
import * as payload from '../../networking/payload'
import { useSelector } from 'react-redux';

export default function ListItemMatter({
    el,
    navigation,
    onSuccess
}){
    function isIdContained(){
        for(let i = 0; i < el.agent_requests.length; i++){
            if(el.agent_requests[i].user_id === user.id){
                return true
            }
        }
        return false
    }
    const user = useSelector(state => state.user)
    const [isLoading_Attend, setIsLoading_Attend] = useState(false)
    const [visible3, setVisible3] = useState(false);
    const hideMenu3 = () => setVisible3(false);
    const showMenu3 = () => setVisible3(true);
    const Attend = async () => {
        setIsLoading_Attend(true)
        const response = await request.PostRequestWithAuthentication(
            api.AttendMatterAPI(),
            payload.AttendMatterPayload(
                el.id,
                user.id
            )
        )
        setIsLoading_Attend(false)
        if(response.success){
            Helper.showToast('Request has been sent to solicitor')
            onSuccess(el.id)
        }
        else{
            Helper.showToast('Something went wrong')
        }
    }
    return <TouchableOpacity style={styles.container}
        activeOpacity={0.8}
        onPress={() => {
            // console.log(el.created_at.split('T')[0])
            //YYYY-MM-DD
            if(user.user_type === 'solicitor' || user.user_type === 'admin'){
                navigation.navigate('MatterHistory',{
                    item:el
                })
            }
        }}>
            
           
            <Text style={styles.nameText}>
                {`Defender's Name : ${el.defender_name}`}
            </Text>
            <Text style={[styles.nameText,{ fontSize: 12, }]}>
                {`Offence : ${el.offence.name}`}
            </Text>
            <Text style={styles.stationName}>
                {`Station : ${el.station.name}`}
            </Text>
            <Text style={styles.stationName}>
                {`Date : ${Helper.parseDate(el.created_at.split('T')[0])}`}
            </Text>
            <Text style={styles.time}>
                {`Time : ${Helper.tConvert(el.created_at.split('T')[1].split('.')[0])}`}
            </Text>
        <View style={[styles.statusContainer,{
            backgroundColor:Helper.getBackgroundColor(el.status)
        }]}>
            <Text style={[styles.statusName,{
                color:Helper.getTextColor(el.status)
            }]}>
                {el.status}
            </Text>
        </View>
        {
            user.user_type == 'solicitor' || user.user_type == 'admin'
            ?
                null
            :
                el.assigned_agent == null
                ?
                    isIdContained() == true 
                    ?
                    // Pending for approval
                        <TouchableOpacity 
                            onPress={() => {}} 
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>{'Pending of Approval'}</Text>
                        </TouchableOpacity>  
                    :
                        // attend this matter
                        <TouchableOpacity 
                            onPress={Attend}
                            style={styles.buttonContainer}>
                                {
                                    isLoading_Attend
                                    ?
                                    <ActivityIndicator 
                                        size={'small'}
                                        color={Colors.primary}
                                    />
                                    :
                                    <Text style={styles.buttonText}>{'Attend this matter'}</Text>
                                }
                        </TouchableOpacity> 
                :   
                    el.assigned_agent.id == user.id
                    ?
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate('MatterHistory',{
                                    item:el
                                })
                            }} 
                            style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>{'Approved (View Details)'}</Text>
                        </TouchableOpacity>   
                    :
                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{'Already Assigned'}</Text>
                        </TouchableOpacity>                                         
        }
  </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 16,
        backgroundColor: Colors.appBackgroundColor,
        ...commonStyles.shadow,
        padding: 12,
        borderRadius: 5,
        marginTop: 16,
    },
    cardHeader:{
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    menuItemText:{
        fontFamily:Fonts.regular,
        color:Colors.black,
        marginLeft:8,
    },
    nameText:{
        fontFamily: Fonts.medium,
        color: '#001328',
    },
    stationName:{
        fontFamily: Fonts.medium,
        color: '#001328',
        marginTop: 16,
    },
    time:{
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: '#606060',
    },
    statusContainer:{
        borderRadius: 5,
        alignSelf: 'flex-end',
        padding:8,
    },
    statusName:{
        fontFamily: Fonts.regular,
        fontSize: 12,
    },
    buttonContainer:{
        height:44,
        width:'100%',
        borderRadius:8,
        backgroundColor:Colors.white,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderColor:Colors.primary,
        marginTop:12,
    },
    buttonText:{
        fontFamily:Fonts.semiBold,
        color:Colors.primary
    }
})