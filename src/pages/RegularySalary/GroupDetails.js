import { Box, Grid, Card, CardContent, TextField, Link, Stack, Button, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageTitle from '../../layouts/PageTitle';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Checkbox from '@mui/material/Checkbox';
import axiosClient from '../../utils/AxiosInterceptor';
import { useSnackbar } from "../../components/Snackbar";
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import AlertConfirm, { Button1 } from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";

const textFieldStyle = {
    width: "100%",
    padding: "10px 12px",
    fontSize: "10px",
    lineHeight: "1.5",
    border: "1px solid #ced4da",
    textAlign:'center',
    borderRadius: "4px",
    backgroundColor: "#fff",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
}
const GroupDetails = () => {
    const location = useLocation();

    const tableData = location?.state[0];
    const payloadData = location?.state[1];
    const fyMonId = location?.state[2];
    const processedData = location?.state[3];
    const officeId = location?.state[4];

    console.log('pass data back to salary process', payloadData, officeId);
    const navigate = useNavigate();
    console.log('Group Data', tableData, payloadData, fyMonId, processedData);

    const heading = 'Employee Wise Earning/Deduction'
    const {showSnackbar} = useSnackbar();

    const [data, setData] = useState([])
    const [modalDimensionFlag, setModalDimensionFlag] = useState(false);
    const [isLoader, setIsLoader] = useState(false)
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [grossEarning, setGrossEarning] = useState([]);
    const [deduction, setDeduction] = useState([]);
    const [lossOfPayField, setLossOfPayField] = useState('')
    const [noOfDaysPaid, setNoOfDaysPaid] = useState('')
    const [calculated, setCalculated] = useState(false);

    const user = useSelector((state) => state.loginReducer);
    const userId = user.data.userdetails.user.userId;

    console.log('userId', userId)
    const handleFetchData = async() => {
        setIsLoader(true);
        const payload = {
            fyMonHoa:payloadData?.id,
            grpCode: tableData?.groupCode
        }
        try {
            const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/findEmpByGrpCode`, payload)
            if(res.data.statusCode === 200){
                setData(res.data.result);
                setIsLoader(false);
                showSnackbar(res?.data.message, 'success')
            }
        } catch (error) {
            console.log(error)
            setIsLoader(false)
            setData([])
            showSnackbar(error, 'error')
        }
    }
    useEffect(() => {
        handleFetchData();
        console.log('api called')
    }, [])

    // const columnsProcessedGroupList = [
    //     {
    //         field: "SrNo",
    //         headerName: "Sr No.",
    //         flex: 0.1,
    //         minWidth: 150,
    //         headerClassName: "super-app-theme--header",

    //     },
    //     {
    //         field: "empName",
    //         headerName: "Employee Name",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",

    //     },
    //     {
    //         field: "gpfNo",
    //         headerName: "GPF/PRAN",
    //         flex: 0.1,
    //         minWidth: 80,
    //         headerClassName: "super-app-theme--header",

    //     },
    //     {
    //         field: "designation",
    //         headerName: "Designation",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "serviceType",
    //         headerName: "Service Type",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "actualEarning",
    //         headerName: "Actual",
    //         flex: 0.2,
    //         minWidth: 150,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "lastMonthGE",
    //         headerName: "Last Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "currMonthGE",
    //         headerName: "Current Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "lastmonthDeduction",
    //         headerName: "Last Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "currMonthDeduction",
    //         headerName: "Current Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "lastmonthRecovery",
    //         headerName: "Last Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "currMonthRecovery",
    //         headerName: "Current Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "lastmonthNetAmount",
    //         headerName: "Last Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "currmonthNetAmount",
    //         headerName: "Current Month",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "noOfDays",
    //         headerName: "Number of Days",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "suspended",
    //         headerName: "Is Suspended",
    //         flex: 0.2,
    //         minWidth: 180,
    //         headerClassName: "super-app-theme--header",
    //     },
    //     {
    //         field: "action",
    //         headerName: "Action",
    //         headerClassName: "super-app-theme--header",
    //         flex: 0.3,
    //         minWidth: 250,
    //         sortable: false,
    //         disableClickEventBubbling: true,
    //         renderCell: (params) => {
    //             return (
    //             <Stack direction="row" spacing={1}>
    //                 <Button variant="outlined" color="warning" sx={{borderRadius:'4px'}}>
    //                 Attach
    //                 </Button>
    //                 {/* <IconButton style={{ color: "#2169b3" }} >
    //                             <InfoIcon />
    //                         </IconButton> */}
    //             </Stack>
    //             );
    //         },
    //     },
    // ];

    // const columnGroupingModel = [
    //     {
    //         groupId: 'Gross_Data',
    //         headerName: 'Gross Earning',
    //         description: '',
    //         children: [{ field: 'actualEarning' }, { field: 'isAdmin' }],
    //     },
    //     {
    //         groupId: 'naming',
    //         headerName: 'Full name (freeReordering)',
    //         headerClassName: 'my-super-theme--naming-group',
    //         children: [{ field: 'actualEarning' }, { field: 'lastMonthGE' }, { field: 'currMonthGE' },],
    //     },
    // ];

    // const rows = [
    //     { SrNo: 1, empName: 'Snow', gpfNo: 'BHR/IAS-1461', designation: 'Secretary',  serviceType:'AIS', actualEarning:'299,620', lastMonthGE:'0', currMonthGE:'299,620', lastmonthDeduction:'0', currMonthDeduction:'11,238', lastmonthRecovery:'0', currMonthRecovery:'0', lastmonthNetAmount:'0', currmonthNetAmount:'288,442', noOfDays:'31', suspended:'No'},
    //     { SrNo: 2, empName: 'Lannister', gpfNo: 'BHR/IAS-1461', designation: 'Secretary', serviceType:'AIS' , actualEarning:'299,620', lastMonthGE:'0', currMonthGE:'299,620', lastmonthDeduction:'0', currMonthDeduction:'11,238', lastmonthRecovery:'0', currMonthRecovery:'0', lastmonthNetAmount:'0', currmonthNetAmount:'288,442', noOfDays:'31', suspended:'No'},
    //     { SrNo: 3, empName: 'Lannister', gpfNo: 'BHR/IAS-1461', designation: 'Secretary', serviceType:'AIS', actualEarning:'299,620', lastMonthGE:'0',currMonthGE:'299,620', lastmonthDeduction:'0', currMonthDeduction:'11,238', lastmonthRecovery:'0', currMonthRecovery:'0', lastmonthNetAmount:'0', currmonthNetAmount:'288,442', noOfDays:'31', suspended:'No'},
    // ]
    const handleFetchEmployeeData = async(empId) => {
        setIsLoader(true);
        try {
            const res = await axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/salary/structure/${empId}`);
            console.log('response Modal',res);
            if(res.data.status){
                setModalData(res.data.result);
                setGrossEarning(res.data.result?.paymentPayhead);
                setDeduction(res.data.result?.deductionPayhead)
                showSnackbar(res.data.message, 'success')
            }
            setIsLoader(false)
        } catch (error) {
            console.log(error);
            setIsLoader(false)
            showSnackbar(error.response.data.message, 'error')
        }
    }
    
    const handleCalculateData = async() => {
        setIsLoader(true);
        const payload = {
            fyPayMonthId:fyMonId,
            empId:modalData?.employeeCode,
            lossOfPayInDays:lossOfPayField
        }
        try {
            const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/salary/calculate`, payload)
            console.log(res);
            // setModal(res.data.result)
            if(res.data.status){
                setNoOfDaysPaid(res.data.result?.noOfPaidDays)
                setGrossEarning(res.data.result?.paymentPayhead)
                setDeduction(res.data.result?.deductionPayhead)
                setCalculated(true);
                setIsLoader(false);
                showSnackbar(res.data.message, 'success');
            }
        } catch (error) {
            console.log(error)
            setIsLoader(false)
            setCalculated(false)
            showSnackbar(error.response.data.message, 'error')
        }
    }
    const handleOpen = (empId) => {
        setOpen(true);
        console.log('empId', empId)
        handleFetchEmployeeData(empId);
    }
    const handleClose = () => {
        setOpen(false)
        setModalData([])
        setGrossEarning([])
        setDeduction([])
        setLossOfPayField('')
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: modalDimensionFlag ? '100%' : '80%',
        height: modalDimensionFlag ? '100%' : '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY:'scroll'
    };
    const handleToggleModal =() => {
        setModalDimensionFlag(!modalDimensionFlag);
    }
    
    const [selectedIndices, setSelectedIndices] = useState([])
    const handleChange = (index, isChecked) => {
        const newSelectedIndices = isChecked ? [...selectedIndices, index] : selectedIndices.filter(i => i !== index);

        setSelectedIndices(newSelectedIndices)

    }
    const handleCommit = () => {
        console.log('Commit called')
        var modifiedArr = [];

        const grossPayhead = grossEarning.map((item, index) => ({
            payheadId: item?.payheadId,
            payheadValue: item?.payheadValue,
            payheadConfigId: item?.payheadConfigId
        }))

        const deductionPayhead = deduction.map((item,index) => ({
            payheadId: item?.payheadId,
            payheadValue: item?.payheadValue,
            payheadConfigId: item?.payheadConfigId
        }))
        
        for(let i =0; i<grossPayhead.length; i++){
            modifiedArr.push(grossPayhead[i])
        }
        for(let i =0; i<deductionPayhead.length; i++){
            modifiedArr.push(deductionPayhead[i]);
        }
        handleCommitChanges(modifiedArr)
    }

    const handleCommitChanges = async(modifiedArr) => {
        setIsLoader(true);
        console.log(modifiedArr)
        console.log('modalData', modalData)
        const payload = {
            empId: modalData?.employeeCode,
            fyPayMonthId : fyMonId,
            paidDays: noOfDaysPaid,
            crtBy: userId,
            empSalary: modifiedArr
        }
        console.log(payload);
        try {
            const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveSalaryBill`, [payload])

            if(res.data.status) {
                showSnackbar(res.data.message, 'success');
                setIsLoader(false);
                handleClose();
                handleFetchData();
            }
        } catch (error) {
            console.log(error);
            setIsLoader(false);
            // handleClose();
        }
    }
    const handleSubmit = async() => {
        // setIsLoader(true);
        const appendedData = data.employees?.filter((item, index) => selectedIndices.includes(index))
        console.log(appendedData, 'appendedData');
        const payload = appendedData.map(d => ({
            empId: d?.empId,
            fyPayMonthId : fyMonId,
            paidDays: 30,
            crtBy: userId,
            empSalary: d?.payHeads
        }))

        console.log(payload);
        try {
            const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveSalaryBill`, payload)

            if(res.data){
                console.log(res.data);
                setIsLoader(false)
                showSnackbar(res.data.message, "success")
                navigate('/salaryprocess', {state:[payloadData, officeId]})
            }
        } catch (error) {
            console.log(error);
            setIsLoader(false)
            showSnackbar(error, "error")
        }
    }
    console.log(data, 'data')

    // let afterDeductionPayHead = grossEarning.map((item) => {
    //     let total = 0
    //     total += parseInt(Number(item?.payheadValue))

    //     return parseInt(Number(total))
    // })
    var total = 0;
    for(let i = 0; i<grossEarning.length; i++){
        total = total + grossEarning[i]?.payheadValue
    }
    console.log(total,'total value after ded')
    return (
        <div>
            {isLoader && <Loader />}
            <Card>
                <CardContent>
                    <PageTitle name={heading} />
                    <Grid container columnSpacing={3} gap={{sm:2, md:0, lg:2}}>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Office Name" size="small" value={data?.officeName ?? ''} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Financial Year" size="small" value={data?.fy ?? ''} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Pay Month" size="small" value={data?.currentYear + '-' + data?.month} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Group Name" size="small" value={data?.grpName ?? ''} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Cycle" size="small" value={data?.cycle ?? tableData?.cycleNo} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Total Employee" size="small" value={data?.employees?.length ?? ''} disabled fullWidth/>
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Include" size="small" value={data?.include ?? ''} disabled fullWidth/>
                        </Grid> */}
                        {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Exclude" size="small" value={data?.exclude ?? ''} disabled fullWidth/>
                        </Grid> */}
                        {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Payroll Status" size="small" value={data.status ?? ''} disabled fullWidth/>
                        </Grid> */}
                        {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Number of Days" size="small" value={data?.workingDays ?? ''} disabled fullWidth/>
                        </Grid> */}
                        {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Pay Bill Number" size="small" value={data?.payBillNo ?? ''} disabled fullWidth/>
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="HOA" size="small" value={data?.hoa ?? ''} disabled fullWidth/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Alert severity="warning">
                Note:- Please click on Employee Name to View Processed Salary
            </Alert>

            <Card>
                <CardContent>
                    <PageTitle name='Initiate Salary Process'/>
                    {/* <Grid container>
                        <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="Employee Name/ GPF/PRAN" size="small" fullWidth/>
                        </Grid>
                    </Grid> */}

                    <Grid container>
                        {/* <Box component= "form" onSubmit={formik.handleSubmit}> */}
                        <table style={{ border:'1px solid grey'}}>
                            <tr style={{border:'1px solid grey', textAlign:'center', fontSize:'12px', fontWeight:'bold', backgroundColor:'#E8F3FE'}}>
                                <td rowSpan="2" style={{border:'1px solid grey',  padding:'5px'}}>S.No</td>
                                {!processedData && (
                                    <td rowSpan="2" style={{border:'1px solid grey',  padding:'5px'}}>Select</td>
                                )}
                                <td rowSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Employee Name</td>
                                <td rowSpan="2" style={{border:'1px solid grey',padding:'5px'}}>GPF/PRAN</td>
                                <td rowSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Designation</td>
                                <td rowSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Service Type</td>
                                <td colSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Gross Earning</td>
                                <td colSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Deduction</td>
                                <td colSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Recovery</td>
                                <td colSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Net Amount</td>
                                <td rowSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Number of Days</td>
                                <td rowSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Is Suspended</td>
                                {/* <td rowSpan="2" style={{border:'1px solid grey', padding:'5px'}}>Attachment</td> */}
                            </tr>
                            <tr style={{ textAlign:'center', fontSize:'12px', fontWeight:'bold', backgroundColor:'#E8F3FE'}}>
                                <td style={{border:'1px solid grey', padding:'5px'}}>Actual</td>
                                {/* <td style={{border:'1px solid grey', padding:'5px'}}>Last Month</td> */}
                                <td style={{border:'1px solid grey', padding:'5px'}}>Current Month</td>

                                <td style={{border:'1px solid grey', padding:'5px'}}>Actual Month</td>
                                <td style={{border:'1px solid grey', padding:'5px'}}>Current Month</td>

                                <td style={{border:'1px solid grey', padding:'5px'}}>Actual Month</td>
                                <td style={{border:'1px solid grey', padding:'5px'}}>Current Month</td>

                                <td style={{border:'1px solid grey', padding:'5px'}}>Actual Month</td>
                                <td style={{border:'1px solid grey', padding:'5px'}}>Current Month</td>
                            </tr>

                            {/* upon fetch data loop over it and put the values here. */}
                            {data?.employees?.map((item, index) => (
                                <tr style={{fontSize:'12px', textAlign:'center'}} key={item?.empId}>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{index+1}</td>
                                    {!processedData && (
                                    <td style={{border:'1px solid grey',  padding:'5px'}}>
                                        <Checkbox checked={selectedIndices.includes(index)} onChange={(e) => handleChange(index, e.target.checked)}/>
                                    </td>
                                    )}
                                    <td style={{border:'1px solid grey', padding:'5px'}}><Link onClick={() => handleOpen(item?.empId)}>{item?.empName}</Link></td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.gpfPranNo}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.designation}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.serviceType}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.actualGrossEarning}</td>
                                    {/* <td style={{border:'1px solid grey', padding:'5px'}}>0</td> */}
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.grossEarning}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.grossDeduction}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.actualGrossDeduction}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.actualGrossRecovery}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.grossRecovery}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.actualNetSalary}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.netSalary}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.noOfDays}</td>
                                    <td style={{border:'1px solid grey', padding:'5px'}}>{item?.isSuspended ?? 'No'}</td>
                                    {/* <td style={{border:'1px solid grey', padding:'5px'}}>
                                        <Button variant='outlined' sx={{borderRadius:'4px'}}><FileUploadIcon /></Button>
                                    </td> */}
                                </tr>
                            ))}
                            
                        </table>
                        {/* </Box> */}
                    </Grid>
                    {!processedData && (
                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%', gap:2}}>
                            {/* <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Back</Button> */}
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}} disabled={selectedIndices.length === 0 ? true : false} onClick={handleSubmit}>Initiate</Button>
                        </Grid>
                    </Grid>
                    )}
                </CardContent>
            </Card>
            {open ? 
            <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box sx={style}>
                    {isLoader && <Loader />}
                    <Grid container sx={{wdith:'100%',display:'flex', justifyContent: 'space-between'}}>
                        <Grid item>
                            <PageTitle name={'Employee Salary Structure'}/>
                        </Grid>
                        <Grid item sx={{display:'flex', justifyContent:'space-between', width:'8%'}}>
                            {modalDimensionFlag ? <Grid item><IconButton onClick={handleToggleModal}><CloseFullscreenIcon /></IconButton></Grid> : <Grid item><IconButton onClick={handleToggleModal}><OpenInFullIcon/></IconButton></Grid>}
                            
                            <Grid item><IconButton><CloseIcon onClick={handleClose}/></IconButton></Grid>
                        </Grid>
                    </Grid>
                    <Alert severity='warning'>
                        Note:- <br/>
                        (A) Please Enter number of paid days and Click on calculate button, Salary of entered days will be shown below. <br/>
                        (B) You need to Click on Commit Button for Modification in Processed Salary,If you don't Click, then Processed Salary will not be modify.

                    </Alert>
                    <Card>
                        <CardContent>
                            <PageTitle name={'Employee Detail'}/>
                            <Grid container columnSpacing={3} gap={{sm:2, md:0, lg:2}}>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Employee Name" size="small" value={modalData?.employeeName ?? ''} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Employee Id" size="small" value={modalData?.employeeCode ?? ''} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Office" size="small" value={modalData?.currentOffice ?? ''} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Payee Benefeciary ID" size="small" value={modalData?.payeeBenefId ?? ''} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="IFSC Code" size="small" value={modalData?.ifscCode ?? ''} disabled fullWidth/>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Salary Adjusted" size="small"  disabled fullWidth/>
                                </Grid> */}
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="GPF/PRAN" size="small" value={modalData?.gpfPranNo ?? ''} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Group" size="small" value={modalData?.group ?? ''} disabled fullWidth/>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Int Beneficiary ID" size="small" disabled fullWidth/>
                                </Grid> */}
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Service Type" size="small" value={modalData?.serviceType ?? ''} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Designation" size="small" value={modalData?.designation ?? ''} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Bank Account Number" size="small" value={modalData?.bankAccountNumber ?? ''} disabled fullWidth/>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Suspended" size="small"  disabled fullWidth/>
                                </Grid> */}
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Pay Month" size="small" value={data?.currentYear + '-' + data?.month} disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Number of paid days" size="small" value={noOfDaysPaid}  disabled fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8}>
                                    <TextField label="Loss of pay (in days)" value={lossOfPayField} onChange={(e) => setLossOfPayField(e.target.value)} size="small" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3.8} style={{display:'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                                    <Button size="small" variant="outlined" sx={{height: '36px', marginBottom:'20px', borderRadius:'4px'}} onClick = {handleCalculateData}>Calculate</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent sx={{display:'flex', minWidth:'100%',  justifyContent:'center',}}>
                            <Grid sx={{display:'flex', justifyContent: 'space-between', flexDirection:{xs:'column', md:'row', lg:'row'}, gap:2,}}>
                            <Grid sx={{width:"100%"}}>
                                <table style={{width:'100%', border:'1px solid grey'}}>
                                    <tr style={{border:'1px solid grey', textAlign:'center', fontSize:'12px', fontWeight:'bold', backgroundColor:'#E8F3FE'}}>
                                        <td colSpan="3" style={{border:'1px solid grey', padding:'5px'}}>Gross Earning</td>
                                    </tr>
                                    <tr style={{ textAlign:'center', fontSize:'12px', fontWeight:'bold', backgroundColor:'#E8F3FE'}}>
                                        <td style={{border:'1px solid grey', padding:'5px'}}>Sr No.</td>
                                        <td style={{border:'1px solid grey', padding:'5px'}}>Pay Head Name</td>
                                        <td style={{border:'1px solid grey', padding:'5px'}}>Pay Head Value</td>
                                    </tr>

                                    {/* upon fetch data loop over it and put the values here. */}
                                    <tbody>
                                        {grossEarning?.map((item, index) => (
                                            <tr style={{fontSize:'12px', textAlign:'center'}} key={item.payheadId}>
                                                <td style={{border:'1px solid grey', padding:'5px'}}>{index+1}</td>
                                                <td style={{border:'1px solid grey', padding:'5px'}}>{item?.payheadName}</td>
                                                <td style={{border:'1px solid grey', padding:'5px', alignItems:'center'}}>
                                                    {item?.payheadValue}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tr style={{fontSize:'12px', textAlign:'center'}}>
                                        <td style={{border:'1px solid grey',}}></td>
                                        <td style={{border:'1px solid grey', padding:'5px',  fontWeight:'bold'}}>Total </td>
                                        <td style={{border:'1px solid grey', padding:'5px', alignItems:'center',  fontWeight:'bold'}}>
                                            {total ? total : modalData?.grossEarning}
                                        </td>
                                    </tr>
                                </table>
                            </Grid>
                            <Grid sx={{width:"100%"}}>
                                <table style={{width:'100%'}}>
                                    <tr style={{border:'1px solid grey', textAlign:'center', fontSize:'12px', fontWeight:'bold', backgroundColor:'#E8F3FE'}}>
                                        <td colSpan="3" style={{border:'1px solid grey', padding:'5px'}}>Deduction</td>
                                    </tr>
                                    <tr style={{ textAlign:'center', fontSize:'12px', fontWeight:'bold', backgroundColor:'#E8F3FE'}}>
                                        <td style={{border:'1px solid grey', padding:'5px', width:'15%'}}>Sr No.</td>
                                        <td style={{border:'1px solid grey', padding:'5px'}}>Pay Head Name</td>
                                        <td style={{border:'1px solid grey', padding:'5px'}}>Pay Head Value</td>
                                    </tr>

                                    {/* upon fetch data loop over it and put the values here. */}
                                    <tbody>
                                        {deduction?.map((item, index) => (
                                            <tr style={{fontSize:'12px', textAlign:'center'}} key={item.payheadId}>
                                                <td style={{border:'1px solid grey', padding:'5px'}}>{index+1}</td>
                                                <td style={{border:'1px solid grey', padding:'5px'}}>{item?.payheadName}</td>
                                                <td style={{border:'1px solid grey', padding:'5px', alignItems:'center'}}>
                                                    {item?.payheadValue}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    
                                    <tr style={{fontSize:'12px', textAlign:'center'}}>
                                        <td style={{border:'1px solid grey',}}></td>
                                        <td style={{border:'1px solid grey', padding:'5px', fontWeight:'bold'}}>Total </td>
                                        <td style={{border:'1px solid grey', padding:'5px', alignItems:'center',  fontWeight:'bold'}}>
                                            {modalData?.grossDeduction}
                                        </td>
                                    </tr>
                                </table>
                            </Grid>
                            </Grid>
                        </CardContent>
                        <hr/>

                        <Grid container  width="100%" sx={{mt:2}}>
                            <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%', gap:2}}>
                                <Button variant="outlined" size="small" sx={{borderRadius:"4px"}} onClick={handleClose}>Close</Button>
                                <Button variant="contained" size="small" sx={{borderRadius:"4px"}} disabled={calculated ? false : true} type='submit' onClick={handleCommit}>Commit</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Modal>
        </> : null}
        </div>
  )
}

export default GroupDetails
