import CachedIcon from "@mui/icons-material/Cached";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from "../../components/Loader";
import Checkbox from "@mui/material/Checkbox";


const GroupCreation = () => {
  const [rowss, setRowss] = useState([]);
  const [officeMenu, setOfficeMenu] = useState([]);
  const [officeId, setOfficeId] = useState([]);
  const [searchOfficeId, setSearchOfficeId] = useState([]);
  const [hoaMenu, setHoaMenu] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const { showSnackbar } = useSnackbar();

  const title = "Group Creation";
  useTitle(title);

  useEffect(() => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        if (response.data?.result?.length === 0) {
          showSnackbar("No data found", "warning");
        } else {
          let responseOfficeData = response.data?.result?.offices?.map(
            (value, index) => {
              let rowData = {
                id: value.typeId,
                label: value.typeName,
              };
              return rowData;
            }
          );
          setOfficeMenu(responseOfficeData);
        }
      })
      .catch((error) => {
        showSnackbar(
          error.response.data.message
            ? error.response.data.message
            : error.response.message,
          "error"
        );
      })
      .finally(() => setIsLoader(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchOfficeId.id) {
      setIsLoader(true);
      axiosClient
        .get(
          `${process.env.REACT_APP_PAYROLL_API_URL}/getHoaByOfficeId/${searchOfficeId.id}`
        )
        .then((response) => {
          if (response.data?.result?.length === 0 || response.data.result === null) {
            showSnackbar("No data found", "warning");
            setHoaMenu([]);
          } else {
            let responseData = response.data?.result?.map((value, index) => {
              let rowData = { ...value, index: index + 1 };

              return rowData;
            });

            setHoaMenu(
              responseData.map((item, index) => ({
                id: item.typeId,
                label: item.hoa,
              }))
            );
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        })
        .finally(() => setIsLoader(false));
    }
  }, [searchOfficeId]);

  useEffect(() => {
    if (officeId.id) {
      setIsLoader(true);
      axiosClient
        .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getGroups/${officeId.id}`)
        .then((response) => {
          if (response.data?.result?.length === 0 || response.data.result === null) {
            showSnackbar("No data found", "warning");
            setRowss([]);
          } else {
            setRowss(response.data.result);
          }
        })
        .catch((error) => {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        })
        .finally(() => setIsLoader(false));
    }
  }, [officeId]);

  const validationSchema = yup.object({
    officeSearchName: yup.object().nullable().required("Office Name is required"),
    groupCode: yup.string().required("Group Code is required"),
    groupName: yup.string().required("Group Name is required"),
    headOfAccount: yup
      .object()
      .nullable()
      .required("Head Of Account is required"),
    description: yup
      .string()
      .required("Description must be more than 5 letters"),
    isActive: yup.bool().required("Is Active is required"),
  });

  const formik = useFormik({
    initialValues: {
      officeName: "",
      officeSearchName:"",
      groupCode: "",
      groupName: "",
      headOfAccount: "",
      description: "",
      isActive: false,
      totalNumberEmployee: "",
      allottedEmployee: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          grpId: null,
          grpCode: values.groupCode,
          grpName: values.groupName,
          hoaId: values.headOfAccount.id,
          officeId: values.officeSearchName.id,
          description: values.description,
          isActive: values.isActive,
          status: 1,
        };

        axiosClient
          .put(`${process.env.REACT_APP_PAYROLL_API_URL}/saveGroups`, postData)

          .then((response) => {
            if (response.data.statusCode === 200) {
              setRowss((prevValue) => {
                const updatedRows = [...prevValue];
                updatedRows[selectedRow] = {
                  ...updatedRows[selectedRow],
                  ...response.data?.result,
                };

                return updatedRows;
              });
              showSnackbar(response.data?.message, "success");
              setBtnText("Save");
              formik.resetForm();
            } else {
              setBtnText("Update");
              showSnackbar(response.data?.message, "error");
            }
          })
          .catch((error) => {
            console.log(error);
            setBtnText("Update");
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
          })
          .finally(() => {
            setIsSubmitted(false);
          });
      } else {
        setBtnText("Saving");
        let postData = {
          grpId: null,
          grpCode: values.groupCode,
          grpName: values.groupName,
          hoaId: values.headOfAccount.id,
          officeId: values.officeSearchName.id,
          description: values.description,
          isActive: values.isActive,
          status: 1,
        };
        axiosClient
          .post(`${process.env.REACT_APP_PAYROLL_API_URL}/saveGroups`, postData)
          .then((response) => {
            if (response.data.statusCode === 200) {
              const rowData = {
                ...response.data.result,
              };
              setRowss([rowData, ...rowss]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
            } else {
              showSnackbar(response.data?.message, "error");
            }
          })
          .catch((error) => {
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
          })
          .finally(() => {
            setBtnText("Save");
            setIsSubmitted(false);
          });
      }
    },
  });

  const handleCancel = () => {
    setBtnText("Save");
    setSelectedRow(null);
    formik.resetForm();
  };

  const handleChange = (event) => {
    formik.setFieldValue("isActive", event.target.checked);
  };

  const columns = [
    {
      field: "index",
      headerName: "Sr No.",
      flex: 0.1,
      minWidth: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "officeName",
      headerName: "Office Name",
      flex: 0.2,
      minWidth: 160,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "grpCode",
      headerName: "Group Code",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "grpName",
      headerName: "Group Name",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "hoa",
      headerName: "Head of Account",
      flex: 0.2,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.2,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "numberOfAllocatedEmployee",
      headerName: "Number of Allocated Employee",
      flex: 0.2,
      minWidth: 60,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      minWidth: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "isActive",
      headerName: "IsActive",
      flex: 0.2,
      minWidth: 60,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <>
      {isLoader && <Loader />}
      <Grid container>
        <Grid xs={12}>
          <Card sx={{ my: 2 }} elevation={5}>
            <CardContent>
              <PageTitle name="Add Group" />
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={3}>
                  <Grid xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="officeSearchName"
                      name="officeSearchName"
                      size="small"
                      options={officeMenu}
                      value={
                        officeMenu.find(
                          (option) => option.id === formik.values.officeSearchName?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("officeSearchName", null);
                        } else {
                          setSearchOfficeId(value);
                          formik.setFieldValue("officeSearchName", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Office Name"
                          placeholder="Select Office Name"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.officeSearchName &&
                            formik.touched.officeSearchName
                              ? formik.errors.officeSearchName
                              : null
                          }
                          error={
                            formik.errors.officeSearchName &&
                            formik.touched.officeSearchName
                          }
                          required
                        />
                      )}
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="groupCode"
                      name="groupCode"
                      label="Group Code"
                      size="small"
                      value={formik.values.groupCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.groupCode && !!formik.errors.groupCode
                      }
                      helperText={
                        formik.touched.groupCode && formik.errors.groupCode
                      }
                      required
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="groupName"
                      name="groupName"
                      label="Group Name"
                      size="small"
                      value={formik.values.groupName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.groupName && !!formik.errors.groupName
                      }
                      helperText={
                        formik.touched.groupName && formik.errors.groupName
                      }
                      required
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="headOfAccount"
                      name="headOfAccount"
                      disabled={!searchOfficeId.id}
                      size="small"
                      options={hoaMenu}
                      value={
                        hoaMenu.find(
                          (option) =>
                            option.id === formik.values.headOfAccount?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("headOfAccount", null);
                        } else {
                          formik.setFieldValue("headOfAccount", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="HOA Name"
                          placeholder="Select HOA Name"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.headOfAccount &&
                            formik.touched.headOfAccount
                              ? formik.errors.headOfAccount
                              : null
                          }
                          error={
                            formik.errors.headOfAccount &&
                            formik.touched.headOfAccount
                          }
                          required
                        />
                      )}
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="description"
                      name="description"
                      label="Description"
                      size="small"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.description &&
                        !!formik.errors.description
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={4} md={4} lg={4}>
                    <FormGroup sx={{ width: "100%", mt: 2, mb: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formik.values.isActive}
                            onChange={handleChange}
                          />
                        }
                        label="Is Active"
                      />
                    </FormGroup>
                  </Grid>
                  {/* <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="totalNumberEmployee"
                      name="totalNumberEmployee"
                      label="Total Number Of Employee"
                      size="small"
                      disabled={true}
                      value={formik.values.totalNumberEmployee}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.totalNumberEmployee &&
                        !!formik.errors.totalNumberEmployee
                      }
                      helperText={
                        formik.touched.totalNumberEmployee &&
                        formik.errors.totalNumberEmployee
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="allottedEmployee"
                      name="allottedEmployee"
                      label="Number of Allocated Employee"
                      size="small"
                      disabled={true}
                      value={formik.values.allottedEmployee}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.allottedEmployee &&
                        !!formik.errors.allottedEmployee
                      }
                      helperText={
                        formik.touched.allottedEmployee &&
                        formik.errors.allottedEmployee
                      }
                    />
                  </Grid> */}
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
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <div style={{ marginBottom: "-2%" }}>
            <PageTitle name="Existing Group List" />
          </div>
          <Alert severity='warning' sx={{mt:7}}>
          Note:- Select office name for getting the list of all employees working in that office.
        </Alert>
        <Grid container spacing={2} sx={{mt:2}}>
          <Grid xs={12} sm={4}>
            <Autocomplete
              disablePortal
              margin="normal"
              fullWidth
              id="officeName"
              name="officeName"
              size="small"
              options={officeMenu}
              value={
                officeMenu.find(
                  (option) => option.id === formik.values.officeName?.id
                ) || null
              }
              onChange={(e, value) => {
                if (value === null) {
                  formik.setFieldValue("officeName", null);
                } else {
                  setOfficeId(value);
                  formik.setFieldValue("officeName", value);
                }
              }}
              getOptionLabel={(value) => value.label}
              sx={{ width: "100%", mt: 2, mb: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Office Name"
                  placeholder="Select Office Name"
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.errors.officeName && formik.touched.officeName
                      ? formik.errors.officeName
                      : null
                  }
                  error={
                    formik.errors.officeName && formik.touched.officeName
                      ? true
                      : false
                  }
                  required
                />
              )}
            />
          </Grid>
          </Grid>
          <Box component={"div"}>
            <SearchTable
              columns={columns}
              data={rowss.length > 0 ? rowss : []}
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

export default GroupCreation;
