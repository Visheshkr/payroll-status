import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const createUsers = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: CREATE_USER_START });
  fetcher({
    method: "POST",
    request: `create-user`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: CREATE_USER_SUCCESS,
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
        type: CREATE_USER_ERROR,
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
