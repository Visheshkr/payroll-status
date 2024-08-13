import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
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
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from "../../components/Loader";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import VirtualKeyboard from '../Accordian/VirtualKeyboard';

const EmployeeType = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [editId, setEditId] = useState(null);
  const [currentInput, setCurrentInput] = useState('');
  const [editCount, setEditCount] = useState(0);
  const pageId = 5;

  const title = "Employee Type";
  useTitle(title);

  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .post(`${process.env.REACT_APP_PAYROLL_API_URL}/master-fetch`, {
        parentId: pageId,  
      })
      .then((response) => {
        if (response.data?.result?.length === 0)
          showSnackbar("No data found", "warning");
        let resp = response.data?.result?.map((item) => item.generalMst);
        let responseData = resp[0]?.map((value, index) => {
          let rowData = { ...value, index: index + 1 };

          return rowData;
        });
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
    employeeTypeEnglish: yup.string().required("Employee Type in English is required"),
    // employeeTypeHindi: yup.string().required("Employee Type in Hindi is required"),
    
  });

  const formik = useFormik({
    initialValues: {
      employeeTypeEnglish: "",
      employeeTypeHindi: "",
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          typeId: editId,
          typeName: values.employeeTypeEnglish,
          typeNameRegLang: values.employeeTypeHindi,
          typeCode: null,
          generalTypeId: pageId,
          isActive: true,
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
            postData
          )

          .then((response) => {
            if (response.data.statusCode === 200) {
              setCurrentInput("");
              setRowss((prevValue) => {
                const updatedRows = [...prevValue];
                updatedRows[selectedRow] = {
                  ...updatedRows[selectedRow],
                  ...response.data?.result,
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
        setBtnText("Saving");

        let postData = {
          typeId: null,
          typeName: values.employeeTypeEnglish,
          typeNameRegLang: values.employeeTypeHindi,
          typeCode: null,
          generalTypeId: pageId,
          isActive: true,
        };
        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
            postData
          )
          .then((response) => {
            if (response.data?.result?.length === 0 || response.data?.result === null){
              showSnackbar("Data already Present", "warning");
             
           }else if (response.data.statusCode === 200) {
              const updatedRow = rowss.map((value) => ({
                ...value,
                index: value.index + 1,
              }));

              let newRow = response.data?.result;
              newRow = { index: 1, ...newRow };

              setRowss([newRow, ...updatedRow]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
            } else {
              showSnackbar(response.data?.message, "error");
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
    setCurrentInput("");
    formik.resetForm();
  };

  const handleEdit = (index) => {
    setSelectedRow(index - 1);
    setEditId(rowss[index - 1].typeId);
    setBtnText("Update");
    setEditCount(1);
    formik.setFieldValue("employeeTypeEnglish", rowss[index - 1].typeName);
    formik.setFieldValue("employeeTypeHindi", rowss[index - 1].typeNameRegLang);
    
  };

  

  const handleInputChange = (input) => {
    formik.setFieldValue('employeeTypeHindi',input);
  }

  const handleKeyDown = (event) =>{
    event.preventDefault();
  }

  const columns = [
    {
      field: "index",
      headerName: "Sr No.",
      flex: 0.1,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "typeName",
      headerName: "Employee Type (English)",
      flex: 0.2,
      minWidth: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "typeNameRegLang",
      headerName: "Employee Type (Hindi)",
      flex: 0.2,
      minWidth: 300,
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
                  <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="employeeTypeEnglish"
                      name="employeeTypeEnglish"
                      label="Employee Type in English"
                      size="small"
                      disabled={isReadable}
                      required
                      value={formik.values.employeeTypeEnglish}
                      onFocus={()=>setCurrentInput('employeeTypeEnglish')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.employeeTypeEnglish &&
                        !!formik.errors.employeeTypeEnglish
                      }
                      helperText={
                        formik.touched.employeeTypeEnglish &&
                        formik.errors.employeeTypeEnglish
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="employeeTypeHindi"
                      name="employeeTypeHindi"
                      label="Employee Type in Hindi"
                      size="small"
                      disabled={isReadable}
                      
                      value={formik.values.employeeTypeHindi}
                      onFocus={()=>setCurrentInput('employeeTypeHindi')}
                      onKeyDown={handleKeyDown}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.employeeTypeHindi &&
                        !!formik.errors.employeeTypeHindi
                      }
                      helperText={
                        formik.touched.employeeTypeHindi &&
                        formik.errors.employeeTypeHindi
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
            <PageTitle name="Employee Type List" />
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
          <Grid container>
            <Grid xs={12} sm={6}>
              {currentInput === 'employeeTypeHindi'  && <VirtualKeyboard onChange={handleInputChange}/>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default EmployeeType;
