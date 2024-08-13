import axios from "axios";
import Cookies from "js-cookie";

export const checkUserName = (name) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/checkUsrNameExist/${name}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const CreateUser = (body) => {
  return axios.post(
    `${process.env.REACT_APP_MASTER_API_URL}/user/create-user`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getDeptDropdown = (schemeId) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/getDeptListBy/${schemeId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getDesgDropdown = (schemeId, deptId) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/getDesgListBy/${schemeId}/${deptId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getAllActiveUsers = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/getAllActiveUsers`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getSingleUser = (userId) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/get-user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getSchemeDeptDesgInit = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/scheme-dept-desg/init`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const saveSchemeDeptDesgMapping = (body) => {
  return axios.post(
    `${process.env.REACT_APP_MASTER_API_URL}/user/scheme-dept-desg/save`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const removeSchemeDeptDesgMapping = (id, userId) => {
  return axios.delete(
    `${process.env.REACT_APP_MASTER_API_URL}/user/scheme-dept-desg/remove/${id}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getDesignationInit = () => {
  return axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/create-init`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
};
