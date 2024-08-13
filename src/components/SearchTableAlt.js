import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
//import { tablePaginationClasses } from "@mui/material/TablePagination";
export default function DataTable({
  initialNoOfRows,
  columns,
  data,
  isCheckbox,
  isHideDensity,
  isHideExport,
  isHideFilter,
  isHideColumn,
  isHidePaging,
  disablePrint,
  //selectRowsOption,
}) {
  const flag = isCheckbox;
  const flagDen = isHideDensity;
  const flagExp = isHideExport;
  const flagFilter = isHideFilter;
  const flagColumn = isHideColumn;
  //const selectRows = selectRowsOption;
  // console.log(isCheckbox);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {flagColumn ? <GridToolbarColumnsButton /> : null}
        {flagFilter ? <GridToolbarFilterButton /> : null}
        {flagDen ? <GridToolbarDensitySelector /> : null}
        {flagExp ? (
          <GridToolbarExport
            printOptions={{
              disableToolbarButton: disablePrint ? true : false,
              hideToolbar: true,
            }}
          />
        ) : null}
        {/* {selectRows ? <Button>Select all Applications</Button> : null} */}
      </GridToolbarContainer>
    );
  }

  if (!data.length || !('index' in data[0])) {
    data = data.map((val, index) => ({ ...val, index: index + 1 }));
  }

  const getRowClassName = (rows) => {
    console.log(rows)
    return rows.index % 2 === 0 ? 'even-row' : '';
  }

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "table",
          tableLayout: "fixed",
        }}
      >
        {/* <div style={{ height: 400, width: "100%" }}> */}
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(rows) => rows.index}
          hideFooter={isHidePaging}
          initialState={
            isHidePaging
              ? null
              : {
                pagination: {
                  paginationModel: {
                    pageSize: initialNoOfRows ? initialNoOfRows : 25,
                  },
                },
              }
          }
          slots={{ toolbar: CustomToolbar }}
          pageSizeOptions={[5,15,25, 50, 100]}
          getRowClassName = {(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
          checkboxSelection={flag}
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              fontFamily: "Helvetica",
              fontSize: "13px",  
              color:"#f4f6fa",
              fontWeight: "bold",
              backgroundColor: "#3044a4",
            },
            '.even': {
              backgroundColor: '#f0f1f6',
            },
            // "& .MuiDataGrid-columnHeaderTitle": {
            //   textOverflow: "clip",
            //   whiteSpace: "break-spaces",
            //   lineHeight: "1.43rem",
            // },
            // "& .MuiDataGrid-footer": {
            //   maxHeight: "200px",
            //   overflow: "auto",
            // },
            
            "& .MuiDataGrid-sortIcon": {
              opacity: 1,
              color: "white",
            },
            "& .MuiDataGrid-menuIconButton": {
                opacity: 1,
                color: "white"
            },
            "& .MuiToolbar-root " : {
              display:'flex',
              alignItems:'baseline'
            }

            // [`& .${tablePaginationClasses.selectLabel}`]: {
            //   display: "block",
            // },
            // [`& .${tablePaginationClasses.input}`]: {
            //   display: "inline-flex",
            // },
          }}
        />
        {/* </div> */}
      </Box>
    </Box>
  );
}
