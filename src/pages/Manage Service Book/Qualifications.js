import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField
} from "@mui/material";
import Button from '@mui/material/Button';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from 'formik';
import React, { useState } from 'react';
import SearchTable from "../../components/SearchTable";

import { H3 } from "../../components/Typography";
import SchoolIcon from '@mui/icons-material/School';
const QualifiactionDetails = ({ formData, setFormData, prevData, onButtonClick }) => {
  const formik = useFormik({
    initialValues: {

    }
  });
  const [genderList, setGenderList] = useState([]);
  


  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "Sr No.",
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      hide: true
    },
    {
      width: 250,
      headerName: "Qualifiaction Types",
      field: "QualifiactionTypes",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "Degree",
      field: "degree",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "courseType",
      field: "CourseType",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "Board/University/Institute",
      field: "Board",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "Course Duration(in months)",
      field: "Duration",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "Markspercentage",
      headerName: "Marks Obtained (%age)",
      width: 140,
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "GPA",
      field: "gpa",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "Grade",
      field: "Grade",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "Passing Year",
      field: "passingYear",
      headerClassName: "super-app-theme--header",
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
          //onClick={() => handleDeleteRow(params.row.id)}
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
  return (
    <Card>
      <CardContent>
      <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                <SchoolIcon sx={{ fontSize: "25px", color: '#246cb5' }} />
                <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Joining Details</H3>
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
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Autocomplete
              disablePortal
              margin="normal"
              size="small"
              id="QualifiactionTypes"
              name="QualifiactionTypes"
              options={genderList}
              value={genderList.find(
                (option) => option.id === formik.values.QualifiactionTypes
              ) || null}
              onChange={(e, value) => {
                if (value === null) {
                  formik.setFieldValue("QualifiactionTypes", null)
                }
                else
                  formik.setFieldValue("QualifiactionTypes", value.id)
              }}
              getOptionLabel={(value) => value.label}
              sx={{ width: "100%", mt: 2 }}
              renderInput={(params) => (
                <TextField {...params}
                  label="Qualifiaction Type"
                  required
                  InputLabelProps={{ shrink: true }}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.QualifiactionTypes && formik.touched.QualifiactionTypes ? formik.errors.QualifiactionTypes : null}
                  error={formik.errors.QualifiactionTypes && formik.touched.QualifiactionTypes ? true : false}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Autocomplete
              disablePortal
              margin="normal"
              size="small"
              id="degree"
              name="degree"
              options={genderList}
              value={genderList.find(
                (option) => option.id === formik.values.degree
              ) || null}
              onChange={(e, value) => {
                if (value === null) {
                  formik.setFieldValue("degree", null)
                }
                else
                  formik.setFieldValue("degree", value.id)
              }}
              getOptionLabel={(value) => value.label}
              sx={{ width: "100%", mt: 2 }}
              renderInput={(params) => (
                <TextField {...params}
                  label="Degree"
                  required
                  InputLabelProps={{ shrink: true }}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.degree && formik.touched.degree ? formik.errors.degree : null}
                  error={formik.errors.degree && formik.touched.degree ? true : false}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Autocomplete
              disablePortal
              margin="normal"
              size="small"
              id="courseType"
              name="courseType"
              options={genderList}
              value={genderList.find(
                (option) => option.id === formik.values.courseType
              ) || null}
              onChange={(e, value) => {
                if (value === null) {
                  formik.setFieldValue("courseType", null)
                }
                else
                  formik.setFieldValue("courseType", value.id)
              }}
              getOptionLabel={(value) => value.label}
              sx={{ width: "100%", mt: 2 }}
              renderInput={(params) => (
                <TextField {...params}
                  label="Course Type"
                  required
                  InputLabelProps={{ shrink: true }}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.courseType && formik.touched.courseType ? formik.errors.courseType : null}
                  error={formik.errors.courseType && formik.touched.courseType ? true : false}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              label="Board/University/Institute"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Board && formik.touched.Board ? formik.errors.Board : null}
              error={formik.errors.Board && formik.touched.Board ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              label="Course Duration(in months)"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Duration && formik.touched.Duration ? formik.errors.Duration : null}
              error={formik.errors.Duration && formik.touched.Duration ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              label="Marks Obtained (%age)"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Markspercentage && formik.touched.Markspercentage ? formik.errors.Markspercentage : null}
              error={formik.errors.Markspercentage && formik.touched.Markspercentage ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              label="GPA"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.gpa && formik.touched.gpa ? formik.errors.gpa : null}
              error={formik.errors.gpa && formik.touched.gpa ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Autocomplete
              disablePortal
              margin="normal"
              size="small"
              id="Grade"
              name="Grade"
              options={genderList}
              value={genderList.find(
                (option) => option.id === formik.values.Grade
              ) || null}
              onChange={(e, value) => {
                if (value === null) {
                  formik.setFieldValue("Grade", null)
                }
                else
                  formik.setFieldValue("Grade", value.id)
              }}
              getOptionLabel={(value) => value.label}
              sx={{ width: "100%"}}
              renderInput={(params) => (
                <TextField {...params}
                  label="Grade"
                  required
                  InputLabelProps={{ shrink: true }}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.Grade && formik.touched.Grade ? formik.errors.Grade : null}
                  error={formik.errors.Grade && formik.touched.Grade ? true : false}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              label="Passing Year"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.passingYear && formik.touched.passingYear ? formik.errors.passingYear : null}
              error={formik.errors.passingYear && formik.touched.passingYear ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              label="Description"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Description && formik.touched.Description ? formik.errors.Description : null}
              error={formik.errors.Description && formik.touched.Description ? true : false}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Autocomplete
              disablePortal
              margin="normal"
              size="small"
              id="AcquiringStatus"
              name="AcquiringStatus"
              options={genderList}
              value={genderList.find(
                (option) => option.id === formik.values.AcquiringStatus
              ) || null}
              onChange={(e, value) => {
                if (value === null) {
                  formik.setFieldValue("AcquiringStatus", null)
                }
                else
                  formik.setFieldValue("AcquiringStatus", value.id)
              }}
              getOptionLabel={(value) => value.label}
              sx={{ width: "100%"}}
              renderInput={(params) => (
                <TextField {...params}
                  label="Acquiring Status"
                  required
                  InputLabelProps={{ shrink: true }}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.AcquiringStatus && formik.touched.AcquiringStatus ? formik.errors.AcquiringStatus : null}
                  error={formik.errors.AcquiringStatus && formik.touched.AcquiringStatus ? true : false}
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={4} md={4} lg={4}>
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
                  label="Order issuing office/Authority"
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
              label="Appointing Authority"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
              error={formik.errors.Gender && formik.touched.Gender ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              label="Source of Appointment"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
              error={formik.errors.Gender && formik.touched.Gender ? true : false}
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
          <Grid item xs={12} sm={2} md={2} lg={2}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"en-gb"}
            >
              <DatePicker
                label="Joining/Charge Taken Date"
                inputFormat="DD-MM-YYYY"
                maxDate={new Date()}
                id="dob"
                name="dob"
                value={formik.values.dob}
                InputLabelProps={{ shrink: true }}
                onChange={(value) => { if (value === null) { formik.setFieldValue("age", "") } }}
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
          <Grid item xs={12} sm={2} md={2} lg={2}>
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
                  label=""
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
                  label="Joining Time"
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
                  label="Joining Department"
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
                  label="Joining office"
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
                  label="Joining Cadre"
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
                  label="Joining Designation"
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
                  label="Joining Revision"
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
                  label="Pay Scale/Pay Band/Pay Level"
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
              label="Grade Pay"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
              error={formik.errors.Gender && formik.touched.Gender ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              label="Basic Pay"
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
              error={formik.errors.Gender && formik.touched.Gender ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              label="Remarks"
              rows={3}
              required
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender : null}
              error={formik.errors.Gender && formik.touched.Gender ? true : false}
            />
          </Grid>
        </Grid> */}

        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{
              minWidth: 100,
              ml: 1,
              mb: 2,
              mt: { xs: 1, md: 0 },
            }}
            variant="contained"
            // type="submit"
            // disabled={submitDisable}
            onClick={() => {
              // checkValid();
              // setFormData((prevFormData) => ({
              //     ...prevFormData,
              //     pageone: { formik: formik.values }
              // }));
            }}
          >
            ADD&nbsp;
            <SaveIcon></SaveIcon>
          </Button>
        </Box>
        <SearchTable
          columns={columns}
          isCheckbox={false}
          isHideDensity={false}
          isHideExport={false}
          isHideFilter={false}
          isHideColumn={false}
          isHidePaging={true}
          // data={familyDetailsFormik.values.tableRows}
          name="abc"
          id="hjjh"
        ></SearchTable>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            type="button"
            sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
            onClick={() => onButtonClick("pageone")}
            variant="outlined"
            color="primary"
          >
            <KeyboardArrowLeftIcon />&nbsp; PREVIOUS
          </Button>
          <Button
            sx={{
              minWidth: 100,
              ml: 1,
              mt: { xs: 1, md: 0 },
            }}
            variant="contained"
            type="submit"
            // disabled={submitDisable}
            onClick={() => {
              // checkValid();
              // setFormData((prevFormData) => ({
              //     ...prevFormData,
              //     pageone: { formik: formik.values }
              // }));
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
              onButtonClick("pagethree")
            }
            }
          >
            NEXT &nbsp;
            <NavigateNextIcon />
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
export default QualifiactionDetails
