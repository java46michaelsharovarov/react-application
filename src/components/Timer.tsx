import React, { useEffect, useState } from "react";
type Props = {
    interval?: number,
    timeZone: string
}
const Timer: React.FC<Props> = ({interval, timeZone}) => {
    const [time, setTime] = useState(new Date());
    function tic(): void {
        setTime(new Date());
    }
    useEffect(() => {
        const intervalId = setInterval(tic, interval || 1000);
        return () => clearInterval(intervalId)
    }, [interval])
    return <div>
        <h3>Current time in {timeZone}</h3>
        <label>{time.toLocaleTimeString([], {timeZone})}</label>
    </div>
}
export default Timer;