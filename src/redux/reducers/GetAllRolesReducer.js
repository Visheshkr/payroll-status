import {
    GET_ALL_ROLE_START,
    GET_ALL_ROLE_SUCCESS,
    GET_ALL_ROLE_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const getAllRoleReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_ROLE_START:
        console.log("Start")
        return {
          ...state,
        };
      case GET_ALL_ROLE_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case GET_ALL_ROLE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default getAllRoleReducer;
