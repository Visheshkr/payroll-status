import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  CREATE_DEPT_START,
  CREATE_DEPT_SUCCESS,
  CREATE_DEPT_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const createDepartment = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: CREATE_DEPT_START });
  fetcher({
    method: "POST",
    request: `create-dept`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: CREATE_DEPT_SUCCESS,
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
        type: CREATE_DEPT_ERROR,
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
