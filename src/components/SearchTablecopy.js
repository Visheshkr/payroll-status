import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, CardContent } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";


export default function DataTable({
  columns,
  data,
  isCheckbox,
  isHideDensity,
  isHideExport,
  isHideFilter,
  isHideColumn,
  isHidePaging,
}) {
  const flag = isCheckbox;
  const flagDen = isHideDensity;
  const flagExp = isHideExport;
  const flagFilter = isHideFilter;
  const flagColumn = isHideColumn;
  // console.log(isCheckbox);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {flagColumn ? <GridToolbarColumnsButton /> : null}
        {flagFilter ? <GridToolbarFilterButton /> : null}
        {flagDen ? <GridToolbarDensitySelector /> : null}
        {flagExp ? <GridToolbarExport /> : null}
      </GridToolbarContainer>
    );
  }

  return (
    <Card sx={{ mt: 5 }} elevation={3}>
      <CardContent>
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "table",
              tableLayout: "fixed",
            }}
          >
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(rows) => rows.index}
              hideFooter={isHidePaging}
              initialState={
                isHidePaging
                  ? null
                  : {
                    pagination: { paginationModel: { pageSize: 5 } },
                  }
              }
              slots={{ toolbar: CustomToolbar }}
              pageSizeOptions={[5, 10, 25]}
              autoHeight
              checkboxSelection={flag}
              sx={{
                width: "100%",
                "& .super-app-theme--header": {
                  fontFamily: "Franklin Gothic Medium",
                  fontSize: "15px",
                  backgroundColor: "#2169b3",
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
