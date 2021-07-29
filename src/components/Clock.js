import { FaArrowUp, FaArrowDown, FaPause, FaPlay, FaRedo } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { incSessionThunk, decSessionThunk, resetSessionThunk, sessionCounterSelector } from '../redux/sessionCounterSlice';
import { incBreakThunk, decBreakThunk, resetBreakThunk, breakCounterSelector } from '../redux/breakCounterSlice';
import { 
         setSessionTimerThunk,
         setBreakTimerThunk,
         resetSessionTimerThunk,
         timerThunk,
         play,
         sessionTimerSelector,
         breakTimerSelector,
         isRedSelector,
         isBreakSelector,
         isBreakTitleSelector,
        } from '../redux/timerSlice';

const Clock = ()  => {

    const sessionCount = useSelector(sessionCounterSelector)
    const breakCount = useSelector(breakCounterSelector)
    const sessionTimer = useSelector(sessionTimerSelector)
    const breakTimer = useSelector(breakTimerSelector)
    const isRed = useSelector(isRedSelector)
    const isBreak = useSelector(isBreakSelector)
    const isBreakTitle = useSelector(isBreakTitleSelector)

    const dispatch = useDispatch();

    return (
        <>
            <div id="container">
                <h1 id="title">25 + 5 Clock</h1>
                <div id="length-wrapper">
                    <div id="break">
                        <h3>Break Length</h3>
                        <div className="control">
                            <button><FaArrowDown onClick={() => { dispatch(decBreakThunk()); dispatch(setBreakTimerThunk()) }} className="icons" /></button>
                            <span className="duration" id="break-count">{breakCount}</span>
                            <button><FaArrowUp onClick={() => { dispatch(incBreakThunk()); dispatch(setBreakTimerThunk()) }} className="icons" /></button>
                        </div>
                    </div>
                    <div id="session">
                        <h3>Session Length</h3>
                        <div className="control">
                            <button><FaArrowDown onClick={() => { dispatch(decSessionThunk()); dispatch(setSessionTimerThunk()) }} className="icons" /></button>
                            <span className="duration" id="session-count">{sessionCount}</span>
                            <button><FaArrowUp onClick={() => { dispatch(incSessionThunk()); dispatch(setSessionTimerThunk()) }} className="icons" /></button>
                        </div>  
                    </div>
                </div>
                <div id="timer">
                    <span style={isRed ? { color: "red" } : { color: "white" }}>{isBreakTitle? "Break" : "Session"}</span>
                    <span id="countdown" style={isRed ? { color: "red" } : { color: "white" }}>{isBreak? breakTimer : sessionTimer}</span>
                </div>
                <div id="icons">
                    <button id="play-btn" onClick={() => { dispatch(timerThunk()); dispatch(play()) }}>
                    <FaPlay  className="icons"/>
                    <FaPause className="icons"/>
                    </button>
                    <button><FaRedo onClick={() => { dispatch(resetSessionThunk()); dispatch(resetBreakThunk()); dispatch(resetSessionTimerThunk()) }} id="repeat" className="icons" /></button>
                </div>
            </div>
        </>
    )
}

export default Clock