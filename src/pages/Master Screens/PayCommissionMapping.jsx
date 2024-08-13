import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Loader from "../../components/Loader";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const PayCommissionMapping = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  const [serviceMenu, setServiceMenu] = useState([]);
  const [payCommissionMenu, setPayCommissionMenu] = useState([]);
  const [btnText, setBtnText] = useState("Save");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const { showSnackbar } = useSnackbar();
  const title = "Add Pay Commission Service Type Mapping";

  useTitle(title);
  const validationSchema = yup.object({
    serviceType: yup.object().nullable().required("Service Type is required"),
    payCommissionType: yup
      .object()
      .nullable()
      .required("Pay Commission Type is required"),
    payCommAbb: yup
      .string()
      .required("Pay commission Service Type Mapping Name is required"),
    effectFrom: yup
      .date()
      .nullable()
      .required("Effective From Date is required"),
    isActive: yup.bool().required("Is Active is required"),
  });

  const formik = useFormik({
    initialValues: {
      serviceType: "",
      payCommissionType: "",
      payCommAbb: "",
      effectFrom: null,
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
          servTypeId: formik.values.serviceType.id,
          pcId: formik.values.payCommissionType.id,
          pcDesc: formik.values.payCommAbb,
          effectiveFrom: dayjs(new Date(Date.parse(formik.values.effectFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
          effectiveTo: null,
          displayOrder: null,
          isActive: formik.values.isActive,
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/pay-commission-service-save`,
            postData
          )
          .then((response) => {
            if (response.data.statusCode === 200) {
              if(response.data.result === ""){
                showSnackbar('Record already exits',"warning");
              }
              else{
                const updatedRows = rowss;
                const rowData = {
                  ...response.data.result,
                  serviceType: response.data.result.servTypeId.serviceType,
                  payTypeName: response.data.result.pcId.typeName,
                  effectiveFrom: dayjs(new Date(Date.parse(response.data.result.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                };
                updatedRows[selectedRow] = rowData;
              }
                showSnackbar(response.data?.message, "success");
                setBtnText("Save");
                formik.resetForm();
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
          servTypeId: formik.values.serviceType.id,
          pcId: formik.values.payCommissionType.id,
          pcDesc: formik.values.payCommAbb,
          effectiveFrom: dayjs(new Date(Date.parse(formik.values.effectFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
          effectiveTo: null,
          displayOrder: null,
          isActive: formik.values.isActive,
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/pay-commission-service-save`,
            postData
          )
          .then((response) => {
            if (response.data.statusCode === 200 ) {
              if(response.data.result === ""){
                showSnackbar('Record already exits',"warning");
              }
              else{
                const rowData = {
                  ...response.data.result,
                  serviceType: response.data.result.servTypeId.serviceType,
                  payTypeName: response.data.result.pcId.typeName,
                  effectiveFrom: dayjs(new Date(Date.parse(response.data.result.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                };
                setRowss([rowData,...rowss]);
              }
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
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
    }
  });

  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/fetch-service-type`)
      .then((response) => {
        if (response.data?.result?.length === 0 || response.data.result === null){
          showSnackbar("No data found", "warning");
        }
        else{

        const rowData = response.data.result.map((item, index) => ({
          id: item.id,
          label: item.serviceType,
          pcServiceTypeId:item.pcServiceTypeId
        }));
        setServiceMenu(rowData);
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
      .finally(() => setIsLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const payCommissionDropdown = () => {
      setIsLoader(true);
      axiosClient
        .get(
          `${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`
        )
        .then((response) => {
          if (response.data?.result?.length === 0 || response.data.result === null){
            showSnackbar("No data found", "warning");
            setPayCommissionMenu([]);
          }
          else{

          let responseData = response.data?.result?.payCommission.map((value, index) => {
            let rowData = { ...value, index: index + 1 };

            return rowData;
          });

          setPayCommissionMenu(
            responseData.map((item, index) => ({
              id: item.typeId,
              label: item.typeName,
            }))
          );
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
  };

  useEffect(() => {
    payCommissionDropdown();
  }, [])
  


  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(
        `${process.env.REACT_APP_PAYROLL_API_URL}/fetch-pay-commission-service`
      )
      .then((response) => {
        if (response.data?.result?.length === 0 || response.data.result === null){
          showSnackbar("No data found", "warning");
        }
        else{

        const rowData = response.data.result.map((item, index) => ({
          ...item,
          id:index+1,
          serviceType: item.servTypeId.serviceType,
          payTypeName: item.pcId.typeName,
          effectiveFrom :dayjs(new Date(Date.parse(item.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
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
      .finally(() => setIsLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const handleCancel = () => {
    setBtnText("Save");
    setSelectedRow(null);
    formik.resetForm();
  };

  const handleEdit =  (params,index) => {
    setSelectedRow(index - 1);
    setBtnText("Update");
    let effectiveFrom = dayjs(rowss[index - 1].effectiveFrom, "YYYY-MM-DD");
    const selectedServiceType = serviceMenu.find(option => option.label === rowss[index - 1].serviceType);
    formik.setFieldValue("serviceType", selectedServiceType)
    const selectPay = {
      id:params.pcId.typeId,
      label:params.pcId.typeName
    }
    formik.setFieldValue("payCommissionType", selectPay)
    formik.setFieldValue("payCommAbb", rowss[index - 1].pcDesc);
    formik.setFieldValue("payCommAbbInHindi", rowss[index - 1].pcAbbrInRegLang);
    formik.setFieldValue("payCommEng", rowss[index - 1].pcDesc);
    formik.setFieldValue("payCommHindi", rowss[index - 1].pcDescInRegLang);
    formik.setFieldValue("effectFrom", effectiveFrom);
    formik.setFieldValue("npsRate", rowss[index - 1].npsGovtRate);
    formik.setFieldValue("isActive", rowss[index - 1].isActive);
    setEditRowId(rowss[index - 1].id);
  };
  const handleChange = (event) => {
    formik.setFieldValue("isActive", event.target.checked);
  };

  const columns = [
    {
      width: 70,
      headerClassName: "super-app-theme--header",
      headerName: "Sr No.",
      field: "id",
    },
    {
      width: 130,
      headerClassName: "super-app-theme--header",
      headerName: "Service Type",
      field: "serviceType",
      flex: 0.2,
    },
    {
      width: 160,
      headerClassName: "super-app-theme--header",
      headerName: "Pay Commission Name",
      field: "payTypeName",
      flex: 0.2,
    },
    {
      width: 200,
      headerClassName: "super-app-theme--header",
      headerName: "Pay Commission Service Type Mapping Name",
      field: "pcDesc",
      flex: 0.3,
    },
    {
      width: 120,
      headerClassName: "super-app-theme--header",
      headerName: "With Effect From",
      field: "effectiveFrom",
      flex: 0.2,
    },
    {
      field: "isActive",
      headerName: "IsActive",
      flex: 0.1,
      minWidth: 50,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 80,
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
            onClick={() => handleEdit(params.row,params.row.index)}
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
      <Grid container>
        <Grid xs={12}>
          <Card sx={{ my: 2 }} elevation={5}>
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
                      options={serviceMenu}
                      value={
                        serviceMenu.find(
                          (option) =>
                            option.id === formik.values.serviceType?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("serviceType", null);
                        } else {
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
                      id="payCommissionType"
                      name="payCommissionType"
                      size="small"
                      options={payCommissionMenu}
                      isOptionEqualToValue={(option,value)=>option.label === value.label}
                      value={formik.values?.payCommissionType ? formik.values?.payCommissionType :
                        payCommissionMenu.find(
                          (option) =>
                            option.id === formik.values.payCommissionType?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("payCommissionType", null);
                        } else {
                          formik.setFieldValue("payCommissionType", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Pay Commission Name"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.payCommissionType &&
                            formik.touched.payCommissionType
                              ? formik.errors.payCommissionType
                              : null
                          }
                          error={
                            formik.errors.payCommissionType &&
                            formik.touched.payCommissionType
                          }
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="payCommAbb"
                      name="payCommAbb"
                      label="Pay Commission Service Type Mapping Name"
                      size="small"
                      value={formik.values.payCommAbb}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payCommAbb && !!formik.errors.payCommAbb
                      }
                      helperText={
                        formik.touched.payCommAbb && formik.errors.payCommAbb
                      }
                      required
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={"en-gb"}
                    >
                      <DatePicker
                        id="effectFrom"
                        sx={{ width: "100%", mt: 2 }}
                        name="effectFrom"
                        disablePast
                        format="DD/MM/YYYY"
                        value={formik.values.effectFrom}
                        required
                        onChange={(value) =>
                          formik.setFieldValue("effectFrom", value)
                        }
                        onBlur={formik.handleBlur}
                        label="Effective From"
                        slotProps={{ textField: { size: "small", required: true } }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            margin="0"
                            required
                            {...params}
                            error={
                              formik.touched.effectFrom &&
                              Boolean(formik.errors.effectFrom)
                            }
                            helperText={
                              formik.touched.effectFrom &&
                              formik.errors.effectFrom
                            }
                            onBlur={formik.handleBlur}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={4} md={4} lg={4}
                  >
                    <FormGroup sx={{ width: "100%", mt: 2, mb: 1 }}>
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
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <div style={{ marginBottom: "-2%" }}>
            <PageTitle name="Pay Commission Mapping Type List" />
          </div>
          <Box component={"div"}>
            <SearchTable
              columns={columns}
              data={rowss}
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
    </>
  );
};
export default PayCommissionMapping;
