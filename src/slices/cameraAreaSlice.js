import { createSlice } from "@reduxjs/toolkit";
const cameraAreaSlice = createSlice({
    name:'cameraAreaSlice',
    initialState:{value: 0},
    reducers:{
        moveArea:(state)=>{
            state.value = state.value >= 2 ? 0 : state.value + 1
        }
    }
});
export default cameraAreaSlice;