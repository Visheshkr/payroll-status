import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  USER_ROLEMAP_START,
  USER_ROLEMAP_SUCCESS,
  USER_ROLEMAP_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const userRoleMap = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: USER_ROLEMAP_START });
  fetcher({
    method: "GET",
    request: `usrRoleMap/init`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: USER_ROLEMAP_SUCCESS,
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
        type: USER_ROLEMAP_ERROR,
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
