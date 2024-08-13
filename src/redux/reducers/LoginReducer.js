import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_START:
        console.log("Start")
        return {
          ...state,
        };
      case LOGIN_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case LOGIN_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default loginReducer;
