import {
    GET_ALL_DESIGNATION_START,
    GET_ALL_DESIGNATION_SUCCESS,
    GET_ALL_DESIGNATION_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const getAllDesignationReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_DESIGNATION_START:
        console.log("Start")
        return {
          ...state,
        };
      case GET_ALL_DESIGNATION_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case GET_ALL_DESIGNATION_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default getAllDesignationReducer;
