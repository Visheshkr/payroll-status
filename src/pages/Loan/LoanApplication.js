import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PaymentsIcon from "@mui/icons-material/Payments";
import SearchTable from "../../components/SearchTableAlt";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Slide,
  Stack,
  TextField
} from "@mui/material";
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
  const [rowss, setRowss] = useState([]);
  //const [isSubmitButtonDisabled,setIsSubmitButtonDisabled] =useState(true);
  const [txn, setTxn] = useState("");
  const handleAlertSaveOpen = () => setOpenAlertSave(true);
  const handleAlertSaveClose = () => setOpenAlertSave(false);
  
  const title = " Employee Loan Request  ";
    
  useTitle(title);


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
      employeeId: "",
      employeeName: "",
      serviceType: "",
      gpfPraNo: "",
      currentDept: "",
      currentOffice: "",
      currentDesg: "",
      dob: "",
      retirementDate: "",
      doj: "",
      employementStatus: "",
      serviceCompleted:"",
      serviceRemaining:"",
      basicSalary:"",
      grossDeduction:"",
      grossEarning:"",
      netEarning:"",
      // Add initial values for other fields
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission or API integration here
    },
  });
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
    //   saveBankDetails();
    }
  };


  const columns = [
    {
        field: "id",
        headerName: "Sr No.",
        // flex: 0.1,
        width: 80,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "payHeadName",
        headerName: "Employee Name",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "isFixedAmt",
        headerName: "GPF/PRAN No",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "fixedAmt",
        headerName: "Loan Type",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "formula2",
        headerName: "Loan No",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "formula1",
        headerName: "Loan Approved Date",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "formula3",
        headerName: "Loan Amount",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "formula4",
        headerName: "Rate Of Interest",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "formula5",
        headerName: "Total No Of Principal Installments",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "payCommissionName",
        headerName: "No of Principal Installment Pending",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "tier1",
        headerName: "Principal Installment Amount Balanced",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "ctaEntitlement1",
        headerName: "Total of Interest Installment",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "effectiveFrom1",
        headerName: "No of Interest Installment Pending",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "endDate1",
        headerName: "Interest Installment Amount Balanced",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "isActive1",
        headerName: "Is Active",
        // flex: 0.1,
        width: 150,
        headerClassName: "super-app-theme--header",

    },
    {
        field: "action",
        headerName: "Action",
        headerClassName: "super-app-theme--header",
        // flex: 0.3,
        width: 250,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
            return (
            <Stack direction="row" spacing={1}>

                {/* <Button variant="outlined" color="warning" sx={{borderRadius:'4px'}} onClick={() => handleEdit(params.row.index)}>
                    View
                </Button> */}
               
            </Stack>
            );
        },
    },
]
  const [submitDisable, setSubmitDisable] = useState(false);
  return (
    <>
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
                  Employee Personal Information
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
                sx={{ mb: 1 }}
              >
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="employeeId" 
                    name="employeeId"
                    label="Employee Id"
                    value={formik.values.employeeId || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="employeeName" 
                    name="employeeName"
                    label="Employee Name"
                    value={formik.values.employeeName || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="serviceType" 
                    name="serviceType"
                    label="Service Type"
                    value={formik.values.serviceType || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="gpfPraNo" 
                    name="gpfPraNo"
                    label="GPF / Pran No"
                    value={formik.values.gpfPraNo || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="currentDept" 
                    name="currentDept"
                    label="Current Department"
                    value={formik.values.currentDept || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="currentOffice" 
                    name="currentOffice"
                    label="Current office"
                    value={formik.values.currentOffice || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="currentDesg" 
                    name="currentDesg"
                    label="Current Designation"
                    value={formik.values.currentDesg || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="dob" 
                    name="dob"
                    label="Date of Birth"
                    value={formik.values.dob || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="retirementDate" 
                    name="retirementDate"
                    label="Retirement Date"
                    value={formik.values.retirementDate || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="doj" 
                    name="doj"
                    label="Date of Joining"
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.doj || ""}
                    size="small"
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="employementStatus" 
                    name="employementStatus"
                    label="Employement Status"
                    disabled={view}
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.employementStatus || ""}
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
              </Grid>

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
                    Service Detail
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
                sx={{ mb: 1 }}
              >
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="serviceCompleted" 
                    name="serviceCompleted"
                    label="Service Completed"
                    value={formik.values.serviceCompleted || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="serviceRemaining"  
                    name="serviceRemaining"
                    label="Service Remaining"
                    value={formik.values.serviceRemaining || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
              </Grid>

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
                    Salary Details
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
                sx={{ mb: 1 }}
              >
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="basicSalary" 
                    name="basicSalary"
                    label="Basic"
                    value={formik.values.basicSalary || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="grossDeduction" 
                    name="grossDeduction"
                    label="Gross Deduction "
                    value={formik.values.grossDeduction || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="grossEarning" 
                    name="grossEarning"
                    label="Gross Earning "
                    value={formik.values.grossEarning || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="netEarning"  
                    name="netEarning"
                    label="Net Earning"
                    value={formik.values.netEarning || ""}
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    disabled={view}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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


      <Card sx={{ my: 2 }} elevation={5}>
                <CardContent>
                <PageTitle name=" Loan History" />
                    <Box component={"div"} style={{ marginBottom: "-2%" }}>
                        <SearchTable
                        columns={columns}
                        data={rowss}
                        isCheckbox={false}
                        isHideDensity={false}
                        isHideExport={true}
                        isHideFilter={true}
                        isHideColumn={true}
                        isHidePaging={false}
                        name="villageName"
                        id="villageName"
                        />
                    </Box>
          </CardContent>
          </Card>
    </>
  );
};
export default PageFour;
