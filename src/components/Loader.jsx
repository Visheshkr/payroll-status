import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="primary" />
                </Backdrop>
            </div>
        </>
    )
}

export default Loader