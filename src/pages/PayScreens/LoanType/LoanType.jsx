
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Stack,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Loader from "../../../components/Loader";
import SearchTable from "../../../components/SearchTableAlt";
import { useSnackbar } from "../../../components/Snackbar";
import PageTitle from "../../../layouts/PageTitle";
import axiosClient from "../../../utils/AxiosInterceptor";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "react-alert-confirm/lib/style.css";
import VisibilityIcon from '@mui/icons-material/Visibility';

const LoanType = () => {
      const [rowss, setRowss] = useState([]);
      const [editRowId, setEditRowId] = useState(null);
      const [financialYearId, setFinancialYearId] = useState([]);
      const [principalPayHeadMenu, setPrincipalPayHeadMenu] = useState([]);
      const [billTypeMenu, setBillTypeMenu] = useState([]);
      const [claimTypeMenu, setClaimTypeMenu] = useState([]);
      const [interestPayHeadMenu, setInterestPayHeadMenu] = useState([]);
      const [btnText, setBtnText] = useState("Save");
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [selectedRow, setSelectedRow] = useState(null);
      const [isLoader, setIsLoader] = useState(false);
      const { showSnackbar } = useSnackbar();
      const [showConfig, setShowConfig] = useState(false);
    
      const validationSchema = yup.object({
        loanType: yup.string().required("Loan Type is required"),
        principalPayHead: yup.object().nullable().required("Principal PayHead is required"),
        billType: yup.object().nullable().required("Bill Type is required"),
        claimType: yup.object().nullable().required("Claim Type is required"),
        isActive: yup.bool().required("Is Active is required"),
        noOfDisbursement: yup.string().when('isActive',{
          is:true,
          then: yup.string().max(3,"Maximum length must be 3").required("No Of Disbursement is required")
        }),
        
      });

      const formik = useFormik({
        initialValues: {
            loanType: "",
            principalPayHead: "",
            interestPayHead: "",
            billType: "",
            claimType: "",
            isActive: false,
            noOfDisbursement:"",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          setSelectedRow(null);
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
                }
            })
            .catch(error => {
                showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
            })
            .finally(() => setIsLoader(false));

        // eslint-disable-next-line react-hooks/exhaustive-deps

       
    }, []);


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
            }
            else{    
            let responseData = response.data?.result?.map((value, index) => {
              let rowData = { ...value, index: index + 1 };
  
              return rowData;
            });
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
  
      const handleShowConfigurationForm = () => {
          setShowConfig(!showConfig);
      }
      const handleCancel = () => {
        setBtnText("Save");
        setSelectedRow(null);
        formik.resetForm();
      };
    
      const handleEdit =  (params,index) => {
        setSelectedRow(index - 1);
        setBtnText("Update");
        if(!showConfig) handleShowConfigurationForm();
        formik.setFieldValue("loanType",  rowss[index - 1].fyName)
        const selectedPrincipalPayHead = { id :rowss[index-1].currentYear , label :rowss[index-1].currentYearName};
        formik.setFieldValue("principalPayHead", selectedPrincipalPayHead)
        const selectedInterestPayHeadMenu = interestPayHeadMenu.find(option => option.label === rowss[index - 1].monthName);
        formik.setFieldValue("interestPayHead", selectedInterestPayHeadMenu)
        const selectedBillType = billTypeMenu.find(option => option.label === rowss[index - 1].monthName);
        formik.setFieldValue("billType", selectedBillType)
        const selectedClaimType = claimTypeMenu.find(option => option.label === rowss[index - 1].monthName);
        formik.setFieldValue("claimType", selectedClaimType)
        formik.setFieldValue("isActive", rowss[index - 1].isActive);
        formik.setFieldValue("noOfDisbursement",rowss[index-1].isActive);
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
          headerName: "Loan Type",
          field: "fyName",
          flex: 0.2,
        },
        {
          minWidth: 120,
          headerClassName: "super-app-theme--header",
          headerName: "Principal PayHead",
          field: "currentYearName",
          flex: 0.2,
        },
        {
            minWidth: 130,
          headerClassName: "super-app-theme--header",
          headerName: "Interest PayHead",
          field: "monthName",
          flex: 0.2,
        },
        {
            minWidth: 80,
            headerClassName: "super-app-theme--header",
            headerName: "Status",
            field: "isActive",
            flex: 0.2,
        },
        {
            minWidth: 120,
            headerClassName: "super-app-theme--header",
            headerName: "Action",
            field: "action",
          sortable: false,
          flex: 0.2,
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
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#286cb4",
                        ":hover": { color: "white", backgroundColor: "#286cb4" },
                        borderRadius: "4px",
                      }}
                      startIcon={<VisibilityIcon />}
                      size="small"
                      onClick={() => {
                        //handleView(params.row.RoleId)
                      }}
                    >
                      View
                    </Button>

                </Stack >
             
            );
          },
        },
      ];

      return (
        <>
          {isLoader && <Loader />}

          <Card>
                <CardContent>
                {/* <PageTitle name={title} /> */}
                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <Grid container columnSpacing={3}>
                                <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text" 
                                            id="loanType"
                                            name="loanType"
                                            label="Loan Type"
                                            placeholder="Enter Loan Type"
                                            size='small'
                                            value={formik.values.loanType}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.loanType && !!formik.errors.loanType}
                                            helperText={formik.touched.loanType && formik.errors.loanType}
                                            required
                                        />
 
                                    </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                                    <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        fullWidth
                                                        id="principalPayHead" 
                                                        name="principalPayHead"
                                                        size='small'
                                                        options={principalPayHeadMenu}
                                                        value={principalPayHeadMenu.find(
                                                            (option) => option.id === formik.values.principalPayHead?.id
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("principalPayHead", null)
                                                            }
                                                            else {
                                                                setFinancialYearId(value);
                                                                formik.setFieldValue("principalPayHead", value)
                                                            }
                                                        }}
            
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2, mb: 1 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Principal PayHead"
                                                                placeholder="Select Principal PayHead"
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.principalPayHead && formik.touched.principalPayHead ? formik.errors.principalPayHead : null}
                                                                error={formik.errors.principalPayHead && formik.touched.principalPayHead }
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
                                    id="interestPayHead"
                                    name="interestPayHead"
                                    size="small" 
                                    options={interestPayHeadMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.interestPayHead ? formik.values?.interestPayHead :
                                        interestPayHeadMenu.find(
                                        (option) =>
                                            option.id === formik.values.interestPayHead?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("interestPayHead", null);
                                        } else {
                                        formik.setFieldValue("interestPayHead", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Interest PayHead"
                                        placeholder="Select Interest PayHead"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.interestPayHead &&
                                            formik.touched.interestPayHead
                                            ? formik.errors.interestPayHead
                                            : null
                                        }
                                        error={
                                            formik.errors.interestPayHead &&
                                            formik.touched.interestPayHead
                                        }
                                        />
                                    )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    fullWidth 
                                    id="billType"
                                    name="billType"
                                    size="small"
                                    options={billTypeMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.billType ? formik.values?.billType :
                                        billTypeMenu.find(
                                        (option) =>
                                            option.id === formik.values.billType?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("billType", null);
                                        } else {
                                        formik.setFieldValue("billType", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Bill Type"
                                        placeholder="Select Bill Type"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.billType &&
                                            formik.touched.billType
                                            ? formik.errors.billType
                                            : null
                                        }
                                        error={
                                            formik.errors.billType &&
                                            formik.touched.billType
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
                                    id="claimType"
                                    name="claimType"
                                    size="small"
                                    options={claimTypeMenu}
                                    isOptionEqualToValue={(option,value)=>option.label === value.label}
                                    value={formik.values?.claimType ? formik.values?.claimType :
                                        claimTypeMenu.find(
                                        (option) =>
                                            option.id === formik.values.claimType?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("claimType", null);
                                        } else {
                                        formik.setFieldValue("claimType", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="Claim Type"
                                        placeholder="Select Claim Type"
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.claimType &&
                                            formik.touched.claimType
                                            ? formik.errors.claimType
                                            : null
                                        }
                                        error={
                                            formik.errors.claimType &&
                                            formik.touched.claimType
                                        }
                                        required
                                        />
                                    )}
                                    />
                                </Grid>
                                <Grid xs={12} sm={4} sx={{mt:2}}>
                    <FormGroup >
                      <FormControlLabel  control={<Checkbox checked={formik.values.isActive} onChange={handleChange}/>} label="Is applicable for parts payment" />
                    </FormGroup>
                  </Grid>
                  <Grid xs={12} sm={4} sx={{display:!formik.values?.isActive && "none" }}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text" 
                                            id="noOfDisbursement" 
                                            name="noOfDisbursement"
                                            label="No. of Disbursement"
                                            placeholder="No. of Disbursement"
                                            size='small'
                                            inputProps={{maxLength:3}}
                                            value={formik.values.noOfDisbursement}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.noOfDisbursement && !!formik.errors.noOfDisbursement}
                                            helperText={formik.touched.noOfDisbursement && formik.errors.noOfDisbursement}
                                            required
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

                <Card sx={{ my: 2 }} elevation={5}>
                <CardContent>
                <PageTitle name=" Loan Type List" />
                    <Box component={"div"} style={{ marginBottom: "-2%" }}>
                        <SearchTable
                        columns={columns}
                        data={ rowss}
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
        )
    };

export default LoanType;