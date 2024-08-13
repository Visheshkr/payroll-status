import {
    UPDATE_BRANCH_START,
    UPDATE_BRANCH_SUCCESS,
    UPDATE_BRANCH_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const updateBranchReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_BRANCH_START:
        console.log("Start")
        return {
          ...state,
        };
      case UPDATE_BRANCH_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case UPDATE_BRANCH_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default updateBranchReducer;
