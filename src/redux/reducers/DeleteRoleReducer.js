import {
    DELETE_ROLE_START,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const deleteRoleReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_ROLE_START:
        console.log("Start")
        return {
          ...state,
        };
      case DELETE_ROLE_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_ROLE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default deleteRoleReducer;
