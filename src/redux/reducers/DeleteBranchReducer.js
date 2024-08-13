import {
    DELETE_BRANCH_START,
    DELETE_BRANCH_SUCCESS,
    DELETE_BRANCH_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const deleteBranchReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_BRANCH_START:
        console.log("Start")
        return {
          ...state,
        };
      case DELETE_BRANCH_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case DELETE_BRANCH_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default deleteBranchReducer;
