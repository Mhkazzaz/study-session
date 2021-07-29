import { createSlice } from '@reduxjs/toolkit'

export const sessionCounterSlice = createSlice({
    name: 'sessionCounter',
    initialState: {
        value: 25
    },
    reducers: {
        incSession: state => {
            if (state.value !== 60) {
                state.value += 1
            }
        },
        decSession: state => {
            if (state.value !== 1) {
                state.value -= 1
            }
        },
        resetSession: state => {
            state.value = 25
        }
    }
})

export const incSessionThunk = () => (dispatch, getState) => {
    const { timer } = getState()
    if (!timer.isPlaying) {
        dispatch(incSession())
    }
}

export const decSessionThunk = () => (dispatch, getState) => {
    const { timer } = getState()
    if (!timer.isPlaying) {
        dispatch(decSession())
    }
}

export const resetSessionThunk = () => (dispatch, getState) => {
    const { timer } = getState()
    if (!timer.isPlaying) {
        dispatch(resetSession())
    }
}

export const sessionCounterSelector = state => state.sessionCounter.value

export const { incSession, decSession, resetSession } = sessionCounterSlice.actions
export default sessionCounterSlice.reducer