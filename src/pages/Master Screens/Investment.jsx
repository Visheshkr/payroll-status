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



const InvestmentMaster = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [editId, setEditId] = useState(null);
  const [itSectionMenu, setITSectionMenu] = useState([]);
  const { showSnackbar } = useSnackbar();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const title = "Investment";
  useTitle(title);

  const getITSectionList=()=>{
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getITSectionScheme`)
      .then((response) => {
        if (response.data?.result?.length === 0)
          showSnackbar("No data found", "warning");

        let responseData = response.data?.result?.map((value, index) => {
          let rowData = {
            ...value,
            itSection: value.sectionName,
            investmentNameEnglish: value.schemeName,
            investmentNameHindi: value.schemeNameRegLang,
            effectiveFrom: dayjs(
              new Date(Date.parse(value.effectiveFrom))?.toLocaleDateString()
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

  }

  useEffect(() => {
   
    setIsLoader(true);
    getITSectionList();
    axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getITSectionSchemeDropdown`).then(response => {
        setITSectionMenu(response.data?.result?.map((item)=>(
        {
          id:item.sectionId,
          label:item.sectionName
        })));
    })
        .catch(error => {
            setITSectionMenu([]);
            console.log(error);
        })
        .finally(() => setIsLoader(false));

   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = yup.object({
    itSection: yup.object().required("IT Section is required"),
    investmentNameEnglish: yup.string().required("Investment Name (English) is required"),
    effectiveFrom: yup.date().nullable().required("Effective From is required"),
    isActive: yup.bool().required("Is Active is required"),
    
  });

  const formik = useFormik({
    initialValues: {
      itSection: "",
      investmentNameEnglish: "",
      investmentNameHindi: "",
      effectiveFrom: null,
      isActive:false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    //   console.log("Value", values);
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
            id: editId,
            sectionId: values.itSection.id,
            schemeName: values.investmentNameEnglish,
            schemeNameRegLang: values.investmentNameHindi,
            /////////////////////////////////////
            effectiveFrom: dayjs(
              new Date(
                Date.parse(formik.values.effectiveFrom)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            /////////////////////////////////////
            isActive: formik.values.isActive,
            crtBy:localStorage.getItem('userId')
            
          };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/saveITSectionScheme`,
            postData
          )

          .then((response) => {
            // console.log(response.data);
            if (response.data.statusCode === 200) {
              // setRowss((prevValue) => {
              //   const updatedRows = [...prevValue];
              //   updatedRows[selectedRow] = {
              //     ...updatedRows[selectedRow],
              //     ...response.data?.result,
              //     itSection: response.data?.result?.sectionId?.sectionName,
              //     investmentNameEnglish: response.data?.result?.schemeName,
              //     investmentNameHindi: response.data?.result?.schemeNameRegLang,
              //     effectiveFrom: dayjs(
              //       new Date(
              //         Date.parse(response.data?.result.effectiveFrom)
              //       )?.toLocaleDateString()
              //     ).format("YYYY-MM-DD"),
                 
              //   };
              //   return updatedRows;
              // });
              showSnackbar(response.data?.message, "success");
              setBtnText("Save");
              formik.resetForm();
              getITSectionList();
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
          sectionId: values.itSection.id,
            schemeName: values.investmentNameEnglish,
            schemeNameRegLang: values.investmentNameHindi,
            /////////////////////////////////////
            effectiveFrom: dayjs(
              new Date(
                Date.parse(formik.values.effectiveFrom)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD"),
            /////////////////////////////////////
            isActive: formik.values.isActive,
            crtBy:localStorage.getItem('userId')
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/saveITSectionScheme`,
            postData
          )
          .then((response) => {
            // console.log(response.data);

            if (response.data.statusCode === 200) {
              // const updatedRow = rowss.map((value) => ({
              //   ...value,
              //   index: value.index + 1,
              // }));

              // let newRow = response.data?.result;
              // newRow = { index: 1, ...newRow,
              //     itSection: newRow.sectionId.sectionName,
              //     investmentNameEnglish: newRow.schemeName,
              //     investmentNameHindi: newRow.schemeNameRegLang,
              //     effectiveFrom: dayjs(
              //       new Date(
              //         Date.parse(newRow.effectiveFrom)
              //       )?.toLocaleDateString()
              //     ).format("YYYY-MM-DD"),
                  
              //  };
              // setRowss([newRow, ...updatedRow]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
              getITSectionList();
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

 
  const handleEdit = (params,index) => {
    setSelectedRow(index - 1);
    setEditId(params.id);
    setBtnText("Update");
    // console.log("Param::",params);
    ///////////////////////////////////////////////////////////////////////
    const stateLabel = itSectionMenu.find(option => option.id === params.sectionId);
    formik.setFieldValue("itSection", stateLabel);
    //////////////////////////////////////////////////////////////////////
    formik.setFieldValue(
      "investmentNameEnglish",
      params.investmentNameEnglish
    );
    formik.setFieldValue(
        "investmentNameHindi",
        params.investmentNameHindi
      );
    //////////////////////////////////////////////////////////////////////
    let effectiveFrom = dayjs(params.effectiveFrom, "YYYY-MM-DD");
    formik.setFieldValue("effectiveFrom", effectiveFrom);
    formik.setFieldValue("isActive", params.isActive);
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
      field: "itSection",
      headerName: "IT Section",
      flex: 0.3,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "investmentNameEnglish",
      headerName: "Investment Name (English)",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "investmentNameHindi",
      headerName: "Investment Name (Hindi)",
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
      field: "isActive",
      headerName: "Is Active",
      flex: 0.2,
      minWidth: 100,
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
              onClick={() => handleEdit(params.row,params.row.index)}
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
                      id="itSection"
                      name="itSection"
                      size="small"
                      // options={employeeTypeid}
                      options={itSectionMenu}
                      value={
                        itSectionMenu.find(
                          (option) => option.id === formik.values.itSection?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("itSection", null);
                        } else {
                          formik.setFieldValue("itSection", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="IT Section"
                          required
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.itSection && formik.touched.itSection
                              ? formik.errors.itSection
                              : null
                          }
                          error={
                            formik.errors.itSection && formik.touched.itSection
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
                      id="investmentNameEnglish"
                      name="investmentNameEnglish"
                      label="Investment Name (English)"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.investmentNameEnglish}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.investmentNameEnglish &&
                        !!formik.errors.investmentNameEnglish
                      }
                      helperText={
                        formik.touched.investmentNameEnglish &&
                        formik.errors.investmentNameEnglish
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="small"
                      fullWidth
                      type="text"
                      id="investmentNameHindi"
                      name="investmentNameHindi"
                      label="Investment Name (Hindi)"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.investmentNameHindi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.investmentNameHindi &&
                        !!formik.errors.investmentNameHindi
                      }
                      helperText={
                        formik.touched.investmentNameHindi &&
                        formik.errors.investmentNameHindi
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
                        slotProps={{ textField: { size: "small",required:true} }}
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
                     sm={4} md={4} lg={4}
                   
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
            <PageTitle name="Investment List" />
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

export default InvestmentMaster;
