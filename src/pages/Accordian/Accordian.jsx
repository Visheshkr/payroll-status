import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import axiosClient from "../../utils/AxiosInterceptor";
import { useSnackbar } from "../../components/Snackbar";
import AlertConfirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import { useNavigate ,useLocation} from "react-router-dom";

const Accordion = ({ arr, title, dropdownlist }) => {
  const [edit, setEdit] = useState(false);
  const [editCount, setEditCount] = useState(0);
  const [formData, setFormData] = useState(arr);
  const [isLoading, setIsLoading] = useState(true);
  const [alertData, setAlertData] = useState(false);
  const [indexArray, setIndexArray] = useState([]);
  const [finalPostArray, setFinalPostArray] = useState([]);
  const { showSnackbar } = useSnackbar();
  const location = useLocation();
  const selectedProjectId = location.state?.id;
  const retrievedData = localStorage.getItem("project");
  const parsedData = JSON.parse(retrievedData);
  const projectId = parsedData.map((item) => item.project.id);
  const projectsId = selectedProjectId ? selectedProjectId : projectId[0];
  const navigate = useNavigate();
 
  const saveApi = async (data) => {
    try {
      const response = await axiosClient.post(
        `${process.env.REACT_APP_PAYROLL_API_URL}/compliance/`,
        data
      );
      if (response.data.statusCode === 200) {
        showSnackbar(response.data.message, "success");
        navigate('/processcompliancechecklist')
      }
    } catch (error) {
      showSnackbar("Error saving data, please try again.", "error");
    }

  };

  const callConfirmDialog = async () => {
    const [action] = await AlertConfirm({
      title: "Confirm",
      desc: "Are you sure, you want to save?",
    });
    AlertConfirm.config({
      okText: "Submit",
      cancelText: "Cancel",
    });
    if (action) {
 
      indexArray.forEach((indexNo) => {
        const changedValue = formData[indexNo];
        const updatedValue = {
          questionId: changedValue.questionId,
          valueId: changedValue.selectValId,
          remarks: changedValue.remarks,
          evidence: changedValue.evidence,
        };
        finalPostArray.push(updatedValue);
      });
      const datachanged = {
        projectId: projectsId,
        questionResponseList: finalPostArray,
      };
      await saveApi(datachanged);
      setFinalPostArray([]);
    } else {
      showSnackbar("Did not save!", "error");
    }
  };
 
  useEffect(() => {
    setIsLoading(true);
    setFormData(arr);
    setIsLoading(false);
  }, [arr]);

 

  const handleEditClick = () => {
    setEdit(false);
    showSnackbar("You can edit the fields now!");
  };


  const handleChange = (index, field, value) => {
    setEditCount(editCount+1);
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    if(field === "selectVal"){
      let selectValueId = 0;
      dropdownlist.map((item)=>{
        if(item.label === value) selectValueId=item.id;
      })
      updatedFormData[index]["selectValId"]=selectValueId;
    }
    if (
      updatedFormData[index]["evidence"] !== null &&
      updatedFormData[index]["remarks"] !== null &&
      updatedFormData[index]["selectVal"] !== null
    ) {
      setFormData(updatedFormData);
      setAlertData(false);
      if (!indexArray.includes(index)) indexArray.push(index);
    } else {
      setAlertData(true);
    }
  };

  const handleSave = () => {
    if (alertData) {
      showSnackbar("Complete all the fields before saving", "warning");
    } else {
      callConfirmDialog();
    }
    setEdit(true);
  };

  const getSelectedItem = (item) => {
    return dropdownlist.find((opt) => opt.label === item.selectVal) || null;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card>
      <CardContent>
        <TableContainer
          component={Paper}
          sx={{ borderLeft: "1px solid black", m: "10px 0" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2369b3" }}>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  S.NO
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  {title}
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Select
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Remarks
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  Evidence
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell style={{ border: "1px solid black" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid black", width: "30%" }}
                  >
                    <TextField
                      variant="standard"
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      multiline
                      minRows={3}
                      maxRows={4}
                      defaultValue={item.question}
                      fullWidth
                      onChange={(e) =>
                        handleChange(index, "question", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell style={{ border: "1px solid black" }}>
                    <Autocomplete
                      readOnly={edit ? true : false}
                      value={getSelectedItem(item)}
                      options={dropdownlist}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Select" />
                      )}
                      onChange={(e, newValue) =>
                        handleChange(
                          index,
                          "selectVal",
                          newValue ? newValue.label : ""
                        )
                      }
                    />
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid black", width: "30%" }}
                  >
                    <TextField
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: edit ? true : false,
                      }}
                      multiline
                      minRows={3}
                      maxRows={4}
                      defaultValue={item.remarks}
                      fullWidth
                      onChange={(e) =>
                        handleChange(index, "remarks", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid black", width: "30%" }}
                  >
                    <TextField
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        readOnly: edit ? true : false,
                      }}
                      multiline
                      minRows={3}
                      maxRows={4}
                      defaultValue={item.evidence}
                      fullWidth
                      onChange={(e) =>
                        handleChange(index, "evidence", e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", margin: "20px" }}>
          <Button
            variant="contained"
            sx={{ mr: "5px", ml: "auto" }}
            onClick={handleSave}
            disabled={editCount>0 ?false:true}
          >
            Save
          </Button>
          <Button variant="contained" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Accordion;
