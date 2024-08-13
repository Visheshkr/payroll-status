import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    ROLE_BY_USERID_START,
    ROLE_BY_USERID_SUCCESS,
    ROLE_BY_USERID_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const getRolesById = (id, successCbToken) => (dispatch) => {
  dispatch({ type: ROLE_BY_USERID_START });
  fetcher({
    method: "GET",
    request: `usrRoleMap/getRoles/${id}`,
    payload : id,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: ROLE_BY_USERID_SUCCESS,
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
          type: ROLE_BY_USERID_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
