import { Card, Grid, CardContent, TextField, Box, Button, Stack, Typography, Alert } from '@mui/material'
import React, {useState, useEffect} from 'react'
import PageTitle from '../layouts/PageTitle'
import useTitle from '../hooks/useTitle'
import SearchTable from '../components/SearchTableAlt';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../utils/AxiosInterceptor';
import Loader from '../components/Loader';
import { useFormik } from 'formik';
import * as yup from "yup";

import AlertConfirm, { Button1 } from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { useSnackbar } from '../components/Snackbar';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '80%',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const RegularySalaryBill = () => {

    const title = 'Regulary Salary Bill';
    const name = 'Office Info';
    const name1= 'Pay Period List'
    useTitle(title)

    const navigate = useNavigate();
    const {showSnackbar} = useSnackbar();
    const validationSchema = yup.object({
        officeSelect: yup.object().nullable().required("Please select Office"),
        hoa: yup.object().nullable().required("Please select HOA"),
        financialYear: yup.object().nullable().required("Financial year is required"),
    });
    const formik = useFormik({
        initialValues: {
            officeSelect:null,
            hoa:null,
            financialYear:null,
            totalEmployee: '',
            allocatedEmployee: '',
            unallocatedEmployee:''
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            // callConfirmDialogFormSave(values, resetForm);
            handleFetchTableData({
                officeId : formik.values.officeSelect && formik.values.officeSelect?.id,
                hoaId: formik.values.hoa && formik.values?.hoa?.id,
                fyId: formik.values.financialYear && formik.values?.financialYear?.id
            });
        }
    })
    console.log(formik.values)
    const handleOpenGroup =(params) => {
        navigate('/opengroup', {state:params})
    }
    const handleGoForProcess = (params)=> {
        navigate('/SalaryProcess', {state:[params, formik.values.officeSelect?.id]});
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
            field: "monthName",
            headerName: "Pay Period",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "fy",
            headerName: "Financial Year",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "isActive",
            headerName: "isActive",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "statusVal",
            headerName: "Payroll Status",
            flex: 0.2,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "action",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            flex: 0.4,
            minWidth: 220,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={0.5}>

                        {/* <Button variant="outlined" sx={{ color: 'black', backgroundColor: 'white', ":hover": { color: 'black', backgroundColor: 'white' }, borderRadius: '4px' }} size="small" onClick = {() => handleOpenGroup(params.row)}>Open</Button> */}
                        <Button variant="contained" sx={{ color: 'black', backgroundColor: 'white', ":hover": { color: 'black', backgroundColor: 'white' }, borderRadius: '4px' }} size="small" onClick={() => handleGoForProcess(params.row)}>Process Salary</Button>

                        {/* <Button variant="contained" sx={{ color: 'white', backgroundColor: '#286cb4', ":hover": { color: 'white', backgroundColor: '#286cb4' }, borderRadius: '4px' }} startIcon={<DeleteIcon />} size="small" onClick={() => handleDelete(params.row.index)}>Delete</Button> */}
                    </Stack>
                );
            },
        },
    ];



    
    const [officeData, setOfficeData] = useState([]);
    const [financialYearData, setFinancialYearData] = useState([]);
    const [hoaData, setHoaData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [ callHoaData, setCallHoaData] = useState(false);
    const [showPeriodList, setShowPeriodList] = useState(false);
    const [fieldData, setFieldData] = useState();
    const [isLoader, setIsLoader] = useState(false);

    const handleFetchIndependentDropdownData = async() => {
        try {
            const res = await axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
            // console.log(res);
            if(res.data.status){
                const officesDropdown = res?.data?.result?.offices?.map((item) => ({
                    id: item?.typeId,
                    label: item?.typeName
                }))
                const financialYearDropdown = res?.data?.result?.financialYear?.map((item) => ({
                    id: item?.typeId,
                    label: item?.typeName
                }))
                setOfficeData(officesDropdown)
                setFinancialYearData(financialYearDropdown);
                setIsLoader(false);
            }

        } catch (error) {
            setIsLoader(false);
            console.log(error)
        }
    }

    const handleCallHoaData =async() => {
        setIsLoader(true);
        try {
            const res = await axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getHoaByOfficeId/${formik.values?.officeSelect?.id}`)
            // console.log('hoa',res);
            if(res.data.status){
                const hoaDropdown = res?.data?.result?.map((item) => ({
                    id: item?.typeId,
                    label: item?.hoa
                }))
                setHoaData(hoaDropdown)
                formik.setFieldValue('hoa', null)
                setIsLoader(false);
                setCallHoaData(false);
            }
            else{
                setIsLoader(false);
                formik.setFieldValue('hoa', null)
                setHoaData([])
            }
        } catch (error) {
            console.log(error)
            setIsLoader(false);
            formik.setFieldValue('hoa', null)
            setHoaData([])
        }
    }

    var val;
    const handleReset =(val) => {
        formik.setFieldValue('hoa', null);
        formik.setFieldValue('financialYear', null);
        handleFetchTableData({
            officeId: 1,
            hoaId: null,
            fyId: null
        }, val);
    }
    const handleFetchTableData = async(payload, val) => {

        // const payload = {
        //     officeId : formik.values.officeSelect ? formik.values.officeSelect?.id : 1,
        //     hoaId: formik.values.hoa ? formik.values?.hoa?.id : null,
        //     fyId: formik.values.financialYear ? formik.values?.financialYear?.id : null
        // }
        console.log(val, 'val')
        try {
            setIsLoader(true);
            const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/getFyMonthsByHoa`, payload)
            console.log('tableData',res);

            if(res.data.status){
                setTableData(res.data.result?.fyMonthHoa);
                formik.setFieldValue('totalEmployee', (res.data.result?.allocatedEmp + res.data.result?.unAllocatedEmp))
                formik.setFieldValue('allocatedEmployee', res.data.result?.allocatedEmp)
                formik.setFieldValue('unallocatedEmployee', res.data.result?.unAllocatedEmp)
                setIsLoader(false);
                setShowPeriodList(true);
                showSnackbar(res.data.message, 'success');
                if(val){
                    setShowPeriodList(false);
                    formik.setFieldValue('totalEmployee', '')       
                    formik.setFieldValue('allocatedEmployee', '')
                    formik.setFieldValue('unallocatedEmployee', '')
                }
            }
            else{
                setIsLoader(false);
                showSnackbar('No records found', 'error')
            }
        } catch (error) {
            console.log(error);
            setIsLoader(false);
            showSnackbar('No records found', 'error')
        }
    }
    useEffect(() => {
        setIsLoader(true);
        handleFetchIndependentDropdownData();
        // handleFetchTableData();
    }, [])

    useEffect(() => {
        if(callHoaData){
            // setIsLoader(true);
            handleCallHoaData();
        }
    }, [formik.values.officeSelect])

    return (
        <>
        {isLoader && <Loader />}
        <Card>
            <CardContent>
                <PageTitle name={name}/>
                    <Box component= "form" onSubmit={formik.handleSubmit}>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Autocomplete
                                    disablePortal
                                    options={officeData}
                                    fullWidth
                                    id="officeSelect"
                                    name="officeSelect"
                                    required
                                    value={
                                        officeData.find(
                                        (option) =>
                                            option.id === formik.values.officeSelect?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                            formik.setFieldValue("officeSelect", null);
                                            formik.setFieldValue('hoa', null);
                                        } else {
                                            formik.setFieldValue("officeSelect", value);
                                            setCallHoaData(true);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    size='small'
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params} 
                                            label="Office"
                                            required
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.errors.officeSelect &&
                                                formik.touched.officeSelect
                                                ? formik.errors.officeSelect
                                                : null
                                            }
                                            error={
                                                formik.errors.officeSelect &&
                                                formik.touched.officeSelect
                                                ? true
                                                : false
                                            } 
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Autocomplete
                                    disablePortal
                                    options={hoaData}
                                    fullWidth
                                    disabled= {formik.values.officeSelect ? false : true}
                                    id="hoa"
                                    name="hoa"
                                    required
                                    value={hoaData &&
                                        hoaData?.find(
                                        (option) =>
                                            option.id === formik.values.hoa?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("hoa", null);
                                        } else {
                                        formik.setFieldValue("hoa", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    size='small'
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params} 
                                            label="HOA"
                                            required
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.errors.hoa &&
                                                formik.touched.hoa
                                                ? formik.errors.hoa
                                                : null
                                            }
                                            error={
                                                formik.errors.hoa &&
                                                formik.touched.hoa
                                                ? true
                                                : false
                                            } 
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Autocomplete
                                    disablePortal
                                    options={financialYearData}
                                    fullWidth
                                    id="financialYear"
                                    name="financialYear"
                                    required
                                    value={
                                        financialYearData.find(
                                        (option) =>
                                            option.id === formik.values.financialYear?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                        formik.setFieldValue("financialYear", null);
                                        } else {
                                        formik.setFieldValue("financialYear", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    size='small'
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params} 
                                            label="Financial Year"
                                            required
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.errors.financialYear &&
                                                formik.touched.financialYear
                                                ? formik.errors.financialYear
                                                : null
                                            }
                                            error={
                                                formik.errors.financialYear &&
                                                formik.touched.financialYear
                                                ? true
                                                : false
                                            } 
                                    />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item style={{width:'100%',display:'flex',justifyContent:'flex-end', gap:4}}  paddingRight={{md:3, lg:3}} paddingTop={{md:2, lg:2}}>
                                <Button variant='outlined' style={{borderRadius:'4px', float:'right'}} onClick={() => handleReset(val = true)}>Reset</Button>
                                <Button variant='contained' style={{borderRadius:'4px', float:'right'}} disabled={formik.values.officeSelect === null || formik.values.hoa === null || formik.values.financialYear === null ? true : false} type='submit'>Search</Button>
                            </Grid>
                        </Grid>
                    </Box>
            </CardContent>    
        </Card>
        {!showPeriodList && (
            <Alert severity="warning">
                Please select the above fields and search to receive the data.
            </Alert>
        )}
        <>
            <Card>
                <CardContent>
                    <PageTitle name={name1}/>
                    <Grid container columnSpacing={2}>
                        {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Office Name" size="small" defaultValue={"Finance Department"} disabled fullWidth/>
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <TextField label="Total Employee" size="small" name="totalEmployee" value={formik.values.totalEmployee} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <TextField label="Allocated Employee" size="small" name='allocatedEmployee' value={formik.values.allocatedEmployee} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <TextField label="Unallocated Employee" size="small" name='unallocatedEmployee' value={formik.values.unallocatedEmployee} disabled fullWidth/>
                        </Grid>
                    </Grid>
                    {showPeriodList && (
                    <>
                        {/* <Alert severity="warning">
                            In case if you want to exclude employees from group for given paybill cycle, click 'OPEN' button in below list and un-check the employees from the list appear and save. <br />
                            Note: (B) Click 'Go For Process' to process, finalize and submit paybill for approval.
                        </Alert> */}
                        <Grid container sx={{mt:2}}>
                            <SearchTable 
                                columns={columns}
                                // data={rowss}
                                data={tableData}
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
                    </>
                    )}
                </CardContent>
            </Card>
        </>
        
        {/* {open ? <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={3} lg={4}>
                        <TextField label="Search" size="small" fullWidth/>
                    </Grid>
                </Grid>
                <Grid container>
                    <SearchTable 
                        columns={columnsHeadOfAccountDetail}
                        // data={rowss}
                        data={rowDataHeadOfAccountDetail}
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
                </Box>
            </Modal>
        </> : null} */}
        </>
    )
}

export default RegularySalaryBill
