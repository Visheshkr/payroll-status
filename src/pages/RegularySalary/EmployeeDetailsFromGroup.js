import { Box, Grid, Card, CardContent, TextField, Checkbox, Link, Stack, Button, IconButton } from '@mui/material';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageTitle from '../../layouts/PageTitle';
import useTitle from '../../hooks/useTitle';
import Alert from '@mui/material/Alert';
import SearchTable from '../../components/SearchTableAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
const EmployeeDetailsFromGroup = () => {
    const location = useLocation();

    const data = location?.state;

    console.log('Group Data', data);

    const heading = 'Employee Wise Pay Period'
    const [selectedRows, setSelectedRows] = useState([]);
    const [refList, setRefList] = useState([]);
    const [processData, setProcessData] = useState();
    const navigate = useNavigate();
    const handleCheckboxChange = (event, row) => {
        const isChecked = event.target.checked;
    
        setSelectedRows(prevSelectedRows => {
            const updatedRows = [...prevSelectedRows];
        
            if (isChecked) {
                updatedRows.push(row);
            } else {
                const index = updatedRows.findIndex(selectedRow => selectedRow.grpCode === row.grpCode);
                if (index !== -1) {
                updatedRows.splice(index, 1);
                }
            }
            console.log("Selected Rows State:", updatedRows);
            setProcessData(updatedRows);
            const referenceIds = updatedRows.map(row => row.grpCode);
            setRefList(referenceIds);
            console.log("Reference IDs:", referenceIds);
            return updatedRows;
        });
    };
    
    console.log('Pass the data to the next page', processData);
    const columns = [
        {
            field: "SrNo",
            headerName: "Sr No.",
            flex: 0.1,
            minWidth: 80,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "select",
            headerClassName: "super-app-theme--header",
            headerName: "Select",
            flex: 0.1,
            minWidth: 100,
            value: true,
            renderCell: (params) => (
            <Checkbox
                checked={selectedRows.some(selectedRow => selectedRow.empId === params.row.empId)}
                onChange={(event) => handleCheckboxChange(event, params.row)}
            />
            ),
        },    
        {
            field: "empId",
            headerName: "Employee ID",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "empName",
            headerName: "Employee Name",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "gpfNo",
            headerName: "GPF/PRAN",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "totalDays",
            headerName: "Total Days",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "weekend",
            headerName: "Weekend",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "holiday",
            headerName: "Holiday",
            flex: 0.2,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "payableDays",
            headerName: "Payable Days",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "lossOfPay",
            headerName: "Loss of Pay",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "paidDays",
            headerName: "Paid Days",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
    ];

    const rows = [
        { SrNo: 1,empId:'10832576', empName: 'Snow', gpfNo: 'BHR/IAS-1461', totalDays: '31',  weekend:'0', holiday:'0', payableDays:'31', lossOfPay:'0', paidDays:'31',},
        { SrNo: 2,empId: '10831460', empName: 'Lannister', gpfNo: 'BHR/IAS-1461', totalDays: '31', weekend:'0' , holiday:'0', payableDays:'31', lossOfPay:'0', paidDays:'31',},
        { SrNo: 3,empId: '10831339', empName: 'Lannister', gpfNo: 'BHR/IAS-1461', totalDays: '31', weekend:'0', holiday:'0', payableDays:'31',lossOfPay:'0', paidDays:'31', },
    ]
    
    return (
        <div>
            <Card>
                <CardContent>
                    <PageTitle name={heading} />
                    <Grid container columnSpacing={3} gap={{sm:2, md:0, lg:2}}>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Office Name" size="small" defaultValue={"Finance Department"} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Financial Year" size="small" defaultValue={"2023-2024"} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Pay Month" size="small" defaultValue={"2024-Jan"} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Group Name" size="small" defaultValue={data?.grpName} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Cycle" size="small" defaultValue={"2"} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Total Employee" size="small" defaultValue={data.empInGroup} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Include" size="small" defaultValue={data.empEligible} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Exclude" size="small" defaultValue={data.excludeCount} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Payroll Status" size="small" defaultValue={data.payrollStats} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Number of Days" size="small" defaultValue={'31'} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Pay Bill Number" size="small" defaultValue={data.tempRefNumber} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="HOA" size="small" defaultValue={'12205020009000008'} disabled fullWidth/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* <Alert severity="warning">
                Note:- Please click on Employee Name to View Processed Salary
            </Alert> */}

            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="Employee Name/ GPF/PRAN" size="small" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <SearchTable 
                            columns={columns}
                            // data={rowss}
                            data={rows}
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
                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}}>
                            <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Back</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            
        </div>
  )
}

export default EmployeeDetailsFromGroup
