import { PrintOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
//import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
// import { Document, Page } from "@react-pdf/renderer";
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = null;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const DocViewer = (props) => {
  const { file, fileName, isClosed } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(2.3);
  // console.log(numPages);
  function onDocumentLoadSuccess({ numPages }) {
    if (numPages !== null) {
      try {
        setNumPages(numPages);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  const handleDialogClose = () => {
    isClosed(true);
  };
  const handleZoomIn = () => {
    setZoom(zoom + 0.2);
  };
  const handleZoomOut = () => {
    setZoom(zoom - 0.2);
  };
  const handlePrint = () => {
    // window.open(file, "_blank", "height=650,width=840");
    window.print();
    // console.log("file::",file)
  };
  return (
    <Box>
      <Box></Box>
      <AppBar sx={{ position: "fixed" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
          >
            <CloseIcon sx={{ ml: 2 }} />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {fileName}
          </Typography>
          <Typography variant="h6" component="div">
            Page {pageNumber} of {numPages}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            aria-label="close"
          >
            <NavigateBefore sx={{ ml: 2 }} />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            aria-label="close"
          >
            <NavigateNext sx={{ ml: 2 }} />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleZoomIn}
            aria-label="close"
          >
            <ZoomInIcon sx={{ ml: 2 }} />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleZoomOut}
            aria-label="close"
          >
            <ZoomOutIcon sx={{ ml: 2 }} />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handlePrint}
            aria-label="close"
          >
            <PrintOutlined sx={{ ml: 2 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2, display: "fixed", justifyContent: "center" }}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          sx={{ align: "center" }}
          loading="Please wait!"
        >
          <Page pageNumber={pageNumber} scale={zoom} />
        </Document>
      </Box> 
    </Box>
  );
};
export default DocViewer;
