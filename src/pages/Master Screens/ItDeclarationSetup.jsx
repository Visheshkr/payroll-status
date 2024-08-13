import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import { Autocomplete, Box, Button, Card, CardContent, Stack, TextField } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import {  useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from '../../components/Snackbar';
import useTitle from '../../hooks/useTitle';
import PageTitle from '../../layouts/PageTitle';
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from '../../components/Loader';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const ItDeclarationSetup = () => {

    const [rowss, setRowss] = useState([]);
    const [financialYearMenu, setFinancialYearMenu] = useState([]);
    const [updateId, setUpdateId] = useState();
    const [selectedRow, setSelectedRow] = useState(null);
    const [btnText, setBtnText] = useState("Save");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
 
 
    const title = "IT Declaration Setup";
    useTitle(title);
    
    useEffect(() => {

        setIsLoader(true);
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
            .then(response => {
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{
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

    useEffect(() => {

        setIsLoader(true);
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getITDeclaration`)
            .then(response => {
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{
                    console.log(response.data.result,"result it declaration")
                let responseData = response.data?.result?.map((value, index) => {
                    let rowData = { 
                        ...value,
                        financialYear:value?.fyId?.typeName,
                        itDeclarationStartDate:dayjs(new Date(Date.parse(value?.itDecSubFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                        itDeclarationEndDate:dayjs(new Date(Date.parse(value?.itDecSubTo))?.toLocaleDateString()).format("YYYY-MM-DD"),
                        proofOfInvestmentStartDate:dayjs(new Date(Date.parse(value?.proofInvSubFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                        proofOfInvestmentEndDate:dayjs(new Date(Date.parse(value?.proofInvSubTo))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    };
                    return rowData;
                    })
                    setRowss(responseData);
                }
            })
            .catch(error => {
                showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
            })
            .finally(() => setIsLoader(false));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const validationSchema = yup.object({
        financialYear: yup.object().nullable().required("Financial year is required"),
        itDeclarationStartDate: yup.date().nullable().required("IT Declaration Start Date is required"),
        itDeclarationEndDate: yup.date().nullable().required("IT Declaration End Date is required"),
        proofOfInvestmentStartDate: yup.date().nullable().required("Proof Of Investment Start Date is required"),
        proofOfInvestmentEndDate: yup.date().nullable().required("Proof Of Investment End Date is required"),
        isActive: yup.bool().required("Is Active is required")
    });
 
    const formik = useFormik({
        initialValues: {
            financialYear: "",
            itDeclarationStartDate: null,
            itDeclarationEndDate: null,
            proofOfInvestmentStartDate: null,
            proofOfInvestmentEndDate: null,
            isActive:false,
 
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            setSelectedRow(null);
            setIsSubmitted(true);
            if (selectedRow !== null) {
 
                setBtnText("Updating");
                let postData = {
                    "id": updateId,
                    "fyId": values.financialYear.id,
                    "itDecSubFrom": dayjs(new Date(Date.parse(values?.itDeclarationStartDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "itDecSubTo": dayjs(new Date(Date.parse(values?.itDeclarationEndDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "proofInvSubFrom": dayjs(new Date(Date.parse(values?.proofOfInvestmentStartDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "proofInvSubTo": dayjs(new Date(Date.parse(values?.proofOfInvestmentEndDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "isActive":values?.isActive,
                    "userId": Number(localStorage.getItem('userId'))
                    };
 
                    axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITDeclaration`, postData)
 
                    .then(response => {
                        if (response.data.statusCode === 200) {
                            if(response.data.result !== null){
                                const updatedRows = rowss;
                                let rowData = { 
                                    ...response.data.result,
                                    financialYear:response.data.result?.fyId?.typeName,
                                    itDeclarationStartDate:dayjs(new Date(Date.parse(response.data.result?.itDecSubFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                                    itDeclarationEndDate:dayjs(new Date(Date.parse(response.data.result?.itDecSubTo))?.toLocaleDateString()).format("YYYY-MM-DD"),
                                    proofOfInvestmentStartDate:dayjs(new Date(Date.parse(response.data.result?.proofInvSubFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                                    proofOfInvestmentEndDate:dayjs(new Date(Date.parse(response.data.result?.proofInvSubTo))?.toLocaleDateString()).format("YYYY-MM-DD"),
                                };
                                updatedRows[selectedRow] = rowData;
                            }
                            showSnackbar(response.data?.message, "success");
                            setBtnText("Save");
                            formik.resetForm();
                        }
                        else {
                            setBtnText("Update");
                            showSnackbar(response.data?.message, "error");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        setBtnText("Update");
                        showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
                    })
                    .finally(() => {
                        setIsSubmitted(false);
                    });
            } else {
                setBtnText("Saving");
                let postData = {
                    "id": null,
                    "fyId": values.financialYear?.id,
                    "itDecSubFrom": dayjs(new Date(Date.parse(values?.itDeclarationStartDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "itDecSubTo": dayjs(new Date(Date.parse(values?.itDeclarationEndDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "proofInvSubFrom": dayjs(new Date(Date.parse(values?.proofOfInvestmentStartDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "proofInvSubTo": dayjs(new Date(Date.parse(values?.proofOfInvestmentEndDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "isActive":values?.isActive,
                    "userId": Number(localStorage.getItem('userId'))
                    };
                axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITDeclaration`, postData)
                    .then(response => {
 
                        if (response.data.statusCode === 200) {
                            let rowData = { 
                                ...response.data.result,
                                financialYear:response.data.result?.fyId?.typeName,
                                itDeclarationStartDate:dayjs(new Date(Date.parse(response.data.result?.itDecSubFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                                itDeclarationEndDate:dayjs(new Date(Date.parse(response.data.result?.itDecSubTo))?.toLocaleDateString()).format("YYYY-MM-DD"),
                                proofOfInvestmentStartDate:dayjs(new Date(Date.parse(response.data.result?.proofInvSubFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                                proofOfInvestmentEndDate:dayjs(new Date(Date.parse(response.data.result?.proofInvSubTo))?.toLocaleDateString()).format("YYYY-MM-DD"),
                            };
                            setRowss([rowData,...rowss]);
                            setBtnText("Saving");
                            showSnackbar(response.data?.message, "success");
                            formik.resetForm();
 
                        }
                        else {
                           
                            showSnackbar(response.data?.message, "error");
                        }
                    })
                    .catch(error => {
                       
                        showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
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
        let itDeclarationStartDateEffectiveFrom =dayjs(rowss[index - 1].itDeclarationStartDate, "YYYY-MM-DD");
        let itDeclarationEndDateEffectiveFrom = dayjs(rowss[index - 1].itDeclarationEndDate, "YYYY-MM-DD");
        let proofOfInvestmentStartDateEffectiveFrom = dayjs(rowss[index - 1].proofOfInvestmentStartDate, "YYYY-MM-DD");
        let proofOfInvestmentEndDateEffectiveFrom = dayjs(rowss[index - 1].proofOfInvestmentEndDate, "YYYY-MM-DD");
        setBtnText("Update");
        const selectedFinancialyear = financialYearMenu.find(option => option.label === rowss[index - 1].financialYear);
        formik.setFieldValue("financialYear", selectedFinancialyear);
        formik.setFieldValue("itDeclarationStartDate", itDeclarationStartDateEffectiveFrom);
        formik.setFieldValue("itDeclarationEndDate", itDeclarationEndDateEffectiveFrom);
        formik.setFieldValue("proofOfInvestmentStartDate",proofOfInvestmentStartDateEffectiveFrom);
        formik.setFieldValue("proofOfInvestmentEndDate", proofOfInvestmentEndDateEffectiveFrom);
        formik.setFieldValue('isActive',rowss[index-1].isActive);
        setUpdateId(rowss[index-1].id);
    };

    const handleChange = (event) => {
        formik.setFieldValue("isActive",event.target.checked);
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
            field: "financialYear",
            headerName: "Financial Year",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "itDeclarationStartDate",
            headerName: "IT Declaration StartDate",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "itDeclarationEndDate",
            headerName: "IT Declaration EndDate",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "proofOfInvestmentStartDate",
            headerName: "Proof Of Investment StartDate",
            flex: 0.2,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "proofOfInvestmentEndDate",
            headerName: "Proof Of Investment EndDate",
            flex: 0.2,
            minWidth: 220,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "action",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            flex: 0.1,
            minWidth: 140,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={1}>

                        {/* <Button variant="contained" sx={{ color: 'black', backgroundColor: 'white', ":hover": { color: 'black', backgroundColor: 'white' }, borderRadius: '4px' }} endIcon={<EditIcon />} size="small" onClick={() => handleEdit(params.row.index)}>Edit</Button> */}
                        <EditIcon fontSize="medium" color="primary" sx={{ color: 'black', ":hover": { color: 'black', backgroundColor: 'white' }, borderRadius: '4px' }} onClick={() => handleEdit(params.row.index)}/>

                    </Stack>
                );
            },
        },

    ];
    return (
        <>
            {isLoader && <Loader />}
            <Grid container>
                <Grid xs={12} >
                    <Card sx={{ my: 2 }} elevation={5}>
                        <CardContent>
                            <PageTitle name="Add IT Declaration Setup" />
                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <Grid container columnSpacing={3}>
                                    <Grid xs={12} sm={4} >
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
                                                    error={formik.errors.financialYear && formik.touched.financialYear}
                                                    required
                                                />
                                            )}
                                        />
 
                                    </Grid>

                                    <Grid xs={12} sm={4} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                            <DatePicker
                                                id="itDeclarationStartDate"
                                                sx={{ width: '100%', mt:2 }}
                                                name='itDeclarationStartDate'
                                                disablePast
                                                format="DD/MM/YYYY"
                                                value={formik.values.itDeclarationStartDate}
                                                onChange={value => formik.setFieldValue("itDeclarationStartDate",value)}
                                                onBlur={formik.handleBlur}
                                                label="IT Declaration Start Date"
                                                slotProps={{ textField: { size: 'small', required: true } }}
    
                                                renderInput={(params) => (
                                                <TextField
                                                size="small"
                                                fullWidth
                                                margin="0"
                                                required
                                                {...params}
                                                error={formik.touched.itDeclarationStartDate && Boolean(formik.errors.itDeclarationStartDate)}
                                                helperText={formik.touched.itDeclarationStartDate && formik.errors.itDeclarationStartDate}
                                                onBlur={formik.handleBlur}
    
                                                />
                                            )}
                                            />
                                        </LocalizationProvider>
                                    </Grid> 

                                    <Grid xs={12} sm={4} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                            <DatePicker
                                                id="itDeclarationEndDate"
                                                sx={{ width: '100%', mt:2 }}
                                                name='itDeclarationEndDate'
                                                format="DD/MM/YYYY"
                                                minDate={formik.values.itDeclarationStartDate}
                                                value={formik.values.itDeclarationEndDate}
                                                onChange={value => formik.setFieldValue("itDeclarationEndDate", value)}
                                                onBlur={formik.handleBlur}
                                                label="IT Declaration End Date"
                                                slotProps={{ textField: { size: 'small', required: true } }}
    
                                                renderInput={(params) => (
                                                <TextField
                                                size="small"
                                                fullWidth
                                                margin="0"
                                                required
                                                {...params}
                                                error={formik.touched.itDeclarationEndDate && Boolean(formik.errors.itDeclarationEndDate)}
                                                helperText={formik.touched.itDeclarationEndDate && formik.errors.itDeclarationEndDate}
                                                onBlur={formik.handleBlur}
                                                />
                                            )}
                                            />
                                        </LocalizationProvider>
                                    </Grid> 


                                    <Grid xs={12} sm={4} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                            <DatePicker
                                                id="proofOfInvestmentStartDate"
                                                sx={{ width: '100%', mt:2 }}
                                                name='proofOfInvestmentStartDate'
                                                minDate={formik.values.itDeclarationEndDate}
                                                format="DD/MM/YYYY"
                                                value={formik.values.proofOfInvestmentStartDate}
                                                onChange={value => formik.setFieldValue("proofOfInvestmentStartDate",value)}
                                                onBlur={formik.handleBlur}
                                                label="Proof Of Investment Submission Start Date"
                                                slotProps={{ textField: { size: 'small', required: true} }}
    
                                                renderInput={(params) => (
                                                <TextField
                                                size="small"
                                                fullWidth
                                                margin="0"
                                                required
                                                {...params}
                                                error={formik.touched.proofOfInvestmentStartDate && Boolean(formik.errors.proofOfInvestmentStartDate)}
                                                helperText={formik.touched.proofOfInvestmentStartDate && formik.errors.proofOfInvestmentStartDate}
                                                onBlur={formik.handleBlur}
                                                />
                                            )}
                                            />
                                        </LocalizationProvider>
                                    </Grid> 


                                    <Grid xs={12} sm={4} >
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                            <DatePicker
                                                id="proofOfInvestmentEndDate"
                                                sx={{ width: '100%', mt:2 }}
                                                name='proofOfInvestmentEndDate'
                                                format="DD/MM/YYYY"
                                                minDate={formik.values.proofOfInvestmentStartDate}
                                                value={formik.values.proofOfInvestmentEndDate}
                                                onChange={value => formik.setFieldValue("proofOfInvestmentEndDate",value)}
                                                onBlur={formik.handleBlur}
                                                label="Proof Of Investment Submission End Date"
                                                slotProps={{ textField: { size: 'small' , required: true } }}
    
                                                renderInput={(params) => (
                                                <TextField
                                                size="small"
                                                fullWidth
                                                margin="0"
                                                required
                                                {...params}
                                                error={formik.touched.proofOfInvestmentEndDate && Boolean(formik.errors.proofOfInvestmentEndDate)}
                                                helperText={formik.touched.proofOfInvestmentEndDate && formik.errors.proofOfInvestmentEndDate}
                                                onBlur={formik.handleBlur}
                                                />
                                            )}
                                            />
                                        </LocalizationProvider>
                                    </Grid> 

                                    <Grid item xs={12} sm={4} sx={{mt:2}}>
                                        <FormGroup >
                                            <FormControlLabel  control={<Checkbox checked={formik.values.isActive} onChange={handleChange}/>} label="Is Active" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                                <Box
                                    spacing={2}
                                    sx={{ mt: 1, textAlign: 'center' }}
                                >
                                    <Button
                                        sx={{
                                            minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
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
                                        <CachedIcon />&nbsp;RESET
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Card>
                <CardContent>
                    <div style={{marginBottom:'-2%'}}>
                    <PageTitle name="IT Declaration Setup" />
                    </div>
               
                    <Box component={"div"} >
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
}
 
export default ItDeclarationSetup;