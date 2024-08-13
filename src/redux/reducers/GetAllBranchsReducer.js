import {
    GET_ALL_BRANCH_START,
    GET_ALL_BRANCH_SUCCESS,
    GET_ALL_BRANCH_ERROR
  } from "../constants/action-types";
  
  const initialState = {
    data: [],
    error: "",
  }
  
  
  const getAllBranchReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_BRANCH_START:
        console.log("Start")
        return {
          ...state,
        };
      case GET_ALL_BRANCH_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case GET_ALL_BRANCH_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
  }
  
  export default getAllBranchReducer;
  