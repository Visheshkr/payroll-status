import ContactsIcon from '@mui/icons-material/Contacts';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Link
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useFormik } from 'formik';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSnackbar } from "../../components/Snackbar";
import { H3 } from "../../components/Typography";
import UploadAttachments from './UploadAttachments';
const SaveDocuments = ({ formData, setFormData, prevData, onButtonClick,view }) => {
    const { showSnackbar } = useSnackbar();
    const validationSchema = Yup.object().shape({
        // Name: Yup
        // .string("Enter a valid Name")
        // .required("Name is required")
        // .nullable(),
        // Name: Yup
        // .string().matches(/^[A-Za-z]+$/, "Only Alphabetical characters are allowed in the Name")
        // .required("Name is required")
        // .nullable(),
        employeeType: Yup.string().required("Employee Type is required"),
        employeeid: Yup.string().required('Employee ID is required'),
        // apcosId: Yup.string().required('Apcos Id is required'),
        dob: Yup.string()
            .required("Date of Birth is required")
            .nullable(),
        // id: Yup.string().required('id is required'),
        Gender: Yup.string().required("Gender is required").nullable(),
        identificationMarks: Yup.string()
            .matches(
                /^[a-zA-Z\s]+$/,
                "Only Alphabetical characters are allowed in the Name"
            )
            .required("Identification Marks is required")
            .min(5, "Identification Mark must contain at least 5 characters"),
        identificationMarks2: Yup.string()
            .matches(
                /^[a-zA-Z\s]+$/,
                "Only Alphabetical characters are allowed in the Name"
            )
            .required("Identification Marks is required")
            .min(5, "Identification Mark must contain at least 5 characters"),
        // subCaste: Yup.string().required('Sub Caste is required'),
        houseNumberCard: Yup.string().required('House Number is required'),
        streetCard: Yup.string().required('Street is required'),
        pincodeCard: Yup.string("Enter a valid Pincode").required("Pincode is required").matches(/^[0-9]+$/, "Invalid Pincode").min(6, "Pincode must have 6 digits").max(6, "Pincode must not exceed 6 digits").nullable(),
        houseNumberComm: Yup.string().required('House Number is required'),
        streetcomm: Yup.string().required('Street is required'),
        pincodecomm: Yup.string("Enter a valid Pincode").required("Pincode is required").matches(/^[0-9]+$/, "Invalid Pincode").min(6, "Pincode must have 6 digits").max(6, "Pincode must not exceed 6 digits").nullable(),
        contactNumber: Yup.string("Enter a valid Contact Number")
            .matches(/^[0-9]+$/, "Invalid Contact number")
            .required("Mobile Number is required")
            .min(10, "Mobile Number Must be 10 digits")
            .max(10, "Mobile Number must not exceed 10 digits")
            .nullable(),
        emergencyContact: Yup.string("Enter a valid Contact Number")
            .matches(/^[0-9]+$/, "Invalid Emergency Mobile number")
            .required("Mobile Number is required")
            .min(10, "Mobile Number Must be 10 digits")
            .max(10, "Mobile Number must not exceed 10 digits")
            .nullable(),
        emailid: Yup.string()
            .email("Enter a valid email address")
            .required("Email ID is required"),
        personalemail: Yup.string()
            .email("Enter a valid email address")
            .required("Personal Email ID is required"),
        Aadhaar: Yup.string()
            .matches(/^\d{12}$/, "Enter a valid Aadhaar number")
            .required('Aadhaar Card is required'),
        pancard: Yup.string()
            .matches(/^[A-Z]{5}\d{4}[A-Z]$/, 'Enter a valid PAN number')
            .required('PAN number is required'),
        physicallyHandicapped: Yup.string().required("Physically Handicapped is required").nullable(),
        disabilityPercentage: Yup.string().when("physicallyHandicapped", {
            is: (value) => value === "true",
            then: Yup.string()
                .matches(/^[0-9]+$/, "Invalid Percentage")
                .required("Disability Percentage is required")
                .nullable(),
        }),
        disabilitype: Yup.string()
            .when("physicallyHandicapped", {
                is: (value) => value === "true",
                then: Yup.string().required("Disability Type is required").nullable(),
            })
            .nullable(),
        caste: Yup.string().required('Caste is required').nullable(),
        subcaste: Yup.string()
            .when("caste", {
                is: (value) => value === 67,
                then: Yup.object().required("SubCaste is required").nullable()
            }).nullable(),
        nationality: Yup.string().required('Nationality is required').nullable(),
        religion: Yup.string().required('Religion is required').nullable(),
        maritalStatus: Yup.string().required('Marital Status is required').nullable(),
        stateId: Yup.object().required('State is required').nullable(),
        distId: Yup.object().required('District is required').nullable(),
        // mandalId: Yup.object().required('Mandal is required').nullable(),
        // villageId: Yup.object().required('Village is required').nullable(),
        stateIdcommunication: Yup.object().required('State is required').nullable(),
        distIdcommunication: Yup.object().required('District is required').nullable(),
        // mandalIdcommunication: Yup.object().required('Mandal is required').nullable(),
        // villageIdcommunication: Yup.object().required('Village is required').nullable(),
        // Add validation for other fields
    });
    const formik = useFormik({
        initialValues: {
          filePath:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission or API integration here
            setFormData((prevFormData) => ({
                ...prevFormData,
                pageone: { formik: formik.values }
            }));
        },
    });
    useEffect(() => {
      if (view) {
        fetchData();
      }
    }, [view]);
    const navigate = useNavigate();
    const [rows, setRows] = useState([])
    const [docList,setDocList]=useState([])
    const [uploadedAadharFiles, setUploadedaadhaarFiles] = useState([]);
    const [uploadedBankAccFiles, setUploadedBankAccFiles] = useState([]);
    const [uploadedBankPassFiles, setUploadedBankPassFiles] = useState([]);
    const [uploadedBirthCertFiles, setUploadedBirthCertFiles] = useState([]);
    const [uploadedBankCertFiles, setUploadedBankCertFiles] = useState([]);
    const [uploadedInvoiceFiles, setUploadedInvoiceFiles] = useState([]);
    const [uploadedDriveLicenseFiles, setUploadedDriveLicenseFiles] = useState([]);
    const [uploadedPhotoFiles, setUploadedPhotoFiles] = useState([]);
    const [uploadedPortalFiles, setUploadedPortalFiles] = useState([]);
    const [uploadedPanFiles, setUploadedPanFiles] = useState([]);
    const [uploadedPanchayatFiles, setUploadedPanchayatFiles] = useState([]);
    const [uploadedTanFiles, setUploadedTanFiles] = useState([]);
    const allowedFile='application/pdf'
    const fetchData = () => {
      try{
      axios.get(`http://141.148.194.18:8052/payroll/employee/documents/${formData.refNo}`, {
          headers: {
              Authorization: `Bearer ${Cookies.get("token")}`
          }
      }).then(response => {
        const result = response.data.result;
        console.log(result);
        result.map((item)=>{
          if(item.documentId.id===217){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedaadhaarFiles(temp)
          }
          if(item.documentId.id===212){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedBankPassFiles(temp)
          }
          if(item.documentId.id===219){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedBirthCertFiles(temp)
          }
          if(item.documentId.id===216){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedPanFiles(temp)
          }
          if(item.documentId.id===213){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedBankAccFiles(temp)
          }
          if(item.documentId.id===214){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedBankCertFiles(temp)
          }
          if(item.documentId.id===215){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedInvoiceFiles(temp)
          }
          if(item.documentId.id===220){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedDriveLicenseFiles(temp)
          }
          if(item.documentId.id===218){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedPortalFiles(temp)
          }
          if(item.documentId.id===223){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedPanchayatFiles(temp)
          }
          if(item.documentId.id===221){
            let temp=[]
            temp.push({fileName:item.fileName,filePath:item.filePath})
            setUploadedTanFiles(temp)
          }
        })
      })
    }
    catch(error){
  console.log(error)
    }
  }
  console.log(uploadedAadharFiles)
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
    const handleFileUpload = (response, type,docId,index) => {
        if (type === "upload") {
            console.log(docId)
           if(docId===217){
            console.log(uploadedAadharFiles)
           }
            // formik.setFieldValue("filePath", { ...formik.values.docs, ...response });
        } else if (type === "delete") {
            formik.setFieldValue("filePath", response);
            const updatedRowsWithFilePath = rows.map((row, index) => ({
                ...row,
                filePath: response
              }));
              setRows(updatedRowsWithFilePath)
        }
    };
   // console.log(uploadedAadharFiles[0]?.file.virtualPath)
    useEffect(()=>{
        axios.get(`http://141.148.194.18:8052/payroll/employee/dropdown/document-types`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`
            }
          }).then(response => {
            //  console.log(sortedData);
            if (response.status === 200) {
            //     let obj={}
            //     let temp=[]
            //     response.data.map((value,index) => {
            //         obj={id:index+1,docName:value.label,docId:value.id,filePath:'',file:[]}
            //         temp.push(obj)
            //      })
            //      setRows(temp)
            // }
            // console.log(response);
            setDocList(response.data)
}
          })
            .catch(error => {
              console.log(error);
            });
        // setRows([
        //     {id:1,docName:'SSC/X',filePath:''},
        //     {id:2,docName:'XII/Intermediate',filePath:''},
        //     {id:3,docName:'Photo',filePath:''},
        //     {id:4,docName:'Pan Card',filePath:''},
        //     {id:5,docName:'Aadhaar',filePath:''}
        // ])
    },[])
    console.log(rows)
    console.log(docList)
    const handleSaveUpload=(uploadedFile,index)=>{
        // const updatedRowsWithFile = rows.map((row, index) => ({
        //     ...row,
        //     file:uploadedFile
        //   }));
          rows[index].file=uploadedFile
          setRows(rows)
    }
    const checkValid = async()=>{
      if(uploadedAadharFiles.length===0 ||  uploadedBankPassFiles.length===0 ||  uploadedBirthCertFiles.length===0   || 
      uploadedPanFiles.length===0 
    ){
        showSnackbar("Please upload required documents","error")
        return;
    }
    else{
      callConfirmDialog();
    }
  }
    const saveDocs= async()=>{
        // if(uploadedAadharFiles.length===0 || uploadedBankAccFiles.length===0 ||  uploadedBankPassFiles.length===0 ||  uploadedBirthCertFiles.length===0  ||  uploadedBankCertFiles.length===0 ||  uploadedInvoiceFiles.length===0 ||
        //     uploadedDriveLicenseFiles.length===0 || uploadedPhotoFiles.length===0 || uploadedPortalFiles.length===0 || uploadedPanFiles.length===0 || uploadedTanFiles.length===0 || uploadedAadharFiles.length===0  
        // ){
        //     showSnackbar("Please upload all documents","error")
        //     return;
        // }
        // else{
        try{
          let temp= [
            {
              "documentId": 217,
              "filePath": uploadedAadharFiles[0].file.virtualPath
            },
            {
              "documentId": 212,
              "filePath": uploadedBankPassFiles[0].file.virtualPath
            },
            {
              "documentId": 219,
              "filePath": uploadedBirthCertFiles[0].file.virtualPath
            },
            {
              "documentId": 216,
              "filePath": uploadedPanFiles[0].file.virtualPath
            },
          ];
          if( uploadedBankAccFiles.length>0){
            temp.push(    {
              "documentId": 213,
              "filePath": uploadedBankAccFiles[0]?.file.virtualPath || null
            })
          }
          if( uploadedBankCertFiles.length>0){
             temp.push({
              "documentId": 214,
              "filePath":uploadedBankCertFiles[0]?.file.virtualPath || null
            })
          }
          if( uploadedInvoiceFiles.length>0){
            temp.push(    {
              "documentId": 215,
              "filePath": uploadedInvoiceFiles[0]?.file.virtualPath || null
            })
         }
         if( uploadedDriveLicenseFiles.length>0){
          temp.push(       {
            "documentId": 220, 
            "filePath": uploadedDriveLicenseFiles[0]?.file.virtualPath || null
          })
       }
       if( uploadedPhotoFiles.length>0){ 
        temp.push(          {
          "documentId": 218,
          "filePath": uploadedPhotoFiles[0]?.file.virtualPath || null
        })
     }
     if( uploadedPortalFiles.length>0){
      temp.push(            {
        "documentId": 222,
        "filePath": uploadedPortalFiles[0]?.file.virtualPath || null
      })
   }
   if( uploadedPanchayatFiles.length>0){
    temp.push(    {
      "documentId": 223,
      "filePath": uploadedPanchayatFiles[0]?.file.virtualPath || null
    })
 }
 if( uploadedTanFiles.length>0){
  temp.push(      {
    "documentId": 221,
    "filePath": uploadedTanFiles[0]?.file.virtualPath || null
  })
}
            let body={
                //localStorage.getItem('refNo')
                // refNo: "BRD0000000000038",
                "refNo": localStorage.getItem("refNo"),
 employeeDocumentsList: temp
            }
        const res = await axios.post(
            `${process.env.REACT_APP_PAYROLL_API_URL}/employee/documents`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            }
        );
        console.log("the saved details  areeeeee", res);
        if (res.data.statusCode === 200) {
          callConfirmDialogMessage("Your form is submitted successfully with reference no. ",res.data.result);
           // showSnackbar("Your Form is Submitted Successfully", "success");
        }
        }
        catch (error) {
            console.log(error.message);
        }   
    // }
    }
    const callConfirmDialogMessage = async (strMessage,referenceNo) => {
      AlertConfirm.config({
        okText: "Ok",
      });
      const [action] = await AlertConfirm.alert(<span>{strMessage} <b>{referenceNo}</b></span>);
      action &&   navigate('/home');;
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
        saveDocs();
      }
    };
    return (
        <div>
            <Card sx={{ margin: 1, boxShadow: "none" }}>
                <CardContent>
                <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                    <ContactsIcon sx={{ fontSize: "25px", color: '#246cb5' }} />
                    <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">{view===true?"Uploaded Documents" :"Upload Documents"}</H3>
                </div>
                <Divider />
              <div style={{ color: "red", marginBottom: "15px", fontSize: "16px" }}>
                <p>
                  <b>NOTE:</b> AADHAAR CARD, PAN CARD, BIRTH CERTIFICATES AND BANK PASSBOOK ARE MANDATORY ATTACHMENTS.
                </p>
              </div> 
                <Grid
          container
          direction="row"
          rowSpacing={2}
          columnSpacing={2}
          justify="flex-end"
          alignItems="left"
          sx={{ mb: 1,mt:2}}
        >
              <Grid item xs={12} sm={1} md={1} lg={1} sx={{color:'white',border:'1px solid black',bgcolor:'#246cb5'}}>S No.</Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{color:'white',border:'1px solid black',bgcolor:'#246cb5'}}>
            <Typography>
           DOCUMENT TYPE
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}sx={{color:'white',border:'1px solid black',bgcolor:'#246cb5'}}>UPLOAD</Grid>
          )}
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{color:'white',border:'1px solid black',bgcolor:'#246cb5'}}>UPLOADED FILE NAME</Grid>
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
             <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>1.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            AADHAAR CARD  <span style={{color:'red'}}>*</span>
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={217}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedaadhaarFiles}
              attachments={uploadedAadharFiles}
            />
          </Grid>
          )}
            {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
         <Link onClick={()=>{handleViewDocument(uploadedAadharFiles[0]?.file)}}> {uploadedAadharFiles[0]?.file.name}</Link>
          </Grid>
            )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                    {/* <Link onClick={()=>{handleViewDocument(uploadedTanFiles}}>{uploadedTanFiles[0]?.file.name}</Link> */}
                     {/* <Link href={uploadedAadharFiles[0]?.filePath}  download>{uploadedAadharFiles[0]?.fileName}</Link>*/}
                     {uploadedAadharFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>2.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            BANK ACCOUNT CANCEL CHEQUE
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={213}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              disabled={view}
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedBankAccFiles}
              attachments={uploadedBankAccFiles}
            />
          </Grid>
   )}
   {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedBankAccFiles[0]?.file)}}> {uploadedBankAccFiles[0]?.file.name} </Link>
          </Grid>
   )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedBankAccFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>3.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            BANK PASSBOOK  <span style={{color:'red'}}>*</span>
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={212}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedBankPassFiles}
              attachments={uploadedBankPassFiles}
            />
          </Grid>
         )}
         {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedBankPassFiles[0]?.file)}}>  {uploadedBankPassFiles[0]?.file.name}</Link>
          </Grid>
         )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedBankPassFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>4.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            BIRTH CERTIFICATE <span style={{color:'red'}}>*</span>
            </Typography>
          </Grid>
            {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={219}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedBirthCertFiles}
              attachments={uploadedBirthCertFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedBirthCertFiles[0]?.file)}}> {uploadedBirthCertFiles[0]?.file.name}</Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedBirthCertFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>5.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            CERTIFICATE FROM BANK
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={214}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedBankCertFiles}
              attachments={uploadedBankCertFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedBankCertFiles[0]?.file)}}>{uploadedBankCertFiles[0]?.file.name}</Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedBankCertFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>6.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            COPY OF INVOICE DATA FROM GEM PORTAL
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={215}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedInvoiceFiles}
              attachments={uploadedInvoiceFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedInvoiceFiles[0]?.file)}}> {uploadedInvoiceFiles[0]?.file.name}</Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedInvoiceFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>7.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            DRIVING LICENSE
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={220}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedDriveLicenseFiles}
              attachments={uploadedDriveLicenseFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedDriveLicenseFiles[0]?.file)}}>  {uploadedDriveLicenseFiles[0]?.file.name}</Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedDriveLicenseFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>8.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            ELECTORAL PHOTO ID CARD
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={218}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedPhotoFiles}
              attachments={uploadedPhotoFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedPhotoFiles[0]?.file)}}>  {uploadedPhotoFiles[0]?.file.name} </Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedPhotoFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>9.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            GSTIN/ GSTIN FROM GEM PORTAL
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={222}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedPortalFiles}
              attachments={uploadedPortalFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedPortalFiles[0]?.file)}}>{uploadedPortalFiles[0]?.file.name}</Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedPortalFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>10.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            PAN CARD <span style={{color:'red'}}>*</span>
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={216}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedPanFiles}
              attachments={uploadedPanFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedPanFiles[0]?.file)}}> {uploadedPanFiles[0]?.file.name}</Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedPanFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>11.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            PANCHAYAT ID
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6}sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={223}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedPanchayatFiles}
              attachments={uploadedPanchayatFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedPanchayatFiles[0]?.file)}}> {uploadedPanchayatFiles[0]?.file.name}</Link>
          </Grid>
        )}
          {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedPanchayatFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={1}sx={{border:'1px solid black'}}>12.</Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
            <Typography sx={{fontSize:{xs:"10px"},'@media (min-width:600px)':{
              fontSize:'inherit'
            },fontWeight:{xs:"bold"},'@media (min-width:600px)':{
              fontWeight:'inherit'
            }}}>
            TAN
            </Typography>
          </Grid>
          {view!==true &&(
          <Grid item xs={6} sm={3} md={3} lg={3} sx={{border:'1px solid black'}}>
          <UploadAttachments
              onUpload={handleFileUpload}
              docId={221}
              maxNumberOfFiles={1}
              maxFileSize={5}
              filesAccepted={[
                "application/pdf",
              ]}
              maxWidth="lg"
              fullWidth={true}
              disabled={view}
              dialogHeading="Upload Files:"
              buttonName="Upload Attachment"
              isDraggable={false}
              displayFileSize={true}
              displayThumbnail={true}
              displaySNo={true}
              showPreviewsInDropzone={false}
              displayNote={true}
              onSaveAttach={setUploadedTanFiles}
              attachments={uploadedTanFiles}
            />
          </Grid>
        )}
        {view!==true &&(
          <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
          <Link onClick={()=>{handleViewDocument(uploadedTanFiles[0]?.file)}}>{uploadedTanFiles[0]?.file.name}</Link>
          </Grid>
        )}
        {view===true &&(
                    <Grid item xs={12} sm={4} md={4} lg={4}sx={{border:'1px solid black'}}>
                     {uploadedTanFiles[0]?.fileName}
                   </Grid>
        )}
          {view===true &&(
          <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
          )}
          </Grid>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Button
                        sx={{
                            minWidth: 100,
                            ml: 1,
                            mt: { xs: 1, md: 0 },
                        }}
                        variant="contained"
                        type="submit"
                       onClick={()=>{
                        checkValid()
                       }}
                    >
                      {view=== true?"CLOSE " :
                        "SUBMIT "
                      }
                      {view !== true && (
                        <SaveIcon/>
                      )}
                    </Button>
                </Box>
                </CardContent>
            </Card>
        </div>
    )
}
export default SaveDocuments;
