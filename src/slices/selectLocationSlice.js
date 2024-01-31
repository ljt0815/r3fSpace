import { createSlice } from "@reduxjs/toolkit";
const selectLocationSlice = createSlice({
    name:'selectLocationSlice',
    initialState:{value: "bottomArm"},
    reducers:{
        setSelected: (state, action)=>{
            switch(action.location) {
                case '0':
                    state.value = "bottomArm";
                    break ;
                case '1':
                    state.value = "root";
                    break ;
                case '2':
                    state.value = "topArm";
                    break ;
                case '3':
                    state.value = "middleArm";
                    break ;
                case '4':
                    state.value = "leftHand";
                    break ;
                case '5':
                    state.value = "rightHand";
                    break ;
            }
        }
    }
});
export default selectLocationSlice;