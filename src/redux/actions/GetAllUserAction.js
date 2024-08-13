import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    GET_ALL_USERS_START,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const getAllUsers = (payload) => (dispatch) => {
  dispatch({ type: GET_ALL_USERS_START });
  fetcher({
    method: "GET",
    request: `map/initcreateuser`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: response.data,
      });
      
      if (response.data.statusCode === 400) {
        dispatch(
          showMessage({
            title: response.data.message,
            variant: "error",
          }));
      }
    })
    .catch((error) => {
        dispatch({
          type: GET_ALL_USERS_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
