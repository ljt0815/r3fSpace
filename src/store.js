import { configureStore } from "@reduxjs/toolkit";
import handActionSlice from "./slices/handActionSlice";
import rootActionSlice from "./slices/rootActionSlice";
import topArmActionSlice from "./slices/topArmActionSlice";
import middleArmActionSlice from "./slices/middleArmActionSlice";
import bottomArmActionSlice from "./slices/bottomArmActionSlice";
import cameraAreaSlice from "./slices/cameraAreaSlice";
import equipItemSlice from "./slices/equipItemSlice";

const store = configureStore({
    reducer:{
        handAction: handActionSlice.reducer,
        rootAction: rootActionSlice.reducer,
        topArmAction: topArmActionSlice.reducer,
        middleArmAction: middleArmActionSlice.reducer,
        bottomArmAction: bottomArmActionSlice.reducer,
        cameraArea: cameraAreaSlice.reducer,
        equipItem: equipItemSlice.reducer,
    }
});
export default store;