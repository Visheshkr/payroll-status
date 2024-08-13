import CachedIcon from '@mui/icons-material/Cached';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SaveIcon from '@mui/icons-material/Save';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SchoolIcon from '@mui/icons-material/School';
import {
  Alert,
  Autocomplete,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Slide,
  TextField
} from "@mui/material";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from 'axios';
import dayjs from "dayjs";
import { useFormik } from 'formik';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import * as Yup from 'yup';
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import { H3 } from "../../components/Typography";
import UploadAttachments from './UploadAttachments';
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
const QualifiactionDetails = ({ formData, setFormData, prevData, onButtonClick, view }) => {
  const validationSchema = Yup.object().shape({
    QualifiactionTypes: Yup.string().required("Qualification Type is required").nullable(),
    institute: Yup.string().required("Institute Name is required").nullable(),
    course: Yup.string().required("Course is required").nullable(),
    Board: Yup.string().required("Board is required").nullable(),
    marksCgpa: Yup.string().required("Marks/Cgpa is required").nullable(),
    marks: Yup.string().when("marksCgpa", {
      is: (value) => value === '269',
      then: Yup.string().required("Marks secured is required").nullable(),
    }).nullable(),
    totalMarks: Yup.string().when("marksCgpa", {
      is: (value) => value === '269',
      then: Yup.string().required("Total Marks is required").nullable(),
    }).nullable(),
    gpa: Yup.string().when("marksCgpa", {
      is: (value) => value === '270',
      then: Yup.string().required("Cgpa is required").nullable(),
    }).nullable(),
    admissionDate: Yup.string().required("Starting Year is required").nullable(),
    completionDate: Yup.string().required("Passing Year is required").nullable(),
    //filePath: Yup.string().required("Please upload attachment").nullable()
  })
  const formik = useFormik({
    initialValues: {
      QualifiactionTypes: null,
      degree: null,
      courseType: null,
      institute: '',
      course: '',
      Board: '',
      Duration: '',
      marksCgpa: null,
      marks: '',
      totalMarks: '',
      gpa: '',
      passingYear: '',
      admissionDate: null,
      completionDate: null,
      file: null,
      filePath: null,
    },
    validationSchema: validationSchema,
  });
  const tomorrow = dayjs().add(0, 'year');
  const [qualificationList, setQualificationList] = useState([]);
  const [degreeList, setDegreeList] = useState([])
  const [courseList, setCourseList] = useState([])
  const [marksCgpaList, setMarksCgpaList] = useState([])
  const [rows, setRows] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");
  const { showSnackbar } = useSnackbar();
  const [showNext, setShowNext] = useState(view);
  const [allowedFile, setAllowedFile] = useState('application/pdf');
  const getValueFromList = (List, value) => {
    return List.find((option) => option.id === value) ?? null;
  };
  const textFieldStyles = {
    borderRadius: '5px'
  }
  useEffect(() => {
    axios.get(`http://141.148.194.18:8052/payroll/employee/educational-details/dropdown-init`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then(response => {
      // let sortedData = response.data.map((value) => {
      //      value.label = value.label
      //      return value;
      //  })
      //  console.log(sortedData);
      if (response.status === 200) {
        setQualificationList(response.data.qualification);
        //setDegreeList(response.data.relationship);
        setMarksCgpaList(response.data.marksCgpa);
      }
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
  }, [])
  useEffect(() => {
    if (view) {
      fetchData();
    }
  }, [view]);
  const fetchData = () => {
    axios.get(`http://141.148.194.18:8052/payroll/employee/educational-details/${formData.refNo}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then(response => {
      console.log(response)
      if (response.data.status && response.data.result) {
        setRows(response.data.result.map(item => ({
          id: item.eduId,
          qualificationId: item.qualificationId ? item.qualificationId.id : null,
          // qualificationLabel:item.qualificationId? item.qualificationId.label: "N/A",
          boardOrUniversity: item.boardOrUniversity,
          instituteName: item.instituteName,
          course: item.course,
          marksCgpaId: item.marksCgpaId ? item.marksCgpaId.id : null,
          //marksCgpaLabel: item.marksCgpaId?item.marksCgpaId.label: "N/A",
          marksSecured: item.marksSecured !== null ? item.marksSecured : "N/A",
          totalMarks: item.totalMarks !== null ? item.totalMarks : "N/A",
          cgpa: item.cgpa !== null ? item.cgpa : "N/A",
          admissionDate: dayjs(item.admissionDate, 'DD-MM-YYYY'),
          completionDate: dayjs(item.completionDate, 'DD-MM-YYYY')
        })));
      }
    })
  }
  const allowedFormats = ["application/pdf", "image/jpeg", "image/png"];
  const showFile = (attachment) => {
    console.log(allowedFile)
    console.log(attachment)
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const blob = new Blob([data], { type: allowedFile });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank')
    }
    reader.readAsArrayBuffer(attachment);
  }
  const handleViewDocument = (file) => {
    console.log(file);
    showFile(file)
  }
  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "S No.",
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      hide: true
    },
    {
      width: 250,
      headerName: "Qualification Type",
      field: "qualificationId",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const qualification = getValueFromList(qualificationList, params.row.qualificationId);
        return qualification ? qualification.label : "";
      }
    },
    {
      width: 200,
      headerName: "Board/University",
      field: "boardOrUniversity",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    // {
    //   width: 200,
    //   headerName: "courseType",
    //   field: "CourseType",
    //   headerClassName: "super-app-theme--header",
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    // },
    {
      width: 200,
      headerName: "Institute Name",
      field: "instituteName",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "Course",
      field: "course",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    // {
    //   width: 200,
    //   headerName: "Course Duration(in months)",
    //   field: "Duration",
    //   headerClassName: "super-app-theme--header",
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    // },
    {
      field: "marksCgpaId",
      headerName: "Marks/Cgpa",
      width: 140,
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        // return (
        //   getValueFromList(marksCgpaList, params.row.marksCgpaId).label
        // )
        const marksCgpa = getValueFromList(marksCgpaList, params.row.marksCgpaId);
        return marksCgpa ? marksCgpa.label : "";
      }
    },
    {
      field: "marksSecured",
      headerName: "Marks Obtained",
      width: 140,
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "totalMarks",
      headerName: "Total Marks",
      width: 140,
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "CGPA",
      field: "cgpa",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      width: 200,
      headerName: "Admission Date",
      field: "admissionDate",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          dayjs(params.row.admissionDate).format("DD-MM-YYYY")
        )
      }
    },
    {
      width: 200,
      headerName: "Completion Date",
      field: "completionDate",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          dayjs(params.row.completionDate).format("DD-MM-YYYY")
        )
      }
    },
    {
      width: 200,
      headerName: "Uploaded File",
      field: "uploadedFile",
      headerClassName: "super-app-theme--header",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Button variant="outlined" sx={{ borderRadius: '4px', marginLeft: '8px' }} component="label" onClick={() => { handleViewDocument(params.row.file) }}>
            View Document
          </Button>
        )
      }
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
            // value={params.value}
            onClick={() => handleDeleteRow(params.row.id)}
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
  const addRow = () => {
    formik
      .validateForm()
      .then((formErrors) => {
        if (Object.keys(formErrors).length > 0) {
          console.log(Object.keys(formErrors))
          //alert(Object.keys(formErrors))
          setToastMessage("Please fill all the required * fields and upload attachment")
          setToastSeverity("error");
          setOpenToast(true);
        }
        else {
          if (formik.values.filePath === null) {
            alert("Please upload attachment");
            return;
          }
          const newRow = {
            id: rows.length + 1,
            qualificationId: formik.values.QualifiactionTypes,
            instituteName: formik.values.institute,
            boardOrUniversity: formik.values.Board,
            course: formik.values.course,
            marksCgpaId: formik.values.marksCgpa,
            marksSecured: formik.values.marks,
            totalMarks: formik.values.totalMarks,
            cgpa: formik.values.gpa,
            admissionDate: dayjs(formik.values.admissionDate).format('YYYY'),
            completionDate: dayjs(formik.values.completionDate).format('YYYY'),
            filePath: formik.values.filePath,
            file: formik.values.file,
            actiondelete: ''
          };
          let temp = [...rows]
          temp.push(newRow)
          setRows(temp);
          formik.resetForm()
          setUploadedFiles([])
        }
      })
      .catch((err) => {
        formik.setSubmitting(false);
      });
  };
  console.log(rows);
  const handleFileUpload = (response, type, docId, fileObj) => {
    if (type === "upload") {
      console.log(docId)
      console.log(fileObj)
      formik.setFieldValue("filePath", response);
      formik.setFieldValue("file", fileObj.file);
    } else if (type === "delete") {
      formik.setFieldValue("filePath", null);
      formik.setFieldValue("file", null);
    }
  };
  console.log(formik.values)
  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((row) => row.id !== index);
    const updatedRowsWithId = updatedRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setRows(updatedRowsWithId);
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
      SaveQualificationDetails();
    }
  };
  const SaveQualificationDetails = async () => {
    try {
      let arr = [];
      let obj = {}
      rows.map((it) => {
        obj = {
          "qualificationId": it.qualificationId,
          "instituteName": it.instituteName,
          "boardOrUniversity": it.boardOrUniversity,
          "course": it.course,
          "marksCgpaId": it.marksCgpaId,
          "marksSecured": it.marksSecured,
          "totalMarks": it.totalMarks,
          "cgpa": it.cgpa,
          "startingYear": it.admissionDate,
          "passingYear": it.completionDate,
          "filePath": it.filePath[`${it.file.name}`]
        }
        arr.push(obj)
      })
      let body = {
        // "refNo": "BRD0000000000027",
        "refNo": localStorage.getItem("refNo"),
        "educationalDetailsList": arr
      }
      const res = await axios.post(
        `${process.env.REACT_APP_PAYROLL_API_URL}/employee/educational-details`,
        body,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        }
      );
      console.log("the saved details  areeeeee", res);
      if (res.data.statusCode === 200) {
        showSnackbar(res.data.message, "success");
        setShowNext(true)
        onButtonClick("pagethree");
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };
  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
          <SchoolIcon sx={{ fontSize: "25px", color: '#246cb5' }} />
          <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Qualification Details</H3>
        </div>
        <Divider />
        {view !== true && (
          <>
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
                  options={qualificationList}
                  value={qualificationList.find(
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
                      label="Qualification Type"
                      required
                      onBlur={formik.handleBlur}
                      helperText={formik.errors.QualifiactionTypes ? formik.errors.QualifiactionTypes : null}
                      error={formik.errors.QualifiactionTypes ? true : false}
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
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
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.courseType && formik.touched.courseType ? formik.errors.courseType : null}
                  error={formik.errors.courseType && formik.touched.courseType ? true : false}
                />
              )}
            />
          </Grid> */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
                  label="Board/University"
                  required
                  fullWidth
                  margin="normal"
                  name="Board"
                  id="Board"
                  size="small"
                  InputProps={{ sx: textFieldStyles }}
                  value={formik.values.Board}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.Board ? formik.errors.Board : null}
                  error={formik.errors.Board ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
                  label="Institute Name"
                  required
                  name="institute"
                  id="institute"
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{ sx: textFieldStyles }}
                  value={formik.values.institute}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.institute ? formik.errors.institute : null}
                  error={formik.errors.institute ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
                  label="Course"
                  required
                  name="course"
                  id="course"
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{ sx: textFieldStyles }}
                  value={formik.values.course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.errors.course ? formik.errors.course : null}
                  error={formik.errors.course ? true : false}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              label="Course Duration(in months)"
              required
              name="Duration"
              id="Duration"
              fullWidth
              size="small"
              value={formik.values.Duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.errors.Duration && formik.touched.Duration ? formik.errors.Duration : null}
              error={formik.errors.Duration && formik.touched.Duration ? true : false}
            />
          </Grid> */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  size="small"
                  id="marksCgpa"
                  name="marksCgpa"
                  options={marksCgpaList}
                  value={marksCgpaList.find(
                    (option) => option.id === formik.values.marksCgpa
                  ) || null}
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("marksCgpa", null)
                    }
                    else
                      formik.setFieldValue("marksCgpa", value.id)
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField {...params}
                      label="Marks/Cgpa"
                      required
                      onBlur={formik.handleBlur}
                      helperText={formik.errors.marksCgpa ? formik.errors.marksCgpa : null}
                      error={formik.errors.marksCgpa ? true : false}
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              {formik.values.marksCgpa === 269 && (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    label="Marks Obtained"
                    required
                    fullWidth
                    size="small"
                    name="marks"
                    id='marks'
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.marks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.marks ? formik.errors.marks : null}
                    error={formik.errors.marks ? true : false}
                  />
                </Grid>
              )}
              {formik.values.marksCgpa === 269 && (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    label="Total Marks"
                    required
                    fullWidth
                    size="small"
                    name="totalMarks"
                    id='totalMarks'
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.totalMarks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.totalMarks ? formik.errors.totalMarks : null}
                    error={formik.errors.totalMarks ? true : false}
                  />
                </Grid>
              )}
              {formik.values.marksCgpa === 270 && (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    label="CGPA"
                    name="gpa"
                    id='gpa'
                    required
                    fullWidth
                    size="small"
                    InputProps={{ sx: textFieldStyles }}
                    value={formik.values.gpa}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.gpa ? formik.errors.gpa : null}
                    error={formik.errors.gpa ? true : false}
                  />
                </Grid>
              )}
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
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
          </Grid> */}
            </Grid>
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
                <>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"en-gb"}
                  >
                    <DatePicker
                      label="Starting Year"
                      format="YYYY"
                      maxDate={tomorrow}
                      views={['year']}
                      slotProps={{ textField: { size: "small" } }}
                      sx={{ width: "100%", mt: 2 }}
                      id="admissionDate"
                      name="admissionDate"
                      size="small"
                      value={formik.values.admissionDate}
                      onChange={(value) => { if (value === null) { formik.setFieldValue("admissionDate", "") } else { formik.setFieldValue("admissionDate", dayjs(value, 'YYYY')) } }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          margin="normal"
                          name="admissionDate"
                          required
                          {...params}
                          // error={formik.touched.admissionDate && Boolean(formik.errors.admissionDate)}
                          // helperText={formik.touched.admissionDate && formik.errors.admissionDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          helperText={formik.errors.admissionDate && formik.touched.admissionDate ? formik.errors.admissionDate : null}
                          error={formik.errors.admissionDate && formik.touched.admissionDate ? true : false}
                        />
                      )}
                    />
                    <p style={{ color: '#d42d2d', fontSize: "10px" }}>
                      {formik.errors.admissionDate ? formik.errors.admissionDate : null}
                    </p>
                  </LocalizationProvider>
                </>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={"en-gb"}
                  >
                    <DatePicker
                      label="Passing Year"
                      format="YYYY"
                      views={['year']}
                      // maxDate={endOfYear(new Date())}
                      maxDate={tomorrow}
                      id="completionDate"
                      name="completionDate"
                      slotProps={{ textField: { size: "small" } }}
                      sx={{ width: "100%", mt: 2 }}
                      value={formik.values.completionDate}
                      onChange={(value) => { if (value === null) { formik.setFieldValue("completionDate", "") } else { formik.setFieldValue("completionDate", dayjs(value, 'YYYY')) } }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          margin="normal"
                          name="completionDate"
                          required
                          {...params}
                          error={formik.touched.completionDate && Boolean(formik.errors.completionDate)}
                          helperText={formik.touched.completionDate && formik.errors.completionDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      )}
                    />
                    <p style={{ color: '#d42d2d', fontSize: "10px" }}>
                      {formik.errors.completionDate ? formik.errors.completionDate : null}
                    </p>
                  </LocalizationProvider>
                </>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <UploadAttachments
                  onUpload={handleFileUpload}
                  maxNumberOfFiles={1}
                  maxFileSize={5}
                  filesAccepted={[
                    "application/pdf",
                  ]}
                  maxWidth="lg"
                  fullWidth={true}
                  dialogHeading="Upload Files:"
                  buttonName="Upload Attachment"
                  isDraggable={false}
                  displayFileSize={true}
                  displayThumbnail={true}
                  displaySNo={true}
                  showPreviewsInDropzone={false}
                  displayNote={true}
                  onSaveAttach={setUploadedFiles}
                  attachments={uploadedFiles}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
          <Button variant="outlined" sx={{ borderRadius: '4px', marginLeft: '8px' }} component="label" onClick={()=>{handleViewDocument(formik.values.file)}}>
          View Document
        </Button>
        </Grid>
          {/* <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
            name="passingYear"
            id="passingYear"
              label="Passing Year"
              required
              fullWidth
              size="small"
              value={formik.values.passingYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.errors.passingYear && formik.touched.passingYear ? formik.errors.passingYear : null}
              error={formik.errors.passingYear && formik.touched.passingYear ? true : false}
            />
          </Grid> */}
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
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
          </Grid> */}
            </Grid>
          </>
        )}
        {view !== true && (
          <Box
            spacing={2}
            sx={{ mt: 1, textAlign: 'right' }}
          >
            <Button
              sx={{
                minWidth: 100,
                ml: 1,
              }}
              variant="contained"
              type="submit"
              onClick={() => {
                addRow()
              }}
            >
              <PlaylistAddIcon /> &nbsp; ADD DETAILS
            </Button>
            <Button
              type="button"
              sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
              onClick={() => {
                formik.resetForm()
              }}
              variant="outlined"
            >
              <CachedIcon />&nbsp;RESET
            </Button>
          </Box>
        )}
        {/* <Box component={"div"} >
            <SearchTable
              columns={columns}
              // data={rowss}
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
          </Box> */}
        {rows.length > 0 && (
          <Box component={"div"} >
            <SearchTable
              columns={columns}
              // data={rowss}
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
          </Box>
        )}
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          {/* <Button
            type="button"
            sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
            onClick={() => onButtonClick("pageone")}
            variant="outlined"
            color="primary"
          >
            <KeyboardArrowLeftIcon />&nbsp; PREVIOUS
          </Button> */}
          {view !== true && (
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
                // SaveQualificationDetails()
                if (rows.length > 0) {
                  callConfirmDialog();
                }
                else {
                  showSnackbar("Please add Qualification Details", "error");
                  return;
                }
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
          )}
          <Button
            sx={{
              minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
            }}
            variant="outlined"
            //type="submit"
            disabled={!showNext}
            onClick={() => {
              onButtonClick("pagethree")
            }
            }
          >
            NEXT &nbsp;
            <NavigateNextIcon />
          </Button>
        </Box>
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
          TransitionComponent={TransitionLeft}
        >
          <Alert onClose={handleClose} severity={toastSeverity}
            sx={{
              width: '100%',
              padding: { sm: '15px', xs: '10px' },
              borderRadius: '15px',
              fontSize: { sm: '16px', xs: '14px' },
              boxShadow: "0 0 10px #999",
              marginTop: { sm: '25px', xs: '20px' }
            }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  )
}
export default QualifiactionDetails
