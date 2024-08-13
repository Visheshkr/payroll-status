import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import React, { useEffect,useRef, useState } from "react";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { useSelector } from "react-redux";
import * as Yup from "yup";
// import Preview from "./Preview";
import { useNavigate } from "react-router-dom";
// import Submitted from "./Submited";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Slide,
  TextField
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "../../components/Snackbar";
import { H3 } from "../../components/Typography";
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
const styleAlertOpenSave = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
};
const useAlertSaveStyles = makeStyles({
  cookieAlert: {
    "& .MuiAlert-icon": {
      fontSize: 40,
    },
  },
});
const PageFour = ({ formData, setFormData, prevData, onButtonClick,view }) => {
  const { showSnackbar } = useSnackbar();
  const classes = useAlertSaveStyles();
  const user = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
  const [openAlertSave, setOpenAlertSave] = React.useState(false);
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(
    prevData?.disableAadhar || false
  );
  const [showLink, setShowLink] = useState(true);
  const [showNext, setShowNext] = useState(view);
  //const [isSubmitButtonDisabled,setIsSubmitButtonDisabled] =useState(true);
  const [txn, setTxn] = useState("");
  const handleAlertSaveOpen = () => setOpenAlertSave(true);
  const handleAlertSaveClose = () => setOpenAlertSave(false);
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  let selectedFile = [];
  const isSubmitButtonDisabled = !(checkboxChecked && isOtpButtonDisabled);
  // if(checkboxChecked===true && isOtpButtonDisabled===true){
  //  setIsSubmitButtonDisabled(false);
  // }
  const textFieldStyles = {
    borderRadius: '5px'
  }
  console.log(checkboxChecked);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };
  const getFile = (event, attachment) => {
    event.preventDefault();
    const blobData = new Blob([attachment], { type: attachment?.type });
    const blobUrl = URL.createObjectURL(blobData);
    window.open(blobUrl, "_blank");
  };
  const validationSchema = Yup.object().shape({
    bankName: Yup.string().required("Bank Name is required"),
    branchName: Yup.string().required("Branch Name is required"),
    ifscCode:  Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code format")
    .required("IFSC Code is required"),
    bankAccNo: Yup.string()
      .matches(/^[0-9]{9,18}$/, "Invalid account number")
      .required("Account number is required"),
    payeeBenefId: Yup.string().required("Pay Beneficiary Id is required"),
  });
  const formik = useFormik({
    initialValues: {
      bankName: "",
      branchName: "",
      ifscCode: "",
      bankAccNo: "",
      payeeBenefId: "",
      // Add initial values for other fields
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission or API integration here
    },
  });
  const checkValid = async () => {
    formik
      .validateForm()
      .then((formErrors) => {
        if (Object.keys(formErrors).length > 0) {
          console.log(Object.keys(formErrors));
          //alert(Object.keys(formErrors))
          setToastMessage("Please fill all the required * fields");
          setToastSeverity("error");
          setOpenToast(true);
        } else {
          callConfirmDialog();
        }
      })
      .catch((err) => {
        formik.setSubmitting(false);
      });
  };

  useEffect(() => {
    if (view) {
      fetchData();
    }
  }, [view]);


  const fetchData = () => {
      axios.get(`http://141.148.194.18:8052/payroll/employee/bank-details/${formData.refNo}`, {
          headers: {
              Authorization: `Bearer ${Cookies.get("token")}`
          }
      }).then(response => {

        const result = response.data.result;
        

          formik.setFieldValue("ifscCode", result.ifscCode);
          formik.setFieldValue("branchName", result.branchName);
          formik.setFieldValue("bankName", result.bankName);
          formik.setFieldValue("bankAccNo",result.bankAccNo);
          formik.setFieldValue("payeeBenefId", result.payeeBenefId)

      })
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const saveBankDetails = async (data) => {
    try {
      let body = {
        // refNo: "BRD0000000000027",
        refNo: localStorage.getItem("refNo"),
        bankName: formik.values.bankName,
        branchName: formik.values.branchName,
        ifscCode: formik.values.ifscCode,
        bankAccNo: formik.values.bankAccNo,
        payeeBenefId: formik.values.payeeBenefId,
      };
      console.log("the saved details  body", body);
      const res = await axios.post(
        `http://141.148.194.18:8052/payroll/employee/bank-details`,
        body,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("the saved details  areeeeee", res);
      if (res.data.statusCode == 200) {
        console.log("the result ", res.data.result);
        showSnackbar(res.data.message, "success");
        setShowNext(true);
        setOpenToast(true);
        setShowNext(true);
        onButtonClick("pagefive");
        // navigate('/Submitted')
        //navigate('/BasicEmploymentFormPreview')
      }
    } catch (error) {
      //alert("Data has not saved", error);
      console.log(error.message);
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
      console.log('kp-saved');
      saveBankDetails();
    }
  };
  const [submitDisable, setSubmitDisable] = useState(false);
  // const checkEnrollmentStatus = () => {
  //     axios.get(`${process.env.REACT_APP_MASTER_API_URL}/employee-enrollment/check-enrollment-status/${user.data.userdetails.user.userId}`, {
  //         headers: {
  //             Authorization: `Bearer ${Cookies.get("token")}`
  //         }
  //     }).then(response => {
  //         if (response.data.statusCode === 200) {
  //             if (response.data.result.stepId === 27 || response.data.result.stepId === 28 || response.data.result.stepId === 29 || response.data.result.stepId === 30) {
  //                 setSubmitDisable(true);
  //             }
  //             if (response.data.result.stepId === 31 || response.data.result.stepId === 32 || response.data.result.stepId === 33) {
  //                 setSubmitDisable(false);
  //             }
  //         }
  //         if (response.data.statusCode === 404) {
  //             setSubmitDisable(false)
  //         }
  //     })
  // }
  return (
    <>
      {/* <Modal
        open={openAlertSave}
        onClose={handleAlertSaveClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleAlertOpenSave}>
          <Alert
            severity="warning"
            className={classes.cookieAlert}
            sx={{ height: 230, p: 3 }}
          >
            <AlertTitle>
              <Typography
                id="modal-modal-title"
                variant="h3"
                sx={{ color: "rgba(102,60,0)" }}
                component="h2"
              >
                Warning
              </Typography>
            </AlertTitle>
            <Typography
              id="modal-modal-description"
              variant="subtitle1"
              component="body"
              sx={{ mt: 2, bgcolor: "#fff4e5" }}
            >
              Please review your details carefully before submission as changes
              will not be possible after submission or refreshing the page.
              Ensure accuracy before proceeding.
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{ mb: { xs: 2, md: 0 }, mr: { xs: 0, md: 2 } }}
                size="medium"
                color="warning"
                onClick={() => {
                  saveBankDetails();
                }}
              >
                Proceed&nbsp;
                <ArrowRightAltIcon />
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="info"
                onClick={() => {
                  handleAlertSaveClose();
                }}
              >
                Cancel
              </Button>
            </Box>
          </Alert>
        </Box>
      </Modal> */}
      <Card>
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
                <Alert
                  onClose={handleClose}
                  severity={toastSeverity}
                  sx={{
                    width: "100%",
                    padding: { sm: "15px", xs: "10px" },
                    borderRadius: "15px",
                    fontSize: { sm: "16px", xs: "14px" },
                    boxShadow: "0 0 10px #999",
                    marginTop: { sm: "25px", xs: "20px" },
                  }}
                >
                  {toastMessage}
                </Alert>
              </Snackbar>
            </div>
            <div style={{ padding: "0px 10px", marginBottom: "5px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  marginBlock: 15,
                  borderBottom: "0.5px solid #d1d1cf",
                  marginBottom: "20px",
                }}
              >
                <PaymentsIcon sx={{ fontSize: "25px", color: "#246cb5" }} />
                <H3
                  sx={{ fontSize: "15px", color: "#246cb5" }}
                  marginLeft={0.5}
                  my={0.5}
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  Bank Details
                </H3>
              </div>
              <Divider />
              {view!==true && (
              <div
                style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}
              >
                <p>
                  <b>Note:</b> Please fill the Bank Details, all fields are
                  mandatory
                </p>
              </div>
              )}
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
                    margin="normal"
                    required
                    fullWidth
                    id="bankName"
                    label="Bank Name"
                    name="bankName"
                    value={formik.values.bankName || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.bankName && Boolean(formik.errors.bankName)
                    }
                    helperText={
                      formik.touched.bankName && formik.errors.bankName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="branchName"
                    label="Branch Name"
                    name="branchName"
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.branchName || ""}
                    size="small"
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.branchName &&
                      Boolean(formik.errors.branchName)
                    }
                    helperText={
                      formik.touched.branchName && formik.errors.branchName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ifscCode"
                    label="IFSC Code"
                    name="ifscCode"
                    disabled={view}
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.ifscCode || ""}
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ifscCode && Boolean(formik.errors.ifscCode)
                    }
                    helperText={
                      formik.touched.ifscCode && formik.errors.ifscCode
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
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="bankAccNo"
                    label="Account Number"
                    name="bankAccNo"
                    disabled={view}
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.bankAccNo || ""}
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.bankAccNo &&
                      Boolean(formik.errors.bankAccNo)
                    }
                    helperText={
                      formik.touched.bankAccNo && formik.errors.bankAccNo
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="payeeBenefId"
                    label="Pay Beneficiary Id"
                    name="payeeBenefId"
                    disabled={view}
                    value={formik.values.payeeBenefId || ""}
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.payeeBenefId &&
                      Boolean(formik.errors.payeeBenefId)
                    }
                    helperText={
                      formik.touched.payeeBenefId && formik.errors.payeeBenefId
                    }
                  />
                </Grid>
              </Grid>
              <Box spacing={2} sx={{ margin: 1, textAlign: "center" }}>
                {/* <Button
                                    type="button"
                                    sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                                    onClick={() => onButtonClick("pagethree")}
                                    variant="outlined"
                                    color="primary"
                                >
                                    <KeyboardArrowLeftIcon />&nbsp; PREVIOUS
                                </Button> */}
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
                {view!==true && (
                <Button
                  sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                  variant="contained"
                  disabled={submitDisable}
                  type="submit"
                  onClick={() => {
                   // handleAlertSaveOpen();
                    checkValid();
                  }}
                >
                  SUBMIT
                </Button>
                )}
                <Button
                  sx={{
                    minWidth: 100,
                    ml: 1,
                    mt: { xs: 1, md: 0 },
                  }}
                  variant="outlined"
                  //type="submit"
                  disabled={!showNext}
                  onClick={() => {
                    onButtonClick("pagefive");
                  }}
                >
                  NEXT &nbsp;
                  <NavigateNextIcon />
                </Button>
              </Box>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
export default PageFour;
