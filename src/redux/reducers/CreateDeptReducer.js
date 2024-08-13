import {
    CREATE_DEPT_START,
    CREATE_DEPT_SUCCESS,
    CREATE_DEPT_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const createDeptReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_DEPT_START:
        console.log("Start")
        return {
          ...state,
        };
      case CREATE_DEPT_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case CREATE_DEPT_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default createDeptReducer;
