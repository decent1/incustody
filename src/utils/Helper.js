
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from './Keys' 

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
};

const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
};

export default class Helper{
    
    static async showToast(msg) {
        Toast.show(msg);
    }

    static tConvert (time) {
        var timeArr = time.split(':')
        if(timeArr[0] >= 0 && timeArr[0] <= 11){
            if(timeArr[0] == 0){
                var hours = 12
                return hours + ":" + timeArr[1] + " AM"
            }
            else{
                return time + " AM"
            }
        }
        else{
            if(timeArr[0] == 12){
                var hours = 12
                return hours + ":" + timeArr[1] + " PM"   
            }
            else{
                var hours = timeArr[0] - 12
                return hours + ":" + timeArr[1] + " PM"
            }
        }
    }

    static saveUser(user) {
        storeData(Keys.USER_DATA, user);
    }
    static async getUser() {
        let user = await getData(Keys.USER_DATA);
        return user;
    }
    
    static saveToken(token) {
        storeData(Keys.ACCESS_TOKEN, token);
    }
    static async getToken() {
        let token = await getData(Keys.ACCESS_TOKEN);
        return token;
    }

    static parseDate(date){
        var newDate = ''
        var months = [
            'Jab',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]

        dateArr = date.toString().split('-')

        newDate = dateArr[2] + ", " + months[(parseInt(dateArr[1]) - 1)] + " " + dateArr[0]

        return newDate
    }

    static async isAuthenticated(){
       let token = await getData(Keys.ACCESS_TOKEN);
      if(token){
            return true
        }
        return false
    }
    static getMonth(index){
        var months = [
            'Janaury',
            'Febuary',
            'March',
            'April',
            'May',
            'Jun',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        return months[index]
    }
    static getBackgroundColor(status){
        var colors = {
            "in-review":"rgba(102,124,138,0.1)", //"#667C8A" //Booking started 
            "published":"rgba(242,0,0,0.1)", //"#F20000" //Booking completed
            "agent-enroute":"rgba(16,183,241,0.1)", //"#10B7F1" //Accepted
            "arrived-at-ps":"rgba(67,82,178,0.1)", //"#4352B2" //Arrived at PS
            "interview-finished":"rgba(89,145,13,0.1)", //#59910D //Interview Finished
            "departed-from-ps":"rgba(89,145,13,0.1)", //#59910D //Departed from PS
            "completed-without-invoice":"rgba(69,147,136,0.1)", //#459388 Completed | No Invoice
            "completed-with-invoice":"rgba(69,147,136,0.1)" //#459388 Completed | Invoice Submitted
        }
        // return colors[status]
        if(colors.hasOwnProperty(status)){
            return colors[status]
        }
        else{
            return "rgba(102,124,138,0.1)"
        }
    }
    static getTextColor(status){
        var colors = {
            "in-review":"#667C8A",//Booking started 
            "published":"#F20000", //Booking completed
            "agent-enroute":"#10B7F1", //Accepted
            "arrived-at-ps":"#4352B2", //Arrived at PS
            "interview-finished":"#59910D", //Interview Finished
            "departed-from-ps":"#59910D", //Departed from PS
            "completed-without-invoice":"#459388", //Completed | No Invoice
            "completed-with-invoice":"#459388", //Completed | Invoice Submitted
        }
        if(colors.hasOwnProperty(status)){
            return colors[status]
        }
        else{
            return "#667C8A"
        }
    }
    static getStatusText(status){
        var colors = {
            "in-review":"Booking started",
            "published":"Booking completed",
            "agent-enroute":"Accepted",
            "arrived-at-ps":"Arrived at PS",
            "interview-finished":"Interview Finished",
            "departed-from-ps":"Departed from PS",
            "completed-without-invoice":"Completed | No Invoice",
            "completed-with-invoice":"Completed | Invoice Submitted"
        }
        if(colors.hasOwnProperty(status)){
            return colors[status]
        }
        else{
            return "Booking started"
        }
    }
}