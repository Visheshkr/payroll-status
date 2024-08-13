import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { DropzoneAreaBase } from "react-mui-dropzone";
import { useSnackbar } from "../../components/Snackbar";
import DocViewer from "./docViewer";
// import APIService from "../Preauth/APIPreauthServiceLayer";
// import FaceBookCircularProgress from "./FaceBookCircularProgress";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
    fontSize: "16px",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "16px",
  },
}));
function PaperComponent(props) {
  return (
    <Draggable
      handle="#files-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const UploadAttachments = (props) => {
  const {
    onQualificationUpload,
    onUpload,
    docId,
    fullWidth,
    maxWidth,
    maxNumberOfFiles,
    buttonName,
    dialogHeading,
    isDraggable,
    displayFileSize,
    displayThumbnail,
    dropzoneText,
    filesAccepted,
    displaySNo,
    showPreviewsInDropzone,
    maxFileSize,
    displayNote,
    attachmentType,
    onSaveAttach,
    attachments,
    index
  } = props;
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    setUploadedFiles(attachments)
  },[attachments])
  const handleOpenDialog = () => {
    if(attachmentType===null){
      showSnackbar("Please select Document Type first","error");
    }
    else{
    setOpenDialog(true);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [uploadedFiles, setUploadedFiles] = useState(attachments);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert,setShowAlert]=useState(false)
  const saveAttachments = async ()=>{
    if(uploadedFiles.length===0){
      showSnackbar("Please upload a file to save","error")
      return;
    }
    setOpenDialog(false);
    onSaveAttach(uploadedFiles)
    showSnackbar("Uploaded Attachment Saved","success")
  }
  const uploadAttachment = async (files) => {
    setIsLoading(true);
    // console.log("fils::",files)
    // console.log("fils::",files[0].file)
    try {
     let bodyFormData = new FormData();
        bodyFormData.append("file", files[0].file);
      // const config = { headers: { "Content-Type": "multipart/form-data" }};
      const config = { headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${Cookies.get("token")}` } };
// const auth={headers: {  "Authorization": `Bearer ${Cookies.get("token")}` }}
      const res = await axios.post(
        `http://141.148.194.18:8052/payroll/document/temp-upload`,
        bodyFormData,
        config
      );
      if (res.data.statusCode === 200 && res.data.status === true) {
        // console.log(res)
        // console.log(files)
        let temp=files[0].file
        temp.virtualPath=res.data.result[`${files[0].file.name}`]
        files[0].file=temp
        // console.log(files)
        setUploadedFiles([...uploadedFiles, ...files]);
        onUpload(res.data.result, "upload",docId,files[0]);
       // onQualificationUpload(res.data.result, "upload",files[0])
        setShowAlert(true)
       }
    } catch (error) {
      console.log(error)
      setShowAlert(false)
      showSnackbar("Opps, something went wrong : "+ error, "error");
    }
    setIsLoading(false);
  };
  const handleDeleteFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    onUpload(updatedFiles, "delete");
  };
  const [clickedFile, setClickedFile] = useState();
  const [clickedFileName, setClickedFileName] = useState("");
  const [openDocViewer, setOpenDocViewer] = useState(false);
  const handleViewFile = (file) => {
    setClickedFileName(file.name);
    setClickedFile(file);
    setOpenDocViewer(true);
  };
  const handleCloseDocViewer = () => {
    setOpenDocViewer(false);
  };
