import { createSlice } from "@reduxjs/toolkit";
const bottomArmActionSlice = createSlice({
    name:'bottomArmActionSlice',
    initialState:{value: false},
    reducers:{
        toggle:(state)=>{
            state.value = !(state.value);
        }
    }
});
export default bottomArmActionSlice;