import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    GET_ALL_ROLE_START,
    GET_ALL_ROLE_SUCCESS,
    GET_ALL_ROLE_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const getAllRoles = (payload,successCbToken) => (dispatch) => {
  dispatch({ type: GET_ALL_ROLE_START });
  fetcher({
    method: "GET",
    request: `getAllRoleList`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: GET_ALL_ROLE_SUCCESS,
        payload: response.data,
      });
      if (
        response.data.status === true || response.data.statusCode === '200' ||
        response.data.status === "SUCCESS"
      ){
        successCbToken && successCbToken();
      }
    
      
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
          type: GET_ALL_ROLE_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
