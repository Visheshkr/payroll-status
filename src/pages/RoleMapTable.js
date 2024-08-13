import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CardContent, Button, Box } from '@mui/material';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { CSVLink } from 'react-csv';
import SearchTable from "../components/SearchTable";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { selectedGridRowsCountSelector } from '@mui/x-data-grid';
import { useState } from 'react';

// function ControlledCheckbox() {

//   const [checked, setChecked] = React.useState(false);

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     <Checkbox
//       checked={checked}
//       onChange={handleChange}
//       inputProps={{ 'aria-label': 'controlled' }}
//     />
//   );
// }







export default function StickyHeadTable(onCheckData, data) {

  const [selectedRows, setSelectedRows]= useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection.selectionModel);
  }
  const columns = [

    { field: 'id', headerName: 'S No.', width: 100, flex: 1, headerClassName: 'super-app-theme--header', },
    { field: 'menu', headerName: 'Menu', width: 180, flex: 1, headerClassName: 'super-app-theme--header', },
    {
      field: 'pmenu',
      headerName: 'Parent Menu',
      width: 180,
      flex: 1,

      headerClassName: 'super-app-theme--header',
      // format: (value) => value.toLocaleString('en-US'),
    },
    {

      headerName: 'View',
      width: 140,
      flex: 1,
      field: 'View',
      // align: 'center',
      headerClassName: 'super-app-theme--header',
      // format: (value) => value.toLocaleString('en-US'),
      renderCell: (params ) => (
        
        <input
          type="checkbox"
          checked={selectedRows && selectedRows.includes(params.row.id)}
          onChange={() => handleSelectionChange(params)}
        />

      )
      ,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 140,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: ( params ) => (
      
        <input
          type="checkbox"
          checked={selectedRows && selectedRows.includes(params.row.id)}
          onChange={() => handleSelectionChange(params)}
        />

      ),
    },
    {
      field: 'download',
      headerName: 'Download',
      width: 140,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: ( params ) => {
        console.log(params)
       return(
        <input
          type="checkbox"
          checked={selectedRows && selectedRows.includes(params.row.id)}
          onChange={() => {handleSelectionChange(params); console.log("download checked")}}
        />
       )
      

      },
    },
    
  ];

  //console.log(data)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card>
      <CardContent>


        <SearchTable
          columns={columns}
          isCheckbox={false}
          checkboxSelection
          selectionModel={selectedRows}
          onSelectionModelChange={handleSelectionChange}
          isHideDensity={false}
          isHideExport={true}
          isHideFilter={true}
          isHideColumn={true}
          isHidePaging={false}
          data={data.data}
          name="roleMenuRightMap"
          id="roleMenuRightMap"
        ></SearchTable>
      </CardContent>

    </Card>


  );
}