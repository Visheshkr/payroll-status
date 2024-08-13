import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, CardContent, Stack, TextField, Grid } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from '../../components/Snackbar';
import useTitle from '../../hooks/useTitle';
import PageTitle from '../../layouts/PageTitle';
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from '../../components/Loader';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const GenderMaster = () => {

    const [rowss, setRowss] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [typeIdUpdate, setTypeIdUpdate] = useState(null);
    const [btnText, setBtnText] = useState("Save");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
    const pageId = "1";
    

    const title = "Gender Master";
    useTitle(title);
    useEffect(() => {

        setIsLoader(true);
        axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/master-fetch`,{
            parentId:pageId
        })
            .then(response => {
 
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{
 
                let responseData = response.data?.result?.map((value, index) => {
                    let rowData = { ...value.generalMst };
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
        gender: yup.string().required("Gender is required"),
        isActive: yup.bool().required("Is Active is required")
    });

    const formik = useFormik({
        initialValues: {
            gender: "",
            isActive:false,

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSelectedRow(null);
            setIsSubmitted(true);
            if (selectedRow !== null) {

                setBtnText("Updating");

                axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
                    {
                    "typeId":typeIdUpdate,
                    "typeName": formik.values.gender,
                    "typeNameRegLang":formik.values.null,
                    "typeCode": null,
                    "generalTypeId": pageId,
                    "isActive": formik.values.isActive
                    }
                )

                    .then(response => {
                        if (response.data.statusCode === 200) {
                            if(response.data.result !== ""){
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
                        console.log(error);
                        setBtnText("Update");
                        showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
                    })
                    .finally(() => {
                        setIsSubmitted(false);
                    });
            } else {
                setBtnText("Saving");
                axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/save-master-data`,
                    {
                    "typeId":null,
                    "typeName": formik.values.gender,
                    "typeNameRegLang":null,
                    "typeCode": null,
                    "generalTypeId": pageId,
                    "isActive": formik.values.isActive
                    }
                )
                    .then(response => {
                        if (response.data.statusCode === 200) {
                            if(response.data.result !== ""){
                                const rowData = {
                                    ...response.data.result,
                                }
                                setRowss([rowData,...rowss]);
                            }
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
    console.log(formik.values.isActive,"checkbox formik");
    const handleCancel = () => {
        setBtnText("Save");
        setSelectedRow(null);
        formik.resetForm();
    };

    const handleEdit = (index) => {
        setSelectedRow(index - 1);
        setBtnText("Update");
        formik.setFieldValue("gender", rowss[index - 1].typeName);
        formik.setFieldValue("isActive", rowss[index - 1].isActive);
        setTypeIdUpdate(rowss[index-1].typeId);
    };

    const handleChange = (event) => {
        formik.setFieldValue("isActive",event.target.checked);
    };

    const columns = [
        {
            field: "index",
            headerName: "Sr No.",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
        
            field: "typeName",
            headerName: "Gender",
            flex: 0.2,
            minWidth: 300,
            headerClassName: "super-app-theme--header",

        },
        {
        
            field: "isActive",
            headerName: "IsActive",
            flex: 0.2,
            minWidth: 400,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "action",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            flex: 0.3,
            minWidth: 300,
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
                                <Grid container columnSpacing={3}  sx={{display:"flex",justifyContent:"center"}}>
                                    <Grid xs={12} sm={6}  >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="gender"
                                            name="gender"
                                            label="Gender"
                                            size='small'
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.gender && !!formik.errors.gender}
                                            helperText={formik.touched.gender && formik.errors.gender}
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
                    <PageTitle name="Gender Detail List" />
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

export default GenderMaster;
