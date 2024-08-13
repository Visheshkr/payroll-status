import {
  Card
} from '@mui/material';
import React, { useState } from "react";
import EmployeeHeaderLogo from './EmployeeHeaderLogo';
import MultiStepProgressBar from "./MultiStepProgressBar";
import SaveAddressDetails from './SaveAddressDetails';
import SavePersonalDetails from "./SavePersonalDeails";
import SaveFamilydetails from './SaveFamilyMembersDetails';
import SaveBankDetails from "./SaveBankDetails";
import SavePayentitiement from "./SavePayEntitiement";
import SaveDocument from "./SaveDocument";

function OnBoardingEmployee() {
  const [page, setPage] = useState("pageone");
  const [formData, setFormData] = useState({});
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
          pageone: <SavePersonalDetails formData={formData} setFormData={setFormData} prevData={formData.pageone} onButtonClick={nextPage} />,
          pagetwo: <SaveAddressDetails formData={formData} setFormData={setFormData} prevData={formData.pagetwo} onButtonClick={nextPage} />,
          pagethree: <SaveFamilydetails formData={formData} setFormData={setFormData} prevData={formData.pagethree} onButtonClick={nextPage} />,
          pagefour: <SaveBankDetails formData={formData} setFormData={setFormData} prevData={formData.pagefour} onButtonClick={nextPage} />,
          pagefive: <SavePayentitiement formData={formData} setFormData={setFormData} prevData={formData.pagefive} onButtonClick={nextPage} />,
          pagesix: <SaveDocument formData={formData} setFormData={setFormData} prevData={formData.pagesix} onButtonClick={nextPage} />
        }[page]
      }
    </div>
  );
}
export default OnBoardingEmployee;