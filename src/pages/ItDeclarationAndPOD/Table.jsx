import { Card, CardContent, Checkbox, FormGroup, Grid, Button } from '@mui/material';
import React, { useState } from 'react'
import SearchTable from '../../components/SearchTableAlt';
import PageTitle from '../../layouts/PageTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const Table = () => {
    const [toggleRadio, setToggleRadio] = useState('');

    const handleRadioChange = (params) => {
        setToggleRadio(params);
    }
    useTitle('Employee IT Declaration and Proof of Investment Details')
    console.log(toggleRadio.itdeclaration)
    const navigate = useNavigate();

    const handleITDeclarationPage = () => {
        console.log(toggleRadio);

        navigate('/itdeclarationformsubmit', {state: toggleRadio})
    }
    const columns = [
        {
            field: "id",
            headerName: "Sr No.",
            flex: 0.1,
            minWidth: 70,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "action",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            flex: 0.1,
            minWidth: 100,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <>
                        <FormControl sx={{mt:2.5}}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={toggleRadio?.itdeclaration}
                                onChange={(e) => handleRadioChange(params.row)}
                            >
                                <FormControlLabel value={params.row?.itdeclaration} control={<Radio />} />
                            </RadioGroup>
                        </FormControl>
                    </>
                );
            },
        },
        {
            field: "financialYear",
            headerName: "Financial Year",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "submitDate",
            headerName: "IT Declaration submit date",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "poiDate",
            headerName: "Proof of Investment Submit Date",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "totalInvestedAmt",
            headerName: "Total Invested Amount(A)",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "salaryIncome",
            headerName: "Income from Salary(B)",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "otherIncome",
            headerName: "Income from Other Source(C)",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "netIncome",
            headerName: "Net Income(B+C)",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "taxableInc",
            headerName: "Net Taxable Income(D-A)",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "totalTaxPayable",
            headerName: "Total Tax Payable(as per slab)",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "itdeclaration",
            headerName: "IT Declaration",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
    
        },
        {
            field: "poiDeclaration",
            headerName: "Poof of Investment Declaration",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
    
        },
    ]
    
    const rows = [
        {id:1, financialYear:'2024-2025', status:'Open',submitDate:'--', poiDate:'--', totalInvestedAmt:'0',salaryIncome:'0', otherIncome:'0', netIncome:'0', taxableInc:'0', totalTaxPayable:'0', itdeclaration:'Not Initiated', poiDeclaration:'Not Initiated'},
        {id:2, financialYear:'2023-2024', status:'Open',submitDate:'28-03-2024', poiDate:'--', totalInvestedAmt:'65200',salaryIncome:'1055871', otherIncome:'0', netIncome:'1055871', taxableInc:'990671', totalTaxPayable:'115059', itdeclaration:'Draft', poiDeclaration:'Not Initiated'}
    ]
    return (
        <div>
            <Card>
                <CardContent>
                    <PageTitle name="Employee IT Declaration and Proof of Investment Details"/>
                    <Grid container sx={{mt:2}}>
                        <Grid item>
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
                    </Grid>

                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'center', width:'100%'}} gap={2}>
                            <Button variant="outlined" size="small" sx={{borderRadius:"4px"}} disabled={toggleRadio.itdeclaration === 'Not Initiated' ? false : true} onClick={handleITDeclarationPage}>Submit IT Declaration</Button>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}} disabled>Submit Proof of Investment</Button>
                            <Button variant="outlined" size="small" sx={{borderRadius:"4px"}} disabled={toggleRadio.itdeclaration === 'Draft' ? false : true} onClick = {handleITDeclarationPage}>View IT Declaration</Button>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}} disabled>View Proof of Investment</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Table
