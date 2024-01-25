import { createSlice } from "@reduxjs/toolkit";
const topArmActionSlice = createSlice({
    name:'topArmActionSlice',
    initialState:{value: false},
    reducers:{
        toggle:(state)=>{
            state.value = !(state.value);
        }
    }
});
export default topArmActionSlice;