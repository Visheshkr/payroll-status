import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Autocomplete, TextField } from "@mui/material";
import GradingIcon from "@mui/icons-material/Grading";
import FormatListNumberedRtlSharpIcon from "@mui/icons-material/FormatListNumberedRtlSharp";
import Button from "@mui/material/Button";
import useTitle from "../hooks/useTitle";
import EastIcon from "@mui/icons-material/East";
import { useSelector } from "react-redux";
// import {
//   GetDashValues,
//   GetDashFunctions,
// } from "../services/dashborad.services";

const DashboardCards = () => {
  // const name = "User Management Dashboard"
  const title = `Dashboard`;
  useTitle("Dashboard");
  const roles = useSelector((state) => state.saveRoleReducer);
  const user = useSelector((state) => state.loginReducer);

  const [dashboardData, setDashboardData] = useState([]);
  const [dashboardMainData, setDashboardMainData] = useState();
  const [smRoleFlag, setSmRoleFlag] = useState(false);
  const [dyeontRoleFlag, setDyeontRoleFlag] = useState(false);
  const navigate = useNavigate();

  // const getInit = async () => {
  //   let res = await GetDashValues({
  //     userId: user.data.userdetails.user.userId,
  //     // userId: "34",
  //   });
  //   console.log("res", res.data.result);
  //   setDashboardMainData(res.data.result?.attributeLists);

  //   let res1 = await GetDashFunctions({
  //     attributeId: "1",
  //     // userId: user.data.userdetails.user.userId,
  //     userId: "34",
  //     filterIdList: [],
  //   });
  //   console.log("res1", res1);
  // };

  useEffect(() => {
    if (roles.data?.length > 0) {
      roles.data.forEach((val) => {
        if (val.roleName === "Deputy Executive Officer - Non Technical") {
          setDyeontRoleFlag(true);
        }
        if (val.roleName === "Store Manager - 01") {
          setSmRoleFlag(true);
        }
      });
    }
  }, [roles]);

  // useEffect(() => {
  //   //const jobToken = Cookies.get("jobToken");
  //   // if (jobToken) {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_JOBAPPLICATION_API_URL}/recruitment/dashboardcounts`,
  //       {
  //         headers: {
  //           Authorization: Cookies.get("jobToken"),
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (Object.keys(response.data).includes("result")) {
  //         setDashboardData(response.data.result);
  //       }
  //       console.log("DashboardData: ", dashboardData);
  //     })
  //     .catch((error) => {
  //       setDashboardData([]);
  //       console.log(error);
  //     });
  //   //}
  // }, [Cookies.get("jobToken")]);

  // useEffect(() => {
  //   getInit();
  // }, []);

  return (
    <>
      <Grid item mb={3}>
        <Typography variant="h4" fontWeight={"bold"} >
          Welcome {localStorage.getItem("fullname")}
        </Typography>
      </Grid>

      {dashboardMainData?.map((item, index) => {
        console.log("item", item);
        return (
          <>
            {index % 2 == 0 || index == 0 ? (
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                direction="row"
                justify="flex-end"
              >
                <Grid xs={12} sm={6} md={6} lg={6} xl={3} item>
                  <Card sx={{ borderLeft: "5px solid #9c27b0" }}>
                    <CardContent>
                      <Typography
                        variant="h2"
                        fontWeight={"700"}
                        color="#777777"
                        fontSize={"15.5px"}
                        marginTop={"5px"}
                        sx={{ flexFlow: 1 }}
                        textAlign={"center"}
                      >
                        {item?.attributeName}
                      </Typography>
                      {/* <Box
                        display="flex-row"
                        justifyContent="space-between"
                        alignItems={"center"}
                      >
                        {item?.filterLists?.map((listData) => {
                          console.log("listData", listData);
                          return (
                            <>
                              <Typography
                                variant="h2"
                                fontWeight={"700"}
                                color="#777777"
                                fontSize={"15.5px"}
                                marginTop={"5px"}
                                sx={{ flexFlow: 1 }}
                              >
                                {listData?.filterName}
                              </Typography>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems={"center"}
                                marginTop={"10px"}
                              >
                                <Autocomplete
                                  disablePortal
                                  margin="normal"
                                  size="small"
                                  id="department"
                                  name="department"
                                  options={listData?.filterQueryLists}
                                  // value={
                                  //   deptOption.find(
                                  //     (option) => option.id == mapping?.department
                                  //   ) || null
                                  // }
                                  // onChange={(e, value) => {
                                  //   setMapping({
                                  //     ...mapping,
                                  //     ["department"]: value.id,
                                  //   });
                                  // }}
                                  getOptionLabel={(option) => option.valueName}
                                  sx={{
                                    width: "70%",
                                    mt: 1,
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label={`Select ${listData?.filterName}`}
                                    />
                                  )}
                                />
                                <Grid
                                  width={"40px"}
                                  height="40px"
                                  borderRadius={"100%"}
                                  bgcolor="#9c27b0"
                                  display={"flex"}
                                  alignItems="center"
                                  justifyContent={"center"}
                                  color={"white"}
                                >
                                  {"0"}
                                </Grid>
                              </Box>
                            </>
                          );
                        })}
                      </Box> */}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} xl={3} item>
                  <Card sx={{ borderLeft: "5px solid #4CBB17" }}>
                    <CardContent>
                      <Typography
                        variant="h2"
                        fontWeight={"700"}
                        color="#777777"
                        fontSize={"15.5px"}
                        marginTop={"5px"}
                        sx={{ flexFlow: 1 }}
                        textAlign={"center"}
                      >
                        {dashboardMainData[index + 1]?.attributeName}
                      </Typography>
                      {/* <Box
                        display="flex-row"
                        justifyContent="space-between"
                        alignItems={"center"}
                      >
                        {dashboardMainData[index + 1]?.filterLists?.map(
                          (listData) => {
                            console.log("listData", listData);
                            return (
                              <>
                                <Typography
                                  variant="h2"
                                  fontWeight={"700"}
                                  color="#777777"
                                  fontSize={"15.5px"}
                                  marginTop={"5px"}
                                  sx={{ flexFlow: 1 }}
                                >
                                  {listData?.filterName}
                                </Typography>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems={"center"}
                                  marginTop={"10px"}
                                >
                                  <Autocomplete
                                    disablePortal
                                    margin="normal"
                                    size="small"
                                    id="department"
                                    name="department"
                                    options={listData?.filterQueryLists}
                                    // value={
                                    //   deptOption.find(
                                    //     (option) => option.id == mapping?.department
                                    //   ) || null
                                    // }
                                    // onChange={(e, value) => {
                                    //   setMapping({
                                    //     ...mapping,
                                    //     ["department"]: value.id,
                                    //   });
                                    // }}
                                    getOptionLabel={(option) =>
                                      option.valueName
                                    }
                                    sx={{
                                      width: "70%",
                                      mt: 1,
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={`Select ${listData?.filterName}`}
                                      />
                                    )}
                                  />
                                  <Grid
                                    width={"40px"}
                                    height="40px"
                                    borderRadius={"100%"}
                                    bgcolor="#9c27b0"
                                    display={"flex"}
                                    alignItems="center"
                                    justifyContent={"center"}
                                    color={"white"}
                                  >
                                    {"0"}
                                  </Grid>
                                </Box>
                              </>
                            );
                          }
                        )}
                      </Box> */}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ) : null}
          </>
        );
      })}


    </>
  );
};

export default DashboardCards;
