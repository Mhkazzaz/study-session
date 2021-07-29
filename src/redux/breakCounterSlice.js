import { createSlice } from "@reduxjs/toolkit";

export const breakCounterSlice = createSlice({
    name: "breakCounter",
    initialState: {
        value: 5
    },
    reducers: {
        incBreak: state => {
            if (state.value !== 60) {
                state.value += 1
            }
        },
        decBreak: state => {
            if (state.value !== 1) {
                state.value -= 1
            }
        }, 
        resetBreak: state => {
            state.value = 5
        }
    }
})

export const incBreakThunk = () => (dispatch, getState) => {
    const { timer } = getState()
    if (!timer.isPlaying) {
        dispatch(incBreak())
    }
}

export const decBreakThunk = () => (dispatch, getState) => {
    const { timer } = getState()
    if (!timer.isPlaying) {
        dispatch(decBreak())
    }
}

export const resetBreakThunk = () => (dispatch, getState) => {
    const { timer } = getState()
    if (!timer.isPlaying) {
        dispatch(resetBreak())
    }
}

export const breakCounterSelector = state => state.breakCounter.value

export const { incBreak, decBreak, resetBreak } = breakCounterSlice.actions
export default breakCounterSlice.reducer