import axios from "axios";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Store } from "@mui/icons-material";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
    SUCCESS: 'success',
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers:{
        // addToken:(state,action)=>{
        //     state.token = localStorage.getItem('token')
        // },
        logout:(state,action)=>{
            state.data = [];
            // localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.SUCCESS;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export const { setUsers, setStatus, logout } = userSlice.actions;

// Thunks
export const fetchUsers = createAsyncThunk('users/fetch', async (body) => {
    console.log(body);
    const res = await axios.post(`${process.env.REACT_APP_MASTER_API_URL}/user/authenticate`,body)
     console.log( res.data.token);
    
    return res;
}



);
// export const fetchUsersEncry = createAsyncThunk('users/fetch', async (body) => {
//     const res = await axios.post('/users/byid',body)
//     return res;
// }

// );

export default userSlice.reducer
