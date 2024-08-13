import CachedIcon from "@mui/icons-material/Cached";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import "dayjs/locale/en-gb";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Loader from "../../components/Loader";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { values } from "lodash";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const PayMatrix = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [payLevelMenu, setPayLevelMenu] = useState([]);
  const [payLevelId, setPayLevelId] = useState([]);
  const [payCommissionMenu, setPayCommissionMenu] = useState([]);
  const [payCommissionId, setPayCommissionId] = useState([]);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [pcServTypeId, setPcServTypeId] = useState(null);
  const [serviceTypeMenu, setServiceTypeMenu] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editCount, setEditCount] = useState(0);
  const { showSnackbar } = useSnackbar();
  const title = "Pay Matrix";
  useTitle(title);

  const validationSchema = yup.object({
    serviceType: yup.object().nullable().required("Service Type is required"),
    payCommission: yup
      .object()
      .nullable()
      .required("Pay Commission is required"),
    payLevel: yup.object().nullable().required("Pay Level is required"),
    amount: yup
      .number()
      .required("Amount is required")
      .test(
        "is-within-range",
        "Amount must be between Min Amount and Max Amount",
        function (value) {
          const { minAmount, maxAmount } = this.parent;
          if (!minAmount || !maxAmount) return true; // Skip validation if minAmount or maxAmount is not set
          return value >= minAmount && value <= maxAmount;
        }
      ),
    // effectiveFrom: yup.date().nullable().required("Effective From is required"),
    isActive: yup.bool().required("Is Active is required"),
  });

  const formik = useFormik({
    initialValues: {
      serviceType: "",
      payCommission: "",
      payLevel: "",
      minAmount: "",
      maxAmount: "",
      amount: "",
      effectiveFrom: null,
      isActive: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          id: editId,
          // payBandId: values.payLevel.pbServTypeId,
          payBandId: values.payLevel.id,
          value: Number(values.amount),
          isActive: formik.values.isActive,
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/savePayMatrix`,
            postData
          )
          .then((response) => {
            if (response.data.statusCode === 200) {
              // setRowss((prevValue) => {
              //   const updatedRows = [...prevValue];
              //   updatedRows[selectedRow] = {
              //     ...updatedRows[selectedRow],
              //     ...response.data?.result,
              //     payCommission: response.data?.result?.payCommision,
              //     payLevel: response.data?.result?.payBandId,
              //     amount: response.data?.result?.value,

              //   };
              //   return updatedRows;
              // });
              showSnackbar(response.data?.message, "success");
              setBtnText("Save");
              formik.resetForm();
              getPayMatrixList();
            } else {
              setBtnText("Update");
              showSnackbar(response.data?.message, "error");
            }
          })
          .catch((error) => {
            console.log(error);
            setBtnText("Update");
            if (error.response) {
              showSnackbar(
                error.response.data.message
                  ? error.response.data.message
                  : error.response.message,
                "error"
              );
            }
          })
          .finally(() => {
            setIsSubmitted(false);
          });
      } else {
        // console.log(values);
        setBtnText("Saving");
        let postData = {
          id: null,
          payBandId: values.payLevel.pbServTypeId,
          value: Number(values.amount),
          isActive: formik.values.isActive,
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/savePayMatrix`,
            postData
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data.statusCode === 200) {
              // const rowData = {
              //   ...response.data.result,
              //   payCommission: response.data?.result?.payCommision,
              //   payLevel: response.data?.result?.payBandId,
              //   amount: response.data?.result?.value,

              // };
              // setRowss([rowData, ...rowss]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
              getPayMatrixList();
            } else {
              showSnackbar(response.data?.message, "error");
            }
          })
          .catch((error) => {
            if (error.response) {
              showSnackbar(
                error.response.data.message
                  ? error.response.data.message
                  : error.response.message,
                "error"
              );
            }
          })
          .finally(() => {
            setBtnText("Save");
            setIsSubmitted(false);
          });
      }
    },
  });

  const getPayMatrixList = () => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getPayMatrix`)
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data.result === null
        ) {
          // showSnackbar("No data found", "warning");
          console("No data found");
        } else {
          let responseData = response.data?.result?.map((values, index) => {
            let rowData = {
              ...values,

              payCommission: values?.payCommision,
              PayLevelName: values?.payBand,
              amount: values?.value,
              index: index + 1,
            };
            return rowData;
          });

          setRowss(responseData);
        }
      })
      .catch((error) => {
        if (error.response) {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        }
        setRowss([]);
      })
      .finally(() => setIsLoader(false));
  };
  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data.result === null
        ) {
          console("No data found");
        } else {
          setServiceTypeMenu(
            response.data?.result?.serviceType?.map((item, index) => ({
              id: item.typeId,
              label: item.typeName,
            }))
          );
        }
      })
      .catch((error) => {
        if (error.response) {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        }
      })
      .finally(() => setIsLoader(false));
    getPayMatrixList();
  }, []);

  const handleCancel = () => {
    setPayLevelId([]);
    setPayCommissionId([]);
    setBtnText("Save");
    setEditCount(0);
    // setIsReadable(false);
    setSelectedRow(null);
    formik.resetForm();
  };

  const handleChange = (event) => {
    formik.setFieldValue("isActive", event.target.checked);
  };

  const handleEdit = (params, index) => {
    setSelectedRow(index - 1);
    setEditId(rowss[index - 1].id);
    setBtnText("Update");
    //////////////////////////////////////////////////////////////////

    formik.setFieldValue("serviceType", {
      id: params.serviceTypeId,
      label: params.serviceType,
    });
    ///
    setIsLoader(true);
    axiosClient
      .get(
        `${process.env.REACT_APP_PAYROLL_API_URL}/getPayCommisionByService/${params.serviceTypeId}`
      )
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data.result === null
        ) {
          // showSnackbar("No data found", "warning");
          console("No data found");
        } else {
          let responseData = response.data?.result;
          setPayCommissionMenu(
            responseData.map((item, index) => ({
              id: item.typeId,
              label: item.typeName,
              pcServiceTypeId: item.pcServiceTypeId,
            }))
          );
        }
      })
      .catch((error) => {
        if (error.response) {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        }
      })
      .finally(() => setIsLoader(false));

    //////////////////////////////////////////////////////

    const typeCommissionLabel = {
      id: params.payCommisionId,
      label: params.payCommision,
    };
    formik.setFieldValue("payCommission", typeCommissionLabel);
    setPayCommissionId(typeCommissionLabel);
    ///

    setIsLoader(true);
    axiosClient
      .get(
        `${process.env.REACT_APP_PAYROLL_API_URL}/getPayBandsByServiceTypePc/${params.pcSerTypeId}`
      )
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data.result === null
        ) {
          // showSnackbar("No data found", "warning");
          console("No data found");
        } else {
          let responseData = response.data?.result;
          setPayLevelMenu(
            responseData.map((item, index) => ({
              id: item.typeId,
              label: item.typeName,
              pbServTypeId: item.pbServTypeId,
            }))
          );
        }
      })
      .catch((error) => {
        if (error.response) {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        }
      })
      .finally(() => setIsLoader(false));

    ///////////////////////////////////////////////////////////

    const payBandLabel = {
      id: params.pbServTypeId,
      label: params.payBand,
    };
    formik.setFieldValue("payLevel", payBandLabel);
    formik.setFieldValue("minAmount", params.minValue);
    formik.setFieldValue("maxAmount", params.maxValue);
    let effectiveFrom = dayjs(params.effectiveFrom, "YYYY-MM-DD");
    formik.setFieldValue("effectiveFrom", effectiveFrom);
    formik.setFieldValue("amount", params.amount);
    formik.setFieldValue("isActive", params.isActive);
  };
  const columns = [
    {
      field: "index",
      headerName: "Sr No.",
      flex: 0.1,
      minWidth: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "PayLevelName",
      headerName: "Pay Level",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "payCommission",
      headerName: "Pay Commission",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "isActive",
      headerName: "Is Active",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
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
            {/* <Button variant="contained" sx={{ color: 'white', backgroundColor: '#286cb4', ":hover": { color: 'white', backgroundColor: '#286cb4' }, borderRadius: '4px' }} startIcon={<DeleteIcon />} size="small" onClick={() => handleDelete(params.row.index)}>Delete</Button> */}
          </Stack>
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
                  <Grid xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="serviceType"
                      name="serviceType"
                      size="small"
                      // required
                      options={serviceTypeMenu}
                      value={
                        formik.values?.serviceType
                          ? formik.values?.serviceType
                          : serviceTypeMenu.find(
                              (option) =>
                                option.id === formik.values.serviceType?.id
                            ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("serviceType", null);
                          formik.setFieldValue("payCommission", "");
                          formik.setFieldValue("payLevel", "");
                        } else {
                          formik.setFieldValue("payCommission", "");
                          formik.setFieldValue("payLevel", "");
                          formik.setFieldValue("serviceType", value);

                          setIsLoader(true);
                          axiosClient
                            .get(
                              `${process.env.REACT_APP_PAYROLL_API_URL}/getPayCommisionByService/${value.id}`
                            )
                            .then((response) => {
                              if (
                                response.data?.result?.length === 0 ||
                                response.data.result === null
                              ) {
                                // showSnackbar("No data found", "warning");
                                console("No data found");
                              } else {
                                let responseData = response.data?.result;
                                setPayCommissionMenu(
                                  responseData.map((item, index) => ({
                                    id: item.typeId,
                                    label: item.typeName,
                                    pcServiceTypeId: item.pcServiceTypeId,
                                  }))
                                );
                              }
                            })
                            .catch((error) => {
                              if (error.response) {
                                showSnackbar(
                                  error.response.data.message
                                    ? error.response.data.message
                                    : error.response.message,
                                  "error"
                                );
                              }
                            })
                            .finally(() => setIsLoader(false));
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Service Type"
                          onBlur={formik.handleBlur}
                          required
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
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <Tooltip
                      title={
                        formik.values.serviceType
                          ? ""
                          : "First select Service Type"
                      }
                    >
                      <Autocomplete
                        disablePortal
                        margin="normal"
                        fullWidth
                        id="payCommission"
                        name="payCommission"
                        size="small"
                        // required
                        disabled={formik.values?.serviceType ? false : true}
                        options={payCommissionMenu}
                        value={
                          formik.values?.payCommission
                            ? formik.values?.payCommission
                            : payCommissionMenu.find(
                                (option) =>
                                  option.id === formik.values.payCommission?.id
                              ) || null
                        }
                        onChange={(e, value) => {
                          if (value === null) {
                            formik.setFieldValue("payCommission", null);
                            formik.setFieldValue("payLevel", "");
                          } else {
                            formik.setFieldValue("payLevel", "");
                            formik.setFieldValue("payCommission", value);
                            setIsLoader(true);
                            axiosClient
                              .get(
                                `${process.env.REACT_APP_PAYROLL_API_URL}/getPayBandsByServiceTypePc/${value.pcServiceTypeId}`
                              )
                              .then((response) => {
                                if (
                                  response.data?.result?.length === 0 ||
                                  response.data.result === null
                                ) {
                                  // showSnackbar("No data found", "warning");
                                  console("No data found");
                                } else {
                                  let responseData = response.data?.result;
                                  setPayLevelMenu(
                                    responseData.map((item, index) => ({
                                      id: item.typeId,
                                      label: item.typeName,
                                      pbServTypeId: item.pbServTypeId,
                                    }))
                                  );
                                }
                              })
                              .catch((error) => {
                                if (error.response) {
                                  showSnackbar(
                                    error.response.data.message
                                      ? error.response.data.message
                                      : error.response.message,
                                    "error"
                                  );
                                }
                              })
                              .finally(() => setIsLoader(false));
                          }
                        }}
                        getOptionLabel={(value) => value.label}
                        sx={{ width: "100%", mt: 2 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label="Pay Commission"
                            onBlur={formik.handleBlur}
                            helperText={
                              formik.errors.payCommission &&
                              formik.touched.payCommission
                                ? formik.errors.payCommission
                                : null
                            }
                            error={
                              formik.errors.payCommission &&
                              formik.touched.payCommission
                                ? true
                                : false
                            }
                          />
                        )}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <Tooltip
                      title={
                        formik.values.payCommission
                          ? ""
                          : "First select Pay Commission"
                      }
                    >
                      <Autocomplete
                        disablePortal
                        margin="normal"
                        fullWidth
                        id="payLevel"
                        name="payLevel"
                        size="small"
                        disabled={formik.values?.payCommission ? false : true}
                        options={payLevelMenu}
                        value={
                          formik.values?.payLevel
                            ? formik.values?.payLevel
                            : payLevelMenu.find(
                                (option) =>
                                  option.id === formik.values.payLevel?.id
                              ) || null
                        }
                        onChange={(e, value) => {
                          if (value === null) {
                            formik.setFieldValue("payLevel", null);
                            formik.setFieldValue("minAmount", "");
                            formik.setFieldValue("maxAmount", "");
                          } else {
                            formik.setFieldValue("minAmount", "");
                            formik.setFieldValue("maxAmount", "");
                            formik.setFieldValue("payLevel", value);
                            setIsLoader(true);
                            axiosClient
                              .get(
                                `${process.env.REACT_APP_PAYROLL_API_URL}/getRangeByPayLevel/${value.id}`
                              )
                              .then((response) => {
                                if (
                                  response.data?.result?.length === 0 ||
                                  response.data.result === null
                                ) {
                                  // showSnackbar("No data found", "warning");
                                  console("No data found");
                                } else {
                                  let responseData = response.data?.result[0];
                                  formik.setFieldValue(
                                    "minAmount",
                                    responseData?.minValue
                                  );
                                  formik.setFieldValue(
                                    "maxAmount",
                                    responseData?.maxValue
                                  );
                                }
                              })
                              .catch((error) => {
                                if (error.response) {
                                  showSnackbar(
                                    error.response.data.message
                                      ? error.response.data.message
                                      : error.response.message,
                                    "error"
                                  );
                                }
                              })
                              .finally(() => setIsLoader(false));
                          }
                        }}
                        getOptionLabel={(value) => value.label}
                        sx={{ width: "100%", mt: 2 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Pay Level"
                            onBlur={formik.handleBlur}
                            required
                            helperText={
                              formik.errors.payLevel && formik.touched.payLevel
                                ? formik.errors.payLevel
                                : null
                            }
                            error={
                              formik.errors.payLevel && formik.touched.payLevel
                                ? true
                                : false
                            }
                          />
                        )}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <Tooltip
                      title={
                        formik.values.payLevel ? "" : "First select Pay Level"
                      }
                    >
                      <TextField
                        margin="normal"
                        fullWidth
                        type="text"
                        id="minAmount"
                        name="minAmount"
                        label="Min Amount"
                        size="small"
                        disabled
                        value={formik.values.minAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.minAmount && !!formik.errors.minAmount
                        }
                        helperText={
                          formik.touched.minAmount && formik.errors.minAmount
                        }
                      />
                    </Tooltip>
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <Tooltip
                      title={
                        formik.values.payCommission
                          ? ""
                          : "First select Pay Level"
                      }
                    >
                      <TextField
                        margin="normal"
                        fullWidth
                        type="text"
                        id="maxAmount"
                        name="maxAmount"
                        label="Max Amount"
                        size="small"
                        disabled
                        value={formik.values.maxAmount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.maxAmount && !!formik.errors.maxAmount
                        }
                        helperText={
                          formik.touched.maxAmount && formik.errors.maxAmount
                        }
                      />
                    </Tooltip>
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <Tooltip
                      title={"Should be in range of Min Amount and Max Amount"}
                    >
                      <TextField
                        margin="normal"
                        fullWidth
                        type="text"
                        id="amount"
                        name="amount"
                        label="Amount"
                        size="small"
                        required
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.amount && !!formik.errors.amount}
                        helperText={
                          formik.touched.amount && formik.errors.amount
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
                        required
                        onChange={(value) =>
                          formik.setFieldValue("effectiveFrom", value)
                        }
                        onBlur={formik.handleBlur}
                        label="Effective From"
                        slotProps={{ textField: { size: "small" } }}
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
                    sm={4}
                    sx={{ display: "flex", marginTop: "1.7%" }}
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
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <div style={{ marginBottom: "-2%" }}>
            <PageTitle name="Pay Matrix List" />
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
export default PayMatrix;