//   const saveallattchments = async() => {
//     console.log("the uploaded files", uploadedFiles)
//     console.log("the uploaded files2", uploadedFiles.file)
//     console.log("the uploaded files3", uploadedFiles.data)
//     console.log(uploadedFiles[0]['file'].virtualPath)
//   try{
//     const res = await axios.post()APIService.saveAttachments(patientNo,uploadedFiles[0]['file'].virtualPath,uploadedFiles[0]['file'].name,attachmentType);
//     showSnackbar("Attachments submitted","success")
//     setOpenDialog(false);
//   }
//   catch(error){
//     showSnackbar("Oops, error while submitting attachments: "+error.message,"error")
//     console.log(error.message)
//   } 
//   };
  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item >
          <Button
            sx={{ minWidth: 100 ,mb:3,  borderRadius: '4px'}}
             variant="contained"
            onClick={handleOpenDialog}
            startIcon={<AttachFileIcon />}
          >
            {buttonName ? buttonName : "Attachments"}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            border: "1.5px solid black",
          },
        }}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        PaperComponent={isDraggable ? PaperComponent : Paper}
        scroll={"paper"}
        fullScreen={useMediaQuery(theme.breakpoints.down("sm"))}
      >
        <DialogTitle
          sx={{
            cursor: isDraggable ? "move" : "default",
          }}
          id="files-dialog-title"
        >
          <CloseIcon
            sx={{
              float: "right",
              ":hover": {
                color: "white",
                backgroundColor: "#286cb4",
                cursor: "pointer",
              },
            }}
            onClick={handleCloseDialog}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              textDecoration: "underline",
            }}
          >
            {dialogHeading ? dialogHeading : "Upload Files:"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            spacing={1}
          >
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Box sx={{ maxHeight: "300px", overflow: "auto", padding: 2 }}>
                <DropzoneAreaBase
                  fileObjects={uploadedFiles}
                  onAdd={uploadAttachment}
                  onDelete={(e, index) => {
                    handleDeleteFile(index);
                  }}
                  acceptedFiles={filesAccepted}
                  maxFileSize={maxFileSize * 1024 * 1024}
                  filesLimit={maxNumberOfFiles}
                  dropzoneText={dropzoneText}
                  showPreviewsInDropzone={showPreviewsInDropzone}
                  showPreviews={false}
                  showFileNames={false}
                  showFileNamesInPreview={false}
                  showAlerts={showAlert}
                  alertSnackbarProps={{anchorOrigin:{vertical:'top',horizontal:'right'}}}
                />
              </Box>
              {displayNote && (
                <Box sx={{ my: 1 }}>
                  <Typography
                    sx={{ textDecoration: "underline" }}
                    fontWeight="bold"
                    variant="h4"
                  >
                    Note:
                  </Typography>
                  <Typography variant="body2">
                    1. Maximum No. of files allowed are {maxNumberOfFiles}.
                  </Typography>
                  <Typography variant="body1">
                    2. Accepted file types: {filesAccepted.join(", ")}.
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Box
                sx={{
                  width: "100%",
                  display: "table",
                  tableLayout: "fixed",
                  border: "1px solid black",
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {displaySNo && (
                          <StyledTableCell>S.No</StyledTableCell>
                        )}
                        <StyledTableCell>File Name</StyledTableCell>
                        {displayFileSize && (
                          <StyledTableCell>File Size</StyledTableCell>
                        )}
                        {displayThumbnail && (
                          <StyledTableCell>Thumbnail</StyledTableCell>
                        )}
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {uploadedFiles.map((file, index) => (
                        <TableRow key={index}>
                          {displaySNo && (
                            <StyledTableCell>{index + 1}.</StyledTableCell>
                          )}
                          <StyledTableCell>
                            <Link
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                handleViewFile(file?.file);
                              }}
                            >
                              {file?.file?.name}
                            </Link>
                          </StyledTableCell>
                          {displayFileSize && (
                            <StyledTableCell>
                              {file?.file?.size
                                ? `${(file?.file?.size / 1024).toFixed(2)} KB`
                                : "N/A"}
                            </StyledTableCell>
                          )}
                          {displayThumbnail && (
                            <StyledTableCell>
                              {file?.file?.type === "application/pdf" ? (
                                <IconButton
                                  onClick={() => handleViewFile(file?.file)}
                                  aria-label="fingerprint"
                                  id="finger_print"
                                  color="secondary"
                                >
                                  <PictureAsPdf />
                                </IconButton>
                              ) : (
                                <img
                                  onClick={() => handleViewFile(file?.file)}
                                  style={{ cursor: "pointer" }}
                                  src={URL.createObjectURL(file?.file)}
                                  alt="Thumbnail"
                                  height="50"
                                />
                              )}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDeleteFile(index)}
                            >
                              Delete
                            </Button>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={saveAttachments}>
            Save
          </Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
        {/* {isLoading && <FaceBookCircularProgress />} */}
      </Dialog>
      <Dialog
        fullScreen
        open={openDocViewer}
        onClose={handleCloseDocViewer}
        sx={{ height: "100%", width: "100%" }}
      >
        <DocViewer
          file={clickedFile}
          fileName={clickedFileName}
          isClosed={handleCloseDocViewer}
        />
      </Dialog>
    </React.Fragment>
  );
};
export default UploadAttachments;