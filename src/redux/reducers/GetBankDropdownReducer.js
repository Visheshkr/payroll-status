import {
    GET_ALL_BANK_DROPDOWN_START,
    GET_ALL_BANK_DROPDOWN_SUCCESS,
    GET_ALL_BANK_DROPDOWN_ERROR
  } from "../constants/action-types";
  
  const initialState = {
    data: [],
    error: "",
  }
  
  
  const getAllBankDropdownReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_BANK_DROPDOWN_START:
        console.log("Start")
        return {
          ...state,
        };
      case GET_ALL_BANK_DROPDOWN_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case GET_ALL_BANK_DROPDOWN_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
  }
  
  export default getAllBankDropdownReducer;
  