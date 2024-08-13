import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormLabel, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableModal({closeModal, modalDetail, title}) {
  const [open, setOpen] = React.useState(false);
  

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(closeModal);
  };

  return (
    <div>
      <Dialog
        open={closeModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={open}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
            <Grid container sx={12} sm={12} >
                <Grid item sx={12} sm={12}>
                    <Typography variant='h6'>{title}</Typography>
                </Grid>
                {/* <Grid item sx={12} sm={4}>&ndsp; &ndsp; &ndsp; &ndsp; &ndsp;</Grid> */}
                <Grid item sx={12} sm={12}>
                    <Typography variant='body2'>{modalDetail}</Typography>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}