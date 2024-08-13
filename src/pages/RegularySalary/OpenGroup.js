import React, { useState } from 'react'
import useTitle from '../../hooks/useTitle'
import SearchTable from '../../components/SearchTableAlt';
import { Grid, Card, CardContent, TextField, Autocomplete, Checkbox, Button, Alert } from '@mui/material';
import PageTitle from '../../layouts/PageTitle';
import { useNavigate } from 'react-router-dom';


const OpenGroup = () => {
    useTitle('Pay Period Details')
    const columns = [
        {
            field: "office",
            headerName: "Office",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "hoa",
            headerName: "HOA",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "financialYr",
            headerName: "Financial Year",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "payMonth",
            headerName: "Pay Month",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
    ]

    const rows = [
        {office:'Finance Department', hoa:'1222502000900008', financialYr:'2022-2023', payMonth:'2024-Jan'},
    ]

    const columns2 = [
        {
            field: "grpName",
            headerName: "Group Name",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "includeCount",
            headerName: "Include Count",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "excludeCount",
            headerName: "Exclude Count",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "notEligibleCount",
            headerName: "Not Eligible Count",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "totalCount",
            headerName: "Total Count",
            flex: 0.1,
            minWidth: 100,
            headerClassName: "super-app-theme--header",

        },
    ]

    const rows2 = [
        {grpName:'PEON NPS M-R', includeCount:'2', excludeCount:'0', notEligibleCount:'2', totalCount:'4'},
        {grpName:'MISC FD', includeCount:'3', excludeCount:'0', notEligibleCount:'0', totalCount:'3'},
        {grpName:'DEPUTED EMP', includeCount:'0', excludeCount:'0', notEligibleCount:'4', totalCount:'4'},
    ]
    const columns3 = [
        {
            field: "includeCount",
            headerName: "Include Count",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "excludeCount",
            headerName: "Exclude Count",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "notEligibleCount",
            headerName: "Not Eligible Count",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "totalCount",
            headerName: "Total Count",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
    ]

    const rows3 = [
        {includeCount:'5', excludeCount:'0', notEligibleCount:'6', totalCount:'11'}
    ]

    const columns4 = [
        {
            field: "SrNo",
            headerName: "Sr No",
            flex: 0.1,
            minWidth: 60,
            headerClassName: "super-app-theme--header",

        },
        
        {
            field: "select",
            headerClassName: "super-app-theme--header",
            headerName: "Include/Exclude",
            flex: 0.1,
            minWidth: 150,
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
            headerName: "Employee Id",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "gpf/pran",
            headerName: "GPF/PRAN",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "empName",
            headerName: "Employee Name",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "designation",
            headerName: "Designation",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "grp",
            headerName: "Group",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "doj",
            headerName: "Date of Joining",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "dor",
            headerName: "Date of Retirement",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
    ]

    const rows4 = [
        {SrNo:1, empId:3000298, 'gpf/pran':'1011430900', empName:'Chiranjit Dey', designation:'Accounts Officer', grp:'STATE CADRE', doj:'01-04-2015', dor:'2047-12-31'},
        {SrNo:2, empId:3000292, 'gpf/pran':'1011430300', empName:'Aryan Raj', designation:'Peon', grp:'PEON NPS FD', doj:'12-01-2016', dor:'2051-09-31'},
        {SrNo:3, empId:3000291, 'gpf/pran':'1011430400', empName:'Sumit Chahar', designation:'Deputy Secretary', grp:'STATE CADRE', doj:'20-08-2016', dor:'2048-10-31'},
    ]
    const [selectedRows, setSelectedRows] = useState(rows4); //keep empty if the requirement is checkboxes should be unchecked on page reload
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
                const index = updatedRows.findIndex(selectedRow => selectedRow.empId === row.empId);
                if (index !== -1) {
                updatedRows.splice(index, 1);
                }
            }
            console.log("Selected Rows State:", updatedRows);
            setProcessData(updatedRows);
            const referenceIds = updatedRows.map(row => row.empId);
            setRefList(referenceIds);
            console.log("Reference IDs:", referenceIds);
            return updatedRows;
        });
    };
    
    console.log('Pass the data to the next page', processData);
    
    const group = [
        { label: 'PEON NPS M-R', id: 1 },
        { label: 'MISC FD', id: 2 },
        { label: 'DEPUTED EMP', id: 3 },
        { label: 'RETIRED EMPLOYEE FD', id: 4 },
        { label: 'PEON FD', id: 5 },
        { label: 'UDC-LDC FD', id: 6 },
        { label: 'STATE CADRE', id: 7 },
        { label: 'ASSISTANT NPS FD', id: 8 },
    ]
    const designation = [
        { label: 'Seed Inspector', id: 1 },
        { label: 'Sweeper', id: 2 },
        { label: 'Artist', id: 3 },
        { label: 'Chief Accountant', id: 4 },
        { label: 'Senior Midwife', id: 5 },
        { label: 'Head man', id: 6 },
        { label: 'Chowkidar', id: 7 },
        { label: 'Mechanic', id: 8 },
    ]
    const statusIncExc = [
        { label: 'All', id: 1 },
        { label: 'Include', id: 2 },
        { label: 'Exclude', id: 3 },
    ]

    const heading2 = 'Include/Exclude Employee'
    const heading = "Pay Period Details";
    return (
        <div>
            <Card>
                <CardContent>
                    <PageTitle name={heading}/>
                    <Grid container sx={{display:'flex'}} gap={4}>
                        <Grid item sx={{width:'45%'}}>
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
                        <Grid container  sx={{width:'50%'}}>
                            <Grid item>
                                <SearchTable 
                                    columns={columns2}
                                    // data={rowss}
                                    data={rows2}
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
                        <Grid item sx={{marginTop:2}}>
                            <SearchTable 
                                columns={columns3}
                                // data={rowss}
                                data={rows3}
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
            <Card>
                <CardContent>
                    <PageTitle name = {heading2}/>
                    <Grid container columnSpacing={3} gap={{sm:2, md:0, lg:2}}>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="HOA" size="small" defaultValue={"122052000900008"} disabled fullWidth/>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={group}
                                size='small'
                                renderInput={(params) => <TextField {...params} label="Group" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={designation}
                                size='small'
                                renderInput={(params) => <TextField {...params} label="Designation" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={statusIncExc}
                                size='small'
                                renderInput={(params) => <TextField {...params} label="Include Status" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="GPF/PRAN" size="small" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3.8}>
                            <TextField label="Employee Name" size="small" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'center', width:'100%'}}>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}}>Search</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Alert severity='warning'>
                Note:- (A) By default all employees of the group are included for paybill, if you want to exclude employee 'un-check' and save.
            </Alert>
            <Card>
                <CardContent>
                    <Grid container>
                        <SearchTable 
                            columns={columns4}
                            // data={rowss}
                            data={rows4}
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
                        <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}} gap={2}>
                            <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Save</Button>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}}>Save & Continue</Button>
                            <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Reset</Button>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}}>Back</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </div>
    )
}

export default OpenGroup
