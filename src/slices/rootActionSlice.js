import { createSlice } from "@reduxjs/toolkit";
const rootActionSlice = createSlice({
    name:'rootActionSlice',
    initialState:{value: false},
    reducers:{
        toggle:(state)=>{
            state.value = !(state.value);
        }
    }
});
export default rootActionSlice;