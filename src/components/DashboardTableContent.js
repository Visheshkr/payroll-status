import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DownloadDoneRoundedIcon from '@mui/icons-material/DownloadDoneRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


const columns = [
  { id: 'name', label: 'TableHeader', minWidth: 170 },
  { id: 'code', label: 'TableHeader', minWidth: 100 },
  {
    id: 'population',
    label: 'TableHeader',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'TableHeader',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'TableHeader',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  
];

const icon1 = <DriveFileRenameOutlineRoundedIcon sx={{color:'#79B5F2'}} />
const icon2 = <DownloadDoneRoundedIcon  sx={{color: '97D36C'}}/>
const icon3 = <DeleteForeverRoundedIcon sx={{color:'EE5555'}}/>

function createData(name, code, population, size, icon1,icon2, icon3) {
  const density = population / size;
  return { name, code, population, size, icon1, icon2, icon3 };
}

const rows = [
  createData('Data1', 'D1', 1324171354, 3287263, {icon1}, {icon2}, {icon3} ),
  createData('Data2', 'D2', 1403500365, 9596961),
  // createData('Italy', 'IT', 60483973, 301340),
  // createData('United States', 'US', 327167434, 9833520),
  // createData('Canada', 'CA', 37602103, 9984670),
  // createData('Australia', 'AU', 25475400, 7692024),
  // createData('Germany', 'DE', 83019200, 357578),
  // createData('Ireland', 'IE', 4857000, 70273),
  // createData('Mexico', 'MX', 126577691, 1972550),
  // createData('Japan', 'JP', 126317000, 377973),
  // createData('France', 'FR', 67022000, 640679),
  // createData('United Kingdom', 'GB', 67545757, 242495),
  // createData('Russia', 'RU', 146793744, 17098246),
  // createData('Nigeria', 'NG', 200962417, 923768),
  // createData('Brazil', 'BR', 210147125, 8515767),
];

export default function DashboardTableContent() {
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                  sx={{fontFamily:'Lato, sans-serif' }}
                >
                  {column.label}
                </TableCell>
                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ fontFamily:'Lato, sans-serif'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Paper>
  );
}