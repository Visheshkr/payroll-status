
import React, { useEffect, useRef } from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CachedIcon from '@mui/icons-material/Cached';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import FormLabel from '@mui/material/FormLabel';
// import Preview from "./Preview";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from "react-router-dom";
// import Submitted from "./Submited";
import Link from '@mui/material/Link';
import {
    Grid,
    TextField,
    Box,
    Slide, Alert,
    Typography,
    Tooltip,

    Modal,
    AlertTitle,

} from "@mui/material";
import axios from 'axios';
import Cookies from "js-cookie";
import { isValid } from "date-fns";

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



const PageFour = ({ formData, setFormData, prevData, onButtonClick }) => {
    const classes = useAlertSaveStyles();
    const user = useSelector((state) => state.loginReducer);

    const navigate = useNavigate();
    const [bankName, setBankName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [enteredValue, setEnteredValue] = useState('');
    const [accountList, setAccountList] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState("info");
    const [passbookUploadedFile, setPassbookUploadedFile] = useState(null)
    const [requirePassbook, setRequirePassbook] = useState(false)
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
    const [openAlertSave, setOpenAlertSave] = React.useState(false);
    const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(prevData?.disableAadhar || false);
    const [showOtpField, setShowOtpField] = useState(prevData?.showOtpField || false);
    const [disableAadhar, setDisableAadhar] = useState(false);
    const [showLink, setShowLink] = useState(true);
    //const [isSubmitButtonDisabled,setIsSubmitButtonDisabled] =useState(true);
    const [txn, setTxn] = useState('')
    const handleAlertSaveOpen = () => setOpenAlertSave(true);
    const handleAlertSaveClose = () => setOpenAlertSave(false);
    const fileInputRef = useRef(null)
    const handleButtonClick = () => {
        fileInputRef.current.click();
    }
    let selectedFile = []
    const handleFileChange = (event) => {
 
        const File = event.target.files[0];
 
        if (!File) {
            return;
          }
     
          const fileSizeKB = File.size / 1024;
     
          if (fileSizeKB > 200) {
            console.error("File size exceeded");
            alert("Attachment should be less than 200KB");
            setPassbookUploadedFile(null);
            return;
          }
     
          const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
          if (!allowedFormats.includes(File.type)) {
            console.error("Invalid file format");
            alert("Invalid file format. Please choose JPG, PNG, or PDF.");
            setPassbookUploadedFile(null);
            return;
          }
 
        console.log(File.name)
        //  setSelectedFile(File)
 
        selectedFile = event.target.files[0];
        setPassbookUploadedFile(selectedFile)
        if (selectedFile) {
 
            uploadFile()
        }
    }
    const handleCheckboxChange = () => {
        setCheckboxChecked(!checkboxChecked);
    };


    const isSubmitButtonDisabled = !(checkboxChecked && isOtpButtonDisabled);
    // if(checkboxChecked===true && isOtpButtonDisabled===true){
    //  setIsSubmitButtonDisabled(false);
    // }
    console.log(checkboxChecked)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };

    const getFile = (event, attachment) => {
        event.preventDefault();
        const blobData = new Blob([attachment], { type: attachment?.type });
        const blobUrl = URL.createObjectURL(blobData);

        window.open(blobUrl, '_blank');
    }
    const validationSchema = Yup.object().shape({


        ifscCode: Yup.string().required("IFSC Code is required"),
        // branchName: Yup.string().required("Branch Name is required"),
        // bankName: Yup.string().required("Bank Name is required"),
        AccountTypes: Yup.string().required("Account Type is required").nullable(),
        // passbookVirtualPath: Yup.string().required("PassBook Attachment is required"),
        accholdername: Yup.string().required("Account Holder Name is required"),
        accountNumber: Yup.string()
            .matches(/^[0-9]{9,18}$/, 'Invalid account number')
            .required('Account number is required'),
        Aadhaar: Yup.string()
            .matches(/^[2-9]\d{11}$/, 'Invalid aadhar number')
            .matches(/^[0-9]*$/, 'Invalid aadhar number')
            .required('Aadhar number is required'),



    });

    const formik = useFormik({
        initialValues: {
            ifscCode: '',
            branchName: '',
            bankName: '',
            accholdername: '',
            accountNumber: '',
            AccountTypes: '',
            passbookVirtualPath: '',
            Aadhaar: '',
            otp: '',
            passBookFile: '',
            passBookFileName: '',

            // Add initial values for other fields
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission or API integration here
        },
    });


    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/bankDetails/${user.data.userdetails.user.userId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(response => {

            formik.setFieldValue("ifscCode", response.data.result[1].branchId.ifscCode)
            formik.setFieldValue("branchName", response.data.result[1].branchId.branchName)
            formik.setFieldValue("bankName", response.data.result[1].branchId.bankId.bankName)
            formik.setFieldValue("accountNumber", response.data.result[1].accNo)
            formik.setFieldValue("accholdername", response.data.result[1].accHolderName)
            formik.setFieldValue("AccountTypes", response.data.result[1].empAccountType.typeId)
            formik.setFieldValue("passBookFile", response.data.result[1].filePath)
            formik.setFieldValue("passbookVirtualPath", response.data.result[1].filePath)
            formik.setFieldValue("passBookFileName", response.data.result[1].fileName)
            setBranchName(response.data.result[1].branchId.branchName)
            setBankName(response.data.result[1].branchId.bankId.bankName)
            if (response.data.result[1].filePath != '') {
                setShowLink(false);
            }


        })
            .catch(error => {

                console.log(error);
            });
    }

    console.log(formik.values)




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

    const handleTextfield = (e) => {
        const newValue = e.target.value;
        setEnteredValue(newValue);
    }

    const checkValid = () => {


        formik
            .validateForm()
            .then((formErrors) => {
                if (Object.keys(formErrors).length > 0) {

                    console.log(Object.keys(formErrors))
                    setToastMessage("Please fill all the fields and upload attachment")
                    setToastSeverity("error");
                    setOpenToast(true);
                    // if (Object.keys(formik.formErrors).includes("passbookVirtualPath")) {
                    //     setRequirePassbook(true);
                    //     console.log("mm")
                    // }

                } else {
                    let isValidate = "Pass"
                    let alertMsg = ""
                    if (formik.values.passbookVirtualPath === '') {
                        alertMsg = alertMsg + "Please Upload the Bank PassBook\n";
                        isValidate = "Fail"
                    }
                    if (checkboxChecked === false) {
                        alertMsg = alertMsg + "Make sure to check the Declaration Checkbox\n";
                        isValidate = "Fail"
                    }
                    if (isOtpButtonDisabled === false) {
                        alertMsg = alertMsg + "Please Validate your Aadhar Number\n";
                        isValidate = "Fail"
                    }
                    if (isValidate === "Pass") {
                        handleAlertSaveOpen();
                    }
                    else {
                        alert(alertMsg);
                    }



                }
            })
            .catch((err) => {
                formik.setSubmitting(false);
            });
    };


    // useEffect(() => {
    //     if (enteredValue.length === 11) {
    //         let req = {
    //             "ifscCode": enteredValue
    //         }
    //         axios.post(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/branchname`, req).then(response => {

    //             console.log(response.data.result.branchList.bankId.bankName)
    //             console.log(response.data.result.branchList.branchName)
    //             setBranchName(response.data.result.branchList.branchName);
    //             setBankName(response.data.result.branchList.bankId.bankName);

    //         })
    //             .catch(error => {
    //                 setBranchName([]);
    //                 setBankName([]);
    //                 console.log(error);
    //             });
    //     } else {
    //         setBranchName([]);
    //         setBankName([]);
    //     }

    // }, [enteredValue]);

    useEffect(() => {


        fetchData()
        checkEnrollmentStatus()
        if (prevData != undefined) {
            formik.setValues(prevData.formik);
            setBranchName(prevData?.branchName || "");
            setBankName(prevData?.bankName || "")
        }
        axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/initiate-dropdown`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(response => {
            let sortedAccountData = response.data.result.AccountTypes.map((value) => {

                value.AccountTypes = value.AccountTypes
                return value;

            })
            console.log(sortedAccountData);
            setAccountList(sortedAccountData)

        })
            .catch(error => {
                setAccountList([]);
                console.log(error);
            });
    }, []);


    const ValidateOtp = async () => {
        let regex = new RegExp(/[0-9]{6}/)
        if (formik.values.otp != '') {
            if (regex.test(formik.values.otp) === false) {
                alert("Otp must be of 6 digits");
            }
            else {
                try {
                    let body = {
                        "uid": formik.values.Aadhaar,
                        "txn": txn,
                        "otp": formik.values.otp
                    }
                    const config = {
                        headers: {
                            //   "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
                    }
                    const res = await axios.post(
                        `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/validateAdharOtp`,
                        body,
                        config
                        // {
                        //     headers:{
                        //         Authorization: `Bearer ${Cookies.get("token")}`
                        //     }
                        // }
                    );
                    if (res.data.statusCode === 200) {
                        setShowOtpField(false);
                        setIsOtpButtonDisabled(true);
                        setDisableAadhar(true);
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

    const getOtp = async () => {

        // console.log(localStorage.getItem("token"))
        let regex = new RegExp(/[2-9]{1}[0-9]{11}/)
        if (formik.values.Aadhaar != '') {
            if (regex.test(formik.values.Aadhaar) == false || formik.values.Aadhaar.length != 12) {
                alert("Please Enter Valid Aadhar Number.Aadhar Number must have 12 digits");
            }
            else {
                //setShowOtpField(true)
                setIsTimerRunning(true)
                setIsOtpButtonDisabled(true)
                // setTimer(60)

                try {
                    let body = {
                        "uid": formik.values.Aadhaar
                    }
                    const config = {
                        headers: {
                            //   "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("token")}`
                        }
                    }
                    const res = await axios.post(
                        `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/getAdharOTP`,
                        body,
                        config

                    );
                    if (res.data.statusCode === 200) {
                        setTxn(res.data.result.transaction);
                        setToastMessage(res.data.message)
                        setToastSeverity("success");
                        setOpenToast(true);
                        setStatusMessage("OTP Expires in : ")
                        setShowOtpField(true)
                        setIsOtpButtonDisabled(true)

                        // //setShowOtpField(true)
                        // setIsTimerRunning(true)
                        // //setIsOtpButtonDisabled(true)




                    }
                    else {
                        setToastMessage(res.data.message)
                        setToastSeverity("error");
                        setOpenToast(true);
                        setIsTimerRunning(false)
                        setIsOtpButtonDisabled(false)
                        setShowOtpField(false)
                        setStatusMessage('Invalid Aadhar Number')
                        alert(res.data.message + " Please ensure valid Aadhar Number is entered or not")

                    }
                }

                catch (error) {
                    // setLoadingInd(false);
                    console.log(error.message);
                    setIsOtpButtonDisabled(false)
                }
            }
        }
        if (formik.values.Aadhaar === '') {
            alert("please enter Aadhar Number")
        }


    }

    const saveBankDetails = async (data) => {


        try {
            let body = {
                userId: user.data.userdetails.user.userId,
                accNo: formik.values.accountNumber,
                empAccountType: formik.values.AccountTypes,
                accHolderName: formik.values.accholdername,
                ifscCode: formik.values.ifscCode,
                filePath: formik.values.passbookVirtualPath,
                // crtBy: user.data.userdetails.user.userId,
                // updBy: user.data.userdetails.user.userId,


            };


            console.log("the saved details  body", body);
            const res = await axios.post(
                `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/saveBankDetails`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`
                    }
                }
            );
            console.log("the saved details  areeeeee", res);
            if (res.data.statusCode == 200) {
                console.log("the result ", res.data.result);
                setToastMessage(res.data.message)
                setToastSeverity("success");
                setOpenToast(true);
                // navigate('/Submitted')
                navigate('/BasicEmploymentFormPreview')
            }
        } catch (error) {
            alert("Data has not saved", error);
            console.log(error.message);
        }
    };

    const uploadFile = async () => {
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
            console.log(res.data.result);

            if (res.data.statusCode == 200) {
                console.log("uploaded successfully")
                setShowLink(true)
                formik.setFieldValue("passBookFile", selectedFile);
                formik.setFieldValue("passBookFileName", selectedFile.name);
                formik.setFieldValue("passbookVirtualPath", res.data.result[selectedFile.name])
                setToastMessage(selectedFile.name + " file uploaded successfully")
                setToastSeverity("success");
                setOpenToast(true);


            } else {
                console.log('bad request');
            }
        } catch (error) {
            // setLoadingInd(false);
            console.log(error.message);
        }
    };
    const [newotpdata, setnewotp] = useState("")
    const [newotptext, setnewotptext] = useState(false)
    const [oldotptext, setoldotptext] = useState([])
    const [isTimerRunning, setIsTimerRunning] = useState(false)


    const [statusmessage, setStatusMessage] = useState("OTP Expires in : ");
    const [timer, setTimer] = useState(600);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(10);
    const [status, setStatus] = useState(true);
    const id = useRef(null);
    const clear = () => {
        window.clearInterval(id.current);
    };
    useEffect(() => {
        console.log(isTimerRunning)
        let interval;
        if (isTimerRunning === true && timer > 0) {
            id.current = window.setInterval(() => {
                setTimer((time) => time - 1);
            }, 1000);
            //    interval = setInterval(()=>{
            //     setTimer((timer) => timer-1)
            //    },1000)

        }
        return () => clear();

    }, [isTimerRunning, timer]);

    useEffect(() => {
        console.log(timer);
        console.log(minute);
        console.log(second);
        console.log(statusmessage)
        if (timer === 0 || minute < 0 || second === -1) {
            setStatusMessage("Want to Resend OTP?");
            setIsTimerRunning(false)
            clear();
        }
        if (second > 0) {
            setSecond(second - 1);
        }
        if (timer === 0) {
            setStatus(false);
        }
    }, [timer]);

    function calculator(seconds) {
        if (second === 0) {
            setSecond(59);
            if (minute >= 0) {
                setMinute(minute - 1);
            }
        }
        //console.log(minute + ":" + second);
        if (minute > 1) {
            return minute + " Mins " + second + " Seconds";
        } else {
            return minute + " Min " + second + " Seconds";
        }
    }

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


                }
                if (response.data.result.stepId === 31 || response.data.result.stepId === 32 || response.data.result.stepId === 33) {
                    setSubmitDisable(false);

                }
            }
            if (response.data.statusCode === 404) {
                setSubmitDisable(false)

            }
        })
    }




    return (
        <>
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
                                onClick={() => {
                                    saveBankDetails();

                                }}>
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
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <Snackbar
                        open={openToast}
                        autoHideDuration={6000}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        onClose={handleClose}
                        TransitionComponent={TransitionLeft}
                    >
                        <Alert onClose={handleClose} severity={toastSeverity} sx={{ width: '100%', padding: { sm: '15px', xs: '10px' }, borderRadius: '15px', fontSize: { sm: '16px', xs: '14px' }, boxShadow: "0 0 10px #999", marginTop: { sm: '25px', xs: '20px' } }}>
                            {toastMessage}
                        </Alert>
                    </Snackbar>
                </div>
                <div style={{ padding: "0px 60px", marginBottom: "5px" }}>


                    <AccordionDetails>
                        <div style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
                            <p><b>Note:</b> Please fill the Bank Details, all fields are mandatory</p>
                        </div>
                        <Grid
                            container
                            direction="row"
                            rowSpacing={0}
                            columnSpacing={2}
                            justify="flex-end"
                            alignItems="center"
                            sx={{ mb: 2 }}

                        >
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="ifscCode"
                                    label="IFSC Code"
                                    name="ifscCode"
                                    value={formik.values.ifscCode || ""}
                                    // value={enteredValue}
                                    size="small"
                                    // onChange={handleTextfield}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        formik.handleChange(e)
                                        if (e.target.value.length === 11) {
                                            let req = {
                                                "ifscCode": e.target.value
                                            }
                                            axios.post(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/branchname`, req, {
                                                headers: {
                                                    Authorization: `Bearer ${Cookies.get("token")}`
                                                }
                                            }).then(response => {
                                                console.log(response.data.result)
                                                console.log(response.data.result.branchList.bankId.bankName)
                                                console.log(response.data.result.branchList.branchName)
                                                setBranchName(response.data.result.branchList.branchName);
                                                setBankName(response.data.result.branchList.bankId.bankName);

                                            })
                                                .catch(error => {
                                                    setBranchName("");
                                                    setBankName("");
                                                    console.log(error);
                                                });
                                        }
                                        else {
                                            setBranchName("");
                                            setBankName("");
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.ifscCode &&
                                        Boolean(formik.errors.ifscCode)
                                    }
                                    helperText={
                                        formik.touched.ifscCode &&
                                        formik.errors.ifscCode
                                    }

                                />

                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <Tooltip title={isDistrictDisabled ? "Please fill IFSC Code first" : ""} arrow>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="bankName"
                                        label="Bank Name"
                                        name="bankName"
                                        // value={formik.values.branchName}
                                        value={bankName}
                                        size="small"
                                        onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    // error={
                                    //     formik.touched.bankName &&
                                    //     Boolean(formik.errors.bankName)
                                    // }
                                    // helperText={
                                    //     formik.touched.bankName &&
                                    //     formik.errors.bankName
                                    // }

                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <Tooltip title={isDistrictDisabled ? "Please fill IFSC Code first" : ""} arrow>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="branchName"
                                        label="Branch Name"
                                        name="branchName"

                                        // value={formik.values.branchName}
                                        value={branchName}
                                        size="small"
                                        onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    // error={
                                    //     formik.touched.branchName &&
                                    //     Boolean(formik.errors.branchName)
                                    // }
                                    // helperText={
                                    //     formik.touched.branchName &&
                                    //     formik.errors.branchName
                                    // }

                                    />
                                </Tooltip>
                            </Grid>


                        </Grid>
                        <Grid
                            container
                            direction="row"
                            rowSpacing={0}
                            columnSpacing={2}
                            justify="flex-end"
                            alignItems="center"
                            sx={{ mb: 2 }}

                        >
                            <Grid item xs={12} sm={4} md={4} lg={4}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="accountNumber"
                                    label="Account Number"
                                    name="accountNumber"
                                    value={formik.values.accountNumber || ""}
                                    size="small"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.accountNumber &&
                                        Boolean(formik.errors.accountNumber)
                                    }
                                    helperText={
                                        formik.touched.accountNumber &&
                                        formik.errors.accountNumber
                                    }

                                />

                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4}>

                                <Autocomplete
                                    disablePortal
                                    margin="0"
                                    fullWidth
                                    size="small"
                                    id="AccountTypes"
                                    name="AccountTypes"
                                    options={accountList}
                                    value={accountList.find(
                                        (option) => option.valueId === formik.values.AccountTypes
                                    ) || null}
                                    onChange={(e, value) => {
                                        console.log(value)
                                        if (value === null) {
                                            formik.setFieldValue("AccountTypes", null)
                                        }
                                        else
                                            formik.setFieldValue("AccountTypes", value.valueId)
                                    }}


                                    getOptionLabel={(value) => value.valueName}
                                    sx={{ width: "100%", mt: 2 }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            required
                                            label="Account Type"
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.AccountTypes && formik.touched.AccountTypes ? formik.errors.AccountTypes : null}
                                            error={formik.errors.AccountTypes && formik.touched.AccountTypes ? true : false}
                                        />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="accholdername"
                                    label="Account Holder Name"
                                    name="accholdername"
                                    value={formik.values.accholdername || ""}
                                    size="small"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.accholdername &&
                                        Boolean(formik.errors.accholdername)
                                    }
                                    helperText={
                                        formik.touched.accholdername &&
                                        formik.errors.accholdername
                                    }

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
                            sx={{ mb: 2 }}

                        >
                            <Grid item xs={12} sm={4} md={4} lg={4}>

                                <Button sx={{ mb: 2 }} component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleButtonClick}>
                                    Upload Bank PassBook
                                </Button>
                                <VisuallyHiddenInput
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                {formik.values.passBookFile != "" && (
                                    <>
                                        {showLink === true ? (
                                            <Link href="#" underline="none" onClick={(event) => { getFile(event, formik.values.passBookFile) }}>
                                                <Typography>Uploaded File: {formik.values.passBookFileName}</Typography>
                                            </Link>
                                        ) :
                                            <Typography sx={{ color: "green", fontSize: "12px" }}>Uploaded File: {formik.values.passBookFileName}</Typography>
                                        }
                                    </>
                                )}

                            </Grid>
                            {/* {formik.values.passbookVirtualPath=== "" &&
                                <Typography>Please upload Bank PassBook</Typography>

                            } */}

                        </Grid>
                        <Grid
                            container
                            direction="row"
                            rowSpacing={0}
                            columnSpacing={2}
                            justify="flex-end"
                            alignItems="center"
                            sx={{ mb: 2 }}

                        >
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    id="Aadhaar"
                                    name="Aadhaar"
                                    label="Aadhaar Number"
                                    disabled={disableAadhar}
                                    size="small"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Aadhaar}
                                    error={formik.touched.Aadhaar && !!formik.errors.Aadhaar}
                                    helperText={formik.touched.Aadhaar && formik.errors.Aadhaar}
                                />
                            </Grid>

                            {isOtpButtonDisabled === false && (
                                <Grid item xs={12} sm={2} md={2} lg={2}>
                                    <Button
                                        sx={{
                                            minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
                                        }}
                                        variant="contained"
                                        //disabled={isOtpButtonDisabled}

                                        onClick={() => {

                                            getOtp()

                                            //saveBankDetails()
                                            // onButtonClick("pagetwo")
                                        }}
                                    >
                                        Get Otp

                                    </Button>
                                </Grid>
                            )}
                            {showOtpField && (
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth

                                        id="otp"
                                        name="otp"
                                        label="Otp"
                                        size="small"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.otp}
                                        error={formik.touched.otp && !!formik.errors.otp}
                                        helperText={formik.touched.otp && formik.errors.otp}
                                    />
                                </Grid>
                            )}
                            {showOtpField && (
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <Button
                                        sx={{
                                            minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
                                        }}
                                        variant="contained"
                                        //disabled={isOtpButtonDisabled}

                                        onClick={() => {

                                            ValidateOtp()

                                            //saveBankDetails()
                                            // onButtonClick("pagetwo")
                                        }}
                                    >
                                        Validate Otp

                                    </Button>
                                </Grid>
                            )}
                            {showOtpField && (
                                <>
                                    {statusmessage === "OTP Expires in : " ? (
                                        <Grid item xs={12} sm={4} md={4} lg={4} style={{ color: "red" }}
                                            fontSize={"12px"}
                                        >

                                            <>
                                                {statusmessage}
                                                {calculator(timer)}
                                            </>

                                        </Grid>
                                    ) :
                                        <Grid item xs={12} sm={4} md={4} lg={4}>

                                            <Button
                                                variant="contained"
                                                size="small"
                                                //  disabled={status}

                                                onClick={() => {
                                                    // setIsTimerRunning(true)
                                                    let regex = new RegExp(/[2-9]{1}[0-9]{11}/)
                                                    if (formik.values.Aadhaar != '') {
                                                        if (regex.test(formik.values.Aadhaar) == false || formik.values.Aadhaar.length != 12) {
                                                            alert("Please Enter Valid Aadhar Number.Aadhar Number must have 12 digits");
                                                        }
                                                        else {

                                                            let body = {
                                                                "uid": formik.values.Aadhaar
                                                            }
                                                            const config = {
                                                                headers: {
                                                                    Authorization: `Bearer ${Cookies.get("token")}`
                                                                }
                                                            }
                                                            const url = `${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/getAdharOTP`;
                                                            axios
                                                                .post(
                                                                    url,
                                                                    body, config
                                                                )
                                                                .then(function (response) {
                                                                    //casedetails.length = 0;
                                                                    console.log(response)
                                                                    if (response.data.statusCode === 200) {
                                                                        if (response.data.message) {
                                                                            //applicantidview = res.data.result;
                                                                            // setnewotp(response.data.result.transaction)
                                                                            setTxn(response.data.result.transaction);
                                                                            setShowOtpField(true)
                                                                            setIsOtpButtonDisabled(true)
                                                                            //  alert("OTP Sent Successfully");
                                                                            setToastSeverity("success");
                                                                            setOpenToast(true);
                                                                            setToastMessage(response.data.message)



                                                                        } else {
                                                                            // Handle the case where the message is undefined
                                                                            console.error("Received a response with no message:", response.data);
                                                                            setToastMessage("Received a response with no message")
                                                                            setToastSeverity("error");
                                                                            setOpenToast(true);
                                                                        }
                                                                        console.log("the result ", response.data.result);
                                                                    } else {
                                                                        // Check for the specific condition in the payload
                                                                        if (response.data.statusCode === 401) {
                                                                            setStatusMessage('Invalid Aadhar Number')
                                                                            alert(response.data.message + " Please ensure valid Aadhar Number is entered or not")
                                                                            setIsTimerRunning(false)
                                                                        } else {
                                                                            // Display a generic error message if the condition is not met
                                                                            setToastMessage(response.data.message)
                                                                            setToastSeverity("error");
                                                                            setOpenToast(true);
                                                                            setIsTimerRunning(false)
                                                                            setStatusMessage('Invalid')
                                                                        }
                                                                    }
                                                                })

                                                                .catch(function (error) {
                                                                    console.log(error);
                                                                    setToastMessage(error.response.data.message)
                                                                    setToastSeverity("error");
                                                                    setOpenToast(true);
                                                                });
                                                            setStatus(true);
                                                            setTimer(600)
                                                            setMinute(10)
                                                            setSecond(0)
                                                            setIsTimerRunning(true)
                                                            setStatusMessage("OTP Expires in : ")
                                                            // setStatusMessage("OTP resent successfully");
                                                        }
                                                    }
                                                    if (formik.values.Aadhaar === '') {
                                                        alert("please enter Aadhar Number")
                                                    }
                                                }}

                                        // style={{
                                        //     fontSize: "smaller",
                                        //     textDecoration: "underline",
                                        //     textTransform: "none",
                                        //     // color: "darkgreen"
                                        // }}
                                        >
                                                Resend OTP
                                            </Button>
                                        </Grid>
                                    }
                                </>

                            )}
                        </Grid>

                        <Grid item display={"flex"} justifyContent={"center"} marginTop={3}>

                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row >

                                    <FormControlLabel sx={{
                                        textAlign: "center",
                                        color: "#868686",


                                    }}

                                        value="end"
                                        control={<Checkbox
                                            checked={checkboxChecked}
                                            onChange={handleCheckboxChange}
                                        />}
                                        label="I hereby declare that all the information furnished above is true to the best of my knowledge and I hold the responsibility for the correctness of the above-mentioned particulars. If any deviations found, the Trust can reject my application or take legal action against me."
                                        labelPlacement="end"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>


                    </AccordionDetails>

                    <Box
                        spacing={2}
                        sx={{ margin: 1, textAlign: 'center' }}
                    >

                        <Button
                            type="button"
                            sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                            onClick={() => onButtonClick("pagethree")}
                            variant="outlined"
                            color="primary"
                        >
                            <KeyboardArrowLeftIcon />&nbsp; PREVIOUS
                        </Button>
                        {/* <Button
                            sx={{
                                minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
                            }}
                            variant="contained"
                            //type="submit"
                            
                            onClick={() => {
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    pagefour: { formik: formik.values, branchName: branchName, bankName: bankName, disableAadhar: isOtpButtonDisabled },
                                }));
                                alert("Data entered saved. Please make sure you Submit the page to save the details permanently")
                            }
                            }
                        >
                            SAVE DRAFT
                            <SaveAsIcon sx={{ ml: 0.2 }}/>
                            {/* <SaveAltIcon sx={{ ml: 0.2 }}></SaveAltIcon> */}
                        {/* </Button> */}

                        <Button
                            sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                            variant="contained"
                            disabled={submitDisable}
                            type="submit"
                            onClick={() => {
                                checkValid()
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    pagefour: { formik: formik.values, branchName: branchName, bankName: bankName },
                                }));

                            }}
                        >
                            SUBMIT

                        </Button>

                    </Box>


                </div>
            </form>
        </>
    );
}
export default PageFour;
