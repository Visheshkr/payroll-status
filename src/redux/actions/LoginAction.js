import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import axios from "axios";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SAVE_ROLE_START,
  SAVE_ROLE_SUCCESS,
  SAVE_ROLE_ERROR,
} from "../constants/action-types";
import { showMessage } from "./ShowMessage";

export const loginUser = (payload, successCbToken) => (dispatch) => {
  dispatch({ type: LOGIN_START });
  dispatch({ type: SAVE_ROLE_START });
  fetcher({
    method: "POST",
    request: `user/authenticate`,
    payload,
  })
    .then((response) => {
      // console.log("response1", response.data);

      // localStorage.setItem("token", response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      if (
        response.data.status === true ||
        response.data.statusCode === "200" ||
        response.data.status === "SUCCESS"
      ) {
        dispatch({
          type: SAVE_ROLE_SUCCESS,
          payload: response.data?.userdetails?.roleMap,
        });
        localStorage.setItem("userId", response.data?.userdetails?.user.userId);
        localStorage.setItem(
          "username",
          response.data?.userdetails?.user.userName
        );

        localStorage.setItem(
          "username",
          response.data?.userdetails?.user.userName
        );
        localStorage.setItem(
          "fullname",
          response.data?.userdetails?.user.fullname
        );
        localStorage.setItem(
          "designation",
          response.data?.userdetails?.roleMap[0].roleName
        );
        // localStorage.setItem(
        //   "DesignationId",
        //   // response.data?.userdetails?.roleMap[0].roleId
        //   response.data?.userdetails?.projectDesgnMaps[0].designation?.id
        // );
        // const projectDesgnMapsJSON = JSON.stringify(
        //   response.data?.userdetails?.projectDesgnMaps
        // );
        // localStorage.setItem("project", projectDesgnMapsJSON);

        // const datas=response.data?.userdetails?.projectDesgnMaps;
        // const parsedData=JSON.parse(datas);
        // const projectId=projectDesgnMapsJSON[0].project.id;

        // localStorage.setItem(
        //   "projectId",projectId
        // );
        
        // console.log("ID::",response.data?.userdetails?.projectDesgnMaps[0].designation?.id)
        
        //localStorage.setItem("sideBarOpen", true);
        Cookies.set("token", response.data?.token, { expires: 1 / 24 });
        dispatch(
          showMessage({
            title: "Success",
            variant: "success",
          })
        );
        successCbToken && successCbToken(response);
        // axios
        //   .post(
        //     `${process.env.REACT_APP_JOBAPPLICATION_API_URL}/recruitment/auth`
        //   )
        //   .then((response) => {
        //     Cookies.set("jobToken", response.data?.token, { expires: 1 / 24 });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }

      if (response.data.statusCode === 400 || response.data.status === false) {
        dispatch(
          showMessage({
            title: response.data.message,
            variant: "error",
          })
        );
        successCbToken && successCbToken(response);
      }
    })
    .catch((error) => {
      console.log("err", error);
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
      dispatch(
        showMessage({
          title: error.data.message,
          variant: "error",
        })
      );
      successCbToken && successCbToken(error);
    });
};
