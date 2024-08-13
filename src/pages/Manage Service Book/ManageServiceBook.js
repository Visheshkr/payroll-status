import {
  Card
} from '@mui/material';
import React, { useState } from "react";
import AddressDetails from './AddressDetails';
import BankDetails from './BankDetails';
import HeaderLogo from "./HeaderLogo";
import JoiningDetails from './JoiningDetails';
import MultiStepProgressBar from "./MultiStepProgressBar";
import PersonalDetails from "./PersonalDetails";
import Qualifications from './Qualifications';
function ManageServiceBook() {
  const [page, setPage] = useState("pageone");
  const [formData,setFormData] =useState({});
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
      default:
        setPage("1");
    }
  };
  return (
    <div >
    <Card sx={{ margin: 0, boxShadow: "none" }}>
      <HeaderLogo />
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      </Card>
      {
        {
          pageone: <PersonalDetails formData={formData} setFormData={setFormData} prevData={formData.pageone} onButtonClick={nextPage} />,
          pagetwo: <JoiningDetails formData={formData} setFormData={setFormData} prevData={formData.pagetwo} onButtonClick={nextPage} />,
          pagethree: <AddressDetails formData={formData} setFormData={setFormData} prevData={formData.pagethree}  onButtonClick={nextPage} />,
          pagefour: <Qualifications formData={formData} setFormData={setFormData} prevData={formData.pagefour} onButtonClick={nextPage} />,
          pagefive: <BankDetails formData={formData} setFormData={setFormData} prevData={formData.pagefive} onButtonClick={nextPage} />
        }[page]
      }
    </div>
  );
}
export default ManageServiceBook;