import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gender: "",
    age: "",
    fever: "",
    seriousSymptom: "",
    otherSymptom: "",
    risk: "",
    additionalRisk: "",

}

const symptomSlice = createSlice({
    name: "symptom",
    initialState,
    reducers: {
        setUserSymptomDetails: (state, action) => {
            state.gender = action.payload.gender;
            state.age = action.payload.age;
            state.fever = action.payload.fever;
            state.seriousSymptom = action.payload.seriousSymptom;
            state.otherSymptom = action.payload.otherSymptom;
            state.risk = action.payload.risk;
            state.additionalRisk = action.payload.additionalRisk;
        },
    }
})

export const { setUserSymptomDetails } = symptomSlice.actions;

export const selectGender = state => state.symptom.gender;
export const selectAge = state => state.symptom.age;
export const selectFever = state => state.symptom.fever;
export const selectSeriousSymptom = state => state.symptom.seriousSymptom;
export const selectOtherSymptom = state => state.symptom.otherSymptom;
export const selectRisk = state => state.symptom.risk;
export const selectAdditionalRisk = state => state.symptom.additionalRisk;

export default symptomSlice.reducer;