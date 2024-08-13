import {
  Card
} from '@mui/material';
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import EmployeeHeaderLogo from '../EmployeeHeaderLogo';
import MultiStepProgressBar from "../MultiStepProgressBar";
import SaveAddressDetails from '../SaveAddressDetails';
import SaveBankDetails from "../SaveBankDetails";
import SaveDocument from "../SaveDocument";
import SaveFamilydetails from '../SaveFamilyMembersDetails';
import SavePayentitiement from "../SavePayEntitiement";
import SavePersonalDetails from "../SavePersonalDeails";

function OnBoardingEmployee() {
  const location = useLocation();
  const refNo = location.state?.refNo;
  const [page, setPage] = useState("pageone");
  const [formData, setFormData] = useState({ refNo });

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      case "4":
        setPage("pagefour");
        break;
      case "5":
        setPage("pagefive");
        break;
      case "6":
        setPage("pagesix");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <div >
      <Card sx={{ margin: 0, boxShadow: "none" }}>
        <EmployeeHeaderLogo />
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} disable={true} />
      </Card>
      {
        {
          pageone: <SavePersonalDetails formData={formData} setFormData={setFormData} prevData={formData.pageone} onButtonClick={nextPage} view={true} />,
          pagetwo: <SaveAddressDetails formData={formData} setFormData={setFormData} prevData={formData.pagetwo} onButtonClick={nextPage} view={true} />,
          pagethree: <SaveFamilydetails formData={formData} setFormData={setFormData} prevData={formData.pagethree} onButtonClick={nextPage} view={true} />,
          pagefour: <SaveBankDetails formData={formData} setFormData={setFormData} prevData={formData.pagefour} onButtonClick={nextPage} view={true} />,
          pagefive: <SavePayentitiement formData={formData} setFormData={setFormData} prevData={formData.pagefive} onButtonClick={nextPage} view={true} />,
          pagesix: <SaveDocument formData={formData} setFormData={setFormData} prevData={formData.pagesix} onButtonClick={nextPage} view={true} />
        }[page]
      }
    </div>
  );
}

export default OnBoardingEmployee;
