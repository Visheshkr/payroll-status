import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import VirtualizedTable from '../components/table/VirtualizedTable';
import { Button } from '@mui/material';

// const columns = [
//   { field: 'id', headerName: 'SNo', type:'number',  headerClassName: 'super-app-theme--header',width: 70 },
//   { field: 'empcode', headerName: 'Employee Code', width: 180,headerClassName: 'super-app-theme--header' },
//   { field: 'actionTakenby', headerName: 'Action Taken by', width: 180 ,headerClassName: 'super-app-theme--header'},
//   { field: 'designation', headerName: 'Designation', width: 130,headerClassName: 'super-app-theme--header' },
//   { field: 'phnno', headerName: 'Phone Number', width: 130,headerClassName: 'super-app-theme--header' },
//   { field: 'remarks', headerName: 'Remarks Given', width: 160,headerClassName: 'super-app-theme--header' },
//   { field: 'actionTakentime', headerName: 'Action Taken Time', width: 180,headerClassName: 'super-app-theme--header' },
//   { field: 'attachments', headerName: 'View Attachment(s)', width: 150,headerClassName: 'super-app-theme--header' },
 
// ];

// const rows = [
//   { id: 1, empcode: 'MEDICO_CGH_GNT', actionTakenby: 'Dr.T.Prabhakar Rao', 
//   designation: 'MEDICO',phnno:9876504321,remarks: 'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'},
//   {id:2,empcode:'MEDICO_CGH_GNT',actionTakenby:'Dr.T.Prabhakar Rao',designation:'MEDICO',phnno: 9876504321 ,remarks:'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'},
//   {id:3,empcode:'MEDICO_CGH_GNT',actionTakenby:'Dr.T.Prabhakar Rao',designation:'MEDICO',phnno: 9876504321 ,remarks:'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'},
//   {id:4,empcode:'MEDICO_CGH_GNT',actionTakenby:'Dr.T.Prabhakar Rao',designation:'MEDICO',phnno:9876504321,remarks:'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'},
//   {id:5,empcode:'MEDICO_CGH_GNT',actionTakenby:'Dr.T.Prabhakar Rao',designation:'MEDICO',phnno:9876504321,remarks:'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'},
//   {id:6,empcode:'MEDICO_CGH_GNT',actionTakenby:'Dr.T.Prabhakar Rao',designation:'MEDICO',phnno:9876504321,remarks:'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'},
//   {id:7,empcode:'MEDICO_CGH_GNT',actionTakenby:'Dr.T.Prabhakar Rao',designation:'MEDICO',phnno:9876504321,remarks:'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'},
//   {id:8,empcode:'MEDICO_CGH_GNT',actionTakenby:'Dr.T.Prabhakar Rao',designation:'MEDICO',phnno:9876504321,remarks:'CR Created',actionTakentime:'24/02/2023 11:57:23 am',attachments:'NA'}
// ];
const sample = [
  ['T AP/FMPNL/2022/AP C439/CRM29580 ','With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm', 'Pending with ALAMURI VIJAY BHASKAR(AP_C214)','NA','PMU Verified', '-NA-', '-NA-', 'High', 'Work Flow Changes', '-NA-', '-NA-', 'ANUPAMA KETHAM REDDY', 'Normal Request', 'Change', ],
  // ['T AP/FMPNL/2022/AP C439/CRM29581', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
  // ['T AP/FMPNL/2022/AP C439/CRM29582', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
  // ['T AP/FMPNL/2022/AP C439/CRM29583', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
  // ['T AP/FMPNL/2022/AP C439/CRM29584', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
];

function createData(id, CRID, CRTitle, CRDesc, CRDept, CRDate, CRStatus, CRInternalStatus, CRExternalStatus, CRParentID, CRSeverity,CRPriority, CRTypeOfChange, CRBuildID, CREDD, CRRaisedBy, CRCategory, CRWorkflow) {
  return {  id, CRID, CRTitle, CRDesc, CRDept, CRDate, CRStatus, CRInternalStatus, CRExternalStatus, CRParentID, CRSeverity,CRPriority, CRTypeOfChange, CRBuildID, CREDD, CRRaisedBy, CRCategory, CRWorkflow };
}

const columns = [
  {
    width: 100,
    label: 'Sl No.',
    dataKey: 'id',
  },
  {
    width: 200,
    label: 'Change Request Id',
    dataKey: 'CRID',
  },
  {
    width: 160,
    label: 'CR Title',
    dataKey: 'CRTitle',
    // numeric: true,
  },
  {
    width: 160,
    label: 'CR Description',
    dataKey: 'CRDesc',
    // numeric: true,
  },
  {
    width: 200,
    label: 'CR Raised Department',
    dataKey: 'CRDept',
    // numeric: true,
  },
  {
    width: 160,
    label: 'CR Raised Date',
    dataKey: 'CRDate',
    // numeric: true,
  },
  {
    width: 180,
    label: 'Current Status',
    dataKey: 'CRStatus',
    // numeric: true,
  },
  {
    width: 160,
    label: 'Internal Status',
    dataKey: 'CRInternalStatus',
    // numeric: true,
  },
  {
    width: 160,
    label: 'External Status',
    dataKey: 'CRExternalStatus',
    // numeric: true,
  },
  {
    width: 120,
    label: 'Parent CR ID',
    dataKey: 'CRParentID',
    // numeric: true,
  },
  {
    width: 120,
    label: 'Severity',
    dataKey: 'CRSeverity',
    // numeric: true,
  },
  {
    width: 120,
    label: 'Priority',
    dataKey: 'CRPriority',
    // numeric: true,
  },
  {
    width: 160,
    label: 'Type Of Change',
    dataKey: 'CRTypeOfChange',
    // numeric: true,
  },
  {
    width: 120,
    label: 'Build ID',
    dataKey: 'CRBuildID',
    // numeric: true,
  },
  {
    width: 180,
    label: 'Expected Delivery Date',
    dataKey: 'CREDD',
    // numeric: true,
  },
  {
    width: 200,
    label: 'CR Raised By',
    dataKey: 'CRRaisedBy',
    // numeric: true,
  },
  {
    width: 160,
    label: 'CR Category',
    dataKey: 'CRCategory',
    // numeric: true,
  },
  {
    width: 120,
    label: 'Workflow',
    dataKey: 'CRWorkflow',
    // numeric: true,
  },
  
  
];

const rows = Array.from({ length: 50 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index+1, ...randomSelection);
});


export default function DataTable() {
  
  return (
    <>
    {/* <Box sx={{ height: 400, width: '100%',  '& .super-app-theme--header': { */}
    {/* //     // backgroundColor: '#3F51B5',
    //     // color:'white'
    //     background:'#F5FAFF',
    //     fontSize:"10",
    //     color:"#4B4B4B"
    //   },}}> */}
      
      <VirtualizedTable columns={columns} rows={rows}/>
      {/* </Box> */}
    </>
  );
}
