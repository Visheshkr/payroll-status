import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  DELETE_DESIGNATION_START,
  DELETE_DESIGNATION_SUCCESS,
  DELETE_DESIGNATION_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const deleteDesignation =
  (id, successCbToken, userdetails) => (dispatch) => {
    dispatch({ type: DELETE_DESIGNATION_START });
    fetcher({
      method: "DELETE",
      request: `remove-desig/${id}/${userdetails}`,
      payload: id,
      headerOptions: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => {
        console.log("response1", response.data);
        dispatch({
          type: DELETE_DESIGNATION_SUCCESS,
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
          type: DELETE_DESIGNATION_ERROR,
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
