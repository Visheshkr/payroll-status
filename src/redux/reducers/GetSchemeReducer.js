import {
    GET_SCHEME_START,
    GET_SCHEME_SUCCESS,
    GET_SCHEME_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const getSchemeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SCHEME_START:
        console.log("Start")
        return {
          ...state,
        };
      case GET_SCHEME_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case GET_SCHEME_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default getSchemeReducer;
