import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import { Autocomplete, Grid, Typography, TextField, Button } from '@mui/material';
import { H3, H5, H6 } from '../../../components/Typography';
import Switch from '@mui/material/Switch';

const TaxComponent = ({options, name, note, data, setData, viewOnly, apiData}) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    // console.log(data?.dropdown, data?.limit);
    const handleAddMore =() => {
        const newData = [...data, {id:Date.now(), dropdown:null, limit:''}]
        console.log(newData)
        setData(newData)
    }

    const handleRemove = (index)=>{
        setData(data.filter((_, i) => i !== index))
    }
    
    const handleDropdownChange = (index, newValue) => {
        const updatedData = [...data];
        updatedData[index].dropdown = newValue;
        setData(updatedData);
    }

    const handleLimitChange = (index, newValue) => {
        const updatedData = [...data];
        updatedData[index].limit = newValue;
        setData(updatedData);
    }
    // const [sum, setSum] = useState(0);
    let sum = 0;
    for(let i = 0; i<data.length; i++){
        console.log(data[i].limit);
        sum += parseInt(Number(data[i].limit))
    }

    // console.log(sum)

    console.log(viewOnly)
    console.log(apiData);
    return (
        <>
            {!viewOnly && (
            <div>
                <Grid container columnSpacing={3}>
                    <Paper elevation={1} sx={{marginLeft:'20px', padding:'16px 16px', width:'100%'}}>
                        <Grid container sx={{display:'flex', justifyContent:'space-between'}}>
                            <Grid item>
                                <H3>{name}</H3>
                                <H6>{note}</H6>
                            </Grid>
                            <Grid item sx={{mt:2}}>
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    // disabled = {viewOnly === 'Draft' ? true : false}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <hr/>

                        {checked && (
                            <Grid>
                                {data ? data?.map((item,index) => (
                                <>              
                                    <Grid container columnSpacing={3} sx={{display:'flex'}} key={item.id}>
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={options}
                                            value={item?.dropdown}
                                            onChange = {(event, newValue) => handleDropdownChange(index, newValue)}
                                            // sx={{ width: 300 }}
                                            size="small"
                                            renderInput={(params) => <TextField {...params} label="Investment" />}
                                        />
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <TextField label="₹" size='small' value={item.limit} onChange={(event) => handleLimitChange(index, event.target.value)}/>
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <Button variant='contained' color='error' sx={{borderRadius:'4px', float:'right'}} onClick={() => handleRemove(index)}>Remove</Button>
                                        </Grid>
                                    </Grid>
                                </>
                                )) : ''}
                                <Grid item sx={{display:'flex', justifyContent:'space-between'}}>
                                    <Grid item>
                                        <Button variant='outlined' sx={{borderRadius:'4px'}} onClick={handleAddMore}>Add More</Button>
                                    </Grid>
                                    <TextField label="Total" size='small' value={sum} disabled/>
                                </Grid>
                            </Grid>
                        )}

                        
                    </Paper>
                </Grid>
            </div>
            )}
            

            {viewOnly && (
                <div>
                    <Grid container columnSpacing={3}>
                    <Paper elevation={1} sx={{marginLeft:'20px', padding:'16px 16px', width:'100%'}}>
                        <Grid container sx={{display:'flex', justifyContent:'space-between'}}>
                            <Grid item>
                                <H3>{name}</H3>
                                <H6>{note}</H6>
                            </Grid>
                            <Grid item sx={{mt:2}}>
                                <Switch
                                    checked={viewOnly}
                                    onChange={handleChange}
                                    disabled
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                        <hr/>

                        {viewOnly && (
                            <Grid>
                                {apiData ? apiData?.map((item,index) => (
                                <>              
                                    <Grid container columnSpacing={3} sx={{display:'flex'}} key={item.id}>
                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={options}
                                            value={item?.dropdown?.label}
                                            disabled={viewOnly}
                                            // onChange = {(event, newValue) => handleDropdownChange(index, newValue)}
                                            // sx={{ width: 300 }}
                                            size="small"
                                            renderInput={(params) => <TextField {...params} label="Investment" />}
                                        />
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <TextField label="₹" size='small' value={item.limit} disabled={viewOnly}/>
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} lg={4}>
                                            <Button variant='contained' color='error' sx={{borderRadius:'4px', float:'right'}} disabled={viewOnly}>Remove</Button>
                                        </Grid>
                                    </Grid>
                                </>
                                )) : ''}
                                <Grid item sx={{display:'flex', justifyContent:'space-between'}}>
                                    <Grid item>
                                        <Button variant='outlined' sx={{borderRadius:'4px'}} disabled={viewOnly}>Add More</Button>
                                    </Grid>
                                    <TextField label="Total" size='small' value={sum} disabled/>
                                </Grid>
                            </Grid>
                        )}
                        </Paper>
                    </Grid>
                </div>
            )}
        </>
    )
}

export default TaxComponent
