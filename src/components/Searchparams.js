import React, { useEffect, useState } from "react";
//mui
import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Grid,
    Box,
    Autocomplete,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
//third party
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const SearchParams = (props) => {
    const {
        title,
        isFromDate,
        isToDate,
        handleResult,
        handlereset,
        iscardNumber,
        isempcode
    } = props;

    const formik = useFormik({
        initialValues: {
            fromDate: null,
            toDate: null,
            cardNumber: "",
            empcode: ""
        },
        // enableReinitialize: true,
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values));
            handleResult(values);
        },
    });

    const handleReset = (event) => {
        formik.resetForm();
    };
    const getValueFromList = (List, value) => {
        return List.find((option) => option.id === value) ?? null;
    };
    const [startDate, setStartDate] = useState('');
    return (
        <>
            <Card>
                {title && (
                    <Typography sx={{ p: 2, fontSize: 18, fontWeight: 500 }}>
                        {title}
                    </Typography>
                )}
                <CardContent>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                        <Grid
                            container
                            direction="row"
                            rowSpacing={0}
                            columnSpacing={2}
                            //height={more ? "auto" : 60}
                            sx={{ overflow: "hidden" }}
                        >

                            {iscardNumber && (
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="cardNumber"
                                        label="Request Id"
                                        name="cardNumber"
                                        value={formik.values.cardNumber || ""}
                                        onChange={formik.handleChange}
                                        size="small"
                                    />
                                </Grid>
                            )}
                            {isempcode && (
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="empcode"
                                        label="Employee Code"
                                        name="empcode"
                                        value={formik.values.empcode || ""}
                                        onChange={formik.handleChange}
                                        size="small"
                                    />
                                </Grid>
                            )}
                            {isFromDate && (
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="From Date"
                                            //inputFormat="DD/MM/YYYY"
                                            value={formik.values.fromDate || null}
                                            size="small"
                                            maxDate={new Date()}
                                            slotProps={{
                                                textField: { size: 'small' }
                                            }}
                                            onChange={(value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("fromDate", null);
                                                } else {
                                                    formik.setFieldValue("fromDate", Date.parse(value));
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    size="small"
                                                    sx={{ width: "100%", mt: 2 }}
                                                    fullWidth
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            )}

                            {isToDate && (
                                <Grid item xs={12} sm={3} md={3} lg={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                        <DatePicker
                                            label="To Date"
                                            inputFormat="DD/MM/YYYY"
                                            //maxDate={new Date()}
                                            slotProps={{
                                                textField: { size: 'small' }
                                            }}
                                            value={formik.values.toDate || null}
                                            onChange={(value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("toDate", null);
                                                } else {
                                                    formik.setFieldValue("toDate", Date.parse(value));
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    size="small"
                                                    sx={{ width: "100%", mt: 2 }}
                                                    fullWidth
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};
export default SearchParams;
