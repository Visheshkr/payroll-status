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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const ServiceTypeList = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [payHeadGroup, setPayHeadGroup] = useState([]);
  const [payHeadType, setPayHeadType] = useState([]);
  const [payHeadTypeFlag, setPayHeadTypeFlag] = useState("");
  const [detailSubDetail, setDetailSubDetail] = useState([]);
  const [btDescription, setBtDescription] = useState([]);
  const [majorSubMajorMinor, setMajorSubMajorMinor] = useState([]);
  const [groupType, setGroupType] = useState([]);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [editId, setEditId] = useState(null);
  const { showSnackbar } = useSnackbar();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const pageId = 6;

  const title = "Service Type ";
  useTitle(title);

  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/fetch-service-type`)
      .then((response) => {
        if (response.data?.result?.length === 0)
          showSnackbar("No data found", "warning");

        let responseData = response.data?.result?.map((value, index) => {
          let rowData = { ...value, index: index + 1 };

          return rowData;
        });

        const data = responseData.map((item) => item.employeeTypeId);

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
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        if (
          response.data?.result?.length === 0 ||
          response.data.result === null
        ) {
          // showSnackbar("No data found", "warning");
          console("No data found");
        } else {
          let responseData = response.data?.result;
          //   console.log("value::",responseData);
          setPayHeadGroup(
            responseData.employeeType.map((item) => ({
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
  }, []);

  const validationSchema = yup.object({
    serviceTypeinEnglish: yup
      .string()
      .required("Service Type In English is required"),

    serviceTypeCode: yup.string().required("Service Type code is required"),

    isActive: yup.bool().required("Is Active is required"),
  });

  const formik = useFormik({
    initialValues: {
      serviceTypeinEnglish: "",
      serviceTypeinHindi: "",
      employeeTypeId: "",
      serviceTypeCode: "",
      descriptioninEnglish: "",
      descriptioninHindi: "",
      remarksinEnglish: "",
      remarksinHindi: "",
      effectiveFrom: null,
      isActive: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("Value", values);
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          id: editId,
          serviceType: values.serviceTypeinEnglish,
          serviceTypeRegLang: values.serviceTypeinHindi,
          serviceTypeCode: values.serviceTypeCode,
          description: values.descriptioninEnglish,
          ////////////////////////////////////////////////////////////////
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
          //////////////////////////////////////////////////////////////////
          effectiveTo: null,
          isActive: formik.values.isActive,
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/service-type-save`,
            postData
          )

          .then((response) => {
            // console.log(response.data);
            if (
              response.data.result !== null &&
              response.data.statusCode === 200
            ) {
              setRowss((prevValue) => {
                const updatedRows = [...prevValue];
                updatedRows[selectedRow] = {
                  ...updatedRows[selectedRow],
                  ...response.data?.result,
                  effectiveFrom: response.data?.result.effectiveFrom
                    ? dayjs(
                        new Date(
                          Date.parse(response.data?.result.effectiveFrom)
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
          id: null,
          serviceType: values.serviceTypeinEnglish,
          serviceTypeRegLang: values.serviceTypeinHindi,
          serviceTypeCode: values.serviceTypeCode,
          description: values.descriptioninEnglish,
          ////////////////////////////////////////////////////////////////
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
          //////////////////////////////////////////////////////////////////
          effectiveTo: null,
          isActive: formik.values.isActive,
        };
        // console.log("Post Data",postData);
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/service-type-save`,
            postData
          )
          .then((response) => {
            // console.log(response.data);

            if (
              response.data.result !== null &&
              response.data.statusCode === 200
            ) {
              const updatedRow = rowss.map((value) => ({
                ...value,
                index: value.index + 1,
              }));

              let newRow = response.data?.result;
              newRow = {
                index: 1,
                ...newRow,
                effectiveFrom: newRow.effectiveFrom
                  ? dayjs(
                      new Date(
                        Date.parse(newRow.effectiveFrom)
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
    formik.resetForm();
  };

  const handleEdit = (index) => {
    setSelectedRow(index - 1);
    setEditId(rowss[index - 1].id);

    let effectiveFrom = dayjs(rowss[index - 1].effectiveFrom, "YYYY-MM-DD");

    setBtnText("Update");
    formik.setFieldValue("serviceTypeinEnglish", rowss[index - 1].serviceType);
    formik.setFieldValue(
      "serviceTypeinHindi",
      rowss[index - 1].serviceTypeRegLang
    );

    formik.setFieldValue("serviceTypeCode", rowss[index - 1].serviceTypeCode);
    formik.setFieldValue("descriptioninEnglish", rowss[index - 1].description);

    formik.setFieldValue("effectiveFrom", effectiveFrom);

    formik.setFieldValue("isActive", rowss[index - 1].isActive);
  };

  const handleChange = (event) => {
    formik.setFieldValue("isActive", event.target.checked);
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
      // field: "ServiceTypeinEnglish",
      field: "serviceType",
      headerName: "Service Type (English)",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      // field: "ServiceTypeinHindi",
      field: "serviceTypeRegLang",
      headerName: "Service Type (Hindi)",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "serviceTypeCode",
      headerName: "Service Type code",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },

    {
      // field: "remarksinHindi",
      field: "isActive",
      headerName: "Is Active",
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
                      margin="small"
                      fullWidth
                      type="text"
                      id="serviceTypeinEnglish"
                      name="serviceTypeinEnglish"
                      label="Service Type in English"
                      size="small"
                      required
                      disabled={isReadable}
                      value={formik.values.serviceTypeinEnglish}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.serviceTypeinEnglish &&
                        !!formik.errors.serviceTypeinEnglish
                      }
                      helperText={
                        formik.touched.serviceTypeinEnglish &&
                        formik.errors.serviceTypeinEnglish
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="small"
                      fullWidth
                      type="text"
                      id="serviceTypeinHindi"
                      name="serviceTypeinHindi"
                      label="Service Type in Hindi"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.serviceTypeinHindi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.serviceTypeinHindi &&
                        !!formik.errors.serviceTypeinHindi
                      }
                      helperText={
                        formik.touched.serviceTypeinHindi &&
                        formik.errors.serviceTypeinHindi
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="small"
                      fullWidth
                      type="text"
                      id="serviceTypeCode"
                      name="serviceTypeCode"
                      label="Service Type code"
                      size="small"
                      required
                      disabled={isReadable}
                      value={formik.values.serviceTypeCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.serviceTypeCode &&
                        !!formik.errors.serviceTypeCode
                      }
                      helperText={
                        formik.touched.serviceTypeCode &&
                        formik.errors.serviceTypeCode
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="small"
                      fullWidth
                      type="text"
                      id="descriptioninEnglish"
                      name="descriptioninEnglish"
                      label="Description in English"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.descriptioninEnglish}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.descriptioninEnglish &&
                        !!formik.errors.descriptioninEnglish
                      }
                      helperText={
                        formik.touched.descriptioninEnglish &&
                        formik.errors.descriptioninEnglish
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
                        slotProps={{ textField: { size: "small" } }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            margin="0"
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
            <PageTitle name="Service Type List" />
          </div>
          <Box component={"div"}>
            <SearchTable
              columns={columns}
              data={rowss}
              // data={rowData}
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

export default ServiceTypeList;
