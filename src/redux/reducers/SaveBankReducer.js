import {
    SAVE_BANK_START,
    SAVE_BANK_SUCCESS,
    SAVE_BANK_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const saveBankReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_BANK_START:
        console.log("Start")
        return {
          ...state,
        };
      case SAVE_BANK_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case SAVE_BANK_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default saveBankReducer;
