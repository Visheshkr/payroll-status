// import React, { useEffect, useRef, useState } from "react";
// import CachedIcon from '@mui/icons-material/Cached';
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from '@mui/icons-material/Search';
// import {
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   TableCell,
//   Divider,
//   TableRow,
//   TextField
// } from "@mui/material";
// import Alert from "@mui/material/Alert";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import { H3 } from "../../components/Typography";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Radio from "@mui/material/Radio";
// import Slide from "@mui/material/Slide";
// import Stack from "@mui/material/Stack";
// import { tableCellClasses } from "@mui/material/TableCell";
// import { styled, useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import PropTypes from "prop-types";
// import SearchTable from '../../components/SearchTableAlt';
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#2169b3",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
// AlertDialogSlide.propTypes = {
//   closeModal: PropTypes.func.isRequired,
//   onProceed: PropTypes.func
// }
// export default function AlertDialogSlide(props) {
//   const { closeModal } = props;
//   const [open, setOpen] = React.useState(true);
//   const [rowSelected, setRowSelected] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const handleClose = () => {
//     setOpen(closeModal);
//     setOpen(closeModal);
//   };
//   const name = "Search";
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
//   const [selectedRow, setSelectedRow] = useState(null);
//   const rows = [{ id: 1, select: '', office: 'Office 1', address: 'Mangalagiri' },]
//   const proceed = (event) => {
//     if (rowSelected) {
//       setShowAlert(false);
//       setOpen(closeModal);
//       //   onStateChange(true);
//       //   props.onProceed(selectedRow);
//     } else {
//       setShowAlert(true);
//     }
//   };
//   const columns = [
//     {
//       field: "id",
//       headerClassName: "super-app-theme--header",
//       headerName: "S No.",
//       width: 60,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//     },
//     {
//       field: "select",
//       headerClassName: "super-app-theme--header",
//       headerName: "Select",
//       width: 200,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => {
//         return (
//           <Radio
//             checked={selectedRow === params.row.id}
//             onChange={(e) => {
//               setSelectedRow(params.row.id);
//               setRowSelected(true);
//               setShowAlert(false);
//             }}
//             value={params.row.id}
//           />
//         )
//       },
//       disableColumnMenu: true,
//     },
//     {
//       field: "office",
//       headerClassName: "super-app-theme--header",
//       headerName: "Office Name",
//       width: 400,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//     },
//     {
//       field: "address",
//       headerClassName: "super-app-theme--header",
//       headerName: "Address",
//       width: 500,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//     },
//   ]
//   useEffect(() => {
//          console.log("Aryanraj")
// }, [])
//   return (
//     <div>
//       <Dialog
//         open={closeModal}
//         TransitionComponent={Transition}
//         fullScreen={fullScreen}
//         keepMounted
//         onClose={open}
//         maxWidth="700PX"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>
//           <CloseIcon
//             sx={{
//               float: "right",
//               ":hover": { color: "white", backgroundColor: "#286cb4" },
//             }}
//             onClick={handleClose}
//           />
//           <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
//             {/* <PersonIcon sx={{ fontSize: "25px", color: '#246cb5' }} /> */}
//             <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Search Office List</H3>
//           </div>
//           <Divider />
//         </DialogTitle>
//         <DialogContent>
//           <Card>
//             <CardContent>
//               <Grid
//                 container
//                 direction="row"
//                 rowSpacing={0}
//                 columnSpacing={2}
//                 justify="flex-end"
//                 alignItems="center"
//                 sx={{ mb: 1 }}
//               >
//                 <Grid item xs={12} sm={6} md={4} lg={4}>
//                   <Autocomplete
//                     disablePortal
//                     margin="normal"
//                     size="small"
//                     id="state"
//                     name="state"
//                     // options={stateList}
//                     // value={prefixList.find(
//                     //     (option) => option.id === formik.values.state
//                     // ) || null}
//                     // onChange={(e, value) => {
//                     //     if (value === null) {
//                     //         formik.setFieldValue("state", null)
//                     //     }
//                     //     else
//                     //         formik.setFieldValue("state", value.id)
//                     // }}
//                     getOptionLabel={(value) => value.label}
//                     sx={{ width: "100%", mt: 2 }}
//                     renderInput={(params) => (
//                       <TextField {...params}
//                         label="State"
//                         required
//                         InputLabelProps={{ shrink: true }}
//                       // onBlur={formik.handleBlur}
//                       // helperText={formik.errors.state && formik.touched.state ? formik.errors.state : null}
//                       // error={formik.errors.state && formik.touched.state ? true : false}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4} lg={4}>
//                   <Autocomplete
//                     disablePortal
//                     margin="normal"
//                     size="small"
//                     id="district"
//                     name="district"
//                     // options={stateList}
//                     // value={prefixList.find(
//                     //     (option) => option.id === formik.values.district
//                     // ) || null}
//                     // onChange={(e, value) => {
//                     //     if (value === null) {
//                     //         formik.setFieldValue("district", null)
//                     //     }
//                     //     else
//                     //         formik.setFieldValue("district", value.id)
//                     // }}
//                     getOptionLabel={(value) => value.label}
//                     sx={{ width: "100%", mt: 2 }}
//                     renderInput={(params) => (
//                       <TextField {...params}
//                         label="District"
//                         required
//                         InputLabelProps={{ shrink: true }}
//                       // onBlur={formik.handleBlur}
//                       // helperText={formik.errors.district && formik.touched.district ? formik.errors.district : null}
//                       // error={formik.errors.district && formik.touched.district ? true : false}
//                       />
//                     )}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <Box
//                 >
//                   <Button
//                     sx={{ minWidth: 100, ml: 1 }}
//                     variant="contained"
//                     type="submit"
//                   >
//                     Search&nbsp; <SearchIcon />
//                   </Button>
//                   <Button
//                     sx={{ minWidth: 100, ml: 1 }}
//                     // onClick={handleReset}
//                     variant="outlined"
//                   >
//                     Reset&nbsp;<CachedIcon />
//                   </Button>
//                 </Box>
//               </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//           <Box component={"div"} >
//             <SearchTable
//               columns={columns}
//               isCheckbox={false}
//               isHideDensity={false}
//               isHideExport={true}
//               isHideFilter={true}
//               isHideColumn={true}
//               isHidePaging={false}
//               data={rows}
//               name="abc"
//               id="hjjh"
//             />
//           </Box>
//           {showAlert && (
//             <DialogActions style={{ justifyContent: "flex-start" }}>
//               <Alert variant="standard" severity="error">
//                 Please select a row in table
//               </Alert>
//             </DialogActions>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Stack direction="row" display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               autoFocus
//               onClick={proceed}
//               sx={{ mb: 3, mr: 2 }}
//             >
//               Proceed
//             </Button>
//             <Button
//               variant="outlined"
//               autoFocus
//               onClick={handleClose}
//               sx={{ mb: 3 }}
//             >
//               Cancel
//             </Button>
//           </Stack>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Radio,
  Slide,
  Stack,
  TableCell,
  TableRow,
  TextField
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SearchTable from '../../components/SearchTableAlt';
import { H3 } from "../../components/Typography";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2169b3",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
SearchModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onOfficeSelect: PropTypes.func.isRequired // New prop for the callback
}
export default function SearchModal(props) {
  const { closeModal, onOfficeSelect } = props;
  const [open, setOpen] = useState(true);
  const [rowSelected, setRowSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [officeData, setOfficeData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleClose = () => {
    setOpen(false);
    closeModal();
    // Clear the selected office name when the modal is closed
    onOfficeSelect('');
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const proceed = () => {
    if (rowSelected) {
      setShowAlert(false);
      setOpen(false);
      closeModal();
      // Call the callback function to pass the selected office name
      const selectedOffice = officeData.find(office => office.id === selectedRow);
      console.log(selectedOffice)
      console.log(selectedState.id)
      const selectedstateId= selectedState.id;
      onOfficeSelect(selectedOffice.officeName,selectedOffice.id , selectedstateId);
    } else {
      setShowAlert(true);
    }
  };
  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "S.no.",
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "select",
      headerClassName: "super-app-theme--header",
      headerName: "Select",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Radio
            checked={selectedRow === params.row.id}
            onChange={() => {
              setSelectedRow(params.row.id);
              setRowSelected(true);
              setShowAlert(false);
            }}
            value={params.row.id}
          />
        )
      },
      disableColumnMenu: true,
    },
    {
      field: "officeName",
      headerClassName: "super-app-theme--header",
      headerName: "Office Name",
      width: 500,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "address",
      headerClassName: "super-app-theme--header",
      headerName: "Address",
      width: 500,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
  ];
  useEffect(() => {
    // Fetch states
    axios.get('http://141.148.194.18:8052/payroll/employee/dropdown/state', {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the states!', error);
      });
  }, []);
  const handleStateChange = (event, value) => {
    if (value) {
      setSelectedState(value);
      // Fetch districts
      console.log(value);
      axios.get(`http://141.148.194.18:8052/payroll/employee/dropdown/district/${value.id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      })
        .then(response => {
          setDistricts(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the districts!', error);
        });
    } else {
      setDistricts([]);
    }
  };
  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);
  };
  const handleSearch = () => {
    const payload = {
      deptId: 1,
      stateId: selectedState ? selectedState.id : null,
      districtId: selectedDistrict ? selectedDistrict.id : null,
      officeName: null
    };
    axios.post('http://141.148.194.18:8052/payroll/employee/dropdown/office', payload, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    })
      .then(response => {
        setOfficeData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the office data!', error);
      });
  };
  const handleReset = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setOfficeData([]);
    setDistricts([]);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        keepMounted
        onClose={handleClose}
        maxWidth="700PX"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <CloseIcon
            sx={{
              float: "right",
              ":hover": { color: "white", backgroundColor: "#286cb4" },
            }}
            onClick={handleClose}
          />
          <div style={{ display: "flex", justifyContent: "left", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
            <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">Search Office List</H3>
          </div>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
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
                    id="state"
                    name="state"
                    options={states}
                    value={selectedState}
                    onChange={handleStateChange}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField {...params}
                        label="State"
                        required
                       // InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Autocomplete
                    disablePortal
                    margin="normal"
                    size="small"
                    id="district"
                    name="district"
                    options={districts}
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: "100%", mt: 2 }}
                    renderInput={(params) => (
                      <TextField {...params}
                        label="District"
                        //InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} alignItems="center">
                  <Box display="flex" >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: "10px" }}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleReset}
                    >
                      <CachedIcon />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box component={"div"}>
            <SearchTable
              columns={columns}
              isCheckbox={false}
              isHideDensity={false}
              isHideExport={true}
              isHideFilter={true}
              isHideColumn={true}
              isHidePaging={false}
              data={officeData}
              name="abc"
              id="hjjh"
            />
          </Box>
          {showAlert && (
            <DialogActions style={{ justifyContent: "flex-start" }}>
              <Alert variant="standard" severity="error">
                Please select a row in table
              </Alert>
            </DialogActions>
          )}
        </DialogContent>
        <DialogActions>
          <Stack direction="row" display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              autoFocus
              onClick={proceed}
              sx={{ mb: 3, mr: 2 }}
            >
              Proceed
            </Button>
            <Button
              variant="outlined"
              autoFocus
              onClick={handleClose}
              sx={{ mb: 3 }}
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}