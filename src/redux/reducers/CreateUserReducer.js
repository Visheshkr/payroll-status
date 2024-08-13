import {
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const createUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_USER_START:
        console.log("Start")
        return {
          ...state,
        };
      case CREATE_USER_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case CREATE_USER_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default createUserReducer;
