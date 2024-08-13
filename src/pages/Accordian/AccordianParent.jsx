import React, { useEffect, useState, useRef, useMemo, useCallback  } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordian from "./Accordian"; // Make sure the file is renamed to Accordion.js
import axiosClient from "../../utils/AxiosInterceptor";
import { useSnackbar } from "../../components/Snackbar";
import useTitle from "../../hooks/useTitle";
import { useLocation } from "react-router-dom";
 
const AccordionParent = () => {
  const [expanded, setExpanded] = useState(null);
  const [globalCount, setGlobalCount] = useState(0);
  const [phaseData, setPhaseData] = useState([]);
  const { showSnackbar } = useSnackbar();
  const title = "Process Compliance Checklist";
  const location = useLocation();
  const selectedProjectId = location.state?.id;
  const retrievedData = localStorage.getItem("project");
  const parsedData = JSON.parse(retrievedData);
  const projectId = parsedData.map((item) => item.project.id);
  const projectsId = selectedProjectId ? selectedProjectId : projectId[0];
  const [dropdownlist, setDropDownList] = useState([]);
 
  useTitle(title);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/compliance/${projectsId}`
        );
        const responseData = response.data?.result || [];
        if (responseData.length === 0) {
          showSnackbar("No Data Found", "warning");
        } else {
          setPhaseData([
            { name: "Project Initiation and Planning", arr: responseData["Project Initiation and Planning"] || [] },
            { name: "Project Monitoring and Control", arr: responseData["Project Monitoring and Control"] || [] },
            { name: "Engineering", arr: responseData["Engineering"] || [] },
            { name: "Support", arr: responseData["Support"] || [] },
            { name: "Project Closure", arr: responseData["Project Closure"] || [] },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchData();
  }, [projectsId]);

  useEffect(() => {
    axiosClient
      .get(
        `${process.env.REACT_APP_QMS_DASHBOARD_API_URL}/master/response-value/dropdown`
      )
      .then((response) => {
        const responseData = response.data?.result || [];
        if (responseData.length === 0) {
          showSnackbar("No Data Found", "warning");
        } else {
          responseData.map((item) => {
            const drop_obj = {
              id: item.id,
              label: item.value,
            };
            dropdownlist.push(drop_obj);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
  const handleChange = useCallback((panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  }, []);
 
  const memoizedPhaseData = useMemo(() => phaseData, [phaseData]);
 
  return (
    <Card>
      <Typography
        component="h4"
        variant="h5"
        sx={{ color: "#2169b3", textAlign: "center" }}
      >
        Process Compliance Checklist
      </Typography>
      <CardContent>
        {memoizedPhaseData.map((phase, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography
                component="h4"
                variant="h6"
                sx={{ color: "#737272" }}
              >
                {phase.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded === `panel${index}` && (
                <Accordian
                  arr={phase.arr}
                  title={phase.name}
                  globalCount={globalCount}
                  setGlobalCount={setGlobalCount}
                  dropdownlist={dropdownlist}
                />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
};
 
export default React.memo(AccordionParent);
