import { createSlice } from "@reduxjs/toolkit";
const equipItemSlice = createSlice({
    name:'equipItem',
    initialState:{value: {
        sphere: null,
        cube: null,
        cone: null
    }},
    reducers:{
        equipSphere:(state)=>{
            const newPosition = [
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            ];
            state.value.sphere = newPosition;
        },
        equipCube:(state)=>{
            const newPosition = [
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            ];
            state.value.cube = newPosition;
        },
        equipCone:(state)=>{
            const newPosition = [
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            ];
            state.value.cone = newPosition;
        },
        deleteAll:(state)=>{
            state.value.sphere = null;
            state.value.cube = null;
            state.value.cone = null;
        }
    }
});
export default equipItemSlice;