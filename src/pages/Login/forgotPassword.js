import React, { useEffect, useRef } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Card, CardContent } from "@mui/material";
import useTitle from '../../hooks/useTitle';
import PageTitle from '../../layouts/PageTitle';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';
import { H3 } from '../../components/Typography';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AlertConfirm from "react-alert-confirm";
import { useSnackbar } from "../../components/Snackbar";
import "react-alert-confirm/lib/style.css";
import LockResetIcon from '@mui/icons-material/LockReset';
import axios from 'axios';
import Cookies from "js-cookie";
import blue_bg from "../../assets/images/BLUE_BG.jpg";
import Divider from '@mui/material/Divider';
const ForgotPassword = () => {
    const { showSnackbar } = useSnackbar();
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState("info");
    const [showotherfield, setShowotherfields] = useState(false);
    const [showuserIdfield, setUserIdfields] = useState(true);
    const [showsendotpButton, setSendopButton] = useState(true);
    const navigate = useNavigate();
    const title = "Forgot Password";
    useTitle(title);


    const validationSchema = Yup.object().shape({
        password: Yup.string().required("New Password is required").nullable(),
        confirmPassword: Yup.string().required("Confirm Password is required").nullable()
            .oneOf([Yup.ref("password")], "New Password and Confirm Password doesn't match"),
        otp: Yup.number().required("Otp Password is required").nullable(),
    });

    const validationSchema1 = Yup.object().shape({
        userId: Yup.string().required("User Id is required").nullable(),
    });

    const formik = useFormik({
        initialValues: {
            confirmPassword: '',
            password: '',
            otp: '',

            // Add initial values for other fields
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission or API integration here
            handleRedirect();
        },
    });

    const formik1 = useFormik({
        initialValues: {
            userId: null,
            // Add initial values for other fields
        },
        validationSchema: validationSchema1,
        onSubmit: (values) => {
            // Handle form submission or API integration here
            handleOtpButton();
        },
    });

    const handleRedirect = () => {

        if (formik.values.password !== formik.values.confirmPassword) {
            showSnackbar("New Password and Confirm Password should be Same", 'warning');
            return;
        }

        callConfirmDialog();
    }

    const handleOtpButton = async () => {
        setIsTimerRunning(true)
        try {

            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/forget-password/sendotp/${formik1.values.userId}`

            );

            if (response.data.statusCode === 200) {
                showSnackbar(response.data.message, 'success');


                console.log("OTP Sent: ", response.data.result);
                setShowotherfields(true);
                setUserIdfields(false);
                setSendopButton(false);
            } else {
                // Show error message if API call was not successful
                showSnackbar(response.data.message, 'error');
            }
        } catch (error) {
            // Handle API call failure
            console.error("Error sending OTP: ", error);
            showSnackbar('Failed to send OTP', 'error');
        }
    };


    const callConfirmDialog = async () => {
        console.log('kp-confirm');
        const [action] = await AlertConfirm({
            title: "Confirm",
            desc: "Are you sure, you want to submit?",
        });
        AlertConfirm.config({
            okText: "Submit",
            cancelText: "Cancel",
        });
        if (action) {
            saveForgotPassword();

        }
        // else {
        //     //   setIsSubmit(false);
        //     showSnackbar('Did not save!', 'error')
        // }
    };


    const saveForgotPassword = async (data) => {
        try {
            let body = {
                username: formik1.values.userId,
                password: formik.values.password,
                otp: parseInt(formik.values.otp, 10),
            };
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/forget-password/validateotp`,
                body,

            );

            
            if (response.data.statusCode === 200) {
                console.log("the result ", response.data.result);
                // setToastMessage(response.data.message)
                showSnackbar(response.data.message, 'success');
                setToastSeverity("success");
                setOpenToast(true);
                navigate('/');
            }


            else {

                showSnackbar(response.data.message, 'error');
            }
        } catch (error) {

            console.error("Error validating OTP and updating password: ", error);
            showSnackbar(error.response.data.message, 'error');
            //alert("Please fill the correct OTP", error);

        }
    };

    const [statusmessage, setStatusMessage] = useState("OTP Expires in : ");
    const [timer, setTimer] = useState(600);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(10);
    const [status, setStatus] = useState(true);
    const [isTimerRunning, setIsTimerRunning] = useState(false)
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
    console.log(timer)


    return (
        <>

            <Box
                sx={{
                    backgroundImage: `url(${blue_bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    sx={{ mx: 3 }}
                >
                    <Card
                    >
                        <CardContent>

                            <div >
                                <H3 sx={{ color: "#2596be" }}><LockResetIcon />&nbsp;Forgot Password</H3>
                            </div>
                            <Divider />
                            {showuserIdfield && (
                                <Box
                                    component={"form"}
                                    onSubmit={formik1.handleSubmit}
                                    noValidate
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="userId"
                                                label="User Id"
                                                name="userId"
                                                value={formik1.values.userId || ""}
                                                size="small"
                                                onChange={formik1.handleChange}
                                                onBlur={formik1.handleBlur}
                                                error={
                                                    formik1.touched.userId &&
                                                    Boolean(formik1.errors.userId)
                                                }
                                                helperText={
                                                    formik1.touched.userId &&
                                                    formik1.errors.userId
                                                }

                                            />
                                        </Grid>

                                        <Box
                                            spacing={2}
                                            sx={{ margin: 1, textAlign: 'center' }}
                                        >

                                            <Button type="submit" variant="contained"
                                                sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }, borderRadius: '4px' }}
                                            //  onClick={handleRedirect}
                                            // onClick={handleOtpButton}

                                            >Send OTP</Button>

                                        </Box>
                                    </Grid>
                                </Box>
                            )}
                            {showotherfield && (
                                <>

                                    <Box
                                        component={"form"}
                                        onSubmit={formik.handleSubmit}
                                        noValidate
                                    >
                                        <Grid
                                            container
                                            spacing={2}
                                            direction="row"
                                            alignItems="center"
                                        >

                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="password"
                                                    label="New Password"
                                                    name="password"
                                                    type="password"
                                                    value={formik.values.password || ""}
                                                    size="small"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.password &&
                                                        Boolean(formik.errors.password)
                                                    }
                                                    helperText={
                                                        formik.touched.password &&
                                                        formik.errors.password
                                                    }

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="confirmPassword"
                                                    label="Confirm Password"
                                                    name="confirmPassword"
                                                    type="password"
                                                    value={formik.values.confirmPassword || ""}
                                                    size="small"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.confirmPassword &&
                                                        Boolean(formik.errors.confirmPassword)
                                                    }
                                                    helperText={
                                                        formik.touched.confirmPassword &&
                                                        formik.errors.confirmPassword
                                                    }

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} lg={3}>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="otp"
                                                    label="OTP"
                                                    name="otp"
                                                    value={formik.values.otp || ""}
                                                    size="small"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched.otp &&
                                                        Boolean(formik.errors.otp)
                                                    }
                                                    helperText={
                                                        formik.touched.otp &&
                                                        formik.errors.otp
                                                    }

                                                />
                                            </Grid>

                                            <Box
                                                spacing={2}
                                                sx={{ margin: 1, textAlign: 'center' }}
                                            >

                                                <Button type="submit" variant="contained"
                                                    sx={{ minWidth: 100, ml: 1, mt: 2, borderRadius: '4px' }}
                                                // onClick={handleRedirect}
                                                //onClick={saveForgotPassword}


                                                >Verify</Button>

                                            </Box>
                                            {statusmessage === "OTP Expires in : " ? (
                                                <Grid item xs={12} sm={3} md={3} lg={3} style={{ color: "red" }}
                                                    fontSize={"12px"}
                                                >

                                                    <>
                                                        {statusmessage}
                                                        {calculator(timer)}
                                                    </>


                                                </Grid>
                                            ) :
                                                <Box
                                                    spacing={2}
                                                    sx={{ margin: 1, textAlign: 'center' }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        // disabled={status}
                                                        sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }, padding: 0.8 }}
                                                        onClick={() => {
                                                            // setIsTimerRunning(true)

                                                            const url = `${process.env.REACT_APP_HOST_API_KEY}/forget-password/sendotp/${formik.values.userId}`;
                                                            axios
                                                                .post(
                                                                    url
                                                                )
                                                                .then(function (response) {
                                                                    //casedetails.length = 0;
                                                                    console.log(response)
                                                                    if (response.data.statusCode === 200) {
                                                                        if (response.data.message) {
                                                                            setToastSeverity("success");
                                                                            setOpenToast(true);



                                                                        } else {
                                                                            // Handle the case where the message is undefined
                                                                            console.error("Received a response with no message:", response.data);
                                                                        }
                                                                        console.log("the result ", response.data.result);
                                                                    } else {
                                                                        // Check for the specific condition in the payload
                                                                        if (response.data.statusCode === 400) {
                                                                            alert("Please enter a valid OTP");
                                                                        } else {
                                                                            // Display a generic error message if the condition is not met
                                                                            alert("Data has not saved. Unexpected response from the server.");
                                                                        }
                                                                    }
                                                                })
                                                                .catch(function (error) {
                                                                    console.log(error);
                                                                });
                                                            setStatus(true);
                                                            setTimer(600)
                                                            setMinute(10)
                                                            setSecond(0)
                                                            setIsTimerRunning(true)
                                                            setStatusMessage("OTP Expires in : ")
                                                            // setStatusMessage("OTP resent successfully");
                                                        }}

                                                    >
                                                        Resend OTP
                                                    </Button>
                                                </Box>
                                            }



                                        </Grid>
                                    </Box>
                                </>

                            )}

                            {/* </Grid> */}
                        </CardContent>
                    </Card>
                </Grid >

            </Box >
        </>
    )
}

export default ForgotPassword;