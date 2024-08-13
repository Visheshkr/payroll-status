import { AppBar, Button, Grid } from '@mui/material';
import React, { useState } from "react";
// import AccordPart from '../components/services/GeneralServiceForm'
// import ManpowerPage from '../components/manpower/ManpowerPage'
// import BasicApplicationFormHardcodedData from '../pages/BasicApplicationHardcodedData/BasicApplicationFormPrefilled'
// import BasicApplicationForm from '../pages/BasicApplicationFormComponents/BasicApplicationForm'
// import Grid from '@mui/material'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import useTitle from '../../hooks/useTitle';
import PageTitle from '../../layouts/PageTitle';
import "./style.css";
export default function NavBar() {
    const [activIcon, setActiveIcon] = useState(null)
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const handleIconClick = (icon) => {
        setActiveIcon(icon);
    };
    const getIconColor = (icon) => {
        return activIcon === icon ? { backgroundColor: "#7BBF4B", color: "white" }
            : { backgroundColor: "#EDEDED", color: '#2169B2' }
    }
    const [showMore, setShowMore] = useState(false);
    const [selectedOp, setSelectedOp] = useState('');
    const handleOptionSelect = (event) => {
        setSelectedOp(event.target.value)
        // setShowMore(false);
    }
    const title = "Manage Service Book";
    useTitle(title);
    return (
        <card>
            <div style={{}}>
                <PageTitle name={title} />
                <AppBar position='sticky' style={{ background: 'white', alignItems: 'center', zIndex: "0" }} elevation={0}>
                    <Grid 
                    container 
                   // padding: "0px 60px", 
                    sx={{mt: 1 }}
                    justify="flex-end"
                    alignItems="center" 
                    >
                        <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
                        {/* <Grid item xs={12} sm={1.7} md={1.7} lg={2.4} style={{ alignItems: "center" }} > */}
                            <Button sx={{ width: "95%", height: "100%" }}>
                                <div style={{ textAlign: 'center' }}>
                                    <AssignmentOutlinedIcon sx={{ color: getIconColor('basic') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                    <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Personal Details</span>
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
                            <Button sx={{ width: "95%", height: "100%", }}>
                                <div style={{ textAlign: 'center' }}>
                                    <WorkIcon sx={{ color: getIconColor('service') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                    <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Joining Details</span>
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
                            <Button sx={{ width: "95%", height: "100%", }}>
                                <div style={{ textAlign: 'center' }}>
                                    <BusinessCenterOutlinedIcon sx={{ color: getIconColor('service') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                    <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Address Details</span>
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
                            <Button sx={{ width: "95%", height: "100%" }} >
                                <div style={{ textAlign: 'center' }}>
                                    <SchoolIcon sx={{ color: getIconColor('equip') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                    <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Qualification Details</span>
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={2.4} md={2.4} lg={2.4}>
                            <Button sx={{ width: "95%", height: "100%" }} >
                                <div style={{ textAlign: 'center' }}>
                                    <AccountBalanceOutlinedIcon sx={{ color: getIconColor('equip') }} style={{ fontSize: '40px', padding: "8px", borderRadius: "50%" }} />
                                    <span style={{ display: 'block', fontSize: '12px', color: "#444444" }}>Bank Details</span>
                                </div>
                            </Button>
                        </Grid>
                    </Grid>
                </AppBar>
                <card>
                    {/* <Baic></Baic> */}
                </card>
            </div>
        </card>
    )
}
