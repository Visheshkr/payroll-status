import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Box,
  Button,
  Card,
  CardContent,
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
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Checkbox from "@mui/material/Checkbox";
import VirtualKeyboard from "../Accordian/VirtualKeyboard";


const HraRate = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [editId, setEditId] = useState(null);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const userId = localStorage.getItem("userId");
  const [currentInput, setCurrentInput] = useState("");
  const [editCount, setEditCount] = useState(0);

  const title = "HRA Rate";
  useTitle(title);

  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getHraRates`)
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data?.result === null
        ) {
          showSnackbar("No data found", "warning");
        } else {
          let responseData = response.data?.result?.map((value, index) => {
            let rowData = {
              ...value,
              effectiveFrom: dayjs(
                new Date(Date.parse(value.effectiveFrom))?.toLocaleDateString()
              ).format("YYYY-MM-DD"),
              effectiveTo: value.effectiveTo
                ? dayjs(
                    new Date(
                      Date.parse(value.effectiveTo)
                    )?.toLocaleDateString()
                  ).format("YYYY-MM-DD")
                : null,
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
  }, []);

  const validationSchema = yup.object({
    tiersNameEnglish: yup
      .string()
      .required("Tiers Name In English is required"),
    ratePercentage: yup.number().required("Rate Percentage is required"),
    effectiveFrom: yup.date().nullable().required("Effective From is required"),
  });

  const formik = useFormik({
    initialValues: {
      tiersNameEnglish: "",
      tiersNameHindi: "",
      ratePercentage: "",
      description: "",
      effectiveFrom: null,
      effectiveTo: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("Value", values);
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          tierId: editId,
          tierName: values.tiersNameEnglish,
          tierNameRegLang: values.tiersNameHindi,
          ratePercentage: values.ratePercentage,
          description: values.description,
          ///////////////////////////////////////////////////////////////////
          effectiveFrom: dayjs(
            new Date(
              Date.parse(formik.values.effectiveFrom)
            )?.toLocaleDateString()
          ).format("YYYY-MM-DD"),
          //////////////////////////////////////////////////////////////////////
          effectiveTo:
            dayjs(
              new Date(
                Date.parse(formik.values.effectiveTo)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD") !== "Invalid Date"
              ? dayjs(
                  new Date(
                    Date.parse(formik.values.effectiveTo)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD")
              : null,
          ///////////////////////////////////////////////////////////////////////
          isActive: true,
          userId: userId,
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/saveHraRates`,
            postData
          )

          .then((response) => {
            // console.log(response.data);
            if (response.data.statusCode === 200) {
              setRowss((prevValue) => {
                const updatedRows = [...prevValue];
                // console.log("updatedRowss::",updatedRows)
                updatedRows[selectedRow] = {
                  ...updatedRows[selectedRow],
                  ...response.data?.result,
                  effectiveFrom: dayjs(
                    new Date(
                      Date.parse(response.data.result.effectiveFrom)
                    )?.toLocaleDateString()
                  ).format("YYYY-MM-DD"),
                  effectiveTo: response.data.result.effectiveTo
                    ? dayjs(
                        new Date(
                          Date.parse(response.data.result.effectiveTo)
                        )?.toLocaleDateString()
                      ).format("YYYY-MM-DD")
                    : null,
                };

                // setIsReadable(false);

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
          tierId: null,
          tierName: values.tiersNameEnglish,
          tierNameRegLang: values.tiersNameHindi,
          ratePercentage: values.ratePercentage,
          description: values.description,
          ///////////////////////////////////////////////////////////////////
          effectiveFrom: dayjs(
            new Date(
              Date.parse(formik.values.effectiveFrom)
            )?.toLocaleDateString()
          ).format("YYYY-MM-DD"),
          /////////////////////////////////////////////////////////////////////
          effectiveTo:
            dayjs(
              new Date(
                Date.parse(formik.values.effectiveTo)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD") !== "Invalid Date"
              ? dayjs(
                  new Date(
                    Date.parse(formik.values.effectiveTo)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD")
              : null,
          /////////////////////////////////////////////////////////////////////
          isActive: true,
          userId: userId,
        };
        // console.log("Post Data",postData);
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/saveHraRates`,
            postData
          )
          .then((response) => {
            // console.log(response.data);

            if (
              response.data.statusCode === 200 &&
              response.data?.result !== null
            ) {
              const updatedRow = rowss.map((value) => ({
                ...value,
                index: value.index + 1,
              }));

              let newRow = response.data?.result;
              newRow = {
                index: 1,
                ...newRow,
                effectiveFrom: dayjs(
                  new Date(
                    Date.parse(newRow.effectiveFrom)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD"),
                effectiveTo: response.data.result.effectiveTo
                  ? dayjs(
                      new Date(
                        Date.parse(newRow.effectiveTo)
                      )?.toLocaleDateString()
                    ).format("YYYY-MM-DD")
                  : null,
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
    setCurrentInput("");
    formik.resetForm();
  };

  const handleEdit = (index) => {
    setSelectedRow(index - 1);
    setEditCount(1);
    setEditId(rowss[index - 1].tierId);
    // console.log("id::",rowss[index - 1])
    let effectiveFrom = dayjs(rowss[index - 1].effectiveFrom, "YYYY-MM-DD");
    let effectiveTo = dayjs(rowss[index - 1].effectiveTo, "YYYY-MM-DD");
    setBtnText("Update");
    formik.setFieldValue("tiersNameEnglish", rowss[index - 1].tierName);
    formik.setFieldValue("tiersNameHindi", rowss[index - 1].tierNameRegLang);
    formik.setFieldValue("ratePercentage", rowss[index - 1].ratePercentage);
    formik.setFieldValue("description", rowss[index - 1].description);
    formik.setFieldValue("effectiveFrom", effectiveFrom);
    formik.setFieldValue("effectiveTo", effectiveTo);
  };

  const handleInputChange = (input) => {
    formik.setFieldValue("tiersNameHindi", input);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
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
      // field: "tiersNameEnglish",
      field: "tierName",
      headerName: "Tiers Name (English)",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      // field: "tiersNameHindi",
      field: "tierNameRegLang",
      headerName: "Tiers Name (Hindi)",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      // field: "ratePercentage",
      field: "ratePercentage",
      headerName: "Rate Percentage",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      // field: "description",
      field: "description",
      headerName: "Description",
      flex: 0.2,
      minWidth: 200,
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
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="tiersNameEnglish"
                      name="tiersNameEnglish"
                      label="Tiers Name in English"
                      size="small"
                      required
                      disabled={isReadable}
                      value={formik.values.tiersNameEnglish}
                      onFocus={() => setCurrentInput("tiersNameEnglish")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.tiersNameEnglish &&
                        !!formik.errors.tiersNameEnglish
                      }
                      helperText={
                        formik.touched.tiersNameEnglish &&
                        formik.errors.tiersNameEnglish
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="tiersNameHindi"
                      name="tiersNameHindi"
                      label="Tiers Name In Hindi"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.tiersNameHindi}
                      onFocus={() => setCurrentInput("tiersNameHindi")}
                      onKeyDown={handleKeyDown}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.tiersNameHindi &&
                        !!formik.errors.tiersNameHindi
                      }
                      helperText={
                        formik.touched.tiersNameHindi &&
                        formik.errors.tiersNameHindi
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="ratePercentage"
                      name="ratePercentage"
                      label="Rate Percentage"
                      size="small"
                      required
                      disabled={isReadable}
                      value={formik.values.ratePercentage}
                      onFocus={() => setCurrentInput("ratePercentage")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.ratePercentage &&
                        !!formik.errors.ratePercentage
                      }
                      helperText={
                        formik.touched.ratePercentage &&
                        formik.errors.ratePercentage
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.description}
                      onFocus={() => setCurrentInput("description")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.description &&
                        !!formik.errors.description
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
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
                        slotProps={{ textField: { size: "small", required: true } }}
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
                            onFocus={() => setCurrentInput("effectiveFrom")}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Effective To"
                        
                        sx={{ width: "100%", mt: 2 }}
                        value={formik.values.effectiveTo}
                        format="DD/MM/YYYY"
                        slotProps={{ textField: { size: "small" } }}
                        onChange={(value) =>
                          formik.setFieldValue("effectiveTo", value)
                        }
                        minDate={formik.values.effectiveFrom}
                       
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size="small"
                            margin="0"
                            error={
                              formik.touched.effectiveTo &&
                              Boolean(formik.errors.effectiveTo)
                            }
                            helperText={
                              formik.touched.effectiveTo &&
                              formik.errors.effectiveTo
                            }
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
            <PageTitle name="HRA Rate List" />
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
          <Grid container>
            <Grid xs={12} sm={6}>
              {currentInput === "tiersNameHindi" && (
                <VirtualKeyboard onChange={handleInputChange} />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default HraRate;
