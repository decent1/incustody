import { ADD_USER } from "./userType";

const initialState = {
    id:'',
    first_name:'',
    last_name:'',
    email:'',
    user_type:'',
    device_token:'',
    email_notify:'',
    push_notify:'',
    text_notify:'',
    token:'',
    isLogin:'',

    address:"",
    city_id:"",
    phone:"",
    post_code:"",

    preffered_stations:[],
    firm:{}
}

const UserReducar = (state = initialState, action) => {
    switch(action.type){
        case ADD_USER : 
            return {
                ...state,
                ...action.payload
            } 
        default : 
            return state
    }
}

export default UserReducar