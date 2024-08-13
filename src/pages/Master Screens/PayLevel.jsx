import CachedIcon from "@mui/icons-material/Cached";
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
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useFormik } from "formik";
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import Loader from "../../components/Loader";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { values } from "lodash";

const PayLevel = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [payCommission, setPayCommission] = useState([]);
 

  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [pcServTypeId, setPcServTypeId] = useState(null);
  const [editId, setEditId] = useState(null);
  const pageId=31;

  const { showSnackbar } = useSnackbar();
  const title = "Pay Level";
  useTitle(title);
  const validationSchema = yup.object({
    payCommission: yup
      .object()
      .nullable()
      .required("Pay Commission is required"),
    payBandEnglish: yup
      .string()
      .nullable()
      .required("Pay Band in English is required"),
  });
  const formik = useFormik({
    initialValues: {
      payCommission: "",
      payBandEnglish: "",
      payBandHindi: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("Value", values);
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          typeId: editId,
          typeName:values.payBandEnglish,
          typeNameRegLang:values.payBandHindi,
          typeCode:null,
          generalTypeId:pageId,
          parentTypeId:formik.values.payCommission.id,
          isActive:true,
          createdBy:1
      
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
            postData
          )
          .then((response) => {
            // console.log(response.data.result, "pay-band");
            if (response.data.statusCode === 200) {
              // setRowss((prevValue) => {
              //   const updatedRows = [...prevValue];
              //   updatedRows[selectedRow] = {
              //     ...updatedRows[selectedRow],
              //     ...response.data?.result,

              //   payCommission:response.data.result?.parentTypeId?.typeName,
              //   payBandEnglish: response.data.result?.typeName,
              //   payBandHindi: response.data.result?.typeNameRegLang,
              //   };
                // return updatedRows;
              // });
              showSnackbar(response.data?.message, "success");
              setBtnText("Save");
              formik.resetForm();
              handleGetData();
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
          typeId: null,
          typeName:values.payBandEnglish,
          typeNameRegLang:values.payBandHindi,
          typeCode:null,
          generalTypeId:pageId,
          parentTypeId:formik.values.payCommission.id,
          isActive:true,
          createdBy:1
        };
        // console.log("Post Data",postData);
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
            postData
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data.statusCode === 200) {
              // const rowData = {
              //   ...response.data.result,
              //   payCommission:response.data.result?.parentTypeId?.typeName,
              //   payBandEnglish: response.data.result?.typeName,
              //   payBandHindi: response.data.result?.typeNameRegLang,
              // };
              // console.log("Row Data:::",rowData)
              // setRowss([rowData, ...rowss]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
              handleGetData();
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

  useEffect(() => {

    setIsLoader(true);
    handleGetData();
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
          setPayCommission(
            responseData.payCommission.map((item) => ({
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
  const handleGetData=()=>{
    setIsLoader(true);
      axiosClient
        .post(`${process.env.REACT_APP_PAYROLL_API_URL}/master-fetch`, {
          parentId: pageId,  
        })
        .then((response) => {
          if (response.data?.result?.length === 0)
            showSnackbar("No data found", "warning");
        
          
          let responseData = response.data.result[0].generalMst;
          let resData= responseData.map((value,index)=>({
              ...value,
              payCommission:value?.parentTypeId?.typeName,
              payBandEnglish:value?.typeName,
              payBandHindi:value?.typeNameRegLang
            })
          );
          setRowss(resData);
        })
        .catch((error) => {
          if(error.response){
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

  const handleCancel = () => {
    setBtnText("Save");
    // setIsReadable(false);
    setSelectedRow(null);
    formik.resetForm();
  };

  const handleEdit = (params, index) => {
    setSelectedRow(index - 1);
    setEditId(rowss[index - 1].typeId);

    setBtnText("Update");
    formik.setFieldValue("payCommission", {id:params?.parentTypeId?.typeId,label:params.parentTypeId?.typeName});
    formik.setFieldValue("payBandEnglish", params?.payBandEnglish);
    formik.setFieldValue("payBandHindi", params?.payBandHindi);
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
      field: "payCommission",
      headerName: "Pay Commission",
      flex: 0.2,
      minWidth: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "payBandEnglish",
      headerName: "Pay Band (English)",
      flex: 0.2,
      minWidth: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "payBandHindi",
      headerName: "Pay Band (Hindi)",
      flex: 0.2,
      minWidth: 200,
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
                      id="payCommission"
                      name="payCommission"
                      size="small"
                      // required
                      options={payCommission}
                      value={
                        payCommission.find(
                          (option) =>
                            option.id === formik.values.payCommission?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("payCommission", null);
                        } else {
                          formik.setFieldValue("payCommission", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Pay Commission"
                          onBlur={formik.handleBlur}
                          required
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
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="payBandEnglish"
                      name="payBandEnglish"
                      label="Pay Band in English"
                      size="small"
                      required
                      // disabled={isReadable}
                      value={formik.values.payBandEnglish}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payBandEnglish &&
                        !!formik.errors.payBandEnglish
                      }
                      helperText={
                        formik.touched.payBandEnglish &&
                        formik.errors.payBandEnglish
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="payBandHindi"
                      name="payBandHindi"
                      label="Pay Band in Hindi"
                      size="small"
                      value={formik.values.payBandHindi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payBandHindi &&
                        !!formik.errors.payBandHindi
                      }
                      helperText={
                        formik.touched.payBandHindi &&
                        formik.errors.payBandHindi
                      }
                    />
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
            <PageTitle name="Pay Level List" />
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
export default PayLevel;
