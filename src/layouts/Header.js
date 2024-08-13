// import React, { useContext, useEffect, useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import LogoutIcon from "@mui/icons-material/Logout";
// import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import LightMode from "@mui/icons-material/LightMode";
// import DarkMode from "@mui/icons-material/DarkMode";

// import { ColorModeContext } from "../utils/ColorModeContext";
// import DrawerMenu from "./DrawerMenu";
// import Avatar from "@mui/material/Avatar";
// import logoImage from "../assets/images/logo.png";
// import { Outlet, useNavigate } from "react-router-dom";
// import logo from "../assets/images/logo.png";
// import logo_left from "../assets/images/KPMG.png";
// import { grey, indigo } from "@mui/material/colors";
// import { Grid, Select, InputLabel, FormControl } from "@mui/material";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Stack } from "@mui/system";
// import { TitleContext } from "../contexts/TitleContext";
// import { useSnackbar } from "../components/Snackbar";
// import Cookies from "js-cookie";
// // import Footer from '../components/footer/Footer';
// const drawerWidth = 280;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "center", //changed property
// }));

// const Footer = styled("div", {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   width: "100%",
//   position: "fixed",
//   top: "unset",
//   bottom: 0,
//   color: "white",
//   backgroundColor: "black",
//   textAlign: "center",
//   size: "8px",
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// export default function PersistentDrawerLeft() {
//   // const roles = useSelector((state) => state.saveRoleReducer);
//   // const user = useSelector((state) => state.loginReducer);
//   const { showSnackbar } = useSnackbar();
//   const theme = useTheme();
//   const { title } = useContext(TitleContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   // const [open, setOpen] = React.useState(localStorage.getItem("sideBarOpen"));
//   const [open, setOpen] = useState(true);
//   const [dark, setDark] = useState(false);
//   const { toggleColorMode } = useContext(ColorModeContext);
//   // const [desOptions, setDesOptions] = useState([]);
//   const [data, setData] = useState(false);
//   const [desg, setDesg] = useState(localStorage.getItem("DesignationId"));
//   const [anchorEl, setAnchorEl] = useState(null);

//   //For Projects Dropdown
//   // const retrievedData = localStorage.getItem("project");
//   // const parsedData = JSON.parse(retrievedData);
//   // const projects = parsedData.map((item) => item.project);
//   // const defaultProject = projects.length > 0 ? projects[0].name : "";
//   // // console.log("project::",projects);
//   // const [selectedProject, setSelectedProject] = useState(defaultProject);
//   // const [selectedProjectDetails, setSelectedProjectDetails] =
//   //   useState(defaultProject);
//   //   // console.log("ProjectId::",projects[0].id)
//   //   const [selectedProjectId,setSelectedProjectId]=useState(projects[0].id);
  

//   const openE1 = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     console.log("Logging out");
//     setAnchorEl(null);
//     Cookies.remove("token");
//     Cookies.remove("jobToken");
//     localStorage.clear();
//     navigate("/");
//     showSnackbar("Logout Successful", "success");
//   };

//   const handleDrawerOpen = () => {
//     setOpen(true);
//     //localStorage.setItem("sideBarOpen", true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//     //localStorage.setItem("sideBarOpen", false);
//   };

//   const handleDarkMode = () => {
//     setDark(!dark);
//     toggleColorMode();
//   };

//   const handleChange = (e) => {
//     // console.log("value", e.target);
//     setDesg(e.target.value);
//     localStorage.setItem("DesignationId", e.target.value);
//   };

//   const getRouteTitle = () => {
//     // var result = restaurants.filter(function (chain) {
//     //   return chain.restaurant.food === "chicken";
//     // })[0].restaurant.name;
//   };

//   // useEffect(() => {
//   //   // console.log("roles", roles);
//   //   if (roles.data.length > 0) {
//   //     roles?.data?.map((item, index) => {
//   //       desOptions.push({
//   //         id: item?.roleId,
//   //         label: item?.roleName,
//   //       });
//   //       setDesOptions(desOptions);
//   //       setData(!data);
//   //     });
//   //   }
//   // }, [roles]);

//   // useEffect(() => {
//   //   // console.log("user", user);
//   //   if (user.data.userdetails.user.schmDeptDsgMaps.length > 0) {
//   //     console.log(
//   //       "user",
//   //       user.data.userdetails.user.schmDeptDsgMaps[0].department
//   //     );
//   //     user.data.userdetails.user.schmDeptDsgMaps.map((item, index) => {
//   //       desOptions.push({
//   //         id: item?.department?.deptId,
//   //         label: item?.department?.name,
//   //       });
//   //       setDesOptions(desOptions);
//   //       setData(!data);
//   //     });
//   //   }
//   // }, [user]);

//   useEffect(() => {}, [data]);

