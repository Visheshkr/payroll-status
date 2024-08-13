import React, { useEffect, useState } from 'react';
import useTitle from '../../hooks/useTitle'
import PageTitle from '../../layouts/PageTitle';
import { Box,Card, CardContent,TextField, Grid, Autocomplete, Button, Alert, Stack, Chip } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SearchTable from '../../components/SearchTableAlt';
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../components/Loader";
import { useSnackbar } from "../../components/Snackbar";
import axiosClient from "../../utils/AxiosInterceptor";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CachedIcon from '@mui/icons-material/Cached';
import { useFormik } from 'formik';
import * as yup from "yup";
import "react-alert-confirm/lib/style.css";
import VisibilityIcon from '@mui/icons-material/Visibility';


const PayHeadConfiguration = () => {

    const [rowss, setRowss] = useState([]);
    const [searchRowss, setSearchRowss] = useState([]);
    const [payHeadMenu, setPayHeadMenu] = useState([]);
    const [serviceMenu, setServiceMenu] = useState([]);
    const [payCommissionMenu, setPayCommissionMenu] = useState([]);
    const [departmentMenu, setDepartmentMenu] = useState([]);
    const [designationMenu, setDesignationMenu] = useState([]);
    const [ctaEntitlementMenu, setCtaEntitlementMenu] = useState([]);
    const [payLevelMenu, setPayLevelMenu] = useState([]);
    const [compensationHeadMenu, setCompensationHeadMenu] = useState([]);
    const [tierMenu, setTierMenu] = useState([]);
    const [serviceTypeId, setServiceTypeId] = useState([]);
    const [payCommissionId, setPayCommissionId] = useState([]);
    const [designationId, setDesignationId] = useState([]);
    const [payLevelId, setPayLevelId] = useState([]);
    const [departmentId, setDepartmentId] = useState([]);
    const [editCount, setEditCount] = useState(0);
    const { showSnackbar } = useSnackbar();
    const [isLoader, setIsLoader] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showConfig, setShowConfig] = useState(false);
    const [btnText, setBtnText] = useState("Save");
    const [searchBtnText, setSearchBtnText] = useState("Search");
    const [isReadable, setIsReadable] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [formulaId , setFormulaId] = useState([]);
    const [searchWork , setSearchWork] = useState(false);
    const [formulaLabel,setFormulaLabel] =useState([]);
    const [calculationAmount,setCalculationAmount] =useState([]);

    const numbers = [1,2,3,4,5,6,7,8,9,0];
    const symbols = ['*','/','-','+','(',')'];


    useTitle('Pay Head Configuration')

    const validationSchema = yup.object({
      headName: yup.object().nullable().required("Head Name is required"),
      payCommissionName: yup.object().nullable().required("Pay Commission Name is required"),
      serviceTypeList: yup.array()
      .of(
        yup.object().shape({
          id: yup.number().required('ID is required').positive('ID must be a positive number').integer('ID must be an integer'),
          label: yup.string().required('Label is required'),
        })
      )
      .min(1, 'At least one item is required')
      .required("Service Type is required"),
      departmentName: yup.object().nullable().required("Department Name is required"),
      designationList: yup.array()
      .of(
        yup.object().shape({
          id: yup.number().required('ID is required').positive('ID must be a positive number').integer('ID must be an integer'),
          label: yup.string().required('Label is required'),
        })
      )
      .min(1, 'At least one item is required')
      .required("Designation Name is required"),
      payLevelList: yup.array()
      .of(
        yup.object().shape({
          id: yup.number().required('ID is required').positive('ID must be a positive number').integer('ID must be an integer'),
          label: yup.string().required('Label is required'),
        })
      )
      .min(1, 'At least one item is required')
      .required("Pay Level Name is required"),
      isFixed: yup.bool().required("Is Fixed is required"),
      maxAmount: yup.string().when('isFixed',{
        is:false,
        then: yup.string().required("Max Amount is required")
      }),
      fixedAmount: yup.string().when('isFixed',{
        is:true,
        then:yup.string().required('Fixed Amount is required')
      }),
      effectiveOrderDate: yup.date().nullable().required("Effective Order Date is required"),
      formula: yup.string().when('isFixed',{
        is:false,
        then: yup.string().required("Formula is required")
      }),
  });

    const searchFormik = useFormik({
      initialValues:{
        searchHeadName:"",
        searchPayCommissionName:"",
        searchCtaEntitlementName:"",
        searchIsActive:false,
      },
      // validationSchema:searchValidationSchema,
      onSubmit:(values) =>{
        handleGetSearchData();
      }
    })

    const formik = useFormik({
      initialValues: {
        headName:"",
        payCommissionName:"",
        serviceTypeList: [],
        departmentName: "",
        designationList: [],
        payLevelList: [],
        isFixed: false,
        compensationHeadList: "",
        effectiveOrderDate: null,
        circulatedDate: null,
        maxAmount: "",
        fixedAmount: "",
        tierId:"",
        formula:"",
        calculation:"",
        ctaEntitlement:"",
        isActive:false,
      },
      validationSchema: validationSchema,
      onSubmit: (values,{resetForm}) => {
        setSelectedRow(null);
        setIsSubmitted(true);
        if (selectedRow === null) {
            setBtnText("Saving");
            setServiceTypeId(formik.values?.serviceTypeList.map((item)=>item.id));
            setPayLevelId(formik.values?.payLevelList.map((item)=>item.id));
            setDesignationId(formik.values?.designationList.map((item)=>item.id));
          let postData;
          if(formik.values.isFixed){ 
              postData = {
                "effectiveFrom":  dayjs(new Date(Date.parse(formik.values?.effectiveOrderDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                "maxAmt": Number(formik.values?.fixedAmount),
                "isFixedAmt": formik.values?.isFixed,
                "payCommissionId": Number(payCommissionId?.id),
                "serviceTypes":serviceTypeId,
                "deptDsgnIds":designationId,
                "payLevelIds":payLevelId,
                "payHeadId": formik.values?.headName?.id,
                "isActive":true,
                "tierId":formik.values?.tierId?.id,
                "ctaEntitlementId":formik.values?.ctaEntitlement?.id,
                "circulatedDate":formik.values?.circulatedDate,
              };
            }
            else{
              
              let formula = formik.values.formula;
              formulaId.map((item)=>{
                formula= formula.replaceAll(item.label,"$"+String(item.id)+"$");
              })
              // formik.setFieldValue('calculation',eval(formik.values.calculation));
              postData = {
                "effectiveFrom": dayjs(new Date(Date.parse(formik.values?.effectiveOrderDate))?.toLocaleDateString()).format("YYYY-MM-DD"),
                "maxAmt": Number(formik.values?.maxAmount),
                "isFixedAmt": formik.values?.isFixed,
                "payCommissionId": Number(payCommissionId?.id),
                "serviceTypes":serviceTypeId || [],
                "deptDsgnIds":designationId || [],
                "payLevelIds":payLevelId || [],
                "payHeadId": formik.values?.headName?.id,
                "formula": formula,
                "isActive":true,
                "tierId":formik.values?.tierId?.id,
                "ctaEntitlementId":formik.values?.ctaEntitlement?.id,
                "circulatedDate":formik.values?.circulatedDate,
                };
            }
            setBtnText('Saving');
            axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/savePayHeadConfig`, postData)
            .then(response => {
    
                if (response.data.statusCode === 200) {
                    const responseData = response.data.result.map((item)=>{
                    const rowData = {
                        ...item,
                        payHeadName:item?.payHeadId?.typeName,
                        payCommissionName:item?.payCommissionId?.typeName,
                        departmentName:item?.deptDegnId?.deptId?.name,
                        effectiveFrom:dayjs(new Date(Date.parse(item?.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                    }
                    return rowData;
                  })
                    setRowss([...responseData,...rowss]);
                    showSnackbar(response.data?.message, "success");
                    setDesignationMenu([]);
                    setSearchRowss([]);
                    setPayLevelMenu([]);
                    setDepartmentId([]);
                    setPayCommissionId([]);
                    setCompensationHeadMenu([]); 
                    setSelectedOption(null);
                    formik.resetForm();
                    handleGetData();
                }
                else {
                   
                    showSnackbar(response.data?.message, "error");
                }
            })
            .catch(error => {
                
                showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
            })
            .finally(() => {
                setBtnText("Save");
                setIsSubmitted(false);
            });
        }
      },
  });

    useEffect(() => {

      setIsLoader(true);
      
      handleGetData();
      axiosClient.get(`${process.env.REACT_APP_PAYROLL_API_URL}/getIndependentdropdown`)
          .then(response => {
              if (response.data?.statusCode === 200){
                
              let responsePayCommissionData = response.data?.result?.payCommission?.map((value, index) => {
                  let rowData = { 
                      id:value.typeId,
                      label:value.typeName
                  };
                  return rowData;
              })
                  setPayCommissionMenu(responsePayCommissionData);
            }
              let responseDepartmentData = response.data?.result?.departments?.map((value, index) => {
                      let rowData = { 
                          id:value.deptId,
                          label:value.name
                      };
                      return rowData;
              })
              setDepartmentMenu(responseDepartmentData);

              let responseCtaEntitlementData = response.data?.result?.CtaEntitlement?.map((value, index) => {
                      let rowData = { 
                          id:value.typeId,
                          label:value.typeName
                      };
                      return rowData;
              })
              setCtaEntitlementMenu(responseCtaEntitlementData);

              let responsePayHeadsData = response.data?.result?.payHeads?.map((value, index) => {
                      let rowData = { 
                          id:value.typeId,
                          label:value.typeName
                      };
                      return rowData;
              })
              setPayHeadMenu(responsePayHeadsData);

              let responseServiceTypeData = response.data?.result?.serviceType?.map((value, index) => {
                      let rowData = { 
                          id:value.typeId,
                          label:value.typeName
                      };
                      return rowData;
              })
              setServiceMenu(responseServiceTypeData);

              let responseTierData = response.data?.result?.tiers?.map((value, index) => {
                      let rowData = { 
                          id:value.typeId,
                          label:value.typeName
                      };
                      return rowData;
              })
              setTierMenu(responseTierData);
          })
          .catch(error => {
              showSnackbar(error.response.data.message ? error.response.data.message : error.response.message, 'error');
          })
          .finally(() => setIsLoader(false));

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetSearchData = () =>{
      setSearchWork(true);
      setIsLoader(true);
        axiosClient
          .post(`${process.env.REACT_APP_PAYROLL_API_URL}/getPayHeadConfig`,{
            "payHeadId":searchFormik.values.searchHeadName?.id || null,
            "ctaEntitlementId":searchFormik.values.searchCtaEntitlementName?.id || null,
            "isActive":true,
            "payCommissionId":searchFormik.values.searchPayCommissionName?.id || null
          })
          .then((response) => {
            if (response.data?.result?.length === 0){
              showSnackbar("No data found", "warning");
              setSearchRowss([]);
            }
            else{
              let responseData = response.data?.result?.map((value, index) => {
                let rowData = { 
                  ...value,
                  id:index+1,
                  fixedAmt:value.formula?null:value.maxAmt,
                  effectiveFrom:dayjs(new Date(Date.parse(value.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                };
                return rowData;
                })
                setSearchRowss(responseData);
            }
          })
          .catch((error) => {
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
            setRowss([]);
          })
          .finally(() => setIsLoader(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }

    const handleGetData = () => {
        setIsLoader(true);
        axiosClient
          .post(`${process.env.REACT_APP_PAYROLL_API_URL}/getPayHeadConfig`,{
            "payHeadId":null,
            "ctaEntitlementId":null,
            "isActive":true,
            "payCommissionId":null
          })
          .then((response) => {
            if (response.data?.result?.length === 0){
              showSnackbar("No data found", "warning");
            }
            else{
              let responseData = response.data?.result?.map((value, index) => {
                let rowData = { 
                  ...value,
                  id:index+1,
                  fixedAmt:value.formula?null:value.maxAmt,
                  effectiveFrom:dayjs(new Date(Date.parse(value.effectiveFrom))?.toLocaleDateString()).format("YYYY-MM-DD"),
                };
                return rowData;
                })
                setRowss(responseData);
            }
          })
          .catch((error) => {
            showSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.message,
              "error"
            );
            setRowss([]);
          })
          .finally(() => setIsLoader(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };


    const handleGetPayCompensationMenu = () => {
        if(payCommissionId !== null) {
        if (payCommissionId.id) {
          // formik.setFieldValue('payLevelList',[]);
          setIsLoader(true);
          axiosClient
            .get(
              `${process.env.REACT_APP_PAYROLL_API_URL}/getPaybands/${payCommissionId.id}`
            )
            .then((response) => {
              if (response.data?.result?.length === 0 || response.data.result === null){
                showSnackbar("No data found for Pay Level List ", "warning");
                setPayLevelMenu([]);
                // formik.setFieldValue('payLevelList',[]);
              }
              else{

              let responseData = response.data?.result?.map((value, index) => {
                let rowData = { ...value, index: index + 1 };
    
                return rowData;
              });
              setPayLevelMenu(
                responseData.map((item, index) => ({
                  id: item.typeId,
                  label: item.typeName,
                }))
              );
            }
            formik.setFieldValue('payLevelList',[]);
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

        if (payCommissionId.id) {
          setIsLoader(true);
          axiosClient
            .get(
              `${process.env.REACT_APP_PAYROLL_API_URL}/getPayheadByPc/${payCommissionId.id}`
            )
            .then((response) => {
              if (response.data?.result?.length === 0 || response.data.result === null){
                showSnackbar("No data found for Compensation Head List", "warning");
                setCompensationHeadMenu([]);
              }
              else{

              let responseData = response.data?.result?.map((value, index) => {
                let rowData = { ...value, index: index + 1 };
    
                return rowData;
              });
              setCompensationHeadMenu(
                responseData.map((item, index) => ({
                  id: item.typeId,
                  label: item.typeName,
                  calAmount : "100000"
                }))
              );
            }
            
            formik.setFieldValue('compensationHeadList',[]);
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
        }
    };

    useEffect(()=>{
      handleGetPayCompensationMenu();
    },[payCommissionId])


    const handleDepartmentMenu = () => {
        if(departmentId !==null) 
        if (departmentId.id) {
          setIsLoader(true);
          axiosClient
            .get(
              `${process.env.REACT_APP_PAYROLL_API_URL}/getDesgByDept/${departmentId.id}`
            )
            .then((response) => {
              if (response.data?.result?.length === 0 || response.data.result === null){
                showSnackbar("No data found for Designation Menu", "warning");
                setDesignationMenu([]);
              }
              else{    
              let responseData = response.data?.result?.map((value, index) => {
                let rowData = { ...value, index: index + 1 };
    
                return rowData;
              });
              setDesignationMenu(
                responseData.map((item, index) => ({
                  id: item.deptDsgnId,
                  label: item.typeName,
                }))
              );
            }
            formik.setFieldValue('designationList',[]);
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
      };

      useEffect(() => {
       handleDepartmentMenu();
      }, [departmentId]);


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
            headerName: "Pay Head Name (English)",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "isFixedAmt",
            headerName: "Is Fixed",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "fixedAmt",
            headerName: "Fixed Amount",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "formula",
            headerName: "Formula",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "payCommissionName",
            headerName: "Pay Commission",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "tier",
            headerName: "Tier",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "ctaEntitlement",
            headerName: "CTA Entitlement",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "effectiveFrom",
            headerName: "Effective Date",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "endDate",
            headerName: "End Date",
            // flex: 0.1,
            width: 150,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "isActive",
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
                    <VisibilityIcon sx={{borderRadius:'10px',cursor:"pointer"}} color="primary" fontSize="large" onClick={() => handleEdit(params.row.index)}/>
                </Stack>
                );
            },
        },
    ]

    const handleCancel = () => {
      setBtnText("Save");
      setIsReadable(false);
      setDepartmentId([]);
      setPayCommissionId([]);
      setSelectedOption(null);
      setServiceTypeId([]);
      setEditCount(0);
      formik.resetForm();
    };

    const handleSearchCancel = () => {
      setSearchBtnText("Search");
      setIsReadable(false);
      setSearchRowss([]);
      setSearchWork(false);
      searchFormik.resetForm();
      formik.resetForm();
    };

    const handleEdit =  (index) => {
      setIsReadable(true);
      setEditCount(1);
      if(!showConfig) handleShowConfigurationForm();
      let editRowss ;
      if(searchWork){
        editRowss = searchRowss; 
      }
      else{
        editRowss = rowss;
      }
      let effectiveFrom = dayjs(editRowss[index - 1].effectiveFrom, "YYYY-MM-DD");
      const selectedHeadName = payHeadMenu.find(option => option.label === editRowss[index - 1].payHeadName);
      formik.setFieldValue("headName", selectedHeadName);
      const selectedPayCommissionName = payCommissionMenu.find(option => option.id === editRowss[index - 1].payCommissionId);
      formik.setFieldValue("payCommissionName", selectedPayCommissionName);
      const serviceTypeNameList = serviceMenu.filter((item)=>item.id === editRowss[index-1].serviceType);
      formik.setFieldValue("serviceTypeList", serviceTypeNameList);
      const selectedDepartmentName = departmentMenu.find(option => option.id === editRowss[index - 1].deptId);
      formik.setFieldValue("departmentName", selectedDepartmentName);
      const selectedDesignationName = {id:editRowss[index-1].dsgnId,label:editRowss[index-1].dsgnName};
      formik.setFieldValue("designationList", [selectedDesignationName]);
      setDesignationMenu([selectedDesignationName,...designationMenu]);
      const selectedPayLevelName = {id:editRowss[index-1].payLevelId,label:editRowss[index-1].payLevelName};
      formik.setFieldValue("payLevelList", [selectedPayLevelName]);
      setPayLevelMenu([selectedPayLevelName,...payLevelMenu]);
      formik.setFieldValue("isFixed", editRowss[index - 1].isFixedAmt);
      if(editRowss[index-1].isFixedAmt){
        formik.setFieldValue('fixedAmount',editRowss[index-1].maxAmt);
      }
      else{
        formik.setFieldValue('maxAmount',editRowss[index-1].maxAmt);
      }
      formik.setFieldValue("effectiveOrderDate", effectiveFrom);
      let selectCirculatedDate = dayjs(editRowss[index - 1].circulatedDate, "YYYY-MM-DD");
      formik.setFieldValue("circulatedDate",selectCirculatedDate);
      const selectedTier = tierMenu.find(option => option.id === editRowss[index - 1].tierId);
      formik.setFieldValue("tierId", selectedTier);
      const selectedCtaEntitlementName = ctaEntitlementMenu.find(option => option.id === editRowss[index - 1].ctaEntitlementId);
      formik.setFieldValue("ctaEntitlement", selectedCtaEntitlementName);
      formik.setFieldValue("formula", editRowss[index - 1].formula);
    };

    const handleShowConfigurationForm = () => {
        setShowConfig(!showConfig);
    }

    const handleChange = (event) => {
      formik.setFieldValue("isFixed",event.target.checked);
    };

    const handleSaveFormula = () => {
        if (formik.values.formula) {
            formik.setFieldValue('calculation', eval(formik.values.calculation));
        }
    }

    function isCharacterALetter(char) {
      return (/[a-zA-Z]/).test(char)
    }
    
    const handleAddDropdown = () => {
        if (selectedOption !==null) {
            setFormulaLabel([...formulaLabel,formik.values?.formula]);
            formik.setFieldValue('formula', `${formik.values.formula}${selectedOption?.label}`);
            setCalculationAmount([...calculationAmount,formik.values?.calculation]);
            formik.setFieldValue('calculation', formik.values?.calculation ? `${formik.values.calculation}${selectedOption?.calAmount}` : `${selectedOption?.calAmount}`);
        }
    }

    const addValues = (value) => {
        formik.setFieldValue('formula',`${formik.values.formula}${value}`);
        formik.setFieldValue('calculation',`${formik.values.calculation}${value}`);
    }

    const handleBackspace = () => {
        if (formik.values.formula) {
          const ch = formik.values.formula?.charAt(formik.values.formula?.length - 1);
          if(isCharacterALetter(ch)){
            formik.setFieldValue('formula',formulaLabel?.pop());
            formik.setFieldValue('calculation',calculationAmount?.pop());
          }
          else{ 
          formik.setFieldValue('formula',formik.values.formula.slice(0, -1));
          formik.setFieldValue('calculation',formik.values.calculation.slice(0, -1));
          }
        }
    }
      
    const handleServiceTypeChange = (e,newValue) => {
        const select = newValue?.filter((item) => item.id === 0)
        if (select[0]?.id === 0) {
          if (formik.values.serviceTypeList?.length === serviceMenu.length) {
            formik.setFieldValue('serviceTypeList',[]);
            setServiceTypeId([]);
          } else {
            formik.setFieldValue('serviceTypeList',serviceMenu);
            setServiceTypeId(serviceMenu.map((item)=>item.id));
          }
        } else {
          formik.setFieldValue('serviceTypeList',newValue);
          setServiceTypeId(newValue.map((item)=>item.id));
        }
    }

    const handleDesignationChange = (e,newValue) => {
        const select = newValue?.filter((item) => item.id === 0)
        if (select[0]?.id === 0) {
          if (formik.values.designationList?.length === designationMenu.length) {
            formik.setFieldValue('designationList',[]);
            setDesignationId([]);
          } else {
            formik.setFieldValue('designationList',designationMenu);
            setDesignationId(designationMenu.map((item)=>item.id));
          }
        } else {
          formik.setFieldValue('designationList',newValue);
          setDesignationId(newValue.map((item)=>item.id));
        }
    }

    const handlePaylevelChange = (e,newValue) => {
        const select = newValue?.filter((item) => item.id === 0)
        if (select[0]?.id === 0) {
          if (formik.values.payLevelList?.length === payLevelMenu.length) {
            formik.setFieldValue('payLevelList',[]);
            setPayLevelId([]);
          } else {
            formik.setFieldValue('payLevelList',payLevelMenu);
            setPayLevelId(payLevelMenu.map((item)=>item.id));
          }
        } else {
          formik.setFieldValue('payLevelList',newValue);
          setPayLevelId(newValue.map((item)=>item.id));
        }
    }

    const isOptionSelected = (option,dropdownValueList,menuList) => {
        if (option === 'Select All') {
          return dropdownValueList.length === menuList.length;
        }
        return dropdownValueList.includes(option);
    };

    return (
      <div>
          {isLoader && <Loader />}
            <Card>
                <CardContent>
                    <PageTitle name="Pay Head Configuration" />
                    <Box component="form" noValidate onSubmit={searchFormik.handleSubmit}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="searchHeadName"
                                            name="searchHeadName"
                                            size='small'
                                            options={payHeadMenu}
                                            value={payHeadMenu.find(
                                                (option) => option.id === searchFormik.values.searchHeadName?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    searchFormik.setFieldValue("searchHeadName", null)
                                                }
                                                else {
                                                    searchFormik.setFieldValue("searchHeadName", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Head Name"
                                                    placeholder="Select Pay Head Name"
                                                    onBlur={searchFormik.handleBlur}
                                                    helperText={searchFormik.errors.searchHeadName && searchFormik.touched.searchHeadName ? searchFormik.errors.searchHeadName : null}
                                                    error={searchFormik.errors.searchHeadName && searchFormik.touched.searchHeadName }
                                                    
                                                />
                                            )}
                                        />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="searchPayCommissionName"
                                            name="searchPayCommissionName"
                                            size='small'
                                            options={payCommissionMenu}
                                            value={payCommissionMenu.find(
                                                (option) => option.id === searchFormik.values.searchPayCommissionName?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    searchFormik.setFieldValue("searchPayCommissionName", null)
                                                }
                                                else {
                                                    searchFormik.setFieldValue("searchPayCommissionName", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Pay Commission Name"
                                                    placeholder="Select Pay Commission Name"
                                                    onBlur={searchFormik.handleBlur}
                                                    helperText={searchFormik.errors.searchPayCommissionName && searchFormik.touched.searchPayCommissionName ? searchFormik.errors.searchPayCommissionName : null}
                                                    error={searchFormik.errors.searchPayCommissionName && searchFormik.touched.searchPayCommissionName }
                                                    
                                                />
                                            )}
                                        />
                            
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="searchCtaEntitlementName"
                                            name="searchCtaEntitlementName"
                                            size='small'
                                            options={ctaEntitlementMenu}
                                            value={ctaEntitlementMenu.find(
                                                (option) => option.id === searchFormik.values.searchCtaEntitlementName?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    searchFormik.setFieldValue("searchCtaEntitlementName", null)
                                                }
                                                else {
                                                    searchFormik.setFieldValue("searchCtaEntitlementName", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{ width: "100%", mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Cta Entitlement Name"
                                                    placeholder="Select Cta Entitlement Name"
                                                    onBlur={searchFormik.handleBlur}
                                                    helperText={searchFormik.errors.searchCtaEntitlementName && searchFormik.touched.searchCtaEntitlementName ? searchFormik.errors.searchCtaEntitlementName : null}
                                                    error={searchFormik.errors.searchCtaEntitlementName && searchFormik.touched.searchCtaEntitlementName }
                                                    
                                                />
                                            )}
                                        />
                        </Grid>
                    </Grid>
                    <Box spacing={2} sx={{ mt: 1, textAlign: 'center' }}>
                                    <Button
                                        sx={{
                                            minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
                                        }}
                                        variant="contained"
                                        type="submit"
                                        disabled={searchFormik.values.searchPayCommissionName === "" && searchFormik.values.searchCtaEntitlementName === "" && searchFormik.values.searchHeadName === ""}
                                    >
                                        {searchBtnText}
                                        &nbsp;
                                        <SearchIcon/>
                                    </Button>
                                    <Button
                                        type="button"
                                        sx={{ minWidth: 100, ml: 1, mt: { xs: 1, md: 0 } }}
                                        onClick={handleSearchCancel}
                                        variant="outlined"
                                    >
                                        <CachedIcon />&nbsp;RESET
                                    </Button>
                      </Box>
                    </Box>
                                        
            <Grid container  width="100%" sx={{mt:2}}>
                <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}} gap={2}>
                    <Button variant="contained" size="small" sx={{borderRadius:"4px"}} onClick={handleShowConfigurationForm}>Add Pay Head Configuration</Button>
                </Grid>
            </Grid>
                    <Grid container sx={{mt:2}}>
                            <Grid item>
                                <SearchTable 
                                    columns={columns}
                                    data={ searchWork ? searchRowss : rowss}
                                    isCheckbox={false}
                                    isHideDensity={false}
                                    isHideExport={true}
                                    isHideFilter={true}
                                    isHideColumn={true}
                                    isHidePaging={false}
                                    name="villageName"
                                    id="villageName"
                                />
                            </Grid>
                        </Grid>
                </CardContent>
            </Card>

            {showConfig && (
                    <Card>
                        <CardContent>
                            <PageTitle name="Compensation Head Name"/>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                            <Grid container columnSpacing={2}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="headName"
                                            name="headName"
                                            size='small'
                                            disabled={isReadable}
                                            options={payHeadMenu}
                                            value={payHeadMenu.find(
                                                (option) => option.id === formik.values.headName?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("headName", null)
                                                }
                                                else {
                                                    formik.setFieldValue("headName", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{ mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Head Name"
                                                    placeholder="Select Pay Head Name"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.headName && formik.touched.headName ? formik.errors.headName : null}
                                                    error={formik.errors.headName && formik.touched.headName }
                                                    required
                                                />
                                            )}
                                        />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="payCommissionName"
                                            name="payCommissionName"
                                            size='small'
                                            disabled={isReadable}
                                            options={payCommissionMenu}
                                            value={payCommissionMenu.find(
                                                (option) => option.id === formik.values.payCommissionName?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("payCommissionName", null)
                                                }
                                                else {
                                                    setPayCommissionId(value);
                                                    formik.setFieldValue("payCommissionName", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{  mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Pay Commission"
                                                    placeholder="Select Pay Commission Name"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.payCommissionName && formik.touched.payCommissionName ? formik.errors.payCommissionName : null}
                                                    error={formik.errors.payCommissionName && formik.touched.payCommissionName }
                                                    required
                                                />
                                            )}
                                        />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete
                                        multiple
                                        limitTags={1}
                                        required
                                        id="serviceTypeList"
                                        name="serviceTypeList"
                                        options={[{id:0,label:"Select All"} ,...serviceMenu]}
                                        size="small"
                                        disabled={isReadable}
                                        fullWidth
                                        isOptionEqualToValue={(option,value)=>option.label === value.label}
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option, { selected }) => (
                                          <li {...props}>
                                            <Checkbox
                                              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                              checkedIcon={<CheckBoxIcon fontSize="small" />}
                                              style={{ marginRight: 8 }}
                                              checked={isOptionSelected(option,formik.values.serviceTypeList,serviceMenu)}
                                            />
                                            {option.label}
                                          </li>
                                        )}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Service Type "
                                            placeholder="Select Service Type"
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.serviceTypeList && formik.touched.serviceTypeList ? formik.errors.serviceTypeList : null}
                                            error={formik.errors.serviceTypeList && formik.touched.serviceTypeList }
                                            required
                                            
                                        />
                                        )}
                                        value={formik.values.serviceTypeList}
                                        onChange={handleServiceTypeChange}
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip label={option.label} {...getTagProps({ index })} />
                                          ))}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                     <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="departmentName"
                                            name="departmentName"
                                            size='small'
                                            disabled={isReadable}
                                            options={departmentMenu}
                                            value={departmentMenu.find(
                                                (option) => option.id === formik.values.departmentName?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("departmentName", null)
                                                }
                                                else {
                                                    setDepartmentId(value);
                                                    formik.setFieldValue("departmentName", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Department Name"
                                                    placeholder="Select Department Name"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.departmentName && formik.touched.departmentName ? formik.errors.departmentName : null}
                                                    error={formik.errors.departmentName && formik.touched.departmentName }
                                                    required
                                                />
                                            )}
                                        />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete
                                        multiple
                                        limitTags={3}
                                        required
                                        id="designationList"
                                        name="designationList"
                                        options={[{id:0,label:"Select All"} ,...designationMenu]}
                                        size="small"
                                        fullWidth
                                        isOptionEqualToValue={(option,value)=>option.label === value.label}
                                        disabled={designationMenu.length === 0 || departmentId?.length === 0 || editCount > 0}
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option, { selected }) => (
                                          <li {...props}>
                                            <Checkbox
                                              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                              checkedIcon={<CheckBoxIcon fontSize="small" />}
                                              style={{ marginRight: 8 }}
                                              checked={isOptionSelected(option,formik.values.designationList,designationMenu)}
                                            />
                                            {option.label}
                                          </li>
                                        )}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Designation Name"
                                            placeholder="Select Designation Name"
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.designationList && formik.touched.designationList ? formik.errors.designationList : null}
                                            error={formik.errors.designationList && formik.touched.designationList }
                                            required
                                            
                                        />
                                        )}
                                        value={formik.values.designationList}
                                        onChange={handleDesignationChange}
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip label={option.label} {...getTagProps({ index })} />
                                          ))}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete
                                        multiple
                                        required
                                        limitTags={3}
                                        id="payLevelList"
                                        name="payLevelList"
                                        options={[{id:0,label:"Select All"} ,...payLevelMenu]}
                                        size="small"
                                        fullWidth
                                        isOptionEqualToValue={(option,value)=>option.label === value.label}
                                        disabled={payLevelMenu.length === 0 || payCommissionId?.length === 0 || editCount > 0}
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option, { selected }) => (
                                          <li {...props}>
                                            <Checkbox
                                              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                              checkedIcon={<CheckBoxIcon fontSize="small" />}
                                              style={{ marginRight: 8 }}
                                              checked={isOptionSelected(option,formik.values.payLevelList,payLevelMenu)}
                                            />
                                            {option.label}
                                          </li>
                                        )}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Pay Level Name"
                                            placeholder="Select Pay Level"
                                            onBlur={formik.handleBlur}
                                            helperText={formik.errors.payLevelList && formik.touched.payLevelList ? formik.errors.payLevelList : null}
                                            error={formik.errors.payLevelList && formik.touched.payLevelList }
                                            required
                                            
                                        />
                                        )}
                                        value={formik.values.payLevelList}
                                        onChange={handlePaylevelChange}
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip label={option.label} {...getTagProps({ index })} />
                                          ))}
                                    />
                                </Grid>
                                {!formik.values.isFixed ? (
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                      <TextField 
                                          label="Max Amount" 
                                          size="small"
                                          type="text"
                                          id="maxAmount"
                                          name="maxAmount"
                                          disabled={isReadable}
                                          value={formik.values.maxAmount}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.maxAmount && !!formik.errors.maxAmount}
                                          helperText={formik.touched.maxAmount && formik.errors.maxAmount}
                                          required
                                          fullWidth 
                                          />
                                    </Grid>
                                ):(
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                      <TextField 
                                          label="Fixed Amount" 
                                          size="small"
                                          type="text"
                                          id="fixedAmount"
                                          name="fixedAmount"
                                          disabled={isReadable} 
                                          value={formik.values.fixedAmount}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.fixedAmount && !!formik.errors.fixedAmount}
                                          helperText={formik.touched.fixedAmount && formik.errors.fixedAmount}
                                          required
                                          fullWidth 
                                          />
                                    </Grid>
                                )}

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                          <DatePicker
                                            sx={{ width: "100%"}}
                                            id="effectiveOrderDate"
                                            name='effectiveOrderDate'
                                            disablePast
                                            disabled={isReadable}
                                            format="DD/MM/YYYY"
                                            value={formik.values.effectiveOrderDate}
                                            onChange={value => formik.setFieldValue("effectiveOrderDate", value)}
                                            onBlur={formik.handleBlur}
                                            label="Effective Order Date"
                                            slotProps={{ textField: { size: 'small', required: true } }}
 
                                            renderInput={(params) => (
                                              <TextField
                                              size="small"
                                              fullWidth
                                              sx={{m:"0"}}
                                              {...params}
                                              error={formik.touched.effectiveOrderDate && Boolean(formik.errors.effectiveOrderDate)}
                                              helperText={formik.touched.effectiveOrderDate && formik.errors.effectiveOrderDate}
                                              onBlur={formik.handleBlur}
                                              />
                                          )}
                                        />
                                       </LocalizationProvider>
                                </Grid>
                                {formik.values?.headName?.label === "Dearness Allowance" && (
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                          <DatePicker
                                            sx={{ width: "100%" }}
                                            id="circulatedDate"
                                            name='circulatedDate'
                                            disablePast
                                            format="DD/MM/YYYY"
                                            disabled={isReadable}
                                            value={formik.values.circulatedDate}
                                            onChange={value => formik.setFieldValue("circulatedDate", value)}
                                            onBlur={formik.handleBlur}
                                            label="Circulated Date"
                                            slotProps={{ textField: { size: 'small', required: true } }}
 
                                            renderInput={(params) => (
                                              <TextField
                                              size="small"
                                              fullWidth
                                              sx={{m:"0"}}
                                              {...params}
                                              error={formik.touched.circulatedDate && Boolean(formik.errors.circulatedDate)}
                                              helperText={formik.touched.circulatedDate && formik.errors.circulatedDate}
                                              onBlur={formik.handleBlur}
                                              />
                                              )}
                                        />
                                       </LocalizationProvider>
                                </Grid>
                                )}

                                {formik.values?.headName?.label  === "House Rent Allowance" && (
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                      <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="tierId"
                                            name="tierId"
                                            size='small'
                                            disabled={isReadable}
                                            options={tierMenu}
                                            value={tierMenu.find(
                                                (option) => option.id === formik.values.tierId?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("tierId", null)
                                                }
                                                else {
                                                    formik.setFieldValue("tierId", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Tier"
                                                    placeholder="Select Tier"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.tierId && formik.touched.tierId ? formik.errors.tierId : null}
                                                    error={formik.errors.tierId && formik.touched.tierId}
                                                    required
                                                />
                                            )}
                                        />
                                </Grid>
                                )}

                                {formik.values?.headName?.label  === "City Transport allowance" && (
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="ctaEntitlement"
                                            name="ctaEntitlement"
                                            size='small'
                                            disabled={isReadable}
                                            options={ctaEntitlementMenu}
                                            value={ctaEntitlementMenu.find(
                                                (option) => option.id === formik.values.ctaEntitlement?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("ctaEntitlement", null)
                                                }
                                                else {
                                                    formik.setFieldValue("ctaEntitlement", value)
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Cta Entitlement Name"
                                                    placeholder="Select Cta Entitlement Name"
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.ctaEntitlement && formik.touched.ctaEntitlement ? formik.errors.ctaEntitlement : null}
                                                    error={formik.errors.ctaEntitlement && formik.touched.ctaEntitlement }
                                                    required
                                                />
                                            )}
                                        />
                                </Grid>
                                )}

                                <Grid item xs={12}  sx={{display:"flex",justifyContent:"center"}}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox  checked={formik.values.isFixed} onChange={handleChange}/>} label="Fixed Amount" disabled={ isReadable}/>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <hr/>
                            {!formik.values.isFixed &&(
                              <>
                            <Grid container columnSpacing={2}>
                                <Grid item xs={12} sm={6} md={6} lg={6}> 
                                <Autocomplete
                                            disablePortal
                                            margin="normal"
                                            fullWidth
                                            id="compensationHeadList"
                                            name="compensationHeadList"
                                            size='small'
                                            disabled={compensationHeadMenu.length === 0 || payCommissionId?.length === 0 || editCount > 0}
                                            options={compensationHeadMenu}
                                            value={compensationHeadMenu.find(
                                                (option) => option.id === formik.values.compensationHeadList?.id
                                            ) || null}
                                            onChange={(e, value) => {
                                                if (value === null) {
                                                    formik.setFieldValue("compensationHeadList", null)
                                                }
                                                else {
                                                  formik.setFieldValue("compensationHeadList", value)
                                                  setSelectedOption(value);
                                                  setFormulaId([value,...formulaId]);
                                                }
                                            }}
 
                                            getOptionLabel={(value) => value.label}
                                            sx={{ mt: 2, mb: 1 }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    label="Compensation Head "
                                                    placeholder='Compensation Head Name'
                                                    onBlur={formik.handleBlur}
                                                    helperText={formik.errors.compensationHeadList && formik.touched.compensationHeadList ? formik.errors.compensationHeadList : null}
                                                    error={formik.errors.compensationHeadList && formik.touched.compensationHeadList }
                                                    required
                                                />
                                            )}
                                        />
                                </Grid>
                                
                              {editCount === 0 && (
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                      <TextField 
                                          placeholder='Formula calculation shown here.'
                                          size="small"
                                          type="text"
                                          id="calculation"
                                          name="calculation" 
                                          disabled = {true}
                                          sx={{ mt: 2, mb: 1 }}
                                          value={formik.values.calculation}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={formik.touched.calculation && !!formik.errors.calculation}
                                          helperText={formik.touched.calculation && formik.errors.calculation}
                                          fullWidth 
                                          />
                                    </Grid>)}
                                <Grid item sx={{m:"auto 0",ml:"auto"}}>
                                    <Button variant="contained" size="small" sx={{borderRadius:"4px",display:editCount>0 && "none"}} onClick={handleAddDropdown}>Add Head </Button>
                                </Grid>
                            </Grid>
                            <Alert severity='warning' sx={{mt:2, mb:2}}>
                                Note:- Please use only numbers and symbols below from the buttons.
                            </Alert>
                            <Grid container sx={{display:'flex',flexDirection:{xs:'column',lg:'row'}}}>
                                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                                    <TextField
                                        id="formula"
                                        name="formula"
                                        multiline
                                        disabled={isReadable}
                                        rows={4}
                                        fullWidth
                                        placeholder='{0-9, *,+,-,/,(,),}. Letters are not allowed.'
                                        value={formik.values.formula}
                                        onBlur={formik.handleBlur}
                                        error={formik.errors.formula && formik.touched.formula}
                                        helperText={formik.errors.formula && formik.touched.formula ? formik.errors.formula : null}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                <Grid item sx={{display:'flex',justifyContent:'center'}} gap={0.5}>
                                  {numbers.map((num)=>(
                                    <Button key={num} variant="outlined" size="small" sx={{borderRadius:"4px"}} onClick={() => addValues(String(num))} disabled = { isReadable} >{num}</Button>
                                    ))}
                                </Grid>
                                <Grid item sx={{display:'flex',justifyContent:'center', marginTop:'16px'}} gap={0.5}>
                                  {symbols.map((sym)=>(
                                    <Button key={sym} variant="outlined" size="small" sx={{borderRadius:"4px"}} onClick={() => addValues(sym)} disabled = { isReadable} >{sym}</Button>
                                    ))}
                                </Grid>
                                <Grid item  sx={{display:'flex',justifyContent:'center',  marginTop:'16px'}}>
                                    <Button variant="outlined" size="small" sx={{borderRadius:"4px",  width:{xs:'58%',md:'35%',lg:'35%', xl:'15%'}}} onClick={handleBackspace} disabled = { isReadable }>Backspace</Button>
                                </Grid>
                              </Grid>  
                                <Grid item >
                                    <Button variant="contained" size="small" sx={{borderRadius:"4px",display:editCount>0 && "none"}} onClick={handleSaveFormula}>Save Formula </Button>
                                </Grid>
                          </Grid>
                              
                            </>
                          )}
                          <Box
                              spacing={2}
                                    sx={{ mt: 1, textAlign: 'center' }}
                                >
                                    <Button
                                        sx={{
                                            minWidth: 100, ml: 1, mt: { xs: 1, md: 0 }
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
                                        <CachedIcon />&nbsp;RESET
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
            )}
        </div>
    )
}

export default PayHeadConfiguration;
