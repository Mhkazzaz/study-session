import { createSlice } from "@reduxjs/toolkit";
import { Howl } from 'howler';
import openhat from '../audio/openhat.wav'

export const timerSlice = createSlice({
    name: "timer",
    
    initialState: {
        sessionVal: "25:00",
        breakVal: "05:00",
        isRed: false,
        isBreak: false,
        isPlaying: false,
        isBreakTitle: false,
        interval: null
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

        playSound: () => {
            let sound = new Howl({
                src: [openhat]
            });            
            sound.play();
        },

        switchCountdown: (state, action) => {

            state.isBreak = !state.isBreak
            state.isRed = !state.isRed
            state.isBreakTitle = !state.isBreakTitle
            state.switched = !state.switched

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
            }
        },

        playTrue: state => {
            state.isPlaying = true
        },

        playFalse: state => {
            state.isPlaying = false
        },

        int: (state, action) => {
            state.interval = action.payload
        }
    }

})

export const timerThunk = () => (dispatch, getState) => {

    const { timer } = getState()
    let interval; 

    if (!timer.isPlaying) {
        interval = setInterval(() => {
            const { timer, sessionCounter, breakCounter } = getState()
            if (!timer.isBreak) {
                if (timer.sessionVal === `00:00`) {
                    dispatch(playSound()) 
                    dispatch(switchCountdown(breakCounter.value))
                } else {
                    dispatch(countdown(timer.sessionVal))
                }
            } else {
                if (timer.breakVal === `00:00`) {
                    dispatch(playSound())
                    dispatch(switchCountdown(sessionCounter.value))            
                } else {
                    dispatch(countdown(timer.breakVal))
                }
            }
        }, 1000)

        dispatch(playTrue())
        dispatch(int(interval))

    }  else {
        const { timer } = getState()
        clearInterval(timer.interval)
        dispatch(playFalse())
    }
}

export const setSessionTimerThunk = () => (dispatch, getState) => {
    const { timer, sessionCounter } = getState();
    if (!timer.isPlaying) {
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
    const { timer, breakCounter } = getState();
    if (!timer.isPlaying) {
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
    if (!timer.isPlaying) {
        dispatch(resetSessionTimer())
    }
}

export const sessionTimerSelector = state => state.timer.sessionVal
export const breakTimerSelector = state => state.timer.breakVal
export const isRedSelector = state => state.timer.isRed
export const isBreakSelector = state => state.timer.isBreak
export const isBreakTitleSelector = state => state.timer.isBreakTitle
export const switchedSelector = state => state.timer.switched

export const { setSessionTimer, resetSessionTimer, setBreakTimer, countdown, switchCountdown, playTrue, playFalse, int, playSound } = timerSlice.actions
export default timerSlice.reducer
