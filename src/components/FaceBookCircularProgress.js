import React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const FaceBookCircularProgress = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      //onClick={handleClose}
    >
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
          size={40}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
          }}
          size={40}
          thickness={4}
        />
      </Box>
    </Backdrop>
  );
};

export default FaceBookCircularProgress;
