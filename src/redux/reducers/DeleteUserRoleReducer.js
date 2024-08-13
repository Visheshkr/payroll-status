import {
    DELETE_USER_ROLE_START,
    DELETE_USER_ROLE_SUCCESS,
    DELETE_USER_ROLE_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const deleteUserRoleReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_USER_ROLE_START:
        console.log("Start")
        return {
          ...state,
        };
      case DELETE_USER_ROLE_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_USER_ROLE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default deleteUserRoleReducer;
