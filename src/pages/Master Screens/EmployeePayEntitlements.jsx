import CachedIcon from "@mui/icons-material/Cached";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SearchIcon from "@mui/icons-material/Search";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import axiosClient from "../../utils/AxiosInterceptor";
import dayjs from "dayjs";
import { useFormik } from "formik";

import React, { useEffect, useState } from "react";

import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import { NoBackpackSharp } from "@mui/icons-material";

const EmployeePayEntitlements = () => {
  const pageName = "Employee Pay Entitlement";
  const searchSectionName = "Assign / De-Assign";
  useTitle(pageName);
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [groupMenu, setGroupMenu] = useState([]);
  const [officeMenu, setOfficeMenu] = useState([]);
  const [employeeMenu, setEmployeeMenu] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [employeePersonalDetails, setEmployeePersonalDetails] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const row_data = [];
  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    office: "",
    group: "",
    employee: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setIsFilter(false);
      setIsLoader(true);
      axiosClient
        .get(
          `${process.env.REACT_APP_PAYROLL_API_URL}/employee/pay-entitlement/${formik.values.employee.empRefNo}`
        )
        .then((response) => {
          if (response.data?.result?.length === 0)
            showSnackbar("No Data found", "warning");
          let responseData = response.data?.result;
          console.log("Response Data emp::", responseData);
          setEmployeeDetails(responseData);
          // setOriginalRows(responseData);
        })
        .catch((error) => {
          if (error?.response) {
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
          }
          setEmployeeDetails([]);
        })
        .finally(() => {
          setIsFilter(true);
          setIsLoader(false);
        });
      ////////////////////////////////////////////////////
      setIsLoader(true);
      axiosClient
        .get(
          `${process.env.REACT_APP_PAYROLL_API_URL}/employee/personal-details/${formik.values.employee.empRefNo}`
        )
        .then((response) => {
          if (response.data?.result?.length === 0)
            showSnackbar("No Data found", "warning");
          let responseData = response.data?.result;
          console.log("Response Data per::", responseData);
          setEmployeePersonalDetails(responseData);
          // setOriginalRows(responseData);
        })
        .catch((error) => {
          if (error?.response) {
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
          }
          setEmployeePersonalDetails([]);
        })
        .finally(() => {
          setIsFilter(true);
          setIsLoader(false);
        });
    },
  });
  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        const responseData = response?.data?.result?.offices;
        const officeDropdownData = responseData.map((item) => ({
          id: item.typeId,
          label: item.typeName,
        }));
        setOfficeMenu(officeDropdownData);
      })
      .catch((error) => {
        showSnackbar(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
          "error"
        );
        setOfficeMenu([]);
      });
  }, []);
  const handleReset = () => {
    formik.resetForm();
    setEmployeeDetails([]);
    setEmployeePersonalDetails([]);
    // setRows(originalRows);
  };

  const columns = [
    {
      field: "index",
      headerName: "Sr No.",
      flex: 0.1,
      minWidth: 60,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "payHeadName",
      headerName: "Pay Head Name",
      flex: 0.3,
      minWidth: 250,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "payHeadFormula",
    //   headerName: "Pay Head Formula",
    //   flex: 0.3,
    //   minWidth: 135,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "payHeadValue",
      headerName: "Pay Head Value",
      flex: 0.3,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <>
      <Card>
        <Typography variant="h4">
          <FilterAltIcon sx={{ fontSize: "25px", color: "#246cb5" }} />
          &nbsp;Search Employee
        </Typography>
        <CardContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="office"
                  name="office"
                  size="small"
                  options={officeMenu}
                  value={
                    officeMenu.find(
                      (option) => option.id === formik.values.office?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("office", null);
                      formik.setFieldValue("group", "");
                      formik.setFieldValue("employee", "");
                      setEmployeeDetails([]);
                      setEmployeePersonalDetails([]);
                    } else {
                      setEmployeeDetails([]);
                      setEmployeePersonalDetails([]);
                      formik.setFieldValue("group", "");
                      formik.setFieldValue("employee", "");
                      formik.setFieldValue("office", value);
                      setIsLoader(true);
                      axiosClient
                        .get(
                          `${process.env.REACT_APP_PAYROLL_API_URL}/getGroupsListByOffice/${value.id}`
                        )
                        .then((response) => {
                          const responseData = response?.data?.result;
                          const officeDropdownData = responseData.map(
                            (item) => ({
                              id: item.typeId,
                              label: item.typeName,
                            })
                          );
                          setGroupMenu(officeDropdownData);
                        })
                        .catch((error) => {
                          showSnackbar(
                            error?.response?.data?.message
                              ? error?.response?.data?.message
                              : error?.message,
                            "error"
                          );
                          setGroupMenu([]);
                        })
                        .finally(() => setIsLoader(false));
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Office"
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.office && formik.touched.office
                          ? formik.errors.office
                          : null
                      }
                      error={
                        formik.errors.office && formik.touched.office
                          ? true
                          : false
                      }
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="group"
                  name="group"
                  size="small"
                  options={groupMenu}
                  value={
                    groupMenu.find(
                      (option) => option.id === formik.values.group?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("group", null);
                      formik.setFieldValue("employee", "");
                      setEmployeeDetails([]);
                      setEmployeePersonalDetails([]);
                    } else {
                      setEmployeeDetails([]);
                      setEmployeePersonalDetails([]);
                      formik.setFieldValue("employee", "");
                      formik.setFieldValue("group", value);
                      setIsLoader(true);
                      axiosClient
                        .get(
                          `${process.env.REACT_APP_PAYROLL_API_URL}/employee/getEmpByGrpCode/${value.id}`
                        )
                        .then((response) => {
                          const responseData = response?.data?.result;
                          const officeDropdownData = responseData.map(
                            (item) => ({
                              id: item.empId,
                              label: item.empName,
                              empRefNo: item.empRefNo,
                            })
                          );
                          setEmployeeMenu(officeDropdownData);
                        })
                        .catch((error) => {
                          showSnackbar(
                            error?.response?.data?.message
                              ? error?.response?.data?.message
                              : error?.message,
                            "error"
                          );
                          setEmployeeMenu([]);
                        })
                        .finally(() => setIsLoader(false));
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Group"
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.group && formik.touched.group
                          ? formik.errors.group
                          : null
                      }
                      error={
                        formik.errors.group && formik.touched.group
                          ? true
                          : false
                      }
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  size="small"
                  id="employee"
                  name="employee"
                  options={employeeMenu}
                  value={
                    employeeMenu.find(
                      (value) => value.id === formik.values.employee?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value == null) {
                      setEmployeeDetails([]);
                      setEmployeePersonalDetails([]);
                      formik.setFieldValue("employee", null);
                    } else {
                      setEmployeeDetails([]);
                      setEmployeePersonalDetails([]);
                      formik.setFieldValue("employee", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employee"
                      onBlur={formik.handleBlur}
                    />
                  )}
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

      {employeeDetails?.length !== 0 && employeePersonalDetails?.length !== 0 ? (
        <Card>
          <Typography variant="h4">
            <ReceiptLongIcon sx={{ fontSize: "25px", color: "#246cb5" }} />
            &nbsp;Employee Pay Entitlement Detail
          </Typography>
          <CardContent
            style={{
              background: "#e3f2fd",
              border: "1px",
              borderRadius: "10px",
            }}
          >
            <Grid container spacing={0} sx={{ mb: 2 }}>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Employee Id :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeeDetails.empId}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  GPF / PRAN No. :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.gpfPranNo}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Employee Name :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.firstName}&nbsp;
                  {employeePersonalDetails?.middleName}&nbsp;
                  {employeePersonalDetails?.lastName}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Date of Birth :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.dob}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Designation :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.currentDsgnId?.label}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Office :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.currentOffice?.officeName}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Mobile Number :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.personalMobileNo}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Service Type :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.serviceType?.label}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Group :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.grpId?.label}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Pay Commission :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeeDetails?.payCommission?.label}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Pay Level :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeeDetails?.paylevel?.label}
                </Typography>
              </Grid>
              {/* <Grid xs={12} sm={4} display="flex">
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Vehicle Allotted :
              </Typography>
              <Typography variant="subtitle1">&nbsp;</Typography>
            </Grid> */}

              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  CTA Entitlement :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeeDetails?.ctaEntitlement?.label?(employeeDetails?.ctaEntitlement?.label):("No")}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Govt. Quarter Occupied :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;
                  {employeePersonalDetails?.quarterType?.label
                    ? employeePersonalDetails?.quarterType?.label
                    : "No"}
                </Typography>
              </Grid>
             {
              employeePersonalDetails?.quarterType?.label?(
                <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  HRA Tier :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeeDetails?.hraTier?.label}
                </Typography>
              </Grid>
              ):null
             }
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Disabled :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeePersonalDetails?.isDisabled ? "Yes" : "No"}
                </Typography>
              </Grid>
              {employeePersonalDetails?.isDisabled ? (
                <Grid xs={12} sm={4} display="flex">
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Percentage of Disability :
                  </Typography>
                  <Typography variant="subtitle1">
                    &nbsp;
                    {
                      employeePersonalDetails?.empDisabilityList
                        ?.map(item=>(
                          item?.disabilityPercent +"%  "

                        ))
                    }
                  </Typography>
                </Grid>
              ) : null}

              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  DA Stop :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{employeeDetails?.isDaStop ? "Yes" : "No"}
                </Typography>
              </Grid>
              {/* <Grid xs={12} sm={4} display="flex">
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Effective From :
              </Typography>
              <Typography variant="subtitle1">&nbsp;{}</Typography>
            </Grid> */}
            </Grid>
          </CardContent>

          <hr></hr>
          <Grid container spacing={0} sx={{ mb: 2 }}>
            <Grid xs={12} sm={6}>
              <CardContent>
                <Typography variant="h4" sx={{marginBottom:"-0.1rem" }}>
                  <ReceiptLongIcon
                    sx={{ fontSize: "25px", color: "#246cb5" }}
                  />
                  &nbsp;Earning
                </Typography>

                <SearchTable
                  columns={columns}
                  data={
                    employeeDetails?.paymentPayhead?.map((item, index) => ({
                      payHeadName: item?.payheadName,
                      payHeadFormula: item?.payheadFormula,
                      payHeadValue: item?.payheadValue,
                      index: index + 1,
                    })) || []
                  }
                  isCheckbox={false}
                  isHideDensity={false}
                  isHideExport={false}
                  isHideFilter={false}
                  isHideColumn={false}
                  isHidePaging={false}
                  name="earningTable"
                  id="earningTable"
                />
              </CardContent>
            </Grid>
            <Grid xs={12} sm={6}>
              <CardContent>
                <Typography variant="h4" sx={{marginBottom:"-0.1rem" }}>
                  <ReceiptLongIcon
                    sx={{ fontSize: "25px", color: "#246cb5",}}
                  />
                  &nbsp;Deduction
                </Typography>

                <SearchTable
                  columns={columns}
                  data={
                    employeeDetails?.deductionPayhead?.map((item, index) => ({
                      payHeadName: item?.payheadName,
                      payHeadFormula: item?.payheadFormula,
                      payHeadValue: item?.payheadValue,
                      index: index + 1,
                    })) || []
                  }
                  isCheckbox={false}
                  isHideDensity={false}
                  isHideExport={false}
                  isHideFilter={false}
                  isHideColumn={false}
                  isHidePaging={false}          
                  name="deductionTable"
                  id="deductionTable"
                />
              </CardContent>
            </Grid>
          </Grid>

          <CardContent
            style={{
              background: "#e3f2fd",
              border: "1px",
              borderRadius: "10px",
            }}
          >
            <Grid container spacing={0} sx={{ mb: 1, mt: 2 }}>
              {/* <Grid xs={12} sm={6} display="flex">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Net Recovery :
                  </Typography>
                  <Typography variant="subtitle1">&nbsp; 0</Typography>
                </Grid> */}
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold">
                  Net Earning :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{" "}
                  {employeeDetails?.paymentPayhead?.reduce(
                    (sum, item) => sum + item.payheadValue,
                    0
                  )}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold">
                  Net Deduction :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{" "}
                  {employeeDetails?.deductionPayhead?.reduce(
                    (sum, item) => sum + item.payheadValue,
                    0
                  )}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4} display="flex">
                <Typography variant="subtitle1" fontWeight="bold">
                  Net Salary :
                </Typography>
                <Typography variant="subtitle1">
                  &nbsp;{" "}
                  {employeeDetails?.paymentPayhead?.reduce(
                    (sum, item) => sum + item.payheadValue,
                    0
                  ) -
                    employeeDetails?.deductionPayhead?.reduce(
                      (sum, item) => sum + item.payheadValue,
                      0
                    )}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <>
          <Alert severity="warning">
            <Typography>
              Please select values to fetch Employee Pay Entitlement Detail!
            </Typography>
          </Alert>
        </>
      )}
    </>
  );
};
export default EmployeePayEntitlements;
