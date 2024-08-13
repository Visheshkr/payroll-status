import {
    Card, Grid, CardContent, TextField, Box, Button, Stack, Typography, Link, Alert, Dialog, DialogContent,
    DialogActions
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import PageTitle from '../../layouts/PageTitle'
import useTitle from '../../hooks/useTitle'
import SearchTable from '../../components/SearchTableAlt';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/AxiosInterceptor';
import Loader from '../../components/Loader';
import { useFormik } from 'formik';
import * as yup from "yup";
import AlertConfirm, { Button1 } from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { useSnackbar } from '../../components/Snackbar';
import PopupOverClick from './PopupOverClick'
const SalaryProcessReport = () => {

    const title = 'Salary Process Report';
    const name = 'Processed Salary Report';
    const name1 = 'Salary Process Report'
    useTitle(title)

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [dubby, setDubby] = useState();
    const [status, setStatus] = useState('');
    const { showSnackbar } = useSnackbar();
    const validationSchema = yup.object({
        // officeSelect: yup.object().nullable().required("Please select Office"),
        department: yup.object().nullable().required("Please select HOA"),
        financialYear: yup.object().nullable().required("Financial year is required"),
    });
    const formik = useFormik({
        initialValues: {
            officeSelect: null,
            department: null,
            financialYear: null,
            totalCount:'',
            initiatedCount: '',
            notInitiatedCount: '',
            delayedCount: '',


        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {

            const officeIds = values.officeSelect?.id === 'ALL'
                ? officeData.filter(office => office.id !== 'ALL').map(office => office.id)
                : [values.officeSelect.id];

            console.log(values)
            // callConfirmDialogFormSave(values, resetForm);
            handleFetchTableData({
                deptId: [formik.values.department && formik.values.department?.id],
                empIds: [],
                officeIds: officeIds,
                // officeIds: [formik.values.officeSelect && formik.values?.officeSelect?.id],
                payMontId: formik.values.financialYear && formik.values?.financialYear?.id
            });
        }
    })
    console.log(formik.values)
    // const handleOpenGroup =(params) => {
    //     navigate('/opengroup', {state:params})
    // }
    // const handleGoForProcess = (params)=> {
    //     navigate('/SalaryProcess', {state:[params, formik.values.officeSelect?.id]});
    // }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            field: "officeId",
            headerName: "Office Id.",
            flex: 0.1,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "officeName",
            headerName: "Office Name",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "deptName",
            headerName: "Department Name",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "notProcessedCount",
            headerName: "Not Processed Count",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        setStatus('N');
                        handleClickOpen();
                        setDubby(params.row.officeId);
                        console.log((params))
                    }}
                >
                    {params.value}
                </Link>
            ),

        },

        //   {

        //     renderCell: (params) => (
        //       params.value > 0 ? ( 
        //         <Link
        //           sx={{ cursor: "pointer" }}
        //           onClick={() => handleRedirectDetails(params.row)}
        //         >
        //           {params.value}
        //         </Link>
        //       ) : (
        //         <span>{params.value}</span> 
        //       )
        //     ),
        //   },
        {
            field: "processedCount",
            headerName: "Processed Count",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        setStatus('I');
                        handleClickOpen();
                        setDubby(params.row.officeId);
                        console.log((params))
                    }}
                >
                    {params.value}
                </Link>
            ),

        },
        // {
        //     field: "notDelayedCount",
        //     headerName: "Not Delayed Count",
        //     flex: 0.2,
        //     minWidth: 180,
        //     headerClassName: "super-app-theme--header",
        //     renderCell: (params) => (
        //         <Link
        //             sx={{ cursor: "pointer" }}
        //             onClick={() => {

        //                 handleClickOpen();
        //                 setDubby(params.row.officeId);
        //                 console.log((params))
        //             }}
        //         >
        //             {params.value}
        //         </Link>
        //     ),

        // },
        {
            field: "totalEmp",
            headerName: "Total Employee",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        setStatus('T');
                        handleClickOpen();
                        setDubby(params.row.officeId);
                        console.log((params))
                    }}
                >
                    {params.value}
                </Link>
            ),

        },
        {
            field: "delayedCount",
            headerName: "Delayed Count",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        setStatus('D');
                        handleClickOpen();
                        setDubby(params.row.officeId);
                        console.log((params))
                    }}
                >
                    {params.value}
                </Link>
            ),

        },
    ];


    const [departmentData, setDepartmentData] = useState([]);
    const [financialYearData, setFinancialYearData] = useState([]);
    const [officeData, setOfficeData] = useState([{ id: 'ALL', label: 'ALL' }]);
    const [tableData, setTableData] = useState([]);
    const [callOfficeData, setCallOfficeData] = useState(false);
    const [showPeriodList, setShowPeriodList] = useState(false);
    const [fieldData, setFieldData] = useState();
    const [isLoader, setIsLoader] = useState(false);

    const handleFetchIndependentDropdownData = async () => {
        try {
            const res = await axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
            console.log(res.data.result.departments);
            if (res.data.status) {

                const departmentDropdown = res?.data?.result?.departments?.map((item) => ({
                    id: item?.deptId,
                    label: item?.name

                }))

                console.log(departmentDropdown);
                setDepartmentData(departmentDropdown);
                setIsLoader(false);
            }

        } catch (error) {
            setIsLoader(false);
            console.log(error)
        }
    }

    const Fetchfymonth = async () => {
        try {
            const res = await axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getFyMonth`)
            if (res.data.status) {

                const financialYearDropdown = res?.data?.result?.map((item) => ({
                    id: item?.typeId,
                    label: item?.typeName
                }))
                console.log(financialYearDropdown);
                setFinancialYearData(financialYearDropdown);
                setIsLoader(false);
            }

        } catch (error) {
            setIsLoader(false);
            console.log(error)
        }
    }

    // const handleCallofficeData =async() => {
    //     setIsLoader(true);
    //     try {
    //         const payload = {
    //             deptId: formik.values.department.id,
    //             stateId:  null,
    //             districtId: null,
    //             officeName: null
    //           };
    //         const res = await axiosClient.post(`http://141.148.194.18:8052/payroll/employee/dropdown/office`,payload )
    //         console.log('office',res);
    //         if(res.status === 200){
    //             const officeDropdown = res?.data?.map((item) => ({
    //                 id: item?.id,
    //                 label: item?.officeName
    //             }))

    //             console.log(officeDropdown)
    //             setOfficeData(officeDropdown)
    //             formik.setFieldValue('officeSelect', null)
    //             setIsLoader(false);
    //             setCallOfficeData(false);
    //         }
    //         else{
    //             setIsLoader(false);
    //             formik.setFieldValue('officeSelect', null)
    //             setOfficeData([])
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         setIsLoader(false);
    //         formik.setFieldValue('officeSelect', null)
    //         setOfficeData([])
    //     }
    // }
    const handleCallofficeData = async () => {
        setIsLoader(true);
        try {
            const payload = {
                deptId: formik.values.department.id,
                stateId: null,
                districtId: null,
                officeName: null
            };
            const res = await axiosClient.post(`http://141.148.194.18:8052/payroll/employee/dropdown/office`, payload);
            if (res.status === 200) {
                const officeDropdown = res.data.map((item) => ({
                    id: item.id,
                    label: item.officeName
                }));
                setOfficeData([{ id: 'ALL', label: 'ALL' }, ...officeDropdown]);
                formik.setFieldValue('officeSelect', { id: 'ALL', label: 'ALL' });
                setIsLoader(false);
                setCallOfficeData(false);
            } else {
                setIsLoader(false);
                formik.setFieldValue('officeSelect', { id: 'ALL', label: 'ALL' });
                setOfficeData([{ id: 'ALL', label: 'ALL' }]);
            }
        } catch (error) {
            setIsLoader(false);
            formik.setFieldValue('officeSelect', { id: 'ALL', label: 'ALL' });
            setOfficeData([{ id: 'ALL', label: 'ALL' }]);
        }
    };

    var val;
    const handleReset = (val) => {
        formik.setFieldValue('hoa', null);
        formik.setFieldValue('financialYear', null);
        handleFetchTableData({
            deptId: 1,
            officeIds: null,
            empIds: null,
            payMontId: null

        }, val);
    }
    const handleFetchTableData = async (payload, val) => {
        console.log(val, 'val')
        try {
            setIsLoader(true);
            const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/getEmployeeReport`, payload)
            console.log('tableData', res);

            if (res.data.status) {
                setTableData(res.data?.result?.report);
                formik.setFieldValue('totalCount', res.data.result?.totalCount)
                formik.setFieldValue('initiatedCount', res.data.result?.initiatedCount)
                formik.setFieldValue('notInitiatedCount', res.data.result?.notInitiatedCount)
                formik.setFieldValue('delayedCount', res.data.result?.delayedCount)
                setIsLoader(false);
                setShowPeriodList(true);
                showSnackbar(res.data.message, 'success');
                if (val) {
                    setShowPeriodList(false);
                    formik.setFieldValue('totalCount', '')
                    formik.setFieldValue('initiatedCount', '')
                    formik.setFieldValue('notInitiatedCount', '')
                    formik.setFieldValue('delayedCount', '')

                }
            }
            else {
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
        Fetchfymonth();
        // handleFetchTableData();
    }, [])

    useEffect(() => {
        if (callOfficeData) {
            // setIsLoader(true);
            handleCallofficeData();
        }
    }, [formik.values.department])

    return (
        <>
            {isLoader && <Loader />}
            <Card>
                <CardContent>
                    <PageTitle name={name} />
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Autocomplete
                                    disablePortal
                                    options={departmentData}
                                    fullWidth
                                    id="department"
                                    name="department"
                                    required
                                    value={
                                        departmentData.find(
                                            (option) =>
                                                option.id === formik.values.department?.id
                                        ) || null
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                            formik.setFieldValue("department", null);
                                            formik.setFieldValue('officeSelect', null);
                                        } else {
                                            formik.setFieldValue("department", value);
                                            setCallOfficeData(true);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    size='small'
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Department"
                                            required
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.errors.department &&
                                                    formik.touched.department
                                                    ? formik.errors.department
                                                    : null
                                            }
                                            error={
                                                formik.errors.department &&
                                                    formik.touched.department
                                                    ? true
                                                    : false
                                            }
                                        />}
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={4} lg={4}>
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
                                            setCallOfficeData(true);
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
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Autocomplete
                                    disablePortal
                                    options={officeData}
                                    fullWidth
                                    disabled={formik.values.department ? false : true}
                                    id="officeSelect"
                                    name="officeSelect"

                                    value={officeData &&
                                        officeData?.find(
                                            (option) =>
                                                option.id === formik.values.officeSelect?.id
                                        ) || { id: 'ALL', label: 'ALL' }
                                    }
                                    onChange={(e, value) => {
                                        if (value === null) {
                                            formik.setFieldValue("officeSelect", { id: 'ALL', label: 'ALL' });
                                        } else {
                                            formik.setFieldValue("officeSelect", value);
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    size='small'
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Office"

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
                            <Grid item style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 4 }} paddingRight={{ md: 3, lg: 3 }} paddingTop={{ md: 2, lg: 2 }}>
                                <Button variant='outlined' style={{ borderRadius: '4px', float: 'right' }} onClick={() => handleReset(val = true)}>Reset</Button>
                                <Button variant='contained' style={{ borderRadius: '4px', float: 'right' }} disabled={formik.values.department === null || formik.values.financialYear === null ? true : false} type='submit'>Search</Button>
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

                {showPeriodList && (
                    <>
                        <Card>
                            <CardContent>
                                <PageTitle name={name1} />
                                <Grid container columnSpacing={2}>

                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField label="Total Employee" size="small" name="totalCount" value={formik.values.totalCount} disabled fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField label="Salary Initiated" size="small" name='initiatedCount' value={formik.values.initiatedCount} disabled fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField label="Salary Not Initiated Yet" size="small" name='notInitiatedCount' value={formik.values.notInitiatedCount} disabled fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField label="Delay" size="small" name='delayedCount' value={formik.values.delayedCount} disabled fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container sx={{ mt: 2 }}>
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
                            </CardContent>
                        </Card>
                    </>
                )}
                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogContent >

                        <PopupOverClick rqstId={dubby} year={formik?.values?.financialYear?.id} status={status} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>

                    </DialogActions>
                </Dialog>

            </>


        </>
    )
}

export default SalaryProcessReport
