import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  DELETE_USER_ROLE_START,
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_ROLE_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const deleteRoleUser = (payload, successCbToken) => (dispatch) => {
  console.log("under cations");
  dispatch({ type: DELETE_USER_ROLE_START });
  fetcher({
    method: "DELETE",
    request: `usrRoleMap/remove/${payload.rowId}/${payload.userId}/${payload.createdBy}`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: DELETE_USER_ROLE_SUCCESS,
        payload: response.data,
      });
      if (
        response.data.status === true ||
        response.data.statusCode === "200" ||
        response.data.status === "SUCCESS"
      ) {
        dispatch(
          showMessage({
            title: "Success",
            variant: "success",
          })
        );
        successCbToken && successCbToken();
      }

      if (response.data.statusCode === 400 || response.data.status == false) {
        dispatch(
          showMessage({
            title: response.data.message,
            variant: "error",
          })
        );
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_USER_ROLE_ERROR,
        payload: error,
      });
      dispatch(
        showMessage({
          title: error.data.message,
          variant: "error",
        })
      );
    });
};
