import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Card, CardContent } from "@mui/material";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
//
import LoanType from "./LoanType";
import LoanEligibility from "./LoanEligibility";
import LoanInterest from "./LoanInterest";
import LoanDocuments from "./LoanDocuments";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, #2169b3 0%, #2169b3 50%, #2169b3 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, #2169b3 0%, #2169b3 50%, #2169b3 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 8,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer", // Add cursor pointer for hover effect
  transition: "background-color 0.3s ease-in-out", // Add transition for smooth effect

  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[600] : "#999", // Change color on hover
  },

  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 95deg, #2169b3 0%, #2169b3 50%, #2169b3 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 95deg, #2169b3 0%, #2169b3 50%, #2169b3 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, onClick } = props;

  const icons = {
    1: <PersonIcon />,
    2: <SchoolIcon />,
    3: <BusinessCenterOutlinedIcon />,
    4: <AccountBalanceOutlinedIcon />,
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      onClick={handleClick}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func, // Add onClick prop
};
const steps = [
  "PERSONAL DETAILS",
  "EDUCATIONAL DETAILS",
  "EXPERIENCE",
  "PAYMENT DETAILS",
];

export default function LoanTypeScreen() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [visitedSteps, setVisitedSteps] = useState([0]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const nextStep = activeStep + 1;
    if (!visitedSteps.includes(nextStep)) {
      setVisitedSteps([...visitedSteps, nextStep]);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepComponent = (step) => {
    switch (step) {
      case 0:
        return <LoanType />;
      case 1:
        return <LoanEligibility />;
      case 2:
        return <LoanInterest />;
      case 3:
        return <LoanDocuments />;
      default:
        return null;
    }
  };

  const handleStepChange = (index) => {
    setActiveStep(index);
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label} onClick={() => handleStepChange(index)}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  onClick={() => handleStepChange(index)}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {
            <React.Fragment>
              {renderStepComponent(activeStep)}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  variant="outlined"
                  //color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1 ? handleReset : handleNext
                  }
                >
                  {activeStep === steps.length - 1
                    ? "Back to first tab"
                    : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          }
        </Box>
      </CardContent>
    </Card>
  );
}

// export default LoanTypeScreen;
