import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  SAVE_DESIGNATION_START,
  SAVE_DESIGNATION_SUCCESS,
  SAVE_DESIGNATION_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const createDesignation = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: SAVE_DESIGNATION_START });
  fetcher({
    method: "POST",
    request: `create-desig`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: SAVE_DESIGNATION_SUCCESS,
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
        type: SAVE_DESIGNATION_ERROR,
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
