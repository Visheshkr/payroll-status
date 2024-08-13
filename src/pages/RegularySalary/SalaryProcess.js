import { Grid, Card, CardContent, TextField, Checkbox, Link, Stack, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageTitle from '../../layouts/PageTitle';
import useTitle from '../../hooks/useTitle';
import Alert from '@mui/material/Alert';
import SearchTable from '../../components/SearchTableAlt';
import axiosClient from '../../utils/AxiosInterceptor';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import { useSnackbar } from '../../components/Snackbar';
import AlertConfirm, { Button1 } from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";

const SalaryProcess = () => {
    const location = useLocation();
    const paramsData = location?.state[0]
    const officeId = location?.state[1]

    console.log(paramsData.id, officeId)
    useTitle('Payroll Process');
    const heading ='Payroll Process';
    const heading2 = 'Processed Group List'

    const {showSnackbar} = useSnackbar();
    const user = useSelector((state) => state.loginReducer);
    const userId = user.data.userdetails.user.userId;

    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [refList, setRefList] = useState([]);
    const [processData, setProcessData] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const [tableProcessData, setTableProcessData] = useState([]);
    const [tableUnprocessedData, setTableUnprocessedData] = useState([]);
    const [particularSelectedData, setParticularSelectedData] = useState([]);
    const [fieldsData, setFieldData] = useState([])

    const navigate = useNavigate();

    const handleFetchData = async() => {
      setIsLoader(true);
      const payload = {
        fyMonHoa: paramsData?.id,
        officeId: officeId
      }
      try {
        const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/getGroups`,payload);
        if(res.data){
          setFieldData(res.data.result);
          setTableProcessData(res.data.result?.proccesedEmps ?? [])
          let unprocessedData = []
          if (res.data.result?.notProccessedEmps?.length) {
            unprocessedData = [
              ...res.data.result.notProccessedEmps,
              {...res.data.result.notProccessedEmps[0], groupCode: "002"},
            ]
          }
          setTableUnprocessedData(unprocessedData)
          // setTableUnprocessedData(res.data.result?.notProccessedEmps ?? []);
          setIsLoader(false)
        }
      } catch (error) {
        console.log(error);
        setIsLoader(false);
      }
    }

    
    const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      setSelectAll(isChecked);

      if(isChecked){
        const allRows = tableUnprocessedData.map(row => row);
        setSelectedRows(allRows);
        updateUnprocessedDataAndRefList(allRows)
      }
      else {
        setSelectedRows([]);
        updateUnprocessedDataAndRefList([]);
      }
    }
    const handleCheckboxChange = (event, row) => {
        const isChecked = event.target.checked;
    
        setSelectedRows(prevSelectedRows => {
          let updatedRows = [...prevSelectedRows];
      
          if (isChecked) {
              updatedRows.push(row);
          } else {
            updatedRows = updatedRows.filter(r => r.groupCode !== row.groupCode);
              // const index = updatedRows.findIndex(selectedRow => selectedRow.groupCode === row.groupCode);
              // if (index !== -1) {
              // updatedRows.splice(index, 1);
              // }
          }
          setParticularSelectedData(updatedRows);
          if(updatedRows.length !== tableUnprocessedData.length){
            setSelectAll(false);
          }
          else{
            setSelectAll(true);
          }
          return updatedRows;
        });
    };  

    console.log('Selected rows 2', selectedRows)
    console.log(particularSelectedData, 'particular row selected');
    const updateUnprocessedDataAndRefList = (rows) => {
      console.log("Selected Rows State:", rows);
      setProcessData(rows);
      const referenceIds = rows.map(row => row.groupCode);
      setRefList(referenceIds);
      console.log("Reference IDs:", referenceIds);
    }
    console.log('Pass the data to the next page', processData);

    var processedData = true;

    const handleRedirect =(params, processedData) => {
        navigate('/groupdetails', { state: [params, paramsData, fieldsData?.fyMonId, processedData, officeId] });
    }

    const handleRedirectDetails = (params) => {
      navigate('/employeedetailsfromgroup', {state: params});
    }

    useEffect(() => {
      handleFetchData();
    }, [])


    
    const handleProcessGroup = async(params) => {
      const payload  = {
        fyMonId:paramsData?.monthId,
        grpCode : params?.groupCode,
        crtBy: userId,
      }
      console.log(payload);
      try {
        const res = await axiosClient.post(`${process.env.REACT_APP_PAYROLL_API_URL}/processGroupSalary`,payload)
        if(res.data.status){
          showSnackbar(res.data.message, 'success');
        }
      } catch (error) {
        console.log(error);
        showSnackbar(error, 'error');
      }
    }

    const callConfirmDialogFormSave = async (params) => {
      console.log(params);
      const [action] = await AlertConfirm({
        title: "Confirm",
        desc: "Are you sure, you want to submit?",
      });
      AlertConfirm.config({
        okText: "Submit",
        cancelText: "Cancel",
      });
      if (action) {
          console.log('kp-Submit', action);
          handleProcessGroup(params);
        } else {
          //   setIsSubmit(false);
          showSnackbar('Did not save!', 'error')
        }
    };
    
    const columns = [
      {
        field: "index",
        headerName: "S.No",
        flex: 0.05,
        minWidth: 60,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "select",
        headerClassName: "super-app-theme--header",
        // headerName: "Select",
        renderHeader: (params) => (
          <Checkbox sx={{color:'#fafafa', '&.Mui-checked': {color: '#fafafa',},}} 
            checked={selectAll}
            indeterminate = {selectedRows.length > 0 && selectedRows.length < tableUnprocessedData.length}
            onChange ={handleSelectAll}
          />
        ),
        flex: 0.1,
        minWidth: 100,
        value: true,
        renderCell: (params) => (
          <Checkbox
          checked={selectedRows.some(selectedRow => selectedRow.groupCode === params.row.groupCode)}
          onChange={(event) => handleCheckboxChange(event, params.row)}
        />
        ),
      },     
      {
        field: "groupCode",
        headerName: "Group Code",
        flex: 0.2,
        minWidth: 100,
        headerClassName: "super-app-theme--header",
      }, 
      {
        field: "groupName",
        headerName: "Group Name",
        flex: 0.25,
        minWidth: 150,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          <Link
            sx={{ cursor: "pointer" }}
            onClick={() => handleRedirect(params.row, processedData = false)}
          >
            {params.value}
          </Link>
        ),
      },
  
      // {
      //   field: "expenseType",
      //   headerName: "Expense Type",
      //   flex: 0.3,
      //   minWidth: 200,
      //   headerClassName: "super-app-theme--header",
      // },
      {
        field: "cycleNo",
        headerName: "Cycle",
        flex: 0.2,
        minWidth: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "empCount",
        headerName: "No. of Employee in Group",
        flex: 0.2,
        minWidth: 180,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "eligibleCount",
        headerName: "No. of Employee Eligible",
        flex: 0.2,
        minWidth: 180,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          params.value > 0 ? ( // Check if empEligible is greater than 0
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => handleRedirectDetails(params.row)}
            >
              {params.value}
            </Link>
          ) : (
            <span>{params.value}</span>  // Display the value without a link if empEligible is 0
          )
        ),
      },
      {
        field: "excludeCount",
        headerName: "Exclude Count",
        flex: 0.2,
        minWidth: 120,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          params.value > 0 ? ( // Check if empEligible is greater than 0
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => handleRedirectDetails(params.row)}
            >
              {params.value}
            </Link>
          ) : (
            <span>{params.value}</span>  // Display the value without a link if empEligible is 0
          )
        ),
      },
      {
        field: "nonEligibleCount",
        headerName: "Not Eligible Employee",
        flex: 0.5,
        minWidth: 180,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => (
          params.value > 0 ? ( // Check if empEligible is greater than 0
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => handleRedirectDetails(params.row)}
            >
              {params.value}
            </Link>
          ) : (
            <span>{params.value}</span>  // Display the value without a link if empEligible is 0
          )
        ),
      },
      {
        field: "payrollStatus",
        headerName: "Payroll Status",
        flex: 0.5,
        minWidth: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "tempRefNo",
        headerName: "Temporary Reference Number",
        flex: 0.5,
        minWidth: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "processTime",
        headerName: "Process Time",
        flex: 0.5,
        minWidth: 150,
        headerClassName: "super-app-theme--header",
      },
      // {
      //   field: "processDuration",
      //   headerName: "Process Duration",
      //   flex: 0.5,
      //   minWidth: 150,
      //   headerClassName: "super-app-theme--header",
      // },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      flex: 0.3,
      minWidth: 150,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" sx={{borderRadius:'4px'}} onClick={() => callConfirmDialogFormSave(params.row)}>
              Process
            </Button>
            {/* <IconButton style={{ color: "#2169b3" }} >
                          <InfoIcon />
                      </IconButton> */}
          </Stack>
        );
      },
    },
    ];

    
    const columnsProcessedGroupList = [
        {
            field: "groupCode",
            headerName: "Group Code",
            flex: 0.3,
            minWidth: 150,
            headerClassName: "super-app-theme--header",

        },
        {
          field: "groupName",
          headerName: "Group Name",
          flex: 0.25,
          minWidth: 150,
          headerClassName: "super-app-theme--header",
          renderCell: (params) => (
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => handleRedirect(params.row,processedData )}
            >
              {params.value}
            </Link>
          ),
        },
        {
            field: "cycleNo",
            headerName: "Cycle",
            flex: 0.1,
            minWidth: 80,
            headerClassName: "super-app-theme--header",

        },
        {
            field: "empCount",
            headerName: "No. of Employees in Group",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "eligibleCount",
            headerName: "No. of Employees Eligible",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "excludeCount",
            headerName: "Exclude Count",
            flex: 0.2,
            minWidth: 150,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "nonEligibleCount",
            headerName: "Not Eligible Employee",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        // {
        //     field: "empLoans",
        //     headerName: "No. of Employee Loans",
        //     flex: 0.2,
        //     minWidth: 180,
        //     headerClassName: "super-app-theme--header",
        // },
        {
            field: "payrollStatus",
            headerName: "Payroll Status",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "tempRefNo",
            headerName: "Temporary Reference Number",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "processTime",
            headerName: "Process Time",
            flex: 0.2,
            minWidth: 180,
            headerClassName: "super-app-theme--header",
        },
    ];
    return (
        <>
            {isLoader && <Loader />}
            <Card>
                <CardContent>
                    <PageTitle name={heading} />
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="Office Name" size="small" value={fieldsData?.officeName ?? ''} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="HOA" size="small" value={fieldsData?.hoa ?? ''} disabled fullWidth/>
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="Group Wise Payroll" size="small" defaultValue={"Yes"} disabled fullWidth/>
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="Financial Year" size="small" value={fieldsData?.fy ?? ''} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="Pay Period" size="small" value={(fieldsData?.currentYear && fieldsData?.month) ? fieldsData?.currentYear +'-'+fieldsData?.month : ''} disabled fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={4}>
                            <TextField label="Un-Allocated Employee" size="small" value={fieldsData?.unAllocatedEmp ?? ''} disabled fullWidth/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {/* <Alert severity="warning">
                Note:- <br/>
                A) In below list it will display group wise included/excluded employee count for the current paybill cycle. In case of any change click on 'Back' button and do required modifications. <br/>
                B) Click on 'Process' button to generate paybill for the group, once paybill generated group name link are enabled and click on the link you will review group's employees paybill. In case any changes required do and after click on 'Re-Process' button to generate paybill again. <br/>
                C) After verification done select group and click on 'Initiate Pay Bill' once the list is finalized. No changes permitted further. <br/>
                D) Once the list is finalized do submit this to the approver.
            </Alert> */}
            <Card>
                <CardContent>
                  <PageTitle name='Unprocessed Group List' />
                    <Grid container>
                        <SearchTable 
                            columns={columns}
                            // data={rowss}
                            data={tableUnprocessedData}
                            isCheckbox={false}
                            isHideDensity={false}
                            isHideExport={true}
                            isHideFilter={true}
                            isHideColumn={true}
                            isHidePaging={false}
                            name="villageName"
                            id="villageName"
                        />
                    </Grid>
                    <Grid container  width="100%" sx={{mt:2}}>
                        <Grid item sx={{display:'flex',justifyContent:'flex-end', width:'100%'}} gap={2}>
                            {/* <Button variant="outlined" size="small" sx={{borderRadius:"4px"}}>Bac</Button> */}
                            {/* <Button variant="contained" size="small" sx={{borderRadius:"4px"}} disabled= {selectedRows.length === 0 ? true : false}>Initiate Pay Bill</Button> */}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <PageTitle name={heading2} />
                    <Grid container>
                    <SearchTable 
                        columns={columnsProcessedGroupList}
                        // data={rowss}
                        data={tableProcessData}
                        isCheckbox={false}
                        isHideDensity={false}
                        isHideExport={true}
                        isHideFilter={true}
                        isHideColumn={true}
                        isHidePaging={false}
                        name="villageName"
                        id="villageName"
                    />
                </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default SalaryProcess
