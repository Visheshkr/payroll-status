import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import { getSingleUser } from "../../services/userCreation.services";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    "& .MuiTableCell-root": {
      border: "1px solid black",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ closeModal, row }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();

  const handleClose = () => {
    setOpen(closeModal);
  };

  const name = "Details";

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const classes = useStyles();

  const getUserData = async (id) => {
    let res = await getSingleUser(id);
    console.log("res", res.data);
    setUser(res.data);
  };

  useEffect(() => {
    getUserData(row.userId);
  }, []);
  return (
    <div>
      <Dialog
        open={closeModal}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        keepMounted
        onClose={open}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <b variant="h4" textAlign={"center"} textDecoration="underline">
            {name}
          </b>
          <CloseIcon
            sx={{
              float: "right",
              ":hover": { color: "white", backgroundColor: "#286cb4" },
            }}
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <Typography>
            <b>User Details</b>
          </Typography>
          <Grid item display={"flex"} justifyContent={"center"} mt={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Login Id</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email Id</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Mobile No.
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      User Created On
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user?.fullname}</TableCell>
                    <TableCell>{user?.userName}</TableCell>
                    <TableCell>{user?.email ? user?.email : "NA"}</TableCell>
                    <TableCell>
                      {user?.mobileNo ? user?.mobileNo : "NA"}
                    </TableCell>
                    {/* <TableCell>27/04/2023 02:32:12 PM</TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography>
            <b>Department Details</b>
          </Typography>
          <Grid item display={"flex"} justifyContent={"center"} mt={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Scheme</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Department
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Designation
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user?.schmDeptDsgMaps.map((item) => {
                    return (
                      <TableRow>
                        <TableCell>
                          {item?.scheme?.schemeName
                            ? item?.scheme?.schemeName
                            : "NA"}
                        </TableCell>
                        <TableCell>
                          {item?.department?.name
                            ? item?.department?.name
                            : "NA"}
                        </TableCell>
                        <TableCell>
                          {item?.designation?.name
                            ? item?.designation?.name
                            : "NA"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography>
            <b>Audit Trail</b>
          </Typography>
          <Grid item display={"flex"} justifyContent={"center"} mt={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Fields Updated
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Updated By
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Updated On
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.loginid}</TableCell>
                    <TableCell>Aadarsh</TableCell>
                    <TableCell>27/04/2022 02:32:12 PM</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
