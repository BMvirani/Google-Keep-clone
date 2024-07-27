import { configureStore } from "@reduxjs/toolkit";
import draggableSlice from "./slice/noteslice";

export default configureStore({
    reducer: {
        notes: draggableSlice
    }
})

