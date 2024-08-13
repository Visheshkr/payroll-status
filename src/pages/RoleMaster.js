import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PageTitle from "../layouts/PageTitle";
// import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchTable from "../components/SearchTable";
import TextField from "../components/TextField/TextField";
import ButtonWrapper from "../components/Button/Button";
import { useRef } from "react";
//import VirtualizedTable from '../components/table/VirtualizedTable'
import { useDispatch, useNavigate, useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Box } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { CSVLink } from "react-csv";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import TableRow from "@mui/material/TableRow";
import StickyHeaderTable from "../components/table/StickyHeaderTable";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { createRole } from "../redux/actions/CreateRoleMasterAction";
import Toast from "../components/Toast/Toast";
import { getAllRoles } from "../redux/actions/GetAllRolesAction";
import { deleteRole } from "../redux/actions/DeleteRoleAction";
import { SolarPower } from "@mui/icons-material";
const RoleMaster = () => {
  const name = "Role Master";
  // const name2 = 'Role List'
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const showMessage = useSelector((state) => state.showMessageReducer);
  const roleList = useSelector((state) => state.getAllRoleReducer);
  const user = useSelector((state) => state.loginReducer);

  const roles = [];
  if (Object.keys(roleList.data).length != 0) {
    roleList.data.result.forEach((element) => roles.push(element));
  }

  const successCBdeletion = () => {
    console.log("Under SuccessCb");
    dispatch(getAllRoles());
  };

  const handleDeletion = (roleId) => {
    dispatch(
      deleteRole(roleId, successCBdeletion, user.data.userdetails.user.userId)
    );
  };
  const [roleid, setRoleId] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = (row) => {
    window.scrollTo(0, 0)
    setIsUpdating(true);
    setRoleId(row.RoleId);
    console.log("Under update user creation");

    const INITIAL_ROLE_FORM_VALUE = {
      roleName: row.Name,
      roleCode: row.RoleCode,
      roleDesc: row.RoleDescription,
    };

    SETINITIAL_ROLE_FORM_VALUE(INITIAL_ROLE_FORM_VALUE);
    console.log(INITIAL_ROLE_FORM_VALUE);
  };

  const columns = [
    {
      width: 70,
      headerClassName: "super-app-theme--header",
      headerName: "SI No.",
      field: "id",
    },
    {
      width: 130,
      headerClassName: "super-app-theme--header",
      headerName: "Role Name",
      field: "Name",
      flex: 1,
    },
    {
      width: 120,
      headerClassName: "super-app-theme--header",
      headerName: "Role Code",
      field: "RoleCode",
      flex: 1,
      // numeric: true,
    },
    {
      width: 160,
      headerClassName: "super-app-theme--header",
      headerName: "Role Description",
      field: "RoleDescription",
      flex: 1,
      // numeric: true,
    },
    {
      width: 200,
      headerClassName: "super-app-theme--header",
      headerName: "Role Creation Date",
      field: "RoleCreationDate",
      flex: 1,
      // numeric: true,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        // console.log(params.row)
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                color: "black",
                backgroundColor: "white",
                ":hover": { color: "black", backgroundColor: "white" },
                borderRadius: "4px",
              }}
              endIcon={<EditIcon />}
              size="small"
              onClick={() => handleUpdate(params.row)}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#286cb4",
                ":hover": { color: "white", backgroundColor: "#286cb4" },
                borderRadius: "4px",
              }}
              startIcon={<DeleteIcon />}
              size="small"
              onClick={() => handleDeletion(params.row.RoleId)}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  const [INITIAL_ROLE_FORM_VALUE, SETINITIAL_ROLE_FORM_VALUE] = useState({
    roleName: "",
    roleCode: "",
    roleDesc: "",
  });

  const VALIDATE_ROLE_FORM_VALUE = Yup.object().shape({
    roleName: Yup.string().required("Required"),
    roleCode: Yup.string().required("Required"),
    roleDesc: Yup.string().required("Required"),
  });

  const handleRoleCreation = (payload) => {
    dispatch(createRole(payload, successCBdeletion));
  };

  return (
    <>
      {showMessage.showMessage.title && (
        <Toast
          title={showMessage.showMessage.title}
          variant={showMessage.showMessage.variant}
          description={showMessage.showMessage.description}
          linkText={showMessage.showMessage.linkText}
          link={showMessage.showMessage.link}
        />
      )}

      <Card className="Searchcard" variant="outlined">
        <CardContent>
          <PageTitle name={name} />
          <Formik
            initialValues={{ ...INITIAL_ROLE_FORM_VALUE }}
            validationSchema={VALIDATE_ROLE_FORM_VALUE}
            enableReinitialize
            onSubmit={(values) => {
              console.log("Values", values);
              if (isUpdating) {
                console.log("Under updating");
                const payload = {
                  roleCode: values.roleCode,
                  name: values.roleName,
                  roledesc: values.roleDesc,
                  roleId: roleid,
                };
                handleRoleCreation(payload);
                console.log(payload);
              } else {
                const payload = {
                  roleCode: values.roleCode,
                  name: values.roleName,
                  roledesc: values.roleDesc,
                };
                console.log("Under new user creation");
                handleRoleCreation(payload);
              }

              values.roleCode = "";
              values.roleName = "";
              values.roleDesc = "";
            }}
          >
            {(formikProps) => (
              <Form>
                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={2}
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="0"
                      required
                      fullWidth
                      label="Role Name"
                      name="roleName"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="0"
                      required
                      fullWidth
                      label="Role Code"
                      name="roleCode"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      required
                      name="roleDesc"
                      variant="outlined"
                      label="Role Description"
                      fullWidth
                      size="small"
                      sx={{ borderRadius: 0 }}
                    />
                  </Grid>
                </Grid>
                <Stack
                  spacing={2}
                  justifyContent="right"
                  alignItems="right"
                  direction="row"
                  margin={1.5}
                >
                  <ButtonWrapper variant="contained">Submit</ButtonWrapper>
                  <Button variant="outlined" onClick={formikProps.resetForm}>
                    {" "}
                    <CachedIcon /> Reset
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      <Card className="Searchcard" variant="outlined">
        <CardContent>
          {/* <PageTitle name={name2}/> */}
          <Typography variant="h4">Role List</Typography>
          <SearchTable
            columns={columns}
            isCheckbox={false}
            isHideDensity={false}
            isHideExport={true}
            isHideFilter={true}
            isHideColumn={true}
            isHidePaging={false}
            data={roles}
            name="roleMasterTab"
            id="roleMasterTab"
          ></SearchTable>
        </CardContent>
      </Card>
    </>
  );
};

export default RoleMaster;
