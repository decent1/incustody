import { ADD_USER } from "./userType"

export const addUser = (payload) => {
    return{
        type:ADD_USER,
        payload:payload
    }
}