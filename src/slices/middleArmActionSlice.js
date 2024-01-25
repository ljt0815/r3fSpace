import { createSlice } from "@reduxjs/toolkit";
const middleArmActionSlice = createSlice({
    name:'middleArmActionSlice',
    initialState:{value: false},
    reducers:{
        toggle:(state)=>{
            state.value = !(state.value);
        }
    }
});
export default middleArmActionSlice;