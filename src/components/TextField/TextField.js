import * as React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Margin, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
const theme = createTheme({

    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { color: "red" },
            },
        },
    },

})
export default function TextFields({ name,
    ...otherProps },props) {
        // const { classes } = props;
    const [field, mata] = useField(name);
    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined',
        
        
        type: otherProps.showPassword==='password'?'password':otherProps.showPassword==='file'?'file':otherProps.showPassword==='number'?'number':'text',
    };
    const [showPass, setShowPass] = useState(false);
    const handleVisibility =()=>{
        setShowPass(true);
    }
    mata["name"]=field.name
    // console.log("mata",mata)
    if (mata && mata.touched && mata.error && mata.name===name) {
        configTextfield.error = true;
        configTextfield.helperText = mata.error;
    }
    // console.log("validation",(mata.error && mata.value!='' && mata.touched===false && mata.name===name), "========",name)

    return (
        <ThemeProvider theme={theme}>
        <TextField sx={{borderRadius:0 , margin:1}}
        inputProps={{
            endAdornment:(
              <InputAdornment position ="end">
                <IconButton onClick={()=>handleVisibility()} edge ="end">
                  {showPass ? <VisibilityOff />  : <Visibility/>}

                </IconButton>
              </InputAdornment>
            )
          }}
         error= {(mata.error && mata.value!='' && mata.touched===false && mata.name===name)?true:false} helperText={(mata.error && mata.value!='' && mata.touched===false && mata.name===name)?mata.error:""} {...configTextfield} required InputLabelProps={configTextfield.name==="MD_Mobile_Number" || configTextfield.name ==="value" ?{ required: false }:""} />
          </ThemeProvider>
    );
}




