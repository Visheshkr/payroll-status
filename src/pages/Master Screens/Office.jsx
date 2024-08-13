import { Box, Card, CardContent, Grid, TextField, Autocomplete, Button } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import useTitle from '../../hooks/useTitle'
import PageTitle from '../../layouts/PageTitle'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SearchTable from '../../components/SearchTableAlt';
import { useState } from 'react'
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Office = () => {

    useTitle('Office Name');

    const Department = [
        { label: 'The Shawshank Redemption', year: 1994 },
    ]

    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [toggleRadio, setToggleRadio] = useState('99');

    const handleRadioChange = (e) => {
        setToggleRadio(e.target.value);
    }
    const handleToggle = () => {
        setShowTable(!showTable);
    }

    const handleChange= (params) => {
        console.log(params);
    }
    const columns = [
        {
            field: "id",
            headerName: "Sr No.",
            flex: 0.1,
            minWidth: 80,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "offcLevel",
            headerName: "Office Level",
            flex: 0.1,
            minWidth: 120,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "expOffcId",
            headerName: "Exported Office ID",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "offcName",
            headerName: "Office Name (English)",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "address",
            headerName: "Address",
            flex: 0.1,
            minWidth: 450,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "dept",
            headerName: "Department",
            flex: 0.1,
            minWidth: 200,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "appointingAuthority",
            headerName: "Is Appointing Authority",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "cadreControllingAuthority",
            headerName: "Is Cadre Controlling Authority",
            flex: 0.1,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        
        {
            field: "action",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            flex: 0.1,
            minWidth: 250,
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
    ]

    const responseData = [
        {id:1, offcLevel:'level-I', expOffcId:35, offcName:'Information & Public Relation Department', address:'Soochna Bhawan Bailey Road,PATNA,PATNA,PATNA ,PATNA SADAR,Bihar', dept:'Information and Public Relation Department', appointingAuthority:true, cadreControllingAuthority:' '}
    ]

    const handleShowOfficeList = () => {
        setShowForm(!showForm);
    }

    console.log(toggleRadio);
    return (
        <div>
            <Card>
                <CardContent>
                    <PageTitle name="Office List"/>

                    {/* <Box component='form' noValidate onSubmit={formik.handleSubmit}>
                    </Box> */}
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Autocomplete
                                disablePortal
                                margin="normal"
                                fullWidth
                                size="small"
                                options={Department}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Department"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Autocomplete
                                disablePortal
                                margin="normal"
                                fullWidth
                                size="small"
                                options={Department}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Office Type"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Autocomplete
                                disablePortal
                                margin="normal"
                                fullWidth
                                size="small"
                                options={Department}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Monitoring By"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Autocomplete
                                disablePortal
                                margin="normal"
                                fullWidth
                                size="small"
                                options={Department}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Operational/Non-Operational"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <TextField fullWidth label="Office Name" size="small"/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Is CFMS" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Is Appointing Authority" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Is Cadre Controlling Authority" />
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'center', width:'100%'}} gap={2}>
                            <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Reset</Button>
                            <Button variant="contained" size="small" sx={{borderRadius:"4px"}} onClick={handleToggle}>Search</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Grid container  width="100%" sx={{mt:2}}>
                <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}}>
                    <Button variant="contained" size="small" sx={{borderRadius:"4px"}} onClick={handleShowOfficeList}>Add Office List</Button>
                </Grid>
            </Grid>
            {showTable && 
                <Card>
                    <CardContent>
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
            }
            {showForm && (
                <Card>
                    <CardContent>
                        <Alert severity="warning">Note : Newly created office will be non-cfms.</Alert>
                        <Grid sx={{mt:2}}>
                            <PageTitle name="Add Office"/>
                            <Grid container columnSpacing={3} sx={{mt:2}}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Is CFMS Office" />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Is Appointing Authority" />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Is Cadre Controlling Authority" />
                                    </FormGroup>
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
                                            <FormControlLabel value="99" control={<Radio />} label="Operational" />
                                            <FormControlLabel value="100" control={<Radio />} label="Non-Operational" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Office Type "
                                            />
                                        )}
                                    />
                                </Grid>
                                {toggleRadio === '99' && (
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
                                        <TextField fullWidth label="Office Code" size="small"/>
                                    </Grid>
                                )}
                                
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Office Name In English" size="small"/>
                                </Grid>
                            
                            
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Office Name In Hindi" size="small"/>
                                </Grid>
                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Office Phone No." size="small"/>
                                </Grid>
                                )}
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Department"
                                            />
                                        )}
                                    />
                                </Grid>

                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Reporting Office/ CFMS Office "
                                            />
                                        )}
                                    />
                                </Grid>
                                )}
                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Paybill Office"
                                            />
                                        )}
                                    />
                                </Grid>
                                )}

                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Is office belongs to city eligible for higher rate transport allowance"
                                            />
                                        )}
                                    />
                                </Grid>
                                )}

                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Office Tier for HRA"
                                            />
                                        )}
                                    />
                                </Grid>
                                )}
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Monitoring By"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid sx={{mt:2}}>
                            <PageTitle name="Address"/>
                            <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Address 1" size="small"/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="State"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Division "
                                            />
                                        )}
                                    />
                                </Grid>
                            
                            
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="District"
                                            />
                                        )}
                                    />
                                </Grid>
                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Block"
                                            />
                                        )}
                                    />
                                </Grid>
                                )}

                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <Autocomplete
                                        disablePortal
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        options={Department}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Sub-Division"
                                            />
                                        )}
                                    />
                                </Grid>
                                )}

                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Pin Code" size="small"/>
                                </Grid>
                                )}
                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Mobile No." size="small"/>
                                </Grid>
                                )}
                                {toggleRadio === '99' && (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Email" size="small"/>
                                </Grid>
                                )}

                            
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Letter No" size="small"/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale={"en-gb"}
                                    >
                                        <DatePicker
                                            label="Letter Date"
                                            format="DD/MM/YYYY"
                                            // minDate={tomorrow}
                                            fullWidth
                                            // value={formik.values?.effectiveTo}
                                            // onChange={(value) =>
                                            // formik.setFieldValue("effectiveTo", Date.parse(value))
                                            // }
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
                                    <TextField fullWidth label="Remarks" multiline maxRows={4} size="small"/>
                                </Grid>
                            </Grid>

                            
                        </Grid>
                        <Grid sx={{mt:2}}>
                            <PageTitle name="Other Details"/>
                            <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Bank Account Number" size="small"/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="IFSC Code" size="small"/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="Office Tan" size="small"/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <TextField fullWidth label="NSDL DDO Code" size="small"/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container  width="100%" sx={{mt:2}}>
                            <Grid item sx={{display:'flex',justifyContent:'center', width:'100%'}} gap={2}>
                                <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Reset</Button>
                                <Button variant="contained" size="small" sx={{borderRadius:"4px"}}>Save Record</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </div>
  )
}

export default Office
