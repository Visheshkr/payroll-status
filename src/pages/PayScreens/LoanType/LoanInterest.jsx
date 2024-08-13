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
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
//
import PageTitle from "../../../layouts/PageTitle";

const MAX_LENGTH = {
  RATE_OF_INTEREST: 5,
  FROM_AMOUNT: 11,
  TO_AMOUNT: 11,
};

const LoanInterest = () => {
  const name = "Loan interest List";
  const [loanTypeList, setLoanTypeList] = useState([{ label: "label", id: 0 }]);

  const validationSchema = yup.object({
    loanType: yup.object().nullable().required("Loan Type is required"),
    rateOfInterest: yup.string().required("Rate Of Interest is required"),
    fromAmount: yup.string().required("From Amount is required"),
    toAmount: yup.string().required("To Amount is required"),
    effectiveFromDate: yup
      .date()
      .nullable()
      .required("Effective From Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      loanType: "",
      rateOfInterest: "",
      orderDate: null,
      fromAmount: "",
      toAmount: "",
      effectiveFromDate: null,
      isActive: false,
      isChangedRateOfInterestApplicable: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Loan Interest form values:\n", values);
    },
  });

  const handleCancel = () => {
    //setBtnText("Save");
    //setSelectedRow(null);
    formik.resetForm();
  };

  return (
    <Card>
      <CardContent>
        <PageTitle name={name} />
        <Box component="form" onSubmit={formik.handleSubmit}>
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
                id="loanType"
                name="loanType"
                size="small"
                options={loanTypeList}
                value={
                  loanTypeList.find(
                    (option) => option.id === formik.values.loanType?.id
                  ) || null
                }
                onChange={(e, value) => {
                  if (value === null) {
                    formik.setFieldValue("loanType", null);
                  } else {
                    formik.setFieldValue("loanType", value);
                  }
                }}
                getOptionLabel={(value) => value.label}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Loan Type"
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.errors.loanType && formik.touched.loanType
                        ? formik.errors.loanType
                        : null
                    }
                    error={
                      formik.errors.loanType && formik.touched.loanType
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
                label="Rate Of Interest"
                required
                id="rateOfInterest"
                name="rateOfInterest"
                fullWidth
                size="small"
                customInput={TextField}
                //suffix="%"
                decimalScale={3}
                allowNegative={false}
                value={formik.values.rateOfInterest}
                onValueChange={({ value }) => {
                  formik.setFieldValue("rateOfInterest", value);
                }}
                inputProps={
                  {
                    //maxLength: MAX_LENGTH.RATE_OF_INTEREST,
                  }
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                helperText={
                  formik.errors.rateOfInterest && formik.touched.rateOfInterest
                    ? formik.errors.rateOfInterest
                    : null
                }
                error={
                  formik.errors.rateOfInterest && formik.touched.rateOfInterest
                    ? true
                    : false
                }
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={3}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"en-gb"}
              >
                <DatePicker
                  id="orderDate"
                  name="orderDate"
                  sx={{ width: "100%" }}
                  //disablePast
                  format="DD/MM/YYYY"
                  value={formik.values.orderDate}
                  onChange={(value) => formik.setFieldValue("orderDate", value)}
                  //onBlur={formik.handleBlur}
                  label="Order Date"
                  slotProps={{
                    textField: {
                      size: "small",
                      //required: true
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      fullWidth
                      //required
                      {...params}
                      // error={
                      //   formik.touched.orderDate &&
                      //   Boolean(formik.errors.orderDate)
                      // }
                      // helperText={
                      //   formik.touched.orderDate &&
                      //   formik.errors.orderDate
                      // }
                      // onBlur={formik.handleBlur}
                    />
                  )}
                />
              </LocalizationProvider>
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

            <Grid item xs={12} sm={4} md={4} lg={3}>
              <NumericFormat
                label="From Amount"
                required
                id="fromAmount"
                name="fromAmount"
                fullWidth
                size="small"
                customInput={TextField}
                //prefix={"₹"}
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                decimalScale={0}
                allowNegative={false}
                value={formik.values.fromAmount}
                onValueChange={({ value }) => {
                  formik.setFieldValue("fromAmount", value);
                }}
                inputProps={{
                  maxLength: MAX_LENGTH.FROM_AMOUNT,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                helperText={
                  formik.errors.fromAmount && formik.touched.fromAmount
                    ? formik.errors.fromAmount
                    : null
                }
                error={
                  formik.errors.fromAmount && formik.touched.fromAmount
                    ? true
                    : false
                }
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={3}>
              <NumericFormat
                label="To Amount"
                required
                id="toAmount"
                name="toAmount"
                fullWidth
                size="small"
                customInput={TextField}
                //prefix={"₹"}
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                decimalScale={0}
                allowNegative={false}
                value={formik.values.toAmount}
                onValueChange={({ value }) => {
                  formik.setFieldValue("toAmount", value);
                }}
                inputProps={{
                  maxLength: MAX_LENGTH.TO_AMOUNT,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                helperText={
                  formik.errors.toAmount && formik.touched.toAmount
                    ? formik.errors.toAmount
                    : null
                }
                error={
                  formik.errors.toAmount && formik.touched.toAmount
                    ? true
                    : false
                }
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={2}>
              <FormGroup sx={{ width: "100%" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isActive}
                      onChange={(e) =>
                        formik.setFieldValue("isActive", e.target.checked)
                      }
                    />
                  }
                  label="Is Active"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <FormGroup sx={{ width: "100%" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isChangedRateOfInterestApplicable}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "isChangedRateOfInterestApplicable",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Is changed Rate Of Interest applicable"
                />
              </FormGroup>
            </Grid>
          </Grid>
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

export default LoanInterest;
