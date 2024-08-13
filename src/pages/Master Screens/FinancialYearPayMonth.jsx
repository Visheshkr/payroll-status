
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Loader from "../../components/Loader";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchIcon from "@mui/icons-material/Search";
import "react-alert-confirm/lib/style.css";

const FinancialYearPayMonth = () => {
      const [rowss, setRowss] = useState([]);
      const [searchRowss, setSearchRowss] = useState([]);
      const [selectedRow, setSelectedRow] = useState(null);
      const [editRowId, setEditRowId] = useState(null);
      const [financialYearMenu, setFinancialYearMenu] = useState([]);
      const [financialYearId, setFinancialYearId] = useState([]);
      const [currentYearMenu, setCurrentYearMenu] = useState([]);
      const [currentMonthMenu, setCurrentMonthMenu] = useState([]);
      const [btnText, setBtnText] = useState("Save");
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [isLoader, setIsLoader] = useState(false);
      const [searchWork, setSearchWork] = useState(false);
      const [searchBtnText, setSearchBtnText] = useState("Search");
      const { showSnackbar } = useSnackbar();
      const [showConfig, setShowConfig] = useState(false);
      const title = " Add Financial Year Pay Month ";
    
      useTitle(title);
    
      const validationSchema = yup.object({
        financialYear: yup.object().nullable().required("Financial Year is required"),
        currentYear: yup.object().nullable().required("Current Year is required"),
        currentMonth: yup.object().nullable().required("Current Month is required"),
        isActive: yup.bool().required("Is Active is required"),
      });
      const searchValidationSchema = yup.object({
        searchFinancialYear: yup.object().nullable().required("Financial Year is required"),
      });
    
      const searchFormik = useFormik({
        initialValues:{
          searchFinancialYear:"",
        },
        validationSchema:searchValidationSchema,
        onSubmit:(values) =>{
          handleGetSearchData();
        }
      })

      const formik = useFormik({
        initialValues: {
          financialYear: "",
          currentYear: "",
          currentMonth: "",
          isActive: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          setSelectedRow(null);
          setIsSubmitted(true);
          if (selectedRow !== null) {
            setBtnText("Updating");
            let postData = {
              id: editRowId,
              fyId: formik.values.financialYear?.id,
              currentYear: formik.values.currentYear?.id,
              monthId: formik.values.currentMonth?.id,
              isActive: formik.values.isActive,
            };
            axiosClient
              .post(
                `${process.env.REACT_APP_PAYROLL_API_URL}/saveFyPaymonth`,
                postData
              )
              .then((response) => {
                if (response.data.statusCode === 200 ) {
                  if(response.data.result === ""){
                    showSnackbar('Record already exits',"warning");
                  }
                  else{
                    const updatedRows = rowss;
                    const rowData = {
                      ...response.data.result,
                      fyName: response.data.result.fyId?.typeName,
                      fyId: response.data.result.fyId?.typeId,
                      currentYearName: response.data.result.currentYear?.typeName,
                      currentYear: response.data.result.currentYear?.typeId,
                      monthName: response.data.result.monthId?.monthDesc,
                      monthId: response.data.result.monthId?.monthId,
                    };
                    updatedRows[selectedRow] = rowData;
                    showSnackbar(response.data?.message, "success");
                    setBtnText("Save");
                    formik.resetForm();
                    handleGetData();
                  }
                } else {
                  setBtnText("Update");
                  showSnackbar(response.data?.message, "error");
                }
              })
              .catch((error) => {
                console.log(error);
                setBtnText("Update");
                showSnackbar(
                  error.response.data.message
                    ? error.response.data.message
                    : error.response.message,
                  "error"
                );
              })
              .finally(() => {
                setIsSubmitted(false);
              });
          } else {
            setBtnText("Saving");
            let postData = {
                id: null,
                fyId: formik.values.financialYear?.id,
                currentYear: formik.values.currentYear?.id,
                monthId: formik.values.currentMonth?.id,
                isActive: formik.values.isActive,
            };
            axiosClient
              .post(
                `${process.env.REACT_APP_PAYROLL_API_URL}/saveFyPaymonth`,
                postData
              )
              .then((response) => {
                if (response.data.statusCode === 200) {
                  if(response.data.result !== null){
                    const rowData = {
                      ...response.data.result,
                    };
                    setRowss([rowData,...rowss]);
                  }
                  setBtnText("Saving");
                  showSnackbar(response.data?.message, "success");
                  formik.resetForm();
                  handleGetData();
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
        }
      });

      useEffect(() => {
        setIsLoader(true);
        handleGetData();
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
            .then(response => {
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{
                let responseCurrentMonthData = response.data?.result?.months?.map((value, index) => {
                    let rowData = { 
                        id:value.typeId,
                        label:value.typeName
                    };
                    return rowData;
                })
                    setCurrentMonthMenu(responseCurrentMonthData);

                let responseFinancialYearData = response.data?.result?.financialYear?.map((value, index) => {
                    let rowData = { 
                        id:value.typeId,
                        label:value.typeName
                    };
                    return rowData;
                })
                    setFinancialYearMenu(responseFinancialYearData);
                }
            })
            .catch(error => {
                showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
            })
            .finally(() => setIsLoader(false));

        // eslint-disable-next-line react-hooks/exhaustive-deps

       
    }, []);

    const handleGetSearchData = () => {
      setSearchWork(true);
      setIsLoader(true);
      let postData;
          postData = {
              fyId:searchFormik.values.searchFinancialYear?.id
          }
      axiosClient
        .post( `${process.env.REACT_APP_PAYROLL_API_URL}/getFyPaymonth`,postData)
        .then((response) => {
          if (response.data?.result?.length === 0 || response.data.result === null){
            showSnackbar("No data found", "warning");
            setSearchRowss([]);
          }
          else{
          const rowData = response.data.result.map((item, index) => ({
            ...item,
          }));
          setSearchRowss(rowData);
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
          setRowss([]);
        })
        .finally(() => {
          setIsLoader(false)
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const handleGetData = () => {
      setIsLoader(true);
      let postData;
        postData = {
          fyId:null
      }
      axiosClient
        .post( `${process.env.REACT_APP_PAYROLL_API_URL}/getFyPaymonth`,postData)
        .then((response) => {
          if (response.data?.result?.length === 0 || response.data.result === null){
            showSnackbar("No data found", "warning");
              setRowss([]);
          }
          else{
          const rowData = response.data.result.map((item, index) => ({
            ...item,
          }));
              setRowss(rowData);
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
          setRowss([]);
        })
        .finally(() => setIsLoader(false));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    
    useEffect(() => {
      if(financialYearId !==null) 
      if (financialYearId.id) {
        setIsLoader(true);
        axiosClient
          .get(
            `${process.env.REACT_APP_PAYROLL_API_URL}/getCurrentYearByFyId/${financialYearId.id}`
          )
          .then((response) => {
            if (response.data?.result?.length === 0 || response.data.result === null ){
              showSnackbar("No data found for Current Year Menu", "warning");
              setCurrentYearMenu([]);
              formik.setFieldValue('currentYear',"");
            }
            else{    
            let responseData = response.data?.result?.map((value, index) => {
              let rowData = { ...value, index: index + 1 };
  
              return rowData;
            });
            setCurrentYearMenu(
              responseData.map((item, index) => ({
                id: item.typeId,
                label: item.typeName,
              }))
            );
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
          }   
    }, [financialYearId]);

    const handleSearchCancel = () => {
        setSearchBtnText("Search");
        setSearchWork(false);
        searchFormik.resetForm();
      };
  
      const handleShowConfigurationForm = () => {
          setShowConfig(!showConfig);
      }
      const handleCancel = () => {
        setBtnText("Save");
        setSelectedRow(null);
        setFinancialYearId([]);
        formik.resetForm();
      };
    
      const handleEdit =  (params,index) => {
        setSelectedRow(index - 1);
        setBtnText("Update");
        if(!showConfig) handleShowConfigurationForm();
        const selectedFinancialYear = financialYearMenu.find(option => option.label === rowss[index - 1].fyName);
        formik.setFieldValue("financialYear", selectedFinancialYear)
        setFinancialYearId(selectedFinancialYear);
        const selectedCurrentYear = { id :rowss[index-1].currentYear , label :rowss[index-1].currentYearName};
        formik.setFieldValue("currentYear", selectedCurrentYear)
        const selectedCurrentMonth = currentMonthMenu.find(option => option.label === rowss[index - 1].monthName);
        formik.setFieldValue("currentMonth", selectedCurrentMonth)
        formik.setFieldValue("isActive", rowss[index - 1].isActive);
        setEditRowId(rowss[index - 1].id);
      };
      
    const handleChange = (event) => {
        formik.setFieldValue("isActive", event.target.checked);
      };
    
      const columns = [
        {
          minWidth: 40,
          headerClassName: "super-app-theme--header",
          headerName: "Sr No.",
          field: "index",
          flex: 0.1,
        },
        {
          minWidth: 160,
          headerClassName: "super-app-theme--header",
          headerName: "Financial Year",
          field: "fyName",
          flex: 0.2,
        },
        {
          minWidth: 120,
          headerClassName: "super-app-theme--header",
          headerName: "Current Year",
          field: "currentYearName",
          flex: 0.2,
        },
        {
            minWidth: 130,
          headerClassName: "super-app-theme--header",
          headerName: "Current Month",
          field: "monthName",
          flex: 0.2,
        },
        {
            minWidth: 100,
            headerClassName: "super-app-theme--header",
            headerName: "Is Active",
            field: "isActive",
            flex: 0.1,
        },
        {
            minWidth: 80,
            headerClassName: "super-app-theme--header",
            headerName: "Action",
            field: "action",
          sortable: false,
          disableClickEventBubbling: true,
          renderCell: (params) => {
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
                onClick={() => handleEdit(params.row,params.row.index)}
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

          <Card>
                <CardContent>
                    <PageTitle name="Financial Year Pay Month" />
                    <Box component="form" onSubmit={searchFormik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6} >
                                                    <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        fullWidth
                                                        id="searchFinancialYear"
                                                        name="searchFinancialYear"
                                                        size='small'
                                                        options={financialYearMenu}
                                                        value={financialYearMenu.find(
                                                            (option) => option.id === searchFormik.values.searchFinancialYear?.id
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                searchFormik.setFieldValue("searchFinancialYear", null)
                                                            }
                                                            else {
                                                                searchFormik.setFieldValue("searchFinancialYear", value)
                                                            }
                                                        }}
            
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2, mb: 1 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Financial Year"
                                                                placeholder="Select Financial Year"
                                                                onBlur={searchFormik.handleBlur}
                                                                helperText={searchFormik.errors.searchFinancialYear && searchFormik.touched.searchFinancialYear ? searchFormik.errors.searchFinancialYear : null}
                                                                error={searchFormik.errors.searchFinancialYear && searchFormik.touched.searchFinancialYear }
                                                                required
                                                            />
                                                        )}
                                                    />
                                </Grid>
                                <Box spacing={2} sx={{mt:2,ml:3}}>
                                    <Button
                                        sx={{
                                            minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
                                        }}
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
                                        <CachedIcon />&nbsp;RESET
                                    </Button>
                      </Box>
                    </Grid>
                    
                    </Box>
                    <Grid container  width="100%" sx={{mb:2}}>
                <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}} gap={2}>
                    <Button variant="contained" size="small" sx={{borderRadius:"4px"}} onClick={handleShowConfigurationForm}>Add Financial Year Pay Month </Button>
                </Grid>
            </Grid>
                    <Box component={"div"} style={{ marginBottom: "-2%" }}>
                        <SearchTable
                        columns={columns}
                        data={searchWork ? searchRowss : rowss}
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

            
            {showConfig && (
                <Card sx={{ my: 2 }} elevation={5}>
                <CardContent>
                            <PageTitle name={title} />
                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                                    <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        fullWidth
                                                        id="financialYear"
                                                        name="financialYear"
                                                        size='small'
                                                        options={financialYearMenu}
                                                        value={financialYearMenu.find(
                                                            (option) => option.id === formik.values.financialYear?.id
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("financialYear", null)
                                                            }
                                                            else {
                                                                setFinancialYearId(value);
                                                                formik.setFieldValue("financialYear", value)
                                                            }
                                                        }}
            
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2, mb: 1 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Financial Year"
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.financialYear && formik.touched.financialYear ? formik.errors.financialYear : null}
                                                                error={formik.errors.financialYear && formik.touched.financialYear }
                                                                required
                                                            />
                                                        )}
                                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    fullWidth
                                    id="currentYear"
                                    name="currentYear"
                                    size="small"
                                    disabled={!financialYearId?.id || currentYearMenu.length === 0}
                                    options={currentYearMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.currentYear ? formik.values?.currentYear :
                                        currentYearMenu.find(
                                        (option) =>
                                            option.id === formik.values.currentYear?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("currentYear", null);
                                        } else {
                                        formik.setFieldValue("currentYear", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Current Year"
                                        placeholder="Select Current Year"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.currentYear &&
                                            formik.touched.currentYear
                                            ? formik.errors.currentYear
                                            : null
                                        }
                                        error={
                                            formik.errors.currentYear &&
                                            formik.touched.currentYear
                                        }
                                        required
                                        />
                                    )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    fullWidth
                                    id="currentMonth"
                                    name="currentMonth"
                                    size="small"
                                    options={currentMonthMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.currentMonth ? formik.values?.currentMonth :
                                        currentMonthMenu.find(
                                        (option) =>
                                            option.id === formik.values.currentMonth?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("currentMonth", null);
                                        } else {
                                        formik.setFieldValue("currentMonth", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Current Month"
                                        placeholder="Select Current Month"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.currentMonth &&
                                            formik.touched.currentMonth
                                            ? formik.errors.currentMonth
                                            : null
                                        }
                                        error={
                                            formik.errors.currentMonth &&
                                            formik.touched.currentMonth
                                        }
                                        required
                                        />
                                    )}
                                    />
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
         
          
        )}
        </>
        )
    };

export default FinancialYearPayMonth;