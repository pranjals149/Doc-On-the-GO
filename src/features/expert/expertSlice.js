import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: "",
    password: "",
}

const expertSlice = createSlice({
    name: "expert",
    initialState,
    reducers: {
        setExpertLoginDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        },

        setExpertSignoutDetails: (state) => {
            state.id = null;
            state.email = null;
        },
    }
})

export const { setExpertLoginDetails, setExpertSignoutDetails } = expertSlice.actions;

export const selectExpertEmail = state => state.expert.email;
export const selectExpertPassword = state => state.expert.password;

export default expertSlice.reducer;