import SearchIcon from "@mui/icons-material/Search";
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Box
} from "@mui/material";
import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PaySlipPdf from "./PaySlipPdf";
import Loader from "../components/Loader";
import axiosClient from "../utils/AxiosInterceptor";
import { useSnackbar } from "../components/Snackbar";
import { useFormik } from "formik";
import * as yup from "yup";
import CachedIcon from "@mui/icons-material/Cached";

const PaySlip = () => {
const [showPaySlip,setShowPaySlip]=useState(false);
const [formData, setFormData] = useState();
const [yearMenu, setYearMenu] = useState([]);
const [monthMenu, setMonthMenu] = useState([]);
const [financialYearId, setFinancialYearId] = useState([]);
const [isLoader, setIsLoader] = useState(false);
const { showSnackbar } = useSnackbar();
const [searchBtnText, setSearchBtnText] = useState("Search");

const validationSchema = yup.object({
  year: yup.object().nullable().required("Year is required"),
  month: yup.object().nullable().required("Month is required"),
  employeeId: yup.string().required("Employee Id is required"),
});

const formik = useFormik({
  initialValues: {
      year:"",
      month: "",
      employeeId:""
  },
  validationSchema,
  onSubmit: (values) => {
    handleSearchData();
  },
});

useEffect(() => {
  setIsLoader(true);
  axiosClient
    .get(`${process.env.REACT_APP_PAYROLL_API_URL}/salary/dropdown/financial-year`)
    .then((response) => {
      if (response.data?.length === 0 || response.data === null) {
        showSnackbar("No data found", "warning");
        setYearMenu([]);
      } else {
          setYearMenu(response.data);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps

 
}, []);

useEffect(() => {
  if(financialYearId !== null){
  if(financialYearId?.id){
  setIsLoader(true);
  axiosClient
    .get(`${process.env.REACT_APP_PAYROLL_API_URL}/salary/dropdown/financial-pay-month/${financialYearId?.id}`)
    .then((response) => {
      if (response.data?.length === 0 ||  response.data === null) {
        showSnackbar("No data found", "warning");
        formik.setFieldValue('month',"");
        setMonthMenu([]);
      } else {
        setMonthMenu(response.data);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
}}
}, [financialYearId]);




const handleSearchCancel = () => {
  setSearchBtnText("Search");
  setShowPaySlip(false);
  setFinancialYearId([]);
  setMonthMenu([]);
  formik.resetForm();
};

const handleSearchData = () =>{
  let postData = {
    empId:formik.values?.employeeId,
    fyPaymonthId:formik.values?.month?.id
};
axiosClient
  .post(`${process.env.REACT_APP_PAYROLL_API_URL}/salary/slip`, postData)
  .then((response) => {
    if (response.data.statusCode === 200) {
      setFormData(response.data.result);
      showSnackbar(response.data?.message, "success");
      setShowPaySlip(true);
      setMonthMenu([]);
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
  });
};

  return (
    <>
    {isLoader && <Loader />}
    <div>
    <Grid container>
    <Grid xs={12}>
      <Card sx={{ my: 2 }} elevation={5}>
        <CardContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid
          container
          columnSpacing={2}
        >
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
          >
                                    <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    fullWidth 
                                    id="year"
                                    name="year"
                                    size="small"
                                    options={yearMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.year ? formik.values?.year :
                                        yearMenu.find(
                                        (option) =>
                                            option.id === formik.values.year?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("year", null);
                                        } else {
                                          setFinancialYearId(value);
                                        formik.setFieldValue("year", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Year"
                                        placeholder="Select Year"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.year &&
                                            formik.touched.year
                                            ? formik.errors.year
                                            : null
                                        }
                                        error={
                                            formik.errors.year &&
                                            formik.touched.year
                                            ? true
                                            : false
                                        }
                                        required
                                        />
                                    )}
                                    />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
          >
                     <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    fullWidth 
                                    id="month"
                                    name="month"
                                    size="small"
                                    options={monthMenu}
                                    disabled={!financialYearId || monthMenu.length === 0}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.month ? formik.values?.month :
                                        monthMenu.find(
                                        (option) =>
                                            option.id === formik.values.month?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("month", null);
                                        } else {
                                        formik.setFieldValue("month", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Month"
                                        placeholder="Select Month"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.month &&
                                            formik.touched.month
                                            ? formik.errors.month
                                            : null
                                        }
                                        error={
                                            formik.errors.month &&
                                            formik.touched.month
                                            ? true
                                            : false
                                        }
                                        required
                                        />
                                    )}
                                    />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
          >
                  <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="employeeId"
                      name="employeeId"
                      label="Employee Code"
                      placeholder="Select For Search By Employee Code"
                      size="small"
                      value={formik.values.employeeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.employeeId && !!formik.errors.employeeId
                      }
                      helperText={
                        formik.touched.employeeId && formik.errors.employeeId
                      }
                      required
                    />
        </Grid>
        <Box spacing={2} sx={{ textAlign: "center" ,m:"auto"}}>
                  <Button
                    sx={{
                      minWidth: 100,
                      ml: 1,
                      mt: { xs: 1, md: 0 },
                    }}
                    disabled={formik.values.year === "" && formik.values.month === ""}
                    variant="contained"
                    type="submit"
                  >
                    {searchBtnText}
                    &nbsp;
                    <SearchIcon/>
                  </Button>
                  <Button
                    type="button"
                    sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                    onClick={handleSearchCancel}
                    variant="outlined"
                  >
                    <CachedIcon />
                    &nbsp;RESET
                  </Button>
                </Box>
          </Grid>
              </Box>
        {/* <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
          >
                                <Button
                      variant="contained"
                      color="primary"
                       onClick={() => {
                    //   navigate('/paySlipPdf')
                    setShowPaySlip(true)
                      }}
                      >
                      <SearchIcon />  &nbsp; Search
                    </Button>
            </Grid> */}
        </CardContent>
        </Card>
        {showPaySlip && (
        <PaySlipPdf formData = {formData} />
        )}
        
        </Grid>
      </Grid>
    </div>
    </>
  )
}
export default PaySlip;
