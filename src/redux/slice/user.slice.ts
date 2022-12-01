import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AxiosClient from 'apis/AxiosClient';

export const getMe: any = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    const currentUser = await AxiosClient.get('/v2/users/me');
    return currentUser;
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload;
        },
    },
    extraReducers: {
        [getMe.fulfilled]: (state: any, action: any) => {
            state.user = action.payload;
        },
    },
   
});

const { reducer: myUserRedeucer, actions } = userSlice;
export const { setUser } = actions;
export default myUserRedeucer;
