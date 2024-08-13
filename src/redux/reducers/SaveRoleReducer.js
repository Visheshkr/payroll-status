import {
    SAVE_ROLE_START,
    SAVE_ROLE_SUCCESS,
    SAVE_ROLE_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const saveRoleReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_ROLE_START:
        console.log("Start")
        return {
          ...state,
        };
      case SAVE_ROLE_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case SAVE_ROLE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default saveRoleReducer;
