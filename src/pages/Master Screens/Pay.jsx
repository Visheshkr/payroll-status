import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Autocomplete, Box, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from '../../components/Snackbar';
import useTitle from '../../hooks/useTitle';
import PageTitle from '../../layouts/PageTitle';
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from '../../components/Loader';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Checkbox from '@mui/material/Checkbox';



const rowData=[
    {'Sr No.':1,"maxValue1":"Basic Pay","gradePay1":"मूल वेतन","matrixIndex1":"Basic","payCommission1":"Payments","payBand":"01","minValue":"01","headGroup1":"Include in Tax Calculation","effectiveDate1":"18-10-2023",},
    {'Sr No.':2,"maxValue1":"Band Pay","gradePay1":"बैंड वेतन","matrixIndex1":"Band","payCommission1":"Payments","payBand":"01","minValue":"01","headGroup1":"Include in Tax Calculation","effectiveDate1":"18-09-2023",},
    {'Sr No.':3,"maxValue1":"Grade Pay","gradePay1":"ग्रेड पे","matrixIndex1":"GP","payCommission1":"Payments","payBand":"01","payBand":"01","minValue":"01","headGroup1":"Include in Tax Calculation","effectiveDate1":"19-10-2023"}
]

const PayCommission = () => {

    const [rowss, setRowss] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [serviceType, setserviceType] = useState([]);
    const [payCommission, setpayCommission] = useState([{"id":1,"label":"Deduction"},{"id":2,"label":"Payments"},{"id":3,"label":"Recovery"}]);
    const [payCommissionFlag, setpayCommissionFlag] = useState("");
    const [payBand, setpayBand] = useState([]);
    const [btDescription, setBtDescription] = useState([]);
    const [majorSubMajorMinor, setMajorSubMajorMinor] = useState([]);
    const [groupType, setGroupType] = useState([]);
    // const [partnerId, setPartnerId] = useState([]);
    const [btnText, setBtnText] = useState("Save");
    const [isReadable, setIsReadable] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const title = "Pay Commission";
    useTitle(title);

    // useEffect(() => {

    //     setIsLoader(true);
    //     axiosClient.get(`${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/serviceType`).then(response => {

    //        setserviceType(response.data.result);
    //         //console.log("today response",response.data.result);
    //     })
    //         .catch(error => {
    //            setserviceType([]);
    //             console.log(error);
    //         })
    //         .finally(() => setIsLoader(false));

    //     setIsLoader(true);
    //     axiosClient.get(`${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/partnerId`).then(response => {
    //         setPartnerId(response.data.result);
    //         //console.log("today response",response.data.result);
    //     })
    //         .catch(error => {
    //             setPartnerId([]);
    //             console.log(error);
    //         })
    //         .finally(() => setIsLoader(false));

    //     setIsLoader(true);
    //     axiosClient.get(`${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/master/project`)
    //         .then(response => {

    //             if (response.data?.result?.length === 0)
    //                 showSnackbar("No data found", "warning");

    //             let responseData = response.data?.result?.map((value, index) => {
    //                 let rowData = { ...value, index: index + 1 };

    //                 return rowData;
    //             })
    //             setRowss(responseData);
    //         })
    //         .catch(error => {
    //             showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
    //             setRowss([]);
    //         })
    //         .finally(() => setIsLoader(false));


    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);



    const validationSchema = yup.object({
        maxValue: yup.string().required("Tiers Name In English is required"),
        gradePay: yup.string().required("Tiers Name In Hindi is required"),
        matrixIndex: yup.string().required("Rate Percentage is required"),
        payBand: yup.string().required("Description is required"),
        effectiveDate: yup.date().nullable().required("Effective From is required"),
        effectiveDate: yup.date().nullable().required("Effective To is required"),
        // serviceType: yup.object().nullable().required("Service Type is required"),
        // partnerId: yup.object().nullable().required("Partner Id is required"),

    });

    const formik = useFormik({
        initialValues: {
            maxValue: "",
            gradePay: "",
            effectiveDate: null,
            // serviceType: "",
            // partnerId: "",

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log("Value", values);
            setSelectedRow(null);
            setIsSubmitted(true);
            if (selectedRow !== null) {

                setBtnText("Updating");
                let postData = { ...values, maxValue: values.maxValue, gradePay: values.gradePay, effectiveDate: values.effectiveDate };

                axiosClient.put(`${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/master/project/${rowss[selectedRow].projectId}`, postData)

                    .then(response => {
                        // console.log(response.data);
                        if (response.data.statusCode === 200) {
                            setRowss((prevValue) => {

                                const updatedRows = [...prevValue];
                                updatedRows[selectedRow] = { ...updatedRows[selectedRow], ...response.data?.result };

                                // setIsReadable(false);

                                return updatedRows;
                            });
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
                // console.log(values);
                setBtnText("Saving");
                let postData = { ...values, maxValue: values.maxValue, gradePay: values.gradePay, effectiveDate: values.effectiveDate };
                // console.log("Post Data",postData);
                axiosClient.post(`${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/master/project`, postData)
                    .then(response => {
                        // console.log(response.data);

                        if (response.data.statusCode === 200) {
                            const updatedRow = rowss.map(value => ({ ...value, index: value.index + 1 }));

                            let newRow = response.data?.result;
                            newRow = { index: 1, ...newRow };

                            setRowss([newRow, ...updatedRow]);
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
        // setIsReadable(false);
        setSelectedRow(null);
        formik.resetForm();
    };

    // const handleEdit = (index) => {
    //     setSelectedRow(index - 1);

    //     let effectiveDate=rowss[index-1].effectiveDate;
    //     const dateParts=effectiveDate.split("-");
    //     effectiveDate=`${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
    //     // setIsReadable(true);
    //     console.log("Date::",effectiveDate);
    //     setBtnText("Update");
    //     formik.setFieldValue("maxValue", rowss[index - 1].maxValue);
    //     formik.setFieldValue("gradePay", rowss[index - 1].gradePay);
    //     formik.setFieldValue("effectiveDate", effectiveDate);
    //     // formik.setFieldValue("serviceType", rowss[index - 1].serviceType);
    //     // formik.setFieldValue("partnerId", rowss[index - 1].partnerId);


    // };
    const handleEdit = (index) => {
        setSelectedRow(index - 1);
        let effectiveDate = dayjs(rowss[index - 1].effectiveDate, "YYYY-MM-DD");
        setBtnText("Update");
        formik.setFieldValue("maxValue", rowss[index - 1].maxValue);
        formik.setFieldValue("gradePay", rowss[index - 1].gradePay);
        formik.setFieldValue("effectiveDate", effectiveDate);
    };
    const handleDelete = (index) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let values = rowss[index - 1];

                axiosClient.delete(`${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/master/project/${values.projectId}`)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data.statusCode === 200) {
                            const updatedRow = rowss.filter(value => value.index !== values.index).map((value, index) => ({ ...value, index: index + 1 }));

                            setRowss(updatedRow);
                            showSnackbar(response.data?.message, "success");
                        }
                        else {
                            showSnackbar(response.data?.message, "error");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
                    });
            }
        });
    }

    const columns = [
        {
            field: "index",
            headerName: "Sr No.",
            flex: 0.1,
            minWidth: 80,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "serviceType",
            headerName: "Service Type",
            flex: 0.3,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
            // valueGetter: (params) => params.row.serviceType.label,

        },
        {
            field: "payCommission",
            headerName: "Pay Commission",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            
        },
        {
            field: "payBand",
            headerName: "Pay Band Scale (Eng)",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            
        },
        {
            field: "minValue",
            headerName: "Min Value",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            
        },
        {
            field: "maxValue",
            headerName: "Max Value",
            flex: 0.3,
            minWidth: 200,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "gradePay",
            headerName: "Grade Pay",
            flex: 0.3,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
            
        },
        {
            field: "minServiceYear",
            headerName: "Min service years to be served",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            
        },
        // {
        //     field: "partnerId",
        //     headerName: "Partner Id",
        //     flex: 0.3,
        //     minWidth: 180,
        //     headerClassName: "super-app-theme--header",
        //     // valueGetter: (params) => params.row.partnerId.label,
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

                        <Button variant="contained" sx={{ color: 'black', backgroundColor: 'white', ":hover": { color: 'black', backgroundColor: 'white' }, borderRadius: '4px' }} endIcon={<EditIcon />} size="small" onClick={() => handleEdit(params.row.index)}>Edit</Button>

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
                <Grid xs={12} >
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
                                            id="serviceType"
                                            name="serviceType"
                                            size='small'
                                            required
                                            options={serviceType}
                                            value={serviceType.find(
                                                (option) => option.id === formik.values.serviceType?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("serviceType", null)
                                                }
                                                else {
                                                    formik.setFieldValue("serviceType", value)
                                                }
                                            }}

                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Service Type"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.serviceType && formik.touched.serviceType ? formik.errors.serviceType : null}
                                                    error={formik.errors.serviceType && formik.touched.serviceType ? true : false}
                                                />
                                            )}
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={4}>
                                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="payCommission"
                                            name="payCommission"
                                            size='small'
                                            required
                                            options={payCommission}
                                            value={payCommission.find(
                                                (option) => option.id === formik.values.payCommission?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                
                                                if (value === null) {


                                                   
                                                    formik.setFieldValue("payCommission", null)
                                                }
                                                else {
                                                   
                                                    formik.setFieldValue("payCommission", value)
                                                }
                                            }}

                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Pay Commission"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.payCommission && formik.touched.payCommission ? formik.errors.payCommission : null}
                                                    error={formik.errors.payCommission && formik.touched.payCommission ? true : false}
                                                />
                                            )}
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={4}>
                                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="payBand"
                                            name="payBand"
                                            size='small'
                                            required
                                            options={payBand}
                                            value={payBand.find(
                                                (option) => option.id === formik.values.payBand?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("payBand", null)
                                                }
                                                else {
                                                    formik.setFieldValue("payBand", value)
                                                }
                                            }}

                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Pay Band"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.payBand && formik.touched.payBand ? formik.errors.payBand : null}
                                                    error={formik.errors.payBand && formik.touched.payBand ? true : false}
                                                />
                                            )}
                                        />

                                    </Grid>
                                    
                                    
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="minValue"
                                            name="minValue"
                                            label="Min Value"
                                            size='small'
                                            required
                                            disabled={isReadable}
                                            value={formik.values.minValue}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.minValue && !!formik.errors.minValue}
                                            helperText={formik.touched.minValue && formik.errors.minValue}
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="maxValue"
                                            name="maxValue"
                                            label="Max Value"
                                            size='small'
                                            required
                                            disabled={isReadable}
                                            value={formik.values.maxValue}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.maxValue && !!formik.errors.maxValue}
                                            helperText={formik.touched.maxValue && formik.errors.maxValue}
                                        />

                                    </Grid>
                                    
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="gradePay"
                                            name="gradePay"
                                            label="Grade Pay"
                                            size='small'
                                            disabled={isReadable}
                                            value={formik.values.gradePay}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.gradePay && !!formik.errors.gradePay}
                                            helperText={formik.touched.gradePay && formik.errors.gradePay}
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="matrixIndex"
                                            name="matrixIndex"
                                            label="Matrix Index"
                                            size='small'
                                            disabled={isReadable}
                                            value={formik.values.matrixIndex}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.matrixIndex && !!formik.errors.matrixIndex}
                                            helperText={formik.touched.matrixIndex && formik.errors.matrixIndex}
                                        />

                                    </Grid>
                                   
                                    
                                    {/* <Grid xs={12} sm={4} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                          <DatePicker
                                            id="effectiveDate"
                                            sx={{ width: '100%', mt:2 }}
                                            name='effectiveDate'
                                            disableFuture
                                            format="DD/MM/YYYY"
                                            value={formik.values.effectiveDate}
                                            onChange={value => formik.setFieldValue("effectiveDate", value)}
                                            onBlur={formik.handleBlur}
                                            label="Effective From"
                                            slotProps={{ textField: { size: 'small' } }}

                                            renderInput={(params) => (
                                            <TextField
                                            size="small"
                                            fullWidth
                                            margin="0"
                                            required
                                            {...params}
                                            error={formik.touched.effectiveDate && Boolean(formik.errors.effectiveDate)}
                                            helperText={formik.touched.effectiveDate && formik.errors.effectiveDate}
                                            onBlur={formik.handleBlur}

                                            />
                                        )}
                                        />
                                       </LocalizationProvider>

                 
                                    </Grid> */}
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="description"
                                            name="description"
                                            label="Description"
                                            size='small'
                                            disabled={isReadable}
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.description && !!formik.errors.description}
                                            helperText={formik.touched.description && formik.errors.description}
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="minServiceYear"
                                            name="minServiceYear"
                                            label="Min service years to be served"
                                            size='small'
                                            disabled={isReadable}
                                            value={formik.values.minServiceYear}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.minServiceYear && !!formik.errors.minServiceYear}
                                            helperText={formik.touched.minServiceYear && formik.errors.minServiceYear}
                                        />

                                    </Grid>
                                    {/* <Grid item xs={12} sm={6} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Effective To"
                                                sx={{ width: '100%', mt: 2 }}
                                                value={formik.values.effectiveTo}
                                                slotProps={{ textField: { size: 'small' } }}
                                                onChange={(value) => formik.setFieldValue("effectiveTo", value)}
                                                renderInput={(params) => <TextField
                                                    {...params}
                                                    fullWidth
                                                    size="small"

                                                    margin="0"
                                                    required

                                                    error={formik.touched.effectiveTo && Boolean(formik.errors.effectiveTo)}
                                                    helperText={formik.touched.effectiveTo && formik.errors.effectiveTo}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </Grid> */}
                                    {/* <Grid xs={12} sm={4}>
                                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="serviceType"
                                            name="serviceType"
                                            size='small'
                                            options={serviceType}
                                            value={serviceType.find(
                                                (option) => option.id === formik.values.serviceType?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("serviceType", null)
                                                }
                                                else {
                                                    formik.setFieldValue("serviceType", value)
                                                }
                                            }}

                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Service Type"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.serviceType && formik.touched.serviceType ? formik.errors.serviceType : null}
                                                    error={formik.errors.serviceType && formik.touched.serviceType ? true : false}
                                                />
                                            )}
                                        />

                                    </Grid> */}
                                    {/* <Grid xs={12} sm={4} >
                                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="partnerId"
                                            name="partnerId"
                                            size='small'
                                            options={partnerId}
                                            value={partnerId.find(
                                                (option) => option.id === formik.values.partnerId?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("partnerId", null)
                                                }
                                                else {
                                                    formik.setFieldValue("partnerId", value)


                                                }
                                            }}

                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Partner Id"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.partnerId && formik.touched.partnerId ? formik.errors.partnerId : null}
                                                    error={formik.errors.partnerId && formik.touched.partnerId ? true : false}
                                                />
                                            )}
                                        />

                                    </Grid> */}



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
                                        {/* {
                                            isSubmitted ?
                                                <CircularProgress color="inherit" size={15} />
                                                :
                                                <SaveAltIcon sx={{ ml: 0.2 }}></SaveAltIcon>
                                        } */}
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
                 
                
                    <Box component={"div"} >
                        <SearchTable
                            columns={columns}
                            // data={rowss}
                            data={rowData}
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

export default PayCommission ;
