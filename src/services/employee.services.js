import axios from "axios";
import Cookies from "js-cookie";

export const getOrganizations = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/organization`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getDropdowns = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/initiate-dropdown`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getDepartmentDropdown = (schemeId) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/department/${schemeId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getDesignationDropdown = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/designation`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getRegularOrIncharge = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/regularOrIncharge`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getSchemeList = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/getSchemeList`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const getExperienceDetails = () => {
  return axios.get(
    `${
      process.env.REACT_APP_MASTER_API_URL
    }/employee-enrollment/experienceDetails/${localStorage.getItem("userId")}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const AddExperienceData = (body) => {
  // let newBody = [];
  // body.map((row) => {
  //   let bodyObj = {
  //     userId: row["userId"],
  //     orgId: row["orgId"],
  //     orgName: row["orgName"],
  //     schemeId: row["schemeId"],
  //     deptId: row["deptId"],
  //     desgnId: row["desgnId"],
  //     designationName: row["designationName"],
  //     regularOrIncharge: row["regularOrIncharge"],
  //     startDate: row["startDate"],
  //     endDate: row["endDate"],
  //     isCurrentDesignation: row["isCurrentDesignation"],
  //     filePath: row["filePath"],
  // if(showNext===true){
  //   bodyObj.empExpId = row["empExpId"]
  //  }

  //   };
  //   newBody.push(bodyObj);
  // });

  return axios.post(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/experienceDetails`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetActionsButtons = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/admin-actions`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const SaveDYAdminAction = (body) => {
  return axios.post(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/admin-action-response`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetEnrollmentStatus = (id) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/check-enrollment-status/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetAllMenu = () => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/menu-master/init`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const AddMenu = (body) => {
  return axios.post(
    `${process.env.REACT_APP_MASTER_API_URL}/user/create-menu`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const DeleteMenu = (id, userId) => {
  return axios.delete(
    `${process.env.REACT_APP_MASTER_API_URL}/user/remove-menu/${id}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetMenuRights = (id) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/roleMenuRightMap/init/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetUserRoles = (id) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/getAllActiveUsers`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetUserRole = (id) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/getRoleByUserid/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const DeleteUserRoleMap = (roleMapId, updatedByUserID) => {
  return axios.delete(
    `${process.env.REACT_APP_MASTER_API_URL}/user/usrRoleMap/remove/${roleMapId}/${updatedByUserID}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const SaveUserRoleMap = (body) => {
  return axios.post(
    `${process.env.REACT_APP_MASTER_API_URL}/user/usrRoleMap/save`,
    body,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};

export const GetDeptAndDesg = (id) => {
  return axios.get(
    `${process.env.REACT_APP_MASTER_API_URL}/user/getdeptDesgListBy/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
};
