import React, { useState, useEffect } from "react";
import "../style/progressbar.css";

const StepProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    refresh();
  }, [currentStep]);

  const next = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 6)); // Assuming 5 steps
  };

  const prev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const refresh = () => {
    const progressSteps = document.querySelectorAll(".progress-step .fa-solid");
    const progress = document.getElementById("progress");

    progressSteps.forEach((step, index) => {
      if (index < currentStep - 1) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    let width = ((currentStep - 1) / (progressSteps.length - 1)) * 100;
    progress.style.width = width + "%";

    const preBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    if (currentStep === 1) {
      preBtn.classList.add("disabled");
    } else {
      preBtn.classList.remove("disabled");
    }

    if (currentStep === progressSteps.length) {
      nextBtn.classList.add("disabled");
    } else {
      nextBtn.classList.remove("disabled");
    }
  };

  return (
    <div className="wrapper">
      <div className="progress-container">
        <div className="progress" id="progress"></div>
        <div className="progress-step">
          <i className="fa-solid fa-shopping-cart active"></i>
          Order Placed
        </div>
        <div className="progress-step">
          <i className="fa-solid fa-address-book"></i>
          Order Paid
        </div>
        <div className="progress-step">
          <i className="fa-solid fa-truck"></i>
          Shipped Out
        </div>
        <div className="progress-step">
          <i className="fa-solid fa-credit-card"></i>
          Order Received
        </div>
        <div className="progress-step">
          <i className="fa-solid fa-flag"></i>
          Order Complete
        </div>
      </div>

      <div className="btn-container">
        <div className="progress_btn" id="prev" onClick={prev}>
          Undo
        </div>
        <div className="progress_btn" id="next" onClick={next}>
          Update Delivery Status
        </div>
      </div>
    </div>
  );
};

export default StepProgressBar;
