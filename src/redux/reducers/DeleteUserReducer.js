import {
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_USER_START:
        console.log("Start")
        return {
          ...state,
        };
      case DELETE_USER_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_USER_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default deleteUserReducer;
