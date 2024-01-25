import { createSlice } from "@reduxjs/toolkit";
const handActionSlice = createSlice({
    name:'handActionSlice',
    initialState:{value: false},
    reducers:{
        toggle:(state)=>{
            state.value = !(state.value);
        }
    }
});
export default handActionSlice;