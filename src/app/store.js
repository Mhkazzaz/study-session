import { configureStore } from '@reduxjs/toolkit'
import sessionCounterReducer from '../redux/sessionCounterSlice'
import breakCounterReducer from '../redux/breakCounterSlice'
import timerReducer from '../redux/timerSlice'



export default configureStore({
    reducer: {
        sessionCounter: sessionCounterReducer,
        breakCounter: breakCounterReducer,
        timer: timerReducer
    }, 
    
})