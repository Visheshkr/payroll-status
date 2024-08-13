import {
    GET_ROLEMENU_RIGHT_MAP_START,
    GET_ROLEMENU_RIGHT_MAP_SUCCESS,
    GET_ROLEMENU_RIGHT_MAP_ERROR
  } from "../constants/action-types";

const initialState = {
    data: [],
    error: "",
  }


const getRoleMenuRightMapReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ROLEMENU_RIGHT_MAP_START:
        console.log("Start")
        return {
          ...state,
        };
      case GET_ROLEMENU_RIGHT_MAP_SUCCESS:
        console.log("Action.payload",action.payload)
        return {
          ...state,
          data: action.payload,
        };
      case GET_ROLEMENU_RIGHT_MAP_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    } 
}

export default getRoleMenuRightMapReducer;
