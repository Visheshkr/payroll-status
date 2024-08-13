import {
    SAVE_BRANCH_START,
    SAVE_BRANCH_SUCCESS,
    SAVE_BRANCH_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const saveBranchReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_BRANCH_START:
        console.log("Start")
        return {
          ...state,
        };
      case SAVE_BRANCH_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case SAVE_BRANCH_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default saveBranchReducer;
