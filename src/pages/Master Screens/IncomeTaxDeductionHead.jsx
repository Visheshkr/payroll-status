import CachedIcon from "@mui/icons-material/Cached";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from "../../components/Loader";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";


const IncomeTaxDeductionHead = () => {
  const [rowss, setRowss] = useState([]);
  const [searchRowss, setSearchRowss] = useState([]);
  const [taxEffectMenu, setTaxEffectMenu] = useState([]);
  const [payHeadEffectMenu, setPayHeadEffectMenu] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [searchBtnText, setSearchBtnText] = useState("Search");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [searchWork, setSearchWork] = useState(false);
  const { showSnackbar } = useSnackbar();

  const title = "Add Deduction Head";
  useTitle(title);

  useEffect(() => {
    setIsLoader(true);
    handleGetData();
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        if (response.data?.result?.length === 0) {
          showSnackbar("No data found", "warning");
        } else {
          let responseTaxEffectData = response.data?.result?.taxEffect?.map((value, index) => {
            let rowData = { 
                id:value.typeId,
                label:value.typeName
            };
            return rowData;
        })
            setTaxEffectMenu(responseTaxEffectData);

          let responsePayHeadEffectData = response.data?.result?.payHeadEffect?.map((value, index) => {
            let rowData = { 
                id:value.typeId,
                label:value.typeName
            };
            return rowData;
        })
            setPayHeadEffectMenu(responsePayHeadEffectData);
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

  const handleSearchGetData = () =>{
    setIsLoader(true);
    setSearchWork(true);
    axiosClient
      .post(`${process.env.REACT_APP_PAYROLL_API_URL}/getITaxDeducHead`,{
        deductionHeadName:searchFormik.values.searchDeductionHeadName,
        taxEffectId:searchFormik.values.searchTaxEffect?.id,
      })
      .then((response) => {
        if (response.data?.result?.length === 0 || response.data?.result === null) {
          showSnackbar("No data found", "warning");
          setSearchRowss([]);
        } else {
          
          let responseData = response.data.result.map((item)=>{
            let rowData = {
              ...item,
              deductionHeadName:item?.deductionHeadName,
              taxEffectName:item?.taxEffectId?.typeName,
              maxAmtLimit:item?.maxAmtLimit,
              payHeadEffectName:item?.payheadEffect?.typeName,
              underTaxLimit:item?.underTaxLimit,
            }
            return rowData;
          })
          setSearchRowss(responseData);
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
      .finally(() => 
        setIsLoader(false)
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const handleGetData = () =>{
    setIsLoader(true);
    axiosClient
      .post(`${process.env.REACT_APP_PAYROLL_API_URL}/getITaxDeducHead`,{
        deductionHeadName:"",
        taxEffectId:null
      })
      .then((response) => {
        if (response.data?.result?.length === 0) {
          showSnackbar("No data found", "warning");

        } else {
          
          let responseData = response.data.result.map((item)=>{
            let rowData = {
              ...item,
              deductionHeadName:item?.deductionHeadName,
              taxEffectName:item?.taxEffectId?.typeName,
              maxAmtLimit:item?.maxAmtLimit,
              payHeadEffectName:item?.payheadEffect?.typeName,
              underTaxLimit:item?.underTaxLimit,
            }
            return rowData;
          })
          setRowss(responseData);
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
  }

  const validationSchema = yup.object({
        deductionHeadName: yup.string().required("Deduction Head Name is required"),
        taxEffect: yup.object().nullable().required("Tax Effect is required"),
        underTaxLimit: yup.bool().required("Is Active is required"),
  });

  const searchFormik = useFormik({
    initialValues: {
        searchDeductionHeadName:"",
        searchTaxEffect: "",
    },
    onSubmit: (values) => {
      handleSearchGetData();
    },
  });
  const formik = useFormik({
    initialValues: {
        deductionHeadName: "",
        taxEffect:"",
        maxAmountLimit: "",
        payHeadEffect: "",
        underTaxLimit : false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow === null) {
        setBtnText("Saving");
        let postData = {
            deductionHeadName:values.deductionHeadName,
            taxEffectId:values.taxEffect?.id,
            maxAmtLimit:values.maxAmountLimit,
            payheadEffect:values.payHeadEffect?.id,
            underTaxLimit:values.underTaxLimit,
            displayOrder:1,
            userId: Number(localStorage.getItem("userId")),
        };
        axiosClient
          .post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITaxDeducHead`, postData)
          .then((response) => {
            if (response.data.statusCode === 200) {
              const rowData = {
                ...response.data.result,
                  taxEffectName:response.data.result?.taxEffectId?.typeName,
                  payHeadEffectName:response.data.result?.payheadEffect?.typeName,
              };
              setRowss([rowData, ...rowss]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
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

  const handleShowConfigurationForm = () => {
    setShowConfig(!showConfig);
}

  const handleSearchCancel = () => {
    setSearchBtnText("Search");
    setSearchWork(false);
    searchFormik.resetForm();
  };

  const handleChange = (event) => {
    formik.setFieldValue("underTaxLimit", event.target.checked);
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
      field: "deductionHeadName",
      headerName: "Deduction Head Name",
      flex: 0.2,
      minWidth: 160,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "taxEffectName",
      headerName: "Tax Effect",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "maxAmtLimit",
      headerName: "Max Amount Limit",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "payHeadEffectName",
      headerName: "PayHead Effect",
      flex: 0.2,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "underTaxLimit",
      headerName: "Status",
      flex: 0.1,
      minWidth: 80,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <>
      {isLoader && <Loader />}
      <Grid container>
        <Grid xs={12}>
          <Card sx={{ my: 2 }} elevation={5}>
            <CardContent>
              <PageTitle name="Income Tax Deduction Head" />
              <Box component="form" onSubmit={searchFormik.handleSubmit}>
                <Grid container columnSpacing={3}>
                <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="searchDeductionHeadName"
                      name="searchDeductionHeadName"
                      label="Deduction Head Name"
                      placeholder="Select For Search By Deduction Head Name"
                      size="small"
                      value={searchFormik.values.searchDeductionHeadName}
                      onChange={searchFormik.handleChange}
                      onBlur={searchFormik.handleBlur}
                      error={
                        searchFormik.touched.searchDeductionHeadName && !!searchFormik.errors.searchDeductionHeadName
                      }
                      helperText={
                        searchFormik.touched.searchDeductionHeadName && searchFormik.errors.searchDeductionHeadName
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="searchTaxEffect"
                      name="searchTaxEffect"
                      size="small"
                      options={taxEffectMenu}
                      value={
                        taxEffectMenu.find(
                          (option) => option.id === searchFormik.values.searchTaxEffect?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          searchFormik.setFieldValue("searchTaxEffect", null);
                        } else {
                          searchFormik.setFieldValue("searchTaxEffect", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tax Effect"
                          placeholder="Select For Search By Tax Effect"
                          onBlur={formik.handleBlur}
                          helperText={
                            searchFormik.errors.searchTaxEffect &&
                            searchFormik.touched.searchTaxEffect
                              ? searchFormik.errors.searchTaxEffect
                              : null
                          }
                          error={
                            searchFormik.errors.searchTaxEffect &&
                            searchFormik.touched.searchTaxEffect
                          }
                        />
                      )}
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
                    disabled={searchFormik.values.searchDeductionHeadName === "" && searchFormik.values.searchTaxEffect === ""}
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
              </Box>
              <Grid container  width="100%" sx={{mb:2}}>
                <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}} gap={2}>
                    <Button variant="contained" size="small" sx={{borderRadius:"4px"}} onClick={handleShowConfigurationForm}>Add Deduction Head </Button>
                </Grid>
            </Grid>
          <Box component={"div"}>
            <SearchTable
              columns={columns}
              data={ searchWork ? searchRowss : rowss}
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
        </Grid>
      </Grid>
      {showConfig && (
                <Card sx={{ my: 2 }} elevation={5}>
                <CardContent>
                            <PageTitle name={title} />
                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                <TextField
                                            margin="normal"
                                            fullWidth 
                                            type="text"
                                            id="deductionHeadName"
                                            name="deductionHeadName"
                                            label="Deduction Head Name"
                                            placeholder="Deduction Head Name"
                                            size='small'
                                            value={formik.values.deductionHeadName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.deductionHeadName && !!formik.errors.deductionHeadName}
                                            helperText={formik.touched.deductionHeadName && formik.errors.deductionHeadName}
                                            required
                                        />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    fullWidth 
                                    id="taxEffect"
                                    name="taxEffect"
                                    size="small"
                                    // disabled={ taxEffectMenu.length === 0}
                                    options={taxEffectMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.taxEffect ? formik.values?.taxEffect :
                                        taxEffectMenu.find(
                                        (option) =>
                                            option.id === formik.values.taxEffect?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("taxEffect", null);
                                        } else {
                                        formik.setFieldValue("taxEffect", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Tax Effect"
                                        placeholder="Select Tax Effect"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.taxEffect &&
                                            formik.touched.taxEffect
                                            ? formik.errors.taxEffect
                                            : null
                                        }
                                        error={
                                            formik.errors.taxEffect &&
                                            formik.touched.taxEffect
                                            ? true
                                            : false
                                        }
                                        required
                                        />
                                    )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                <TextField
                                            margin="normal"
                                            fullWidth 
                                            type="text" 
                                            id="maxAmountLimit"
                                            name="maxAmountLimit"
                                            label="Max Amount Limit"
                                            placeholder="Max Amount Limit"
                                            size='small'
                                            value={formik.values.maxAmountLimit}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.maxAmountLimit && !!formik.errors.maxAmountLimit}
                                            helperText={formik.touched.maxAmountLimit && formik.errors.maxAmountLimit}
                                        />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    fullWidth 
                                    id="payHeadEffect"
                                    name="payHeadEffect"
                                    size="small"
                                    // disabled={ payHeadEffectMenu.length === 0}
                                    options={payHeadEffectMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.payHeadEffect ? formik.values?.payHeadEffect :
                                        payHeadEffectMenu.find(
                                        (option) =>
                                            option.id === formik.values.payHeadEffect?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("payHeadEffect", null);
                                        } else {
                                        formik.setFieldValue("payHeadEffect", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Pay Head Effect"
                                        placeholder="Select PayHead Effect"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.payHeadEffect &&
                                            formik.touched.payHeadEffect
                                            ? formik.errors.payHeadEffect
                                            : null
                                        }
                                        error={
                                            formik.errors.payHeadEffect &&
                                            formik.touched.payHeadEffect
                                        }
                                        />
                                    )}
                                    />
                                </Grid>
                                <Grid xs={12} sm={4} sx={{ mt: 2}}>
                                    <FormGroup >
                                    <FormControlLabel  control={<Checkbox checked={formik.values.underTaxLimit } onChange={handleChange}/>} label="Under Tax Limit" />
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
          
         )}
    </>
  );
};

export default IncomeTaxDeductionHead;
