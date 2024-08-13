import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    SAVE_BANK_START,
    SAVE_BANK_SUCCESS,
    SAVE_BANK_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const createBank = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: SAVE_BANK_START });
  fetcher({
    method: "POST",
    request: `saveBank`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: SAVE_BANK_SUCCESS,
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
          type: SAVE_BANK_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
