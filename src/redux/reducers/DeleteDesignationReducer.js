import {
    DELETE_DESIGNATION_START,
    DELETE_DESIGNATION_SUCCESS,
    DELETE_DESIGNATION_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const deleteDesignationReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_DESIGNATION_START:
        console.log("Start")
        return {
          ...state,
        };
      case DELETE_DESIGNATION_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_DESIGNATION_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default deleteDesignationReducer;
