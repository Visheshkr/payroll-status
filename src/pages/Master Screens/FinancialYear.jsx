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
  Tooltip
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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const FinancialYear = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const { showSnackbar } = useSnackbar();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [editId, setEditId] = useState(null);
  const pageId = 4;

  const title = "Financial Year";
  useTitle(title);

  useEffect(() => {
    axiosClient
      .post(`${process.env.REACT_APP_PAYROLL_API_URL}/master-fetch`, {
        parentId: pageId,
      })
      .then((response) => {
        if (response.data?.result?.length === 0)
          showSnackbar("No data found", "warning");
        let resp = response.data?.result?.map((item) => item.generalMst);

        let responseData = resp[0]?.map((value, index) => {
          let rowData = { ...value, 
            createdOn:value.createdOn?dayjs(new Date(Date.parse(value.createdOn))).format("YYYY-MM-DD  HH:mm:ss"):null,

            updatedOn:value.updatedOn?dayjs(new Date(Date.parse(value.updatedOn))).format("YYYY-MM-DD  HH:mm:ss"):null,
            index: index + 1 };

          return rowData;
        });
        // console.log("Response::",responseData)
        setRowss(responseData);
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
  }, []);

  const validationSchema = yup.object({
    typeName: yup.string().matches(/^\d{4}-\d{4}$/,'Financial year must be in the format YYYY-YYYY').required("Financial Year is required"),
    isActive: yup.bool().required("Is Active is required")
  });

  const formik = useFormik({
    initialValues: {
      typeId: null,
      typeName: "",
      typeNameRegLang: "",
      typeCode: null,
      generalId: pageId,
      isActive: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          typeId: editId,
          typeName: values.typeName,
          typeNameRegLang: null,
          typeCode: null,
          generalTypeId: pageId,
          isActive: formik.values.isActive,
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
            postData
          )

          .then((response) => {
            // console.log(response.data);
            
            if (response.data.statusCode === 200) {
              if(response.data.result !== ""){
              setRowss((prevValue) => {
                const updatedRows = [...prevValue];
                updatedRows[selectedRow] = {
                  ...updatedRows[selectedRow],
                  ...response.data?.result,
                  createdOn:response.data?.result.createdOn?dayjs(new Date(Date.parse(response.data?.result.createdOn))).format("YYYY-MM-DD  HH:mm:ss"):null,

                updatedOn:response.data?.result.updatedOn?dayjs(new Date(Date.parse(response.data?.result.updatedOn))).format("YYYY-MM-DD  HH:mm:ss"):null,
                  
                };

                // setIsReadable(false);

                return updatedRows;
              });
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
            if(error.response){
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
          typeName: values.typeName,
          typeNameRegLang: null,
          typeCode: null,
          generalTypeId: pageId,
          isActive: formik.values.isActive,
        };
        // console.log("Post Data",postData);
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
            postData
          )
          .then((response) => {
            // console.log(response.data);
            if (response.data?.result?.length === 0 || response.data?.result === null){
              showSnackbar("Data already Present", "warning");
             
           }else if (response.data.statusCode === 200) {
              const updatedRow = rowss.map((value) => ({
                ...value,
                index: value.index + 1,
              }));

              let newRow = response.data?.result;
              newRow = { index: 1, ...newRow,
                createdOn:newRow.createdOn?dayjs(new Date(Date.parse(newRow.createdOn))).format("YYYY-MM-DD  HH:mm:ss"):null,

                updatedOn:newRow.updatedOn?dayjs(new Date(Date.parse(newRow.updatedOn))).format("YYYY-MM-DD  HH:mm:ss"):null,
               };

              setRowss([newRow, ...updatedRow]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
            } 
            else {
              showSnackbar(response.data?.message, "error")
            }
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
    setSelectedRow(null);
    formik.resetForm();
  };

  const handleEdit = (index) => {
    setSelectedRow(index - 1);
    setEditId(rowss[index - 1].typeId);
    setBtnText("Update");
    formik.setFieldValue("typeName", rowss[index - 1].typeName);
    formik.setFieldValue("isActive", rowss[index - 1].isActive);
  };

  const handleChange = (event) => {
    formik.setFieldValue("isActive",event.target.checked);
  };
  const columns = [
    {
      field: "index",
      headerName: "Sr No.",
      flex: 0.1,
      // minWidth: 80,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "typeName",
      headerName: "Financial Year",
      flex: 0.2,
      // minWidth: 180,
      minWidth: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "isActive",
      headerName: "Is Active",
      flex: 0.2,
      // minWidth: 180,
      minWidth: 250,
      headerClassName: "super-app-theme--header",
    },

    // {
    //   field: "createdOn",
    //   headerName: "Created At",
    //   flex: 0.2,
    //   minWidth: 180,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "updatedOn",
    //   headerName: "Updated At",
    //   flex: 0.2,
    //   minWidth: 180,
    //   headerClassName: "super-app-theme--header",
    // },
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
                  <Grid xs={12} sm={7} smOffset={2.5}>
                  <Tooltip title='Financial Year must be in the format YYYY-YYYY'>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="typeName"
                      name="typeName"
                      label="Financial Year"
                      size="small"
                      required
                      disabled={isReadable}
                      value={formik.values.typeName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.typeName && !!formik.errors.typeName
                      }
                      helperText={
                        formik.touched.typeName && formik.errors.typeName
                      }
                      
                    />
                    </Tooltip>
                  </Grid>
                  <Grid xs={12} sm={12} sx={{display:"flex",justifyContent:"center"}}>
                    <FormGroup >
                      <FormControlLabel  control={<Checkbox checked={formik.values.isActive} onChange={handleChange}/>} label="Is Active" />
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
            <PageTitle name="Financial Year List" />
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


export default FinancialYear;
