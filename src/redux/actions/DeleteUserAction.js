import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const deleteUsers = (id, successCbToken, userId) => (dispatch) => {
  dispatch({ type: DELETE_USER_START });
  fetcher({
    method: "DELETE",
    request: `remove-user/${id}/${userId}`,
    payload: id,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: response.data,
      });
      if (
        response.data.status === true ||
        response.data.statusCode === "200" ||
        response.data.status === "SUCCESS"
      ) {
        dispatch(
          showMessage({
            title: "Deleted Successfully",
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
        type: DELETE_USER_ERROR,
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
