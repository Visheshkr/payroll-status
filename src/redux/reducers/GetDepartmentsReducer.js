import {
    GET_ALL_DEPT_START,
    GET_ALL_DEPT_SUCCESS,
    GET_ALL_DEPT_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const getDeptsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_DEPT_START:
        console.log("Start")
        return {
          ...state,
        };
      case GET_ALL_DEPT_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case GET_ALL_DEPT_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default getDeptsReducer;
