import { Card, CardContent, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import PageTitle from '../../layouts/PageTitle'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TaxComponent from './taxComponents/TaxComponent'

const DeclarationForm = () => {
    useTitle('Employee IT Declaration and Proof of Investment Details')
    const location = useLocation();

    const data = location?.state
    console.log(data.itdeclaration);

    const section16= "Section16";
    const section16Note = "Note: The maximum limit for this section is 5000";
    const section80CCD= "Section80CCD";
    const section80CCDNote = "Note: The maximum limit for this section is 15000";
    const section80D= "Section80D";
    const section80DNote = "Note: The maximum limit for this section is 25000";
    const Section16Dropdown = [
        { label: 'Entertaiment Allowance', id: 1 },
    ]
    const Section80CCDDropdown = [
        { label: 'Atal Pension Yojna and National Pension Scheme Contribution', id: 1 },
    ]
    const Section80DDropdown = [
        { label: 'Medical Treatment of a Dependent with Severe Disability less than 80', id: 1 },
        { label: 'Medical Treatment of a Dependent with Severe Disability 80 or more', id: 2 },
    ]
    const Section80DDBDropdown = [
        { label: 'Medical expenditure for treatment of Specified Diseases for individuals', id: 1 },
        { label: 'Medical expenditure for treatment of Specified Diseases for Senior Citizens', id: 2 },
    ]

    const [IncomeTaxDataSec16, setIncomeTaxDataSec16] = useState('')
    const [IncomeTaxDataSec80CCD, setIncomeTaxDataSec80CCD] = useState('')
    const [IncomeTaxDataSec80D, setIncomeTaxDataSec80] = useState('')

    const [toggleRadio, setToggleRadio] = useState('99');

    const handleRadioChange = (e) => {
        setToggleRadio(e.target.value);
    }

    console.log(toggleRadio);
    // console.log(IncomeTaxDataSec80CCD)
    console.log(IncomeTaxDataSec80D);

    const dataFromAPI = [
        {id: 1, dropdown:{id:1, label:'Medical Treatment'}, limit:'25000'},
        {id: 2, dropdown:{id:2, label:'Medical Treatment AbcD'}, limit:'15000'},
    ]
    const dataFromAPI2 = [
        {id: 1, dropdown:{id:1, label:'House Rent Treatment'}, limit:'35000'},
        {id: 2, dropdown:{id:2, label:'Car Rent Treatment AbcD'}, limit:'10000'},
    ]
    const viewOnly = data?.itdeclaration === 'Draft' ? true : false;
    return (
        <div>
            <Card>
                <CardContent>
                    <PageTitle name="Employee Personal Information"/>
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="Employee ID" 
                                size="small" 
                                fullWidth
                                // name="secName"
                                // value={formik.values.secName}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // error={formik.touched.secName && !!formik.errors.secName}
                                // helperText={formik.touched.secName && formik.errors.secName}
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="Employee Name" 
                                size="small" 
                                fullWidth
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="Service Type" 
                                size="small" 
                                fullWidth
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="GPF/Pran No " 
                                size="small" 
                                fullWidth
                                
                            />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="Current Department" 
                                size="small" 
                                fullWidth
                                // name="secName"
                                // value={formik.values.secName}
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // error={formik.touched.secName && !!formik.errors.secName}
                                // helperText={formik.touched.secName && formik.errors.secName}
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="Current office" 
                                size="small" 
                                fullWidth
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="Current Designation" 
                                size="small" 
                                fullWidth
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField
                                label="GenderMale"  
                                size="small" 
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <PageTitle name="Pay Detail"/>
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Pay Level"  
                                size="small" 
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Basic Pay"  
                                size="small" 
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Net Earning (Monthly)"  
                                size="small" 
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Net Earning (Annualy)"  
                                size="small" 
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Govt. Quarter Occupied"  
                                size="small" 
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={toggleRadio}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value='99' control={<Radio />} label="New Regime"/>
                                    <FormControlLabel value="100" control={<Radio />} label="Old Regime"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Card>
                        <CardContent>
                            <Grid item sx={{margin:'8px 0'}}>
                                <TaxComponent options={Section16Dropdown} name={section16} note={section16Note} data={IncomeTaxDataSec16} setData={setIncomeTaxDataSec16} viewOnly ={viewOnly} apiData={dataFromAPI2}/>
                            </Grid>
                            {toggleRadio === '99' && (
                                <Grid item sx={{margin:'8px 0'}}>
                                    <TaxComponent options={Section80CCDDropdown} name={section80CCD} note={section80CCDNote} data={IncomeTaxDataSec80CCD} setData={setIncomeTaxDataSec80CCD} viewOnly ={viewOnly} apiData= {dataFromAPI}/>
                                </Grid>
                            )}
                            <Grid item sx={{margin:'8px 0'}}>
                                <TaxComponent options={Section80DDropdown} name={section80D} note={section80DNote} data={IncomeTaxDataSec80D} setData={setIncomeTaxDataSec80} viewOnly ={viewOnly}/>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card>
                        <CardContent>
                            <Grid container sx={{display:'flex', justifyContent:'space-between'}}>
                                <Grid>Annual Income</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    1055871
                                </Grid>
                            </Grid>
                            <Grid container sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                                <Grid>Income from Other Source</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    0
                                </Grid>
                            </Grid>
                            <Grid container sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                                <Grid>Total Income</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    1055871
                                </Grid>
                            </Grid>
                            <Grid container sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                                <Grid>Total Invested Amount</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    127766
                                </Grid>
                            </Grid>
                            <Grid container sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                                <Grid>Net Taxable Income</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    928105
                                </Grid>
                            </Grid>
                            <Grid container sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                                <Grid>Previous Tax Liability</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    12500
                                </Grid>
                            </Grid>
                            <Grid container sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                                <Grid>Cess Calulated Salary</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    3925
                                </Grid>
                            </Grid>
                            <Grid container sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                                <Grid>Net Tax Payable</Grid>
                                <Grid sx={{fontWeight:'bold'}}>
                                    102046
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default DeclarationForm