//   //Added for project dropdown
//   // const projects=[
//   //   {id:1,name:'Project 1'},
//   //   {id:2,name:'Project 2'},
//   //   {id:3,name:'Project 3'}
//   // ];
 
//   // const handleProjectChange = (e) => {
//   //   // setSelectedProject(e.target.value);
    
//   //   const selectedProjectDetails = projects.find(
//   //     (project) => project.name === e.target.value
//   //   );
//   //   setSelectedProjectDetails(selectedProjectDetails);
//   //   setSelectedProject(selectedProjectDetails.name);
//   //   // console.log("Name::",selectedProjectDetails)
//   //   setSelectedProjectId(selectedProjectDetails.id);
//   //   if(localStorage.getItem("DesignationId")==="2"){
//   //     if(location.pathname==='/home' || location.pathname==='/chartadmin'){
//   //       navigate('/chartadmin',{
//   //         state:selectedProjectDetails
//   //       })
//   //       // console.log("ProjectId::", selectedProjectId);
//   //     }
//   //   }
//   //   if(localStorage.getItem("DesignationId")==="2"){
//   //     if(location.pathname==='/processcompliancechecklist'){
//   //       navigate('/processcompliancechecklist',{
//   //         state:selectedProjectDetails
//   //       })
//   //       // console.log("ProjectId::", selectedProjectId);
//   //     }
//   //   }
//   // };
  
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar sx={{ backgroundColor: "#004c99", color: "#fff" }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerClose}
//             edge="start"
//             sx={{ mr: 2, ...(!open && { display: "none" }) }}
//           >
//             <ChevronLeftIcon />
//           </IconButton>
//           <Grid
//             container
//             direction="row"
//             rowSpacing={0}
//             columnSpacing={2}
//             justify="flex-end"
//             alignItems="center"
//           >
//             <Grid item xs={12} sm={3} md={3} lg={3}>
//               <Typography variant="h6" noWrap>
//                 {title ? title : "KPMG"}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={3} md={3} lg={3}>
//               <Typography variant="h8" noWrap sx={{marginLeft:"20%"}}>
//                 {localStorage.getItem("fullname")}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={2} md={3} lg={3}>
//               <Typography variant="h8" noWrap>
//                 {localStorage.getItem("designation")}
//               </Typography>
//             </Grid>
//             {/* <Grid item xs={12} sm={2} md={3} lg={3}>
//               {projects.length > 1 ? (
//                 <FormControl variant="standard" fullWidth sx={{
//                 "& .css-jvthyc-MuiInputBase-root-MuiInput-root-MuiSelect-root":{
//                     color:"white"
//                 },
//                 "& .css-jvthyc-MuiInputBase-root-MuiInput-root-MuiSelect-root::before":{
//                     borderBottom:"1px solid white !important"
//                 },
//                 "& .css-oatl8s-MuiSvgIcon-root-MuiSelect-icon":{
//                   color:"white"
//                 },
//                 "& .css-oxjdi-MuiFormControl-root .css-oatl8s-MuiSvgIcon-root-MuiSelect-icon":{
//                   color:"white"
//                 },
//                 "& .css-389ngl-MuiSvgIcon-root-MuiSelect-icon":{
//                   color:"white"
//                 }

//                 }} >
//                   <InputLabel style={{ color: "white" }}>Projects</InputLabel>
//                   <Select
//                     value={selectedProject}
//                     onChange={handleProjectChange}
//                     label="Project"
//                     style={{ color: "white", marginBottom: "15px" }}
//                   >
//                     {projects.map((project) => (
//                       <MenuItem key={project.id} value={project.name}>
//                         {project.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               ) : (
//                 <Typography variant="body1">
//                   {projects.length === 1
//                     ? projects[0].name
//                     : "No projects available"}
//                 </Typography>
//               )}
//             </Grid> */}
//             {/* <Grid item xs={10} sm={4} md={3} lg={3}> */}
//             {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
//                 <InputLabel id="designationLabel" style={{ color: "white" }}>
//                   Role
//                 </InputLabel>
//                 <Select
//                   labelId="designationLabel"
//                   id="designation"
//                   value={desg}
//                   label="designation"
//                   onChange={(e) => {
//                     handleChange(e);
//                   }}
//                   style={{ color: "white" }}
//                 >
//                   {desOptions?.map((item) => {
//                     return <MenuItem value={item.id}>{item?.label}</MenuItem>;
//                   })}
//                 </Select>
//               </FormControl> */}
//             {/* </Grid> */}

