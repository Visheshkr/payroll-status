import {
    USER_ROLEMAP_START,
    USER_ROLEMAP_SUCCESS,
    USER_ROLEMAP_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const userRoleMapeducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_ROLEMAP_START:
        console.log("Start")
        return {
          ...state,
        };
      case USER_ROLEMAP_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case USER_ROLEMAP_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default userRoleMapeducer;
