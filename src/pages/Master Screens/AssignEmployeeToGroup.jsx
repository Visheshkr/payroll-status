import CachedIcon from "@mui/icons-material/Cached";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SearchIcon from "@mui/icons-material/Search";
import axiosClient from "../../utils/AxiosInterceptor";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../../components/Loader";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import useTitle from "../../hooks/useTitle";
import * as yup from "yup";

const ViewIndentRequest = () => {
  const pageName = "Assign Employee To Group";
  const searchSectionName = "Assign / De-Assign";
  useTitle(pageName);
  const { showSnackbar } = useSnackbar();
  const [rowss, setRowss] = useState([]);
  const [searchRowss, setSearchRowss] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [officeMenu, setOfficeMenu] = useState([]);
  const [officeId, setOfficeId] = useState([]);
  const [searchOfficeId, setSearchOfficeId] = useState([]);
  const [serviceTypeMenu, setServiceTypeMenu] = useState([]);
  const [departmentMenu, setDepartmentMenu] = useState([]);
  const [groupMenu, setGroupMenu] = useState([]);
  const [searchGroupMenu, setSearchGroupMenu] = useState([]);
  const [departmentId, setDepartmentId] = useState([]);
  const [designationMenu, setDesignationMenu] = useState([]);
  const [flag, setFlag] = useState(false);
  const [searchWork , setSearchWork] = useState(false);
  const initialValues = {
    officeName: "",
    empId: "",
    groupId: "",
  };

  const searchValidationSchema = yup.object({
    searchOfficeName : yup.object().nullable().required('Office Name is required'),
  })
 
  const searchFormik = useFormik({
    initialValues:{
      searchOfficeName:"",
      searchServiceType:"",
      searchDeptName:"",
      searchDesgName:"",
      searchGroupId:"",
      searchEmployeeName:"",
    },
    validationSchema:searchValidationSchema,
    onSubmit:(values) =>{
        handleSearchGetData();
    }
  })

  const formik = useFormik({
    initialValues,
  });

  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        if (response.data?.result?.length === 0) {
          showSnackbar("No data found", "warning");
        } else {
          let responseOfficeData = response.data?.result?.offices?.map(
            (value, index) => {
              let rowData = {
                id: value.typeId,
                label: value.typeName,
              };
              return rowData;
            }
          );
          setOfficeMenu(responseOfficeData);

          let responseServiceTypeData = response.data?.result?.serviceType?.map(
            (value, index) => {
              let rowData = {
                id: value.typeId,
                label: value.typeName,
              };
              return rowData;
            }
          );
          setServiceTypeMenu(responseServiceTypeData);

          let responseDepartmentData = response.data?.result?.departments?.map(
            (value, index) => {
              let rowData = {
                id: value.deptId,
                label: value.name,
              };
              return rowData;
            }
          );
          setDepartmentMenu(responseDepartmentData);
        }
      })
      .catch((error) => {
        showSnackbar(
          error.response.data.message
            ? error.response.data.message
            : error.response.message,
          "error"
        );
      })
      .finally(() => setIsLoader(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (officeId.id) {
      setIsLoader(true);
      axiosClient
        .get(
          `${process.env.REACT_APP_PAYROLL_API_URL}/employee/dropdown/group/${officeId.id}`
        )
        .then((response) => {
          if (response.data?.length === 0) {
            showSnackbar("No data found for Group", "warning");
            setGroupMenu([]);
          } else {
            setGroupMenu(response.data);
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        })
        .finally(() => setIsLoader(false));
    }
  }, [officeId]);

  useEffect(() => {
    if (searchOfficeId.id) {
      setIsLoader(true);
      axiosClient
        .get(
          `${process.env.REACT_APP_PAYROLL_API_URL}/employee/dropdown/group/${searchOfficeId.id}`
        )
        .then((response) => {
          if (response.data?.length === 0) {
            showSnackbar("No data found for Group", "warning");
            setSearchGroupMenu([]);
          } else {
            setSearchGroupMenu(response.data);
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        })
        .finally(() => setIsLoader(false));
    }
  }, [searchOfficeId]);

 
  useEffect(() => {
    if (departmentId !== null)
      if (departmentId.id) {
        setIsLoader(true);
        axiosClient
          .get(
            `${process.env.REACT_APP_PAYROLL_API_URL}/getDesgByDept/${departmentId.id}`
          )
          .then((response) => {
            if (response.data?.result?.length === 0) {
              showSnackbar("No data found for Designation Menu", "warning");
              setDesignationMenu([]);
            } else {
              let responseData = response.data?.result?.map((value, index) => {
                let rowData = { ...value, index: index + 1 };

                return rowData;
              });
              setDesignationMenu(
                responseData.map((item, index) => ({
                  id: item.typeId,
                  label: item.typeName,
                })));
            }
          })
          .catch((error) => {
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
          })
          .finally(() => setIsLoader(false));
      }
  }, [departmentId]);

  const handleSearchGetData = () => {
    if (searchOfficeId.id) {
      setSearchWork(true);
      setIsLoader(true);
        let postData = {
          dsgnId: searchFormik.values.searchDesgName?.id || null,
          serviceType: searchFormik.values.searchServiceType?.id || null,
          grpId: searchFormik.values.searchGroupId?.id || null,
          officeId: searchFormik.values.searchOfficeName?.id,
          empId: searchFormik.values.searchEmployeeName || null
        }
      axiosClient
        .post(`${process.env.REACT_APP_PAYROLL_API_URL}/getEmpGrpMapping`,postData)
        .then((response) => {
          if (
            response.data?.result?.length === 0 ||
            response.data.result === null
          ) {
            showSnackbar("No data found", "warning");
            setSearchRowss([]);
          } else {
              setSearchRowss(response.data.result);
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        })
        .finally(() => setIsLoader(false));
    }
  };

  const handleGetData = () => {
    if (officeId?.id) {
      setIsLoader(true);
        let postData = {
          dsgnId: null,
          serviceType: null,
          grpId: null,
          officeId: officeId.id,
      }
      axiosClient
        .post(`${process.env.REACT_APP_PAYROLL_API_URL}/getEmpGrpMapping`,postData)
        .then((response) => {
          if (
            response.data?.result?.length === 0 ||
            response.data.result === null
          ) {
            showSnackbar("No data found", "warning");
            setRowss([]);
          } else {
            setRowss(response.data.result);
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        })
        .finally(() => setIsLoader(false));
    }
  };


  useEffect(() => {
    handleGetData();
  }, [officeId]);

  const handleReset = () => {
    setDepartmentId([]);
    setSearchRowss([]);
    setDesignationMenu([]);
    setSearchGroupMenu([]);
    setSearchWork(false);
    searchFormik.resetForm();
  };

  const handleChange = async (event, params) => {
    if (!formik.values.groupId && !params.assignedStatus) {
        showSnackbar("Please select group name first then click on the checkbox to assign the group!", "warning");
        if (formik.values.groupId){
          callConfirmDialog(params, event);
        }
    } else {
      callConfirmDialog(params, event);
    }
  };

  const callConfirmDialog = async (params, event) => {
    const [action] = await AlertConfirm({
      title: "Confirm",
      desc: "Are you sure, you want to submit?",
    });
    AlertConfirm.config({
      okText: "Submit",
      cancelText: "Cancel",
    });
    if (action) {
      submitDetails(params, event);
    } else {
      showSnackbar("Did not save!", "error");
    }
  };

  const submitDetails = async (params, event) => {
    let payload;
    if (params.groupId) {
      payload = {
        empId: params.empCode,
        grpId: params.groupId,
        isActive: !params.assignedStatus,
      };
    } else {
      payload = {
        empId: params.empCode,
        grpId: formik.values.groupId.id,
        isActive: !params.assignedStatus,
      };
    }

    try {
      const response = await axiosClient.post(
        `${process.env.REACT_APP_PAYROLL_API_URL}/saveEmpGrpMapping`,
        payload
      );
      showSnackbar("Saved Succesfully", "success");
      if (response?.data?.status) {
        handleGetData();
        if(searchOfficeId.id) handleSearchGetData();
        setFlag(false);
        formik.setFieldValue("groupId", "");
      }
    } catch (error) {
      showSnackbar("Failed", "error");
    }
  };

  const columns = [
    {
      field: "index",
      headerName: "Sr No.",
      flex: 0.1,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "pran",
      headerName: "GPF / PRAN",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "empName",
      headerName: "Employee Name",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "empRefNumber",
      headerName: "Employee Id",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "office",
      headerName: "Office",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "groupName",
      headerName: "Group",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "assignedStatus",
      headerName: "Assign / De-Assign",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <FormGroup>
              <FormControlLabel
                sx={{ m: "auto" }}
                control={
                  <Checkbox
                    checked={params.row.assignedStatus}
                    onClick={
                      !flag ? (event) => handleChange(event, params.row) : null
                    }
                  />
                }
                label="Assign / De-Assign"
              />
            </FormGroup>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      flex: 0.3,
      minWidth: 180,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            {/* <Button
              variant="contained"
              sx={{
                color: "black",
                backgroundColor: "white",
                ":hover": { color: "black", backgroundColor: "white" },
                borderRadius: "4px",
              }}
              endIcon={<EditIcon />}
              size="small"
              onClick={() => handleEdit(params.row.index)}
            >
              Edit
            </Button> */}

            {/* <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#286cb4",
                ":hover": { color: "white", backgroundColor: "#286cb4" },
                borderRadius: "4px",
              }}
              startIcon={<DeleteIcon />}
              size="small"
              onClick={() => handleDelete(params.row.index)}
            >
              Delete
            </Button> */}
          </Stack>
        );
      },
    },
  ];
  return (
    <>
    {isLoader && <Loader/>}
      <Card>
        <Typography variant="h4">
          <FilterAltIcon sx={{ fontSize: "25px", color: "#246cb5" }} />
          &nbsp;Filter By
        </Typography>
        <CardContent>
        <Alert severity='warning' sx={{ mb:3 }}>
          Note:- Select office name and click search button for getting the list of all employees working in that office .
        </Alert> 
          <Box component="form" onSubmit={searchFormik.handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={12} sm={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="searchOfficeName"
                  name="searchOfficeName"
                  size="small"
                  options={officeMenu}
                  value={
                    officeMenu.find(
                      (option) =>
                        option.id === searchFormik.values.searchOfficeName?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      searchFormik.setFieldValue("searchOfficeName", null);
                    } else {
                      setSearchOfficeId(value);
                      searchFormik.setFieldValue("searchOfficeName", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Office Name"
                      placeholder="Select Office Name"
                      onBlur={searchFormik.handleBlur}
                      helperText={
                        searchFormik.errors.searchOfficeName &&
                        searchFormik.touched.searchOfficeName
                          ? searchFormik.errors.searchOfficeName
                          : null
                      }
                      error={
                        searchFormik.errors.searchOfficeName &&
                        searchFormik.touched.searchOfficeName
                      }
                      required
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  size="small"
                  id="searchServiceType"
                  name="searchServiceType"
                  options={serviceTypeMenu}
                  value={
                    serviceTypeMenu.find(
                      (value) => value.id === searchFormik.values.searchServiceType?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value == null) {
                      searchFormik.setFieldValue("searchServiceType", null);
                    } else {
                      searchFormik.setFieldValue("searchServiceType", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Service Type"
                      placeholder="Select Service Type Name"
                      onBlur={searchFormik.handleBlur}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="searchDeptName"
                  name="searchDeptName"
                  size="small"
                  options={departmentMenu}
                  value={
                    departmentMenu.find(
                      (option) => option.id === searchFormik.values.searchDeptName?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      searchFormik.setFieldValue("searchDeptName", null);
                    } else {
                      setDepartmentId(value);
                      searchFormik.setFieldValue("searchDeptName", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department Name"
                      placeholder="Select Department Name"
                      onBlur={searchFormik.handleBlur}
                      helperText={
                        searchFormik.errors.searchDeptName &&
                        searchFormik.touched.searchDeptName
                          ? searchFormik.errors.searchDeptName
                          : null
                      }
                      error={
                        searchFormik.errors.searchDeptName &&
                        searchFormik.touched.searchDeptName
                      }
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="searchDesgName"
                  name="searchDesgName"
                  size="small"
                  disabled={!departmentId.id}
                  options={designationMenu}
                  value={
                    designationMenu.find(
                      (option) => option.id === searchFormik.values.searchDesgName?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      searchFormik.setFieldValue("searchDesgName", null);
                    } else {
                      searchFormik.setFieldValue("searchDesgName", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Designation"
                      placeholder="Select Designation Name"
                      onBlur={searchFormik.handleBlur}
                      helperText={
                        searchFormik.errors.searchDesgName && searchFormik.touched.searchDesgName
                          ? searchFormik.errors.searchDesgName
                          : null
                      }
                      error={
                        searchFormik.errors.searchDesgName && searchFormik.touched.searchDesgName
                      }
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="searchGroupId"
                  name="searchGroupId"
                  size="small"
                  disabled={!searchOfficeId.id || searchGroupMenu.length === 0}
                  options={searchGroupMenu}
                  value={
                    searchGroupMenu.find(
                      (option) => option.id === searchFormik.values.searchGroupId?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      searchFormik.setFieldValue("searchGroupId", null);
                    } else {
                      searchFormik.setFieldValue("searchGroupId", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Group"
                      onBlur={searchFormik.handleBlur}
                      helperText={
                        searchFormik.errors.searchGroupId && searchFormik.touched.searchGroupId
                          ? searchFormik.errors.searchGroupId
                          : null
                      }
                      error={
                        searchFormik.errors.searchGroupId && searchFormik.touched.searchGroupId
                      }
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={8}>
                <TextField
                  margin="normal"
                  fullWidth
                  type="text"
                  id="searchEmployeeName"
                  name="searchEmployeeName"
                  label="Employee ID"
                  size="small"
                  sx={{ mt: -0.1 }}
                  value={searchFormik.values.searchEmployeeName}
                  onChange={searchFormik.handleChange}
                  onBlur={searchFormik.handleBlur}
                  error={
                    searchFormik.touched.searchEmployeeName &&
                    !!searchFormik.errors.searchEmployeeName
                  }
                  helperText={
                    searchFormik.touched.searchEmployeeName &&
                    searchFormik.errors.searchEmployeeName
                  }
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{ mr: { xs: 1, sm: 1 } }}
              >
                Search&nbsp;
                <SearchIcon />
              </Button>
              <Button variant="outlined" type="button" onClick={handleReset}>
                Reset&nbsp;
                <CachedIcon />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <Typography variant="h4">
          <ReceiptLongIcon sx={{ fontSize: "25px", color: "#246cb5" }} />
          &nbsp;{searchSectionName}
        </Typography>
        <CardContent>
        <Alert severity='warning' sx={{ mb:3 }}>
          Note:- Select office name for getting the list of all employees working in that office.
        </Alert>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="officeName"
                  name="officeName"
                  size="small"
                  options={officeMenu}
                  value={
                    officeMenu.find(
                      (option) => option.id === formik.values.officeName?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("officeName", null);
                    } else {
                      setOfficeId(value);
                      formik.setFieldValue("officeName", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Office Name"
                      placeholder="Select Office Name"
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.officeName && formik.touched.officeName
                          ? formik.errors.officeName
                          : null
                      }
                      error={
                        formik.errors.officeName && formik.touched.officeName
                      }
                      required
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="groupId"
                  name="groupId"
                  disabled={!officeId.id || groupMenu.length === 0}
                  size="small"
                  options={groupMenu}
                  value={
                    groupMenu.find(
                      (option) => option.id === formik.values.groupId?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("groupId", null);
                    } else {
                      formik.setFieldValue("groupId", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Group"
                      placeholder="Select Group Name"
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.groupId && formik.touched.groupId
                          ? formik.errors.groupId
                          : null
                      }
                      error={
                        formik.errors.groupId && formik.touched.groupId
                      }
                      required
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <SearchTable
            columns={columns}
            data={searchWork ? searchRowss : rowss}
            isCheckbox={false}
            isHideDensity={false}
            isHideExport={true}
            isHideFilter={false}
            isHideColumn={false}
            isHidePaging={false}
            name="IndentRequestTable"
            id="IndentRequestTable"
          />
        </CardContent>
      </Card>
    </>
  );
};
export default ViewIndentRequest;
