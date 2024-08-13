// import { AppBar, Button, Grid } from '@mui/material';
// import React, { useState } from "react";
// // import AccordPart from '../components/services/GeneralServiceForm'
// // import ManpowerPage from '../components/manpower/ManpowerPage'
// // import BasicApplicationFormHardcodedData from '../pages/BasicApplicationHardcodedData/BasicApplicationFormPrefilled'
// // import BasicApplicationForm from '../pages/BasicApplicationFormComponents/BasicApplicationForm'
// // import Grid from '@mui/material'
// import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
// import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
// import SavingsIcon from '@mui/icons-material/Savings';
// import SchoolIcon from '@mui/icons-material/School';
// import useTitle from '../../hooks/useTitle';
// import PageTitle from '../../layouts/PageTitle';
// import "./style.css";
// export default function NavBar() {
//     const [activIcon, setActiveIcon] = useState(null)
//     const [selectedOptions, setSelectedOptions] = React.useState([]);
//     const handleIconClick = (icon) => {
//         setActiveIcon(icon);
//     };
//     const getIconColor = (icon) => {
//         return activIcon === icon ? { backgroundColor: "#7BBF4B", color: "white" }
//             : { backgroundColor: "#EDEDED", color: '#2169B2' }
//     }
//     const [showMore, setShowMore] = useState(false);
//     const [selectedOp, setSelectedOp] = useState('');
//     const handleOptionSelect = (event) => {
//         setSelectedOp(event.target.value)
//         // setShowMore(false);
//     }
//     const title = "Manage Service Book";
//     useTitle(title);
//     return (
//         <card>
//             <div style={{}}>
//                 <PageTitle name={title} />
//                 <AppBar position='sticky' style={{ background: 'white', alignItems: 'center', zIndex: "0" }} elevation={0}>
//                     <Grid 
//                     container 
//                    // padding: "0px 60px", 
//                     sx={{mt: 1 }}
//                     justify="flex-end"
//                     alignItems="center" 
//                     >
//                         <Grid item xs={12} sm={2.4} md={2} lg={2}>
//                         {/* <Grid item xs={12} sm={1.7} md={1.7} lg={2.4} style={{ alignItems: "center" }} > */}
//                             <Button sx={{ width: "95%", height: "100%" }}>
//                                 <div style={{ textAlign: 'center' }}>
//                                     <AssignmentOutlinedIcon sx={{ color: getIconColor('basic') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
//                                     <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Personal Details</span>
//                                 </div>
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} sm={2.4} md={2} lg={2}>
//                             <Button sx={{ width: "95%", height: "100%", }}>
//                                 <div style={{ textAlign: 'center' }}>
//                                     <SchoolIcon sx={{ color: getIconColor('service') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
//                                     <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Qualifiaction Details</span>
//                                 </div>
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} sm={2.4} md={2} lg={2}>
//                             <Button sx={{ width: "95%", height: "100%", }}>
//                                 <div style={{ textAlign: 'center' }}>
//                                     <FamilyRestroomIcon sx={{ color: getIconColor('service') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
//                                     <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Family Details</span>
//                                 </div>
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} sm={2.4} md={2} lg={2}>
//                             <Button sx={{ width: "95%", height: "100%" }} >
//                                 <div style={{ textAlign: 'center' }}>
//                                     <SavingsIcon sx={{ color: getIconColor('equip') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
//                                     <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Bank Details</span>
//                                 </div>
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} sm={2.4} md={2} lg={2}>
//                             <Button sx={{ width: "95%", height: "100%" }} >
//                                 <div style={{ textAlign: 'center' }}>
//                                     <ReceiptIcon sx={{ color: getIconColor('equip') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
//                                     <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Pay Entitilement</span>
//                                 </div>
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} sm={2.4} md={2} lg={2}>
//                             <Button sx={{ width: "95%", height: "100%" }} >
//                                 <div style={{ textAlign: 'center' }}>
//                                     <DocumentScannerIcon sx={{ color: getIconColor('equip') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
//                                     <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Document</span>
//                                 </div>
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </AppBar>
//                 <card>
//                     {/* <Baic></Baic> */}
//                 </card>
//             </div>
//         </card>
//     )
// }
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import SchoolIcon from '@mui/icons-material/School';
import { AppBar, Button, Grid } from '@mui/material';
import React, { useState } from "react";
import useTitle from '../../hooks/useTitle';
import PageTitle from '../../layouts/PageTitle';
import "./style.css";
export default function NavBar() {
    const [activIcon, setActiveIcon] = useState(null);
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [showMore, setShowMore] = useState(false);
    const [selectedOp, setSelectedOp] = useState('');
    const handleIconClick = (icon) => {
        setActiveIcon(icon);
    };
    const getIconColor = (icon) => {
        return activIcon === icon ? { backgroundColor: "#7BBF4B", color: "white" }
            : { backgroundColor: "#EDEDED", color: '#2169B2' };
    };
    const handleOptionSelect = (event) => {
        setSelectedOp(event.target.value);
    };
    const title = "Onboarding Employee";
    useTitle(title);
    return (
        <div>
            {/* <PageTitle name={title} /> */}
            <AppBar position='sticky' style={{ background: 'white', alignItems: 'center', zIndex: "0" }} elevation={0}>
                <Grid 
                    container 
                    sx={{ mt: 1 }} 
                    justifyContent="center" 
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button sx={{ width: "100%", height: "100%" }} onClick={() => handleIconClick('basic')}>
                            <div style={{ textAlign: 'center' }}>
                                <AssignmentOutlinedIcon sx={{ color: getIconColor('basic') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Personal Details</span>
                            </div>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button sx={{ width: "100%", height: "100%" }} onClick={() => handleIconClick('service')}>
                            <div style={{ textAlign: 'center' }}>
                                <SchoolIcon sx={{ color: getIconColor('service') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Qualification Details</span>
                            </div>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button sx={{ width: "100%", height: "100%" }} onClick={() => handleIconClick('family')}>
                            <div style={{ textAlign: 'center' }}>
                                <FamilyRestroomIcon sx={{ color: getIconColor('family') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Family Details</span>
                            </div>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button sx={{ width: "100%", height: "100%" }} onClick={() => handleIconClick('bank')}>
                            <div style={{ textAlign: 'center' }}>
                                <SavingsIcon sx={{ color: getIconColor('bank') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Bank Details</span>
                            </div>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button sx={{ width: "100%", height: "100%" }} onClick={() => handleIconClick('pay')}>
                            <div style={{ textAlign: 'center' }}>
                                <ReceiptIcon sx={{ color: getIconColor('pay') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Pay Entitlement</span>
                            </div>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Button sx={{ width: "100%", height: "100%" }} onClick={() => handleIconClick('document')}>
                            <div style={{ textAlign: 'center' }}>
                                <DocumentScannerIcon sx={{ color: getIconColor('document') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Document</span>
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}