//             <Grid item xs={12} sm={2.5} md={2.5} lg={2.5}>
//               <PowerSettingsNewIcon
//                 onClick={handleLogout}
//                 sx={{ cursor: "pointer" }}
//               />
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             scrollbarWidth: "thin",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <Box mr={1.5}>
//             <Typography
//               sx={{ py: 2, float: "left" }}
//               display="flex"
//               justifyContent="space-between"
//               component={"div"}
//             >
//               <img src={logo_left} alt="YSR" width="150px" height="50px" />
//               {/* <Stack direction="column" py={1}>
//                 <Typography
//                   component="h1"
//                   variant="body2"
//                   color="#1964AF"
//                   fontSize="11px"
//                   fontWeight={700}
//                 >
//                  KPMG India
//                 </Typography>
//                 <Typography
//                   component="h1"
//                   variant="body2"
//                   color="#A5D73A"
//                   fontWeight={700}
//                   fontSize="11px"
//                   textAlign="center"
//                 >
                 
//                 </Typography>
//               </Stack> */}
//             </Typography>
//           </Box>
//           {/* <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "ltr" ? (
//               <ChevronLeftIcon />
//             ) : (
//               <ChevronRightIcon />
//             )}
//           </IconButton> */}
//         </DrawerHeader>
//         <Divider />
//         <DrawerMenu />
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         <Outlet />
//         {/* <Footer /> */}
//       </Main>
//       <Footer position="fixed" open={open}>
//         <Typography noWrap component="div">
//           {/* CMS {location.pathname} */}
//           &copy; Site maintained by KPMG Advisory Services Pvt. Ltd.
//         </Typography>
//       </Footer>
//     </Box>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../utils/ColorModeContext";
import DrawerMenu from "./DrawerMenu";
import Avatar from "@mui/material/Avatar";
import logoImage from "../assets/images/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import logo_left from "../assets/images/IndianNavyBlue.png";
import { grey, indigo } from "@mui/material/colors";
import { Grid, Select, InputLabel, FormControl } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import { TitleContext } from "../contexts/TitleContext";
import { useSnackbar } from "../components/Snackbar";
import Cookies from "js-cookie";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import BadgeIcon from '@mui/icons-material/Badge';

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "center",
  flexDirection: "column", // Adjust flex direction
}))

const Footer = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "100%",
  position: "fixed",
  top: "unset",
  bottom: 0,
  color: "white",
  backgroundColor: "black",
  textAlign: "center",
  size: "8px",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PersistentDrawerLeft() {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const { title } = useContext(TitleContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const { toggleColorMode } = useContext(ColorModeContext);
  const [data, setData] = useState(false);
  const [desg, setDesg] = useState(localStorage.getItem("DesignationId"));
  const [anchorEl, setAnchorEl] = useState(null);
  
  const [showProfileMenu, setShowProfileMenu] = useState(null); 
  const show = Boolean(showProfileMenu);
  const handleClickProfile = (event) => {
    setShowProfileMenu(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setShowProfileMenu(null);
  };

  const openE1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out");
    setAnchorEl(null);
    Cookies.remove("token");
    Cookies.remove("jobToken");
    localStorage.clear();
    navigate("/");
    showSnackbar("Logout Successful", "success");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDarkMode = () => {
    setDark(!dark);
    toggleColorMode();
  };

  const handleChange = (e) => {
    setDesg(e.target.value);
    localStorage.setItem("DesignationId", e.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#3045a0", color: "#fff" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ mr: 2, ...(!open && { display: "none" }) }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Grid
            container
            alignItems="center"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h6" noWrap>
                {title ? title : "KPMG"}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={3} md={3} lg={3}>
              <Typography variant="h8" noWrap>
                {localStorage.getItem("fullname")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <Typography variant="h8" noWrap>
                {localStorage.getItem("designation")}
              </Typography>
            </Grid> */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box display="flex" justifyContent="flex-end">
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClickProfile}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={show ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={show ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}><PersonOutlineIcon /></Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={showProfileMenu}
                id="account-menu"
                open={showProfileMenu}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleCloseProfile}>
                  <Avatar><BadgeIcon /></Avatar> <Typography variant="h8" noWrap>{localStorage.getItem("fullname")}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Avatar><SwitchAccountIcon /></Avatar> <Typography variant="h8" noWrap>{localStorage.getItem("designation")}</Typography>
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem> */}
                {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            scrollbarWidth: "thin",
            // boxShadow: '1px 0px 10px #888888'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
<DrawerHeader>
  <Box mr={1.5}>
    <Typography
      sx={{ py: 2 }}
      display="flex"
      justifyContent="center"
      component={"div"}
    >
      <img src={logo_left} alt="Payroll" style={{ width: "auto", height: "80px", objectFit: "contain" }} />
    </Typography>
  </Box>
</DrawerHeader>
        <Divider />
        <DrawerMenu />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
      <Footer position="fixed" open={open}>
        <Typography noWrap component="div">
          &copy; Site maintained by KPMG Advisory Services Pvt. Ltd.
        </Typography>
      </Footer>
    </Box>
  );
}