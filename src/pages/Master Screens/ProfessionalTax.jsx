import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from "../../components/Loader";
import { render } from "@testing-library/react";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Checkbox from "@mui/material/Checkbox";



const ProfessionalTaxMaster = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [editId, setEditId] = useState(null);
  const [stateMenu, setStateMenu] = useState([]);
  const { showSnackbar } = useSnackbar();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const title = "Professional Tax";
  useTitle(title);

  useEffect(() => {
   
    setIsLoader(true);
    axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/employee/dropdown/state`).then(response => {
        setStateMenu(response.data);
       
    })
        .catch(error => {
            setStateMenu([]);
            console.log(error);
        })
        .finally(() => setIsLoader(false));

    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getProfessionalTax`)
      .then((response) => {
        if (response.data?.result?.length === 0)
          showSnackbar("No data found", "warning");

        let responseData = response.data?.result?.map((value, index) => {
          let rowData = {
            ...value,
            state: value.stateId.locName,
            MinIncomeValue: value.minIncome,
            MaxIncomeValue: value.maxIncome,
            ProfessionalTaxAmt: value.professionalTaxAmount,
            effectiveFrom: dayjs(
              new Date(Date.parse(value.effectiveFrom))?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            effectiveTo: dayjs(
              new Date(Date.parse(value.effectiveTo))?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            index: index + 1,
          };

          return rowData;
        });
        setRowss(responseData);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = yup.object({
    state: yup.object().required("State is required"),
    MinIncomeValue: yup.string().required("Min. Income Value is required"),
    effectiveFrom: yup.date().nullable().required("Effective From is required"),
    effectiveTo: yup.date().nullable().required("Effective To is required"),
  });

  const formik = useFormik({
    initialValues: {
      state: "",
      MinIncomeValue: "",
      MaxIncomeValue: "",
      ProfessionalTaxAmt: "",
      effectiveFrom: null,
      effectiveTo: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    //   console.log("Value", values);
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
            id: null,
            stateId: values.state.id,
            minIncome: values.MinIncomeValue,
            maxIncome: values.MaxIncomeValue,
            /////////////////////////////////////
            effectiveFrom: dayjs(
              new Date(
                Date.parse(formik.values.effectiveFrom)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            /////////////////////////////////////
            effectiveTo: dayjs(
              new Date(
                Date.parse(formik.values.effectiveTo)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            //////////////////////////////////////
            professionalTaxAmount: values.ProfessionalTaxAmt,
            userId: Number(localStorage.getItem("userId")),
          };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/saveProfessionalTax`,
            postData
          )

          .then((response) => {
            // console.log(response.data);
            if (response.data.statusCode === 200) {
              setRowss((prevValue) => {
                const updatedRows = [...prevValue];
                updatedRows[selectedRow] = {
                  ...updatedRows[selectedRow],
                  ...response.data?.result,
                  state: response.data?.result.stateId.locName,
                  MinIncomeValue: response.data?.result.minIncome,
                  MaxIncomeValue: response.data?.result.maxIncome,
                  ProfessionalTaxAmt: response.data?.result.professionalTaxAmount,
                  effectiveFrom: dayjs(
                    new Date(
                      Date.parse(response.data?.result.effectiveFrom)
                    )?.toLocaleDateString()
                  ).format("YYYY-MM-DD"),
                  effectiveTo: dayjs(
                    new Date(
                      Date.parse(response.data?.result.effectiveTo)
                    )?.toLocaleDateString()
                  ).format("YYYY-MM-DD"),
                };
                return updatedRows;
              });
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
          stateId: values.state.id,
          minIncome: values.MinIncomeValue,
          maxIncome: values.MaxIncomeValue,
          /////////////////////////////////////
          effectiveFrom: dayjs(
            new Date(
              Date.parse(formik.values.effectiveFrom)
            )?.toLocaleDateString()
          ).format("YYYY-MM-DD"),
          /////////////////////////////////////
          effectiveTo: dayjs(
            new Date(
              Date.parse(formik.values.effectiveTo)
            )?.toLocaleDateString()
          ).format("YYYY-MM-DD"),
          //////////////////////////////////////
          professionalTaxAmount: values.ProfessionalTaxAmt,
          userId: Number(localStorage.getItem("userId")),
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/saveProfessionalTax`,
            postData
          )
          .then((response) => {
            // console.log(response.data);

            if (response.data.statusCode === 200) {
              const updatedRow = rowss.map((value) => ({
                ...value,
                index: value.index + 1,
              }));

              let newRow = response.data?.result;
              newRow = { index: 1, ...newRow,
                state: newRow.stateId.locName,
                  MinIncomeValue: newRow.minIncome,
                  MaxIncomeValue: newRow.maxIncome,
                  ProfessionalTaxAmt: newRow.professionalTaxAmount,
                  effectiveFrom: dayjs(
                    new Date(
                      Date.parse(newRow.effectiveFrom)
                    )?.toLocaleDateString()
                  ).format("YYYY-MM-DD"),
                  effectiveTo: dayjs(
                    new Date(
                      Date.parse(newRow.effectiveTo)
                    )?.toLocaleDateString()
                  ).format("YYYY-MM-DD"),
               };

              setRowss([newRow, ...updatedRow]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
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

  const handleCancel = () => {
    setBtnText("Save");
    // setIsReadable(false);
    setSelectedRow(null);
    formik.resetForm();
  };

 
  const handleEdit = (index) => {
    setSelectedRow(index - 1);
    setEditId(rowss[index - 1].id);
    let effectiveFrom = dayjs(rowss[index - 1].effectiveFrom, "YYYY-MM-DD");
    let effectiveTo = dayjs(rowss[index - 1].effectiveTo, "YYYY-MM-DD");

    setBtnText("Update");
    ///////////////////////////////////////////////////////////////////////
    // console.log("state dropdown::",stateMenu);
    const stateLabel = stateMenu.find(option => option.id === rowss[index - 1].stateId.locId);
    formik.setFieldValue("state", stateLabel);
    // console.log("state label::",stateLabel);
    //////////////////////////////////////////////////////////////////////
    formik.setFieldValue(
      "MinIncomeValue",
      rowss[index - 1].minIncome
    );
    formik.setFieldValue(
        "MaxIncomeValue",
        rowss[index - 1].maxIncome
      );
      formik.setFieldValue(
        "ProfessionalTaxAmt",
        rowss[index - 1].professionalTaxAmount
      );
    formik.setFieldValue("effectiveFrom", effectiveFrom);
    formik.setFieldValue("effectiveTo", effectiveTo);
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
      field: "state",
      headerName: "State",
      flex: 0.3,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "MinIncomeValue",
      headerName: "Min. Income Value",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "MaxIncomeValue",
      headerName: "Max. Income Value",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "ProfessionalTaxAmt",
      headerName: "Professional Tax Amt.",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "effectiveFrom",
      headerName: "Effective From",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "effectiveTo",
      headerName: "Effective To",
      flex: 0.2,
      minWidth: 180,
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
              onClick={() => handleEdit(params.row.index)}
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
                      margin="small"
                      fullWidth
                      id="state"
                      name="state"
                      size="small"
                      // options={employeeTypeid}
                      options={stateMenu}
                      value={
                        stateMenu.find(
                          (option) => option.id === formik.values.state?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("state", null);
                        } else {
                          formik.setFieldValue("state", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State"
                          required
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.state && formik.touched.state
                              ? formik.errors.state
                              : null
                          }
                          error={
                            formik.errors.state && formik.touched.state
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="small"
                      fullWidth
                      required
                      type="text"
                      id="MinIncomeValue"
                      name="MinIncomeValue"
                      label="Min. Income Value"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.MinIncomeValue}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.MinIncomeValue &&
                        !!formik.errors.MinIncomeValue
                      }
                      helperText={
                        formik.touched.MinIncomeValue &&
                        formik.errors.MinIncomeValue
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="small"
                      fullWidth
                      type="text"
                      id="MaxIncomeValue"
                      name="MaxIncomeValue"
                      label="Max. Income Value"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.MaxIncomeValue}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.MaxIncomeValue &&
                        !!formik.errors.MaxIncomeValue
                      }
                      helperText={
                        formik.touched.MaxIncomeValue &&
                        formik.errors.MaxIncomeValue
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="small"
                      fullWidth
                      type="text"
                      id="ProfessionalTaxAmt"
                      name="ProfessionalTaxAmt"
                      label="Professional Tax Amt."
                      size="small"
                      disabled={isReadable}
                      value={formik.values.ProfessionalTaxAmt}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.ProfessionalTaxAmt &&
                        !!formik.errors.ProfessionalTaxAmt
                      }
                      helperText={
                        formik.touched.ProfessionalTaxAmt &&
                        formik.errors.ProfessionalTaxAmt
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={"en-gb"}
                    >
                      <DatePicker
                        id="effectiveFrom"
                        fullWidth
                        sx={{ width: "100%" }}
                        name="effectiveFrom"
                        disablePast
                        format="DD/MM/YYYY"
                        value={formik.values.effectiveFrom}
                        onChange={(value) =>
                          formik.setFieldValue("effectiveFrom", value)
                        }
                        onBlur={formik.handleBlur}
                        label="Effective From"
                        slotProps={{ textField: { size: "small",required: true  } }}
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

                  <Grid xs={12} sm={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={"en-gb"}
                    >
                      <DatePicker
                        id="effectiveTo"
                        fullWidth
                        sx={{ width: "100%" }}
                        name="effectiveTo"
                        minDate={formik.values.effectiveFrom}
                        format="DD/MM/YYYY"
                        value={formik.values.effectiveTo}
                        onChange={(value) =>
                          formik.setFieldValue("effectiveTo", value)
                        }
                        onBlur={formik.handleBlur}
                        label="Effective To"
                        slotProps={{ textField: { size: "small",required: true  } }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            margin="0"
                            required
                            {...params}
                            error={
                              formik.touched.effectiveTo &&
                              Boolean(formik.errors.effectiveTo)
                            }
                            helperText={
                              formik.touched.effectiveTo &&
                              formik.errors.effectiveTo
                            }
                            onBlur={formik.handleBlur}
                          />
                        )}
                      />
                    </LocalizationProvider>
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
                    {/* {
                                            isSubmitted ?
                                                <CircularProgress color="inherit" size={15} />
                                                :
                                                <SaveAltIcon sx={{ ml: 0.2 }}></SaveAltIcon>
                                        } */}
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
            <PageTitle name="Professional Tax List" />
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

export default ProfessionalTaxMaster;
