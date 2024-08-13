import {
    DELETE_DEPT_START,
    DELETE_DEPT_SUCCESS,
    DELETE_DEPT_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const deleteDeptReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_DEPT_START:
        console.log("Start")
        return {
          ...state,
        };
      case DELETE_DEPT_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_DEPT_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default deleteDeptReducer;
