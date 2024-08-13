import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    GET_ROLEMENU_RIGHT_MAP_START,
    GET_ROLEMENU_RIGHT_MAP_SUCCESS,
    GET_ROLEMENU_RIGHT_MAP_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const getRoleMenuRightMap = (id) => (dispatch) => {
  dispatch({ type: GET_ROLEMENU_RIGHT_MAP_START });
  fetcher({
    method: "GET",
    request: `roleMenuRightMap/init/${id}`,
    payload : id,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: GET_ROLEMENU_RIGHT_MAP_SUCCESS,
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
          type: GET_ROLEMENU_RIGHT_MAP_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
