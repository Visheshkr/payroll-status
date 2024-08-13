import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  // Modal,
  Tooltip,
  Typography,
} from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BadgeIcon from '@mui/icons-material/Badge';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FeedIcon from "@mui/icons-material/Feed";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonIcon from "@mui/icons-material/Person";
import PinDropTwoToneIcon from "@mui/icons-material/PinDropTwoTone";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import { differenceInYears } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import * as Yup from "yup";
import { useSnackbar } from "../../components/Snackbar";
import { H3 } from "../../components/Typography";
import SearchModal from "./SearchModal";
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
export const calculateSuperannuationDate = (dob, retirementAge) => {
  const birthDate = new Date(dob.year(), dob.month(), dob.day());
  console.log(birthDate);
  const retirementDate = new Date(birthDate);
  retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge);
  if (birthDate.getDate() === 1) {
    retirementDate.setMonth(retirementDate.getMonth());
    retirementDate.setDate(0); // Last day of the previous month
  } else {
    retirementDate.setMonth(retirementDate.getMonth() + 1);
    retirementDate.setDate(0); // Last day of the same month
  }
  return retirementDate;
};
const validatePercentages = (percentages, selectedDisabilities) => {
  //validate number of percentages matches number of disabilities
  if (percentages.length !== selectedDisabilities.length) {
    return false;
  }
  //validate each percentage value
  for (let percentage of percentages) {
    if (percentage < 0 || percentage > 100) {
      return false;
    }
  }
  return true;
}
const validationSchema = Yup.object().shape({
  prefix: Yup.string().required("Prefix is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required").nullable(),
  // dob: Yup.date().required("Date of Birth is required")
  // .test('is-18',
  //   'Age must be atlrast 18 years old',
  //   (value)=>value && differenceInYears(new Date(),new Date(value))>=18,
  // )
  // .nullable(),
  height: Yup.string().required("Height is required").nullable(),
  heightText: Yup.string()
    .when("height", {
      is: (value) => value === "144",
      then: Yup.string().required("Specify height").nullable(),
    })
    .nullable(),
  heightInFeet: Yup.string()
    .when("height", {
      is: (value) => value === "145",
      then: Yup.string().required("Specify height in Feet").nullable(),
    })
    .nullable(),
  identificationMarks: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only Alphabetical characters are allowed")
    .required("Identification Marks is required")
    .min(5, "Identification Mark must contain at least 5 characters"),
  fatherName: Yup.string().required("Father Name is required"),
  motherName: Yup.string().required("Mother Name is required"),
  maritalStatus: Yup.string().required("Marital Status is required").nullable(),
  serviceType: Yup.string().required("Service Type is required").nullable(),
  cadre: Yup.string().required("Cadre is required").nullable(),
  spouseName: Yup.string()
    .when("maritalStatus", {
      is: (value) => value === "149" || value === "148" || value === "151" || value === "150",
      then: Yup.string().required("Spouse Name is required").nullable(),
    })
    .nullable(),
  physicallyHandicapped: Yup.string()
    .required("Disability is required")
    .nullable(),
  gpfPranType: Yup.string().required("GPF/Pran Type is required").nullable(),
  Aadhaar: Yup.string()
    .matches(/^[1-9]\d{11}$/, "Enter a valid Aadhaar Number")
    .required('Aadhaar Number is required'),
  pancard: Yup.string()
    .matches(/^[A-Z]{5}\d{4}[A-Z]$/, 'Enter a valid 11 characters PAN number')
    .required('PAN number is required'),
  personalMobile: Yup.string("Enter a valid Contact Number")
    .matches(/^[6-9]\d{9}$/, "Invalid Personal Mobile number")
    .required("Personal Mobile Number is required")
    .min(10, "Personal Mobile Number Must be 10 digits")
    .max(10, "Personal Mobile Number must not exceed 10 digits")
    .nullable(),
  pincodecomm: Yup.string("Enter a valid Pincode").required("Pincode is required").matches(/^[0-9]+$/, "Invalid Pincode").min(6, "Pincode must have 6 digits").max(6, "Pincode must not exceed 6 digits").nullable(),
  //  disabilityPercentages: Yup.string().when('physicallyHandicapped', {
  //     is: 'true',
  //     then: Yup.string()
  //       .matches(/^([0-9]{1,2})(,[0-9]{1,2})*$/, {
  //         message: 'Invalid Percentage format',
  //         excludeEmptyString: true,
  //       })
  //       .test('max-percentage', 'Percentage should be less than or equal to 99', (value) => {
  //         if (!value) return true; // Allow empty string if not required
  //         const percentages = value.split(',').map(Number);
  //         return percentages.every((percent) => percent <= 99);
  //       })
  //       .required('Disability Percentage is required'),
  //   }),
  disabilityType: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        label: Yup.string().required(),
      })
    )
    .when("physicallyHandicapped", {
      is: (value) => value === "true",
      then: Yup.array().min(1, "Disability Type is required").nullable(),
      otherwise: Yup.array().nullable(),
    }),
  disabilityPercentages: Yup.array()
    .when('physicallyHandicapped',
      {
        is: "true",
        then: Yup.array()
          .of(
            Yup.number("Percentage must be Integer")
              .min(0, "Percentage must be between 0 and 100")
              .max(100, "Percentage must be between 0 and 100")
            // .required("Disability Percentage is Required")
          )
          .required("Disability Percentage is Required")
          .test('match-disability-type-count', 'the number of percentages must match the number of selected disability types', function (value) {
            const { disabilityType } = this.parent;
            return validatePercentages(value, disabilityType)
          }
          ),
        otherwise: Yup.array().notRequired()
      }
    ),
  bloodGrp: Yup.string().required("Blood Group is required").nullable(),
  personalemail: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Inalid Email")
    .email("Enter a valid email address")
    .required("Personal Email ID is required"),
  nationality: Yup.string().required("Nationality is required").nullable(),
  socialCategory: Yup.string()
    .required("Social Category is required")
    .nullable(),
  religion: Yup.string().required("Religion is required").nullable(),
  employeeType: Yup.string().required("Employee Type is required").nullable(),
  parentDept: Yup.string()
    .required("Parent Department is required")
    .nullable(),
  currentDept: Yup.string()
    .required("Current Department is required")
    .nullable(),
  govtOccupied: Yup.string()
    .required("Govt. Quarter Occupied is required")
    .nullable(),
  quarterType: Yup.string()
    .when("govtOccupied", {
      is: (value) => value === 1,
      then: Yup.string().required("Quarter Type is required").nullable(),
    })
    .nullable(),
  group: Yup.string().required("Group is required").nullable(),
  appointmentOrdNo: Yup.string()
    .required("Appointment Order Number is required")
    .nullable(),
  currentDesgn: Yup.string().required('Rank is required').nullable(),
  appointmentOrdDate: Yup.string()
    .required("Appointment Order Date is required")
    .nullable(),
  joiningDate: Yup.string().required("Joining Date is required").nullable(),
  joiningTime: Yup.string().required("Joining Time is required").nullable(),
  confirmationDate: Yup.string()
    .required("Confirmation Date is required")
    .nullable(),
  paySlip: Yup.string().required("Pay Slip is required").nullable(),
  payslipAuthority: Yup.string()
    .when("paySlip", {
      is: (value) => value === 1,
      then: Yup.string().required("Pay Slip Authority is required").nullable(),
    })
    .nullable(),
  gpfPranId: Yup.string().required("GPF/Pran Id is required")
    .matches(/^\d{6,12}$/, "Id should be 6 to 12 digits only")
    .nullable(),
  houseNumberComm: Yup.string().required("House No. is required"),
  streetcomm: Yup.string().required("Street is required"),
  stateIdcommunication: Yup.string().required("State is required").nullable(),
  distIdcommunication: Yup.string().required("District is required").nullable(),
  currentOffice: Yup.string().required("Current Office is required").nullable(),
  srcOfRecruit: Yup.string().required("Source of Recruitment is required").nullable(),
});
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const SavePersonalDetails = ({
  formData,
  setFormData,
  prevData,
  onButtonClick,
  view
}) => {
  const [genderList, setGenderList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [prefixList, setPrefixList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [isserviceType, setIsServiceType] = useState(true);
  const [departmentList, setDepartmentList] = useState([]);
  const [cradeList, setCradeList] = useState([]);
  const [retirementAgeList, setRetirementAgeList] = useState(0);
  const [currentOffice, setCurrentOffice] = useState("");
  const [orderIssuingOfficeId, setOrderIssuingOffice] = useState("")
  const [groupList, setGrouplist] = useState([]);
  const [gpfPranList, setGpfPranList] = useState([]);
  const [srcOfRecruitList, setSrcOfRecruitmentList] = useState([]);
  const [payslipAuthorityList, setPayslipAuthorityList] = useState([]);
  const [joiningTimeList, setJoiningTimeList] = useState([]);
  const [heightList, setHeightList] = useState([]);
  const [quarterTypeList, setQuarterTypelist] = useState([]);
  const [iscradeType, setIsCradeType] = useState(true);
  const [designation, setDesignation] = useState([]);
  const [isdesignation, setIsDesignation] = useState(true);
  const [relationlist, setRelationList] = useState([]);
  const [religionList, setReligionList] = useState([]);
  const [nationalityList, setNationalityList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [maritalStatusList, setMaritalStatusList] = useState([]);
  const [bloodList, setBloodgroupList] = useState([]);
  const [disabilityList, setTypeofDisabilityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [districtoneList, setDistrictoneList] = useState([]);
  const [casteList, setCasteList] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("info");
  const [showNext, setShowNext] = useState(view);
  const { showSnackbar } = useSnackbar();

  const textFieldStyles = {
    borderRadius: '5px'
  }
  console.log(formData)
  useEffect(() => {
    axios
      .get(`http://141.148.194.18:8052/payroll/employee/dropdown/state`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setStatelist(response.data);
          // setIsServiceType(false);
        }
        console.log(response);
      })
      .catch((error) => {
        setStatelist([]);
        console.log(error);
      });
    axios
      .get(
        `http://141.148.194.18:8052/payroll/employee/dropdown/service-type`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(
              "token"
            )}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setServiceList(response.data);
          // setIsServiceType(false);
        }
        console.log(response);
      })
      .catch((error) => {
        setServiceList([]);
        console.log(error);
      });

    axios
      .get(`http://141.148.194.18:8052/payroll/employee/dropdown-init`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        // let sortedData = response.data.map((value) => {
        //      value.label = value.label
        //      return value;
        //  })
        //  console.log(sortedData);
        if (response.status === 200) {
          setPrefixList(response.data.prefix);
          setNationalityList(response.data.nationality);
          setGenderList(response.data.gender);
          setCasteList(response.data.caste);
          setRelationList(response.data.relationship);
          setReligionList(response.data.religion);
          setMaritalStatusList(response.data.maritalStatus);
          setEmployeeList(response.data.employeeType);
          setBloodgroupList(response.data.bloodGroup);
          setCategoryList(response.data.socialCategory);
          setTypeofDisabilityList(response.data.typesOfDisability);
          setDepartmentList(response.data.department);
          setGpfPranList(response.data.gpfPranType);
          setSrcOfRecruitmentList(response.data.sourceOfRecruitment);
          setHeightList(response.data.heightCmFeet);
          setPayslipAuthorityList(response.data.payslipAuthority);
          setQuarterTypelist(response.data.quarterType);
          setJoiningTimeList(response.data.joiningTime);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const formik = useFormik({
    initialValues: {
      prefix: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dob: null,
      height: "",
      heightText: "",
      heightInFeet: "",
      heightInInch: "",
      identificationMarks: "",
      fatherName: "",
      motherName: "",
      maritalStatus: "",
      spouseName: "",
      physicallyHandicapped: null,
      disabilityType: [],
      disabilityPercentages: [],
      bloodGrp: "",
      personalemail: "",
      personalMobile: "",
      nationality: "",
      socialCategory: null,
      gpfPranType: null,
      gpfPranId: "",
      religion: "",
      pancard: "",
      Aadhaar: "",
      employeeType: "",
      serviceType: "",
      cadre: "",
      quarterType: null,
      parentDept: "",
      currentDept: "",
      currentDesgn: "",
      group: "",
      // currentOffice: null,
      orderIssuingOffice: "",
      appointmentOrdNo: "",
      appointmentOrdDate: null,
      srcOfRecruit: "",
      joiningDate: null,
      confirmationDate: null,
      superannuationDate: null,
      joiningTime: "",
      payRevision: "",
      payScale: "",
      gradePay: "",
      basicPay: "",
      govtOccupied: "",
      paySlip: null,
      payslipAuthority: null,
      aadharDoc: "",
      aadharDocName: "",
      panDoc: "",
      panDocName: "",
      houseNumberComm: "",
      streetcomm: "",
      distIdcommunication: null,
      stateIdcommunication: null,
      mandalIdcommunication: "",
      villageIdcommunication: "",
      pincodecomm: "",
      currentOffice: currentOffice,
      selectedstateId: "",
    },
    validationSchema: validationSchema,
  });
  useEffect(() => {
    if (formik.values.dob && retirementAgeList) {
      const superannuationDate = calculateSuperannuationDate(
        dayjs(formik.values.dob, "DD-MM-YYYY"),
        retirementAgeList
      );
      console.log(superannuationDate);
      formik.setFieldValue(
        "superannuationDate",
        dayjs(superannuationDate).format("DD-MM-YYYY")
      );
      console.log(dayjs(superannuationDate).format("DD-MM-YYYY"));
    }
  }, [formik.values.dob, formik.values.cadre]);


  useEffect(() => {
    if (view) {
      fetchData();
    }
  }, [view]);

  useEffect(() => {
    if (formik.values.orderIssuingOffice) {
      axios
        .get(`http://141.148.194.18:8052/payroll/employee/dropdown/group/${formik.values.selectedstateId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setGrouplist(response.data);
            // setIsServiceType(false);
          }
          console.log(response);
        })
        .catch((error) => {
          setGrouplist([]);
          console.log(error);
        });
    }
  }, [formik.values.orderIssuingOffice]);


  const fetchData = () => {
    axios.get(`http://141.148.194.18:8052/payroll/employee/personal-details/${formData.refNo}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then(response => {

      const result = response.data.result;

      formik.setFieldValue("prefix", result.prefix.id);
      formik.setFieldValue("firstName", result.firstName);
      formik.setFieldValue("middleName", result.middleName);
      formik.setFieldValue("lastName", result.lastName);
      formik.setFieldValue("gender", result.gender.id);
      formik.setFieldValue("dob", dayjs(result.dob, "DD-MM-YYYY"));
      formik.setFieldValue("identificationMarks", result.identifcnMark);
      formik.setFieldValue("fatherName", result.fatherName);
      formik.setFieldValue("motherName", result.motherName);
      formik.setFieldValue("maritalStatus", result.maritalStatus.id);
      formik.setFieldValue("spouseName", result.spouseName);
      //formik.setFieldValue("physicallyHandicapped", result.isDisabled);
      // formik.setFieldValue("disabilityType", result.empDisabilityList.map(dis => dis.disabilityType.id));
      // formik.setFieldValue("disabilityPercentages", result.empDisabilityList.map(dis => dis.disabilityPercent));
      console.log(result.empDisabilityList.map(dis => dis.disabilityType.label))
      if (result.isDisabled === true) {
        formik.setFieldValue("physicallyHandicapped", result.isDisabled.toString());
        formik.setFieldValue("disabilityType", result.empDisabilityList.map(dis => dis.disabilityType.label));
        formik.setFieldValue("disabilityPercentages", result.empDisabilityList.map(dis => dis.disabilityPercent));
      }
      if (result.isDisabled === false) {
        formik.setFieldValue("physicallyHandicapped", result.isDisabled.toString());
      }
      formik.setFieldValue("bloodGrp", result.bloodGroup.id);
      formik.setFieldValue("personalemail", result.personalEmail);
      formik.setFieldValue("personalMobile", result.personalMobileNo);
      formik.setFieldValue("religion", result.religion.id);
      formik.setFieldValue("nationality", result.nationality.id);
      formik.setFieldValue("socialCategory", result.socialCategory.id);
      formik.setFieldValue("gpfPranType", result.gpfPranType.id);
      formik.setFieldValue("gpfPranId", result.gpfPranNo);
      formik.setFieldValue("pancard", result.panNo);
      formik.setFieldValue("Aadhaar", result.aadhaarRefNo);
      formik.setFieldValue("employeeType", result.employeeType.id);
      formik.setFieldValue("serviceType", result.serviceType.id);
      formik.setFieldValue("cadre", result.cadreId.id);

      // formik.setFieldValue("govtOccupied", result.isGovtQuarterOccupied);
      // formik.setFieldValue("quarterType", result.quarterType.id);
      formik.setFieldValue("parentDept", result.parentDeptId.id);
      formik.setFieldValue("currentDept", result.currentDeptId.id);
      formik.setFieldValue("currentDesgn", result.currentDsgnId.id);
      formik.setFieldValue("group", result.grpId.id);
      formik.setFieldValue("currentOffice", result.currentOffice.officeName);
      formik.setFieldValue("orderIssuingOffice", result.currentOffice.officeName);
      formik.setFieldValue("appointmentOrdNo", result.appointOrdNo);
      formik.setFieldValue("appointmentOrdDate", dayjs(result.appointOrdDate, "DD-MM-YYYY"));
      formik.setFieldValue("srcOfRecruit", result.srcRecruitment);
      formik.setFieldValue("joiningDate", dayjs(result.joiningDate, "DD-MM-YYYY"));
      formik.setFieldValue("joiningTime", result.joiningTime.id);
      formik.setFieldValue("superannuationDate", result.superannuationDate);
      formik.setFieldValue("confirmationDate", dayjs(result.confirmationDate, "DD-MM-YYYY"));

      formik.setFieldValue("houseNumberComm", result.addressLine1);
      formik.setFieldValue("streetcomm", result.addressLine2);
      formik.setFieldValue("stateIdcommunication", result.stateId.id);
      formik.setFieldValue("distIdcommunication", result.distId.id);
      formik.setFieldValue("pincodecomm", result.pincode);
      formik.setFieldValue("paySlip", result.isPayslip);
      formik.setFieldValue("height", result.heightMeasure.id);


      if (result.isGovtQuarterOccupied === true) {
        formik.setFieldValue("govtOccupied", result.isGovtQuarterOccupied.toString());
        formik.setFieldValue("quarterType", result.quarterType.id);
      }

      if (result.isGovtQuarterOccupied === false) {
        formik.setFieldValue("govtOccupied", result.isGovtQuarterOccupied.toString());
      }

      if (result.serviceType != null) {
        axios
          .get(
            `
             http://141.148.194.18:8052/payroll/employee/dropdown/cadre/${result.serviceType.id}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get(
                  "token"
                )}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setCradeList(response.data);
              // setRetirementAgeList(
              //   response.data[0].retirementAge
              // );
              setIsCradeType(false);
            }
            console.log(
              response.data[0].retirementAge
            );
          })
          .catch((error) => {
            setCradeList([]);
            console.log(error);
          });

      }

      if (result.isPayslip === true) {

        formik.setFieldValue("paySlip", result.isPayslip.toString());
        formik.setFieldValue("payslipAuthority", result.payslipAuthority.id);
      }
      if (result.isPayslip === false) {

        formik.setFieldValue("paySlip", result.isPayslip.toString());
      }

      if (result.stateId != null) {
        axios
          .get(
            `http://141.148.194.18:8052/payroll/employee/dropdown/district/${result.stateId.id}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get(
                  "token"
                )}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setDistrictoneList(response.data);
            }
            console.log(
              response.data[0].retirementAge
            );
          })
          .catch((error) => {
            setDistrictoneList([]);
            console.log(error);
          });

      }

      if (result.heightMeasure.id === 144) {
        formik.setFieldValue("heightText", result.heightCmOrFeet);
      }
      if (result.heightMeasure.id === 145) {
        formik.setFieldValue("heightInFeet", result.heightCmOrFeet);
        formik.setFieldValue("heightInInch", result.heightInch);
      }

    })

  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleDisabilityTypeChange = (event, selectedValues) => {
    const currentPercentages = formik.values.disabilityPercentages.slice(
      0,
      selectedValues.length
    );
    formik.setFieldValue("disabilityType", selectedValues);
    formik.setFieldValue("disabilityPercentages", currentPercentages);
  };
  const handlePercentageChange = (event) => {
    // Split the input value by commas and trim any extra spaces
    const inputValues = event.target.value
      .split(",")
      .map((value) => value.trim());
    formik.setFieldValue("disabilityPercentages", inputValues);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentOffice("");
    formik.setFieldValue("currentOffice", "");
  };
  const handleOfficeSelect = (officeName, officeId, selectedstateId) => {
    setCurrentOffice(officeId);
    setOrderIssuingOffice(officeId);
    console.log(officeId);
    console.log(officeName);
    console.log(selectedstateId);
    formik.setFieldValue("currentOffice", officeName);
    formik.setFieldValue("orderIssuingOffice", officeName);
    formik.setFieldValue("selectedstateId", selectedstateId);
  };

  const computeAgeString = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let ageString = "";
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    let dayDiff = today.getDate() - birthDate.getDate();
    if (dayDiff < 0) {
      monthDiff--;
      const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
      dayDiff = Math.floor((today - prevMonthDate) / (1000 * 60 * 60 * 24))
    }
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
      monthDiff += 12;
    }
    if (age > 0) {
      ageString += `${age}`;
    }
    if (monthDiff > 0) {
      ageString += `${monthDiff}`;
    }
    if (dayDiff > 0) {
      ageString += `${dayDiff}`;
    }
    return ageString
  }
  function calculateAge(dateOfBirth) {
    let ageString = ""
    if (dateOfBirth === null) {
      return ageString;
    }
    if (dateOfBirth != null) {
      ageString = computeAgeString(dateOfBirth)
      return ageString;
    }
  }
  const checkValid = async () => {
    formik
      .validateForm()
      .then((formErrors) => {
        if (Object.keys(formErrors).length > 0) {
          console.log(Object.keys(formErrors));
          //alert(Object.keys(formErrors))
          setToastMessage("Please fill all the required * fields");
          setToastSeverity("error");
          setOpenToast(true);
        } else {
          //savePersonalDetails();
          handleRedirect();
        }
      })
      .catch((err) => {
        formik.setSubmitting(false);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    let ageString = "";
    if (age > 0) {
      ageString += age === 1 ? "1 year" : `${age} years`;
    }
    if (monthDiff > 0) {
      if (ageString !== "") {
        ageString += ", ";
      }
      ageString += monthDiff === 1 ? "1 month" : `${monthDiff} months`;
    }
    if (dayDiff > 0) {
      if (ageString !== "") {
        ageString += ", ";
      }
      ageString += dayDiff === 1 ? "1 day" : `${dayDiff} days`;
    }
    return {
      years: age,
      months: monthDiff,
      days: dayDiff,
      ageString: ageString,
    };
  }
  const savePersonalDetails = async (data) => {
    try {
      // let obj;
      // if(formik.values.physicallyHandicapped==="true"){
      //     obj={
      //         "disabilityType": formik.values.disabilityType,
      //         "disabilityPercent": formik.values.disabilityPercentage
      //     }
      // }
      let body = {
        taskTypeId: null,
        prefix: formik.values.prefix,
        firstName: formik.values.firstName,
        middleName: formik.values.middleName,
        lastName: formik.values.lastName,
        gender: formik.values.gender,
        dob: formik.values.dob,
        heightMeasure: formik.values.height,
        heightCmOrFeet:
          formik.values.height === 144
            ? formik.values.heightText
            : formik.values.heightInFeet,
        heightInch: formik.values.heightInInch,
        identifcnMark: formik.values.identificationMarks,
        fatherName: formik.values.fatherName,
        motherName: formik.values.motherName,
        maritalStatus: formik.values.maritalStatus,
        spouseName: formik.values.spouseName,
        isDisabled: formik.values.physicallyHandicapped,
        bloodGroup: formik.values.bloodGrp,
        personalEmail: formik.values.personalemail,
        personalMobileNo: formik.values.personalMobile,
        religion: formik.values.religion,
        nationality: formik.values.nationality,
        socialCategory: formik.values.socialCategory,
        gpfPranType: formik.values.gpfPranType,
        gpfPranNo: formik.values.gpfPranId,
        panNo: formik.values.pancard,
        aadhaarRefNo: formik.values.Aadhaar,
        employeeType: formik.values.employeeType,
        serviceType: formik.values.serviceType,
        cadreId: formik.values.cadre,
        isGovtQuarterOccupied: formik.values.govtOccupied,
        quarterType: formik.values.quarterType,
        parentDeptId: formik.values.parentDept,
        currentDeptId: formik.values.currentDept,
        currentDsgnId: formik.values.currentDesgn,
        currentOffice: currentOffice,
        ordIssuingOffice: orderIssuingOfficeId,
        appointOrdNo: formik.values.appointmentOrdNo,
        appointOrdDate: formik.values.appointmentOrdDate,
        srcRecruitment: formik.values.srcOfRecruit,
        joiningDate: formik.values.joiningDate,
        joiningTime: formik.values.joiningTime,
        superannuationDate: formik.values.superannuationDate,
        confirmationDate: formik.values.confirmationDate,
        isPayslip: formik.values.paySlip,
        payslipAuthority: formik.values.payslipAuthority,
        status: null,
        remarks: null,
        grpId: formik.values.group,
        addressLine1: formik.values.houseNumberComm,
        addressLine2: formik.values.streetcomm,
        stateId: formik.values.stateIdcommunication,
        distId: formik.values.distIdcommunication,
        pincode: formik.values.pincodecomm,
        disabilityDetails:
          formik.values.physicallyHandicapped === 'true' ?
            formik.values.disabilityType.map((type, index) => ({
              disabilityType: type.id,
              disabilityPercent: parseFloat(formik.values.disabilityPercentages[index]),
            })) : null,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_PAYROLL_API_URL}/employee/personal-details`,
        body,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("the saved details  areeeeee", res);
      if (res.data.statusCode === 200) {
        // callConfirmDialogMessage(res.data);
        showSnackbar(res.data.message, "success");
        localStorage.setItem("refNo", res.data.result)
        onButtonClick("pagetwo");
        setShowNext(true)
      }
    } catch (error) {
      alert("Data has not saved", error);
      console.log(error.message);
    }
  };
  const maxDate = dayjs().add(0, 'day');
  const handleRedirect = () => {
    callConfirmDialog();
  }
  const callConfirmDialogMessage = async (strMessage) => {
    AlertConfirm.config({
      okText: "Ok",
    });
    const [action] = await AlertConfirm.alert(<span>{strMessage.message}  Reference number: <b>{strMessage.result}</b></span>);
    action && onButtonClick("pagetwo");
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
      savePersonalDetails();
    }
  };

  return (
    <>

      <Card>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div>
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
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginBlock: 15,
                borderBottom: "0.5px solid #d1d1cf",
                marginBottom: "20px",
              }}
            >
              <BadgeIcon sx={{ fontSize: "25px", color: "#246cb5", mb:1 }} />
              <H3
                sx={{  fontSize: "15px", color: "#246cb5" }}
                marginLeft={0.5}
                my={0.5}
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
              >
                Employee Personal Details
              </H3>
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
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  size="small"
                  id="prefix"
                  name="prefix"
                  options={prefixList}
                  disabled={view}
                  value={
                    prefixList.find(
                      (option) => option.id === formik.values.prefix
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("prefix", null);
                    } else formik.setFieldValue("prefix", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Prefix"
                      required
                      //InputLabelProps={{ shrink: true }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.prefix &&
                        !!formik.errors.prefix
                      }
                      helperText={
                        formik.touched.prefix &&
                        formik.errors.prefix
                      }
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  size="small"
                  margin="normal"
                  required
                  disabled={view}
                  //InputLabelProps={{ shrink: true }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  InputProps={{ sx: textFieldStyles }}
                  error={
                    formik.touched.firstName &&
                    !!formik.errors.firstName
                  }
                  helperText={
                    formik.touched.firstName &&
                    formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  fullWidth
                  id="middleName"
                  name="middleName"
                  label="Middle Name"
                  size="small"
                  margin="normal"
                  disabled={view}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.middleName}
                  InputProps={{ sx: textFieldStyles }}
                  error={
                    formik.touched.middleName &&
                    !!formik.errors.middleName
                  }
                  helperText={
                    formik.touched.middleName &&
                    formik.errors.middleName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  size="small"
                  margin="normal"
                  disabled={view}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  InputProps={{ sx: textFieldStyles }}
                  error={
                    formik.touched.lastName && !!formik.errors.lastName
                  }
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  size="small"
                  id="gender"
                  name="gender"
                  disabled={view}
                  options={genderList}
                  value={
                    genderList.find(
                      (option) => option.id === formik.values.gender
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("gender", null);
                    } else formik.setFieldValue("gender", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Gender"
                      required
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.gender && formik.touched.gender
                          ? formik.errors.gender
                          : null
                      }
                      error={
                        formik.errors.gender && formik.touched.gender
                          ? true
                          : false
                      }
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                {/* <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale={"en-gb"}
                        >
                          <DatePicker
                            label="Date of Birth"
                            format="DD-MM-YYYY"
                            id="dob"
                            name="dob"
                            value={formik.values.dob}
                            //maxDate={maxDate}
                            disabled={view}
                            slotProps={{ textField: { size: "small" } }}
                            sx={{ width: "100%", mt: 2 }}
                            onChange={(value) => {
                              const age = differenceInYears(new Date(), value);
                              console.log(age)
                              if (value === null) {
                                formik.setFieldValue("dob", "");
                              } else {
                                const age = differenceInYears(new Date(), value);
                                console.log(age)
                                if (age < 18) {
                                  alert("Age cannot be less than 18")
                                }
                                else {
                                  formik.setFieldValue(
                                    "dob",
                                    dayjs(value, "DD-MM-YYYY")
                                  );
                                }
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                fullWidth
                               margin="normal"
                                name="dob"
                                //maxDate={maxDate}
                                required
                                {...params}
                                error={
                                  formik.touched.dob &&
                                  Boolean(formik.errors.dob)
                                }
                                helperText={
                                  formik.touched.dob && formik.errors.dob
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            )}
                          />
                        </LocalizationProvider> */}

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    label="Date of Birth"
                    format="DD-MM-YYYY"
                    id="dob"
                    name="dob"
                    value={formik.values.dob}
                    disabled={view}
                    slotProps={{ textField: { size: "small" } }}
                    sx={{ width: "100%", mt: 2 }}
                    onChange={(value) => {
                      if (value === null) {
                        formik.setFieldValue("dob", "");
                      } else {
                        const date = dayjs(value, "DD-MM-YYYY").toDate();
                        const age = differenceInYears(new Date(), date);
                        console.log(age);
                        if (age < 18) {
                          alert("Age cannot be less than 18");
                          formik.setFieldValue("dob", "");

                        } else {
                          formik.setFieldValue("dob", dayjs(value, "DD-MM-YYYY"));
                        }
                      }
                    }}
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
                        InputProps={{
                          ...params.InputProps,
                          style: textFieldStyles,
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
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
                <Autocomplete
                  disablePortal
                  margin="normal"
                  size="small"
                  id="height"
                  name="height"
                  options={heightList}
                  disabled={view}
                  value={
                    heightList.find(
                      (option) => option.id === formik.values.height
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("height", null);
                    } else formik.setFieldValue("height", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Height"
                      required
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.height && formik.touched.height
                          ? formik.errors.height
                          : null
                      }
                      error={
                        formik.errors.height && formik.touched.height
                          ? true
                          : false
                      }
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              {formik.values.height === 144 && (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    // required
                    fullWidth
                    type="text"
                    id="heightText"
                    name="heightText"
                    disabled={view}
                    label="Height (cm)"
                    //InputLabelProps={{ shrink: true }}
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.heightText}
                    InputProps={{ sx: textFieldStyles }}
                    error={
                      formik.touched.heightText &&
                      !!formik.errors.heightText
                    }
                    helperText={
                      formik.touched.heightText &&
                      formik.errors.heightText
                    }
                  />
                </Grid>
              )}
              {formik.values.height === 145 && (
                <>
                  <Grid item xs={12} sm={2} md={2} lg={2}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      disabled={view}
                      id="heightInFeet"
                      name="heightInFeet"
                      label="Height (Feet)"
                      //InputLabelProps={{ shrink: true }}
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.heightInFeet}
                      InputProps={{ sx: textFieldStyles }}
                      helperText={
                        formik.errors.heightInFeet &&
                          formik.touched.heightInFeet
                          ? formik.errors.heightInFeet
                          : null
                      }
                      error={
                        formik.errors.heightInFeet &&
                          formik.touched.heightInFeet
                          ? true
                          : false
                      }
                    // error={formik.touched.heightInFeet && !!formik.errors.heightInFeet}
                    // helperText={formik.touched.heightInFeet && formik.errors.heightInFeet}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2}>
                    <TextField
                      margin="normal"
                      fullWidth
                      type="text"
                      id="heightInInch"
                      name="heightInInch"
                      disabled={view}
                      label="Height (Inch)"
                      //InputLabelProps={{ shrink: true }}
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.heightInInch}
                      InputProps={{ sx: textFieldStyles }}
                      error={
                        formik.touched.heightInInch &&
                        Boolean(formik.errors.heightInInch)
                      }
                      helperText={
                        formik.touched.heightInInch &&
                        formik.errors.heightInInch
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="identificationMarks"
                  disabled={view}
                  name="identificationMarks"
                  label="Identification Mark 1(Acc to SSC)"
                  //InputLabelProps={{ shrink: true }}
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.identificationMarks}
                  InputProps={{ sx: textFieldStyles }}
                  error={
                    formik.touched.identificationMarks &&
                    !!formik.errors.identificationMarks
                  }
                  helperText={
                    formik.touched.identificationMarks &&
                    formik.errors.identificationMarks
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  label="Father's Name"
                  disabled={view}
                  //InputLabelProps={{ shrink: true }}
                  //   autoComplete="email"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fatherName}
                  InputProps={{ sx: textFieldStyles }}
                  error={
                    formik.touched.fatherName &&
                    !!formik.errors.fatherName
                  }
                  helperText={
                    formik.touched.fatherName &&
                    formik.errors.fatherName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  type="text"
                  id="motherName"
                  name="motherName"
                  label="Mother's Name"
                  disabled={view}
                  //InputLabelProps={{ shrink: true }}
                  //   autoComplete="email"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.motherName}
                  InputProps={{ sx: textFieldStyles }}
                  error={
                    formik.touched.motherName &&
                    !!formik.errors.motherName
                  }
                  helperText={
                    formik.touched.motherName &&
                    formik.errors.motherName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  size="small"
                  id="maritalStatus"
                  name="maritalStatus"
                  disabled={view}
                  options={maritalStatusList}
                  value={
                    maritalStatusList.find(
                      (option) =>
                        option.id === formik.values.maritalStatus
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("maritalStatus", null);
                    } else
                      formik.setFieldValue("maritalStatus", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Marital Status"
                      required
                      //InputLabelProps={{ shrink: true }}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.maritalStatus &&
                          formik.touched.maritalStatus
                          ? formik.errors.maritalStatus
                          : null
                      }
                      error={
                        formik.errors.maritalStatus &&
                          formik.touched.maritalStatus
                          ? true
                          : false
                      }
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              {(formik.values.maritalStatus === 150 || formik.values.maritalStatus === 148 || formik.values.maritalStatus === 149 || formik.values.maritalStatus === 151) && (
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="spouseName"
                    label="Spouse Name(Husband/Wife)"
                    disabled={view}
                    //InputLabelProps={{ shrink: true }}
                    name="spouseName"
                    size="small"
                    value={formik.values.spouseName || ""}
                    InputProps={{ sx: textFieldStyles }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.spouseName &&
                      Boolean(formik.errors.spouseName)
                    }
                    helperText={
                      formik.touched.spouseName &&
                      formik.errors.spouseName
                    }
                  // disabled={
                  //   formik.values.maritalStatus === 1 ||
                  //     formik.values.maritalStatus === 2
                  //     ? true
                  //     : false
                  // }
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label" helperText="Disability is required">
                    Disability (yes/no)
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="physicallyHandicapped"
                    disabled={view}
                    value={formik.values.physicallyHandicapped}
                    onChange={(e) => {
                      formik.setFieldValue('physicallyHandicapped', e.target.value === "true");
                      formik.setFieldValue('disabilityPercentages', []);
                      formik.setFieldValue('disabilityType', []);
                      formik.handleChange(e);
                    }}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" disabled={view} sx={{ mb: 0, padding: '0px 0', mt: 0 }} />
                    <FormControlLabel value="false" control={<Radio />} label="No" disabled={view} sx={{ mb: 0, padding: '0px 0', mt: 0 }} />
                  </RadioGroup>
                  {formik.errors.physicallyHandicapped && (
                    <FormHelperText sx={{ mt: 0 }} error>{formik.errors.physicallyHandicapped}</FormHelperText>
                    // <div>{formik.errors.physicallyHandicapped}</div>
                  )}
                </FormControl>
              </Grid>
              {formik.values.physicallyHandicapped === "true" && (
                <>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      multiple
                      margin="normal"
                      disableCloseOnSelect
                      limitTags={5}
                      fullWidth
                      size="small"
                      id="disabilityType"
                      name="disabilityType"
                      disabled={view}
                      options={disabilityList}
                      getOptionLabel={(option) => option.label}
                      value={Array.isArray(formik.values.disabilityType) ? formik.values.disabilityType : []}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                          />
                          {option.label}
                        </li>
                      )}
                      onChange={handleDisabilityTypeChange}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Type of Disability"
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.disabilityType && formik.touched.disabilityType
                              ? formik.errors.disabilityType
                              : null
                          }
                          error={
                            formik.errors.disabilityType && formik.touched.disabilityType
                              ? true
                              : false
                          }
                          InputProps={{
                            ...params.InputProps,
                            style: textFieldStyles,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>

                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      size="small"
                      type="text"
                      id="disabilityPercentages"
                      name="disabilityPercentages"
                      label="Percentage of Disability (seperated by comma)"
                      disabled={view}
                      //InputLabelProps={{ shrink: true }}
                      InputProps={{ sx: textFieldStyles }}
                      onChange={handlePercentageChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.disabilityPercentages.join(', ')} // Join array values with comma and space
                      error={
                        formik.touched.disabilityPercentages &&
                        !!formik.errors.disabilityPercentages
                      }
                      helperText={
                        formik.touched.disabilityPercentages &&
                        formik.errors.disabilityPercentages
                      }
                    />
                    {view !== true && (
                      <Typography sx={{ color: 'red', fontSize: "8px" }}>For Multiple Disabilities, Please add values seperated by comma(,)</Typography>
                    )}
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  size="small"
                  id="bloodGrp"
                  name="bloodGrp"
                  options={bloodList}
                  disabled={view}
                  value={
                    bloodList.find(
                      (option) => option.id === formik.values.bloodGrp
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("bloodGrp", null);
                    } else formik.setFieldValue("bloodGrp", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Blood Group"
                      required
                      onBlur={formik.handleBlur}
                      //InputLabelProps={{ shrink: true }}
                      helperText={
                        formik.errors.bloodGrp &&
                          formik.touched.bloodGrp
                          ? formik.errors.bloodGrp
                          : null
                      }
                      error={
                        formik.errors.bloodGrp &&
                          formik.touched.bloodGrp
                          ? true
                          : false
                      }
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="personalemail"
                  name="personalemail"
                  label="Personal Email ID"
                  size="small"
                  disabled={view}
                  InputProps={{ sx: textFieldStyles }}
                  //InputLabelProps={{ shrink: true }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.personalemail}
                  error={
                    formik.touched.personalemail &&
                    !!formik.errors.personalemail
                  }
                  helperText={
                    formik.touched.personalemail &&
                    formik.errors.personalemail
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="personalMobile"
                  name="personalMobile"
                  label="Personal Mobile Number"
                  size="small"
                  disabled={view}
                  InputProps={{ sx: textFieldStyles }}
                  //InputLabelProps={{ shrink: true }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.personalMobile}
                  error={
                    formik.touched.personalMobile &&
                    !!formik.errors.personalMobile
                  }
                  helperText={
                    formik.touched.personalMobile &&
                    formik.errors.personalMobile
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Autocomplete
                  disablePortal
                  margin="normal"
                  size="small"
                  id="nationality"
                  name="nationality"
                  disabled={view}
                  options={nationalityList}
                  value={
                    nationalityList.find(
                      (option) =>
                        option.id === formik.values.nationality
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("nationality", null);
                    } else
                      formik.setFieldValue("nationality", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nationality"
                      required
                      onBlur={formik.handleBlur}
                      //InputLabelProps={{ shrink: true }}
                      helperText={
                        formik.errors.nationality &&
                          formik.touched.nationality
                          ? formik.errors.nationality
                          : null
                      }
                      error={
                        formik.errors.nationality &&
                          formik.touched.nationality
                          ? true
                          : false
                      }
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
                  id="religion"
                  name="religion"
                  options={religionList}
                  disabled={view}
                  value={
                    religionList.find(
                      (option) => option.id === formik.values.religion
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("religion", null);
                    } else formik.setFieldValue("religion", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Religion"
                      required
                      onBlur={formik.handleBlur}
                      //InputLabelProps={{ shrink: true }}
                      helperText={
                        formik.errors.religion &&
                          formik.touched.religion
                          ? formik.errors.religion
                          : null
                      }
                      error={
                        formik.errors.religion &&
                          formik.touched.religion
                          ? true
                          : false
                      }
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
                  id="socialCategory"
                  name="socialCategory"
                  options={categoryList}
                  disabled={view}
                  value={
                    categoryList.find(
                      (option) =>
                        option.id === formik.values.socialCategory
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("socialCategory", null);
                    } else
                      formik.setFieldValue("socialCategory", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Social Category"
                      required
                      onBlur={formik.handleBlur}
                      //InputLabelProps={{ shrink: true }}
                      helperText={
                        formik.errors.socialCategory &&
                          formik.touched.socialCategory
                          ? formik.errors.socialCategory
                          : null
                      }
                      error={
                        formik.errors.socialCategory &&
                          formik.touched.socialCategory
                          ? true
                          : false
                      }
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
                  id="gpfPranType"
                  name="gpfPranType"
                  options={gpfPranList}
                  disabled={view}
                  value={
                    gpfPranList.find(
                      (option) =>
                        option.id === formik.values.gpfPranType
                    ) || null
                  }
                  onChange={(e, value) => {
                    if (value === null) {
                      formik.setFieldValue("gpfPranType", null);
                    } else
                      formik.setFieldValue("gpfPranType", value.id);
                  }}
                  getOptionLabel={(value) => value.label}
                  sx={{ width: "100%", mt: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="GPF/PRAN Type"
                      required
                      //InputLabelProps={{ shrink: true }}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.errors.gpfPranType &&
                          formik.touched.gpfPranType
                          ? formik.errors.gpfPranType
                          : null
                      }
                      error={
                        formik.errors.gpfPranType &&
                          formik.touched.gpfPranType
                          ? true
                          : false
                      }
                      InputProps={{
                        ...params.InputProps,
                        style: textFieldStyles,
                      }}
                    />
                  )}
                />
              </Grid>
              {(formik.values.gpfPranType === 205 ||
                formik.values.gpfPranType === 206) && (
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      id="gpfPranId"
                      name="gpfPranId"
                      label="GPF/PRAN ID"
                      size="small"
                      disabled={view}
                      InputProps={{ sx: textFieldStyles }}
                      //InputLabelProps={{ shrink: true }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gpfPranId}
                      helperText={
                        formik.errors.gpfPranId &&
                          formik.touched.gpfPranId
                          ? formik.errors.gpfPranId
                          : null
                      }
                      error={
                        formik.errors.gpfPranId &&
                          formik.touched.gpfPranId
                          ? true
                          : false
                      }
                    />
                  </Grid>
                )}
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="pancard"
                  name="pancard"
                  label="PAN Number"
                  size="small"
                  disabled={view}
                  InputProps={{ sx: textFieldStyles }}
                  //InputLabelProps={{ shrink: true }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pancard}
                  error={
                    formik.touched.pancard && !!formik.errors.pancard
                  }
                  helperText={
                    formik.touched.pancard && formik.errors.pancard
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="Aadhaar"
                  name="Aadhaar"
                  label="Aadhaar Number"
                  size="small"
                  disabled={view}
                  InputProps={{ sx: textFieldStyles }}
                  //InputLabelProps={{ shrink: true }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Aadhaar}
                  error={
                    formik.touched.Aadhaar && !!formik.errors.Aadhaar
                  }
                  helperText={
                    formik.touched.Aadhaar && formik.errors.Aadhaar
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              rowSpacing={0}
              columnSpacing={2}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    marginBlock: 15,
                    borderBottom: "0.5px solid #d1d1cf",
                    marginBottom: "20px",
                  }}
                >
                  <PinDropTwoToneIcon
                    sx={{ fontSize: "25px", color: "#246cb5" }}
                  />
                  <H3
                    sx={{ fontSize: "15px", color: "#246cb5" }}
                    marginLeft={0.5}
                    my={0.5}
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    Permanent Address
                  </H3>
                </div>
                <Divider />
                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={2}
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="houseNumberComm"
                      label="House No./Building Name"
                      name="houseNumberComm"
                      value={formik.values.houseNumberComm || ""}
                      size="small"
                      disabled={view}
                      //InputLabelProps={{ shrink: true }}
                      InputProps={{ sx: textFieldStyles }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.houseNumberComm &&
                        Boolean(formik.errors.houseNumberComm)
                      }
                      helperText={
                        formik.touched.houseNumberComm &&
                        formik.errors.houseNumberComm
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="streetcomm"
                      label="Street"
                      name="streetcomm"
                      value={formik.values.streetcomm || ""}
                      disabled={view}
                      //InputLabelProps={{ shrink: true }}
                      InputProps={{ sx: textFieldStyles }}
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.streetcomm &&
                        Boolean(formik.errors.streetcomm)
                      }
                      helperText={
                        formik.touched.streetcomm &&
                        formik.errors.streetcomm
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth>
                      <Autocomplete
                        disablePortal
                        margin="normal"
                        size="small"
                        id="stateIdcommunication"
                        name="stateIdcommunication"
                        options={statelist}
                        disabled={view}
                        value={
                          statelist.find(
                            (option) =>
                              option.id ===
                              formik.values.stateIdcommunication
                          ) || null
                        }
                        onChange={(e, value) => {
                          if (value === null) {
                            formik.setFieldValue(
                              "stateIdcommunication",
                              null
                            );
                          } else {
                            formik.setFieldValue(
                              "stateIdcommunication",
                              value.id
                            );
                            axios
                              .get(
                                `http://141.148.194.18:8052/payroll/employee/dropdown/district/${value.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${Cookies.get(
                                      "token"
                                    )}`,
                                  },
                                }
                              )
                              .then((response) => {
                                if (response.status === 200) {
                                  setDistrictoneList(response.data);
                                }
                                console.log(
                                  response.data[0].retirementAge
                                );
                              })
                              .catch((error) => {
                                setDistrictoneList([]);
                                console.log(error);
                              });
                          }
                        }}
                        getOptionLabel={(value) => value.label}
                        sx={{ width: "100%", mt: 2 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            required
                            //InputLabelProps={{ shrink: true }}
                            onBlur={formik.handleBlur}
                            helperText={
                              formik.errors.stateIdcommunication &&
                                formik.touched.stateIdcommunication
                                ? formik.errors.stateIdcommunication
                                : null
                            }
                            error={
                              formik.errors.stateIdcommunication &&
                                formik.touched.stateIdcommunication
                                ? true
                                : false
                            }
                            InputProps={{
                              ...params.InputProps,
                              style: textFieldStyles,
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth>
                      <Autocomplete
                        disablePortal
                        margin="normal"
                        size="small"
                        id="distIdcommunication"
                        name="distIdcommunication"
                        disabled={view}
                        //disabled={!formik.values.employeeType ?? true}
                        options={districtoneList}
                        value={
                          districtoneList.find(
                            (option) =>
                              option.id ===
                              formik.values.distIdcommunication
                          ) || null
                        }
                        onChange={(e, value) => {
                          if (value === null) {
                            formik.setFieldValue(
                              "distIdcommunication",
                              null
                            );
                          } else {
                            formik.setFieldValue(
                              "distIdcommunication",
                              value.id
                            );
                          }
                        }}
                        getOptionLabel={(value) => value.label}
                        sx={{ width: "100%", mt: 2 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="District"
                            required
                            //InputLabelProps={{ shrink: true }}
                            onBlur={formik.handleBlur}
                            //disabled={isserviceType}
                            helperText={
                              formik.errors.distIdcommunication &&
                                formik.touched.distIdcommunication
                                ? formik.errors.distIdcommunication
                                : null
                            }
                            error={
                              formik.errors.distIdcommunication &&
                                formik.touched.distIdcommunication
                                ? true
                                : false
                            }
                            InputProps={{
                              ...params.InputProps,
                              style: textFieldStyles,
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <TextField
                        label="Pincode"
                        size="small"
                        fullWidth
                        required
                        placeholder={"999999"}
                        mask={"######"}
                        value={formik.values.pincodecomm || ""}
                        id="pincodecomm"
                        name="pincodecomm"
                        disabled={view}
                        //InputLabelProps={{ shrink: true }}
                        InputProps={{ sx: textFieldStyles }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.pincodecomm &&
                          Boolean(formik.errors.pincodecomm)
                        }
                        helperText={
                          formik.touched.pincodecomm &&
                          formik.errors.pincodecomm
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              rowSpacing={0}
              columnSpacing={2}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    marginBlock: 15,
                    borderBottom: "0.5px solid #d1d1cf",
                    marginBottom: "20px",
                  }}
                >
                  <FeedIcon
                    sx={{ fontSize: "25px", color: "#246cb5" }}
                  />
                  <H3
                    sx={{ fontSize: "15px", color: "#246cb5" }}
                    marginLeft={0.5}
                    my={0.5}
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    Current Employee Official Details
                  </H3>
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
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      size="small"
                      id="employeeType"
                      name="employeeType"
                      options={employeeList}
                      disabled={view}
                      value={
                        employeeList.find(
                          (option) =>
                            option.id === formik.values.employeeType
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("employeeType", null);
                        } else {
                          formik.setFieldValue(
                            "employeeType",
                            value.id
                          );
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employee Type"
                          required
                          //InputLabelProps={{ shrink: true }}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.employeeType &&
                              formik.touched.employeeType
                              ? formik.errors.employeeType
                              : null
                          }
                          error={
                            formik.errors.employeeType &&
                              formik.touched.employeeType
                              ? true
                              : false
                          }
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
                      id="serviceType"
                      disabled={view}
                      name="serviceType"
                      options={serviceList}
                      value={
                        serviceList.find(
                          (option) =>
                            option.id === formik.values.serviceType
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("serviceType", null);
                        } else {
                          formik.setFieldValue(
                            "serviceType",
                            value.id
                          );
                          axios
                            .get(
                              `
                                           http://141.148.194.18:8052/payroll/employee/dropdown/cadre/${value.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${Cookies.get(
                                    "token"
                                  )}`,
                                },
                              }
                            )
                            .then((response) => {
                              if (response.status === 200) {
                                setCradeList(response.data);
                                setRetirementAgeList(
                                  response.data[0].retirementAge
                                );
                                setIsCradeType(false);
                              }
                              console.log(
                                response.data[0].retirementAge
                              );
                            })
                            .catch((error) => {
                              setCradeList([]);
                              console.log(error);
                            });
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Service Type"
                          // required
                          //InputLabelProps={{ shrink: true }}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.serviceType &&
                              formik.touched.serviceType
                              ? formik.errors.serviceType
                              : null
                          }
                          error={
                            formik.errors.serviceType &&
                              formik.touched.serviceType
                              ? true
                              : false
                          }
                          InputProps={{
                            ...params.InputProps,
                            style: textFieldStyles,
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label" >
                        Govt. Quarter Occupied (yes/no)
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="govtOccupied"
                        disabled={view}
                        value={formik.values.govtOccupied}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                          disabled={view}
                          sx={{ mb: 0, padding: '0px 0', mt: 0 }}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                          disabled={view}
                          sx={{ mb: 0, padding: '0px 0', mt: 0 }}
                        />
                      </RadioGroup>
                      {
                        formik.errors.govtOccupied && (
                          <FormHelperText error sx={{ mt: 0 }}>
                            {formik.errors.govtOccupied}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  {formik.values.govtOccupied === "true" && (
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Autocomplete
                        disablePortal
                        margin="normal"
                        size="small"
                        id="quarterType"
                        name="quarterType"
                        disabled={view}
                        options={quarterTypeList}
                        value={
                          quarterTypeList.find(
                            (option) =>
                              option.id === formik.values.quarterType
                          ) || null
                        }
                        onChange={(e, value) => {
                          if (value === null) {
                            formik.setFieldValue("quarterType", null);
                          } else
                            formik.setFieldValue(
                              "quarterType",
                              value.id
                            );
                        }}
                        getOptionLabel={(value) => value.label}
                        sx={{ width: "100%", mt: 2, mb: 1 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Quarter Type"
                            //required
                            onBlur={formik.handleBlur}
                            //InputLabelProps={{ shrink: true }}
                            helperText={
                              formik.errors.quarterType &&
                                formik.touched.quarterType
                                ? formik.errors.quarterType
                                : null
                            }
                            error={
                              formik.errors.quarterType &&
                                formik.touched.quarterType
                                ? true
                                : false
                            }
                            InputProps={{
                              ...params.InputProps,
                              style: textFieldStyles,
                            }}
                          />
                        )}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      size="small"
                      id="parentDept"
                      name="parentDept"
                      disabled={view}
                      options={departmentList}
                      value={
                        departmentList.find(
                          (option) =>
                            option.id === formik.values.parentDept
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("parentDept", null);
                        } else
                          formik.setFieldValue("parentDept", value.id);
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Parent Department"
                          required
                          //InputLabelProps={{ shrink: true }}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.parentDept &&
                              formik.touched.parentDept
                              ? formik.errors.parentDept
                              : null
                          }
                          error={
                            formik.errors.parentDept &&
                              formik.touched.parentDept
                              ? true
                              : false
                          }
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
                      id="currentDept"
                      name="currentDept"
                      disabled={view}
                      options={departmentList}
                      value={
                        departmentList.find(
                          (option) =>
                            option.id === formik.values.currentDept
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("currentDept", null);
                        } else {
                          formik.setFieldValue("currentDept", value.id);
                          axios
                            .get(
                              `http://141.148.194.18:8052/payroll/employee/dropdown/designation/${value.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${Cookies.get(
                                    "token"
                                  )}`,
                                },
                              }
                            )
                            .then((response) => {
                              if (response.status === 200) {
                                setDesignation(response.data);
                                setIsDesignation(false);
                              }
                              console.log(response);
                            })
                            .catch((error) => {
                              setDesignation([]);
                              console.log(error);
                            });
                        }
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Current Department"
                          required
                          //InputLabelProps={{ shrink: true }}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.currentDept &&
                              formik.touched.currentDept
                              ? formik.errors.currentDept
                              : null
                          }
                          error={
                            formik.errors.currentDept &&
                              formik.touched.currentDept
                              ? true
                              : false
                          }
                          InputProps={{
                            ...params.InputProps,
                            style: textFieldStyles,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth>
                      <Tooltip
                        title={
                          isdesignation
                            ? "Please select Department"
                            : ""
                        }
                        arrow
                      >
                        <Autocomplete
                          disablePortal
                          margin="normal"
                          size="small"
                          id="currentDesgn"
                          name="currentDesgn"
                          disabled={view}
                          options={designation}
                          value={
                            designation.find(
                              (option) =>
                                option.id === formik.values.currentDesgn
                            ) || null
                          }
                          onChange={(e, value) => {
                            if (value === null) {
                              formik.setFieldValue(
                                "currentDesgn",
                                null
                              );
                            } else {
                              formik.setFieldValue(
                                "currentDesgn",
                                value.id
                              );
                            }
                          }}
                          getOptionLabel={(value) => value.label}
                          sx={{ width: "100%", mt: 2 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Rank"
                              required
                              //InputLabelProps={{ shrink: true }}
                              onBlur={formik.handleBlur}
                              helperText={
                                formik.errors.currentDesgn &&
                                  formik.touched.currentDesgn
                                  ? formik.errors.currentDesgn
                                  : null
                              }
                              error={
                                formik.errors.currentDesgn &&
                                  formik.touched.currentDesgn
                                  ? true
                                  : false
                              }
                              InputProps={{
                                ...params.InputProps,
                                style: textFieldStyles,
                              }}
                            />
                          )}
                        />
                      </Tooltip>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl fullWidth>
                      <Tooltip
                        title={
                          iscradeType
                            ? "Please select service Type"
                            : ""
                        }
                        arrow
                      >
                        <Autocomplete
                          disablePortal
                          margin="normal"
                          size="small"
                          id="cadre"
                          name="cadre"
                          disabled={view || !formik.values.serviceType}
                          options={cradeList}
                          value={
                            cradeList.find(
                              (option) =>
                                option.id === formik.values.cadre
                            ) || null
                          }
                          onChange={(e, value) => {
                            if (value === null) {
                              formik.setFieldValue("cadre", null);
                            } else
                              formik.setFieldValue("cadre", value.id);
                          }}
                          getOptionLabel={(value) => value.label}
                          sx={{ width: "100%", mt: 2 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Cadre"
                              // required
                              //InputLabelProps={{ shrink: true }}
                              onBlur={formik.handleBlur}
                              helperText={
                                formik.errors.cadre &&
                                  formik.touched.cadre
                                  ? formik.errors.cadre
                                  : null
                              }
                              error={
                                formik.errors.cadre &&
                                  formik.touched.cadre
                                  ? true
                                  : false
                              }
                              InputProps={{
                                ...params.InputProps,
                                style: textFieldStyles,
                              }}
                            />
                          )}
                        />
                      </Tooltip>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3.5} md={3.5} lg={3.5}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="currentOffice"
                      disabled
                      label="Current Office"
                      name="currentOffice"
                      value={formik.values.currentOffice || ""}
                      InputProps={{ sx: textFieldStyles }}
                      //InputLabelProps={{ shrink: true }}
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.currentOffice &&
                        Boolean(formik.errors.currentOffice)
                      }
                      helperText={
                        formik.touched.currentOffice &&
                        formik.errors.currentOffice
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={0.5} md={0.5} lg={0.5}>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleOpenModal}
                      aria-label="search"
                      disabled={view}
                      sx={{ alignItems: "right", display: "flex", mb: 1 }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      size="small"
                      id="group"
                      name="group"
                      options={groupList}
                      disabled={view}
                      value={
                        groupList.find(
                          (option) => option.id === formik.values.group
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("group", null);
                        } else formik.setFieldValue("group", value.id);
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Group"
                          required
                          //InputLabelProps={{ shrink: true }}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.group &&
                              formik.touched.group
                              ? formik.errors.group
                              : null
                          }
                          error={
                            formik.errors.group && formik.touched.group
                              ? true
                              : false
                          }
                          InputProps={{
                            ...params.InputProps,
                            style: textFieldStyles,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      fullWidth
                      id="appointmentOrdNo"
                      name="appointmentOrdNo"
                      label="Appointment Order Number"
                      size="small"
                      margin="normal"
                      required
                      disabled={view}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.appointmentOrdNo}
                      InputProps={{ sx: textFieldStyles }}
                      error={
                        formik.touched.appointmentOrdNo &&
                        !!formik.errors.appointmentOrdNo
                      }
                      helperText={
                        formik.touched.appointmentOrdNo &&
                        formik.errors.appointmentOrdNo
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={"en-gb"}
                    >
                      <DatePicker
                        label="Appointment Order Date"
                        format="DD-MM-YYYY"
                        required
                        //axDate={new Date()}
                        id="appointmentOrdDate"
                        name="appointmentOrdDate"
                        disabled={view}
                        slotProps={{ textField: { size: "small" } }}
                        sx={{ width: "100%", mt: 2 }}
                        value={formik.values.appointmentOrdDate}
                        //InputLabelProps={{ shrink: true }}
                        onChange={(value) => {
                          if (value === null) {
                            formik.setFieldValue(
                              "appointmentOrdDate",
                              ""
                            );
                          } else {
                            formik.setFieldValue(
                              "appointmentOrdDate",
                              dayjs(value, "DD-MM-YYYY")
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            required
                            margin="normal"
                            name="appointmentOrdDate"
                            {...params}
                            error={
                              formik.touched.appointmentOrdDate &&
                              Boolean(formik.errors.appointmentOrdDate)
                            }
                            helperText={
                              formik.touched.appointmentOrdDate &&
                              formik.errors.appointmentOrdDate
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {/* <Grid item xs={12} sm={3.5} md={3.5} lg={3.5}> */}
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="orderIssuingOffice"
                      disabled
                      label="Order Issuing Office/Authority"
                      name="orderIssuingOffice"
                      value={formik.values.orderIssuingOffice || ""}
                      //InputLabelProps={{ shrink: true }}
                      InputProps={{ sx: textFieldStyles }}
                      size="small"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.orderIssuingOffice &&
                        Boolean(formik.errors.orderIssuingOffice)
                      }
                      helperText={
                        formik.touched.orderIssuingOffice &&
                        formik.errors.orderIssuingOffice
                      }
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={0.5} md={0.5} lg={0.5}>
                            <IconButton
                              edge="start"
                              color="inherit"
                              disabled={true}
                              onClick={() => {
                                setOpenModal(true);
                              }}
                              aria-label="search"
                              sx={{ alignItems: "right", display: "flex" }}
                            >
                              <SearchIcon />
                            </IconButton>
                          </Grid> */}
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      size="small"
                      id="srcOfRecruit"
                      name="srcOfRecruit"
                      options={srcOfRecruitList}
                      disabled={view}
                      value={
                        srcOfRecruitList.find(
                          (option) =>
                            option.id === formik.values.srcOfRecruit
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("srcOfRecruit", null);
                        } else
                          formik.setFieldValue(
                            "srcOfRecruit",
                            value.id
                          );
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Source of Recruitment"
                          required
                          //InputLabelProps={{ shrink: true }}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.srcOfRecruit &&
                              formik.touched.srcOfRecruit
                              ? formik.errors.srcOfRecruit
                              : null
                          }
                          error={
                            formik.errors.srcOfRecruit &&
                              formik.touched.srcOfRecruit
                              ? true
                              : false
                          }
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
                        label="Joining/Charge Taken Date"
                        format="DD-MM-YYYY"
                        //maxDate={new Date()}
                        id="joiningDate"
                        name="joiningDate"
                        disabled={view}
                        slotProps={{ textField: { size: "small" } }}
                        sx={{ width: "100%", mt: 2 }}
                        value={formik.values.joiningDate}
                        //InputLabelProps={{ shrink: true }}
                        onChange={(value) => {
                          if (value === null) {
                            formik.setFieldValue("joiningDate", "");
                          } else {
                            formik.setFieldValue(
                              "joiningDate",
                              dayjs(value, "DD-MM-YYYY")
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            name="joiningDate"
                            required
                            {...params}
                            error={
                              formik.touched.joiningDate &&
                              Boolean(formik.errors.joiningDate)
                            }
                            helperText={
                              formik.touched.joiningDate &&
                              formik.errors.joiningDate
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Autocomplete
                      disablePortal
                      margin="normal"
                      size="small"
                      id="joiningTime"
                      name="joiningTime"
                      disabled={view}
                      options={joiningTimeList}
                      value={
                        joiningTimeList.find(
                          (option) =>
                            option.id === formik.values.joiningTime
                        ) || null
                      }
                      onChange={(e, value) => {
                        if (value === null) {
                          formik.setFieldValue("joiningTime", null);
                        } else
                          formik.setFieldValue("joiningTime", value.id);
                      }}
                      getOptionLabel={(value) => value.label}
                      sx={{ width: "100%", mt: 2 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Joining Time"
                          required
                          //InputLabelProps={{ shrink: true }}
                          onBlur={formik.handleBlur}
                          helperText={
                            formik.errors.joiningTime &&
                              formik.touched.joiningTime
                              ? formik.errors.joiningTime
                              : null
                          }
                          error={
                            formik.errors.joiningTime &&
                              formik.touched.joiningTime
                              ? true
                              : false
                          }
                          InputProps={{
                            ...params.InputProps,
                            style: textFieldStyles,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      
                      fullWidth
                      disabled
                      type="text"
                      id="superannuationDate"
                      name="superannuationDate"
                      label="Superannuation Date"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ sx: textFieldStyles }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.superannuationDate}
                      error={
                        formik.touched.superannuationDate &&
                        !!formik.errors.superannuationDate
                      }
                      helperText={
                        formik.touched.superannuationDate &&
                        formik.errors.superannuationDate
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={"en-gb"}
                    >
                      <DatePicker
                        label="Confirmation Date"
                        format="DD-MM-YYYY"
                        //maxDate={new Date()}
                        id="confirmationDate"
                        name="confirmationDate"
                        disabled={view}
                        slotProps={{ textField: { size: "small" } }}
                        sx={{ width: "100%", mt: 2 }}
                        value={formik.values.confirmationDate}
                        //InputLabelProps={{ shrink: true }}
                        onChange={(value) => {
                          if (value === null) {
                            formik.setFieldValue(
                              "confirmationDate",
                              ""
                            );
                          }
                          else {
                            const confirmationDate = dayjs(
                              value,
                              "DD-MM-YYYY"
                            );
                            const joiningDate = dayjs(
                              formik.values.joiningDate,
                              "DD-MM-YYYY"
                            );
                            if (confirmationDate.isAfter(joiningDate)) {
                              formik.setFieldValue(
                                "confirmationDate",
                                confirmationDate
                              );
                            } else {
                              alert(
                                "Selected Confirmation Date should be more than the Joining Date"
                              );
                              formik.setFieldValue("confirmationDate", "");
                            }
                          }
                        }}
                        // onChange={(value) => { if (value === null) { formik.setFieldValue("confirmationDate", "") } else { formik.setFieldValue("confirmationDate", dayjs(value).format('YYYY-MM-DD')) } }}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            name="confirmationDate"
                            required
                            {...params}
                            error={
                              formik.touched.confirmationDate &&
                              Boolean(formik.errors.confirmationDate)
                            }
                            helperText={
                              formik.touched.confirmationDate &&
                              formik.errors.confirmationDate
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {/* <Grid item xs={12} sm={4} md={4} lg={4}>
                            <Autocomplete
                              disablePortal
                             margin="normal"
                              size="small"
                              id="paySlip"
                              name="paySlip"
                              options={paySlipList}
                              disabled={view}
                              value={
                                paySlipList.find(
                                  (option) =>
                                    option.id === formik.values.paySlip
                                ) || null
                              }
                              onChange={(e, value) => {
                                if (value === null) {
                                  formik.setFieldValue("paySlip", null);
                                } else
                                  formik.setFieldValue("paySlip", value.id);
                              }}
                              getOptionLabel={(value) => value.label}
                              sx={{ width: "100%", mt: 2 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Pay Slip"
                                  name="paySlip"
                                     required
                                  //InputLabelProps={{ shrink: true }}
                                  onBlur={formik.handleBlur}
                                  helperText={
                                    formik.errors.paySlip &&
                                      formik.touched.paySlip
                                      ? formik.errors.paySlip
                                      : null
                                  }
                                  error={
                                    formik.errors.paySlip &&
                                      formik.touched.paySlip
                                      ? true
                                      : false
                                  }
                                />
                              )}
                            />
                          </Grid> */}
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label" >
                        Pay Slip (yes/no)
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="paySlip"
                        disabled={view}
                        value={formik.values.paySlip}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                          disabled={view}
                          sx={{ mb: 0, padding: '0px 0', mt: 0 }}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                          disabled={view}
                          sx={{ mb: 0, padding: '0px 0', mt: 0 }}
                        />
                      </RadioGroup>
                      {
                        formik.errors.paySlip && (
                          <FormHelperText error sx={{ mt: 0 }}>
                            {formik.errors.paySlip}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  {formik.values.paySlip === "true" && (
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Autocomplete
                        disablePortal
                        margin="normal"
                        size="small"
                        id="payslipAuthority"
                        name="payslipAuthority"
                        options={payslipAuthorityList}
                        disabled={view}
                        value={
                          payslipAuthorityList.find(
                            (option) =>
                              option.id === formik.values.payslipAuthority
                          ) || null
                        }
                        onChange={(e, value) => {
                          if (value === null) {
                            formik.setFieldValue(
                              "payslipAuthority",
                              null
                            );
                          } else
                            formik.setFieldValue(
                              "payslipAuthority",
                              value.id
                            );
                        }}
                        getOptionLabel={(value) => value.label}
                        sx={{ width: "100%", mt: 2 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Pay Slip Authority"
                            required
                            //InputLabelProps={{ shrink: true }}
                            onBlur={formik.handleBlur}
                            helperText={
                              formik.errors.payslipAuthority &&
                                formik.touched.payslipAuthority
                                ? formik.errors.payslipAuthority
                                : null
                            }
                            error={
                              formik.errors.payslipAuthority &&
                                formik.touched.payslipAuthority
                                ? true
                                : false
                            }
                            InputProps={{
                              ...params.InputProps,
                              style: textFieldStyles,
                            }}
                          />
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center">
              {view !== true && (
                <Button
                  sx={{
                    minWidth: 100,
                    ml: 1,
                    mt: 2,
                  }}
                  variant="contained"
                  type="submit"
                  disabled={view}
                  onClick={() => {
                    checkValid();

                  }}
                >
                  SUBMIT&nbsp;
                  <SaveIcon></SaveIcon>
                </Button>
              )}
              <Button
                sx={{
                  minWidth: 100,
                  ml: 1,
                  mt: 2,
                }}
                variant="outlined"
                //type="submit"
                disabled={!showNext}
                onClick={() => {
                  onButtonClick("pagetwo");
                }}
              >
                NEXT &nbsp;
                <NavigateNextIcon />
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {openModal && (
        <SearchModal
          closeModal={handleCloseModal}
          onOfficeSelect={handleOfficeSelect}
        />
      )}
    </>
  );
};
export default SavePersonalDetails;
