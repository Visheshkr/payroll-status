import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    UPDATE_BRANCH_START,
    UPDATE_BRANCH_SUCCESS,
    UPDATE_BRANCH_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const updateBranch = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: UPDATE_BRANCH_START });
  fetcher({
    method: "POST",
    request: `editBranch`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: UPDATE_BRANCH_SUCCESS,
        payload: response.data,
      });
      if (
        response.data.status === true || response.data.statusCode === '200' ||
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
          type: UPDATE_BRANCH_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
