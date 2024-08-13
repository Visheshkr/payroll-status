import { Autocomplete, Box, Button, Card, CardContent, FormGroup, FormHelperText, Grid, Stack, TextField } from '@mui/material'
import React from 'react'
import useTitle from '../../hooks/useTitle'
import PageTitle from '../../layouts/PageTitle'
import SearchTable from '../../components/SearchTableAlt';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRef } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import AlertConfirm, { Button1 } from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import dayjs from 'dayjs';
import { Chip } from 'material-ui-core';
// import constants from '../../constants';
const IncomeTaxSection = () => {
    // console.log(constants);     
    useTitle('Income Tax Section    ')
    const {showSnackbar} = useSnackbar();
    const [responseData, setResponseData] = useState([]);
    const [regimeType, setRegimeType] = useState([])
    const [isActive, setIsActive] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [editRowId, setEditRowId] = useState(null);
    const [editCount, setEditCount] = useState(0);
    const [investmentId, setInvestmentId] = useState([]);
    const [investmentMenu, setInvestmentMenu] = useState([]);
    const user = useSelector((state) => state.loginReducer);
    // console.log('user', user.data.userdetails.user?.userId)
    const validationSchema = yup.object({
        secName: yup.string().required("Section Name is required"),
        maxDeductAmount: yup.number().required('Maximum deduction amount is required'),
        regimeType: yup.string().required('Please select a value for Regime type').nullable(),
        investment: yup.array()
        .of(
        yup.object().shape({
          id: yup.number().required('ID is required').positive('ID must be a positive number').integer('ID must be an integer'),
          label: yup.string().required('Label is required'),
        })
      )
      .min(1, 'At least one item is required')
      .required("Investment is required"),
    });

    const handleGetData = () => {
        setIsLoader(true);
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getITaxSections`)
        .then((response) => {
        if (response.data?.result?.length === 0)
            showSnackbar("No data found", "warning");
    
        const res = response?.data?.result;
        console.log(res);
        const flattenedData = res.map((item,index) => ({
            id: item?.id,
            index:index+1,
            description: item?.description,
            isActive: item?.isActive,
            sectionName: item?.sectionName,
            maxDedAmt: item?.maxDedAmt,
            typeName:item?.regimeType?.typeName,
            typeId: item?.regimeType?.typeId,
            effectiveFrom:dayjs(new Date(Date.parse(item?.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
            effectiveTo:dayjs(new Date(Date.parse(item?.effectiveTo))?.toLocaleDateString()).format("YYYY-MM-DD"),
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

    const getRegimeFields = () => {
        setIsLoader(true);
        axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
        .then((response) => {
        if (response.data?.result?.length === 0)
            showSnackbar("No data found", "warning");
            
        const res = response?.data?.result;
        console.log('dropdown', res);

        const regimeType = res?.regimeType?.map((item) => ({
            id: item?.typeId,
            label: item?.typeName
        }))
        setRegimeType(regimeType)
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
        getRegimeFields()
    }, []);


    // console.log(isActive,'CheckActive');
    const formik = useFormik({
        initialValues: {
            secName:'',
            desc:'',
            regimeType:'',
            maxDeductAmount: '',
            effectiveFrom:null,
            effectiveTo:null,
            investment:[]
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            callConfirmDialogFormSave(values, resetForm);
            
        }
    })

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
        const payload = {
            id: null,
            regimeType: values?.regimeType,
            sectionName: values?.secName,
            description: values?.desc,
            isActive : true,
            maxDedAmt: values?.maxDeductAmount,
            effectiveFrom: formattedDate,
            userId: user.data.userdetails.user?.userId
        }
        
        console.log('payload', payload);
        
        try {
            const response =  await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITaxSection`, payload);
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

    // console.log(isActive, 'activeCheck');
    const submitDetails = async(params, event) => {
        console.log(params)
        const payload = {
            id: params?.id,
            regimeType: params?.typeId,
            sectionName: params?.sectionName,
            description: params?.description,
            isActive : !params.isActive,
            userId: user.data.userdetails.user?.userId,
            maxDedAmt : params?.maxDedAmt
        }
        
        console.log('payload', payload);
        try {
            const response =  await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveITaxSection`, payload);
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


    console.log(responseData, 'tableData');
    const columns = [
        {
            field: "index",
            headerName: "Sr No.",
            flex: 0.1,
            minWidth: 80,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "typeName",
            headerName: "Regime",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "sectionName",
            headerName: "Section Name",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "maxDedAmt",
            headerName: "Max Deduction Amount",
            flex: 0.1,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "description",
            headerName: "Description",
            flex: 0.1,
            minWidth: 300,
            headerClassName: "super-app-theme--header",

        },
        
        {
            field: "isActive",
            headerName: "Status",
            headerClassName: "super-app-theme--header",
            flex: 0.1,
            minWidth: 120,
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
    ]
    
    const [showForm, setShowForm] = useState(false);
    const handleShowIncomeTaxSectionForm = () => {
        setShowForm(!showForm);
    }

    const handleCancel = () => {
        setEditCount(0);
        formik.resetForm();
    };

    const handleEdit =  (params,index) => {
        setEditCount(1);
        if(!showForm) handleShowIncomeTaxSectionForm();
        formik.setFieldValue("secName", responseData[index-1].sectionName)
        formik.setFieldValue("desc", responseData[index-1].description)
        formik.setFieldValue("regimeType", responseData[index-1].typeId)
        formik.setFieldValue("maxDeductAmount", responseData[index-1].maxDedAmt)
        let EffectiveFrom =dayjs(responseData[index - 1].effectiveFrom, "YYYY-MM-DD");
        formik.setFieldValue("effectiveFrom", EffectiveFrom)
        let EffectiveTo =dayjs(responseData[index - 1].effectiveTo, "YYYY-MM-DD");
        formik.setFieldValue("effectiveTo", EffectiveTo);
        setEditRowId(responseData[index - 1].id);
    };

    const handleInvestmentChange = (e,newValue) => {
        const select = newValue?.filter((item) => item.id === 0)
        if (select[0]?.id === 0) {
          if (formik.values.investment?.length === investmentMenu.length) {
            formik.setFieldValue('investment',[]);
            setInvestmentId([]);
          } else {
            formik.setFieldValue('investment',investmentMenu);
            setInvestmentId(investmentMenu.map((item)=>item.id));
          }
        } else {
          formik.setFieldValue('investment',newValue);
          setInvestmentId(newValue.map((item)=>item.id));
        }
    }

    const isOptionSelected = (option,dropdownValueList,menuList) => {
        if (option === 'Select All') {
          return dropdownValueList.length === menuList.length;
        }
        return dropdownValueList.includes(option);
    };


    console.log(regimeType, 'RT');

    const tomorrow = dayjs().add(0, 'day');
    return (
        <>
        {isLoader && <Loader />}
        <div>
            <Card>
                <CardContent>
                    <PageTitle name="Income Tax Section"/>
                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}} gap={2}>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}} onClick={handleShowIncomeTaxSectionForm}>Add Income Tax Section</Button>
                        </Grid>
                    </Grid>
                    <Grid container sx={{mt:2}}>
                        <Grid item>
                            <SearchTable 
                                columns={columns}
                                // data={rowss}
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
                            <PageTitle name="Add Income Tax Section"/>
                            <Box component= "form" onSubmit={formik.handleSubmit} noValidate>
                                <Grid container columnSpacing={2}>
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label" required>Regime Type</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="regimeType"
                                                value={formik.values.regimeType}
                                                onChange={formik.handleChange}
                                                required
                                            >
                                                {regimeType.map((item) => (
                                                    <FormControlLabel value={item?.id} control={<Radio />} label={item?.label} />
                                                ))}
                                                {/* <FormControlLabel value={regimeType[0]?.id} control={<Radio />} label={regimeType[0]?.label}/> */}
                                            </RadioGroup>
                                            {formik.touched.regimeType && formik.errors.regimeType && (
                                                <FormHelperText error>{formik.errors.regimeType}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{mt:1.5}}>
                                        <TextField
                                            label="Section Name" 
                                            size="small" 
                                            fullWidth
                                            name="secName"
                                            value={formik.values.secName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.secName && !!formik.errors.secName}
                                            helperText={formik.touched.secName && formik.errors.secName}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={4} sx={{mt:1.5}}>
                                        <TextField
                                            label="Maximum Deduction Amount" 
                                            size="small" 
                                            fullWidth
                                            name="maxDeductAmount"
                                            value={formik.values.maxDeductAmount}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.maxDeductAmount && !!formik.errors.maxDeductAmount}
                                            helperText={formik.touched.maxDeductAmount && formik.errors.maxDeductAmount}
                                            required
                                        />
                                    </Grid>
                                    
                                </Grid>
                                <Grid container columnSpacing={2}>
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
                                        
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
                                                minDate={tomorrow}
                                                onChange={(value) =>
                                                formik.setFieldValue("effectiveFrom", Date.parse(value))
                                                }
                                                label="Effective From"
                                                sx={{ width: "100%" }}
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
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
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
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Autocomplete
                                        multiple
                                        limitTags={1}
                                        required
                                        id="investment"
                                        name="investment"
                                        options={[{id:0,label:"Select All"} ,...investmentMenu]}
                                        size="small"
                                        fullWidth
                                        isOptionEqualToValue={(option,value)=>option.label === value.label}
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option, { selected }) => (
                                          <li {...props}>
                                            <Checkbox
                                              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                              checkedIcon={<CheckBoxIcon fontSize="small" />}
                                              style={{ marginRight: 8 }}
                                              checked={isOptionSelected(option,formik.values.investment,investmentMenu)}
                                            />
                                            {option.label}
                                          </li>
                                        )}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Investment"
                                            placeholder="Select Investment"
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.investment && formik.touched.investment ? formik.errors.investment : null}
                                            error={formik.errors.investment && formik.touched.investment ? true : false}
                                            required
                                            
                                        />
                                        )}
                                        value={formik.values.investment}
                                        onChange={handleInvestmentChange}
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip label={option.label} {...getTagProps({ index })} />
                                          ))}
                                    />
                                </Grid>
                                </Grid>
                                <Grid item sx={{mt:1.5}}>
                                    <TextField
                                        label="Description" 
                                        size="small" 
                                        multiline 
                                        rows={4} 
                                        name="desc"
                                        fullWidth
                                        value={formik.values.desc}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid container  width="100%" sx={{mt:2}}>
                                    <Grid item sx={{display:'flex',justifyContent:'center', width:'100%'}} gap={2}>
                                        <Button variant="outlined" size="small" sx={{borderRadius:"4px"}} onClick={handleCancel}>Reset</Button>
                                        {editCount > 0 ? (<Button variant="contained" size="small" sx={{borderRadius:"4px"}} >Save Record</Button>):(<Button variant="contained" size="small" sx={{borderRadius:"4px"}} type="submit">Add Record</Button>)}
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
        </>
    )
}

export default IncomeTaxSection
