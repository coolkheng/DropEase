import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import PaidIcon from "@mui/icons-material/Paid";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 5,
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
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PaidIcon />,
    2: <DeliveryDiningIcon />,
    3: <CheckCircleIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
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
};

const steps = ["Ready to Ship", "Shipping", "Delivered"];

export default function CustomizedSteppers({ orderDetails }) {
  const [activeStep, setActiveStep] = React.useState(0);
  let status = orderDetails.delivery_status;
  console.log(status);
  console.log(orderDetails._id);
  const handleNext = async () => {
    try {
      // Make an API call to update the order status in the database
      const response = await axios.put(`/api/orders/${orderDetails._id}`, {
        status: steps[activeStep + 1],
      });

      // If the API call is successful, update the activeStep state
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    // Determine the active step based on the delivery status
    switch (status) {
      case "Ready to Ship":
        setActiveStep(0);
        break;
      case "Shipping":
        setActiveStep(1);
        break;
      case "Delivered":
        setActiveStep(2);
        break;
      default:
        setActiveStep(0);
        break;
    }
  }, [status]);

  return (
    <Stack sx={{ width: "100%" }} spacing={4} className="Custom-Container">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <button className="progress-bar-button" onClick={handleNext}>
        Next
      </button>
    </Stack>
  );
}
