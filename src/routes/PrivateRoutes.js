import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSnackbar } from "../components/Snackbar";
import { useEffect } from "react";

const PrivateRoutes = () => {

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // const token = Cookies.get("jobToken");
  const token = Cookies.get("token");
  
  useEffect(() => {
    if (!token)
    {
      showSnackbar("Session Expired!", 'error');
      localStorage.clear();
      navigate("/");
    }

  }, [token]);
  
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
