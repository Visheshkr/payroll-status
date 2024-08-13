import { Card, CardContent, Box, Typography, Menu, MenuItem, TableContainer } from '@mui/material'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Button } from '@mui/material'
import React from 'react'
import DashboardTableContent from './DashboardTableContent';

const DashboardTable = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <div>
      <Card sx={{marginTop:'60px'}}>
        <CardContent>
        <Box px={2} borderBottom={1} color='grey.500'>
            <Typography  variant='body2' sx={{fontFamily:'Lato, sans-serif', fontWeight:'600', color:'#0377df', fontSize:'20px'}}>Data Table</Typography>
        </Box>
        </CardContent>
        
        <CardContent>
        <Box sx={{ pr: 3, mb: 1, mt: 0, float: "right" }}>
          <Button
            variant="contained"
            startIcon={<DownloadForOfflineIcon />}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size="small" sx={{ color: '#f5f5f5', border: '1px solid #414fe1' }}
          >
            Export
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",

            }}

          >
            <MenuItem onClick={handleClose}>Excel Export</MenuItem>
            <MenuItem onClick={handleClose}>Pdf Export</MenuItem>
          </Menu>
        </Box>
        </CardContent>
        <CardContent>
            <DashboardTableContent />
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardTable
