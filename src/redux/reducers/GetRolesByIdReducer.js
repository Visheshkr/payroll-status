import {
    ROLE_BY_USERID_START,
    ROLE_BY_USERID_SUCCESS,
    ROLE_BY_USERID_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const getRoleByIdReducer = (state = initialState, action) => {
    switch (action.type) {
      case ROLE_BY_USERID_START:
        console.log("Start")
        return {
          ...state,
        };
      case ROLE_BY_USERID_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case ROLE_BY_USERID_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default getRoleByIdReducer;
