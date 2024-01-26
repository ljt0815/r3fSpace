import { createSlice } from "@reduxjs/toolkit";
const equipItemSlice = createSlice({
    name:'equipItem',
    initialState:{value: []},
    reducers:{
        addCircle:(state)=>{
            const newPosition = [
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
            ];
            const newObject = { type: 'circle', position: newPosition};
            state.value = [...state.value, newObject];
        }
    }
});
export default equipItemSlice;