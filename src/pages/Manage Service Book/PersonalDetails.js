import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    AlertTitle,
    Box,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    Slide,
    TextField,
    Typography
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from 'axios';
import dayjs from "dayjs";
import { useFormik } from 'formik';
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { H3 } from "../../components/Typography";
import ImageUploadCard from "./ImageUploadCard";
function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}
const styleAlertOpenSave = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};
const useAlertSaveStyles = makeStyles({
    cookieAlert: {
        "& .MuiAlert-icon": {
            fontSize: 40
        }
    }
});
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
const PersonalDetails = ({ formData, setFormData, prevData, onButtonClick }) => {
    const classes = useAlertSaveStyles();
    const user = useSelector((state) => state.loginReducer);
    // console.log(user)
    const [value, setValue] = React.useState(dayjs());
    const [age, setAge] = React.useState(calculateAge(value));
    const [checked, setChecked] = React.useState(false);
    const [disableoption, setDisableoption] = useState(false);
    const [genderList, setGenderList] = useState([]);
    const [relationlist, setRelationList] = useState([]);
    const [religionList, setReligionList] = useState([]);
    const [nationalityList, setNationalityList] = useState([]);
    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const [mandalList, setMandalList] = useState([]);
    const [mandaloneList, setMandaloneList] = useState([]);
    const [stateList, setstateList] = useState([]);
    const [stateonelist, setstateoneList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [districtoneList, setDistrictoneList] = useState([]);
    const [isReadable, setIsReadable] = useState(false);
    const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
    const [expertise, setExpertise] = useState([]);
    const [hasphysicalHand, setHasphysicalHand] = useState("no");
    const [selectedDate, setSelectedDate] = useState(null);
    const [isMandalDisabled, setIsMandalDisabled] = useState(true);
    const [villageList, setVillageList] = useState([]);
    const [villageoneList, setVillageoneList] = useState([]);
    const [casteList, setCasteList] = useState([]);
    const [subcasteList, setSubCasteList] = useState([]);
    const [isVillageDisabled, setIsVillageDisabled] = useState(true);
    const [casteUploadedFile, setCasteUploadedFile] = useState(null)
    const [aadharUploadedFile, setAadharUploadedFile] = useState(null)
    const [panUploadedFile, setPanUploadedFile] = useState(null)
    const [pwdUploadedFile, setPwdUploadedFile] = useState(null)
    // const [imageUploadedFile, setImageUploadedFile] = useState(null)
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState("info");
    const [uplodedImage, setUploadedImage] = useState(null);
    // const [attachmentId,setAttachmentId] = useState()
    const [casteVirtualPath, setCasteVirtualPath] = useState(prevData?.formik?.castePath || '');
    const [aadharVirtualPath, setAadharVirtualPath] = useState(prevData?.formik?.aadharPath || '');
    const [panVirtualPath, setPanVirtualPath] = useState(prevData?.formik?.panPath || '');
    const [imageVirtualPath, setImageVirtualPath] = useState(prevData?.formik?.imagePath || '');
    const [pwdVirtualPath, setPwdVirtualPath] = useState(prevData?.formik?.pwdPath || '');
    const [showSubCaste, setShowSubCaste] = useState(false);
    const [employeeType, setEmployeeType] = useState([]);
    const [openAlertSave, setOpenAlertSave] = React.useState(false);
    const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(prevData?.disableOtp || false);
    const [imageUploadedFile, setImageUploadedFile] = useState(prevData?.image || null)
    const [showOtpField, setShowOtpField] = useState(false);
    const [image, setImage] = useState(null);
    const [showNext, setShowNext] = useState(prevData?.Next || false)
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [imageName, setImageName] = useState('')
    const [showLinkCaste,setShowLinkCaste] = useState(true)
    const [showLinkPwd,setShowLinkPwd] = useState(true)
    const [showLinkAadhar,setShowLinkAadhar] = useState(true)
    const [showLinkPan,setShowLinkPan] = useState(true)
    const handleAlertSaveOpen = () => setOpenAlertSave(true);
    const handleAlertSaveClose = () => setOpenAlertSave(false);
    useEffect(() => {
        if (showNext === true && flag2 === true) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                pageone: { formik: formik.values, familyDetailsFormik: familyDetailsFormik.values, image: imageUploadedFile, disable: disableoption, disableOtp: isOtpButtonDisabled, Next: showNext }
            }));
            setFlag(true);
        }
    }, [showNext])
    useEffect(() => {
        if (showNext === true && flag === true) {
            onButtonClick("pagetwo")
        }
    }, [showNext, flag])
    const handleKeyDown = (event) => {
        // Allow space in text fields
        if (event.key === ' ' && event.target.tagName === 'INPUT' && event.target.type === 'text') {
            event.stopPropagation();
        }
        // Allow Ctrl+A
        if (event.ctrlKey && event.key === 'a') {
            event.stopPropagation();
        }
    };
    // const { showSnackbar } = useSnackbar();
    // console.log(user.data.userdetails.user);
    const formik = useFormik({
        initialValues: {
            Name: prevData?.formik ? prevData?.formik.Name : user.data.userdetails.user.fullname,
            employeeid: user.data.userdetails.user.empCode,
            cfmsId: user.data.userdetails.user.cfmsId,
            apcosId: prevData?.formik ? prevData?.formik.apcosId : '',
            employeeType: user.data.userdetails.user.cfmsId === null || user.data.userdetails.user.cfmsId === "" ? "105" : (prevData?.formik ? prevData?.formik.employeeType : ''),
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
            contactNumber: prevData?.formik ? prevData?.formik.contactNumber : user.data.userdetails.user.mobileNo,
            emergencyContact: prevData?.formik ? prevData?.formik.emergencyContact : '',
            emailid: prevData?.formik ? prevData?.formik.emailid : user.data.userdetails.user.email,
            personalemail: prevData?.formik ? prevData?.formik.personalemail : '',
            Aadhaar: prevData?.formik ? prevData?.formik.Aadhaar : '',
            pancard: prevData?.formik ? prevData?.formik.pancard : user.data.userdetails.user.pancard,
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
                pageone: { formik: formik.values, familyDetailsFormik: familyDetailsFormik.values, image: imageUploadedFile, disable: disableoption, disableOtp: isOtpButtonDisabled, Next: showNext }
            }));
        },
    });
    // console.log(formik.values)
    // const fetchData = () => {
    //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/personalDetails/${user.data.userdetails.user.userId}`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`
    //         }
    //     }).then(response => {
    //         formik.setFieldValue("Name", response.data.result[1].userId.fullname)
    //         //formik.setFieldValue("emailid",response.data.result[1].userId.email)
    //         formik.setFieldValue("contactNumber", user.data.userdetails.user.mobileNo)
    //         // formik.setFieldValue("employeeid",response.data.result[1].userId.empCode)
    //         //  formik.setFieldValue("pancard",response.data.result[1].userId.pancard)
    //         //    formik.setFieldValue("cfmsId",response.data.result[1].userId?.cfmsId||'')
    //         formik.setFieldValue("apcosId", response.data.result[1].apcosId)
    //         formik.setFieldValue("Aadhaar", response.data.result[1].aadhaarNo)
    //         formik.setFieldValue("emergencyContact", response.data.result[1].alternateNumber)
    //         formik.setFieldValue("employeeType", response.data.result[1].employeeType?.typeId||"")
    //         formik.setFieldValue("Gender", response.data.result[1].gender.typeId)
    //         formik.setFieldValue("dob", dayjs(response.data.result[1].dob).format("YYYY-MM-DD"))
    //         ageValidator(response.data.result[1].dob)
    //         formik.setFieldValue("nationality", (response.data.result[1].nationality.typeId))
    //         formik.setFieldValue("religion", (response.data.result[1].religion.typeId))
    //         formik.setFieldValue("maritalStatus", (response.data.result[1].maritalStatus.typeId))
    //         formik.setFieldValue("identificationMarks", response.data.result[1].identificationMarks1)
    //         formik.setFieldValue("identificationMarks2", response.data.result[1].identificationMarks2)
    //         formik.setFieldValue("caste", response.data.result[1].caste.typeId)
    //         formik.setFieldValue("physicallyHandicapped", response.data.result[1].physicallyHandicapped)
    //         formik.setFieldValue("streetCard", response.data.result[1].presentStreet)
    //         formik.setFieldValue("houseNumberCard", response.data.result[1].presentHouseNo)
    //         formik.setFieldValue("pincodeCard", response.data.result[1].presentPincode)
    //         formik.setFieldValue("isCommAddrsSame", response.data.result[1].isPresentPermanentAddressSame)
    //         formik.setFieldValue("stateId", response.data.result[1].presentState)
    //         formik.setFieldValue("distId", response.data.result[1].presentDistrict)
    //         formik.setFieldValue("personalemail", response.data.result[1].personalEmail)
    //         if (response.data.result[1].presentVillage === null) {
    //             formik.setFieldValue("villageId", '')
    //         }
    //         if (response.data.result[1].presentVillage != null) {
    //             formik.setFieldValue("villageId", response.data.result[1].presentVillage)
    //         }
    //         if (response.data.result[1].presentMandal === null) {
    //             formik.setFieldValue("mandalId", '')
    //         }
    //         if (response.data.result[1].presentMandal != null) {
    //             formik.setFieldValue("mandalId", response.data.result[1].presentMandal)
    //         }
    //         formik.setFieldValue("streetcomm", response.data.result[1].permanentStreet)
    //         formik.setFieldValue("houseNumberComm", response.data.result[1].permanentHouseNo)
    //         formik.setFieldValue("pincodecomm", response.data.result[1].permanentPincode)
    //         formik.setFieldValue("stateIdcommunication", response.data.result[1].permanentState)
    //         formik.setFieldValue("distIdcommunication", response.data.result[1].permanentDistrict)
    //         if (response.data.result[1].permanentVillage === null) {
    //             formik.setFieldValue("villageIdcommunication", '')
    //         }
    //         if (response.data.result[1].permanentVillage != null) {
    //             formik.setFieldValue("villageIdcommunication", response.data.result[1].permanentVillage)
    //         }
    //         if (response.data.result[1].permanentMandal === null) {
    //             formik.setFieldValue("mandalIdcommunication", '')
    //         }
    //         if (response.data.result[1].permanentMandal != null) {
    //             formik.setFieldValue("mandalIdcommunication", response.data.result[1].permanentMandal)
    //         }
    //         if (response.data.result[1].caste.typeId === 67 ) {
    //             formik.setFieldValue("subcaste", response.data.result[1].subCaste.typeId)
    //             axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/subcaste/${response.data.result[1].caste.typeId}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${Cookies.get("token")}`
    //                 }
    //             }).then(response => {
    //                 let sortedsubCasteData = response.data.result.map((value) => {
    //                     value.label = value.label
    //                     return value;
    //                 })
    //                 setIsDistrictDisabled(false);
    //                 setSubCasteList(sortedsubCasteData);
    //                 console.log(sortedsubCasteData);
    //             })
    //                 .catch(error => {
    //                     setSubCasteList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (response.data.result[1].physicallyHandicapped === true || response.data.result[1].physicallyHandicapped === "true") {
    //             formik.setFieldValue("disabilityPercentage", response.data.result[1].percentageOfDisability)
    //             formik.setFieldValue("disabilitype", response.data.result[1].typeOfDisability)
    //         }
    //         if (response.data.result[1].presentState != null) {
    //             axios
    //                 .get(`${process.env.REACT_APP_MASTER_API_URL}/user/getDistrictList/${response.data.result[1].presentState.stateId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedDistrictData = response.data.result.map((value) => {
    //                         value.districtName = value.districtName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedDistrictData = sortedDistrictData.sort((a, b) => a.districtName.localeCompare(b.districtName));
    //                     setDistrictList(sortedDistrictData);
    //                     console.log(sortedDistrictData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (response.data.result[1].permanentState != null) {
    //             axios
    //                 .get(`${process.env.REACT_APP_MASTER_API_URL}/user/getDistrictList/${response.data.result[1].permanentState.stateId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedDistrictData = response.data.result.map((value) => {
    //                         value.districtName = value.districtName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedDistrictData = sortedDistrictData.sort((a, b) => a.districtName.localeCompare(b.districtName));
    //                     setIsDistrictDisabled(false);
    //                     setDistrictoneList(sortedDistrictData);
    //                     console.log(sortedDistrictData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (response.data.result[1].presentDistrict != null) {
    //             axios
    //                 .get(`${process.env.REACT_APP_MASTER_API_URL}/user/getMandalList/${response.data.result[1].presentDistrict.distId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedMandalData = response.data.result.map((value) => {
    //                         value.mandalName = value.mandalName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedMandalData = sortedMandalData.sort((a, b) => a.mandalName.localeCompare(b.mandalName));
    //                     setMandalList(sortedMandalData);
    //                     console.log(sortedMandalData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (response.data.result[1].permanentDistrict != null) {
    //             axios
    //                 .get(`${process.env.REACT_APP_MASTER_API_URL}/user/getMandalList/${response.data.result[1].permanentDistrict.distId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedMandalData = response.data.result.map((value) => {
    //                         value.mandalName = value.mandalName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedMandalData = sortedMandalData.sort((a, b) => a.mandalName.localeCompare(b.mandalName));
    //                     setIsDistrictDisabled(false);
    //                     setMandaloneList(sortedMandalData);
    //                     console.log(sortedMandalData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (response.data.result[1].presentMandal != null) {
    //             axios
    //                 .get(`${process.env.REACT_APP_MASTER_API_URL}/user/getVillageList/${response.data.result[1].presentMandal.mandalId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedVillageData = response.data.result.map((value) => {
    //                         value.villageName = value.villageName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedVillageData = sortedVillageData.sort((a, b) => a.villageName.localeCompare(b.villageName));
    //                     setIsVillageDisabled(false);
    //                     setVillageList(sortedVillageData);
    //                     console.log(sortedVillageData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (response.data.result[1].permanentMandal != null) {
    //             axios
    //                 .get(`${process.env.REACT_APP_MASTER_API_URL}/user/getVillageList/${response.data.result[1].permanentMandal.mandalId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedVillageData = response.data.result.map((value) => {
    //                         value.villageName = value.villageName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedVillageData = sortedVillageData.sort((a, b) => a.villageName.localeCompare(b.villageName));
    //                     setIsVillageDisabled(false);
    //                     setVillageoneList(sortedVillageData);
    //                     console.log(sortedVillageData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //     })
    // }
    const fetchAttachments = () => {
        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/attachmentDetails/${user.data.userdetails.user.userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(response => {
            response.data.result.map((item) => {
                if (item.attachmentId.typeId === 102) {
                    setCasteVirtualPath(item.filePath)
                    formik.setFieldValue("casteDoc", item.filePath)
                    formik.setFieldValue("casteDocName", item.fileName)
                    setShowLinkCaste(false);
                }
                if (item.attachmentId.typeId === 97) {
                    setAadharVirtualPath(item.filePath)
                    formik.setFieldValue("aadharDoc", item.filePath)
                    formik.setFieldValue("aadharDocName", item.fileName)
                    setShowLinkAadhar(false);
                }
                if (item.attachmentId.typeId === 101) {
                    setPwdVirtualPath(item.filePath)
                    formik.setFieldValue("pwdDoc", item.filePath)
                    formik.setFieldValue("pwdDocName", item.fileName)
                    setShowLinkPwd(false);
                }
                if (item.attachmentId.typeId === 98) {
                    setPanVirtualPath(item.filePath)
                    formik.setFieldValue("panDoc", item.filePath)
                    formik.setFieldValue("panDocName", item.fileName)
                    setShowLinkPan(false);
                }
                if (item.attachmentId.typeId === 96) {
                    setImageVirtualPath(item.filePath)
                    setImageName(item.fileName)
                }
            })
        })
    }
    // console.log(formik.values)
    const [submitDisable, setSubmitDisable] = useState(false);
    const checkEnrollmentStatus = () => {
        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/check-enrollment-status/${user.data.userdetails.user.userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(response => {
            if (response.data.statusCode === 200) {
                if (response.data.result.stepId === 27 || response.data.result.stepId === 28 || response.data.result.stepId === 29 || response.data.result.stepId === 30) {
                    setSubmitDisable(true);
                    setShowNext(true);
                }
                if (response.data.result.stepId === 31 || response.data.result.stepId === 32 || response.data.result.stepId === 33) {
                    setSubmitDisable(false);
                    setShowNext(true);
                }
            }
            if (response.data.statusCode === 404) {
                setSubmitDisable(false)
                setShowNext(false);
            }
        })
    }
    const [flagproceed, setFlagProceed] = useState(false);
    useEffect(() => {
        if (prevData != undefined && flagproceed === true) {
            onButtonClick("pagetwo")
        }
    }, [flagproceed])
    // useEffect(() => {
    //     fetchData()
    //     fetchAttachments()
    //     fetchFamilyData()
    //     checkEnrollmentStatus()
    //     //    if(prevData!=undefined && showNext===true){
    //     //     getFilePath();
    //     //    }
    //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/caste`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`
    //         }
    //     }).then(response => {
    //         let sortedCasteData = response.data.result.map((value) => {
    //             value.label = value.label
    //             return value;
    //         })
    //         setCasteList(sortedCasteData);
    //         console.log(sortedCasteData);
    //     })
    //         .catch(error => {
    //             setCasteList([]);
    //             console.log(error);
    //         });
    //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/gender`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`
    //         }
    //     }).then(response => {
    //         let sortedGenderData = response.data.result.map((value) => {
    //             value.label = value.label.toUpperCase();
    //             return value;
    //         })
    //         setGenderList(sortedGenderData);
    //         console.log(sortedGenderData);
    //     })
    //         .catch(error => {
    //             setGenderList([]);
    //             console.log(error);
    //         });
    //     axios
    //         .get(
    //             `${process.env.REACT_APP_MASTER_API_URL
    //             }/employee-enrollment/religion`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${Cookies.get("token")}`
    //                 }
    //             }
    //         )
    //         .then((response) => {
    //             let sortedReligionData = response.data.result.map((value) => {
    //                 value.label = value.label.toUpperCase();
    //                 return value;
    //             });
    //             setReligionList(sortedReligionData);
    //             console.log(sortedReligionData);
    //         })
    //         .catch((error) => {
    //             setReligionList([]);
    //             console.log(error);
    //         });
    //     axios
    //         .get(
    //             `${process.env.REACT_APP_MASTER_API_URL
    //             }/employee-enrollment/nationality`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${Cookies.get("token")}`
    //                 }
    //             }
    //         )
    //         .then((response) => {
    //             let sortedNationalityData = response.data.result.map((value) => {
    //                 value.label = value.label.toUpperCase();
    //                 return value;
    //             });
    //             setNationalityList(sortedNationalityData);
    //             console.log(sortedNationalityData);
    //         })
    //         .catch((error) => {
    //             setNationalityList([]);
    //             console.log(error);
    //         });
    //     axios
    //         .get(
    //             `${process.env.REACT_APP_MASTER_API_URL
    //             }/employee-enrollment/maritalStatus`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${Cookies.get("token")}`
    //                 }
    //             }
    //         )
    //         .then((response) => {
    //             let sortedmaritalStatusData = response.data.result.map((value) => {
    //                 value.label = value.label.toUpperCase();
    //                 return value;
    //             });
    //             setMaritalStatusList(sortedmaritalStatusData);
    //             console.log(sortedmaritalStatusData);
    //         })
    //         .catch((error) => {
    //             setMaritalStatusList([]);
    //             console.log(error);
    //         });
    //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/relation`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`
    //         }
    //     }).then(response => {
    //         let sortedRelationData = response.data.result.map((value) => {
    //             value.label = value.label.toUpperCase();
    //             return value;
    //         })
    //         setRelationList(sortedRelationData);
    //         console.log(sortedRelationData);
    //     })
    //         .catch(error => {
    //             setRelationList([]);
    //             console.log(error);
    //         });
    //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getStatelist`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`
    //         }
    //     }).then(response => {
    //         let sortedStateData = response.data.result.map((value) => {
    //             value.stateName = value.stateName.toUpperCase();
    //             return value;
    //         })
    //         sortedStateData = sortedStateData.sort((a, b) => a.stateName.localeCompare(b.stateName));
    //         setstateList(sortedStateData);
    //         console.log(sortedStateData);
    //     })
    //         .catch(error => {
    //             setstateList([]);
    //             console.log(error);
    //         });
    //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/user/getStatelist`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`
    //         }
    //     }).then(response => {
    //         let sortedStateoneData = response.data.result.map((value) => {
    //             value.stateName = value.stateName.toUpperCase();
    //             return value;
    //         })
    //         sortedStateoneData = sortedStateoneData.sort((a, b) => a.stateName.localeCompare(b.stateName));
    //         setstateoneList(sortedStateoneData);
    //         console.log(sortedStateoneData);
    //     })
    //         .catch(error => {
    //             setstateList([]);
    //             console.log(error);
    //         });
    //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/employeeType`, {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`
    //         }
    //     }).then(response => {
    //         let empType = []
    //         response.data.result.map((value) => {
    //             empType.push({ label: value.label, id: value.id });
    //         })
    //         setEmployeeType(empType);
    //         console.log(empType);
    //     })
    //         .catch(error => {
    //             setEmployeeType([]);
    //             console.log(error);
    //         });
    //     if (prevData != undefined) {
    //         console.log(prevData)
    //         // setImageUploadedFile(prevData.image)
    //         // handleFileChangeImg(prevData.image)
    //         setImage(prevData.image);
    //         setDisableoption(prevData.disable);
    //         familyDetailsFormik.setValues(prevData?.familyDetailsFormik)
    //         if (prevData.formik.caste.id != undefined) {
    //             axios
    //                 .get(
    //                     `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/subcaste/${prevData?.formik?.caste.id}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 }
    //                 )
    //                 .then((response) => {
    //                     let sortedsubCasteData =
    //                         response.data.result.map((value) => {
    //                             value.label = value.label;
    //                             return value;
    //                         });
    //                     setIsDistrictDisabled(false);
    //                     setSubCasteList(sortedsubCasteData);
    //                     console.log(sortedsubCasteData);
    //                 })
    //                 .catch((error) => {
    //                     setSubCasteList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (prevData.formik.stateId.stateId != undefined) {
    //             axios
    //                 .get(`${process.env.REACT_APP_MASTER_API_URL}/user/getDistrictList/${prevData.formik?.stateId.stateId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedDistrictData = response.data.result.map((value) => {
    //                         value.districtName = value.districtName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedDistrictData = sortedDistrictData.sort((a, b) => a.districtName.localeCompare(b.districtName));
    //                     setDistrictList(sortedDistrictData);
    //                     console.log(sortedDistrictData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (prevData.formik.stateId.stateId != undefined) {
    //             axios
    //                 .get(
    //                     `${process.env.REACT_APP_MASTER_API_URL}/user/getMandalList/${prevData?.formik?.distId.distId}`,
    //                     {
    //                         headers: {
    //                             Authorization: `Bearer ${Cookies.get("token")}`
    //                         }
    //                     })
    //                 .then(response => {
    //                     let sortedMandalData = response.data.result.map((value) => {
    //                         value.mandalName = value.mandalName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedMandalData = sortedMandalData.sort((a, b) => a.mandalName.localeCompare(b.mandalName));
    //                     setMandalList(sortedMandalData);
    //                     console.log(sortedMandalData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (prevData.formik.mandalId.mandalId != undefined) {
    //             axios
    //                 .get(
    //                     `${process.env.REACT_APP_MASTER_API_URL}/user/getVillageList/${prevData?.formik?.mandalId.mandalId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 })
    //                 .then(response => {
    //                     let sortedVillageData = response.data.result.map((value) => {
    //                         value.villageName = value.villageName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedVillageData = sortedVillageData.sort((a, b) => a.villageName.localeCompare(b.villageName));
    //                     setIsVillageDisabled(false);
    //                     setVillageList(sortedVillageData);
    //                     console.log(sortedVillageData);
    //                 })
    //                 .catch(error => {
    //                     setVillageList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (prevData.formik.stateIdcommunication.stateId != undefined) {
    //             axios
    //                 .get(
    //                     `${process.env.REACT_APP_MASTER_API_URL}/user/getDistrictList/${prevData?.formik?.stateIdcommunication.stateId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 }
    //                 )
    //                 .then(response => {
    //                     let sortedDistrictData = response.data.result.map((value) => {
    //                         value.districtName = value.districtName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedDistrictData = sortedDistrictData.sort((a, b) => a.districtName.localeCompare(b.districtName));
    //                     setIsDistrictDisabled(false);
    //                     setDistrictoneList(sortedDistrictData);
    //                     console.log(sortedDistrictData);
    //                 })
    //                 .catch(error => {
    //                     setDistrictoneList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (prevData.formik.distIdcommunication.distId != undefined) {
    //             axios
    //                 .get(
    //                     `${process.env.REACT_APP_MASTER_API_URL}/user/getMandalList/${prevData?.formik?.distIdcommunication.distId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 }
    //                 )
    //                 .then(response => {
    //                     let sortedMandalData = response.data.result.map((value) => {
    //                         value.mandalName = value.mandalName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedMandalData = sortedMandalData.sort((a, b) => a.mandalName.localeCompare(b.mandalName));
    //                     setIsDistrictDisabled(false);
    //                     setMandaloneList(sortedMandalData);
    //                     console.log(sortedMandalData);
    //                 })
    //                 .catch(error => {
    //                     setMandaloneList([]);
    //                     console.log(error);
    //                 });
    //         }
    //         if (prevData.formik.mandalIdcommunication.mandalId != undefined) {
    //             axios
    //                 .get(
    //                     `${process.env.REACT_APP_MASTER_API_URL}/user/getVillageList/${prevData?.formik?.mandalIdcommunication.mandalId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${Cookies.get("token")}`
    //                     }
    //                 }
    //                 )
    //                 .then(response => {
    //                     let sortedVillageData = response.data.result.map((value) => {
    //                         value.villageName = value.villageName.toUpperCase();
    //                         return value;
    //                     })
    //                     sortedVillageData = sortedVillageData.sort((a, b) => a.villageName.localeCompare(b.villageName));
    //                     setIsVillageDisabled(false);
    //                     setVillageoneList(sortedVillageData);
    //                     console.log(sortedVillageData);
    //                 })
    //                 .catch(error => {
    //                     setVillageoneList([]);
    //                     console.log(error);
    //                 });
    //         }
    //     }
    // }, []);
    const getOtp = async () => {
        let regex = new RegExp(/[6-9]\d{9}/)
        console.log((formik.values.contactNumber).toString())
        console.log(regex.test(formik.values.contactNumber))
        console.log((formik.values.contactNumber).length)
        if ((formik.values.contactNumber).toString() != '') {
            if (regex.test(formik.values.contactNumber) == false || ((formik.values.contactNumber).toString()).length != 10) {
                alert("Please Enter Valid Contact Number. Contact Number must have 10 digits starting with 6,7,8 or 9");
            }
            else {
                setShowOtpField(true)
                try {
                    let body = {
                        userId: user.data.userdetails.user.userId,
                        mobileNo: parseInt(formik.values.contactNumber)
                    }
                    const config = {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
                    }
                    const res = await axios.post(
                        `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/send-mobile-otp`,
                        body,
                        config
                    );
                    if (res.data.statusCode === 200) {
                        setToastMessage(res.data.message)
                        setToastSeverity("success");
                        setOpenToast(true);
                    }
                    else {
                        setToastMessage(res.data.message)
                        setToastSeverity("error");
                        setOpenToast(true);
                    }
                }
                catch (error) {
                    // setLoadingInd(false);
                    console.log(error.message);
                }
            }
        }
    }
    const validateOtp = async () => {
        // console.log(localStorage.getItem("token"))
        let regex = new RegExp(/[0-9]{6}/)
        if (formik.values.otp != '') {
            if (regex.test(formik.values.otp) == false || formik.values.otp.length != 6) {
                alert("Otp must have 6 digits");
            }
            else {
                try {
                    let body = {
                        userId: user.data.userdetails.user.userId,
                        otp: formik.values.otp
                    }
                    const config = {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
                    }
                    const res = await axios.post(
                        `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/validate-mobile-otp`,
                        body,
                        config
                    );
                    if (res.data.statusCode === 200) {
                        setShowOtpField(false);
                        setIsOtpButtonDisabled(true);
                        setToastMessage(res.data.message)
                        setToastSeverity("success");
                        setOpenToast(true);
                    }
                    else {
                        setToastMessage(res.data.message)
                        setToastSeverity("error");
                        setOpenToast(true);
                    }
                }
                catch (error) {
                    // setLoadingInd(false);
                    console.log(error.message);
                }
            }
        }
    }
    const familyDetailsFormik = useFormik({
        initialValues: {
            tableRows: [{
                id: 1,
                name: '',
                relation: '',
                fdob: null,
                gender: '',
                mobileNo: '',
                famId:null,
            }]
        }
    })
    console.log(familyDetailsFormik.values)
    console.log(dayjs(familyDetailsFormik.values.tableRows.fdob).format("YYYY-MM-DD"))
    const handleAddRow = () => {
        const newRowId = familyDetailsFormik.values.tableRows.length + 1;
        const newRow = [...familyDetailsFormik.values.tableRows,
        {
            id: newRowId,
            name: '',
            relation: '',
            fdob: null,
            gender: '',
            mobileNo: null,
        }]
        familyDetailsFormik.setValues((prevValues) => ({
            ...prevValues,
            tableRows: newRow
        }))
    }
    const handleDeleteRow = (id) => {
        familyDetailsFormik.setValues((prevValues) => {
            const updatedRows = prevValues.tableRows.filter((row) => row.id !== id);
            const updatedRowsWithId = updatedRows.map((row, index) => ({
                ...row,
                id: index + 1,
            }));
            return {
                ...prevValues,
                tableRows: updatedRowsWithId,
            };
        });
    }
    const handleTableChange = (id, field, value) => {
        familyDetailsFormik.setFieldValue(`tableRows[${id - 1}].${field}`, value);
    }
    const [rows, setRows] = useState([
        {
            id: 1,
            name: "",
            relation: "",
            fdob: "",
            gender: "",
            mobileNo: "",
            adddelete: ""
        },
    ]);
    const columns = [
        {
            field: "id",
            headerClassName: "super-app-theme--header",
            headerName: "S No.",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            hide: true
        },
        {
            width: 250,
            headerName: "Name",
            field: "name",
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    sx={{ width: "100%", mt: 2 }}
                    value={params.value}
                    name="name"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onKeyDown={handleKeyDown}
                    onChange={(e, value) => {
                        handleTableChange(params.row.id, "name", e.target.value);
                    }}
                />
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Relation",
            field: "relation",
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Autocomplete
                    margin="normal"
                    fullWidth
                    size="small"
                    id="relation"
                    name="relation"
                    options={relationlist}
                    onKeyDown={handleKeyDown}
                    value={relationlist.find(
                        (option) => option.id === params.row.relation
                    ) || null}
                    onChange={(e, value) => {
                        console.log(value)
                        if (value === null) {
                            handleTableChange(params.row.id, "relation", "");
                        } else {
                            handleTableChange(params.row.id, "relation", value.id);
                        }
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
                />
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Date of Birth",
            field: "fdob",
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date of Birth"
                        inputFormat="DD/MM/YYYY"
                        name="fdob"
                        value={params.value}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            handleTableChange(params.row.id, "fdob", dayjs(e).format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => (
                            <TextField
                                size="small"
                                fullWidth
                                sx={{ width: "100%", mt: 2 }}
                                {...params}
                            />
                        )}
                    />
                </LocalizationProvider>
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Gender",
            field: "gender",
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Autocomplete
                    margin="normal"
                    fullWidth
                    size="small"
                    id="gender"
                    name="gender"
                    options={genderList}
                    onKeyDown={handleKeyDown}
                    value={genderList.find(
                        (option) => option.id === params.row.gender
                    ) || null}
                    onChange={(e, value) => {
                        if (value === null) {
                            handleTableChange(params.row.id, "gender", "");
                        }
                        else {
                            handleTableChange(params.row.id, "gender", value.id);
                        }
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
                />
            ),
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 200,
            headerName: "Mobile No",
            field: "mobileNo",
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <TextField
                    margin="normal"
                    fullWidth
                    id="mobileNo"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%", mt: 2 }}
                    name="mobileNo"
                    size="small"
                    value={params.value}
                    onChange={(e, value) => {
                        handleTableChange(params.row.id, "mobileNo", e.target.value);
                    }}
                />
            ),
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
                        onClick={() => handleDeleteRow(params.row.id)}
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
    const fetchFamilyData = () => {
        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/familyDetails/${user.data.userdetails.user.userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(response => {
            if (response.data.result.length > 0) {
                response.data.result.map((item, index) => {
                    familyDetailsFormik.setFieldValue(`tableRows[${index}].id`, index + 1)
                    familyDetailsFormik.setFieldValue(`tableRows[${index}].famId`, item.empFamId)
                    familyDetailsFormik.setFieldValue(`tableRows[${index}].name`, item.familyMemberName)
                    familyDetailsFormik.setFieldValue(`tableRows[${index}].relation`, item.familyRelation.typeId)
                    familyDetailsFormik.setFieldValue(`tableRows[${index}].gender`, item.familyGender.typeId)
                    familyDetailsFormik.setFieldValue(`tableRows[${index}].fdob`, dayjs(item.familyDob).format("YYYY-MM-DD"))
                    familyDetailsFormik.setFieldValue(`tableRows[${index}].mobileNo`, parseInt(item.familyPhoneNumber))
                })
            }
        })
            .catch(error => {
                console.log(error);
            });
    }
    console.log(familyDetailsFormik.values)
    const checkValid = () => {
        formik
            .validateForm()
            .then((formErrors) => {
                if (Object.keys(formErrors).length > 0) {
                    console.log(Object.keys(formErrors))
                    //alert(Object.keys(formErrors))
                    setToastMessage("Please fill all the required * fields and upload attachments")
                    setToastSeverity("error");
                    setOpenToast(true);
                } else {
                    let isValidate = "Pass"
                    let alertMsg = ""
                    let regex = new RegExp(/(0|91)?[6-9][0-9]{9}/);
                    if (!formik.values.employeeType) {
                        alertMsg = alertMsg + "Please select Employee Type\n";
                        isValidate = "Fail"
                    }
                    if (!aadharVirtualPath) {
                        alertMsg = alertMsg + "Please upload Aadhar attachment\n";
                        isValidate = "Fail"
                    }
                    if (!panVirtualPath) {
                        alertMsg = alertMsg + "Please upload PanCard attachment\n";
                        isValidate = "Fail"
                    }
                    if (!imageVirtualPath) {
                        alertMsg = alertMsg + "Please upload Photo\n";
                        isValidate = "Fail"
                    }
                    if (formik.values.physicallyHandicapped === "true" && pwdVirtualPath==='') {
                        alertMsg = alertMsg + "Please upload Pwd Certificate\n";
                        isValidate = "Fail"
                    }
                    if(formik.values.caste == 67 && formik.values.subcaste===null ){
                        alertMsg = alertMsg + "Please select SubCaste\n";
                        isValidate = "Fail"
                    }
                    if (
                        (formik.values.caste == "67" || formik.values.caste == "68" || formik.values.caste == "69" || formik.values.caste == 67 || formik.values.caste == 68 || formik.values.caste == 69) &&
                        casteVirtualPath===''
                    ) {
                        alertMsg = alertMsg + "Please upload Caste Certificate\n";
                        isValidate = "Fail"
                    }
                    // if (formik.values.employeeType === "105" && formik.values.apcosId.length == 0) {
                    //     alertMsg = alertMsg + "APCOS Id is required for Employee Type - APCOS!\n";
                    //     isValidate = "Fail"
                    // }
                    if (isOtpButtonDisabled === false) {
                        alertMsg = alertMsg + "Please validate your Contact number"
                        isValidate = "Fail"
                    }
                    familyDetailsFormik.values.tableRows.map((row) => {
                        if (row.name != "" || row.relation != "" || (row.fdob != null && row.fdob != "Invalid Date") || (row.gender != "" && row.gender != null) || row.mobileNo != '') {
                            if (row.name == "" || row.fdob == "" || row.fdob == "Invalid Date" || row.relation == "" || row.gender == "" || row.mobileNo == "") {
                                alertMsg = alertMsg + `In Family Details Row ${row.id} : Please fill all the fields of Family Details If wanted to add. Otherwise please clear the fields left entering completely\n`;
                                isValidate = "Fail"
                            }
                        }
                        if (row.mobileNo != "") {
                            console.log(regex.test(row.mobileNo))
                            console.log(row.mobileNo.length)
                            if (regex.test(row.mobileNo) == false || (row.mobileNo).toString().length != 10) {
                                alertMsg = alertMsg + `In Family Details Row ${row.id} : Mobile Number must be 10 digits starting with 6,7,8 or 9\n`;
                                isValidate = "Fail";
                            }
                        }
                    })
                    if (isValidate === "Pass") {
                        handleAlertSaveOpen();
                    }
                    else {
                        alert(alertMsg);
                    }
                    //savePersonalDetails()
                    //    saveAllAttachment()
                }
            })
            .catch((err) => {
                formik.setSubmitting(false);
            });
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };
    const handlephysicalhand = (event) => {
        setHasphysicalHand(event.target.value);
    };
    const getFile = async (event, attachment) => {
        event.preventDefault();
        const blobData = new Blob([attachment], { type: attachment?.type });
        //const blobData = new Blob(attachment);
        const blobUrl = URL.createObjectURL(blobData);
        const iframe = document.createElement('iframe')
        iframe.src = blobUrl;
        iframe.width = '100%';
        iframe.height = '500px';
        document.body.appendChild(iframe)
        window.open(blobUrl, '_blank');
    }
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
    const CardTitle = styled((props) => (
        <Typography component="span" {...props} />
    ))(() => ({
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
    }));
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        let ageString = "";
        if (age > 0) {
            ageString += age === 1 ? "1 year" : `${age} years`;
        }
        if (monthDiff > 0) {
            if (ageString !== "") {
                ageString += ", ";
            }
            ageString += monthDiff === 1 ? "1 month" : `${monthDiff} months`;
        }
        if (dayDiff > 0) {
            if (ageString !== "") {
                ageString += ", ";
            }
            ageString += dayDiff === 1 ? "1 day" : `${dayDiff} days`;
        }
        return {
            years: age,
            months: monthDiff,
            days: dayDiff,
            ageString: ageString,
        };
    }
    const fileInputRef = useRef(null)
    const fileInputRef2 = useRef(null)
    const fileInputRef3 = useRef(null)
    const fileInputRefPwd = useRef(null)
    const fileInputRefImg = useRef(null)
    const handleButtonClick = () => {
        fileInputRef.current.click();
    }
    const handleButtonClick2 = () => {
        fileInputRef2.current.click();
    }
    const handleButtonClick3 = () => {
        fileInputRef3.current.click();
    }
    const handleButtonClickPwd = () => {
        fileInputRefPwd.current.click();
    }
    const handleButtonClickImg = () => {
        fileInputRefImg.current.click();
    }
    // console.log(uplodedImage)
    let selectedFile = null;
    let attachmentId = null;
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > 200) {
            console.error("File size exceeded");
            alert("Attachment should be less than 200KB");
            setCasteUploadedFile(null);
            return;
        }
        // Check if the file format is allowed (JPG, PNG, or PDF)
        const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedFormats.includes(file.type)) {
            console.error("Invalid file format");
            alert("Invalid file format. Please choose JPG, PNG, or PDF.");
            setCasteUploadedFile(null);
            return;
        }
        console.log(file.name);
        selectedFile = file;
        // Set the selected file and perform further actions
        attachmentId = 102;
        setCasteUploadedFile(selectedFile);
        // setAttachmentId(102)
        console.log(file);
        if (file) {
            uploadAttachment();
        }
    };
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > 200) {
            console.error("File size exceeded");
            alert("Attachment should be less than 200KB");
            setAadharUploadedFile(null);
            return;
        }
        const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedFormats.includes(file.type)) {
            console.error("Invalid file format");
            alert("Invalid file format. Please choose JPG, PNG, or PDF.");
            setAadharUploadedFile(null);
            return;
        }
        console.log(file.name);
        selectedFile = file;
        attachmentId = 97;
        setAadharUploadedFile(selectedFile);
        if (selectedFile) {
            uploadAttachment();
        }
    };
    const handleFileChangePwd = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > 200) {
            console.error("File size exceeded");
            alert("Attachment should be less than 200KB");
            const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
            if (!allowedFormats.includes(file.type)) {
                console.error("Invalid file format");
                alert("Invalid file format. Please choose JPG, PNG, or PDF.");
                setPwdUploadedFile(null); // Corrected from setCasteUploadedFile(null)
                return;
            }
            setPwdUploadedFile(null);
            return;
        }
        console.log(file.name);
        selectedFile = file;
        attachmentId = 101;
        setPwdUploadedFile(selectedFile);
        if (selectedFile) {
            uploadAttachment();
        }
    };
    const handleFileChange3 = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const fileSizeKB = File.size / 1024;
        if (fileSizeKB > 200) {
            console.error("Fie size exceeded");
            alert("Attachment should be less than 200KB");
            setPanUploadedFile(null);
            return;
        }
        const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedFormats.includes(file.type)) {
            console.error("Invalid file format");
            alert("Invalid file format. Please choose JPG, PNG, or PDF.");
            setPanUploadedFile(null);
            return;
        }
        console.log(File.name);
        selectedFile = file;
        attachmentId = 98;
        setPanUploadedFile(selectedFile)
        if (selectedFile) {
            uploadAttachment()
        }
    }
    const handleFileChangeImg = (file) => {
        if (!file) {
            return;
        }
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > 200) {
            console.error("File size exceeded");
            alert("Attachment should be less than 200KB");
            setImageUploadedFile(null);
            return;
        }
        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(file.type)) {
            console.error("Invalid file format");
            alert("Invalid file format. Please choose JPG, PNG");
            setImageUploadedFile(null);
            return;
        }
        console.log(file.name);
        selectedFile = file;
        setImageUploadedFile(selectedFile);
        attachmentId = 96;
        if (selectedFile) {
            uploadAttachment();
        }
    };
    const uploadAttachment = async () => {
        const config = { headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${Cookies.get("token")}` } };
        var bodyFormData = new FormData();
        console.log(selectedFile)
        bodyFormData.append("file", selectedFile);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/uploadAttachment`,
                bodyFormData,
                config
            );
            console.log(res);
            console.log(res.data.result[selectedFile.name]);
            if (res.data.statusCode == 200) {
                console.log("uploaded successfully")
                setToastMessage("File Uploaded Successfully")
                setToastSeverity("success");
                setOpenToast(true);
                if (attachmentId === 102) {
                    console.log(102)
                    setCasteVirtualPath(res.data.result[selectedFile.name])
                    formik.setFieldValue("casteDoc", selectedFile)
                    formik.setFieldValue("casteDocName", selectedFile.name)
                    formik.setFieldValue("castePath", res.data.result[selectedFile.name]);
                    setShowLinkCaste(true);
                }
                if (attachmentId === 97) {
                    setAadharVirtualPath(res.data.result[selectedFile.name])
                    formik.setFieldValue("aadharDocName", selectedFile.name)
                    formik.setFieldValue("aadharDoc", selectedFile);
                    formik.setFieldValue("aadharPath", res.data.result[selectedFile.name]);
                    setShowLinkAadhar(true);
                }
                if (attachmentId === 98) {
                    setPanVirtualPath(res.data.result[selectedFile.name])
                    formik.setFieldValue("panDocName", selectedFile.name)
                    formik.setFieldValue("panDoc", selectedFile);
                    formik.setFieldValue("panPath", res.data.result[selectedFile.name]);
                    setShowLinkPan(true);
                }
                if (attachmentId === 96) {
                    setImageVirtualPath(res.data.result[selectedFile.name])
                    formik.setFieldValue("imagePath", res.data.result[selectedFile.name]);
                }
                if (attachmentId === 101) {
                    setPwdVirtualPath(res.data.result[selectedFile.name])
                    formik.setFieldValue("pwdDocName", selectedFile.name)
                    formik.setFieldValue("pwdDoc", selectedFile)
                    formik.setFieldValue("pwdPath", res.data.result[selectedFile.name]);
                    setShowLinkPwd(true);
                }
                // console.log(openToast)
                //   showSnackbar(res.data.message,"success");
                // callConfirmDialogMessage("Uplosded Successfully");
                // alert("successfully uploaded");
                // handleResult("Success");
                // onFileUpload(res.data.result.filePath);
                //onFileUpload(files, uploadedFiles[0].name)
            } else {
                console.log('bad request');
                setToastMessage("File Uploaded Successfully")
            }
        } catch (error) {
            // setLoadingInd(false);
            console.log(error.message);
        }
    };
    const getFilePath = () => {
        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/attachmentDetails/${user.data.userdetails.user.userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(response => {
            response.data.result.map((item) => {
                if (item.attachmentId.typeId === 97) {
                    setAadharVirtualPath(item.filePath)
                    formik.setFieldValue("aadharPath", item.filePath)
                }
                if (item.attachmentId.typeId === 98) {
                    setPanVirtualPath(item.filePath)
                    formik.setFieldValue("panPath", item.filePath)
                }
                if (item.attachmentId.typeId === 96) {
                    setImageVirtualPath(item.filePath);
                    formik.setFieldValue("imagePath", item.filePath)
                }
                if (prevData?.formik?.castePath != '' && item.attachmentId.typeId === 102) {
                    setCasteVirtualPath(item.filePath)
                    formik.setFieldValue("castePath", item.filePath)
                }
                if (prevData?.formik?.PwdVirtualPath != '' && item.attachmentId.typeId === 101) {
                    setPwdVirtualPath(item.filePath)
                    formik.setFieldValue("pwdPath", item.filePath)
                }
            })
        })
            .catch(error => {
                console.log(error);
            });
    }
    const ageValidator = (value) => {
        if (value != null || value != NaN) {
            const selectedDate = dayjs(value).format("YYYY-MM-DD");
            console.log(selectedDate);
            const age = calculateAge(value);
            console.log(age);
            let minAge = 18;
            // let maxAge = 50;
            if (
                age &&
                (age.years < minAge)
            ) {
                alert(
                    `Age should be greater than ${minAge}`
                );
                return;
            }
            formik.setFieldValue("dob", selectedDate);
            formik.setFieldValue(
                "age",
                age ? age.ageString : ""
            );
        }
    };
    console.log(casteVirtualPath);
    console.log(panVirtualPath)
    console.log(formik.values.caste?.id)
    const saveAllAttachment = async () => {
        if (!aadharVirtualPath) {
            alert("Please select Aadhar attachment");
            return;
        }
        try {
            let body = {}
            if (formik.values.physicallyHandicapped === "true") {
                if (
                    formik.values.caste?.id == "67" ||
                    formik.values.caste?.id == "68"
                    || formik.values.caste?.id == "69"
                ) {
                    body = {
                        paths: [
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 102,
                                "filePath": casteVirtualPath,
                                //  "crtBy": user.data.userdetails.user.userId,
                                //   "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 97,
                                "filePath": aadharVirtualPath,
                                //   "crtBy": user.data.userdetails.user.userId,
                                //  "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 98,
                                "filePath": panVirtualPath,
                                //   "crtBy": user.data.userdetails.user.userId,
                                //   "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 96,
                                "filePath": imageVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 101,
                                "filePath": pwdVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            }
                        ]
                    }
                }
                else {
                    body = {
                        paths: [
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 97,
                                "filePath": aadharVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 98,
                                "filePath": panVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 96,
                                "filePath": imageVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 101,
                                "filePath": pwdVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            }
                        ]
                    }
                }
            }
            else {
                if (formik.values.caste?.id === 67 || formik.values.caste?.id == "68" || formik.values.caste?.id == "69") {
                    body = {
                        paths: [
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 102,
                                "filePath": casteVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 97,
                                "filePath": aadharVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 98,
                                "filePath": panVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 96,
                                "filePath": imageVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            }
                        ]
                    }
                }
                else {
                    body = {
                        paths: [
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 97,
                                "filePath": aadharVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 98,
                                "filePath": panVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            },
                            {
                                "userId": user.data.userdetails.user.userId,
                                "attachmentId": 96,
                                "filePath": imageVirtualPath,
                                "crtBy": user.data.userdetails.user.userId,
                                "updBy": user.data.userdetails.user.userId
                            }
                        ]
                    }
                }
            }
            const res = await axios.post(
                `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/save-allAttachment`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                }
            );
            console.log(res);
            console.log(res.data.result);
            if (res.data.statusCode == 200) {
                console.log("Save all Attachemnt successfully")
                setToastMessage("Uploaded Files Saved Successfully")
                setToastSeverity("success");
                setOpenToast(true);
                // console.log(openToast)
                //   showSnackbar(res.data.message,"success");
                // callConfirmDialogMessage("Uplosded Successfully");
                // alert("successfully uploaded");
                // handleResult("Success");
                // onFileUpload(res.data.result.filePath);
                //onFileUpload(files, uploadedFiles[0].name)
            } else {
                console.log('bad request');
            }
        } catch (error) {
            // setLoadingInd(false);
            console.log(error.message);
        }
    };
    const savePersonalDetails = async (data) => {
        try {
            let body = {
                employeeDetails: {
                    userId: user.data.userdetails.user.userId,
                    employeeType: parseInt(formik.values.employeeType),
                    fullName: user.data.userdetails.user.fullname,
                    // console.log(user.data.userdetails.user),
                    gender: formik.values.Gender,
                    dob: dayjs(formik.values.dob).format("YYYY-MM-DD"),
                    identificationMarks1: formik.values.identificationMarks,
                    identificationMarks2: formik.values.identificationMarks2,
                    caste: formik.values.caste,
                    // subCaste: 70,
                    religion: formik.values.religion,
                    nationality: formik.values.nationality,
                    maritalStatus: formik.values.maritalStatus,
                    physicallyHandicapped: formik.values.physicallyHandicapped,
                    // percentageOfDisability: 40,
                    presentStreet: formik.values.streetCard,
                    presentHouseNo: formik.values.houseNumberCard,
                    presentDistrict: formik.values.distId.distId,
                    presentMandal: formik.values.mandalId.mandalId,
                    presentVillage: formik.values.villageId.villageId,
                    presentState: formik.values.stateId.stateId,
                    presentPincode: formik.values.pincodeCard,
                    isPresentPermanentAddressSame: formik.values.isCommAddrsSame,
                    permanentStreet: formik.values.streetcomm,
                    permanentHouseNo: formik.values.houseNumberComm,
                    permanentDistrict: formik.values.distIdcommunication.distId,
                    permanentMandal: formik.values.mandalIdcommunication.mandalId,
                    permanentVillage: formik.values.villageIdcommunication.villageId,
                    permanentState: formik.values.stateIdcommunication.stateId,
                    permanentPincode: formik.values.pincodecomm,
                    personalEmail: formik.values.personalemail,
                    alternateNumber: formik.values.emergencyContact,
                    aadhaarNo: formik.values.Aadhaar,
                    // isEmployeeActive: true,
                    // enrollmentStatus: 0,
                    createdStatus: 0,
                    //crtBy: user.data.userdetails.user.userId,
                    // updBy: user.data.userdetails.user.userId,
                    cfmsId: user.data.userdetails.user.cfmsId,
                    apcosId: formik.values.apcosId,
                    pancard: formik.values.pancard,
                    emailId: formik.values.emailid,
                    empCode: formik.values.employeeid,
                    mobileNo: formik.values.contactNumber,
                },
                employeeAttachments: {
                    paths: [
                        {
                            userId: user.data.userdetails.user.userId,
                            attachmentId: 97,
                            filePath: aadharVirtualPath,
                            //  crtBy: user.data.userdetails.user.userId,
                            //  updBy: user.data.userdetails.user.userId
                        },
                        {
                            userId: user.data.userdetails.user.userId,
                            attachmentId: 98,
                            filePath: panVirtualPath,
                            //  crtBy: user.data.userdetails.user.userId,
                            //   updBy: user.data.userdetails.user.userId
                        },
                        {
                            userId: user.data.userdetails.user.userId,
                            attachmentId: 96,
                            filePath: imageVirtualPath,
                            //  crtBy: user.data.userdetails.user.userId,
                            //  updBy: user.data.userdetails.user.userId
                        },
                    ],
                },
            };
            let checkFamilyDetails = "false";
            let list = []
            familyDetailsFormik.values.tableRows.map((row) => {
                let familyDetailsObj = {
                    userId: user.data.userdetails.user.userId,
                    empFamId: row["famId"],
                    familyMemberName: row["name"],
                    familyRelation: row["relation"],
                    familyGender: row["gender"],
                    familyDob: row["fdob"],
                    familyPhoneNumber: row["mobileNo"]
                };
                if (row.name != '' && row.relation != '' && row.mobileNo != '') {
                    checkFamilyDetails = "true";
                }
                list.push(familyDetailsObj)
            })
            if (formik.values.caste == "67" || formik.values.caste == "68" || formik.values.caste == "69" || formik.values.caste == 67 || formik.values.caste == 68 || formik.values.caste == 69) {
                let addPath = {
                    userId: user.data.userdetails.user.userId,
                    attachmentId: 102,
                    filePath: casteVirtualPath,
                    //  crtBy: user.data.userdetails.user.userId,
                    //  updBy: user.data.userdetails.user.userId
                };
                let pathArray = body.employeeAttachments["paths"];
                pathArray.push(addPath);
                body.employeeDetails.subCaste = formik.values.subcaste;
                // (body.attachmentDetails["paths"]).push(addPath);
                console.log(body.employeeAttachments["paths"]);
            }
            if (formik.values.physicallyHandicapped === "true" || formik.values.physicallyHandicapped === true) {
                body.employeeDetails.typeOfDisability = formik.values.disabilitype;
                body.employeeDetails.percentageOfDisability = parseInt(
                    formik.values.disabilityPercentage
                );
                let addPwdPath = {
                    userId: user.data.userdetails.user.userId,
                    attachmentId: 101,
                    filePath: pwdVirtualPath,
                    //crtBy: user.data.userdetails.user.userId,
                    // updBy: user.data.userdetails.user.userId
                };
                let pathPwdArray = body.employeeAttachments["paths"];
                pathPwdArray.push(addPwdPath);
            }
            console.log("the saved details  body", body);
            if (checkFamilyDetails === "true") {
                body.employeeFamilyList = list
                const res = await axios.post(
                    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/personalDetails`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
                    }
                );
                console.log("the saved details  areeeeee", res);
                if (res.data.statusCode == 200) {
                    setShowNext(true);
                    setFlag(true);
                    setFlag2(true);
                    console.log("the result ", res.data.result);
                    setToastMessage(res.data.message)
                    setToastSeverity("success");
                    setOpenToast(true);
                    setFlagProceed(true)
                }
            }
            else {
                body.employeeFamilyList = [];
                const res = await axios.post(
                    `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/personalDetails`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
                    }
                );
                console.log("the saved details  areeeeee", res);
                if (res.data.statusCode == 200) {
                    setShowNext(true);
                    setFlag(true);
                    setFlag2(true);
                    console.log("the result ", res.data.result);
                    setToastMessage(res.data.message)
                    setToastSeverity("success");
                    setOpenToast(true);
                    setFlagProceed(true)
                }
            }
        } catch (error) {
            alert("Data has not saved", error);
            console.log(error.message);
        }
    };
    return (
        <>
            <div>
                <Modal
                    open={openAlertSave}
                    onClose={handleAlertSaveClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleAlertOpenSave}>
                        <Alert severity="warning"
                            className={classes.cookieAlert}
                            sx={{ height: 230, p: 3 }}
                        >
                            <AlertTitle>
                                <Typography id="modal-modal-title" variant="h3" sx={{ color: "rgba(102,60,0)" }} component="h2">
                                    Warning
                                </Typography>
                            </AlertTitle>
                            <Typography id="modal-modal-description" variant="subtitle1" component="body" sx={{ mt: 2, bgcolor: "#fff4e5" }}>
                                Please review your details carefully before submission as changes will not be possible after submission or refreshing the page. Ensure accuracy before proceeding.
                            </Typography>
                            <Box sx={{ mt: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "flex-end" }}>
                                <Button variant="contained" sx={{ mb: { xs: 2, md: 0 }, mr: { xs: 0, md: 2 } }} size="medium" color="warning"
                                    onClick={() => { savePersonalDetails() }}>
                                    Proceed&nbsp;
                                    <ArrowRightAltIcon />
                                </Button>
                                <Button variant="contained" size="medium" color="info" onClick={() => { handleAlertSaveClose() }}>
                                    Cancel
                                </Button>
                            </Box>
                        </Alert>
                    </Box>
                </Modal>
            </div>
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardContent>
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <Snackbar
                                        open={openToast}
                                        autoHideDuration={6000}
                                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                        onClose={handleClose}
                                        TransitionComponent={TransitionLeft}
                                    >
                                        <Alert onClose={handleClose} severity={toastSeverity}
                                            sx={{
                                                width: '100%',
                                                padding: { sm: '15px', xs: '10px' },
                                                borderRadius: '15px',
                                                fontSize: { sm: '16px', xs: '14px' },
                                                boxShadow: "0 0 10px #999",
                                                marginTop: { sm: '25px', xs: '20px' }
                                            }}>
                                            {toastMessage}
                                        </Alert>
                                    </Snackbar>
                                </div>
                                <Card sx={{ boxShadow: "none" }}>
                                    <CardContent>
                                        <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                <PersonIcon sx={{ fontSize: "25px", color: '#246cb5' }} />
                <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Employee Personal Details</H3>
              </div>
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
                                            <Grid item xs={12} sm={4} md={4} lg={8}>
                                                <Grid container direction="row" rowSpacing={0} columnSpacing={2} justify="flex-end" alignItems="center" sx={{ mb: 1 }}>
                                                <Grid item xs={12} sm={6} md={6} lg={6}>
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
                                                            label="Prefix"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                            error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <TextField
                                                            fullWidth
                                                            id="Name"
                                                            name="Name"
                                                            label="First Name"
                                                            size="small"
                                                            margin="normal"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.Name}
                                                            error={formik.touched.Name && !!formik.errors.Name}
                                                            helperText={formik.touched.Name && formik.errors.Name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <TextField
                                                            fullWidth
                                                            id="Name"
                                                            name="Name"
                                                            label="Middle Name"
                                                            size="small"
                                                            margin="normal"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.Name}
                                                            error={formik.touched.Name && !!formik.errors.Name}
                                                            helperText={formik.touched.Name && formik.errors.Name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <TextField
                                                            fullWidth
                                                            id="Name"
                                                            name="Name"
                                                            label="Last Name"
                                                            size="small"
                                                            margin="normal"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.Name}
                                                            error={formik.touched.Name && !!formik.errors.Name}
                                                            helperText={formik.touched.Name && formik.errors.Name}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    rowSpacing={0}
                                                    columnSpacing={2}
                                                    justify="flex-end"
                                                    alignItems="center"
                                                    sx={{ mb: 1 }}
                                                >
                                                                 <Grid item xs={12} sm={6} md={6} lg={6}>
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
                                                            label="Gender"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                            error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                    adapterLocale={"en-gb"}
                                                >
                                                    <DatePicker
                                                        label="Date of Birth"
                                                        inputFormat="DD-MM-YYYY"
                                                        id="dob"
                                                        name="dob"
                                                        value={formik.values.dob}
                                                        InputLabelProps={{ shrink: true }}
                                                        onChange={(value) => { if (value === null) { formik.setFieldValue("age", "") } else { ageValidator(value) } }}
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
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <ImageUploadCard
                                                    OnUploadImage={handleFileChangeImg}
                                                    uploadedImage={setUploadedImage}
                                                    image={image}
                                                />
                                                {imageName != '' ?
                                                    <div
                                                        style={{
                                                            color: "green",
                                                            // marginBottom: "3px",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        <p>Uploaded Image : {imageName}</p>
                                                    </div>
                                                    :
                                                    <div
                                                        style={{
                                                            color: "red",
                                                            // marginBottom: "3px",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        <p>
                                                            <b>Note:</b> Please upload Latest passport size
                                                            photo
                                                        </p>
                                                    </div>
                                                }
                                            </Grid>
                                        </Grid>
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
                                                <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="nationality"
                                                    name="nationality"
                                                    options={nationalityList}
                                                    value={
                                                        nationalityList.find(
                                                            (option) =>
                                                                option.id ===
                                                                formik.values.nationality
                                                        ) || null
                                                    }
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("nationality", null);
                                                        } else formik.setFieldValue("nationality", value.id);
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Height"
                                                            required
                                                            onBlur={formik.handleBlur}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? formik.errors.nationality
                                                                    : null
                                                            }
                                                            error={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            type="text"
                                                            id="identificationMarks"
                                                            name="identificationMarks"
                                                            label="Height"
                                                            InputLabelProps={{ shrink: true }}
                                                            size="small"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.identificationMarks}
                                                            error={formik.touched.identificationMarks && !!formik.errors.identificationMarks}
                                                            helperText={formik.touched.identificationMarks && formik.errors.identificationMarks}
                                                        />
                                                    </Grid>
                                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            type="text"
                                                            id="identificationMarks"
                                                            name="identificationMarks"
                                                            label="Identification Mark 1(Acc to SSC)"
                                                            InputLabelProps={{ shrink: true }}
                                                            size="small"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.identificationMarks}
                                                            error={formik.touched.identificationMarks && !!formik.errors.identificationMarks}
                                                            helperText={formik.touched.identificationMarks && formik.errors.identificationMarks}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <TextField
                                                            margin="normal"
                                                            fullWidth
                                                            required
                                                            type="text"
                                                            id="employeeid"
                                                            name="employeeid"
                                                            label="Father's Name"
                                                            InputLabelProps={{ shrink: true }}
                                                            //   autoComplete="email"
                                                            InputProps={{
                                                                readOnly: true
                                                            }}
                                                            size="small"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.employeeid}
                                                            error={formik.touched.employeeid && !!formik.errors.employeeid}
                                                            helperText={formik.touched.employeeid && formik.errors.employeeid}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <TextField
                                                            margin="normal"
                                                            fullWidth
                                                            required
                                                            type="text"
                                                            id="employeeid"
                                                            name="employeeid"
                                                            label="Mother's Name"
                                                            InputLabelProps={{ shrink: true }}
                                                            //   autoComplete="email"
                                                            InputProps={{
                                                                readOnly: true
                                                            }}
                                                            size="small"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.employeeid}
                                                            error={formik.touched.employeeid && !!formik.errors.employeeid}
                                                            helperText={formik.touched.employeeid && formik.errors.employeeid}
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
                                                            label="Marital Status"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
                                                            error={formik.errors.Gender && formik.touched.Gender ? true : false}
                                                        />
                                                    )}
                                                />
                                                </Grid>
                                                {(formik.values.maritalStatus===150 || formik.values.maritalStatus===148 || formik.values.maritalStatus===149 ||formik.values.maritalStatus===151) && ( 
                                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="age"
                                                    label="Spouse Name(Husband/Wife)"
                                                    InputLabelProps={{ shrink: true }}
                                                    name="age"
                                                    size="small"
                                                    value={formik.values.age || ""}
                                                // onChange={formik.handleChange}
                                                // onBlur={formik.handleBlur}
                                                // error={formik.touched.age && Boolean(formik.errors.age)}
                                                // helperText={formik.touched.age && formik.errors.age}
                                                // disabled={true}
                                                />
                                            </Grid>
                                                )}
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                    <FormControl>
                                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                                           Disability (yes/no)
                                                        </FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="physicallyHandicapped"
                                                            value={formik.values.physicallyHandicapped}
                                                            onChange={(e) => {
                                                                formik.setFieldValue("disabilityPercentage", "");
                                                                formik.setFieldValue("disabilitype", "");
                                                                setPwdUploadedFile(null);
                                                                setPwdVirtualPath('');
                                                                formik.handleChange(e);
                                                            }}
                                                        >
                                                            <FormControlLabel
                                                                value="true"
                                                                control={<Radio />}
                                                                label="Yes" />
                                                            <FormControlLabel
                                                                value="false"
                                                                control={<Radio />}
                                                                label="No" />
                                                        </RadioGroup>
                                                        {formik.touched.physicallyHandicapped &&
                                                            formik.errors.physicallyHandicapped && (
                                                                <FormHelperText error>
                                                                    {formik.errors.physicallyHandicapped}
                                                                </FormHelperText>
                                                            )}
                                                    </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                    <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="nationality"
                                                    name="nationality"
                                                    options={nationalityList}
                                                    value={
                                                        nationalityList.find(
                                                            (option) =>
                                                                option.id ===
                                                                formik.values.nationality
                                                        ) || null
                                                    }
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("nationality", null);
                                                        } else formik.setFieldValue("nationality", value.id);
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Type of Disability"
                                                            required
                                                            onBlur={formik.handleBlur}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? formik.errors.nationality
                                                                    : null
                                                            }
                                                            error={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    )}
                                                />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                    <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            type="text"
                                                            id="disabilityPercentage"
                                                            name="disabilityPercentage"
                                                            label="Percentage of Disability"
                                                            size="small"
                                                            InputLabelProps={{ shrink: true }}
                                                            onChange={(e) => {
                                                                if (e.target.value < 0 || e.target.value > 100) {
                                                                    alert("Disability Percentage should be between 0 and 100")
                                                                    formik.setFieldValue("disabilityPercentage", "")
                                                                    return;
                                                                }
                                                                else {
                                                                    formik.setFieldValue("disabilityPercentage", e.target.value)
                                                                }
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.disabilityPercentage}
                                                            error={formik.touched.disabilityPercentage && !!formik.errors.disabilityPercentage}
                                                            helperText={formik.touched.disabilityPercentage && formik.errors.disabilityPercentage}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="nationality"
                                                    name="nationality"
                                                    options={nationalityList}
                                                    value={
                                                        nationalityList.find(
                                                            (option) =>
                                                                option.id ===
                                                                formik.values.nationality
                                                        ) || null
                                                    }
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("nationality", null);
                                                        } else formik.setFieldValue("nationality", value.id);
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Blood Group"
                                                            required
                                                            onBlur={formik.handleBlur}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? formik.errors.nationality
                                                                    : null
                                                            }
                                                            error={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    id="personalemail"
                                                    name="personalemail"
                                                    label="Personal Email ID"
                                                    size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.personalemail}
                                                    error={formik.touched.personalemail && !!formik.errors.personalemail}
                                                    helperText={formik.touched.personalemail && formik.errors.personalemail}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    id="personalemail"
                                                    name="personalemail"
                                                    label="Personal Mobile Number"
                                                    size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.personalemail}
                                                    error={formik.touched.personalemail && !!formik.errors.personalemail}
                                                    helperText={formik.touched.personalemail && formik.errors.personalemail}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    id="personalemail"
                                                    name="personalemail"
                                                    label="Official Email Id"
                                                    size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.personalemail}
                                                    error={formik.touched.personalemail && !!formik.errors.personalemail}
                                                    helperText={formik.touched.personalemail && formik.errors.personalemail}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    id="personalemail"
                                                    name="personalemail"
                                                    label="Official Mobile Number"
                                                    size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.personalemail}
                                                    error={formik.touched.personalemail && !!formik.errors.personalemail}
                                                    helperText={formik.touched.personalemail && formik.errors.personalemail}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="nationality"
                                                    name="nationality"
                                                    options={nationalityList}
                                                    value={
                                                        nationalityList.find(
                                                            (option) =>
                                                                option.id ===
                                                                formik.values.nationality
                                                        ) || null
                                                    }
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("nationality", null);
                                                        } else formik.setFieldValue("nationality", value.id);
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Nationality"
                                                            required
                                                            onBlur={formik.handleBlur}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? formik.errors.nationality
                                                                    : null
                                                            }
                                                            error={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="nationality"
                                                    name="nationality"
                                                    options={nationalityList}
                                                    value={
                                                        nationalityList.find(
                                                            (option) =>
                                                                option.id ===
                                                                formik.values.nationality
                                                        ) || null
                                                    }
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("nationality", null);
                                                        } else formik.setFieldValue("nationality", value.id);
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Social Category"
                                                            required
                                                            onBlur={formik.handleBlur}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? formik.errors.nationality
                                                                    : null
                                                            }
                                                            error={
                                                                formik.errors.nationality &&
                                                                    formik.touched.nationality
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="religion"
                                                    name="religion"
                                                    options={religionList}
                                                    value={
                                                        religionList.find(
                                                            (option) =>
                                                                option.id === formik.values.religion
                                                        ) || null
                                                    }
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("religion", null);
                                                        } else formik.setFieldValue("religion", value.id);
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2, mb: 1 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Religion"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={
                                                                formik.errors.religion &&
                                                                    formik.touched.religion
                                                                    ? formik.errors.religion
                                                                    : null
                                                            }
                                                            error={
                                                                formik.errors.religion &&
                                                                    formik.touched.religion
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    id="pancard"
                                                    name="pancard"
                                                    label="PAN Number"
                                                    size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.pancard}
                                                    error={formik.touched.pancard && !!formik.errors.pancard}
                                                    helperText={formik.touched.pancard && formik.errors.pancard}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    id="Aadhaar"
                                                    name="Aadhaar"
                                                    label="Aadhaar Number"
                                                    size="small"
                                                    InputLabelProps={{ shrink: true }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Aadhaar}
                                                    error={formik.touched.Aadhaar && !!formik.errors.Aadhaar}
                                                    helperText={formik.touched.Aadhaar && formik.errors.Aadhaar}
                                                />
                                            </Grid>
                                                    </Grid>
                                    </CardContent>
                                    </Card>
                                    <h6 lineHeight={2.2}>
                                            <PersonIcon sx={{ mr: 1 }} />
                                            <b> Current Employee Official Details</b>
                                        </h6>
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
                                            <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="EmployeeType"
                                                    name="EmployeeType"
                                                    // options={genderList}
                                                    // value={genderList.find(
                                                    //     (option) => option.id === formik.values.Gender
                                                    // ) || null}
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("EmployeeType", null)
                                                        }
                                                        else
                                                            formik.setFieldValue("EmployeeType", value.id)
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2 }}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Employee Type"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={formik.errors.EmployeeType && formik.touched.EmployeeType ? formik.errors.EmployeeType : null}
                                                            error={formik.errors.EmployeeType && formik.touched.EmployeeType ? true : false}
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
                                            <Grid item xs={12} sm={4} md={4} lg={4}>  
                                            <Autocomplete
                                                    disablePortal
                                                    margin="normal"
                                                    size="small"
                                                    id="Cadre"
                                                    name="Cadre"
                                                    // options={genderList}
                                                    // value={genderList.find(
                                                    //     (option) => option.id === formik.values.Gender
                                                    // ) || null}
                                                    onChange={(e, value) => {
                                                        if (value === null) {
                                                            formik.setFieldValue("Cadre", null)
                                                        }
                                                        else
                                                            formik.setFieldValue("Cadre", value.id)
                                                    }}
                                                    getOptionLabel={(value) => value.label}
                                                    sx={{ width: "100%", mt: 2 }}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                            label="Cadre"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onBlur={formik.handleBlur}
                                                            helperText={formik.errors.Cadre && formik.touched.Cadre ? formik.errors.Cadre : null}
                                                            error={formik.errors.Cadre && formik.touched.Cadre ? true : false}
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
                                                            label="Parent Department"
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
                                                            label="Current Department"
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
                                                            label="Current Designation"
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
                                                            label="Current Office"
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
                                                            label="Pay Revision"
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
                                                            label="Pay Scale/ Pay Band/ Pay Level"
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
                                                            fullWidth
                                                            id="Name"
                                                            name="Name"
                                                            label="Grade Pay"
                                                            size="small"
                                                            margin="normal"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.Name}
                                                            error={formik.touched.Name && !!formik.errors.Name}
                                                            helperText={formik.touched.Name && formik.errors.Name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <TextField
                                                            fullWidth
                                                            id="Name"
                                                            name="Name"
                                                            label="Basic Pay"
                                                            size="small"
                                                            margin="normal"
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.Name}
                                                            error={formik.touched.Name && !!formik.errors.Name}
                                                            helperText={formik.touched.Name && formik.errors.Name}
                                                        />
                                                    </Grid>
                                    </Grid>
                              <Box display="flex" justifyContent="center" alignItems="center">
                                        <Button
                                            sx={{
                                                minWidth: 100,
                                                ml: 1,
                                                mt: { xs: 1, md: 0 },
                                            }}
                                            variant="contained"
                                            type="submit"
                                            disabled={submitDisable}
                                            onClick={() => {
                                                checkValid();
                                                setFormData((prevFormData) => ({
                                                    ...prevFormData,
                                                    pageone: { formik: formik.values, familyDetailsFormik: familyDetailsFormik.values, image: imageUploadedFile, disable: disableoption, disableOtp: isOtpButtonDisabled, Next: showNext }
                                                }));
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
                                                onButtonClick("pagetwo")
                                            }
                                            }
                                        >
                                            NEXT &nbsp;
                                            <NavigateNextIcon />
                                        </Button>
                                    </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
export default PersonalDetails;
