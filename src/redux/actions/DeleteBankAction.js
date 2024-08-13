import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
    DELETE_BANK_START,
    DELETE_BANK_SUCCESS,
    DELETE_BANK_ERROR
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";


export const deleteBank = (bankId, successCbToken) => (dispatch) => {
  dispatch({ type: DELETE_BANK_START });
  fetcher({
    method: "POST",
    request: `deleteBank`,
    payload:bankId,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
    
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: DELETE_BANK_SUCCESS,
        payload: response.data,
      });
      if (
        response.data.status === true || response.data.statusCode === '200' ||
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
          type: DELETE_BANK_ERROR,
          payload: error,
        });
        dispatch(
          showMessage({
            title: error.data.message,
            variant: "error",
          }));
      });
};
