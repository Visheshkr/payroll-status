import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    GET_SCHEME_START,
    GET_SCHEME_SUCCESS,
    GET_SCHEME_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const getSchemes = (payload) => (dispatch) => {
  dispatch({ type: GET_SCHEME_START });
  fetcher({
    method: "GET",
    request: `schemeList`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: GET_SCHEME_SUCCESS,
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
          type: GET_SCHEME_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
