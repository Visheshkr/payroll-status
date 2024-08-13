import {
    UPDATE_BANK_START,
    UPDATE_BANK_SUCCESS,
    UPDATE_BANK_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const updateBankReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_BANK_START:
        console.log("Start")
        return {
          ...state,
        };
      case UPDATE_BANK_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_BANK_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default updateBankReducer;
