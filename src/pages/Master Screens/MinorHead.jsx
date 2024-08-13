import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import { Autocomplete, Box, Button, Card, CardContent, Stack, TextField } from '@mui/material';
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

const MinorHead = () => {

    const Token = cookies.get('token');
    const [rowss, setRowss] = useState([]);
    const [subMajorMenu, setSubMajorMenu] = useState([]);
    const [typeIdUpdate, setTypeIdUpdate] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [btnText, setBtnText] = useState("Save");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
    const [currentInput, setCurrentInput] = useState('');


    const title = "Minor Head";
    useTitle(title);

    useEffect(() => {

        setIsLoader(true);
        axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/finance-head-fetch`,{
            "ftypeId": 2
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
                
                const rowData = Object.values(responseData[0]).map((item,index)=>({
                    id:item.typeId,
                    label:item.typeName,
                  }))
                setSubMajorMenu(rowData);
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
        axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/finance-head-fetch`,{
            "ftypeId": 3
        })
            .then(response => {
 
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{
 
                let responseData = response.data?.result?.map((value, index) => {
                    let rowData = { ...value, index: index + 1 };
 
                    return rowData;
                })
               
                setRowss(responseData.map((item)=>item.financeHeadDto)[0]);
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
        submajorhead: yup.object().required("Submajor Head is required"),
        minorheadtypecode: yup.number().required("Minorhead Typecode is required"),
        minorheaddescEnglish: yup.string().required("Minorhead DescEnglish is required"),
        minorheaddescHindi: yup.string().required("Minorhead DescHindi is required"),
        isActive: yup.bool().required("Is Active is required")

    });

    const formik = useFormik({
        initialValues: {
            submajorhead: "",
            minorheadtypecode: "",
            minorheaddescEnglish: "",
            minorheaddescHindi: "",
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
                    "typeName": formik.values?.minorheaddescEnglish,
                    "typeNameRegLang":formik.values?.minorheaddescHindi,
                    "typeCode": formik.values?.minorheadtypecode,
                    "parentId": formik.values?.submajorhead.id,
                    "ftypeId": 3,
                    "isActive": formik.values?.isActive,
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
                                    parentName:response.data.result.parentId.typeName
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
                        console.log(error);
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
                    "typeName": formik.values?.minorheaddescEnglish,
                    "typeNameRegLang":formik.values?.minorheaddescHindi,
                    "typeCode": formik.values?.minorheadtypecode,
                    "parentId": formik.values?.submajorhead.id,
                    "ftypeId": 3,
                    "isActive": formik.values?.isActive,
                    },
                    {
                        headers:{
                            "Authorization":`Bearer ${Token}`
                        }
                    }
                )
                    .then(response => {

                        if (response.data.statusCode === 200) {
                            if(response.data.result !== null ){
                                const rowData = {
                                    ...response.data.result,
                                    parentName:response.data.result.parentId.typeName
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
        const selectedSubMajor = subMajorMenu.find(option => option.label === rowss[index - 1].parentName);
        formik.setFieldValue("submajorhead", selectedSubMajor);
        formik.setFieldValue("minorheadtypecode", rowss[index - 1].typeCode);
        formik.setFieldValue("minorheaddescEnglish", rowss[index - 1].typeName);
        formik.setFieldValue("minorheaddescHindi", rowss[index - 1].typeNameRegLang);
        formik.setFieldValue("isActive", rowss[index - 1].isActive);
        setTypeIdUpdate(rowss[index-1].typeId);
    };

    const handleChange = (event) => {
        formik.setFieldValue("isActive",event.target.checked);
    };

    const handleInputChange = (input) => {
        formik.setFieldValue('minorheaddescHindi',input);
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
            field: "parentName",
            headerName: "Sub Major Head",
            flex: 0.2,
            minWidth: 160,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "typeCode",
            headerName: "Minor Head TypeCode",
            flex: 0.2,
            minWidth: 170,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "typeName",
            headerName: "Minor Head Description(in English)",
            flex: 0.2,
            minWidth: 250,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "typeNameRegLang",
            headerName: "Minor Head Description(in Hindi)",
            flex: 0.2,
            minWidth: 230,
            headerClassName: "super-app-theme--header",
        },
        {
        
            field: "isActive",
            headerName: "IsActive",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "action",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            flex: 0.3,
            minWidth: 140,
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
                                    <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="submajorhead"
                                            name="submajorhead"
                                            size='small'
                                            onFocus={()=>setCurrentInput('submajorhead')}
                                            options={subMajorMenu}
                                            value={subMajorMenu.find(
                                                (option) => option.id === formik.values.submajorhead?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("submajorhead", null)
                                                }
                                                else {
                                                    formik.setFieldValue("submajorhead", value)


                                                }
                                            }}

                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Sub Major Head"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.submajorhead && formik.touched.submajorhead ? formik.errors.submajorhead : null}
                                                    error={formik.errors.submajorhead && formik.touched.submajorhead }
                                                    required
                                                />
                                            )}
                                        />
                                        

                                    </Grid>
                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="minorheadtypecode"
                                            name="minorheadtypecode"
                                            label="Minor Head TypeCode"
                                            size='small'
                                            value={formik.values.minorheadtypecode}
                                            onFocus={()=>setCurrentInput('minorheadtypecode')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.minorheadtypecode && !!formik.errors.minorheaddescEnglish}
                                            helperText={formik.touched.minorheadtypecode && formik.errors.minorheadtypecode}
                                            required
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="minorheaddescEnglish"
                                            name="minorheaddescEnglish"
                                            label="Minor Head Description (English)"
                                            size='small'
                                            value={formik.values.minorheaddescEnglish}
                                            onFocus={()=>setCurrentInput('minorheaddescEnglish')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.minorheaddescEnglish && !!formik.errors.minorheaddescEnglish}
                                            helperText={formik.touched.minorheaddescEnglish && formik.errors.minorheaddescEnglish}
                                            required
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="minorheaddescHindi"
                                            name="minorheaddescHindi"
                                            label="Minor Head Description (Hindi)"
                                            size='small'
                                            value={formik.values.minorheaddescHindi}
                                            onFocus={()=>setCurrentInput('minorheaddescHindi')}
                                            onKeyDown={handleKeyDown}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.minorheaddescHindi && !!formik.errors.minorheaddescHindi}
                                            helperText={formik.touched.minorheaddescHindi && formik.errors.minorheaddescHindi}
                                            required
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={12} sx={{display:"flex",justifyContent:"center"}}>
                                        <FormGroup>
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
                    <PageTitle name="Minor Head List" />
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
                            {currentInput === 'minorheaddescHindi' && <VirtualKeyboard onChange={handleInputChange}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default MinorHead;
