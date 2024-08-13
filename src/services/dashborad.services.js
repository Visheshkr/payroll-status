import axios from "axios";
import Cookies from "js-cookie";

export const GetDashValues = (body) => {
  return axios.post(
    `${process.env.REACT_APP_PREAUTH_API_URL}/dashboardvalues`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetDashFunctions = (body) => {
  return axios.post(
    `${process.env.REACT_APP_PREAUTH_API_URL}/dashboardfunction`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};
