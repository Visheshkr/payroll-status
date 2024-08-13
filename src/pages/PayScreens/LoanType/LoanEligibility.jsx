import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
//
import PageTitle from "../../../layouts/PageTitle";

const MAX_LENGTH = {
  MAX_LOAN_AMOUNT: 11,
  NUMBER_OF_TIMES_LOAN_ALLOWED: 3,
  NEXT_LOAN_INTERVAL: 3,
  MINIMUM_SERVICE_LEFT: 3,
  MINIMUM_SERVICE_COMPLETED: 3,
  MINIMUM_MONTHLY_SALARY: 9,
  MAX_NO_OF_INSTALLMENTS_ALLOWED: 3,
};

const LoanEligibility = () => {
  const name = "Add Loan Eligibility";
  const name1 = "Add Eligibility";
  const name2 = "Application For";

  const validationSchema = yup.object({
    loanPurpose: yup.object().nullable().required("Loan Purpose is required"),
    maxLoanAmount: yup.string().required("Max Loan Amount is required"),
    //maxLoanAmountBasicSalaryRatio: yup.string().required(" is required"),
    noOfTimesLoanAllowed: yup
      .string()
      .required("No. Of Times Loan Allowed is required"),
    minimumServiceLeft: yup
      .string()
      .required("Minimum Service Left is required"),
    effectiveFromDate: yup
      .date()
      .nullable()
      .required("Effective From Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      loanPurpose: "",
      maxLoanAmount: "",
      maxLoanAmountBasicSalaryRatio: "",
      noOfTimesLoanAllowed: "",
      nextLoanInterval: "",
      minimumServiceLeft: "",
      minimumServiceCompleted: "",
      minimumMonthlySalary: "",
      maxNoOfInstallmentsAllowed: "",
      effectiveFromDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const handleCancel = () => {
    //setBtnText("Save");
    //setSelectedRow(null);
    formik.resetForm();
  };

  return (
    <Card
    //sx={{ bgcolor: "#eeeeee", border: "1px solid black" }}
    >
      <CardContent>
        <PageTitle name={name} />
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Card
            sx={{
              bgcolor: "#eceff1",
              //border: "1px solid black"
            }}
          >
            <CardContent>
              <PageTitle name={name1} />
              <Grid
                container
                columnSpacing={3}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <Autocomplete
                    disablePortal
                    //margin="normal"
                    fullWidth
                    id="loanPurpose"
                    name="loanPurpose"
                    size="small"
                    options={[]}
                    value={
                      [].find(
                        (option) => option.id === formik.values.loanPurpose?.id
                      ) || null
                    }
                    onChange={(e, value) => {
                      if (value === null) {
                        formik.setFieldValue("loanPurpose", null);
                      } else {
                        formik.setFieldValue("loanPurpose", value);
                      }
                    }}
                    getOptionLabel={(value) => value.label}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Loan Purpose"
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.errors.loanPurpose &&
                          formik.touched.loanPurpose
                            ? formik.errors.loanPurpose
                            : null
                        }
                        error={
                          formik.errors.loanPurpose &&
                          formik.touched.loanPurpose
                            ? true
                            : false
                        }
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <NumericFormat
                    label="Max Loan Amount"
                    required
                    id="maxLoanAmount"
                    name="maxLoanAmount"
                    fullWidth
                    size="small"
                    customInput={TextField}
                    //prefix={"₹"}
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    decimalScale={0}
                    allowNegative={false}
                    value={formik.values.maxLoanAmount}
                    onValueChange={({ value }) => {
                      formik.setFieldValue("maxLoanAmount", value);
                    }}
                    inputProps={{
                      maxLength: MAX_LENGTH.MAX_LOAN_AMOUNT,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.maxLoanAmount &&
                      formik.touched.maxLoanAmount
                        ? formik.errors.maxLoanAmount
                        : null
                    }
                    error={
                      formik.errors.maxLoanAmount &&
                      formik.touched.maxLoanAmount
                        ? true
                        : false
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <NumericFormat
                    label="No. Of Times Loan Allowed"
                    required
                    id="noOfTimesLoanAllowed"
                    name="noOfTimesLoanAllowed"
                    fullWidth
                    size="small"
                    customInput={TextField}
                    decimalScale={0}
                    allowNegative={false}
                    value={formik.values.noOfTimesLoanAllowed}
                    onValueChange={({ value }) => {
                      formik.setFieldValue("noOfTimesLoanAllowed", value);
                    }}
                    inputProps={{
                      maxLength: MAX_LENGTH.NUMBER_OF_TIMES_LOAN_ALLOWED,
                    }}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.noOfTimesLoanAllowed &&
                      formik.touched.noOfTimesLoanAllowed
                        ? formik.errors.noOfTimesLoanAllowed
                        : null
                    }
                    error={
                      formik.errors.noOfTimesLoanAllowed &&
                      formik.touched.noOfTimesLoanAllowed
                        ? true
                        : false
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <NumericFormat
                    label="Next Loan Interval (Months)"
                    //required
                    id="nextLoanInterval"
                    name="nextLoanInterval"
                    fullWidth
                    size="small"
                    customInput={TextField}
                    decimalScale={0}
                    allowNegative={false}
                    value={formik.values.nextLoanInterval}
                    onValueChange={({ value }) => {
                      formik.setFieldValue("nextLoanInterval", value);
                    }}
                    inputProps={{
                      maxLength: MAX_LENGTH.NEXT_LOAN_INTERVAL,
                    }}
                    // onBlur={formik.handleBlur}
                    // helperText={
                    //   formik.errors.nextLoanInterval &&
                    //   formik.touched.nextLoanInterval
                    //     ? formik.errors.nextLoanInterval
                    //     : null
                    // }
                    // error={
                    //   formik.errors.nextLoanInterval &&
                    //   formik.touched.nextLoanInterval
                    //     ? true
                    //     : false
                    // }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  Loan Amount Should Not Exceed ___ Times of Basic Salary *
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: "#eceff1",
              //border: "1px solid black"
            }}
          >
            <CardContent>
              <PageTitle name={name2} />
              <Grid
                container
                columnSpacing={3}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <NumericFormat
                    label="Minimum Service Left (Months)"
                    required
                    id="minimumServiceLeft"
                    name="minimumServiceLeft"
                    fullWidth
                    size="small"
                    customInput={TextField}
                    decimalScale={0}
                    allowNegative={false}
                    value={formik.values.minimumServiceLeft}
                    onValueChange={({ value }) => {
                      formik.setFieldValue("minimumServiceLeft", value);
                    }}
                    inputProps={{
                      maxLength: MAX_LENGTH.MINIMUM_SERVICE_LEFT,
                    }}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.minimumServiceLeft &&
                      formik.touched.minimumServiceLeft
                        ? formik.errors.minimumServiceLeft
                        : null
                    }
                    error={
                      formik.errors.minimumServiceLeft &&
                      formik.touched.minimumServiceLeft
                        ? true
                        : false
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <NumericFormat
                    label="Minimum Service Completed (Months)"
                    //required
                    id="minimumServiceCompleted"
                    name="minimumServiceCompleted"
                    fullWidth
                    size="small"
                    customInput={TextField}
                    decimalScale={0}
                    allowNegative={false}
                    value={formik.values.minimumServiceCompleted}
                    onValueChange={({ value }) => {
                      formik.setFieldValue("minimumServiceCompleted", value);
                    }}
                    inputProps={{
                      maxLength: MAX_LENGTH.MINIMUM_SERVICE_COMPLETED,
                    }}
                    // onBlur={formik.handleBlur}
                    // helperText={
                    //   formik.errors.minimumServiceCompleted &&
                    //   formik.touched.minimumServiceCompleted
                    //     ? formik.errors.minimumServiceCompleted
                    //     : null
                    // }
                    // error={
                    //   formik.errors.minimumServiceCompleted &&
                    //   formik.touched.minimumServiceCompleted
                    //     ? true
                    //     : false
                    // }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <NumericFormat
                    label="Minimum Monthly Salary"
                    //required
                    id="minimumMonthlySalary"
                    name="minimumMonthlySalary"
                    fullWidth
                    size="small"
                    customInput={TextField}
                    //prefix={"₹"}
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    decimalScale={0}
                    allowNegative={false}
                    value={formik.values.minimumMonthlySalary}
                    onValueChange={({ value }) => {
                      formik.setFieldValue("minimumMonthlySalary", value);
                    }}
                    inputProps={{
                      maxLength: MAX_LENGTH.MINIMUM_MONTHLY_SALARY,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    //onBlur={formik.handleBlur}
                    // helperText={
                    //   formik.errors.minimumMonthlySalary &&
                    //   formik.touched.minimumMonthlySalary
                    //     ? formik.errors.minimumMonthlySalary
                    //     : null
                    // }
                    // error={
                    //   formik.errors.minimumMonthlySalary &&
                    //   formik.touched.minimumMonthlySalary
                    //     ? true
                    //     : false
                    // }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <NumericFormat
                    label="Max No. Of Installments Allowed"
                    //required
                    id="maxNoOfInstallmentsAllowed"
                    name="maxNoOfInstallmentsAllowed"
                    fullWidth
                    size="small"
                    customInput={TextField}
                    decimalScale={0}
                    allowNegative={false}
                    value={formik.values.maxNoOfInstallmentsAllowed}
                    onValueChange={({ value }) => {
                      formik.setFieldValue("maxNoOfInstallmentsAllowed", value);
                    }}
                    inputProps={{
                      maxLength: MAX_LENGTH.MAX_NO_OF_INSTALLMENTS_ALLOWED,
                    }}
                    // onBlur={formik.handleBlur}
                    // helperText={
                    //   formik.errors.maxNoOfInstallmentsAllowed &&
                    //   formik.touched.maxNoOfInstallmentsAllowed
                    //     ? formik.errors.maxNoOfInstallmentsAllowed
                    //     : null
                    // }
                    // error={
                    //   formik.errors.maxNoOfInstallmentsAllowed &&
                    //   formik.touched.maxNoOfInstallmentsAllowed
                    //     ? true
                    //     : false
                    // }
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"en-gb"}
                  >
                    <DatePicker
                      id="effectiveFromDate"
                      name="effectiveFromDate"
                      sx={{ width: "100%" }}
                      //disablePast
                      format="DD/MM/YYYY"
                      value={formik.values.effectiveFromDate}
                      onChange={(value) =>
                        formik.setFieldValue("effectiveFromDate", value)
                      }
                      onBlur={formik.handleBlur}
                      label="Effective From Date"
                      slotProps={{
                        textField: { size: "small", required: true },
                      }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          required
                          {...params}
                          error={
                            formik.touched.effectiveFromDate &&
                            Boolean(formik.errors.effectiveFromDate)
                          }
                          helperText={
                            formik.touched.effectiveFromDate &&
                            formik.errors.effectiveFromDate
                          }
                          onBlur={formik.handleBlur}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box spacing={2} sx={{ mt: 1, textAlign: "center" }}>
            <Button
              sx={{
                minWidth: 100,
                ml: 1,
                mt: { xs: 1, md: 0 },
              }}
              //disabled={isSubmitted}
              variant="contained"
              type="submit"
            >
              {/* {btnText} */}
              SAVE &nbsp;
              {/* {isSubmitted ? (
                  <CircularProgress color="inherit" size={15} />
                ) : (
                  <SaveAltIcon sx={{ ml: 0.2 }}></SaveAltIcon>
                )} */}
            </Button>
            <Button
              type="button"
              sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
              onClick={handleCancel}
              variant="outlined"
            >
              <CachedIcon />
              &nbsp;RESET
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanEligibility;
