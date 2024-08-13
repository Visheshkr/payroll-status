import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    GET_ALL_DEPT_START,
    GET_ALL_DEPT_SUCCESS,
    GET_ALL_DEPT_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const getAllDept = (payload) => (dispatch) => {
  dispatch({ type: GET_ALL_DEPT_START });
  fetcher({
    method: "GET",
    request: `deprtment/init`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: GET_ALL_DEPT_SUCCESS,
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
          type: GET_ALL_DEPT_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
