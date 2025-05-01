import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    phase: 0,
}

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setPhase: (state, action: PayloadAction<number>) => {
            state.phase = action.payload
        },
    },
})

export const {setPhase} = authSlice.actions;
export default authSlice.reducer;

