import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SaveIcon from '@mui/icons-material/Save';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {
    Autocomplete,
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    TextField
} from "@mui/material";
import Button from '@mui/material/Button';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from 'formik';
import React, { useState } from 'react';
import SearchTable from "../../components/SearchTable";
import { H3 } from "../../components/Typography";
const JoiningDetails = ({ formData, setFormData, prevData, onButtonClick }) => {
    const formik = useFormik({
        initialValues: {
            apcosId: prevData?.formik ? prevData?.formik.apcosId : '',
            //  fatherName: prevData?.formik ? prevData?.formik.fatherName : '',
            //  motherName: prevData?.formik ? prevData?.formik.motherName : '',
            aadharDoc: prevData?.formik ? prevData?.formik.aadharDoc : '',
            panDoc: prevData?.formik ? prevData?.formik.panDoc : '',
            casteDoc: prevData?.formik ? prevData?.formik.casteDoc : '',
            pwdDoc: prevData?.formik ? prevData?.formik.pwdDoc : '',
            casteDocName: prevData?.formik ? prevData?.formik.casteDocName : '',
            aadharDocName: prevData?.formik ? prevData?.formik.aadharDocName : '',
            panDocName: prevData?.formik ? prevData?.formik.panDocName : '',
            pwdDocName: prevData?.formik ? prevData?.formik.pwdDocName : '',
            dob: prevData?.formik ? prevData?.formik.dob : '',
            age: prevData?.formik ? prevData?.formik.age : '',
            Gender: prevData?.formik ? prevData?.formik.Gender : '',
            identificationMarks: prevData?.formik ? prevData?.formik.identificationMarks : '',
            identificationMarks2: prevData?.formik ? prevData?.formik.identificationMarks2 : '',
            caste: prevData?.formik ? prevData?.formik.caste : '',
            subcaste: prevData?.formik ? prevData?.formik.subcaste : null,
            nationality: prevData?.formik ? prevData?.formik.nationality : "",
            religion: prevData?.formik ? prevData?.formik.religion : "",
            maritalStatus: prevData?.formik ? prevData?.formik.maritalStatus : "",
            presentAddress: '',
            permanentAddress: '',
                      emergencyContact: prevData?.formik ? prevData?.formik.emergencyContact : '',
            personalemail: prevData?.formik ? prevData?.formik.personalemail : '',
            houseNumberCard: prevData?.formik ? prevData?.formik.houseNumberCard : '',
            streetCard: prevData?.formik ? prevData?.formik.streetCard : '',
            stateId: prevData?.formik ? prevData?.formik.stateId : '',
            mandalId: prevData?.formik ? prevData?.formik.mandalId : '',
            distId: prevData?.formik ? prevData?.formik.distId : '',
            villageId: prevData?.formik ? prevData?.formik.villageId : '',
            // countryId: 'India',
            isCommAddrsSame: prevData?.formik ? prevData?.formik.isCommAddrsSame : false,
            houseNumberComm: prevData?.formik ? prevData?.formik.houseNumberComm : '',
            streetcomm: prevData?.formik ? prevData?.formik.streetcomm : '',
            distIdcommunication: prevData?.formik ? prevData?.formik.distIdcommunication : '',
            stateIdcommunication: prevData?.formik ? prevData?.formik.stateIdcommunication : '',
            mandalIdcommunication: prevData?.formik ? prevData?.formik.mandalIdcommunication : '',
            villageIdcommunication: prevData?.formik ? prevData?.formik.villageIdcommunication : '',
            pincodeCard: prevData?.formik ? prevData?.formik.pincodeCard : '',
            pincodecomm: prevData?.formik ? prevData?.formik.pincodecomm : '',
            label: '',
            physicallyHandicapped: prevData?.formik ? prevData?.formik.physicallyHandicapped : 'false',
            disabilityPercentage: prevData?.formik ? prevData?.formik.disabilityPercentage : '',
            disabilitype: prevData?.formik ? prevData?.formik.disabilitype : "",
            otp: '',
            aadharPath: prevData?.formik ? prevData?.formik.aadharPath : "",
            panPath: prevData?.formik ? prevData?.formik.panPath : "",
            castePath: prevData?.formik ? prevData?.formik.castePath : "",
            pwdPath: prevData?.formik ? prevData?.formik.pwdPath : "",
            imagePath: prevData?.formik ? prevData?.formik.imagePath : "",
            // Add initial values for other fields
        }
    });
    const [genderList, setGenderList] = useState([]);
    const columns = [
        {
            field: "id",
            headerClassName: "super-app-theme--header",
            headerName: "Sr No.",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            hide: true
        },
        {
            width: 250,
            headerName: "Appointment Order No.",
            field: "name",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Appointment Order Date",
            field: "relation",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Joining/Charge Taken Date",
            field: "fdob",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Service Type",
            field: "gender",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Joining Office",
            field: "mobileNo",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            field: "actiondelete",
            headerName: "Pay Revision",
            width: 140,
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Basic Pay",
            field: "mobileNo",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            field: "actiondelete",
            headerName: "Action",
            width: 140,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => {
                return (
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ mb: 1 }}
                        value={params.value}
                        //onClick={() => handleDeleteRow(params.row.id)}
                    >
                        Delete
                    </Button>
                );
            },
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
    ];
    return (
    <Card>
        <CardContent>
        <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                <WorkOutlineIcon sx={{ fontSize: "25px", color: '#246cb5' }} />
                <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Joining Details</H3>
              </div>
        <Divider />
                                        <Divider />
                                        <Grid
                                            container
                                            direction="row"
                                            rowSpacing={0}
                                            columnSpacing={2}
                                            justify="flex-end"
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >   
                                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <TextField 
                                                            label="Appointment Order No"
                                                            required
                                                            fullWidth
                                                            size="small"
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                            error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                        />
                                            </Grid>   
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="Gender"
                                                    name="Gender"
                                                    options={genderList}
                                                    value={genderList.find(
                                                        (option) => option.id === formik.values.Gender
                                                    ) || null}
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("Gender", null)
                                                        }
                                                        else
                                                            formik.setFieldValue("Gender", value.id)
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2 }}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Is Order Date before 30 Sep,2019"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                            error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                        />
                                                    )}
                                                />
                                    </Grid> 
                                    <Grid item xs={12} sm={2} md={2} lg={2}>
                                    <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                    adapterLocale={"en-gb"}
                                                >
                                                    <DatePicker
                                                        label="Appointment Order Date"
                                                        inputFormat="DD-MM-YYYY"
                                                        id="dob"
                                                        name="dob"
                                                        value={formik.values.dob}
                                                        InputLabelProps={{ shrink: true }}
                                                        onChange={(value) => { if (value === null) { formik.setFieldValue("age", "") }  }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                size="small"
                                                                fullWidth
                                                                margin="normal"
                                                                name="dob"
                                                                required
                                                                {...params}
                                                                error={formik.touched.dob && Boolean(formik.errors.dob)}
                                                                helperText={formik.touched.dob && formik.errors.dob}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                        </Grid>  
                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label=""
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Order issuing office/Authority"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField 
                                                    label="Appointing Authority"
                                                    required
                                                      fullWidth
                                                            size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                    error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                />
                                    </Grid> 
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField 
                                                    label="Source of Appointment"
                                                    required
                                                      fullWidth
                                                            size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                    error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                />
                                    </Grid> 
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Service Type"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                                <LocalizationProvider
                                                                dateAdapter={AdapterDayjs}
                                                                adapterLocale={"en-gb"}
                                                            >
                                                                <DatePicker
                                                                    label="Joining/Charge Taken Date"
                                                                    inputFormat="DD-MM-YYYY"
                                                                    id="dob"
                                                                    name="dob"
                                                                    value={formik.values.dob}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    onChange={(value) => { if (value === null) { formik.setFieldValue("age", "")  } }}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            size="small"
                                                                            fullWidth
                                                                            margin="normal"
                                                                            name="dob"
                                                                            required
                                                                            {...params}
                                                                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                                                                            helperText={formik.touched.dob && formik.errors.dob}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                        />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                    </Grid>  
                                                    <Grid item xs={12} sm={2} md={2} lg={2}>
                                                            <Autocomplete
                                                                    disablePortal
                                                                    margin="normal"
                                                                    size="small"
                                                                    id="Gender"
                                                                    name="Gender"
                                                                    options={genderList}
                                                                    value={genderList.find(
                                                                        (option) => option.id === formik.values.Gender
                                                                    ) || null}
                                                                    onChange={(e, value) => {
                                                                        if (value === null) {
                                                                            formik.setFieldValue("Gender", null)
                                                                        }
                                                                        else
                                                                            formik.setFieldValue("Gender", value.id)
                                                                    }}
                                                                    getOptionLabel={(value) => value.label}
                                                                    sx={{ width: "100%", mt: 2 }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params}
                                                                            label=""
                                                                            required
                                                                            InputLabelProps={{ shrink: true }}
                                                                            onBlur={formik.handleBlur}
                                                                            helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                            error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                                        />
                                                                    )}
                                                                />
                                                    </Grid> 
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Joining Time"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Joining Department"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Joining office"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Joining Cadre"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Joining Designation"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Joining Revision"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                        disablePortal
                                                        margin="normal"
                                                        size="small"
                                                        id="Gender"
                                                        name="Gender"
                                                        options={genderList}
                                                        value={genderList.find(
                                                            (option) => option.id === formik.values.Gender
                                                        ) || null}
                                                        onChange={(e, value) => {
                                                            if (value === null) {
                                                                formik.setFieldValue("Gender", null)
                                                            }
                                                            else
                                                                formik.setFieldValue("Gender", value.id)
                                                        }}
                                                        getOptionLabel={(value) => value.label}
                                                        sx={{ width: "100%", mt: 2 }}
                                                        renderInput={(params) => (
                                                            <TextField {...params}
                                                                label="Pay Scale/Pay Band/Pay Level"
                                                                required
                                                                InputLabelProps={{ shrink: true }}
                                                                onBlur={formik.handleBlur}
                                                                helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                                error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                            />
                                                        )}
                                                    />
                                        </Grid> 
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField 
                                                    label="Grade Pay"
                                                    required
                                                      fullWidth
                                                            size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                    error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                />
                                    </Grid> 
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField 
                                                    label="Basic Pay"
                                                    required
                                                      fullWidth
                                                            size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                    error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                />
                                    </Grid> 
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField 
                                                    label="Remarks"
                                                    rows={3}
                                                    required
                                                      fullWidth
                                                            size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                    error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                />
                                    </Grid> 
                                            </Grid>
                                            <Box display="flex" justifyContent="center" alignItems="center">
                                        <Button
                                            sx={{
                                                minWidth: 100,
                                                ml: 1,
                                                mb:2,
                                                mt: { xs: 1, md: 0 },
                                            }}
                                            variant="contained"
                                           // type="submit"
                                           // disabled={submitDisable}
                                            onClick={() => {
                                               // checkValid();
                                                // setFormData((prevFormData) => ({
                                                //     ...prevFormData,
                                                //     pageone: { formik: formik.values }
                                                // }));
                                            }}
                                        >
                                            ADD&nbsp;
                                            <SaveIcon></SaveIcon>
                                        </Button>
                                    </Box>       
                                            <SearchTable
                                                    columns={columns}
                                                    isCheckbox={false}
                                                    isHideDensity={false}
                                                    isHideExport={false}
                                                    isHideFilter={false}
                                                    isHideColumn={false}
                                                    isHidePaging={true}
                                                   // data={familyDetailsFormik.values.tableRows}
                                                    name="abc"
                                                    id="hjjh"
                                                ></SearchTable>   
            <Box display="flex" justifyContent="center" alignItems="center">
            <Button
                            type="button"
                            sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                            onClick={() => onButtonClick("pageone")}
                            variant="outlined"
                            color="primary"
                        >
                            <KeyboardArrowLeftIcon />&nbsp; PREVIOUS
                        </Button>
                                        <Button
                                            sx={{
                                                minWidth: 100,
                                                ml: 1,
                                                mt: { xs: 1, md: 0 },
                                            }}
                                            variant="contained"
                                            type="submit"
                                           // disabled={submitDisable}
                                            onClick={() => {
                                               // checkValid();
                                                // setFormData((prevFormData) => ({
                                                //     ...prevFormData,
                                                //     pageone: { formik: formik.values }
                                                // }));
                                            }}
                                        >
                                            SUBMIT&nbsp;
                                            <SaveIcon></SaveIcon>
                                        </Button>
                                        <Button
                                            sx={{
                                                minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
                                            }}
                                            variant="outlined"
                                            //type="submit"
//disabled={!showNext}
                                            onClick={() => {
                                                onButtonClick("pagethree")
                                            }
                                            }
                                        >
                                            NEXT &nbsp;
                                            <NavigateNextIcon />
                                        </Button>
                                    </Box>
                                    </CardContent>
    </Card>
  )
}
export default JoiningDetails
