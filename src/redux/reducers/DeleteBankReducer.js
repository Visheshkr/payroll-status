import {
    DELETE_BANK_START,
    DELETE_BANK_SUCCESS,
    DELETE_BANK_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const deleteBankReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_BANK_START:
        console.log("Start")
        return {
          ...state,
        };
      case DELETE_BANK_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_BANK_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default deleteBankReducer;
