import { Box, Autocomplete, Button, Card, CardContent, Grid,FormGroup, Stack, TextField } from '@mui/material'
import React from 'react'
import useTitle from '../../hooks/useTitle'
import PageTitle from '../../layouts/PageTitle'
import SearchTable from '../../components/SearchTableAlt';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axiosClient from '../../utils/AxiosInterceptor';
import { useSnackbar } from '../../components/Snackbar';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import AlertConfirm, { Button1 } from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import dayjs from 'dayjs';

const IncomeTaxSactionLimit = () => {
    
    useTitle('Income Tax Section')

    const {showSnackbar} = useSnackbar();
    const [responseData, setResponseData] = useState([]);
    const [sectionDataDropdown, setSectionDataDropdown] = useState([]);
    const [isActive, setIsActive] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const user = useSelector((state) => state.loginReducer);
    // console.log('user', user.data.userdetails.user?.userId)

    const handleGetData = () => {
        setIsLoader(true);
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getITSanctionLimit`)
        .then((response) => {
        if (response.data?.result?.length === 0)
            showSnackbar("No data found", "warning");
    
        const res = response?.data?.result;
        console.log(res);
        const flattenedData = res.map((item,index) => ({
            id: item?.id,
            index:index+1,
            itsectionId: item?.itsectionId?.id,
            isActive: item?.isActive,
            sectionName: item?.itsectionId?.sectionName,
            maxDeductAmt:item?.maxDedAmt,
            effectiveFrom: item?.effectiveFrom.slice(0, 10),
            effectiveTo: item?.effectiveTo ? item.effectiveTo.slice(0, 10) : '--'
        }))
        setResponseData(flattenedData)
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
    
    const getSectionDropdown = () => {
        setIsLoader(true);
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
        .then((response) => {
        if (response.data?.result?.length === 0)
            showSnackbar("No data found", "warning");
            
        const res = response?.data?.result;
        console.log('dropdown', res);
        const sectionNameDropdown = res?.sections?.map((item) => ({
            id: item?.typeId,
            label: item?.typeName
        }))
        setSectionDataDropdown(sectionNameDropdown);
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

    useEffect(() => {
        handleGetData();
        getSectionDropdown();
    }, []);



    const validationSchema = yup.object({
        sectionName: yup.object().nullable().required("Section name is required"),
        maxDeduct: yup.string().required("Maximum deduction amount is required"),
    });

    //Below is the saving functionality from the form
    const formik = useFormik({
        initialValues: {
            sectionName:'',
            maxDeduct:'',
            effectiveFrom:null,
            effectiveTo:null
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            callConfirmDialogFormSave(values, resetForm);
            
        }
    })
    console.log(formik.values);
    

    const callConfirmDialogFormSave = async (values, resetForm) => {
        const [action] = await AlertConfirm({
          title: "Confirm",
          desc: "Are you sure, you want to submit?",
        });
        AlertConfirm.config({
          okText: "Submit",
          cancelText: "Cancel",
        });
        if (action) {
            console.log('kp-Submit', action);
            handleSave(values, resetForm);
        } else {
        //   setIsSubmit(false);
            showSnackbar('Did not save!', 'error')
        }
    };

    const handleSave = async(values, resetForm) => {
        console.log('values', values)
        let date = new Date(formik.values?.effectiveFrom)
        let date1 = new Date(formik.values?.effectiveTo)
        let formattedDate = dayjs(date?.toLocaleDateString()).format("YYYY-MM-DD");
        let formattedDate1 = dayjs(date1?.toLocaleDateString()).format("YYYY-MM-DD");
        console.log(formattedDate, formattedDate1);
        const payload = {
            id: null,
            itsectionId: formik.values?.sectionName?.id,
            maxDedAmt: formik.values?.maxDeduct,
            effectiveFrom: formattedDate,
            effectiveTo : formattedDate1,
            isActive: true,
            userId: user.data.userdetails.user?.userId
        }
        
        console.log('payload', payload);
        
        try {
            const response =  await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITSanctionLimit`, payload);
            console.log('submitted', response);
            showSnackbar('Saved Succesfully', 'success');
            resetForm();
            if(response?.data?.status){
                handleGetData();
            }
        } catch (error) {
            showSnackbar('Failed', 'error');
        }
    }




    //Below is the Saving functionality from the Checkbox in Table
    
    
    const handleChange = (event, params) => {
        console.log(event)
        console.log(params)
        callConfirmDialog(params, event);
    };

    const callConfirmDialog = async (params, event) => {
        const [action] = await AlertConfirm({
          title: "Confirm",
          desc: "Are you sure, you want to submit?",
        });
        AlertConfirm.config({
          okText: "Submit",
          cancelText: "Cancel",
        });
        if (action) {
            console.log('kp-Submit', action);
            submitDetails(params, event);
        } else {
        //   setIsSubmit(false);
            showSnackbar('Did not save!', 'error')
        }
    };

    const submitDetails = async(params, event) => {
        console.log(params)
        const payload = {
            id: params?.id,
            itsectionId: params?.itsectionId,
            maxDedAmt: params?.maxDeductAmt,
            effectiveFrom: params?.effectiveFrom,
            isActive : !params.isActive,
            userId: user.data.userdetails.user?.userId
        }
        
        console.log('payload', payload);
        try {
            const response =  await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITSanctionLimit`, payload);
            console.log('submitted', response);
            showSnackbar('Saved Succesfully', 'success');
            // setSuccessfullySubmitted(true)
            if(response?.data?.status){
                handleGetData();
            }
            // setIsActive(isActive);
        } catch (error) {
            showSnackbar('Failed', 'error');
            // setIsActive(isActive);
        }
    }
    const columns = [
        {
            field: "index",
            headerName: "Sr No.",
            flex: 0.1,
            minWidth: 40,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "sectionName",
            headerName: "Section Name",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "maxDeductAmt",
            headerName: "Maximum Deduction Amount",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "effectiveFrom",
            headerName: "Effective From Date",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "effectiveTo",
            headerName: "Effective To Date",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "isActive",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            flex: 0.1,
            minWidth: 250,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <>
                        <FormGroup>
                            <FormControlLabel  control={<Checkbox checked={params.row.isActive} onChange={(event) => handleChange(event, params.row)}/>} label="Is Active" />
                        </FormGroup>
                    </>
                );
            },
        },
    ]



    const [showForm, setShowForm] = useState(false);
    const handleShowIncomeTaxSectionForm = () => {
        setShowForm(!showForm);
    }

    const today = dayjs();
    const tomorrow = dayjs().add(0, 'day');
    return (
        <div>
            {isLoader && <Loader />}
            <Card>
                <CardContent>
                    <PageTitle name="Income Tax Section Sanctioned Limit"/>
                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}} gap={2}>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}} onClick={handleShowIncomeTaxSectionForm}>Add Income Tax Section</Button>
                        </Grid>
                    </Grid>
                    <Grid container sx={{mt:2}}>
                        <Grid item>
                            <SearchTable 
                                columns={columns}
                                data={responseData}
                                isCheckbox={false}
                                isHideDensity={false}
                                isHideExport={true}
                                isHideFilter={true}
                                isHideColumn={true}
                                isHidePaging={false}
                                name="villageName"
                                id="villageName"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {showForm && (
                <>
                    <Card>
                        <CardContent>
                            <PageTitle name="Add Income Tax Section Sanctioned Limit"/>
                            <Box component= "form" onSubmit={formik.handleSubmit}>
                            <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        id="sectionName"
                                        name="sectionName"
                                        size="small"
                                        // options={payHeadGroup}
                                        options={sectionDataDropdown}
                                        value={
                                            sectionDataDropdown.find(
                                            (option) =>
                                                option.id === formik.values.sectionName?.id
                                            ) || null
                                        }
                                        onChange={(e, value) => {
                                            if (value === null) {
                                            formik.setFieldValue("sectionName", null);
                                            } else {
                                            formik.setFieldValue("sectionName", value);
                                            }
                                        }}
                                        getOptionLabel={(value) => value.label}
                                        // sx={{ width: "100%", mt: 2, mb: 1 }}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            label="Section Name"
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.errors.sectionName &&
                                                formik.touched.sectionName
                                                ? formik.errors.sectionName
                                                : null
                                            }
                                            error={
                                                formik.errors.sectionName &&
                                                formik.touched.sectionName
                                                ? true
                                                : false
                                            }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <TextField label="Maximum Deduction Amount" name="maxDeduct" value={formik.values.maxDeduct} onChange={formik.handleChange} size="small" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale={"en-gb"}
                                        >
                                        <DatePicker
                                            id="effectiveFrom"
                                            name="effectiveFrom"
                                            // disableFuture
                                            format="DD/MM/YYYY"
                                            value={formik.values?.effectiveFrom}
                                            onChange={(value) =>
                                            formik.setFieldValue("effectiveFrom", Date.parse(value))
                                            }
                                            label="Effective From"
                                            slotProps={{ textField: { size: "small" } }}
                                            renderInput={(params) => (
                                            <TextField
                                                size="small"
                                                fullWidth
                                                margin="0"
                                                {...params}
                                            />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale={"en-gb"}
                                    >
                                        <DatePicker
                                            id="effectiveTo"
                                            name="effectiveTo"
                                            label="Effective To Date"
                                            format="DD/MM/YYYY"
                                            minDate={tomorrow}
                                            fullWidth
                                            value={formik.values?.effectiveTo}
                                            onChange={(value) =>
                                            formik.setFieldValue("effectiveTo", Date.parse(value))
                                            }
                                            sx={{ width: "100%" }}
                                            slotProps={{ textField: { size: "small" } }}
                                            renderInput={(params) => (
                                                <TextField
                                                    size="small"
                                                    margin="0"  
                                                    fullWidth
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>

                            <Grid container  width="100%" sx={{mt:2}}>
                                <Grid item sx={{display:'flex',justifyContent:'center', width:'100%'}} gap={2}>
                                    <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Reset</Button>
                                    <Button variant="contained" size="small" sx={{borderRadius:"4px"}} type='submit'>Add Record</Button>
                                </Grid>
                            </Grid>
                        </Box>    
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}

export default IncomeTaxSactionLimit
