import {REMOVE_MESSAGE, SHOW_MESSAGE} from "../constants/action-types";
export const showMessage =(payload)=>{
    console.log("Payload in dispatch",payload);
    return{
        type:SHOW_MESSAGE,
        payload,
    };
};
export const removeMessage =()=>{
    return{
        type:REMOVE_MESSAGE,
    }
}