import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PersonIcon from '@mui/icons-material/Person';
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useFormik } from 'formik';
import Cookies from "js-cookie";
import React, { useState } from 'react';
import { H3 } from "../../components/Typography";
import ContactsIcon from '@mui/icons-material/Contacts';
import * as Yup from 'yup';
const AddressDetails = ({ formData, setFormData, prevData, onButtonClick }) => {
  const validationSchema = Yup.object().shape({
    // Name: Yup
    // .string("Enter a valid Name")
    // .required("Name is required")
    // .nullable(),
    // Name: Yup
    // .string().matches(/^[A-Za-z]+$/, "Only Alphabetical characters are allowed in the Name")
    // .required("Name is required")
    // .nullable(),
    employeeType: Yup.string().required("Employee Type is required"),
    employeeid: Yup.string().required('Employee ID is required'),
    // apcosId: Yup.string().required('Apcos Id is required'),
    dob: Yup.string()
        .required("Date of Birth is required")
        .nullable(),
    // id: Yup.string().required('id is required'),
    Gender: Yup.string().required("Gender is required").nullable(),
    identificationMarks: Yup.string()
        .matches(
            /^[a-zA-Z\s]+$/,
            "Only Alphabetical characters are allowed in the Name"
        )
        .required("Identification Marks is required")
        .min(5, "Identification Mark must contain at least 5 characters"),
    identificationMarks2: Yup.string()
        .matches(
            /^[a-zA-Z\s]+$/,
            "Only Alphabetical characters are allowed in the Name"
        )
        .required("Identification Marks is required")
        .min(5, "Identification Mark must contain at least 5 characters"),
    // subCaste: Yup.string().required('Sub Caste is required'),
    houseNumberCard: Yup.string().required('House Number is required'),
    streetCard: Yup.string().required('Street is required'),
    pincodeCard: Yup.string("Enter a valid Pincode").required("Pincode is required").matches(/^[0-9]+$/, "Invalid Pincode").min(6, "Pincode must have 6 digits").max(6, "Pincode must not exceed 6 digits").nullable(),
    houseNumberComm: Yup.string().required('House Number is required'),
    streetcomm: Yup.string().required('Street is required'),
    pincodecomm: Yup.string("Enter a valid Pincode").required("Pincode is required").matches(/^[0-9]+$/, "Invalid Pincode").min(6, "Pincode must have 6 digits").max(6, "Pincode must not exceed 6 digits").nullable(),
    contactNumber: Yup.string("Enter a valid Contact Number")
        .matches(/^[0-9]+$/, "Invalid Contact number")
        .required("Mobile Number is required")
        .min(10, "Mobile Number Must be 10 digits")
        .max(10, "Mobile Number must not exceed 10 digits")
        .nullable(),
    emergencyContact: Yup.string("Enter a valid Contact Number")
        .matches(/^[0-9]+$/, "Invalid Emergency Mobile number")
        .required("Mobile Number is required")
        .min(10, "Mobile Number Must be 10 digits")
        .max(10, "Mobile Number must not exceed 10 digits")
        .nullable(),
    emailid: Yup.string()
        .email("Enter a valid email address")
        .required("Email ID is required"),
    personalemail: Yup.string()
        .email("Enter a valid email address")
        .required("Personal Email ID is required"),
    Aadhaar: Yup.string()
        .matches(/^\d{12}$/, "Enter a valid Aadhaar number")
        .required('Aadhaar Card is required'),
    pancard: Yup.string()
        .matches(/^[A-Z]{5}\d{4}[A-Z]$/, 'Enter a valid PAN number')
        .required('PAN number is required'),
    physicallyHandicapped: Yup.string().required("Physically Handicapped is required").nullable(),
    disabilityPercentage: Yup.string().when("physicallyHandicapped", {
        is: (value) => value === "true",
        then: Yup.string()
            .matches(/^[0-9]+$/, "Invalid Percentage")
            .required("Disability Percentage is required")
            .nullable(),
    }),
    disabilitype: Yup.string()
        .when("physicallyHandicapped", {
            is: (value) => value === "true",
            then: Yup.string().required("Disability Type is required").nullable(),
        })
        .nullable(),
    caste: Yup.string().required('Caste is required').nullable(),
    subcaste: Yup.string()
        .when("caste", {
            is: (value) => value === 67,
            then: Yup.object().required("SubCaste is required").nullable()
        }).nullable(),
    nationality: Yup.string().required('Nationality is required').nullable(),
    religion: Yup.string().required('Religion is required').nullable(),
    maritalStatus: Yup.string().required('Marital Status is required').nullable(),
    stateId: Yup.object().required('State is required').nullable(),
    distId: Yup.object().required('District is required').nullable(),
    // mandalId: Yup.object().required('Mandal is required').nullable(),
    // villageId: Yup.object().required('Village is required').nullable(),
    stateIdcommunication: Yup.object().required('State is required').nullable(),
    distIdcommunication: Yup.object().required('District is required').nullable(),
    // mandalIdcommunication: Yup.object().required('Mandal is required').nullable(),
    // villageIdcommunication: Yup.object().required('Village is required').nullable(),
    // Add validation for other fields
});
  const formik = useFormik({
    initialValues: {
        Name: prevData?.formik ? prevData?.formik.Name : '',
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
        contactNumber: prevData?.formik ? prevData?.formik.contactNumber : '',
        emergencyContact: prevData?.formik ? prevData?.formik.emergencyContact : '',
        emailid: prevData?.formik ? prevData?.formik.emailid : '',
        personalemail: prevData?.formik ? prevData?.formik.personalemail : '',
        Aadhaar: prevData?.formik ? prevData?.formik.Aadhaar : '',
        pancard: prevData?.formik ? prevData?.formik.pancard :'',
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
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        // Handle form submission or API integration here
        setFormData((prevFormData) => ({
            ...prevFormData,
            pageone: { formik: formik.values}
        }));
    },
});
const CardTitle = styled((props) => (
  <Typography component="span" {...props} />
))(() => ({
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
}));
const [mandalList, setMandalList] = useState([]);
const [mandaloneList, setMandaloneList] = useState([]);
const [stateList, setstateList] = useState([]);
const [stateonelist, setstateoneList] = useState([]);
const [districtList, setDistrictList] = useState([]);
const [districtoneList, setDistrictoneList] = useState([]);
const [isReadable, setIsReadable] = useState(false);
const [checked, setChecked] = React.useState(false);
const [disableoption, setDisableoption] = useState(false);
const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
const [isMandalDisabled, setIsMandalDisabled] = useState(true);
const [isVillageDisabled, setIsVillageDisabled] = useState(true);
    const [villageList, setVillageList] = useState([]);
    const [villageoneList, setVillageoneList] = useState([]);
    const copyAddress = (e) => {
      setChecked(e.target.checked);
      formik.setFieldValue("isCommAddrsSame", e.target.checked);
      console.log("the chekced value", checked);
      console.log("the chekced value", e.target.checked);
      if (e.target.checked) {
          formik.setFieldValue("houseNumberComm", formik.values.houseNumberCard);
          formik.setFieldValue("streetcomm", formik.values.streetCard);
          formik.setFieldValue("stateIdcommunication", formik.values.stateId);
          formik.setFieldValue("mandalIdcommunication", formik.values.mandalId);
          formik.setFieldValue("villageIdcommunication", formik.values.villageId);
          formik.setFieldValue("distIdcommunication", formik.values.distId);
          formik.setFieldValue("pincodecomm", formik.values.pincodeCard);
          setDisableoption(true);
      } else {
          // setDistrictoneList(districtList)
          // setMandaloneList(mandalList)
          // setVillageoneList(villageList)
          formik.setFieldValue("houseNumberComm", "");
          formik.setFieldValue("streetcomm", "");
          formik.setFieldValue("stateIdcommunication", "");
          formik.setFieldValue("mandalIdcommunication", "");
          formik.setFieldValue("villageIdcommunication", "");
          formik.setFieldValue("distIdcommunication", "");
          formik.setFieldValue("pincodecomm", "");
          setDisableoption(false);
      }
  };
  return (
    <div>
            <Card sx={{ margin: 0, boxShadow: "none" }}>
        
                                        <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                <ContactsIcon sx={{ fontSize: "25px", color: '#246cb5' }} />
                <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Address Details</H3>
              </div>
        <Divider />
                                            <Grid container direction="row" rowSpacing={0} columnSpacing={2}>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    {/* <H4 lineHeight={3.2}>Card Address</H4> */}
                                                    <Card sx={{ height: "460px", border: "1px solid black" }}>
                                                        <CardHeader
                                                            title={
                                                                <CardTitle>
                                                                    <AccountCircleTwoToneIcon sx={{ mr: 1 }} />
                                                                    Present Address
                                                                </CardTitle>
                                                            }
                                                        />
                                                        <Divider />
                                                        <CardContent>
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                rowSpacing={0}
                                                                columnSpacing={2}
                                                            >
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <TextField
                                                                        margin="normal"
                                                                        required
                                                                        fullWidth
                                                                        id="houseNumberCard"
                                                                        label="House No./Building Name"
                                                                        name="houseNumberCard"
                                                                        value={formik.values.houseNumberCard}
                                                                        autoComplete="email"
                                                                        size="small"
                                                                        InputLabelProps={{ shrink: true }}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={
                                                                            formik.touched.houseNumberCard &&
                                                                            Boolean(formik.errors.houseNumberCard)
                                                                        }
                                                                        helperText={
                                                                            formik.touched.houseNumberCard &&
                                                                            formik.errors.houseNumberCard
                                                                        }
                                                                    // disabled={isDisabled}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={8} md={8} lg={6}>
                                                                    <TextField
                                                                        margin="normal"
                                                                        required
                                                                        fullWidth
                                                                        id="streetCard"
                                                                        label="Street"
                                                                        name="streetCard"
                                                                        value={formik.values.streetCard}
                                                                        autoComplete="email"
                                                                        size="small"
                                                                        InputLabelProps={{ shrink: true }}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={
                                                                            formik.touched.streetCard &&
                                                                            Boolean(formik.errors.streetCard)
                                                                        }
                                                                        helperText={
                                                                            formik.touched.streetCard && formik.errors.streetCard
                                                                        }
                                                                    // disabled={isDisabled}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <FormControl fullWidth >
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            margin="normal"
                                                                            size="small"
                                                                            fullWidth
                                                                            id="stateId"
                                                                            name="stateId"
                                                                            options={stateList}
                                                                            disabled={isReadable}
                                                                            value={stateList.find(
                                                                                (option) => option.stateId === formik.values.stateId?.stateId
                                                                            ) || null}
                                                                            onChange={(e, value) => {
                                                                                if (value === null) {
                                                                                    formik.setFieldValue("stateId", null)
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue("stateId", value)
                                                                                    axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getDistrictList/${value.stateId}`, {
                                                                                        headers: {
                                                                                            Authorization: `Bearer ${Cookies.get("token")}`
                                                                                        }
                                                                                    }).then(response => {
                                                                                        let sortedDistrictData = response.data.result.map((value) => {
                                                                                            value.districtName = value.districtName.toUpperCase();
                                                                                            return value;
                                                                                        })
                                                                                        sortedDistrictData = sortedDistrictData.sort((a, b) => a.districtName.localeCompare(b.districtName));
                                                                                        setIsDistrictDisabled(false);
                                                                                        setDistrictList(sortedDistrictData);
                                                                                        console.log(sortedDistrictData);
                                                                                    })
                                                                                        .catch(error => {
                                                                                            setDistrictList([]);
                                                                                            console.log(error);
                                                                                        });
                                                                                }
                                                                            }}
                                                                            getOptionLabel={(value) => value.stateName}
                                                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    required
                                                                                    {...params}
                                                                                    label="State Name"
                                                                                    name="stateId"
                                                                                    InputLabelProps={{ shrink: true }}
                                                                                    onBlur={formik.handleBlur}
                                                                                    helperText={formik.errors.stateId && formik.touched.stateId ? formik.errors.stateId : null}
                                                                                    error={formik.errors.stateId && formik.touched.stateId ? true : false}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <FormControl fullWidth >
                                                                        <Tooltip title={isDistrictDisabled ? "Please select state first" : ""} arrow>
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                margin="normal"
                                                                                size="small"
                                                                                id="distId"
                                                                                name="distId"
                                                                                required
                                                                                options={districtList}
                                                                                value={districtList.find((option) => option.distId === formik.values.distId?.distId) || null}
                                                                                onChange={(e, value) => {
                                                                                    if (value === null) {
                                                                                        formik.setFieldValue("distId", null);
                                                                                    } else {
                                                                                        formik.setFieldValue("distId", value)
                                                                                        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getMandalList/${value.distId}`, {
                                                                                            headers: {
                                                                                                Authorization: `Bearer ${Cookies.get("token")}`
                                                                                            }
                                                                                        }).then(response => {
                                                                                            let sortedMandalData = response.data.result.map((value) => {
                                                                                                value.mandalName = value.mandalName.toUpperCase();
                                                                                                return value;
                                                                                            })
                                                                                            sortedMandalData = sortedMandalData.sort((a, b) => a.mandalName.localeCompare(b.mandalName));
                                                                                            setIsDistrictDisabled(false);
                                                                                            setMandalList(sortedMandalData);
                                                                                            console.log(sortedMandalData);
                                                                                        })
                                                                                            .catch(error => {
                                                                                                setDistrictList([]);
                                                                                                console.log(error);
                                                                                            });
                                                                                    }
                                                                                }}
                                                                                getOptionLabel={(value) => value.districtName}
                                                                                sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        required
                                                                                        {...params}
                                                                                        label="District Name"
                                                                                        name="distId"
                                                                                        InputLabelProps={{ shrink: true }}
                                                                                        onBlur={formik.handleBlur}
                                                                                        helperText={formik.errors.distId && formik.touched.distId ? formik.errors.distId : null}
                                                                                        error={formik.errors.distId && formik.touched.distId ? true : false}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Tooltip>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <Tooltip title={isMandalDisabled ? "Please select district first" : ""} arrow>
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            margin="normal"
                                                                            size="small"
                                                                            fullWidth
                                                                            id="mandalId"
                                                                            name="mandalId"
                                                                            options={mandalList}
                                                                            value={mandalList.find(
                                                                                (option) => option.mandalId === formik.values.mandalId?.mandalId) || null}
                                                                            onChange={(e, value) => {
                                                                                if (value === null) {
                                                                                    formik.setFieldValue("mandalId", null)
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue("mandalId", value);
                                                                                    axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getVillageList/${value.mandalId}`, {
                                                                                        headers: {
                                                                                            Authorization: `Bearer ${Cookies.get("token")}`
                                                                                        }
                                                                                    }).then(response => {
                                                                                        let sortedVillageData = response.data.result.map((value) => {
                                                                                            value.villageName = value.villageName.toUpperCase();
                                                                                            return value;
                                                                                        })
                                                                                        sortedVillageData = sortedVillageData.sort((a, b) => a.villageName.localeCompare(b.villageName));
                                                                                        setIsVillageDisabled(false);
                                                                                        setVillageList(sortedVillageData);
                                                                                        console.log(sortedVillageData);
                                                                                    })
                                                                                        .catch(error => {
                                                                                            setVillageList([]);
                                                                                            console.log(error);
                                                                                        });
                                                                                }
                                                                            }}
                                                                            getOptionLabel={(value) => value.mandalName}
                                                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                            renderInput={(params) => (
                                                                                <TextField {...params}
                                                                                    label="Mandal Name"
                                                                                    name="mandalId"
                                                                                    InputLabelProps={{ shrink: true }}
                                                                                    onBlur={formik.handleBlur}
                                                                                    helperText={formik.errors.mandalId && formik.touched.mandalId ? formik.errors.mandalId : null}
                                                                                    error={formik.errors.mandalId && formik.touched.mandalId ? true : false}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Tooltip>
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <Tooltip title={isVillageDisabled ? "Please select mandal first" : ""} arrow>
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            fullWidth
                                                                            margin="normal"
                                                                            size="small"
                                                                            id="villageId"
                                                                            name="villageId"
                                                                            options={villageList}
                                                                            value={villageList.find(
                                                                                (option) => option.villageId === formik.values.villageId?.villageId) || null}
                                                                            onChange={(e, value) => {
                                                                                console.log(value);
                                                                                if (value === null) {
                                                                                    formik.setFieldValue("villageId", null)
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue("villageId", value);
                                                                                }
                                                                            }}
                                                                            getOptionLabel={(value) => value.villageName}
                                                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                            renderInput={(params) => (
                                                                                <TextField {...params}
                                                                                    label="Village Name"
                                                                                    id="villageId"
                                                                                    InputLabelProps={{ shrink: true }}
                                                                                    onBlur={formik.handleBlur}
                                                                                    helperText={formik.errors.villageId && formik.touched.villageId ? formik.errors.villageId : null}
                                                                                    error={formik.errors.villageId && formik.touched.villageId ? true : false}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Tooltip>
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                                                        <TextField
                                                                            label="Pincode"
                                                                            size="small"
                                                                            fullWidth
                                                                            required
                                                                            autoComplete="email"
                                                                            placeholder={"999999"}
                                                                            mask={"######"}
                                                                            value={formik.values.pincodeCard || ""}
                                                                            id="pincodeCard"
                                                                            name="pincodeCard"
                                                                            InputLabelProps={{ shrink: true }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            error={
                                                                                formik.touched.pincodeCard &&
                                                                                Boolean(formik.errors.pincodeCard)
                                                                            }
                                                                            helperText={
                                                                                formik.touched.pincodeCard &&
                                                                                formik.errors.pincodeCard
                                                                            }
                                                                        // disabled={isDisabled}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                                    <Card sx={{ border: "1px solid black" }}>
                                                        <CardHeader
                                                            title={
                                                                <CardTitle>
                                                                    <PinDropTwoToneIcon sx={{ mr: 1 }} /> Permanent Address
                                                                </CardTitle>
                                                            }
                                                        />
                                                        <Divider />
                                                        <CardContent>
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                rowSpacing={0}
                                                                columnSpacing={2}
                                                                justify="flex-end"
                                                                alignItems="center"
                                                            >
                                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                    <FormControlLabel
                                                                        sx={{ margin: 0 }}
                                                                        control={
                                                                            <Checkbox
                                                                                value="remember"
                                                                                checked={formik?.values.isCommAddrsSame === true}
                                                                                color="primary"
                                                                            />
                                                                        }
                                                                        label="If Present address and Permanent address are same"
                                                                        onChange={copyAddress}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <TextField
                                                                        margin="normal"
                                                                        required
                                                                        fullWidth
                                                                        id="houseNumberComm"
                                                                        label="House No./Building Name"
                                                                        name="houseNumberComm"
                                                                        value={formik.values.houseNumberComm || ""}
                                                                        size="small"
                                                                        InputLabelProps={{ shrink: true }}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={
                                                                            formik.touched.houseNumberComm &&
                                                                            Boolean(formik.errors.houseNumberComm)
                                                                        }
                                                                        helperText={
                                                                            formik.touched.houseNumberComm &&
                                                                            formik.errors.houseNumberComm
                                                                        }
                                                                        disabled={disableoption}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={8} md={8} lg={6}>
                                                                    <TextField
                                                                        margin="normal"
                                                                        required
                                                                        fullWidth
                                                                        id="streetcomm"
                                                                        label="Street"
                                                                        name="streetcomm"
                                                                        value={formik.values.streetcomm || ""}
                                                                        InputLabelProps={{ shrink: true }}
                                                                        size="small"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        error={
                                                                            formik.touched.streetcomm &&
                                                                            Boolean(formik.errors.streetcomm)
                                                                        }
                                                                        helperText={
                                                                            formik.touched.streetcomm && formik.errors.streetcomm
                                                                        }
                                                                        disabled={disableoption}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <FormControl fullWidth >
                                                                        <Autocomplete
                                                                            disablePortal
                                                                            margin="normal"
                                                                            size="small"
                                                                            fullWidth
                                                                            id="stateIdcommunication"
                                                                            name="stateIdcommunication"
                                                                            options={stateonelist}
                                                                            disabled={isReadable}
                                                                            value={stateonelist.find(
                                                                                (option) => option.stateId === formik.values.stateIdcommunication?.stateId
                                                                            ) || null}
                                                                            onChange={(e, value) => {
                                                                                if (value === null) {
                                                                                    formik.setFieldValue("stateIdcommunication", null)
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue("stateIdcommunication", value)
                                                                                    axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getDistrictList/${value.stateId}`, {
                                                                                        headers: {
                                                                                            Authorization: `Bearer ${Cookies.get("token")}`
                                                                                        }
                                                                                    }).then(response => {
                                                                                        let sortedDistrictData = response.data.result.map((value) => {
                                                                                            value.districtName = value.districtName.toUpperCase();
                                                                                            return value;
                                                                                        })
                                                                                        sortedDistrictData = sortedDistrictData.sort((a, b) => a.districtName.localeCompare(b.districtName));
                                                                                        setIsDistrictDisabled(false);
                                                                                        setDistrictoneList(sortedDistrictData);
                                                                                        console.log(sortedDistrictData);
                                                                                    })
                                                                                        .catch(error => {
                                                                                            setDistrictoneList([]);
                                                                                            console.log(error);
                                                                                        });
                                                                                }
                                                                            }}
                                                                            getOptionLabel={(value) => value.stateName}
                                                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                            renderInput={(params) => (
                                                                                <TextField {...params}
                                                                                    required
                                                                                    label="State Name"
                                                                                    name="stateIdcommunication"
                                                                                    InputLabelProps={{ shrink: true }}
                                                                                    onBlur={formik.handleBlur}
                                                                                    helperText={formik.errors.stateIdcommunication && formik.touched.stateIdcommunication ? formik.errors.stateIdcommunication : null}
                                                                                    error={formik.errors.stateIdcommunication && formik.touched.stateIdcommunication ? true : false}
                                                                                    disabled={disableoption}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                {checked ?
                                                                    <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                        <FormControl fullWidth >
                                                                            <Tooltip title={isDistrictDisabled ? "Please select state first" : ""} arrow>
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    margin="normal"
                                                                                    size="small"
                                                                                    id="distId"
                                                                                    name="distId"
                                                                                    options={districtList}
                                                                                    value={districtList.find((option) => option.distId === formik.values.distId?.distId) || null}
                                                                                    onChange={(e, value) => {
                                                                                        if (value === null) {
                                                                                            formik.setFieldValue("distId", null);
                                                                                        } else {
                                                                                            formik.setFieldValue("distId", value)
                                                                                            axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getMandalList/${value.distId}`, {
                                                                                                headers: {
                                                                                                    Authorization: `Bearer ${Cookies.get("token")}`
                                                                                                }
                                                                                            }).then(response => {
                                                                                                let sortedMandalData = response.data.result.map((value) => {
                                                                                                    value.mandalName = value.mandalName.toUpperCase();
                                                                                                    return value;
                                                                                                })
                                                                                                sortedMandalData = sortedMandalData.sort((a, b) => a.mandalName.localeCompare(b.mandalName));
                                                                                                setIsDistrictDisabled(false);
                                                                                                setMandalList(sortedMandalData);
                                                                                                console.log(sortedMandalData);
                                                                                            })
                                                                                                .catch(error => {
                                                                                                    setDistrictList([]);
                                                                                                    console.log(error);
                                                                                                });
                                                                                        }
                                                                                    }}
                                                                                    getOptionLabel={(value) => value.districtName}
                                                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            required
                                                                                            {...params}
                                                                                            label="District Name"
                                                                                            onBlur={formik.handleBlur}
                                                                                            name="distId"
                                                                                            InputLabelProps={{ shrink: true }}
                                                                                            helperText={formik.errors.distId && formik.touched.distId ? formik.errors.distId : null}
                                                                                            error={formik.errors.distId && formik.touched.distId ? true : false}
                                                                                            disabled={disableoption}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Tooltip>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                        <FormControl fullWidth >
                                                                            <Tooltip title={isDistrictDisabled ? "Please select state first" : ""} arrow>
                                                                                <Autocomplete
                                                                                    disablePortal
                                                                                    margin="normal"
                                                                                    size="small"
                                                                                    id="distIdcommunication"
                                                                                    name="distIdcommunication"
                                                                                    options={districtoneList}
                                                                                    value={districtoneList.find((option) => option.distId === formik.values.distIdcommunication?.distId) || null}
                                                                                    onChange={(e, value) => {
                                                                                        if (value === null) {
                                                                                            formik.setFieldValue("distIdcommunication", null);
                                                                                        } else {
                                                                                            formik.setFieldValue("distIdcommunication", value)
                                                                                            axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getMandalList/${value.distId}`, {
                                                                                                headers: {
                                                                                                    Authorization: `Bearer ${Cookies.get("token")}`
                                                                                                }
                                                                                            }).then(response => {
                                                                                                let sortedMandalData = response.data.result.map((value) => {
                                                                                                    value.mandalName = value.mandalName.toUpperCase();
                                                                                                    return value;
                                                                                                })
                                                                                                sortedMandalData = sortedMandalData.sort((a, b) => a.mandalName.localeCompare(b.mandalName));
                                                                                                setIsDistrictDisabled(false);
                                                                                                setMandaloneList(sortedMandalData);
                                                                                                console.log(sortedMandalData);
                                                                                            })
                                                                                                .catch(error => {
                                                                                                    setMandaloneList([]);
                                                                                                    console.log(error);
                                                                                                });
                                                                                        }
                                                                                    }}
                                                                                    getOptionLabel={(value) => value.districtName}
                                                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            required
                                                                                            {...params}
                                                                                            label="District Name"
                                                                                            name="distIdcommunication"
                                                                                            InputLabelProps={{ shrink: true }}
                                                                                            onBlur={formik.handleBlur}
                                                                                            helperText={formik.errors.distIdcommunication && formik.touched.distIdcommunication ? formik.errors.distIdcommunication : null}
                                                                                            error={formik.errors.distIdcommunication && formik.touched.distIdcommunication ? true : false}
                                                                                            disabled={disableoption}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Tooltip>
                                                                        </FormControl>
                                                                    </Grid>
                                                                }
                                                                {checked ?
                                                                    <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                        <Tooltip title={isMandalDisabled ? "Please select district first" : ""} arrow>
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                margin="normal"
                                                                                size="small"
                                                                                fullWidth
                                                                                id="mandalId"
                                                                                name="mandalId"
                                                                                options={mandalList}
                                                                                value={mandalList.find(
                                                                                    (option) => option.mandalId === formik.values.mandalId?.mandalId) || null}
                                                                                onChange={(e, value) => {
                                                                                    if (value === null) {
                                                                                        formik.setFieldValue("mandalId", null)
                                                                                    }
                                                                                    else {
                                                                                        formik.setFieldValue("mandalId", value);
                                                                                        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getVillageList/${value.mandalId}`, {
                                                                                            headers: {
                                                                                                Authorization: `Bearer ${Cookies.get("token")}`
                                                                                            }
                                                                                        }).then(response => {
                                                                                            let sortedVillageData = response.data.result.map((value) => {
                                                                                                value.villageName = value.villageName.toUpperCase();
                                                                                                return value;
                                                                                            })
                                                                                            sortedVillageData = sortedVillageData.sort((a, b) => a.villageName.localeCompare(b.villageName));
                                                                                            setIsVillageDisabled(false);
                                                                                            setVillageList(sortedVillageData);
                                                                                            console.log(sortedVillageData);
                                                                                        })
                                                                                            .catch(error => {
                                                                                                setVillageList([]);
                                                                                                console.log(error);
                                                                                            });
                                                                                    }
                                                                                }}
                                                                                getOptionLabel={(value) => value.mandalName}
                                                                                sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                                renderInput={(params) => (
                                                                                    <TextField {...params}
                                                                                        label="Mandal Name"
                                                                                        name="mandalId"
                                                                                        InputLabelProps={{ shrink: true }}
                                                                                        onBlur={formik.handleBlur}
                                                                                        helperText={formik.errors.mandalId && formik.touched.mandalId ? formik.errors.mandalId : null}
                                                                                        error={formik.errors.mandalId && formik.touched.mandalId ? true : false}
                                                                                        disabled={disableoption}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Tooltip>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                        <Tooltip title={isMandalDisabled ? "Please select district first" : ""} arrow>
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                margin="normal"
                                                                                size="small"
                                                                                fullWidth
                                                                                id="mandalIdcommunication"
                                                                                name="mandalIdcommunication"
                                                                                options={mandaloneList}
                                                                                value={mandaloneList.find(
                                                                                    (option) => option.mandalId === formik.values.mandalIdcommunication?.mandalId) || null}
                                                                                onChange={(e, value) => {
                                                                                    if (value === null) {
                                                                                        formik.setFieldValue("mandalIdcommunication", null)
                                                                                    }
                                                                                    else {
                                                                                        formik.setFieldValue("mandalIdcommunication", value);
                                                                                        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getVillageList/${value.mandalId}`, {
                                                                                            headers: {
                                                                                                Authorization: `Bearer ${Cookies.get("token")}`
                                                                                            }
                                                                                        }).then(response => {
                                                                                            let sortedVillageData = response.data.result.map((value) => {
                                                                                                value.villageName = value.villageName.toUpperCase();
                                                                                                return value;
                                                                                            })
                                                                                            sortedVillageData = sortedVillageData.sort((a, b) => a.villageName.localeCompare(b.villageName));
                                                                                            setIsVillageDisabled(false);
                                                                                            setVillageoneList(sortedVillageData);
                                                                                            console.log(sortedVillageData);
                                                                                        })
                                                                                            .catch(error => {
                                                                                                setVillageoneList([]);
                                                                                                console.log(error);
                                                                                            });
                                                                                    }
                                                                                }}
                                                                                getOptionLabel={(value) => value.mandalName}
                                                                                sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                                renderInput={(params) => (
                                                                                    <TextField {...params}
                                                                                        label="Mandal Name"
                                                                                        name="mandalIdcommunication"
                                                                                        InputLabelProps={{ shrink: true }}
                                                                                        onBlur={formik.handleBlur}
                                                                                        helperText={formik.errors.mandalIdcommunication && formik.touched.mandalIdcommunication ? formik.errors.mandalIdcommunication : null}
                                                                                        error={formik.errors.mandalIdcommunication && formik.touched.mandalIdcommunication ? true : false}
                                                                                        disabled={disableoption}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Tooltip>
                                                                    </Grid>
                                                                }
                                                                {checked ?
                                                                    <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                        <Tooltip title={isVillageDisabled ? "Please select mandal first" : ""} arrow>
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                fullWidth
                                                                                margin="normal"
                                                                                size="small"
                                                                                id="villageId"
                                                                                name="villageId"
                                                                                options={villageList}
                                                                                value={villageList.find(
                                                                                    (option) => option.villageId === formik.values.villageId?.villageId) || null}
                                                                                onChange={(e, value) => {
                                                                                    console.log(value);
                                                                                    if (value === null) {
                                                                                        formik.setFieldValue("villageId", null)
                                                                                    }
                                                                                    else {
                                                                                        formik.setFieldValue("villageId", value);
                                                                                    }
                                                                                }}
                                                                                getOptionLabel={(value) => value.villageName}
                                                                                sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                                renderInput={(params) => (
                                                                                    <TextField {...params}
                                                                                        label="Village Name"
                                                                                        onBlur={formik.handleBlur}
                                                                                        name="villageId"
                                                                                        InputLabelProps={{ shrink: true }}
                                                                                        helperText={formik.errors.villageId && formik.touched.villageId ? formik.errors.villageId : null}
                                                                                        error={formik.errors.villageId && formik.touched.villageId ? true : false}
                                                                                        disabled={disableoption}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Tooltip>
                                                                    </Grid>
                                                                    :
                                                                    <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                        <Tooltip title={isVillageDisabled ? "Please select mandal first" : ""} arrow>
                                                                            <Autocomplete
                                                                                disablePortal
                                                                                fullWidth
                                                                                margin="normal"
                                                                                size="small"
                                                                                id="villageIdcommunication"
                                                                                name="villageIdcommunication"
                                                                                options={villageoneList}
                                                                                value={villageoneList.find(
                                                                                    (option) => option.villageId === formik.values.villageIdcommunication?.villageId) || null}
                                                                                onChange={(e, value) => {
                                                                                    console.log(value);
                                                                                    if (value === null) {
                                                                                        formik.setFieldValue("villageIdcommunication", null)
                                                                                    }
                                                                                    else {
                                                                                        formik.setFieldValue("villageIdcommunication", value);
                                                                                    }
                                                                                }}
                                                                                getOptionLabel={(value) => value.villageName}
                                                                                sx={{ width: "100%", mt: 2, mb: 1 }}
                                                                                renderInput={(params) => (
                                                                                    <TextField {...params}
                                                                                        label="Village Name"
                                                                                        name="villageIdcommunication"
                                                                                        InputLabelProps={{ shrink: true }}
                                                                                        onBlur={formik.handleBlur}
                                                                                        helperText={formik.errors.villageIdcommunication && formik.touched.villageIdcommunication ? formik.errors.villageIdcommunication : null}
                                                                                        error={formik.errors.villageIdcommunication && formik.touched.villageIdcommunication ? true : false}
                                                                                        disabled={disableoption}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Tooltip>
                                                                    </Grid>
                                                                }
                                                                <Grid item xs={12} sm={4} md={4} lg={6}>
                                                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                                                        <TextField
                                                                            label="Pincode"
                                                                            size="small"
                                                                            fullWidth
                                                                            required
                                                                            placeholder={"999999"}
                                                                            mask={"######"}
                                                                            value={formik.values.pincodecomm || ""}
                                                                            id="pincodecomm"
                                                                            name="pincodecomm"
                                                                            InputLabelProps={{ shrink: true }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            error={
                                                                                formik.touched.pincodecomm &&
                                                                                Boolean(formik.errors.pincodecomm)
                                                                            }
                                                                            helperText={
                                                                                formik.touched.pincodecomm &&
                                                                                formik.errors.pincodecomm
                                                                            }
                                                                            disabled={disableoption}
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                            <Box display="flex" justifyContent="center" alignItems="center">
                                            <Button
                            type="button"
                            sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                            onClick={() => onButtonClick("pagetwo")}
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
                                                onButtonClick("pagetwo")
                                            }
                                            }
                                        >
                                            NEXT &nbsp;
                                            <NavigateNextIcon />
                                        </Button>
                                    </Box>
                                        </Card>
    </div>
  )
}
export default AddressDetails
