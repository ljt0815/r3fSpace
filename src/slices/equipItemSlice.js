import { createSlice } from "@reduxjs/toolkit";
const equipItemSlice = createSlice({
    name:'equipItem',
    initialState:{value: []},
    reducers:{
        equipSphere:(state)=>{
            const newPosition = [
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            ];
            const newObject = { type: 'sphere', position: newPosition};
            state.value = [...state.value, newObject];
        },
        equipCube:(state)=>{
            const newPosition = [
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            ];
            const newObject = { type: 'cube', position: newPosition};
            state.value = [...state.value, newObject];
        },
        equipCone:(state)=>{
            const newPosition = [
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            ];
            const newObject = { type: 'cone', position: newPosition};
            state.value = [...state.value, newObject];
        }
    }
});
export default equipItemSlice;