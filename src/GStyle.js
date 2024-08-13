import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import React from 'react'


const GStyle = createTheme({
    components: {
        // Name of the component
        MuiTextField: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              fontSize: '1rem',
              borderColor: 'orange'
            },
          },
        },
      },
});
export default GStyle;