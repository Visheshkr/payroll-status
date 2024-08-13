import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import SearchTable from "../../components/SearchTableAlt";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import PageTitle from "../../layouts/PageTitle";
import axiosClient from "../../utils/AxiosInterceptor";
import Loader from "../../components/Loader";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VirtualKeyboard from "../Accordian/VirtualKeyboard";

const PayHeadService = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [payHeadGroup, setPayHeadGroup] = useState([]);
  const [payHeadType, setPayHeadType] = useState([]);
  const [payHeadTypeFlag, setPayHeadTypeFlag] = useState("");
  const [detailSubDetail, setDetailSubDetail] = useState([]);
  const [btDescription, setBtDescription] = useState([]);
  const [majorSubMajorMinor, setMajorSubMajorMinor] = useState([]);
  const [majorSubMajorMinorId, setMajorSubMajorMinorId] = useState([]);
  const [groupType, setGroupType] = useState([]);
  const [subHead, setSubHead] = useState([]);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [editId, setEditId] = useState(null);
  const [currentInput, setCurrentInput] = useState("");
  const [editCount, setEditCount] = useState(0);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const title = "Pay Head";
  useTitle(title);
  const validationSchema = yup.object({
    payHeadNameEnglish: yup
      .string()
      .required("Pay Head Name in English is required"),
    payHeadCode: yup.string().required("Pay Head Code is required"),
    payHeadGroup: yup
      .object()
      .nullable()
      .required("Pay Head Group is required"),
    payHeadType: yup.object().nullable().required("Pay Head Type is required"),
    detailSubDetail: yup.object().required("Detail-Sub Detail is required"),
  });

  const formik = useFormik({
    initialValues: {
      payHeadNameEnglish: "",
      payHeadNameHindi: "",
      payHeadCode: "",
      payHeadGroup: "",
      displayOrder: "",
      payHeadType: "",
      btDescription: "",
      majorSubMajorMinor: "",
      subHead: "",
      groupType: "",
      detailSubDetail: "",
      remarks: "",
      effectiveFrom: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);
      if (selectedRow !== null) {
        setBtnText("Updating");
        let postData = {
          payheadId: editId,
          payheadName: values.payHeadNameEnglish,
          payheadNameRegLang: values.payHeadNameHindi,
          payheadCode: values.payHeadCode,
          displayOrder: Number(values.displayOrder),
          payheadGrpId: values.payHeadGroup.id,
          majorHead:
            payHeadTypeFlag !== 26 ? values.majorSubMajorMinor?.majorId : null,
          btDescId: values.btDescription?.id || null,
          minorHead:
            payHeadTypeFlag !== 26 ? values.majorSubMajorMinor?.minorId : null,
          subMajorHead:
            payHeadTypeFlag !== 26 ? values.majorSubMajorMinor?.id : null,
          grpType: values.groupType?.id || null,
          subHead: values.subHead?.id || null,
          payHeadType: values.payHeadType.id || null,
          detailsHead: values.detailSubDetail.detailHead || null,
          isActive: true,
          subDetailsHead: values.detailSubDetail.subDetailId,
          effectiveFrom:
            dayjs(
              new Date(
                Date.parse(formik.values.effectiveFrom)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD") !== "Invalid Date"
              ? dayjs(
                  new Date(
                    Date.parse(formik.values.effectiveFrom)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD")
              : null,

          remarks: values.remarks,
          userId: Number(localStorage.getItem("userId")),
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/savePayheads`,
            postData
          )

          .then((response) => {
            if (
              response.data.result !== null &&
              response.data.statusCode === 200
            ) {
              // setRowss((prevValue) => {
              //   const updatedRows = [...prevValue];

              //   updatedRows[selectedRow] = {
              //     ...updatedRows[selectedRow],
              //     ...response.data?.result,
              //     /////////////////////////////////
              //     payHeadTypeName: response.data?.result.payHeadType.typeName,
              //     detailsHeadCode: response.data?.result.detailsHead.typeCode,
              //     subDetailsHeadCode:
              //       response.data?.result.subDetailsHead.typeCode,
              //     effectiveFrom: response.data.result.effectiveFrom
              //       ? dayjs(
              //           new Date(
              //             Date.parse(response.data.result.effectiveFrom)
              //           )?.toLocaleDateString()
              //         ).format("YYYY-MM-DD")
              //       : null,
              //   };

              //   return updatedRows;
              // });

              showSnackbar(response.data?.message, "success");
              setBtnText("Save");
              formik.resetForm();
              getPayHeadList();
            } else {
              setBtnText("Update");
              showSnackbar(response.data?.message, "error");
            }
          })
          .catch((error) => {
            console.log(error);
            setBtnText("Update");
            if (error.response) {
              showSnackbar(
                error.response.data.message
                  ? error.response.data.message
                  : error.response.message,
                "error"
              );
            }
          })
          .finally(() => {
            setIsSubmitted(false);
          });
      } else {
        setBtnText("Saving");
        let postData = {
          id: null,
          payheadName: values.payHeadNameEnglish,
          payheadNameRegLang: values.payHeadNameHindi,
          payheadCode: values.payHeadCode,
          displayOrder: Number(values.displayOrder),
          payheadGrpId: values.payHeadGroup.id,
          majorHead:
            payHeadTypeFlag !== 26 ? values.majorSubMajorMinor?.majorId : null,
          btDescId: values.btDescription?.id || null,
          minorHead:
            payHeadTypeFlag !== 26 ? values.majorSubMajorMinor?.minorId : null,
          subMajorHead:
            payHeadTypeFlag !== 26 ? values.majorSubMajorMinor?.id : null,
          grpType: values.groupType?.id || null,
          subHead: values.subHead?.id || null,
          payHeadType: values.payHeadType.id || null,
          detailsHead: values.detailSubDetail.detailHead || null,
          isActive: true,
          subDetailsHead: values.detailSubDetail.subDetailId,
          effectiveFrom:
            dayjs(
              new Date(
                Date.parse(formik.values.effectiveFrom)
              )?.toLocaleDateString()
            ).format("YYYY-MM-DD") !== "Invalid Date"
              ? dayjs(
                  new Date(
                    Date.parse(formik.values.effectiveFrom)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD")
              : null,

          remarks: values.remarks,
          userId: Number(localStorage.getItem("userId")),
        };

        axiosClient
          .post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/savePayheads`,
            postData
          )
          .then((response) => {
            if (
              response.data.result !== null &&
              response.data.statusCode === 200
            ) {
              // const updatedRow = rowss.map((value) => ({
              //   ...value,
              //   index: value.index + 1,
              // }));
              // let newRow = response.data?.result;
              // newRow = {
              //   index: 1,
              //   ...newRow,
              //   payHeadTypeName: newRow?.payHeadType.typeName,
              //   detailsHeadCode: newRow?.detailsHead.typeCode,
              //   subDetailsHeadCode: newRow?.subDetailsHead.typeCode,
              //   payheadGrpName: newRow?.payheadGrpId.typeName,
              //   effectiveFrom: response.data.result.effectiveFrom
              //     ? dayjs(
              //         new Date(
              //           Date.parse(response.data.result.effectiveFrom)
              //         )?.toLocaleDateString()
              //       ).format("YYYY-MM-DD")
              //     : null,
              // };
              // setRowss([newRow, ...updatedRow]);
              setBtnText("Saving");
              showSnackbar(response.data?.message, "success");
              formik.resetForm();
              getPayHeadList();
            } else {
              showSnackbar(response.data?.message, "error");
            }
          })
          .catch((error) => {
            if (error.response) {
              showSnackbar(
                error.response.data.message
                  ? error.response.data.message
                  : error.response.message,
                "error"
              );
            }
          })
          .finally(() => {
            setBtnText("Save");
            setIsSubmitted(false);
          });
      }
    },
  });
  const getPayHeadList = () => {
    setIsLoader(true);
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getPayheads`)
      .then((response) => {
        if (
          response.data.result === null ||
          response.data?.result?.length === 0
        )
          showSnackbar("No data found", "warning");
        let responseData = response.data?.result?.map((value, index) => {
          let rowData = {
            ...value,
            effectiveFrom: value.effectiveFrom
              ? dayjs(
                  new Date(
                    Date.parse(value.effectiveFrom)
                  )?.toLocaleDateString()
                ).format("YYYY-MM-DD")
              : null,
            index: index + 1,
          };

          return rowData;
        });

        setRowss(responseData);
      })
      .catch((error) => {
        if (error.response) {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        }

        setRowss([]);
      })
      .finally(() => setIsLoader(false));
  };
  useEffect(() => {
    setIsLoader(true);
    getPayHeadList();
    axiosClient
      .get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
      .then((response) => {
        if (response.data?.result?.length === 0)
          showSnackbar("No data found", "warning");
        let responseData = response.data?.result;

        setPayHeadType(
          responseData.PayHeadType.map((item) => ({
            id: item.typeId,
            label: item.typeName,
          }))
        );
        setPayHeadGroup(
          responseData.groupTypeId.map((item) => ({
            id: item.typeId,
            label: item.typeName,
          }))
        );

        setDetailSubDetail(
          responseData["detail-subdetail"].map((item) => ({
            id: item.detailId,
            subDetailId: item.subDetailId,
            label: item.typeCodeStr,
            detailHead: item.detailId,
          }))
        );
        setMajorSubMajorMinor(
          responseData["major-submajor-minor"].map((item) => ({
            // id: item.minorId,
            id: item.subMajorId,
            majorId: item.majorid,
            minorId: item.minorId,
            label: item.typeCodeStr,
          }))
        );
        setBtDescription(
          responseData["btDesc"].map((item) => ({
            id: item.typeId,
            label: item.typeName,
          }))
        );
        setGroupType(
          responseData["groupType"].map((item) => ({
            id: item.typeId,
            label: item.typeName,
          }))
        );
      })
      .catch((error) => {
        if (error.response) {
          showSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.message,
            "error"
          );
        }
        setRowss([]);
      })
      .finally(() => setIsLoader(false));
  }, []);

  const handleCancel = () => {
    setBtnText("Save");
    // setIsReadable(false);
    setSelectedRow(null);
    setCurrentInput("");
    formik.resetForm();
  };

  const handleEdit = (params, index) => {
    setSelectedRow(index - 1);

    if (
      rowss[index - 1].payHeadType === 27 ||
      rowss[index - 1].payHeadType.typeId === 27 ||
      rowss[index - 1].payHeadType.typeId === 28 ||
      rowss[index - 1].payHeadType === 28
    ) {
      setPayHeadTypeFlag(27);
      let effectiveFrom = dayjs(rowss[index - 1].effectiveFrom, "YYYY-MM-DD");
      setBtnText("Update");
      setEditId(rowss[index - 1].payheadId);
      setEditCount(1);

      formik.setFieldValue("payHeadNameEnglish", rowss[index - 1].payheadName);
      formik.setFieldValue(
        "payHeadNameHindi",
        rowss[index - 1].payheadNameRegLang
      );
      formik.setFieldValue("payHeadCode", rowss[index - 1].payheadCode);
      ///////////////////////////////////////////////////////////////
      const payHeadGroupLabel = payHeadGroup.find(
        (option) => option.label === rowss[index - 1].payheadGrpName
      );
      formik.setFieldValue("payHeadGroup", payHeadGroupLabel);
      ///////////////////////////////////////////////////////////////
      const payHeadTypeLabel = payHeadType.find(
        (option) => option.id === rowss[index - 1].payHeadType
      );

      if (payHeadTypeLabel != undefined) {
        formik.setFieldValue("payHeadType", payHeadTypeLabel);
      } else {
        const payHeadTypeLabel = payHeadType.find(
          (option) => option.id === rowss[index - 1].payHeadType.typeId
        );
        formik.setFieldValue("payHeadType", payHeadTypeLabel);
      }
      ///////////////////////////////////////////////////////////////////
      const majorSubMajorMinorLabel = majorSubMajorMinor.find(
        (option) => option.id === rowss[index - 1].subMajorHead
      );
      if (majorSubMajorMinorLabel != undefined) {
        formik.setFieldValue("majorSubMajorMinor", majorSubMajorMinorLabel);
      } else if (rowss[index - 1]?.majorHead) {
        const majorData =
          rowss[index - 1]?.majorHead?.typeCode +
          " - " +
          rowss[index - 1].subMajorHead.typeCode +
          " - " +
          rowss[index - 1].minorHead.typeCode;
        const majorSubMajorMinorLabel = majorSubMajorMinor.find(
          (option) => option.label === majorData
        );
        formik.setFieldValue("majorSubMajorMinor", majorSubMajorMinorLabel);
        // setMajorSubMajorMinorId(majorSubMajorMinorLabel);
      }
      ////
      setIsLoader(true);
      axiosClient
        .get(
          `${process.env.REACT_APP_PAYROLL_API_URL}/getSubHead/${params.subMajorHead}` //also do sorting of get data
        )
        .then((response) => {
          if (
            response.data?.result?.length === 0 ||
            response.data.result === null
          ) {
            // showSnackbar("No data found for Sub Head", "warning");
            console.log("No data found for Sub Head");
            setSubHead([]);
          } else {
            let responseData = response.data?.result;

            setSubHead(
              responseData.map((item) => ({
                id: item.typeId,
                label: item.typeCode,
              }))
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
          }
        })
        .finally(() => setIsLoader(false));
      /////////////////////////////////////////////////////////////////////////
      if (rowss[index - 1].subHead) {
        if (rowss[index - 1].subHead.typeId) {
          const subHeadLabel = {
            id: params.subHead.typeId,
            label: params.subHead.typeCode || "",
          };
          formik.setFieldValue("subHead", subHeadLabel);
          // console.log("subHead label typeId::", subHeadLabel);
        } else {
          const subHeadLabel = {
            id: params.subHead,
            label: params.subHeadCode,
          };
          formik.setFieldValue("subHead", subHeadLabel);
          // console.log("subHead label::", subHeadLabel);
        }
      }
      const newSubDetail =
        rowss[index - 1].detailsHead + " - " + rowss[index - 1].subDetailsHead;

      const subDetailsHeadLabel = detailSubDetail.find(
        (option) => option.label === newSubDetail
      );

      if (subDetailsHeadLabel !== undefined) {
        formik.setFieldValue("detailSubDetail", subDetailsHeadLabel);
      } else {
        const newSubDetail =
          rowss[index - 1].detailsHeadCode +
          " - " +
          rowss[index - 1].subDetailsHeadCode;

        const subDetailsHeadLabel = detailSubDetail.find(
          (option) => option.label === newSubDetail
        );
        formik.setFieldValue("detailSubDetail", subDetailsHeadLabel);
      }
      ///////////////////////////////////////////////////////////////
      formik.setFieldValue("effectiveFrom", effectiveFrom);
    } else {
      setPayHeadTypeFlag(26);

      let effectiveFrom = dayjs(rowss[index - 1].effectiveFrom, "YYYY-MM-DD");
      setBtnText("Update");
      setEditId(rowss[index - 1].payheadId);
      setEditCount(1);
      formik.setFieldValue("payHeadNameEnglish", rowss[index - 1].payheadName);
      formik.setFieldValue(
        "payHeadNameHindi",
        rowss[index - 1].payheadNameRegLang
      );
      formik.setFieldValue("payHeadCode", rowss[index - 1].payheadCode);
      ///////////////////////////////////////////////////////////////
      const payHeadGroupLabel = payHeadGroup.find(
        (option) => option.label === rowss[index - 1].payheadGrpName
      );
      formik.setFieldValue("payHeadGroup", payHeadGroupLabel);

      ///////////////////////////////////////////////////////////////
      const payHeadTypeLabel = payHeadType.find(
        (option) => option.id === rowss[index - 1].payHeadType
      );

      if (payHeadTypeLabel != undefined) {
        formik.setFieldValue("payHeadType", payHeadTypeLabel);
      } else {
        const payHeadTypeLabel = payHeadType.find(
          (option) => option.id === rowss[index - 1].payHeadType.typeId
        );
        formik.setFieldValue("payHeadType", payHeadTypeLabel);
      }
      /////////////////////////////////////////////////////////////////
      const newSubDetail =
        rowss[index - 1].detailsHead + " - " + rowss[index - 1].subDetailsHead;
      const subDetailsHeadLabel = detailSubDetail.find(
        (option) => option.label === newSubDetail
      );

      if (subDetailsHeadLabel !== undefined) {
        formik.setFieldValue("detailSubDetail", subDetailsHeadLabel);
      } else {
        const newSubDetail =
          rowss[index - 1].detailsHeadCode +
          " - " +
          rowss[index - 1].subDetailsHeadCode;

        const subDetailsHeadLabel = detailSubDetail.find(
          (option) => option.label === newSubDetail
        );

        formik.setFieldValue("detailSubDetail", subDetailsHeadLabel);
      }
      ///////////////////////////////////////////////////////////////
      formik.setFieldValue("effectiveFrom", effectiveFrom);
    }
  };

  const handleInputChange = (input) => {
    formik.setFieldValue("payHeadNameHindi", input);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
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
      field: "payheadName",
      headerName: "Pay Head Name (English)",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "payheadNameRegLang",
      headerName: "Pay Head Name (Hindi)",
      flex: 0.3,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "payheadCode",
      headerName: "Pay Head Code",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "payHeadTypeName",
      headerName: "Pay Head Type",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "detailsHeadCode",
      headerName: "Detail Head",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "subDetailsHeadCode",
      headerName: "Sub - Detail Head",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      // field: "headGroup",
      field: "payheadGrpName",
      headerName: "Head Group",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "effectiveFrom",
      headerName: "Effective Date",
      flex: 0.2,
      minWidth: 180,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      flex: 0.3,
      minWidth: 180,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              sx={{
                color: "black",
                backgroundColor: "white",
                ":hover": { color: "black", backgroundColor: "white" },
                borderRadius: "4px",
              }}
              endIcon={<EditIcon />}
              size="small"
              onClick={() => handleEdit(params.row, params.row.index)}
            >
              Edit
            </Button>

            {/* <Button variant="contained" sx={{ color: 'white', backgroundColor: '#286cb4', ":hover": { color: 'white', backgroundColor: '#286cb4' }, borderRadius: '4px' }} startIcon={<DeleteIcon />} size="small" onClick={() => handleDelete(params.row.index)}>Delete</Button> */}
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      {isLoader && <Loader />}
      <Grid container>
        <Grid xs={12}>
          <Card sx={{ my: 2 }} elevation={5}>
            <CardContent>
              <PageTitle name={title} />
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={3}>
                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      type="text"
                      id="payHeadNameEnglish"
                      name="payHeadNameEnglish"
                      label="Pay Head Name in English"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.payHeadNameEnglish}
                      onFocus={() => setCurrentInput("payHeadNameEnglish")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payHeadNameEnglish &&
                        !!formik.errors.payHeadNameEnglish
                      }
                      helperText={
                        formik.touched.payHeadNameEnglish &&
                        formik.errors.payHeadNameEnglish
                      }
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="payHeadNameHindi"
                      name="payHeadNameHindi"
                      label="Pay Head Name In Hindi"
                      size="small"
                      disabled={isReadable}
                      value={formik.values.payHeadNameHindi}
                      // onFocus={()=>setCurrentInput('payHeadNameHindi')}
                      // onKeyDown={handleKeyDown}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payHeadNameHindi &&
                        !!formik.errors.payHeadNameHindi
                      }
                      helperText={
                        formik.touched.payHeadNameHindi &&
                        formik.errors.payHeadNameHindi
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="payHeadCode"
                      name="payHeadCode"
                      label="Pay Head Code"
                      size="small"
                      required
                      disabled={isReadable}
                      value={formik.values.payHeadCode}
                      onFocus={() => setCurrentInput("payHeadCode")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.payHeadCode &&
                        !!formik.errors.payHeadCode
                      }
                      helperText={
                        formik.touched.payHeadCode && formik.errors.payHeadCode
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="payHeadGroup"
                      name="payHeadGroup"
                      size="small"
                      onFocus={() => setCurrentInput("payHeadGroup")}
                      options={payHeadGroup}
                      value={
                        payHeadGroup.find(
                          (option) =>
                            option.id === formik.values.payHeadGroup?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("payHeadGroup", null);
                        } else {
                          formik.setFieldValue("payHeadGroup", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Pay Head Group"
                          onBlur={formik.handleBlur}
                          required
                          helperText={
                            formik.errors.payHeadGroup &&
                            formik.touched.payHeadGroup
                              ? formik.errors.payHeadGroup
                              : null
                          }
                          error={
                            formik.errors.payHeadGroup &&
                            formik.touched.payHeadGroup
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="payHeadType"
                      name="payHeadType"
                      size="small"
                      options={payHeadType}
                      onFocus={() => setCurrentInput("payHeadType")}
                      value={
                        payHeadType.find(
                          (option) =>
                            option.id === formik.values.payHeadType?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          setPayHeadTypeFlag(null);
                          formik.setFieldValue("payHeadType", null);
                        } else {
                          setPayHeadTypeFlag(value.id);
                          formik.setFieldValue("payHeadType", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Pay Head Type"
                          required
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.payHeadType &&
                            formik.touched.payHeadType
                              ? formik.errors.payHeadType
                              : null
                          }
                          error={
                            formik.errors.payHeadType &&
                            formik.touched.payHeadType
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </Grid>
                  {payHeadTypeFlag === 27 || payHeadTypeFlag === 28 ? (
                    <>
                      <Grid xs={12} sm={4}>
                        <Autocomplete
                          disablePortal
                          margin="normal"
                          fullWidth
                          id="majorSubMajorMinor"
                          name="majorSubMajorMinor"
                          size="small"
                          options={majorSubMajorMinor}
                          onFocus={() => setCurrentInput("majorSubMajorMinor")}
                          value={
                            majorSubMajorMinor.find(
                              (option) =>
                                option.id ===
                                formik.values.majorSubMajorMinor?.id
                            ) || null
                          }
                          onChange={(e, value) => {
                            if (value === null) {
                              formik.setFieldValue("majorSubMajorMinor", null);
                              formik.setFieldValue("subHead", "");
                            } else {
                              formik.setFieldValue("subHead", "");
                              formik.setFieldValue("majorSubMajorMinor", value);

                              setIsLoader(true);
                              axiosClient
                                .get(
                                  `${process.env.REACT_APP_PAYROLL_API_URL}/getSubHead/${value.id}`
                                )
                                .then((response) => {
                                  if (
                                    response.data?.result?.length === 0 ||
                                    response.data.result === null
                                  ) {
                                    // showSnackbar("No data found for Sub Head", "warning");
                                    console.log("No data found for Sub Head");
                                    setSubHead([]);
                                  } else {
                                    let responseData = response.data?.result;

                                    setSubHead(
                                      responseData.map((item) => ({
                                        id: item.typeId,
                                        label: item.typeCode,
                                      }))
                                    );
                                  }
                                })
                                .catch((error) => {
                                  if (error.response) {
                                    showSnackbar(
                                      error.response.data.message
                                        ? error.response.data.message
                                        : error.response.message,
                                      "error"
                                    );
                                  }
                                })
                                .finally(() => setIsLoader(false));
                            }
                          }}
                          getOptionLabel={(value) => value.label}
                          sx={{ width: "100%", mt: 2, mb: 1 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="Major - SubMajor - Minor"
                              onBlur={formik.handleBlur}
                              helperText={
                                formik.errors.majorSubMajorMinor &&
                                formik.touched.majorSubMajorMinor
                                  ? formik.errors.majorSubMajorMinor
                                  : null
                              }
                              error={
                                formik.errors.majorSubMajorMinor &&
                                formik.touched.majorSubMajorMinor
                                  ? true
                                  : false
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid xs={12} sm={4}>
                        <Tooltip
                          title={
                            formik.values.majorSubMajorMinor
                              ? ""
                              : "First select Major - SubMajor - Minor"
                          }
                        >
                          <Autocomplete
                            disablePortal
                            margin="normal"
                            fullWidth
                            id="subHead"
                            name="subHead"
                            size="small"
                            options={subHead}
                            onFocus={() => setCurrentInput("subHead")}
                            disabled={
                              formik.values?.majorSubMajorMinor ? false : true
                            }
                            value={
                              formik.values.subHead
                                ? formik.values.subHead
                                : subHead.find(
                                    (option) =>
                                      option.id === formik.values.subHead?.id
                                  ) || null
                            }
                            onChange={(e, value) => {
                              if (value === null) {
                                formik.setFieldValue("subHead", null);
                              } else {
                                formik.setFieldValue("subHead", value);
                              }
                            }}
                            getOptionLabel={(value) => value.label}
                            sx={{ width: "100%", mt: 2, mb: 1 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                required
                                label="Sub Head"
                                onBlur={formik.handleBlur}
                                helperText={
                                  formik.errors.subHead &&
                                  formik.touched.subHead
                                    ? formik.errors.subHead
                                    : null
                                }
                                error={
                                  formik.errors.subHead &&
                                  formik.touched.subHead
                                    ? true
                                    : false
                                }
                              />
                            )}
                          />
                        </Tooltip>
                      </Grid>
                    </>
                  ) : null}

                  <Grid xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      fullWidth
                      id="detailSubDetail"
                      name="detailSubDetail"
                      size="small"
                      // options={payHeadGroup}
                      options={detailSubDetail}
                      onFocus={() => setCurrentInput("detailSubDetail")}
                      value={
                        detailSubDetail.find(
                          (option) =>
                            option.id === formik.values.detailSubDetail?.id
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("detailSubDetail", null);
                        } else {
                          formik.setFieldValue("detailSubDetail", value);
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2, mb: 1 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Detail - SubDetail"
                          required
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.detailSubDetail &&
                            formik.touched.detailSubDetail
                              ? formik.errors.detailSubDetail
                              : null
                          }
                          error={
                            formik.errors.detailSubDetail &&
                            formik.touched.detailSubDetail
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={"en-gb"}
                    >
                      <DatePicker
                        id="effectiveFrom"
                        sx={{ width: "100%", mt: 2 }}
                        name="effectiveFrom"
                        disablePast
                        format="DD/MM/YYYY"
                        value={formik.values.effectiveFrom}
                        onChange={(value) =>
                          formik.setFieldValue("effectiveFrom", value)
                        }
                        onBlur={formik.handleBlur}
                        label="Effective From"
                        slotProps={{ textField: { size: "small" } }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            margin="0"
                            required
                            {...params}
                            error={
                              formik.touched.effectiveFrom &&
                              Boolean(formik.errors.effectiveFrom)
                            }
                            helperText={
                              formik.touched.effectiveFrom &&
                              formik.errors.effectiveFrom
                            }
                            onBlur={formik.handleBlur}
                          />
                        )}
                      />
                    </LocalizationProvider>
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
            <PageTitle name="Pay Head List" />
          </div>
          <Box component={"div"}>
            <SearchTable
              columns={columns}
              data={rowss || []}
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
          <Grid container>
            <Grid xs={12} sm={6}>
              {currentInput === "payHeadNameHindi" && editCount === 0 && (
                <VirtualKeyboard onChange={handleInputChange} />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default PayHeadService;
