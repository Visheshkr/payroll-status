import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Loader from "../../components/Loader";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import cookies from "js-cookie";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchIcon from "@mui/icons-material/Search";
import "react-alert-confirm/lib/style.css";
import { useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const PayHeadServiceTypeMapping = () => {
  const Token = cookies.get("token");
  const [rowss, setRowss] = useState([]);
  const [searchRowss, setSearchRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  const [serviceTypeMenu, setServiceTypeMenu] = useState([]);
  const [serviceTypeId, setServiceTypeId] = useState([]);
  const [headTypeMenu, setHeadTypeMenu] = useState([]);
  const [headNameMenu, setHeadNameMenu] = useState([]);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchWork, setSearchWork] = useState(false);
  const [searchBtnText, setSearchBtnText] = useState("Search");
  const { showSnackbar } = useSnackbar();
  const [showConfig, setShowConfig] = useState(false);
  const title = " Pay Head Service Type Mapping ";
  const targetRef = useRef(null);

  useTitle(title);

  const validationSchema = yup.object({
    serviceType: yup.object().nullable().required("Service Type is required"),
    headType: yup.object().nullable().required("Head Type is required"),
    headName: yup.object().nullable().required("Head Name is required"),
    isActive: yup.bool().required("Is Active is required"),
  });
  const searchValidationSchema = yup.object({
    searchServiceType: yup
      .object()
      .nullable()
      .required("Service Type is required"),
  });

  const searchFormik = useFormik({
    initialValues: {
      searchServiceType: "",
    },
    validationSchema: searchValidationSchema,
    onSubmit: (values) => {
      handleGetSearchData();
    },
  });

  const formik = useFormik({
    initialValues: {
      serviceType: "",
      headType: "",
      headName: "",
      payHeadCode:"",
      effectiveFrom:null,
      isActive: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          id: editRowId,
          payHeadType:formik.values.headType?.id,
          serviceType: null,
          serviceTypeId: formik.values.serviceType?.id,
          isActive: formik.values.isActive,
          payheadId: formik.values.headName?.id,
          effectiveFrom:
            dayjs(
              new Date(
                Date.parse(formik.values.effectiveFrom)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD") !== "Invalid Date"
              ? dayjs(
                  new Date(
                    Date.parse(formik.values.effectiveFrom)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD")
              : null,
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/savePayHeadServTypeMapping`,
            postData
          )
          .then((response) => {
            if (response.data.statusCode === 200) {
              if (response.data.result === "") {
                showSnackbar("Record already exits", "warning");
              } else {
               
                showSnackbar(response.data?.message, "success");
                setBtnText("Save");
                formik.resetForm();
                handleGetData();;
              }
            } else {
              setBtnText("Update");
              showSnackbar(response.data?.message, "error");
            }
          })
          .catch((error) => {
            console.log(error);
            setBtnText("Update");
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
          })
          .finally(() => {
            setIsSubmitted(false);
          });
      } else {
        setBtnText("Saving");
        let postData = {
          id: null,
          serviceType: null,
          payHeadType: formik.values.headType?.id,
          serviceTypeId: formik.values.serviceType?.id,
          isActive: formik.values.isActive,
          payheadId: formik.values.headName?.id,
          effectiveFrom:
            dayjs(
              new Date(
                Date.parse(formik.values.effectiveFrom)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD") !== "Invalid Date"
              ? dayjs(
                  new Date(
                    Date.parse(formik.values.effectiveFrom)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD")
              : null,
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/savePayHeadServTypeMapping`,
            postData
          )
          .then((response) => {
            if (response.data.statusCode === 200) {
              // if (response.data.result !== null) {
                // const rowData = {
                //   ...response.data.result,
                //   serviceType: response.data.result.serviceTypeId.serviceType,
                //   headType: response.data.result.payheadId.payHeadType.typeName,
                //   headName: response.data.result.payheadId.payheadName,
                //   headCode: response.data.result.payheadId.payheadCode,
                //   effectiveDate: dayjs(
                //     new Date(
                //       Date.parse(response.data.result?.effectiveFrom)
                //     )?.toLocaleDateString()
                //   ).format("YYYY-MM-DD"),
                //   isActive: response.data.result.isActive,
                // };
                // setRowss([rowData, ...rowss]);
              // }
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
              handleGetData();;
            } else {
              showSnackbar(response.data?.message, "error");
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
          .finally(() => {
            setBtnText("Save");
            setIsSubmitted(false);
          });
      }
    },
  });

  useEffect(() => {
    setIsLoader(true);
    handleGetData();
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        if (response.data?.result?.length === 0) {
          showSnackbar("No data found", "warning");
        } else {
          let responseHeadNameData = response.data?.result?.PayHeadType?.map(
            (value, index) => {
              let rowData = {
                id: value.typeId,
                label: value.typeName,
              };
              return rowData;
            }
          );
          setHeadTypeMenu(responseHeadNameData);
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
  }, []);

  const handleGetSearchData = () => {
    setSearchWork(true);
    setIsLoader(true);
    let postData;
    postData = {
      serviceTypeId: searchFormik.values.searchServiceType?.id,
    };
    axiosClient
      .post(
        `${process.env.REACT_APP_PAYROLL_API_URL}/getPayHeadServTypeMapping`,
        postData
      )
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data.result === null
        ) {
          showSnackbar("No data found", "warning");
          setSearchRowss([]);
        } else {
          const rowData = response.data.result.map((item, index) => ({
            ...item,
            serviceType: item.serviceType,
            headType: item.payHeadTypeValue,
            headName: item.payheadName,
            headCode: item.payheadCode,
            effectiveDate: dayjs(
              new Date(Date.parse(item?.effectiveFrom))?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            isActive: item.isActive,
          }));
          setSearchRowss(rowData);
        }
      })
      .catch((error) => {
        showSnackbar(
          error.response.data.message
            ? error.response.data.message
            : error.response.message,
          "error"
        );
        setRowss([]);
      })
      .finally(() => {
        setIsLoader(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleGetData = () => {
    setIsLoader(true);
    let postData;
    postData = {
      serviceTypeId: null,
    };
    axiosClient
      .post(
        `${process.env.REACT_APP_PAYROLL_API_URL}/getPayHeadServTypeMapping`,
        postData
      )
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data.result === null
        ) {
          showSnackbar("No data found", "warning");
          setSearchRowss([]);
        } else {
          const rowData = response.data.result.map((item, index) => ({
            ...item,
            serviceType: item.serviceType,
            headType: item.payHeadTypeValue,
            headName: item.payheadName,
            headCode: item.payheadCode,
            effectiveDate: dayjs(
              new Date(Date.parse(item?.effectiveFrom))?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            isActive: item.isActive,
          }));
          setRowss(rowData);
        }
      })
      .catch((error) => {
        showSnackbar(
          error.response.data.message
            ? error.response.data.message
            : error.response.message,
          "error"
        );
        setRowss([]);
      })
      .finally(() => {
        setIsLoader(false);
      });
  
  };

  

  const handleSearchCancel = () => {
    setSearchBtnText("Search");
    setSearchWork(false);
    searchFormik.resetForm();
  };

  const handleShowConfigurationForm = () => {
    setShowConfig(!showConfig);
  };

  const handleScroll = () => {
    setShowConfig(!showConfig);
    if (!showConfig) {
      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  };

  const handleCancel = () => {
    setBtnText("Save");
    setSelectedRow(null);
    formik.resetForm();
  };

  const handleEdit = (params, index) => {
    // console.log("params::",params);
    setSelectedRow(index - 1);
    setBtnText("Update");
    if (!showConfig) handleShowConfigurationForm();
    ///////////////////////////////////////////////////////////
    const selectedServiceType = serviceTypeMenu.find(
      (option) => option.label === params.serviceType
    );
    formik.setFieldValue("serviceType", selectedServiceType);
    //////////////////////////////////////////////////////////
    const selectedHeadType = headTypeMenu.find(
      (option) => option.label === params.payHeadTypeValue
    );
    formik.setFieldValue("headType", selectedHeadType);
    //////////////////////////////////////////////////////////
    const selectedHeadName = {
      id: params.payheadId,
      label: params.payheadName,
    };
    formik.setFieldValue("headName", selectedHeadName);
    //////////////////////////////////////////////////////////
    formik.setFieldValue("payHeadCode", params.payheadCode);
    //////////////////////////////////////////////////////////
    let effectiveFrom = dayjs(params.effectiveDate, "YYYY-MM-DD");
    formik.setFieldValue("effectiveFrom", effectiveFrom);
    /////////////////////////////////////////////////////////
    formik.setFieldValue("isActive", params.isActive);
    setEditRowId(params.id);
  };

  const handleChange = (event) => {
    formik.setFieldValue("isActive", event.target.checked);
  };

  const columns = [
    {
      minWidth: 40,
      headerClassName: "super-app-theme--header",
      headerName: "Sr No.",
      field: "index",
      flex: 0.1,
    },
    {
      minWidth: 160,
      headerClassName: "super-app-theme--header",
      headerName: "Service Type",
      field: "serviceType",
      flex: 0.2,
    },
    {
      minWidth: 120,
      headerClassName: "super-app-theme--header",
      headerName: "Head Type",
      field: "headType",
      flex: 0.2,
    },
    {
      minWidth: 250,
      headerClassName: "super-app-theme--header",
      headerName: "Head Name",
      field: "headName",
      flex: 0.2,
    },
    {
      minWidth: 130,
      headerClassName: "super-app-theme--header",
      headerName: "Head Code",
      field: "headCode",
      flex: 0.2,
    },
    {
      minWidth: 130,
      headerClassName: "super-app-theme--header",
      headerName: "Effective Date",
      field: "effectiveDate",
      flex: 0.2,
    },
    {
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      headerName: "Status",
      field: "isActive",
      flex: 0.1,
    },
    {
      minWidth: 80,
      headerClassName: "super-app-theme--header",
      headerName: "Action",
      field: "action",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            sx={{
              color: "black",
              backgroundColor: "white",
              ":hover": { color: "black", backgroundColor: "white" },
              borderRadius: "4px",
            }}
            endIcon={<EditIcon />}
            size="small"
            onClick={() => handleEdit(params.row, params.row.index)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {isLoader && <Loader />}

      <Card>
        <CardContent>
          <PageTitle name="Pay Head Service Type Mapping" />
          <Box component="form" onSubmit={searchFormik.handleSubmit}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  fullWidth
                  id="searchServiceType"
                  name="searchServiceType"
                  size="small"
                  options={serviceTypeMenu}
                  value={
                    serviceTypeMenu.find(
                      (option) =>
                        option.id === searchFormik.values.searchServiceType?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      searchFormik.setFieldValue("searchServiceType", null);
                    } else {
                      searchFormik.setFieldValue("searchServiceType", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2, mb: 1 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Service Type"
                      placeholder="Select Service Type"
                      onBlur={searchFormik.handleBlur}
                      helperText={
                        searchFormik.errors.searchServiceType &&
                        searchFormik.touched.searchServiceType
                          ? searchFormik.errors.searchServiceType
                          : null
                      }
                      error={
                        searchFormik.errors.searchServiceType &&
                        searchFormik.touched.searchServiceType
                          ? true
                          : false
                      }
                      required
                    />
                  )}
                />
              </Grid>
              <Box spacing={2} sx={{ mt: 2, ml: 3 }}>
                <Button
                  sx={{
                    minWidth: 100,
                    ml: 1,
                    mt: { xs: 1, md: 0 },
                  }}
                  variant="contained"
                  type="submit"
                >
                  {searchBtnText}
                  &nbsp;
                  <SearchIcon />
                </Button>
                <Button
                  type="button"
                  sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                  onClick={handleSearchCancel}
                  variant="outlined"
                >
                  <CachedIcon />
                  &nbsp;RESET
                </Button>
              </Box>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {/* /////////////////////////////////////////////////// */}
      <Grid container width="100%" sx={{ mb: 2 }}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
          gap={2}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ borderRadius: "4px",marginBottom:'2px' }}
            onClick={() => {
              handleScroll();
            }}
          >
            Add Pay Head Service Type{" "}
          </Button>
        </Grid>
      </Grid>
        {/* /////////////////////////////////////////////////// */}
             
       <Card>
        <CardContent>
          <div style={{ marginBottom: "-2%" }}>
            <PageTitle name="Pay Head Service Type Mapping List" />
          </div>
          <Box component={"div"} style={{ marginBottom: "-2%" }}>
            <SearchTable
              columns={columns}
              data={searchWork ? searchRowss : rowss}
              isCheckbox={false}
              isHideDensity={false}
              isHideExport={true}
              isHideFilter={true}
              isHideColumn={true}
              isHidePaging={false}
              name="villageName"
              id="villageName"
            />
          </Box>
        </CardContent>
      </Card>
      {/* /////////////////////////////////////////////////// */}
      
       
      {showConfig && (
        <>
          <Card ref={targetRef} sx={{ my: 2 }} elevation={5}>
            <CardContent>
              <PageTitle name={title} />
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={3}>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="serviceType"
                      name="serviceType"
                      size="small"
                      options={serviceTypeMenu}
                      value={
                        serviceTypeMenu.find(
                          (option) =>
                            option.id === formik.values.serviceType?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("serviceType", null);
                        } else {
                          setServiceTypeId(value);
                          formik.setFieldValue("serviceType", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Service Type"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.serviceType &&
                            formik.touched.serviceType
                              ? formik.errors.serviceType
                              : null
                          }
                          error={
                            formik.errors.serviceType &&
                            formik.touched.serviceType
                              ? true
                              : false
                          }
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="headType"
                      name="headType"
                      size="small"
                      options={headTypeMenu}
                      isOptionEqualToValue={(option, value) =>
                        option.label === value.label
                      }
                      value={
                        headTypeMenu.find(
                              (option) =>
                                option.id === formik.values.headType?.id
                            ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("headType", null);
                          formik.setFieldValue("headName","");
                          formik.setFieldValue("payHeadCode","");
                        } else {
                          formik.setFieldValue("headName","");
                          formik.setFieldValue("payHeadCode","");
                          formik.setFieldValue("headType", value);
                          axiosClient
                            .get(
                              `${process.env.REACT_APP_PAYROLL_API_URL}/getPayHeadDropdown/${value.id}`
                            )
                            .then((response) => {
                              if (response.data?.result?.length === 0) {
                                showSnackbar("No data found", "warning");
                              } else {
                                let responseHeadNameData =
                                  response.data?.result?.payHeadDropdown?.map(
                                    (value, index) => {
                                      let rowData = {
                                        id: value.typeId,
                                        label: value.typeName,
                                        typeCode:value.typeCode
                                      };
                                      return rowData;
                                    }
                                  );
                                setHeadNameMenu(responseHeadNameData);
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
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Head Type"
                          placeholder="Select Head Type"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.headType && formik.touched.headType
                              ? formik.errors.headType
                              : null
                          }
                          error={
                            formik.errors.headType && formik.touched.headType
                              ? true
                              : false
                          }
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Tooltip title={formik.values.headType?'':'First select Head Type'}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="headName"
                      name="headName"
                      size="small"
                      disabled={formik.values.headType?false:true}
                      options={headNameMenu}
                      isOptionEqualToValue={(option, value) =>
                        option.label === value.label
                      }
                      value={
                        formik.values?.headName
                          ? formik.values?.headName
                          : headNameMenu.find(
                              (option) =>
                                option.id === formik.values.headName?.id
                            ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("headName", null);
                        } else {
                          formik.setFieldValue("headName", value);
                          formik.setFieldValue("payHeadCode", value.typeCode);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Head Name"
                          placeholder="Select Head Name"
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.headName && !!formik.errors.headName
                          }
                          helperText={
                            formik.touched.headName && formik.errors.headName
                          }
                          
                        />
                      )}
                    />
                    </Tooltip>
                  </Grid>
                  <Grid xs={12} sm={4}>
                  <Tooltip title={formik.values.headName?'':'First select Head Name'}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="payHeadCode"
                      name="payHeadCode"
                      label="Head Code"
                      size="small"
                      disabled
                      value={formik.values.payHeadCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payHeadCode &&
                        !!formik.errors.payHeadCode
                      }
                      helperText={
                        formik.touched.payHeadCode && formik.errors.payHeadCode
                      }
                    />
                    </Tooltip>
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={"en-gb"}
                    >
                      <DatePicker
                        id="effectiveFrom"
                        sx={{ width: "100%", mt: 2 }}
                        name="effectiveFrom"
                        disablePast
                        format="DD/MM/YYYY"
                        value={formik.values.effectiveFrom}
                        onChange={(value) =>
                          formik.setFieldValue("effectiveFrom", value)
                        }
                        onBlur={formik.handleBlur}
                        label="Effective From"
                        slotProps={{ textField: { size: "small",required:true } }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            margin="0"
                            required
                            {...params}
                            error={
                              formik.touched.effectiveFrom &&
                              Boolean(formik.errors.effectiveFrom)
                            }
                            helperText={
                              formik.touched.effectiveFrom &&
                              formik.errors.effectiveFrom
                            }
                            onBlur={formik.handleBlur}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formik.values.isActive}
                            onChange={handleChange}
                          />
                        }
                        label="Is Active"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
                <Box spacing={2} sx={{ mt: 1, textAlign: "center" }}>
                  <Button
                    sx={{
                      minWidth: 100,
                      ml: 1,
                      mt: { xs: 1, md: 0 },
                    }}
                    disabled={isSubmitted}
                    variant="contained"
                    type="submit"
                  >
                    {btnText}
                    &nbsp;
                  </Button>
                  <Button
                    type="button"
                    sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                    onClick={handleCancel}
                    variant="outlined"
                  >
                    <CachedIcon />
                    &nbsp;RESET
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
        </>
      )}

    </>
  );
};

export default PayHeadServiceTypeMapping;
