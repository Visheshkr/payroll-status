import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import {Box, Button, Card, CardContent, Stack, TextField } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from '../../components/Snackbar';
import useTitle from '../../hooks/useTitle';
import PageTitle from '../../layouts/PageTitle';
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from '../../components/Loader';
import cookies from 'js-cookie';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import VirtualKeyboard from '../Accordian/VirtualKeyboard';


const DetailHead = () => {
    
    const Token = cookies.get('token');
    const [rowss, setRowss] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [typeIdUpdate, setTypeIdUpdate] = useState(null);
    const [btnText, setBtnText] = useState("Save");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
    const [currentInput, setCurrentInput] = useState('');
  
    
    const title = "Detail Head";
    useTitle(title);

    useEffect(() => {

        setIsLoader(true);
        axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/finance-head-fetch`,{
            "ftypeId": 5
        })
            .then(response => {
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{
 
                let responseData = response.data?.result?.map((value, index) => {
                    let rowData = { ...value.financeHeadDto };
                    return rowData;
                })
                setRowss(Object.values(responseData[0]));
            }
            })
            .catch(error => {
                showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
                setRowss([]);
            })
            .finally(() => setIsLoader(false));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const validationSchema = yup.object({
        detailheadtypeCode: yup.number().required("Detailhead TypeCode is required"),
        detailheaddescEnglish: yup.string().required("Detailhead DescEnglish is required"),
        detailheaddescHindi: yup.string().required("Detailhead DescHindi is required"),
        isActive: yup.bool().required("Is Active is required")
    });

    const formik = useFormik({
        initialValues: {
            detailheadtypeCode: "",
            detailheaddescEnglish: "",
            detailheaddescHindi: "",
            isActive:false,

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setCurrentInput("");
            setSelectedRow(null);
            setIsSubmitted(true);
            if (selectedRow !== null) {

                setBtnText("Updating");

                axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/save-finance-head-mst`,
                    {
                    "typeId":typeIdUpdate,
                    "typeName": formik.values.detailheaddescEnglish,
                    "typeNameRegLang":formik.values.detailheaddescHindi,
                    "typeCode": formik.values.detailheadtypeCode,
                    "parentId": null,
                    "ftypeId": 5,
                    "isActive": formik.values.isActive,
                    },
                    {
                        headers:{
                            "Authorization":`Bearer ${Token}`
                        }
                    }
                )

                    .then(response => {
                        if (response.data.statusCode === 200) {
                            setCurrentInput("");
                            if(response.data.result !== null){
                                const updatedRows = rowss;
                                const rowData = {
                                    ...response.data.result,
                                }
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
                        setBtnText("Update");
                        showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
                    })
                    .finally(() => {
                        setIsSubmitted(false);
                    });
            } else {
                setBtnText("Saving");
                axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/save-finance-head-mst`,
                    {
                    "typeId":null,
                    "typeName": formik.values.detailheaddescEnglish,
                    "typeNameRegLang":formik.values.detailheaddescHindi,
                    "typeCode": formik.values.detailheadtypeCode,
                    "parentId": null,
                    "ftypeId": 5,
                    "isActive": formik.values.isActive,
                    },
                    {
                        headers:{
                            "Authorization":`Bearer ${Token}`
                        }
                    }
                )
                    .then(response => {
                        if (response.data.statusCode === 200) {
                            if(response.data.result !== null){
                                const rowData = {
                                    ...response.data.result,
                                }
                                setRowss([rowData,...rowss]);
                            }
                            setBtnText("Saving");
                            showSnackbar(response.data?.message, "success");
                            setCurrentInput("");
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
        setCurrentInput("");
        formik.resetForm();
    };

    const handleEdit = (index) => {
        setSelectedRow(index - 1);
        setBtnText("Update");
        formik.setFieldValue("detailheadtypeCode", rowss[index - 1].typeCode);
        formik.setFieldValue("detailheaddescEnglish", rowss[index - 1].typeName);
        formik.setFieldValue("detailheaddescHindi", rowss[index - 1].typeNameRegLang);
        formik.setFieldValue("isActive", rowss[index - 1].isActive);
        setTypeIdUpdate(rowss[index-1].typeId);
    };

    const handleChange = (event) => {
        formik.setFieldValue("isActive",event.target.checked);
    };

    const handleInputChange = (input) => {
        formik.setFieldValue('detailheaddescHindi',input);
    }

    const handleKeyDown = (event) =>{
        event.preventDefault();
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
            field: "typeCode",
            headerName: "Detail Head TypeCode",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "typeName",
            headerName: "Detail Head Description(in English)",
            flex: 0.2,
            minWidth: 280,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "typeNameRegLang",
            headerName: "Detail Head Description(in Hindi)",
            flex: 0.2,
            minWidth: 280,
            headerClassName: "super-app-theme--header",
        },
        {
        
            field: "isActive",
            headerName: "IsActive",
            flex: 0.2,
            minWidth: 120,
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

                        <Button variant="contained" sx={{ color: 'black', backgroundColor: 'white', ":hover": { color: 'black', backgroundColor: 'white' }, borderRadius: '4px' }} endIcon={<EditIcon />} size="small" onClick={() => handleEdit(params.row.index)}>Edit</Button>

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
                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="detailheadtypeCode"
                                            name="detailheadtypeCode"
                                            label="Detail Head TypeCode"
                                            size='small'
                                            value={formik.values.detailheadtypeCode}
                                            onFocus={()=>setCurrentInput('detailheadtypeCode')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.detailheadtypeCode && !!formik.errors.detailheadtypeCode}
                                            helperText={formik.touched.detailheadtypeCode && formik.errors.detailheadtypeCode}
                                            required
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="detailheaddescEnglish"
                                            name="detailheaddescEnglish"
                                            label="Detail Head Description (English)"
                                            size='small'
                                            value={formik.values.detailheaddescEnglish}
                                            onFocus={()=>setCurrentInput('detailheaddescEnglish')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.detailheaddescEnglish && !!formik.errors.detailheaddescEnglish}
                                            helperText={formik.touched.detailheaddescEnglish && formik.errors.detailheaddescEnglish}
                                            required
                                        />
                                    </Grid>
                                    


                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="detailheaddescHindi"
                                            name="detailheaddescHindi"
                                            label="Detail Head Description (Hindi)"
                                            size='small'
                                            value={formik.values.detailheaddescHindi}
                                            onFocus={()=>setCurrentInput('detailheaddescHindi')}
                                            onKeyDown={handleKeyDown}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.detailheaddescHindi && !!formik.errors.detailheaddescHindi}
                                            helperText={formik.touched.detailheaddescHindi && formik.errors.detailheaddescHindi}
                                            required
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={6} >
                                        <FormGroup sx={{ width: "100%", mt: 2, mb: 1 }}>
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
                    <PageTitle name="Detail Head List" />
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
                    <Grid container>
                        <Grid xs={12} sm={6}>
                            {currentInput === 'detailheaddescHindi'&& <VirtualKeyboard onChange={handleInputChange}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default DetailHead;
