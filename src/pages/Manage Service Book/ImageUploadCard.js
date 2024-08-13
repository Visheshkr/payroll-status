// import React, { useState } from "react";
// import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import { makeStyles } from "@mui/styles";
// import AvatarImage from "./avatar.jpg";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 250,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-end",
//   },
//   input: {
//     display: "none",
//   },
//   img: {
//     width: 110,
//     height: 110,
//     margin: "auto",
//     display: "block",
//     maxWidth: "100%",
//     maxHeight: "100%",
//   },
// }));
// const ImageUploadCard = ({ cardName,OnUploadImage,uploadedImage }) => {
//   const classes = useStyles();
//   const [mainState, setMainState] = useState("initial");
//   const [imageUploaded, setImageUploaded] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(AvatarImage);
//   const handleUploadClick =  (event) => {
//     var file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = function (e) {
//       setSelectedFile([reader.result]);
//     };
//     setMainState("uploaded");
//     setSelectedFile(event.target.files[0]);
//     OnUploadImage(file)
//     uploadedImage(file)
//     setImageUploaded(1);
//   };
//   const renderInitialState = () => (
//     <Grid container direction="column" alignItems="center">
//       <Grid item>
//         <img width="100%" className={classes.img} src={selectedFile} />
//       </Grid>
//       <label htmlFor="contained-button-file">
//         <Button variant="contained" component="span">
//           Upload Image
//           <input
//             accept="image/*"
//             className={classes.input}
//             id="contained-button-file"
//             multiple
//             type="file"
//             onChange={handleUploadClick}
//           />
//         </Button>
//       </label>
//     </Grid>
//   );
//   const renderUploadedState = () => (
//     <Grid container direction="column" alignItems="center">
//       <Grid item>
//         <img width="100%" className={classes.img} src={selectedFile} />
//       </Grid>
//       <label htmlFor="contained-button-file">
//         <Button variant="contained" component="span">
//           Select Image
//           <input
//             accept="image/*"
//             className={classes.input}
//             id="contained-button-file"
//             multiple
//             type="file"
//             onChange={handleUploadClick}
//           />
//         </Button>
//       </label>
//     </Grid>
//   );
//   return (
//     <div className={classes.root}>
//       <Card className={cardName}>
//         {mainState === "initial" && renderInitialState()}
//         {mainState === "uploaded" && renderUploadedState()}
//       </Card>
//     </div>
//   );
// };
// export default ImageUploadCard;
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import AvatarImage from "./avatar.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    display: "none",
  },
  img: {
    width: 110,
    height: 110,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
const ImageUploadCard = ({ cardName, OnUploadImage, uploadedImage,image }) => {
  const classes = useStyles();
  const [mainState, setMainState] = useState("initial");
  const [imageUploaded, setImageUploaded] = useState(0);
  const [selectedFile, setSelectedFile] = useState(AvatarImage);
  useEffect(()=>{
    if(image!=null){
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = function (e) {
        setSelectedFile([reader.result]);
      };
      console.log(image)
      setMainState("uploaded");
      setSelectedFile(image);
      return;
      // OnUploadImage(image);
      // uploadedImage(image);
    }
  },[image!=null])
  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileSizeKB = file.size / 1024;
    if (fileSizeKB > 200) {
      console.error("File size exceeded");
      alert("Attachment should be less than 200KB");
      uploadedImage(null);
      return;
    }
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(file.type)) {
      console.error("Invalid file format");
      alert("Invalid file format. Please choose JPG, PNG");
      uploadedImage(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setSelectedFile([reader.result]);
    };
    if (file && fileSizeKB <= 200 && allowedFormats.includes(file.type)) {
      setMainState("uploaded");
      setSelectedFile(event.target.files[0]);
      OnUploadImage(file);
      uploadedImage(file);
      setImageUploaded(1);
    }
  };
  const renderInitialState = () => (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img width="100%" className={classes.img} src={selectedFile} />
      </Grid>
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload Image
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
        </Button>
      </label>
    </Grid>
  );
  const renderUploadedState = () => (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img width="100%" className={classes.img} src={selectedFile} />
      </Grid>
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select Image
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
        </Button>
      </label>
    </Grid>
  );
  return (
    <div className={classes.root}>
      <Card className={cardName}>
        {mainState === "initial" && renderInitialState()}
        {mainState === "uploaded" && renderUploadedState()}
      </Card>
    </div>
  );
};
export default ImageUploadCard;
