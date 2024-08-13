import BadgeIcon from "@mui/icons-material/Badge";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Modal,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
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
const useStyles = makeStyles({
  cookieAlert: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: "20px",
    width: "300px",
  },
});
const useAlertSaveStyles = makeStyles({
  cookieAlert: {
    "& .MuiAlert-icon": {
      fontSize: 40,
    },
  },
});
const PayEntitlement = ({ formData, setFormData, prevData, onButtonClick, view }) => {
  const classes = useAlertSaveStyles();
  const { showSnackbar } = useSnackbar();
  const user = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  const [bankName, setBankName] = useState("");
  const [lengthdesabled, setLengthdesabled] = useState();
  const [branchName, setBranchName] = useState("");
  const [enteredValue, setEnteredValue] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [hratierList, setHratierList] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [npsOpted, setNpsOpted] = useState([]);
  const [medicalStop, setMedicalStop] = useState([]);
  const [daStop, setDaStop] = useState([]);
  const [ctaAllowanceApplicable, setCtaAllowanceApplicable] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");
  const [resultList, setResultList] = useState([]);
  const [basicpaylist, setbasicpayList] = useState([]);
  const [basicpaytextshow, setBasicpaytextshow] = useState(true);
  const [ctaentitlementList, setCtaentitlementList] = useState([]);
  const [updatedDeductionAmounts, setUpdatedDeductionAmounts] = useState({});
  const [entitlementDetails, setEntitlementDetails] = useState([]);
  const [deductionDetails, setDeductionDetails] = useState([]);
  const [updatedAmounts, setUpdatedAmounts] = useState({});
  const [passbookUploadedFile, setPassbookUploadedFile] = useState(null);
  const [requirePassbook, setRequirePassbook] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [istableDisabled, setIsTableDisabled] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [openAlertSave, setOpenAlertSave] = React.useState(false);
  const [showNext, setShowNext] = useState(view);
  useEffect(() => {
    if (view) {
      fetchData();
    }
  }, [view]);
  useEffect(() => {
    if (!view) {
      entitlmentDetails();
    }
  }, [!view]);

  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(
    prevData?.disableAadhar || false
  );
  const [showOtpField, setShowOtpField] = useState(
    prevData?.showOtpField || false
  );
  const [disableAadhar, setDisableAadhar] = useState(false);
  const [showLink, setShowLink] = useState(true);
  const [payCommissionList, setPayCommissionList] = useState([]);
  const [payScaleList, setPayScaleList] = useState([]);
  //const [isSubmitButtonDisabled,setIsSubmitButtonDisabled] =useState(true);
  const [txn, setTxn] = useState("");
  const handleAlertSaveOpen = () => setOpenAlertSave(true);
  const handleAlertSaveClose = () => setOpenAlertSave(false);
  const [viewPaymentPayHeadDetails, setViewPaymentPayHeadDetails] = useState([])
  const [viewDeductionPayHeadDetails, setViewDeductionPayHeadDetails] = useState([])
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleAmountChange = (index, value) => {
    setUpdatedAmounts((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  const handleDeductionAmountChange = (index, value) => {
    setUpdatedDeductionAmounts((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  const calculateNetDeduction = () => {
    return deductionDetails.reduce((total, detail, index) => {
      const amount = parseFloat(detail.amount) || 0;
      const updatedAmount = parseFloat(updatedDeductionAmounts[index]) || 0;
      return total + (updatedAmount > 0 ? updatedAmount : amount);
    }, 0);
  };
  const calculateNetEarning = () => {
    return entitlementDetails.reduce((total, detail, index) => {
      const amount = parseFloat(detail.amount) || 0;
      const updatedAmount = parseFloat(updatedAmounts[index]) || 0;
      return total + (updatedAmount > 0 ? updatedAmount : amount);
    }, 0);
  };
  const calculateViewNetDeduction = () => {
    let total = 0
    viewDeductionPayHeadDetails.map((detail, index) => {
      const amount = parseFloat(detail.amount);
      total += amount
    });
    return total
  };
  const calculateViewNetEarning = () => {
    let total = 0
    viewPaymentPayHeadDetails.map((detail, index) => {
      const amount = parseFloat(detail.amount);
      total += amount
    });
    return total
  };
  const calculateNetSalary = () => {
    return calculateNetEarning() - calculateNetDeduction();
  };
  const calculateViewNetSalary = () => {
    return calculateViewNetEarning() - calculateViewNetDeduction();
  };
  let selectedFile = [];
  const isSubmitButtonDisabled = !(checkboxChecked && isOtpButtonDisabled);
  console.log(checkboxChecked);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };
  const validationSchema = Yup.object().shape({
    DAStop: Yup.string().required("DA Stop is required").nullable(),
    MedicalStop: Yup.string().required("Medical Stop is required").nullable(),
    NPSOpted: Yup.string().required("NPS Opted is required").nullable(),
    GPFPRANType: Yup.string().required("GPF/PRAN Type is required").nullable(),
    CTAAllowanceApplicable: Yup.string()
      .required("CTA Allowance Applicable is required")
      .nullable(),
    GovtQuarterOccupied: Yup.string()
      .required("Govt Quarter Occupied is required")
      .nullable(),
    BasicPay: Yup.string().required("Basic Pay is required").nullable(),
    PayScale: Yup.string().required("Pay Scale is required").nullable(),
    PayCommission: Yup.string()
      .required("Pay Commission is required")
      .nullable(),
  });
  const formik = useFormik({
    initialValues: {
      DAStop: "",
      MedicalStop: "",
      NPSOpted: "",
      GPFPRANType: "",
      CTAEntitlement: "",
      CTAAllowanceApplicable: "",
      HRATier: "",
      GovtQuarterOccupied: "",
      BasicPay: "",
      PayScale: "",
      PayCommission: "",
      serviceId: "",
      ViewPayCommission: "",
      PayCommissionmappingId: ""
      // Add initial values for other fields
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission or API integration here
    },
  });
  const fetchData = () => {
    axios.get(`http://141.148.194.18:8052/payroll/employee/pay-entitlement/${formData.refNo}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then(response => {
      console.log(response);
      console.log(response.data.result)
      console.log(response.data.result.payCommission.id)
      console.log(response.data.result.paylevel.id)
      console.log(response.data.result.isCtaApplicable)
      console.log(response.data.result.ctaEntitlement)

      formik.setFieldValue("PayCommission", response.data.result.payCommission.id)
      formik.setFieldValue("PayScale", response.data.result.paylevel.id)
      formik.setFieldValue("BasicPay", response.data.result.basicPay)
      formik.setFieldValue("HRATier", response.data.result.hraTier.id)
      formik.setFieldValue("CTAAllowanceApplicable", response.data.result.isCtaApplicable === false ? 328 : 329)
      formik.setFieldValue("NPSOpted", response.data.result.isNpsOpted === false ? 332 : 333)
      formik.setFieldValue("DAStop", response.data.result.daStop === false ? 326 : 327)
      formik.setFieldValue("MedicalStop", response.data.result.medicalStop === false ? 324 : 325)
      formik.setFieldValue("CTAEntitlement", response.data.result.ctaEntitlement?.id)
      let arr = []
      response.data.result.paymentPayhead.map((item) => {
        arr.push({ payheadName: item.payheadName, amount: item.payheadValue })
      })
      setViewPaymentPayHeadDetails(arr)
      let arr2 = []
      response.data.result.deductionPayhead.map((item) => {
        arr2.push({ payheadName: item.payheadName, amount: item.payheadValue })
      })
      setViewDeductionPayHeadDetails(arr2)
      axios
        .get(
          `http://141.148.194.18:8052/payroll/employee/dropdown/pay-level/${response.data.result.payCommission.id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            }
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setPayScaleList(response.data);
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  console.log(formik.values)
  console.log(formik.values.serviceId);
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
  const handleTextfield = (e) => {
    const newValue = e.target.value;
    setEnteredValue(newValue);
  };
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
          getEntitlementDetails();
        }
      })
      .catch((err) => {
        formik.setSubmitting(false);
      });
  };
  useEffect(() => {
    if (formik.values.serviceId) {
      axios
        .get(
          `http://141.148.194.18:8052/payroll/employee/dropdown/pay-commission/${formik.values.serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setPayCommissionList(response.data);
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formik.values.serviceId]);
  useEffect(() => {
    //checkEnrollmentStatus()

    axios
      .get(
        `http://141.148.194.18:8052/payroll/employee/dropdown/cta-entitlement`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setCtaentitlementList(response.data);
        }
        //console.log(sortedAccountData);
      })
      .catch((error) => {
        setCtaentitlementList([]);
        console.log(error);
      });
    axios
      .get(`http://141.148.194.18:8052/payroll/employee/dropdown/hra-tier`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setHratierList(response.data);
        }
        console.log(response);
        // setHratierList(sortedHratierData);
      })
      .catch((error) => {
        setHratierList([]);
        console.log(error);
      });
    axios
      .get(
        `http://141.148.194.18:8052/payroll/employee/entitlement/dropdown-init`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setNpsOpted(response.data.npsOpted);
          setMedicalStop(response.data.medicalStop);
          setDaStop(response.data.daStop);
          setCtaAllowanceApplicable(response.data.ctaAllowanceApplicable);
        }
        console.log(response);
        // setHratierList(sortedHratierData);
      })
      .catch((error) => {
        setHratierList([]);
        console.log(error);
      });
  }, []);
  const getEntitlementDetails = async (data) => {
    try {
      const response = await axios.post(
        "http://141.148.194.18:8052/payroll/employee/entitlement-details",
        {
          basicPay: formik.values.BasicPay,
          payCommissionId: formik.values.PayCommission,
          grpId: resultList?.group?.id,
          serviceTypeId: resultList?.serviceType?.id,
          payLevelId: formik.values.PayScale,
          departmentId: resultList?.department.id,
          designationId: resultList?.designation?.id,
          ctaEntitlement: formik.values.CTAEntitlement || null,
          hraTier: formik.values.HRATier || null,
          isDaStop: formik.values.DAStop === 327,
          isNpsOpted: formik.values.NPSOpted === 333,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setEntitlementDetails(response.data.paymentPayhead);
      setDeductionDetails(response.data.deductionPayhead);
      setIsSubmitDisabled(true);
      setIsTableDisabled(true);
      console.log("aryznnn", response);
    } catch (error) {
      // setOpenAlertSave(true);
      setToastMessage(
        "Something went wrong while Saving the details, please try again."
      );
      setToastSeverity("error");
      setOpenToast(true);
    }
  };
  // const getEarningDetails = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       "http://141.148.194.18:8052/payroll/employee/entitlement-details/payment",
  //       {
  //         basicPay: formik.values.BasicPay,
  //         payCommissionId: formik.values.PayCommission,
  //         grpId: resultList?.group?.id,
  //         serviceTypeId: resultList?.serviceType?.id,
  //         payLevelId: formik.values.PayScale,
  //         departmentId: resultList?.department.id,
  //         designationId: resultList?.designation?.id,
  //         ctaEntitlement: formik.values.CTAEntitlement || null,
  //         hraTier: formik.values.HRATier || null,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       }
  //     );
  //     setEntitlementDetails(response.data);
  //     setIsSubmitDisabled(true);
  //     setIsTableDisabled(true);
  //     console.log("aryznnn", response);
  //   } catch (error) {
  //     // setOpenAlertSave(true);
  //     setToastMessage(
  //       "Something went wrong while Saving the details, please try again."
  //     );
  //     setToastSeverity("error");
  //     setOpenToast(true);
  //   }
  // };
  // const getDeductionDetails = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       "http://141.148.194.18:8052/payroll/employee/entitlement-details/deduction",
  //       {
  //         basicPay: formik.values.BasicPay,
  //         payCommissionId: formik.values.PayCommission,
  //         grpId: resultList?.group?.id,
  //         serviceTypeId: resultList?.serviceType?.id,
  //         payLevelId: formik.values.PayScale,
  //         departmentId: resultList?.department.id,
  //         designationId: resultList?.designation?.id,
  //         ctaEntitlement: formik.values.CTAEntitlement || null,
  //         hraTier: formik.values.HRATier || null,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     setToastMessage(
  //       "Something went wrong while Saving the details, please try again."
  //     );
  //     setToastSeverity("error");
  //     setOpenToast(true);
  //   }
  // };
  const entitlmentDetails = async (data) => {
    try {
      let body = {}
      if (view !== true) {
        body = {
          refNo: localStorage.getItem("refNo"),
          //refNo: "BRD0000000000099",
        };
      }
      else {
        body = {
          refNo: formData.empRefNo
        }
      }
      console.log("the saved details  body", body);
      const res = await axios.post(
        `http://141.148.194.18:8052/payroll/employee/entitlement-data`,
        body,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("the saved details  areeeeee", res);
      if (res.status == 200) {
        console.log("the aryan ", res.data);
        // console.log("the length ", res.data.disability.length);
        setResultList(res.data);
        setLengthdesabled(res.data.disability.length);
        formik.setFieldValue("Disabled", res.data?.disability);
        formik.setFieldValue("GovtQuarterOccupied", res.data?.govtQuarterType);
        formik.setFieldValue("GPFPRANType", res.data?.gpfPranType?.label);
        formik.setFieldValue("serviceId", res.data?.serviceType?.id);
        // formik.setFieldValue(
        //   "PercentageofDisability",
        //   res.data.disability[0].percentage
        // );
        const percentages = res.data.disability.map(item => item.percentage);
        // Store the percentages in the state
        setPercentages(percentages);
      }
    } catch (error) {
      //alert("No refNo found", error);
      console.log(error.message);
    }
  };
  // console.log(formik.values.Disabled.length)
  const handleSave = async () => {
    const payEntitlementList = [];
    Object.keys(updatedAmounts).forEach((key) => {
      const index = parseInt(key);
      const amount = parseFloat(updatedAmounts[key]);
      if (amount > 0) {
        payEntitlementList.push({
          payheadId: entitlementDetails[index].payheadId,
          payheadValue: amount,
          payheadConfigId: entitlementDetails[index].payheadConfigId,
          payheadName: entitlementDetails[index].payheadName,
          payheadTypeId: entitlementDetails[index].payheadTypeId,
          payheadType: entitlementDetails[index].payheadType,
        });
      }
    });
    Object.keys(updatedDeductionAmounts).forEach((key) => {
      const index = parseInt(key);
      const amount = parseFloat(updatedDeductionAmounts[key]);
      if (amount > 0) {
        payEntitlementList.push({
          payheadId: deductionDetails[index].payheadId,
          payheadValue: amount,
          payheadConfigId: deductionDetails[index].payheadConfigId,
          payheadName: deductionDetails[index].payheadName,
          payheadTypeId: entitlementDetails[index].payheadTypeId,
          payheadType: entitlementDetails[index].payheadType,
        });
      }
    });
    entitlementDetails.forEach((item, index) => {
      if (!updatedAmounts[index]) {
        payEntitlementList.push({
          payheadId: item.payheadId,
          payheadValue: parseFloat(item.amount) || 0,
          payheadConfigId: item.payheadConfigId,
          payheadName: item.payheadName,
          payheadTypeId: item.payheadTypeId,
          payheadType: item.payheadType,
        });
      }
    });
    deductionDetails.forEach((item, index) => {
      if (!updatedDeductionAmounts[index]) {
        payEntitlementList.push({
          payheadId: item.payheadId,
          payheadValue: parseFloat(item.amount) || 0,
          payheadConfigId: item.payheadConfigId,
          payheadName: item.payheadName,
          payheadTypeId: item.payheadTypeId,
          payheadType: item.payheadType,
        });
      }
    });
    const payload = {
      //refNo: "BRD0000000000063",
      refNo: localStorage.getItem("refNo"),
      hraTier: formik.values.HRATier,
      basicPay: formik.values.BasicPay,
      isCtaApplicable: formik.values.CTAAllowanceApplicable === 329,
      ctaEntitlement: formik.values.CTAEntitlement || null,
      paylevel: formik.values.PayScale,
      pcId: formik.values.PayCommission,
      isNpsOpted: formik.values.NPSOpted === 333,
      isMedicalStop: formik.values.MedicalStop === 325,
      isDaStop: formik.values.DAStop === 327,
      payEntitlementList,
    };
    try {
      const response = await axios.post(
        "http://141.148.194.18:8052/payroll/employee/pay-entitlement",
        payload,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("Save response:", response.data);
      showSnackbar(response.data.message, "success");
      setShowNext(true);
      setOpenToast(true);
      setShowNext(true);
      onButtonClick("pagesix");
    } catch (error) {
      console.error("Error saving pay entitlement details", error);
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
      handleSave();
    }
  };
  console.log(resultList?.serviceType?.id);
  console.log(formik.values.PayCommission);
  console.log(formik.values.PayScale);
  console.log(formik.values.BasicPay);
  console.log(formik.values.PayCommissionmappingId);

  useEffect(() => {
    if (resultList?.serviceType?.id === 53 && formik.values.PayCommission === 32 && formik.values.PayScale === 364) {
      axios
        .get(
          `http://141.148.194.18:8052/payroll/employee/dropdown/basic-pay/${formik.values.PayCommissionmappingId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setbasicpayList(response.data);

          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [resultList?.serviceType?.id === 53 && formik.values.PayCommission === 32 && formik.values.PayScale === 364]);

  // const fetchBasicpayData = async (data) => {
  //   try {
  //     const response = await axios.get(
  //       "http://141.148.194.18:8052/payroll/employee/dropdown/basic-pay",
  //       {
  //         serviceTypeId: resultList?.serviceType?.id,
  //         payCommissionId: formik.values.PayCommission,
  //         payLevelId: formik.values.PayScale
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       }
  //     );
  //     setbasicpayList(response.data);
  //     setBasicpaytextshow(false);
  //     console.log("aryznnn", response);
  //   } catch (error) {
  //     // setOpenAlertSave(true);
  //     setToastMessage(
  //       "Something went wrong while Saving the details, please try again."
  //     );
  //     setToastSeverity("error");
  //     setOpenToast(true);
  //   }
  // };
  //const [submitDisable, setSubmitDisable] = useState(false);
  return (
    <>
      <Modal
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
                  handleSave();
                }}
              >
                Proceed&nbsp;
                {/* <ArrowRightAltIcon /> */}
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
      </Modal>
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
              {view !== true && (
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
                  <BadgeIcon sx={{ fontSize: "25px", color: "#246cb5" }} />
                  <H3
                    sx={{ fontSize: "15px", color: "#246cb5" }}
                    marginLeft={0.5}
                    my={0.5}
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    Employee Details
                  </H3>
                </div>
              )}
              {view !== true && (
                <Divider />
              )}
              {view !== true && (
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
                      id="EmployeeId"
                      label="EmployeeId"
                      name="EmployeeId"
                      disabled={view}
                      value={resultList?.empId}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="EmployeeName"
                      label="Employee Name"
                      name="EmployeeName"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.employeeName}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="GPF/PRAN"
                      label="GPF/PRAN No."
                      name="GPF/PRAN"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.gpfPranNo}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="DateofBirth"
                      label="Date of Birth"
                      name="DateofBirth"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.dob}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="Designation"
                      label="Designation"
                      name="Designation"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.designation?.label}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="Office"
                      label="Office"
                      name="Office"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.office?.label}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="MobileNumber"
                      label="Mobile Number"
                      name="MobileNumber"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.mobileNo}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="ServiceType"
                      label="Service Type"
                      name="ServiceType"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.serviceType?.label}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="Group"
                      label="Group"
                      name="Group"
                      disabled={view}
                      InputLabelProps={{ shrink: true }}
                      value={resultList?.group?.label}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              )}
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
                  Pay Entitlement
                </H3>
              </div>
              <Divider />
              <Grid
                container
                direction="row"
                rowSpacing={0}
                columnSpacing={2}
                justify="flex-end"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                {/* {view !== true && ( */}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="PayCommission"
                    name="PayCommission"
                    disabled={view}
                    options={payCommissionList}
                    value={
                      payCommissionList.find(
                        (option) => option.id === formik.values.PayCommission
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("PayCommission", null);
                      } else {
                        formik.setFieldValue("PayCommission", value.id);
                        axios
                          .get(
                            `http://141.148.194.18:8052/payroll/employee/dropdown/pay-level/${value.mappingId}`,
                            {
                              headers: {
                                Authorization: `Bearer ${Cookies.get("token")}`,
                              },
                            }
                          )
                          .then((response) => {
                            if (response.status === 200) {
                              setPayScaleList(response.data);

                            }
                            console.log(response);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Pay Commission"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.PayCommission &&
                            formik.touched.PayCommission
                            ? formik.errors.PayCommission
                            : null
                        }
                        error={
                          formik.errors.PayCommission &&
                            formik.touched.PayCommission
                            ? true
                            : false
                        }
                      />
                    )}
                  />
                </Grid>
                {/* )} */}
                {/* {view === true && (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                        margin="normal"
                        required
                        fullWidth
                         id="PayCommission"
                        name="PayCommission"
                       label="Pay Commission"
                        disabled={view}
                        value={formik.values.PayCommission || ""}
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                </Grid>
                )} */}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="PayScale"
                    name="PayScale"
                    disabled={view}
                    options={payScaleList}
                    value={
                      payScaleList.find(
                        (option) => option.id === formik.values.PayScale
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("PayScale", null);
                      }
                      else formik.setFieldValue("PayScale", value.id);
                      formik.setFieldValue("PayCommissionmappingId", value.mappingId);
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Pay Scale/Pay Band/Pay Level"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.PayScale && formik.touched.PayScale
                            ? formik.errors.PayScale
                            : null
                        }
                        error={
                          formik.errors.PayScale && formik.touched.PayScale
                            ? true
                            : false
                        }
                      />
                    )}
                  />
                </Grid>
                {(
                  formik.values.PayCommission !== 32 ||
                  formik.values.PayScale !== 364 ||
                  [365, 366, 367, 368].includes(formik.values.PayScale)
                ) && (
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="BasicPay"
                        label="Basic Pay"
                        name="BasicPay"
                        disabled={view}
                        value={formik.values.BasicPay || ""}
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.BasicPay && Boolean(formik.errors.BasicPay)
                        }
                        helperText={
                          formik.touched.BasicPay && formik.errors.BasicPay
                        }
                      />
                    </Grid>
                  )}
                {(resultList?.serviceType?.id === 53 && formik.values.PayCommission === 32 && formik.values.PayScale === 364) && (
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      size="small"
                      id="BasicPay"
                      name="BasicPay"
                      disabled={view}
                      options={basicpaylist}
                      value={
                        basicpaylist.find(
                          (option) => option.label === formik.values.BasicPay
                        ) || null
                      }
                      onChange={(e, value) => {
                        console.log(value);
                        if (value === null) {
                          formik.setFieldValue("BasicPay", null);
                        } else
                          formik.setFieldValue("BasicPay", value.label);
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Basic Pay"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.BasicPay && formik.touched.BasicPay
                              ? formik.errors.BasicPay
                              : null
                          }
                          error={
                            formik.errors.BasicPay && formik.touched.BasicPay
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    disabled
                    id="GovtQuarterOccupied"
                    label="GovtQuarterOccupied"
                    name="GovtQuarterOccupied"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.GovtQuarterOccupied ? "YES" : "NO"}
                    size="small"
                    sx={{ mt: 2 }}
                    variant="outlined"
                  />
                  {/* <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="GovtQuarterOccupied"
                    name="GovtQuarterOccupied"
                    options={accountList}
                    value={
                      accountList.find(
                        (option) =>
                          option.valueId === formik.values.GovtQuarterOccupied
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("GovtQuarterOccupied", null);
                      } else
                        formik.setFieldValue(
                          "GovtQuarterOccupied",
                          value.valueId
                        );
                    }}
                    getOptionLabel={(value) => value.valueName}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Govt. Quarter Occupied"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.GovtQuarterOccupied &&
                          formik.touched.GovtQuarterOccupied
                            ? formik.errors.GovtQuarterOccupied
                            : null
                        }
                        error={
                          formik.errors.GovtQuarterOccupied &&
                          formik.touched.GovtQuarterOccupied
                            ? true
                            : false
                        }
                      />
                    )}
                  /> */}
                </Grid>
                {formik.values.GovtQuarterOccupied === true && (
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      size="small"
                      id="HRATier"
                      name="HRATier"
                      options={hratierList}
                      disabled={view}
                      value={
                        hratierList.find(
                          (option) => option.id === formik.values.HRATier
                        ) || null
                      }
                      onChange={(e, value) => {
                        console.log(value);
                        if (value === null) {
                          formik.setFieldValue("HRATier", null);
                        } else formik.setFieldValue("HRATier", value.id);
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="HRA Tier"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.HRATier && formik.touched.HRATier
                              ? formik.errors.HRATier
                              : null
                          }
                          error={
                            formik.errors.HRATier && formik.touched.HRATier
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="CTAAllowanceApplicable"
                    name="CTAAllowanceApplicable"
                    disabled={view}
                    options={ctaAllowanceApplicable}
                    value={
                      ctaAllowanceApplicable.find(
                        (option) =>
                          option.id === formik.values.CTAAllowanceApplicable
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("CTAAllowanceApplicable", null);
                      } else
                        formik.setFieldValue(
                          "CTAAllowanceApplicable",
                          value.id
                        );
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="CTA Allowance Applicable"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.CTAAllowanceApplicable &&
                            formik.touched.CTAAllowanceApplicable
                            ? formik.errors.CTAAllowanceApplicable
                            : null
                        }
                        error={
                          formik.errors.CTAAllowanceApplicable &&
                            formik.touched.CTAAllowanceApplicable
                            ? true
                            : false
                        }
                      />
                    )}
                  />
                </Grid>
                {(formik.values.CTAAllowanceApplicable === 329) && (
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      size="small"
                      id="CTAEntitlement"
                      name="CTAEntitlement"
                      disabled={view}
                      options={ctaentitlementList}
                      value={
                        ctaentitlementList.find(
                          (option) => option.id === formik.values.CTAEntitlement
                        ) || null
                      }
                      onChange={(e, value) => {
                        console.log(value);
                        if (value === null) {
                          formik.setFieldValue("CTAEntitlement", null);
                        } else formik.setFieldValue("CTAEntitlement", value.id);
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="CTA Entitlement"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.CTAEntitlement &&
                              formik.touched.CTAEntitlement
                              ? formik.errors.CTAEntitlement
                              : null
                          }
                          error={
                            formik.errors.CTAEntitlement &&
                              formik.touched.CTAEntitlement
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  {/* <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="GPFPRANType"
                    name="GPFPRANType"
                    options={accountList}
                    value={
                      accountList.find(
                        (option) => option.valueId === formik.values.GPFPRANType
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("GPFPRANType", null);
                      } else formik.setFieldValue("GPFPRANType", value.valueId);
                    }}
                    getOptionLabel={(value) => value.valueName}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="GPF/PRAN Type"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.GPFPRANType &&
                          formik.touched.GPFPRANType
                            ? formik.errors.GPFPRANType
                            : null
                        }
                        error={
                          formik.errors.GPFPRANType &&
                          formik.touched.GPFPRANType
                            ? true
                            : false
                        }
                      />
                    )}
                  /> */}
                  <TextField
                    margin="normal"
                    fullWidth
                    disabled
                    id="GPFPRANType"
                    label="GPF/PRAN Type"
                    name="GPFPRANType"
                    InputLabelProps={{ shrink: true }}
                    value={formik.values.GPFPRANType}
                    size="small"
                    sx={{ mt: 2 }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="NPSOpted"
                    name="NPSOpted"
                    disabled={view}
                    options={npsOpted}
                    value={
                      npsOpted.find(
                        (option) => option.id === formik.values.NPSOpted
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("NPSOpted", null);
                      } else formik.setFieldValue("NPSOpted", value.id);
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="NPS Opted"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.NPSOpted && formik.touched.NPSOpted
                            ? formik.errors.NPSOpted
                            : null
                        }
                        error={
                          formik.errors.NPSOpted && formik.touched.NPSOpted
                            ? true
                            : false
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  {/* <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="Disabled"
                    name="Disabled"
                    options={accountList}
                    value={
                      accountList.find(
                        (option) => option.valueId === formik.values.Disabled
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("Disabled", null);
                      } else formik.setFieldValue("Disabled", value.valueId);
                    }}
                    getOptionLabel={(value) => value.valueName}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Disabled"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.Disabled && formik.touched.Disabled
                            ? formik.errors.Disabled
                            : null
                        }
                        error={
                          formik.errors.Disabled && formik.touched.Disabled
                            ? true
                            : false
                        }
                      />
                    )}
                  /> */}
                  <TextField
                    margin="normal"
                    fullWidth
                    disabled
                    id="Disabled"
                    label="Disabled"
                    name="Disabled"
                    InputLabelProps={{ shrink: true }}
                    value={lengthdesabled === 0 ? "NO" : "YES"}
                    size="small"
                    sx={{ mt: 2 }}
                    variant="outlined"
                  />
                </Grid>
                {lengthdesabled > 0 && (
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      disabled
                      id="PercentageofDisability"
                      label="Percentage of Disability (%)"
                      name="PercentageofDisability"
                      InputLabelProps={{ shrink: true }}
                      value={percentages.join(', ')}
                      size="small"
                      sx={{ mt: 2 }}
                      variant="outlined"
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    margin="normal"
                    fullWidth
                    size="small"
                    id="MedicalStop"
                    name="MedicalStop"
                    options={medicalStop}
                    disabled={view}
                    value={
                      medicalStop.find(
                        (option) => option.id === formik.values.MedicalStop
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("MedicalStop", null);
                      } else formik.setFieldValue("MedicalStop", value.id);
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Medical Stop"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.MedicalStop &&
                            formik.touched.MedicalStop
                            ? formik.errors.MedicalStop
                            : null
                        }
                        error={
                          formik.errors.MedicalStop &&
                            formik.touched.MedicalStop
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
                    fullWidth
                    size="small"
                    id="DAStop"
                    name="DAStop"
                    disabled={view}
                    options={daStop}
                    value={
                      daStop.find(
                        (option) => option.id === formik.values.DAStop
                      ) || null
                    }
                    onChange={(e, value) => {
                      console.log(value);
                      if (value === null) {
                        formik.setFieldValue("DAStop", null);
                      } else formik.setFieldValue("DAStop", value.id);
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="DA Stop"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.DAStop && formik.touched.DAStop
                            ? formik.errors.DAStop
                            : null
                        }
                        error={
                          formik.errors.DAStop && formik.touched.DAStop
                            ? true
                            : false
                        }
                      />
                    )}
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
                  &nbsp; PREVIOUS
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
                {view !== true && (
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      // type="submit"
                      disabled={view}
                      onClick={() => {
                        // checkValid();
                        checkValid();
                      }}
                    >
                      Save
                    </Button>
                    {/* <Button
                    onClick={handleAlertSaveClose}
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 2 }}
                  >
                    Cancel
                  </Button> */}
                  </Box>
                )}
              </Box>
            </div>
          </form>
          {/* {entitlementDetails.length > 0 && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <h3>Entitlement Details</h3>
                        <Divider />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <h4>Payhead Name</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <h4>Amount</h4>
                            </Grid>
                            {entitlementDetails.map((detail, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={6}>
                                        {detail.payheadName}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {detail.amount === "0" ? (
                                            <TextField
                                                fullWidth
                                                label="Enter Amount"
                                                variant="outlined"
                                            />
                                        ) : (
                                            detail.amount
                                        )}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )} */}
          {istableDisabled && (
            <Card>
              <CardContent>
                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={2}
                  justify="flex-end"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div style={{ border: "0.5px solid black" }}>
                          <h6 style={{
                            padding: "6px",
                            textAlign: 'center',
                            backgroundColor: '#F0F8FF'
                          }}>Earning</h6>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              border: "1px solid #ccc",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Sr. No
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Payhead Name
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {entitlementDetails.map((detail, index) => (
                                <tr key={index}>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.payheadName}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.amount === "0" ? (
                                      <TextField
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) =>
                                          handleAmountChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    ) : (
                                      detail.amount
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <div
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            borderTop: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Earning:</strong> {calculateNetEarning()}
                        </div> */}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div style={{ border: "0.5px solid black" }}>
                          <h6 style={{
                            padding: "6px",
                            textAlign: 'center',
                            backgroundColor: '#F0F8FF'
                          }}>Deduction</h6>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              border: "1px solid #ccc",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Sr. No
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Payhead Name
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {deductionDetails.map((detail, index) => (
                                <tr key={index}>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.payheadName}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.amount === "0" ? (
                                      <TextField
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) =>
                                          handleDeductionAmountChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    ) : (
                                      detail.amount
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <div
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            borderTop: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Deduction:</strong>{" "}
                          {calculateNetDeduction()}
                        </div> */}
                        </div>
                        {/* <div style={{ textAlign: "center", padding: "16px" }}>
                        <strong>Net Salary:</strong> {calculateNetSalary()}
                      </div> */}
                      </Grid>
                    </Grid>
                  </div>
                  <table
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Earning:</strong> {calculateNetEarning()}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Deduction:</strong>{" "}
                          {calculateNetDeduction()}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Salary:</strong> {calculateNetSalary()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
                {isSubmitDisabled && (
                  <div style={{ textAlign: "center", padding: "16px" }}>
                    {view !== true && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // handleSave();
                          callConfirmDialog()
                          //setOpenAlertSave(true);
                        }}
                      >
                        Save Pay Entitlement
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
                        onButtonClick("pagesix");
                      }}
                    >
                      NEXT &nbsp;
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          {view && (
            <Card>
              <CardContent>
                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={2}
                  justify="flex-end"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div style={{ border: "0.5px solid black" }}>
                          <h6 style={{
                            padding: "6px",
                            textAlign: 'center',
                            backgroundColor: '#F0F8FF'
                          }}>Earning</h6>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              border: "1px solid #ccc",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Sr. No
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Payhead Name
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {viewPaymentPayHeadDetails.map((detail, index) => (
                                <tr key={index}>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.payheadName}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.amount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <div
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            borderTop: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Earning:</strong> {calculateNetEarning()}
                        </div> */}
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div style={{ border: "0.5px solid black" }}>
                          <h6 style={{
                            padding: "6px",
                            textAlign: 'center',
                            backgroundColor: '#F0F8FF'
                          }}>Deduction</h6>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              border: "1px solid #ccc",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Sr. No
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Payhead Name
                                </th>
                                <th
                                  style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                  }}
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {viewDeductionPayHeadDetails.map((detail, index) => (
                                <tr key={index}>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.payheadName}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "8px",
                                    }}
                                  >
                                    {detail.amount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <div
                          style={{
                            textAlign: "right",
                            padding: "8px",
                            borderTop: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Deduction:</strong>{" "}
                          {calculateNetDeduction()}
                        </div> */}
                        </div>
                        {/* <div style={{ textAlign: "center", padding: "16px" }}>
                        <strong>Net Salary:</strong> {calculateNetSalary()}
                      </div> */}
                      </Grid>
                    </Grid>
                  </div>
                  <table
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Earning:</strong> {calculateViewNetEarning()}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Deduction:</strong>{" "}
                          {calculateViewNetDeduction()}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          <strong>Net Salary:</strong> {calculateViewNetSalary()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
                {isSubmitDisabled && (
                  <div style={{ textAlign: "center", padding: "16px" }}>
                    {view !== true && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // handleSave();
                          callConfirmDialog()
                          //setOpenAlertSave(true);
                        }}
                      >
                        Save Pay Entitlement
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
                        onButtonClick("pagesix");
                      }}
                    >
                      NEXT &nbsp;
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </>
  );
};
export default PayEntitlement;
