import { FaArrowUp, FaArrowDown, FaPause, FaPlay, FaRedo } from 'react-icons/fa';

const Presentation = ()  => {
    return (
        <>
            <div id="container">
                <h1 id="title">25 + 5 Clock</h1>
                <div id="length-wrapper">
                    <div id="break">
                        <h3>Break Length</h3>
                        <div className="control">
                            <FaArrowDown className="icons"/>
                            <span className="duration">5</span>
                            <FaArrowUp className="icons"/>
                        </div>
                    </div>
                    <div id="session">
                        <h3>Session Length</h3>
                        <div className="control">
                            <FaArrowDown className="icons"/>
                            <span className="duration">25</span>
                            <FaArrowUp className="icons"/>
                        </div>  
                    </div>
                </div>
                <div id="timer">
                    <span>Session</span>
                    <span id="countdown">25:00</span>
                </div>
                <div id="icons">
                    <FaPlay className="icons"/>
                    <FaPause className="icons"/>
                    <FaRedo id="repeat" className="icons"/>
                </div>
                {/* <div id="title"></div>
                <div id="length">
                    <div id="break"></div>
                    <div id="session"></div>
                </div> */}
            </div>
        </>
    )
}

export default Presentation