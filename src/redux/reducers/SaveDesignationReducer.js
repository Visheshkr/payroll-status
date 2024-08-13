import {
    SAVE_DESIGNATION_START,
    SAVE_DESIGNATION_SUCCESS,
    SAVE_DESIGNATION_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const saveDesignationReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_DESIGNATION_START:
        console.log("Start")
        return {
          ...state,
        };
      case SAVE_DESIGNATION_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case SAVE_DESIGNATION_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default saveDesignationReducer;
