import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import {
  SAVE_ROLEMENU_RIGHT_MAP_START,
  SAVE_ROLEMENU_RIGHT_MAP_SUCCESS,
  SAVE_ROLEMENU_RIGHT_MAP_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const saveRoleMenuRightMap = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: SAVE_ROLEMENU_RIGHT_MAP_START });
  fetcher({
    method: "POST",
    request: `roleMenuRightMap/save`,
    payload,
    headerOptions: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      console.log("response1", response.data);
      dispatch({
        type: SAVE_ROLEMENU_RIGHT_MAP_SUCCESS,
        payload: response.data,
      });
      if (
        response.data.status === true ||
        response.data.statusCode === "200" ||
        response.data.status === "SUCCESS"
      ) {
        dispatch(
          showMessage({
            title: "Role Mapped Successfully",
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
        type: SAVE_ROLEMENU_RIGHT_MAP_ERROR,
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
