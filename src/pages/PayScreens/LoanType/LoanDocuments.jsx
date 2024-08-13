import CachedIcon from "@mui/icons-material/Cached";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
//import axiosClient from "../../utils/AxiosInterceptor";
//
import Loader from "../../../components/Loader";
import SearchTable from "../../../components/SearchTableAlt";
import { useSnackbar } from "../../../components/Snackbar";
import PageTitle from "../../../layouts/PageTitle";

const MAX_LENGTH = {
  DOCUMENT_NAME: 100,
  LOAN_DESCRIPTION: 200,
};

const LoanDocuments = () => {
  const { showSnackbar } = useSnackbar();
  const [isLoader, setIsLoader] = useState(false);
  const name = "Add Loan Documents";
  const name1 = "Documents Details";
  const [btnText, setBtnText] = useState("Save");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loanTypeList, setLoanTypeList] = useState([{ label: "label", id: 0 }]);
  const [loanPurposeList, setLoanPurposeList] = useState([
    { label: "label", id: 0 },
  ]);
  const [roleList, setRoleList] = useState([{ label: "label", id: 0 }]);
  const [stageList, setStageList] = useState([{ label: "label", id: 0 }]);
  const [rows, setRows] = useState([
    {
      SrNo: 1,
      loanType: "Cycle Advance to State Employee",
      loanPurpose: "For cycle",
      role: "role",
      stage: "stage",
      documentName: "document name",
      status: true,
    },
  ]);
  const columns = [
    {
      field: "SrNo",
      headerName: "Sr No.",
      flex: 0.1,
      minWidth: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "loanType",
      headerName: "Loan Type",
      flex: 0.2,
      minWidth: 190,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "loanPurpose",
      headerName: "Loan Purpose",
      flex: 0.2,
      minWidth: 190,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.2,
      minWidth: 190,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "stage",
      headerName: "Stage",
      flex: 0.1,
      minWidth: 140,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "documentName",
      headerName: "Document Name",
      flex: 0.1,
      minWidth: 140,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.1,
      minWidth: 140,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.2,
      minWidth: 190,
      headerClassName: "super-app-theme--header",
      disableClickEventBubbling: true,
      // renderCell: (params) => {
      //   // console.log(params.row)
      //   return (
      //     <Stack direction="row" spacing={2}>
      //       <Button
      //         variant="contained"
      //         sx={{
      //           color: "black",
      //           backgroundColor: "white",
      //           ":hover": { color: "black", backgroundColor: "white" },
      //           borderRadius: "4px",
      //         }}
      //         endIcon={<EditIcon />}
      //         size="small"
      //         onClick={() => {
      //           //handleUpdate(params.row)
      //         }}
      //       >
      //         Edit
      //       </Button>

      //       <Button
      //         variant="contained"
      //         sx={{
      //           color: "white",
      //           backgroundColor: "#286cb4",
      //           ":hover": { color: "white", backgroundColor: "#286cb4" },
      //           borderRadius: "4px",
      //         }}
      //         startIcon={<VisibilityIcon />}
      //         size="small"
      //         onClick={() => {
      //           //handleView(params.row.RoleId)
      //         }}
      //       >
      //         View
      //       </Button>
      //     </Stack>
      //   );
      // },
    },
  ];

  const validationSchema = yup.object({
    loanType: yup.object().nullable().required("Loan Type is required"),
    loanPurpose: yup.object().nullable().required("Loan Purpose is required"),
    role: yup.object().nullable().required("Role is required"),
    stage: yup.object().nullable().required("Stage is required"),
    documentName: yup
      .string()
      .min(3, "Document Name is Too Short!")
      .required("Document Name is required")
      .test(
        "min-3-alphabets",
        "Document Name must contain at least 3 consecutive alphabetic characters",
        (value) => value && /[a-zA-Z]{3}/.test(value)
      ),
  });

  const formik = useFormik({
    initialValues: {
      loanType: "",
      loanPurpose: "",
      role: "",
      stage: "",
      documentName: "",
      loanDescription: "",
      isMandatory: false,
      isActive: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const handleCancel = () => {
    setBtnText("Save");
    setSelectedRow(null);
    formik.resetForm();
  };

  return (
    <>
      {isLoader && <Loader />}
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
                  disabled
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
                <Autocomplete
                  disablePortal
                  disabled
                  //margin="normal"
                  fullWidth
                  id="loanPurpose"
                  name="loanPurpose"
                  size="small"
                  options={loanPurposeList}
                  value={
                    loanPurposeList.find(
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
                        formik.errors.loanPurpose && formik.touched.loanPurpose
                          ? formik.errors.loanPurpose
                          : null
                      }
                      error={
                        formik.errors.loanPurpose && formik.touched.loanPurpose
                          ? true
                          : false
                      }
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={3}>
                <Autocomplete
                  disablePortal
                  //margin="normal"
                  fullWidth
                  id="role"
                  name="role"
                  size="small"
                  options={roleList}
                  value={
                    roleList.find(
                      (option) => option.id === formik.values.role?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("role", null);
                    } else {
                      formik.setFieldValue("role", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.role && formik.touched.role
                          ? formik.errors.role
                          : null
                      }
                      error={
                        formik.errors.role && formik.touched.role ? true : false
                      }
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={3}>
                <Autocomplete
                  disablePortal
                  //margin="normal"
                  fullWidth
                  id="stage"
                  name="stage"
                  size="small"
                  options={stageList}
                  value={
                    stageList.find(
                      (option) => option.id === formik.values.stage?.id
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("stage", null);
                    } else {
                      formik.setFieldValue("stage", value);
                    }
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Stage"
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.stage && formik.touched.stage
                          ? formik.errors.stage
                          : null
                      }
                      error={
                        formik.errors.stage && formik.touched.stage
                          ? true
                          : false
                      }
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={8} md={8} lg={3}>
                <TextField
                  //margin="normal"
                  size="small"
                  fullWidth
                  type="text"
                  id="documentName"
                  name="documentName"
                  label="Document Name"
                  value={formik.values.documentName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.documentName && !!formik.errors.documentName
                  }
                  helperText={
                    formik.touched.documentName && formik.errors.documentName
                  }
                  required
                  inputProps={{
                    maxLength: MAX_LENGTH.DOCUMENT_NAME,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3} md={2} lg={2}>
                <FormGroup sx={{ width: "100%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.isMandatory}
                        onChange={(e) =>
                          formik.setFieldValue("isMandatory", e.target.checked)
                        }
                      />
                    }
                    label="Is Mandatory"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={2} md={2} lg={2}>
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
              <Grid item xs={12} sm={6} md={6} lg={5}>
                <TextField
                  //margin="normal"
                  size="small"
                  fullWidth
                  type="text"
                  id="loanDescription"
                  name="loanDescription"
                  label="Loan Description"
                  multiline
                  rows={4}
                  value={formik.values.loanDescription}
                  onChange={formik.handleChange}
                  inputProps={{
                    maxLength: MAX_LENGTH.LOAN_DESCRIPTION,
                  }}
                  // onBlur={formik.handleBlur}
                  // error={
                  //   formik.touched.loanDescription &&
                  //   !!formik.errors.loanDescription
                  // }
                  // helperText={
                  //   formik.touched.loanDescription &&
                  //   formik.errors.loanDescription
                  // }
                  // required
                  helperText={
                    formik.values.loanDescription.length >= 150 &&
                    `${
                      MAX_LENGTH.LOAN_DESCRIPTION -
                      formik.values.loanDescription.length
                    } characters remaining`
                  }
                />
              </Grid>
            </Grid>
            <Box spacing={2} sx={{ mt: 1, textAlign: "center" }}>
              <Button
                sx={{
                  minWidth: 100,
                  ml: 1,
                  mt: { xs: 1, md: 0 },
                }}
                disabled={isSubmitted}
                variant="contained"
                type="submit"
              >
                {btnText}
                &nbsp;
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
      <Card>
        <CardContent>
          <PageTitle name={name1} />
          <SearchTable
            columns={columns}
            data={rows}
            isCheckbox={false}
            isHideDensity={false}
            isHideExport={true}
            isHideFilter={true}
            isHideColumn={true}
            isHidePaging={false}
            name="villageName"
            id="villageName"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default LoanDocuments;
