import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { sha256 } from "js-sha256";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import blue_bg from "../../assets/images/banner_1.jpg";
import logo_left from "../../assets/images/Indian_Navy_Insignia.png";
import logo_right from "../../assets/images/logo_right.png";
import { loginUser } from "../../redux/actions/LoginAction";
import { useSnackbar } from "../../components/Snackbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const drawerWidth = 280;

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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.ysraarogyasri.ap.gov.in/"
        target="_blank"
      >
        Dr.YSR Aarogyasri Health Care Trust
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const { showSnackbar } = useSnackbar();
  const showMessage = useSelector((state) => state.showMessageReducer);
  const [isSubmitted, setIsSubmitted] = useState(false);
  //const [salt, setSalt] = useState("");
  // const  hash = sha256.create();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emptyPass, setEmptyPass] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const data = useSelector((state) => state.loginReducer);
  // console.log(data);
  const navigateToHome = () => {
    navigate("/home");
  };

  const usernameRef = useRef();
  const passwordRef = useRef();
  let salt = "";
  // const createHmac = (salt, plainText)=>{
  //  let hmac = sha256.hmac(salt, plainText);
  //   return hmac.toString();
  // }

  const hashPassword = (passwordPlainText) => {
    var plainText = passwordPlainText;
    salt = randomString();
    let hash = sha256.hmac(salt, plainText);
    // console.log(hash)
    passwordRef.current.value = hash;
  };

  const randomString = () => {
    let length = 100;
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usernameRef.current.value === "" && passwordRef.current.value === "") {
      setEmptyUsername(true);
      setEmptyPass(true);
    } else {
      if (usernameRef.current.value === "") {
        setEmptyUsername(true);
        setEmptyPass(false);
      } else if (passwordRef.current.value === "") {
        setEmptyPass(true);
        setEmptyUsername(false);
      }
    }

    if (usernameRef.current.value !== "" && passwordRef.current.value !== "") {
      hashPassword(passwordRef.current.value);
      // console.log(passwordRef.current.value);

      setIsSubmitted(true);
      let request = {
        username: usernameRef.current.value,
        password: passwordRef.current.value.trim(),
        password2: salt,
      };
      setEmptyPass(false);
      setEmptyUsername(false);
      // console.log(request);
      dispatch(loginUser(request, successCb));
    }
  };

  const successCb = (response) => {
    // console.log("Inside successCB");
    //navigate("/home");
    try {
      if (
        response.data.status === true ||
        response.data.statusCode === "200" ||
        response.data.status === "SUCCESS"
      ) {
        showSnackbar("Login Successful", "success");
        navigate("/home");
      } else if (
        response.data.statusCode === 400 ||
        response.data.status === false
      ) {
        setIsSubmitted(false);
        //setLoading(false);
        showSnackbar(response.data.message, "error");
        navigate("/");
      } else {
        setIsSubmitted(false);
        showSnackbar("Opps, something went wrong", "error");
        navigate("/");
      }
    } catch (error) {
      setIsSubmitted(false);
      showSnackbar("Opps, something went wrong", "error");
      // console.log(error.message);
      navigate("/");
    }
  };

  return (
    <>

      <Box

        sx={{
          backgroundImage: `url(${blue_bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          sx={{ mx: 3 }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={5}
              sx={{
                // height: "80vh", //remove
                spacing: 0,
                backgroundColor: "#F1F8FF",
                borderRight: "1px solid #CDE6FF",
                borderRadius: "5px 0 0 5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 2,
              }}
            >
              <Grid
                item
                md={8}
                xs={6}
                component="img"
                alt="The house from the offer."
                src={logo_left}
               sx={{height: "15rem", width: "18rem"}}
              // margin={"15%"}
              // display='flex'
              // placeItems='center'
              // justifyContent='center'
              // alignItems='center'
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              sx={{
                // height: "80vh",//rem
                spacing: 0,
                backgroundColor: "white",
                borderRight: "1px solid #CDE6FF",
                borderRadius: "0 5px 5px 0",
              }}
            >
              <Box
                component={"form"}
                onSubmit={handleSubmit}
                display="flex"
                justifyContent="center"
              >
                <Grid m={4}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                  //component="img"
                  // alt="The house from the offer."
                  // src={logo_right}
                  />
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h1" fontWeight={"bold"}
                      my={2} sx={{display:'flex',justifyContent:'center',fontSize:'20px'}} 
                    >
                    PAYROLL
                    </Typography>
                    <Grid item md={12} xs={12}>
                      <Grid item md={12} xs={10} >
                        <TextField
                          InputProps={{startAdornment:(<AccountCircleIcon sx={{color:"#2169B2",mr:1}}/>)}}
                          id="userid"
                          placeholder="User Id"
                          variant="outlined"
                          
                          fullWidth
                          inputRef={usernameRef}
                          sx={{
                            border: "1px solid #EAEDF1",
                            borderRadius: "5px",
                            width:"15rem"
                          }}
                          size="small"
                          error={emptyUsername}
                          helperText={
                            emptyUsername ? "User Id is required" : null
                          }
                        />
                      </Grid>
                      <Grid item md={12} xs={10} >
                        <TextField
                        InputProps={{startAdornment:(<LockIcon sx={{color:"#2169B2",mr:1}}/>)}}
                          id="password"
                          placeholder="Password"
                          variant="outlined"
                          type="password"
                          fullWidth
                          inputRef={passwordRef}
                          sx={{
                            border: "1px solid #EAEDF1",
                            borderRadius: "5px",
                            width:"15rem"
                          }}
                          size="small"
                          error={emptyPass}
                          helperText={emptyPass ? "Password is required" : null}
                        />
                      </Grid>
                    </Grid>
                    <Grid container display="flex" sx={{mt:'-1rem'}} justifyContent="right">
                      {/* <Link style={{ textDecoration: "none", cursor: 'pointer',fontSize:'15px',marginTop:'2px' }} onClick={() => { navigate("/forgotpassword") }} >Forgot Password?</Link> */}
                    </Grid>
                    <Grid container display="flex" justifyContent="center">

                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitted}
                        sx={{
                          backgroundColor: "#2169B2",
                          padding: "11px 50px",
                          borderRadius: "5px",
                          marginTop:"1.5rem"
                        }}
                      >
                        LOGIN
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer position="fixed">
        <Typography noWrap component="div">

          &copy; Site maintained by KPMG Advisory Services Pvt. Ltd.
        </Typography>
      </Footer>
      {/* </Grid> */}
    </>
  );
}
