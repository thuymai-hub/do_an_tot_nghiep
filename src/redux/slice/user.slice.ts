import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload;
        },
    },
   
});

const { reducer: myUserRedeucer, actions } = userSlice;
export const { setUser } = actions;
export default myUserRedeucer;
