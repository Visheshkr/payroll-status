import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//
import LoanType from "./LoanType";
import LoanEligibility from "./LoanEligibility";
import LoanInterest from "./LoanInterest";
import LoanDocuments from "./LoanDocuments";
import useTitle from "../../../hooks/useTitle";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function LoanTypeScreen() {
  useTitle("Loan Type");
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "#eceff1", mb: 2 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="#777"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Loan Type" {...a11yProps(0)} />
          <Tab label="Eligibility" {...a11yProps(1)} />
          <Tab label="Interest" {...a11yProps(2)} />
          <Tab label="Loan Documents" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <LoanType />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <LoanEligibility />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <LoanInterest />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <LoanDocuments />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
