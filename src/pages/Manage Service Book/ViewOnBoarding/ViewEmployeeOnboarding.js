import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Card, CardContent, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchTable from "../../../components/SearchTableAlt";
import { H3 } from "../../../components/Typography";
import axios from "axios";
import Cookies from "js-cookie";
const ViewEmployeeOnboarding = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const handleRedirect = (refNo) => {
        navigate('/ViewOnboarding', { state: { refNo } });
        console.log(refNo);
    }

    const columns = [
        {
            field: "empId",
            headerClassName: "super-app-theme--header",
            headerName: "S No.",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            hide: true,
            flex: 0.2
        },
        {
            field: "refNo",
            headerClassName: "super-app-theme--header",
            headerName: "Employee Reference No.",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <Link onClick={() => handleRedirect(params.value)}>
                        {params.value}
                    </Link>
                )
            },
            flex: 0.4
        },
        {
            field: "fullName",
            headerClassName: "super-app-theme--header",
            headerName: "Employee Name",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 0.4
        },
    ];

    useEffect(() => {
        axios
          .get(`http://141.148.194.18:8052/payroll/employee/list`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
                setRows(response.data);
              // setIsServiceType(false);
            }
            console.log(response);
          })
          .catch((error) => {
           
            console.log(error);
          });

      }, []);



    // const rows = [
    //     { id: 1, empRefNo: 'BRD0000000000061', empName: 'Manasa' }
    // ];

    return (
        <div>
            <Card>
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                        <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">
                            <PersonIcon sx={{ fontSize: "25px", color: "#246cb5", mb: 1.3 }} />
                            View Employee Onboarding Details &nbsp; &nbsp; &nbsp; &nbsp;
                        </H3>
                        <Button variant="contained" onClick={() => navigate('/AddOnboarding')}>Add Employee Onboarding Details</Button>
                    </div>
                    <Box component={"div"}>
                        <SearchTable
                            columns={columns}
                            data={rows}
                            isCheckbox={false}
                            isHideDensity={false}
                            isHideExport={true}
                            isHideFilter={true}
                            isHideColumn={true}
                            isHidePaging={false}
                            name="villageName"
                            id="villageName"
                        />
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default ViewEmployeeOnboarding;