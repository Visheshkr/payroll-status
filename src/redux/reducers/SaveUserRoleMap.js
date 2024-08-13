import {
    SAVE_ROLEMENU_RIGHT_MAP_START,
    SAVE_ROLEMENU_RIGHT_MAP_SUCCESS,
    SAVE_ROLEMENU_RIGHT_MAP_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const saveUserRoleReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_ROLEMENU_RIGHT_MAP_START:
        console.log("Start")
        return {
          ...state,
        };
      case SAVE_ROLEMENU_RIGHT_MAP_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case SAVE_ROLEMENU_RIGHT_MAP_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default saveUserRoleReducer;
