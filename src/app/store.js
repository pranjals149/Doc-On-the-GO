import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import expertReducer from '../features/expert/expertSlice'
import symptomReducer from '../features/symptom/symptomSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        expert: expertReducer,
        symptom: symptomReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});