import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
    name: "timer",
    
    initialState: {
        sessionVal: "25:00",
        breakVal: "05:00",
        isRed: false,
        isBreak: false,
        isPlay: false,
        isBreakTitle: false,
    },

    reducers: {

        setSessionTimer: (state, action) => {
            state.sessionVal = action.payload
        },

        resetSessionTimer: state => {
            state.sessionVal = `25:00`
        },

        setBreakTimer: (state, action) => {
            state.breakVal = action.payload
        },

        countdown: (state, action) => {

            // console.log(`COUNTDOWN SESSION VALUE: ${state.sessionVal}`)

            let mins = (action.payload.split("").slice(0, action.payload.indexOf(":")).join(''))
            let secs = (action.payload.split("").slice(action.payload.indexOf(":") + 1).join(''))

            if (secs === "00") {
                secs = "59"
                mins -= 1
            } else {
                secs -= 1
            }

            if (mins < "01") {
                state.isRed = true
            } else {
                state.isRed = false
            }

            if (String(secs).length === 1) {
                secs = `0${secs}`
            }

            if (String(mins).length === 1) {
                mins = `0${mins}`
            }

            if (state.isBreak) {
                state.breakVal = `${mins}:${secs}`
            } else {
                state.sessionVal = `${mins}:${secs}`
            }
        },

        switchCountdown: (state, action) => {

            state.isBreak = !state.isBreak
            state.isRed = !state.isRed
            state.isBreakTitle = !state.isBreakTitle
            
            if (!state.isBreak) {
                if (String(action.payload).length === 1) {
                    state.sessionVal = `0${action.payload}:00`
                } else {
                    state.sessionVal = `${action.payload}:00`
                }
            }  else {
                if (String(action.payload).length === 1) {
                    state.breakVal = `0${action.payload}:00`
                } else {
                    state.breakVal = `${action.payload}:00`
                }
                // console.log(`FETCHED: ${action.payload}`)
            }
        },

        play: state => {
            state.isPlay = !state.isPlay
        }
    }

})

export const timerThunk = () => (dispatch, getState) => {
    
    const countdownThunk = () => {
        const { timer } = getState()
        const { sessionCounter } = getState()
        const { breakCounter } = getState()

        if (!timer.isPlay) {
            clearInterval(interval)
        } else {
            if (!timer.isBreak) {
                // Session Countdown
                if (timer.sessionVal === `00:00`) {
                    dispatch(switchCountdown(breakCounter.value))
                } else {
                    dispatch(countdown(timer.sessionVal))
                }
            } else {
                // Break Countdown
                if (timer.breakVal === `00:00`) {
                    dispatch(switchCountdown(sessionCounter.value))
                } else {
                    dispatch(countdown(timer.breakVal))
                }
            }
        }
    };

    const interval = setInterval(countdownThunk, 1000)
}



export const setSessionTimerThunk = () => (dispatch, getState) => {
    const { timer } = getState();
    const { sessionCounter } = getState()
    if (!timer.isPlay) {
        if (sessionCounter.value < 10) {
            let sessionValue = `0${sessionCounter.value}:00`
            dispatch(setSessionTimer(sessionValue))
        } else {
            let sessionValue = `${sessionCounter.value}:00`
            dispatch(setSessionTimer(sessionValue))
        }
    }
}

export const setBreakTimerThunk = () => (dispatch, getState) => {
    const { timer } = getState();
    const { breakCounter } = getState()
    if (!timer.isPlay) {
        if (breakCounter.value < 10) {
            let breakValue = `0${breakCounter.value}:00`
            dispatch(setBreakTimer(breakValue))
        } else {
            let breakValue = `${breakCounter.value}:00`
            dispatch(setBreakTimer(breakValue))
        }
    }
}

export const resetSessionTimerThunk = () => (dispatch, getState) => {
    const { timer } = getState();
    if (!timer.isPlay) {
        dispatch(resetSessionTimer())
    }
}

export const sessionTimerSelector = state => state.timer.sessionVal
export const breakTimerSelector = state => state.timer.breakVal
export const isRedSelector = state => state.timer.isRed
export const isBreakSelector = state => state.timer.isBreak
export const isBreakTitleSelector = state => state.timer.isBreakTitle

export const { setSessionTimer, resetSessionTimer, setBreakTimer, countdown, switchCountdown, play } = timerSlice.actions
export default timerSlice.reducer
