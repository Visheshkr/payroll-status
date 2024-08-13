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

const SubDetailHead = () => {

    const Token = cookies.get('token');
    const [rowss, setRowss] = useState([]);
    const [detailMenu, setDetailMenu] = useState([]);
    const [typeIdUpdate, setTypeIdUpdate] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [btnText, setBtnText] = useState("Save");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
    const [currentInput, setCurrentInput] = useState('');

    const title = "Sub Detail Head";
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
                
                const rowData = Object.values(responseData[0]).map((item,index)=>({
                    id:item.typeId,
                    label:item.typeName,
                  }))
                  setDetailMenu(rowData);
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
            "ftypeId": 6
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
        detailhead: yup.object().required("Detail Head is required"),
        subdetailtypecode: yup.number().required("Subdetail Typecode is required"),
        subdetailheaddescEnglish: yup.string().required("Subdetailhead DescEnglish is required"),
        subdetailheaddescHindi: yup.string().required("Subdetailhead DescHindi is required"),
        isActive: yup.bool().required("Is Active is required")

    });

    const formik = useFormik({
        initialValues: {
            detailhead: "",
            subdetailtypecode: "",
            subdetailheaddescEnglish: "",
            subdetailheaddescHindi: "",
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
                    "typeName": formik.values?.subdetailheaddescEnglish,
                    "typeNameRegLang":formik.values?.subdetailheaddescHindi,
                    "typeCode": formik.values?.subdetailtypecode,
                    "parentId": formik.values?.detailhead.id,
                    "ftypeId": 6,
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
                            if(response.data.result !== null ){
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
                    "typeName": formik.values?.subdetailheaddescEnglish,
                    "typeNameRegLang":formik.values?.subdetailheaddescHindi,
                    "typeCode": formik.values?.subdetailtypecode,
                    "parentId": formik.values?.detailhead.id,
                    "ftypeId": 6,
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
                            if(response.data.result !== null){
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
        const selectedDetail = detailMenu.find(option => option.label === rowss[index - 1].parentName);
        formik.setFieldValue("detailhead", selectedDetail);
        formik.setFieldValue("subdetailtypecode", rowss[index - 1].typeCode);
        formik.setFieldValue("subdetailheaddescEnglish", rowss[index - 1].typeName);
        formik.setFieldValue("subdetailheaddescHindi", rowss[index - 1].typeNameRegLang);
        formik.setFieldValue("isActive", rowss[index - 1].isActive);
        setTypeIdUpdate(rowss[index-1].typeId);
    };

    const handleChange = (event) => {
        formik.setFieldValue("isActive",event.target.checked);
    };

    const handleInputChange = (input) => {
        formik.setFieldValue('subdetailheaddescHindi',input);
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
            headerName: "Detail Head",
            flex: 0.2,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "typeCode",
            headerName: " Sub Detail TypeCode",
            flex: 0.2,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "typeName",
            headerName: " Sub Detail Head Description(in English)",
            flex: 0.2,
            minWidth: 280,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "typeNameRegLang",
            headerName: "Sub Detail Head Description(in Hindi)",
            flex: 0.2,
            minWidth: 280,
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
            minWidth: 120,
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
                                            id="detailhead"
                                            name="detailhead"
                                            size='small'
                                            options={detailMenu}
                                            onFocus={()=>setCurrentInput('detailhead')}
                                            value={detailMenu.find(
                                                (option) => option.id === formik.values.detailhead?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("detailhead", null)
                                                }
                                                else {
                                                    formik.setFieldValue("detailhead", value)


                                                }
                                            }}

                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Detail Head"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.detailhead && formik.touched.detailhead ? formik.errors.detailhead : null}
                                                    error={formik.errors.detailhead && formik.touched.detailhead}
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
                                            id="subdetailtypecode"
                                            name="subdetailtypecode"
                                            label="Sub Detail TypeCode"
                                            size='small'
                                            value={formik.values.subdetailtypecode}
                                            onFocus={()=>setCurrentInput('subdetailtypecode')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.subdetailtypecode && !!formik.errors.subdetailtypecode}
                                            helperText={formik.touched.subdetailtypecode && formik.errors.subdetailtypecode}
                                            required
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="subdetailheaddescEnglish"
                                            name="subdetailheaddescEnglish"
                                            label="Sub Detail Head Description (English)"
                                            size='small'
                                            value={formik.values.subdetailheaddescEnglish}
                                            onFocus={()=>setCurrentInput('subdetailheaddescEnglish')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.subdetailheaddescEnglish && !!formik.errors.subdetailheaddescEnglish}
                                            helperText={formik.touched.subdetailheaddescEnglish && formik.errors.subdetailheaddescEnglish}
                                            required
                                        />

                                    </Grid>
                                    <Grid xs={12} sm={6} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="subdetailheaddescHindi"
                                            name="subdetailheaddescHindi"
                                            label=" Sub Detail Head Description (Hindi)"
                                            size='small'
                                            value={formik.values.subdetailheaddescHindi}
                                            onFocus={()=>setCurrentInput('subdetailheaddescHindi')}
                                            onKeyDown={handleKeyDown}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.subdetailheaddescHindi && !!formik.errors.subdetailheaddescHindi}
                                            helperText={formik.touched.subdetailheaddescHindi && formik.errors.subdetailheaddescHindi}
                                            required
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={12} sx={{display:"flex",justifyContent:"center"}}>
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
                    <PageTitle name="Sub Detail Head List" />
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
                            {currentInput === 'subdetailheaddescHindi' && <VirtualKeyboard onChange={handleInputChange}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default SubDetailHead;
