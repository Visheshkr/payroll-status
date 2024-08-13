import {
    SAVE_USER_ROLEMAP_START,
    SAVE_USER_ROLEMAP_SUCCESS,
    SAVE_USER_ROLEMAP_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const userRoleMapSaveReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_USER_ROLEMAP_START:
        console.log("Start")
        return {
          ...state,
        };
      case SAVE_USER_ROLEMAP_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case SAVE_USER_ROLEMAP_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default userRoleMapSaveReducer;
