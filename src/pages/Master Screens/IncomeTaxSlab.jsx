import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from '@mui/icons-material/Cached';
import { Autocomplete, Box, Button, Card, CardContent, TextField } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from 'formik';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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


const IncomeTaxSlab = () => {

    

    const [rowss, setRowss] = useState([]);
    const [financialYearMenu, setFinancialYearMenu] = useState([]);
    const [taxSubMenu, setTaxSubMenu] = useState([]);
    const [regimeTypeMenu, setRegimeTypeMenu] = useState([]);
    const [genderMenu, setGenderMenu] = useState([]);
    const [updateId, setUpdateId] = useState();
    const [selectedRow, setSelectedRow] = useState(null);
    const [btnText, setBtnText] = useState("Save");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { showSnackbar } = useSnackbar();
 
    const title = "Income Tax Slab";
    useTitle(title);
    
    useEffect(() => {

        setIsLoader(true);
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
            .then(response => {
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{

                let responseTaxData = response.data?.result?.taxSubCategory?.map((value, index) => {
                    let rowData = { 
                        id:value.typeId,
                        label:value.typeName
                    };
                    return rowData;
                })
                    setTaxSubMenu(responseTaxData);
                    
                let responseFinancialYearData = response.data?.result?.financialYear?.map((value, index) => {
                        let rowData = { 
                            id:value.typeId,
                            label:value.typeName
                        };
                        return rowData;
                })
                    setFinancialYearMenu(responseFinancialYearData);

                let responseGenderData = response.data?.result?.gender?.map((value, index) => {
                        let rowData = { 
                            id:value.typeId,
                            label:value.typeName
                        };
                        return rowData;
                })
                    setGenderMenu(responseGenderData);
                let responseRegimeTypeData = response.data?.result?.regimeType?.map((value, index) => {
                        let rowData = { 
                            id:value.typeId,
                            label:value.typeName
                        };
                        return rowData;
                })
                    setRegimeTypeMenu(responseRegimeTypeData);
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
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getITaxSlab`)
            .then(response => {
                if (response.data?.result?.length === 0){
                    showSnackbar("No data found", "warning");
                }
                else{

                let responseData = response.data?.result?.map((value, index) => {
                    let date = new Date(Date.parse(value?.effectiveFrom))
                        let formattedDate = dayjs(date?.toLocaleDateString()).format("YYYY-MM-DD");
                    let rowData = { 
                        ...value,
                        regime:value?.regimeType?.typeName,
                        financialYear:value?.fyId?.typeName,
                        taxSubCategory:value?.taxSubCategory?.typeName,
                        gender:value.gender?.typeName|| null,
                        effectiveFrom:formattedDate
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

    const handleRegimeChange = (event) => {
        formik.setFieldValue('regimeType',event.target.value);
    }

    const handleMaxLimitChange = (event) => {
        formik.setFieldValue('maxLimit',event.target.value);
    }

    const validationSchema = yup.object({
        regimeType: yup.string().required("Regime Type is required"),
        financialYear: yup.object().nullable().required("Financial year is required"),
        incomeFrom: yup.number().required("Income From is required"),
        taxSubCategory: yup.object().nullable().required("Tax Sub Category required"),
        effectiveOrderDate: yup.date().nullable().required("Effective Order Date is required"),
        maxLimit: yup.string().required("Max Limit is required"),
        isActive: yup.bool().required("Is Active is required")
    });
 
    const formik = useFormik({
        initialValues: {
            regimeType:"",
            financialYear: "",
            incomeFrom: "",
            incomeTo: "",
            taxSubCategory: "",
            Gender: "",
            perIncomeTaxRate: "",
            cessPerOnIncomeTaxPayable: "",
            effectiveOrderDate: null,
            maxLimit:"",
            isActive:false,
 
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSelectedRow(null);
            setIsSubmitted(true);
            if (selectedRow !== null) {
 
                setBtnText("Updating");
                let postData = {
                    "itSlabId":updateId,
                    "regimeType": Number(values.regimeType),
                    "sequenceNo": 1,
                    "fyId": values.financialYear?.id,
                    "incomeFrom": values.incomeFrom,
                    "incomeTo": values.incomeTo,
                    "taxSubCategory": values.taxSubCategory?.id,
                    "gender": values.Gender?.id,
                    "incomeTaxRate": values.perIncomeTaxRate,
                    "cessPercent": values.cessPerOnIncomeTaxPayable,
                    "effectiveFrom": dayjs(new Date(Date.parse(values.effectiveOrderDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "displayOrder": 1,
                    "isMaxLimit": Boolean(formik.values?.maxLimit),
                    "isActive": values.isActive,
                    "userId": Number(localStorage.getItem('userId'))
                    };
 
                    axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITaxSlab`, postData)
 
                    .then(response => {
                        if (response.data.statusCode === 200) {
                            if(response.data.result !== null){
                                const updatedRows = rowss;
                                const rowData = {
                                    ...response.data.result,
                                    regime:response.data.result?.regimeType?.typeName,
                                    financialYear:response.data.result?.fyId?.typeName,
                                    taxSubCategory:response.data.result?.taxSubCategory?.typeName,
                                    gender:response.data.result?.gender?.typeName,
                                    effectiveFrom:dayjs(new Date(Date.parse(response.data.result?.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
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
                console.log(values.maxLimit);
                let postData = {
                    "itSlabId":null,
                    "regimeType": Number(values.regimeType),
                    "sequenceNo": "2",
                    "fyId": values.financialYear.id,
                    "incomeFrom": values.incomeFrom,
                    "incomeTo": values.maxLimit === "true" ? values.incomeFrom : values.incomeTo,
                    "taxSubCategory": values.taxSubCategory.id,
                    "gender": values.Gender.id,
                    "incomeTaxRate": values.perIncomeTaxRate,
                    "cessPercent": values.cessPerOnIncomeTaxPayable,
                    "effectiveFrom": dayjs(new Date(Date.parse(values.effectiveOrderDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    "displayOrder": 1,
                    "isMaxLimit":Boolean(formik.values.maxLimit),
                    "isActive": values.isActive,
                    "userId": Number(localStorage.getItem('userId'))
                    };
                axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITaxSlab`, postData)
                    .then(response => {
                        if (response.data.statusCode === 200) {
                            const rowData = {
                                ...response.data.result,
                                regime:response.data.result?.regimeType?.typeName,
                                financialYear:response.data.result?.fyId?.typeName,
                                taxSubCategory:response.data.result?.taxSubCategory?.typeName,
                                gender:response.data.result?.gender?.typeName || null,
                                effectiveFrom:dayjs(new Date(Date.parse(response.data.result?.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                            }
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
            field: "regime",
            headerName: "Regime",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
 
        },
        {
            field: "incomeFrom",
            headerName: "Annual Taxable Income From",
            flex: 0.2,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
        },
 
        {
            field: "incomeTo",
            headerName: "Annual Taxable Income To",
            flex: 0.2,
            minWidth: 150,
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
            field: "taxSubCategory",
            headerName: "Tax Sub Category",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "incomeTaxRate",
            headerName: "% Over From Amount",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "cessPercent",
            headerName: "Cess Percentage",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "isMaxLimit",
            headerName: "is Max Limit",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "gender",
            headerName: "Gender",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "PreviousTaxLiability",
            headerName: "Previous Tax Liability",
            flex: 0.2,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "effectiveFrom",
            headerName: "Effective Order Date",
            flex: 0.6,
            minWidth: 100,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "isActive",
            headerName: "isActive",
            flex: 0.3,
            minWidth: 80,
            headerClassName: "super-app-theme--header",
        },
    ];

    return (
        <>
            {isLoader && <Loader />}
            <Grid container>
                <Grid xs={12} >
                    <Card sx={{ my: 2 }} elevation={5}>
                        <CardContent>
                            <PageTitle name="Add Income Tax Slab" />
                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <Grid container columnSpacing={3}>
                                    <Grid xs={12} sm={4}>
                                        <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label" required>Regime Type:</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="regimeType"
                                                id="regimeType"
                                                value={formik.values.regimeType}
                                                onChange={handleRegimeChange}
                                                required
                                            >
                                                {regimeTypeMenu.map((item) => (
                                                    <FormControlLabel key={item?.id} value={item?.id} control={<Radio />} label={item?.label} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
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
                                                    error={formik.errors.financialYear && formik.touched.financialYear }
                                                    required
                                                />
                                            )}
                                        />
 
                                    </Grid>
                                    <Grid xs={12} sm={4}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label" required>Is Max Limit:</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="maxLimit"
                                                id="maxLimit"
                                                value={formik.values.maxLimit}
                                                onChange={handleMaxLimitChange}
                                                required
                                            >
                                                    <FormControlLabel value="true" control={<Radio />} label="True" />
                                                    <FormControlLabel value="false" control={<Radio />} label="False" />
                                            </RadioGroup>
                                        </FormControl>
 
                                    </Grid>
                                    
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="incomeFrom"
                                            name="incomeFrom"
                                            label="Income From"
                                            size='small'
                                            value={formik.values.incomeFrom}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.incomeFrom && !!formik.errors.incomeFrom}
                                            helperText={formik.touched.incomeFrom && formik.errors.incomeFrom}
                                            required
                                        />
 
                                    </Grid>
                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="incomeTo"
                                            name="incomeTo"
                                            label="Income To"
                                            size='small'
                                            disabled={formik.values.maxLimit === "true" ? true : false}
                                            value={formik.values.incomeTo}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.incomeTo && !!formik.errors.incomeTo}
                                            helperText={formik.touched.incomeTo && formik.errors.incomeTo}
                                        />
 
                                    </Grid>
                                    <Grid xs={12} sm={4}>
                                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="taxSubCategory"
                                            name="taxSubCategory"
                                            size='small'
                                            options={taxSubMenu}
                                            value={taxSubMenu.find(
                                                (option) => option.id === formik.values.taxSubCategory?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("taxSubCategory", null)
                                                }
                                                else {
                                                    formik.setFieldValue("taxSubCategory", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Tax Sub Category"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.taxSubCategory && formik.touched.taxSubCategory ? formik.errors.taxSubCategory : null}
                                                    error={formik.errors.taxSubCategory && formik.touched.taxSubCategory }
                                                    required
                                                />
                                            )}
                                        />
 
                                    </Grid>
                                    <Grid xs={12} sm={4}>
                                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="Gender"
                                            name="Gender"
                                            size='small'
                                            options={genderMenu}
                                            value={genderMenu.find(
                                                (option) => option.id === formik.values.Gender?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("Gender", null)
                                                }
                                                else {
                                                    formik.setFieldValue("Gender", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Gender"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                    error={formik.errors.Gender && formik.touched.Gender}
                                                />
                                            )}
                                        />
 
                                    </Grid>
                                     <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="perIncomeTaxRate"
                                            name="perIncomeTaxRate"
                                            label="% Income Tax Rate"
                                            size='small'
                                            value={formik.values.perIncomeTaxRate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.perIncomeTaxRate && !!formik.errors.perIncomeTaxRate}
                                            helperText={formik.touched.perIncomeTaxRate && formik.errors.perIncomeTaxRate}
                                        />
 
                                    </Grid>

                                    <Grid xs={12} sm={4} >
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            type="text"
                                            id="cessPerOnIncomeTaxPayable"
                                            name="cessPerOnIncomeTaxPayable"
                                            label="Cess % On Income Tax Payable"
                                            size='small'
                                            value={formik.values.cessPerOnIncomeTaxPayable}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.cessPerOnIncomeTaxPayable && !!formik.errors.cessPerOnIncomeTaxPayable}
                                            helperText={formik.touched.cessPerOnIncomeTaxPayable && formik.errors.cessPerOnIncomeTaxPayable}
                                        />
 
                                    </Grid>

                                    
                                    <Grid xs={12} sm={4} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                          <DatePicker
                                            id="effectiveOrderDate"
                                            sx={{ width: '100%', mt:2 }}
                                            name='effectiveOrderDate'
                                            disablePast
                                            format="DD/MM/YYYY"
                                            value={formik.values.effectiveOrderDate}
                                            onChange={value => formik.setFieldValue("effectiveOrderDate",value)}
                                            onBlur={formik.handleBlur}
                                            label="Effective Order Date"
                                            slotProps={{ textField: { size: 'small', required: true } }}
 
                                            renderInput={(params) => (
                                            <TextField
                                            size="small"
                                            fullWidth
                                            margin="0"
                                            required
                                            {...params}
                                            error={formik.touched.effectiveOrderDate && Boolean(formik.errors.effectiveOrderDate)}
                                            helperText={formik.touched.effectiveOrderDate && formik.errors.effectiveOrderDate}
                                            onBlur={formik.handleBlur}
                                            />
                                        )}
                                        />
                                       </LocalizationProvider>
 
                 
                                    </Grid> 

                                    <Grid xs={12} sm={4} md={2} lg={2}>
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
                    <PageTitle name="Income Tax Slab List" />
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
 
export default IncomeTaxSlab;