import CachedIcon from '@mui/icons-material/Cached';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {
    Alert,
    Autocomplete,
    Box,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Slide,
    TextField
} from "@mui/material";
import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
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
function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}
const SaveFamilyDetails = ({ formData, setFormData, prevData, onButtonClick, view }) => {
    const [rows, setRows] = useState([]);
    const { showSnackbar } = useSnackbar();
    const [showNext, setShowNext] = useState(view);
    const [genderList, setGenderList] = useState([]);
    const [relationlist, setRelationList] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState("info");
    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenToast(false);
    };
    const textFieldStyles = {
        borderRadius: '5px'
    }
    const getValueFromList = (List, value) => {
        return List.find((option) => option.id === value) ?? null;
    };
    const handleDeleteRow = (index) => {
        const updatedRows = rows.filter((row) => row.id !== index);
        const updatedRowsWithId = updatedRows.map((row, index) => ({
            ...row,
            id: index + 1,
        }));
        setRows(updatedRowsWithId);
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").nullable(),
        relationship: Yup.string().required("Relationship is required").nullable(),
        gender: Yup.string().required("Gender is required").nullable(),
        dob: Yup.string().required("Date of Birth is required").nullable(),
        maritalStatus: Yup.string().required("Marital Status is required").nullable(),
        physicallyHandicapped: Yup.string()
            .required("Physically Handicapped is required")
            .nullable(),
        dependant: Yup.string().required("Dependant is required").nullable(),
        employed: Yup.string().required("Employed is required").nullable(),
        nominee: Yup.string().required("Nominee is required").nullable(),
        nomineePercent: Yup.string()
            .when("nominee", {
                is: (value) => value === "true",
                then: Yup.string().required("Nominee Percent is required")
                    .matches(/^(100|[1-9][0-9]?)$/, "Percentage can be between 1 and 100")
                    .nullable(),
            })
            .nullable(),
    })
    useEffect(() => {
        axios.get(`http://141.148.194.18:8052/payroll/employee/dropdown-init`, {
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
                setGenderList(response.data.gender);
                setRelationList(response.data.relationship);
                setMaritalStatusList(response.data.maritalStatus);
            }
            console.log(response);
        })
            .catch(error => {
                console.log(error);
            });
    }, [])
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
            SaveFamilyDetails();
        }
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            relationship: '',
            gender: '',
            dob: null,
            maritalStatus: '',
            physicallyHandicapped: '',
            disabilityPercentage: '',
            dependant: '',
            dependantIncome: '',
            employed: '',
            nominee: '',
            nomineePercent: ''
        },
        validationSchema: validationSchema,
    });
    const checkValid = async () => {
        formik
            .validateForm()
            .then((formErrors) => {
                if (Object.keys(formErrors).length > 0) {
                    console.log(Object.keys(formErrors));
                    //alert(Object.keys(formErrors))
                    setToastMessage(
                        "Please fill all the required * fields"
                    );
                    setToastSeverity("error");
                    setOpenToast(true);
                } else {
                    addRow()
                }
            })
    }
    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            name: formik.values.name,
            relationship: formik.values.relationship,
            gender: formik.values.gender,
            dob: dayjs(formik.values.dob).format("YYYY-MM-DD"),
            maritalStatus: formik.values.maritalStatus,
            physicallyHandicapped: formik.values.physicallyHandicapped,
            disabilityPercentage: formik.values.physicallyHandicapped === "true" ? formik.values.disabilityPercentage : '0',
            dependant: formik.values.dependant,
            dependantIncome: formik.values.dependant === "true" ? formik.values.dependantIncome : '0',
            employed: formik.values.employed,
            nominee: formik.values.nominee,
            nomineePercent: formik.values.nominee === "true" ? formik.values.nomineePercent : '0'
        };
        setRows([...rows, newRow]);
        formik.resetForm()
    };
    const SaveFamilyDetails = async () => {
        try {
            let arr = [];
            let obj = {}
            rows.map((it) => {
                obj = {
                    "relationshipId": it.relationship,
                    "name": it.name,
                    "gender": it.gender,
                    "maritalStatus": it.maritalStatus,
                    "isDisabled": it.physicallyHandicapped,
                    "disabilityPercent": it.disabilityPercentage,
                    "isDependant": it.dependant,
                    "dependantIncome": it.dependantIncome,
                    "isEmployed": it.employed,
                    "isNominee": it.nominee,
                    "nominationPercent": it.nomineePercent,
                    "dob": dayjs(it.dob).format("YYYY-MM-DD")
                }
                arr.push(obj)
            })
            let body = {
                // "refNo": "BRD0000000000028",
                "refNo": localStorage.getItem("refNo"),
                "familyDetailsList": arr
            }
            const res = await axios.post(
                `${process.env.REACT_APP_PAYROLL_API_URL}/employee/family-details`,
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
                onButtonClick("pagefour");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    console.log(formik.values.nominee);
    useEffect(() => {
        if (view) {
            fetchData();
        }
    }, [view]);
    const fetchData = () => {
        axios.get(`http://141.148.194.18:8052/payroll/employee/family-details/${formData.refNo}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(response => {
            console.log(response);
            if (response.data.status && response.data.result) {
                setRows(response.data.result.map(item => ({
                    id: item.id,
                    //empId: item.empId,
                    //relationshipId: item.relationshipId ? item.relationshipId.id : '',
                    relationship: item.relationshipId ? item.relationshipId.id : '',
                    name: item.name,
                    //genderId: item.gender ? item.gender.id : '',
                    gender: item.gender ? item.gender.id : '',
                    maritalStatus: item.maritalStatus ? item.maritalStatus.id : '',
                    isDisabled: item.isDisabled,
                    disabilityPercentage: item.disabilityPercent || "N/A",
                    isDependant: item.isDependant,
                    dependantIncome: item.dependantIncome || "N/A",
                    isEmployed: item.isEmployed,
                    nominee: item.isNominee,
                    nomineePercent: item.nominationPercent || "N/A",
                })));
            }
        });
    };
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
            width: 150,
            headerName: "Name",
            field: "name",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 150,
            headerName: "Relationship",
            field: "relationship",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                // return (
                //     getValueFromList(relationlist, params.row.relationship).label
                // )
                const relationship = getValueFromList(relationlist, params.row.relationship);
                return relationship ? relationship.label : '';
                // return params.row.relationship ? params.row.relationship : "";
            }
        },
        {
            width: 150,
            headerName: "Gender",
            field: "gender",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                // return (
                //     getValueFromList(genderList, params.row.gender).label
                // )
                //return params.row.gender ? arams.row.gender : "";
                const gender = getValueFromList(genderList, params.row.gender);
                return gender ? gender.label : '';
            }
        },
        {
            width: 150,
            headerName: "Date of Birth",
            field: "dob",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 150,
            headerName: "Marital Status",
            field: "maritalStatus",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const marital = getValueFromList(maritalStatusList, params.row.maritalStatus);
                return marital ? marital.label : '';
            }
        },
        {
            width: 200,
            headerName: "Physically Handicapped",
            field: "physicallyHandicapped",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return params.row.physicallyHandicapped === "true" ? "Yes" : "No"
            }
        },
        {
            width: 200,
            headerName: "Disability Percentage",
            field: "disabilityPercentage",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 100,
            headerName: "Dependant",
            field: "dependant",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return params.row.dependant === "true" ? "Yes" : "No"
            }
        },
        {
            width: 150,
            headerName: "Dependant Income",
            field: "dependantIncome",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            width: 100,
            headerName: "Employed",
            field: "employed",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return params.row.employed === "true" ? "Yes" : "No"
            }
        },
        {
            width: 100,
            headerName: "Nominee",
            field: "nominee",
            headerClassName: "super-app-theme--header",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                // return (
                //     params.row.nominee === "true" ? "Yes" : "No"
                // )
                return params.row.nominee === "true" ? "Yes" : "No"
            }
        },
        {
            width: 150,
            headerName: "Nominee (%)",
            field: "nomineePercent",
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
                        //  value={params.value}
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
    return (
        <>
            {view !== true && (
                <Card>
                    <CardContent>
                        <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                            <FamilyRestroomIcon sx={{ fontSize: "25px", color: '#246cb5' }} />
                            <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Add Member Detail</H3>
                        </div>
                        <Grid
                            container
                            direction="row"
                            rowSpacing={0}
                            columnSpacing={2}
                        >
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <Autocomplete
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    id="relationship"
                                    name="relationship"
                                    options={relationlist}
                                    value={relationlist.find(
                                        (option) => option.id === formik.values.relationship
                                    ) || null}
                                    onChange={(e, value) => {
                                        console.log(value)
                                        if (value === null) {
                                            formik.setFieldValue("relationship", null)
                                        } else {
                                            formik.setFieldValue("relationship", value.id)
                                        }
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2 }}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            label="Relationship"
                                            required
                                            InputProps={{
                                                ...params.InputProps,
                                                style: textFieldStyles,
                                            }}
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    size="small"
                                    margin="normal"
                                    required
                                    InputProps={{ sx: textFieldStyles }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    error={formik.touched.name && !!formik.errors.name}
                                    helperText={formik.touched.name && formik.errors.name}
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
                                        (option) => option.id === formik.values.gender
                                    ) || null}
                                    onChange={(e, value) => {
                                        if (value === null) {
                                            formik.setFieldValue("gender", null)
                                        }
                                        else
                                            formik.setFieldValue("gender", value.id)
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2 }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            label="Gender"
                                            required
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.gender && formik.touched.gender ? formik.errors.gender : null}
                                            error={formik.errors.gender && formik.touched.gender ? true : false}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: textFieldStyles,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    size="small"
                                    id="maritalStatus"
                                    name="maritalStatus"
                                    options={maritalStatusList}
                                    value={maritalStatusList.find(
                                        (option) => option.id === formik.values.maritalStatus
                                    ) || null}
                                    onChange={(e, value) => {
                                        if (value === null) {
                                            formik.setFieldValue("maritalStatus", null)
                                        }
                                        else
                                            formik.setFieldValue("maritalStatus", value.id)
                                    }}
                                    getOptionLabel={(value) => value.label}
                                    sx={{ width: "100%", mt: 2 }}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            label="Marital Status"
                                            required
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.maritalStatus && formik.touched.maritalStatus ? formik.errors.maritalStatus : null}
                                            error={formik.errors.maritalStatus && formik.touched.maritalStatus ? true : false}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: textFieldStyles,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    adapterLocale={"en-gb"}
                                >
                                    <DatePicker
                                        label="Date of Birth"
                                        format="DD-MM-YYYY"
                                        // maxDate={new Date()}
                                        id="dob"
                                        name="dob"
                                        value={formik.values.dob}
                                        slotProps={{ textField: { size: "small" } }}
                                        sx={{ width: "100%", mt: 2 }}
                                        onChange={(value) => { if (value === null) { formik.setFieldValue("dob", "") } else { formik.setFieldValue("dob", dayjs(value, "DD-MM-YYYY")) } }}
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
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Physically Disabled
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="physicallyHandicapped"
                                        value={formik.values.physicallyHandicapped}
                                        onChange={(e) => {
                                            formik.setFieldValue("disabilityPercentage", "");
                                            formik.handleChange(e);
                                        }}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes" />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No" />
                                    </RadioGroup>
                                    {formik.touched.physicallyHandicapped &&
                                        formik.errors.physicallyHandicapped && (
                                            <FormHelperText error>
                                                {formik.errors.physicallyHandicapped}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                            {formik.values.physicallyHandicapped === "true" && (
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="text"
                                        id="disabilityPercentage"
                                        name="disabilityPercentage"
                                        label="Percentage of Disability"
                                        size="small"
                                        onChange={(e) => {
                                            if (e.target.value < 0 || e.target.value > 100) {
                                                alert("Disability Percentage should be between 0 and 100")
                                                formik.setFieldValue("disabilityPercentage", "")
                                                return;
                                            }
                                            else {
                                                formik.setFieldValue("disabilityPercentage", e.target.value)
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.disabilityPercentage}
                                        error={formik.touched.disabilityPercentage && !!formik.errors.disabilityPercentage}
                                        helperText={formik.touched.disabilityPercentage && formik.errors.disabilityPercentage}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Dependant
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="dependant"
                                        value={formik.values.dependant}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                        }}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes" />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No" />
                                    </RadioGroup>
                                    {formik.touched.dependant &&
                                        formik.errors.dependant && (
                                            <FormHelperText error>
                                                {formik.errors.dependant}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                            {formik.values.dependant === "true" && (
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="text"
                                        id="dependantIncome"
                                        name="dependantIncome"
                                        label="Dependant Income"
                                        size="small"
                                        onChange={(e) => {
                                            formik.setFieldValue("dependantIncome", e.target.value)
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.dependantIncome}
                                        error={formik.touched.dependantIncome && !!formik.errors.dependantIncome}
                                        helperText={formik.touched.dependantIncome && formik.errors.dependantIncome}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Employed
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="employed"
                                        value={formik.values.employed}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                        }}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes" />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No" />
                                    </RadioGroup>
                                    {formik.touched.employed &&
                                        formik.errors.employed && (
                                            <FormHelperText error>
                                                {formik.errors.employed}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Nominee
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="nominee"
                                        value={formik.values.nominee}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                        }}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Yes" />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No" />
                                    </RadioGroup>
                                    {formik.touched.nominee &&
                                        formik.errors.nominee && (
                                            <FormHelperText error>
                                                {formik.errors.nominee}
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            </Grid>
                            {formik.values.nominee === "true" && (
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="text"
                                        id="nomineePercent"
                                        name="nomineePercent"
                                        label="Nominee Percentage"
                                        size="small"
                                        onChange={(e) => {
                                            if (e.target.value < 0 || e.target.value > 100) {
                                                alert("Nominee Percentage should be between 0 and 100")
                                                formik.setFieldValue("nomineePercent", "")
                                                return;
                                            }
                                            else {
                                                formik.setFieldValue("nomineePercent", e.target.value)
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nomineePercent}
                                        error={formik.touched.nomineePercent && !!formik.errors.nomineePercent}
                                        helperText={formik.touched.nomineePercent && formik.errors.nomineePercent}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Box
                            spacing={2}
                            sx={{ mt: 1, textAlign: 'right' }}
                        >
                            <Button
                                sx={{
                                    minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
                                }}
                                //  disabled={isSubmitted}
                                variant="contained"
                                type="submit"
                                onClick={() => {
                                    checkValid()
                                }}
                            >
                                <PlaylistAddIcon /> &nbsp; ADD DETAILS
                                {/* {
                                            isSubmitted ?
                                                <CircularProgress color="inherit" size={15} />
                                                :
                                                <SaveAltIcon sx={{ ml: 0.2 }}></SaveAltIcon>
                                        } */}
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
                    </CardContent>
                </Card>
            )}
            <Card>
                <CardContent>
                    {rows.length > 0 && (
                        <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                            <Diversity3Icon sx={{ fontSize: "25px", color: '#246cb5' }} />
                            <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Family Members Details</H3>
                        </div>
                    )}
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
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {/* <Button
                            type="button"
                            sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                            onClick={() => onButtonClick("pagetwo")}
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
                                onClick={() => {
                                    if (rows.length > 0) {
                                        let total = 0;
                                        let nomineeFlag = 0;
                                        rows.map((it) => {
                                            total = parseInt(total) + parseInt(it.nomineePercent)
                                            if (it.nominee === "true") {
                                                nomineeFlag = 1;
                                            }
                                        })
                                        console.log(total)
                                        if ((total > 100 || total < 100) && nomineeFlag === 1) {
                                            alert("Total Nominee percent cannot be less than or greater than 100. It must sum upto 100");
                                            return;
                                        }
                                        else {
                                            callConfirmDialog()
                                        }
                                    }
                                    else {
                                        showSnackbar("Please add Family Details", "error");
                                        return;
                                    }
                                }}
                            >
                                <SaveAltIcon></SaveAltIcon>
                                &nbsp;
                                SUBMIT
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
                                onButtonClick("pagefour")
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
                </CardContent>
            </Card>
        </>
    )
}
export default SaveFamilyDetails
