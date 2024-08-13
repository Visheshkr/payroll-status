import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Card, CardContent, Link } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SearchTable from "../../components/SearchTableAlt";
import { H3 } from "../../components/Typography";
import axiosClient from '../../utils/AxiosInterceptor';
const ViewEmployeeOnboarding = ({ rqstId , year, status}) => {
    const navigate = useNavigate();
    console.log(rqstId);
    console.log(year);
    console.log(status);
    const [tableData, setTableData] = useState([]);
    // const handleRedirect = (empRefNo) => {
    //     navigate('/ViewOnboarding', { state: { empRefNo } });
    //     console.log(empRefNo);
    // }
    useEffect(() => {
        if(rqstId){
            handleFetchTableData();
        }
      
      }, [rqstId])
  

    const handleFetchTableData = async () => {
          
        try {
            const payload = {
                fyMonId:year,
                status:status,
                officeId:rqstId
        
              };
            
            const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/employee/getEmpForReport`, payload)
            console.log('tableData', res);

            if (res.data.status) {
                setTableData(res.data?.result);

               // setIsLoader(false);
               // setShowPeriodList(true);
                //showSnackbar(res.data.message, 'success');
               
            }
            else {
               // setIsLoader(false);
                //showSnackbar('No records found', 'error')
            }
        } catch (error) {
            console.log(error);
            //setIsLoader(false);
            //showSnackbar('No records found', 'error')
        }
    }

    

    const columns = [
        {
            field: "empId",
            headerClassName: "super-app-theme--header",
            headerName: "Emp Id.",
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            hide: true,
            flex: 0.2
        },
        
        {
            field: "pranNo",
            headerClassName: "super-app-theme--header",
            headerName: "GPF/PRAN Number",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 0.4
        },
        {
            field: "empName",
            headerClassName: "super-app-theme--header",
            headerName: "Employee Name",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 0.4
        },
        {
            field: "designation",
            headerClassName: "super-app-theme--header",
            headerName: "Designation",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 0.4
        },
        {
            field: "serviceType",
            headerClassName: "super-app-theme--header",
            headerName: "Service Type",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 0.4
        },
        {
            field: "payCommision",
            headerClassName: "super-app-theme--header",
            headerName: "Pay Commision",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 0.4
        },
        {
            field: "payLevel",
            headerClassName: "super-app-theme--header",
            headerName: "Pay Level",
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 0.4
        },
    ];



    return (
        <div>
            <Card>
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBlock: 15, borderBottom: "0.5px solid #d1d1cf", marginBottom: "20px" }}>
                        <H3 sx={{ fontSize: "15px", color: '#246cb5' }} marginLeft={0.5} my={0.5} display="flex" justifyContent="center" alignItems="flex-end">
                            <PersonIcon sx={{ fontSize: "25px", color: "#246cb5", mb: 1.3 }} />
                            Employee Details &nbsp; &nbsp; &nbsp; &nbsp;
                        </H3>
                    
                    </div>
                    <Box component={"div"}>
                        <SearchTable
                            columns={columns}
                            data={tableData}
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