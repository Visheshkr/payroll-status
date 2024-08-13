import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import VirtualKeyboard from '../Accordian/VirtualKeyboard';


const PayCommission = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [editId, setEditId] = useState(null);
  const pageId = 13;
  const { showSnackbar } = useSnackbar();
  const [currentInput, setCurrentInput] = useState('');
  const [editCount, setEditCount] = useState(0);
  const title = "Pay Commission";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validationSchema = yup.object({
    payCommEng: yup.string().required("Pay Commission in English is required"),
  
    
   
  });
  const formik = useFormik({
    initialValues: {
      payCommEng: "",
      payCommHindi: "",
    
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
          typeName: values.payCommEng,
          typeNameRegLang: values.payCommHindi,
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
            // console.log(response.data);
            if (response.data.statusCode === 200) {
              setRowss((prevValue) => {
                const updatedRows = [...prevValue];
                updatedRows[selectedRow] = {
                  ...updatedRows[selectedRow],
                  ...response.data?.result,
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
          typeName: values.payCommEng,
          typeNameRegLang: values.payCommHindi,
          typeCode: null,
          generalTypeId: pageId,
          isActive: true,
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
              showSnackbar("Data already present", "warning");
             
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
    // setIsReadable(false);
    setSelectedRow(null);
    setCurrentInput("");
    formik.resetForm();
  };
  
  const handleEdit = (index) => {
    setSelectedRow(index - 1);
    setEditId(rowss[index - 1].typeId);
    setBtnText("Update");
    setEditCount(1);
    formik.setFieldValue("payCommEng", rowss[index - 1].typeName);
    formik.setFieldValue("payCommHindi", rowss[index - 1].typeNameRegLang);
   
  };
 

  const handleInputChange = (input) => {
    formik.setFieldValue('payCommHindi',input);
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
      // field: "payCommEng",
      field: "typeName",
      headerName: "Pay Commission in English",
      flex: 1,
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      width: 300,
      headerClassName: "super-app-theme--header",
      headerName: "Pay Commission in Hindi",
      //   field: "payCommHindi",
      field: "typeNameRegLang",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        // console.log(params.row)
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
            onClick={() => handleEdit(params.row.index)}
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
                  <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Pay Commission in English"
                      name="payCommEng"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.payCommEng}
                      onFocus={()=>setCurrentInput('payCommEng')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payCommEng && !!formik.errors.payCommEng
                      }
                      helperText={
                        formik.touched.payCommEng && formik.errors.payCommEng
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Pay Commission in Hindi"
                      name="payCommHindi"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.payCommHindi}
                      onFocus={()=>setCurrentInput('payCommHindi')}
                      onKeyDown={handleKeyDown}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payCommHindi &&
                        !!formik.errors.payCommHindi
                      }
                      helperText={
                        formik.touched.payCommHindi &&
                        formik.errors.payCommHindi
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
            <PageTitle name="Pay Commission List" />
          </div>
          <Box component={"div"}>
            <SearchTable
              columns={columns}
              // data={rowss}
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
                 {currentInput === 'payCommHindi'  && <VirtualKeyboard onChange={handleInputChange}/>}
              </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
export default PayCommission;
