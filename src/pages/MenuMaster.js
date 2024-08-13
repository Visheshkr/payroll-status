import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import TextField from "../components/TextField/TextField";
import AutocompleteWrapper from "../components/AutoComplete/AutoComplete";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageTitle from "../layouts/PageTitle";
import SearchTable from "../components/SearchTable";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/Toast/Toast";
import ButtonWrapper from "../components/Button/Button";
import { GetAllMenu, AddMenu, DeleteMenu } from "../services/employee.services";
import FaceBookCircularProgress from "../components/FaceBookCircularProgress";
import { showMessage } from "../redux/actions/ShowMessage";

export default function MenuMaster() {
  const showMessage1 = useSelector((state) => state.showMessageReducer);
  const user = useSelector((state) => state.loginReducer);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const [parentMenulist, setParentMenulist] = useState([]);
  const [menu, setMenu] = useState({
    isParent: "false",
    parentName: "",
    childName: "",
    iconName: "",
    link: "",
    nameTelugu: "",
    displayOrder: "",
    menuId: "",
    parentMenuId: "",
  });
  const [allMenu, setAllMenu] = useState([]);
  const [upData, setUpData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const handleChange = async (e) => {
    let { name, value } = e.target;
    console.log("data", name, value);
    if (name == "isParent") {
      setMenu({ ...menu, ["parentName"]: "" });
      setMenu({ ...menu, [name]: value });
    }
    setMenu({ ...menu, [name]: value });
  };

  const MenuSchema = Yup.object().shape({
    parentName: Yup.object().required("Enter parent menu name").nullable(),
    childName: Yup.string().required("Enter child menu name"),
    link: Yup.string().required("Enter the Link"),
    nameTelugu: Yup.string().required("Enter Telugu name"),
    displayOrder: Yup.number()
      .typeError("Display order should be a number")
      .required("Enter the Display Order"),
  });

  const MenuSchema1 = Yup.object().shape({
    parentName: Yup.string().required("Enter parent menu name").nullable(),
  });

  const columns = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "S No.",
      width: 60,
    },

    {
      width: 150,
      headerName: "Parent Menu Name",
      headerClassName: "super-app-theme--header",
      field: "Name",
    },
    {
      width: 185,
      headerName: "Menu Name",
      field: "MenuName",
      headerClassName: "super-app-theme--header",
    },
    {
      width: 150,
      headerName: "Link",
      field: "Link",
      headerClassName: "super-app-theme--header",
    },
    {
      width: 125,
      headerName: "Icon Name",
      field: "icon",
      headerClassName: "super-app-theme--header",
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
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

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
              onClick={() => handleEdit(params.row)}
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
              onClick={() => {
                handleDelete(params.row.menuId);
              }}
            >
              Delete
            </Button>
          </Stack>
        );
      },
    },
  ];

  const handleSave = async () => {
    setLoading(true);
    console.log("menu", menu);
    let res = await AddMenu({
      link: menu?.link,
      icon: menu?.iconName,
      name: menu?.childName,
      nameTelugu: menu?.nameTelugu,
      parentMenuId: menu.isParent == "true" ? null : menu.parentName?.id,
      isDefault: false,
      createdBy: user.data.userdetails.user.userId,
      updatedBy: user.data.userdetails.user.userId,
      displayOrder: menu?.displayOrder,
      isActive: true,
    });
    console.log("res", res.data.result);
    if (res.status == 200) {
      dispatch(
        showMessage({
          title: "Success",
          variant: "success",
        })
      );
      setLoading(false);
      setLoadData(!loadData);
    } else if (res.data.status == false) {
      dispatch(
        showMessage({
          title: res.data.message,
          variant: "error",
        })
      );
      setLoading(false);
      setLoadData(!loadData);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    console.log("menu", menu);
    let res = await DeleteMenu(id, user.data.userdetails.user.userId);
    console.log("res", res);
    if (res.status == 200) {
      dispatch(
        showMessage({
          title: "Success",
          variant: "success",
        })
      );
      setLoading(false);
      setLoadData(!loadData);
    } else if (res.data.status == false) {
      dispatch(
        showMessage({
          title: res.data.message,
          variant: "error",
        })
      );
      setLoading(false);
      setLoadData(!loadData);
    }
  };

  const handleEdit = async (data) => {
    console.log("data", data);
    window.scrollTo(0, 0);
    setLoading(true);
    menu.isParent = data?.Name == "-" ? "true" : "false";
    menu.parentName =
      data?.Name == "-"
        ? data?.MenuName
        : { value: data?.Name, id: data?.parentMenuId };
    menu.childName = data?.MenuName ? data?.MenuName : "";
    menu.iconName = data?.icon ? data?.icon : "";
    menu.link = data?.Link ? data?.Link : "";
    menu.nameTelugu = data?.nameTelugu ? data?.nameTelugu : "";
    menu.displayOrder = data?.displayOrder ? data?.displayOrder : "";
    menu.menuId = data?.menuId ? data?.menuId : "";
    menu.parentMenuId = data?.parentMenuId ? data?.parentMenuId : "";
    console.log("menu", menu);
    setMenu(menu);
    setUpData(!upData);
    setIsUpdating(true);
    setLoading(false);
  };

  const saveEdit = async () => {
    setLoading(true);
    let res = await AddMenu({
      menuId: menu?.menuId,
      link: menu?.link,
      icon: menu?.iconName,
      name: menu?.isParent == "true" ? menu?.parentName : menu?.childName,
      nameTelugu: menu?.nameTelugu,
      parentMenuId: menu?.parentMenuId,
      isDefault: false,
      createdBy: user.data.userdetails.user.userId,
      updatedBy: user.data.userdetails.user.userId,
      displayOrder: menu?.displayOrder,
      isActive: true,
    });
    console.log("res", res);
    if (res.status == 200) {
      dispatch(
        showMessage({
          title: "Success",
          variant: "success",
        })
      );
      setLoading(false);
      setLoadData(!loadData);
    } else if (res.data.status == false) {
      dispatch(
        showMessage({
          title: res.data.message,
          variant: "error",
        })
      );
      setLoading(false);
      setLoadData(!loadData);
    }
  };

  const getAllMenu = async () => {
    setLoading(true);
    let res = await GetAllMenu();
    console.log("res", res.data.result);
    if (res.status == 200) {
      setAllMenu(res.data.result.activeMenulist);
      let options = res.data.result.parentMenulist.map((item) => ({
        value: item.name,
        id: item.menuId,
      }));
      setParentMenulist(options);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMenu();
  }, [loadData]);

  return (
    <>
      {showMessage1.showMessage.title && (
        <Toast
          title={showMessage1.showMessagetitle}
          variant={showMessage1.showMessage.variant}
          description={showMessage1.showMessage.description}
          linkText={showMessage1.showMessage.linkText}
          link={showMessage1.showMessage.link}
        />
      )}
      <Card className="Searchcard" variant="outlined">
        <CardContent>
          <PageTitle name={"Menu Master"} />
          <Formik
            enableReinitialize
            initialValues={menu}
            validationSchema={
              menu?.isParent == "false" ? MenuSchema : MenuSchema1
            }
            onSubmit={(values) => {
              console.log("values", values);
              if (isUpdating) {
                saveEdit();
              } else {
                handleSave();
              }
            }}
          >
            {(formikProps) => (
              <Form onChange={handleChange}>
                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={2}
                  justify="flex"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Is Parent Menu?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={"false"}
                        name="isParent"
                        onChange={handleChange}
                        sx={{ alignItems: "center" }}
                        value={menu.isParent}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    {menu?.isParent == "false" ? (
                      <AutocompleteWrapper
                        name="parentName"
                        label="Parent Menu"
                        options={parentMenulist}
                        inputValue={menu?.parentName}
                        margin="0"
                        fullWidth={false}
                        required
                        oncheckParentMenu={(value) => {
                          console.log("value", value);
                          setMenu({ ...menu, ["parentName"]: value });
                        }}
                      />
                    ) : (
                      <TextField
                        margin="0"
                        required
                        label="Parent Menu Name"
                        name="parentName"
                        size="small"
                        sx={{ borderRadius: 0 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    {menu?.isParent == "false" ? (
                      <TextField
                        margin="0"
                        required
                        label="Child Menu Name"
                        name="childName"
                        size="small"
                        sx={{ borderRadius: 0 }}
                      />
                    ) : (
                      <TextField
                        margin="0"
                        required
                        label="Telugu Name"
                        name="nameTelugu"
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 0 }}
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={2}
                  justify="flex"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      margin="0"
                      required
                      label="Icon Name"
                      name="iconName"
                      variant="outlined"
                      sx={{ borderRadius: 0 }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    {menu?.isParent == "false" ? (
                      <TextField
                        margin="0"
                        required
                        label="Link"
                        name="link"
                        variant="outlined"
                        sx={{ borderRadius: 0 }}
                        size="small"
                      />
                    ) : (
                      <TextField
                        margin="0"
                        required
                        label="Diplay Order"
                        name="displayOrder"
                        variant="outlined"
                        sx={{ borderRadius: 0 }}
                        size="small"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    {menu?.isParent == "false" ? (
                      <TextField
                        margin="0"
                        required
                        label="Telugu Name"
                        name="nameTelugu"
                        variant="outlined"
                        sx={{ borderRadius: 0 }}
                        size="small"
                      />
                    ) : null}
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  rowSpacing={0}
                  columnSpacing={2}
                  justify="flex"
                  alignItems="center"
                  className="mt-4"
                >
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    {menu?.isParent == "false" ? (
                      <TextField
                        margin="0"
                        required
                        label="Diplay Order"
                        name="displayOrder"
                        variant="outlined"
                        sx={{ borderRadius: 0 }}
                        size="small"
                      />
                    ) : null}
                  </Grid>
                </Grid>
                <Stack
                  spacing={2}
                  justifyContent="right"
                  alignItems="right"
                  direction="row"
                  margin={1.5}
                >
                  <ButtonWrapper variant="contained">
                    {isUpdating ? "Edit" : "Submit"}
                  </ButtonWrapper>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setMenu({
                        isParent: "false",
                        parentName: "",
                        childName: "",
                        iconName: "",
                        link: "",
                        nameTelugu: "",
                        displayOrder: "",
                        menuId: "",
                        parentMenuId: "",
                      });
                    }}
                  >
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
          <Typography variant="h4">Menu Master List</Typography>
          <SearchTable
            columns={columns}
            isCheckbox={false}
            isHideDensity={false}
            isHideExport={true}
            isHideFilter={true}
            isHideColumn={true}
            isHidePaging={false}
            data={allMenu}
            name="menus"
            id="menus"
          ></SearchTable>
        </CardContent>
      </Card>
      {loading && <FaceBookCircularProgress />}
    </>
  );
}
