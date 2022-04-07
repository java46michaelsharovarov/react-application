import React, { useEffect, useState } from "react";
type Props = {
    interval?: number,
    city: string,
    timeZone: string
}
const Timer: React.FC<Props> = ({interval, city, timeZone}) => {
    const [time, setTime] = useState(new Date());
    function tic(): void {
        setTime(new Date());
    }
    useEffect(() => {
        setInterval(tic, interval || 1000);
    }, [interval])
    return <div style={{marginTop: '5vw', textAlign: 'center'}}>
        <h3>{city}</h3>
        <label>{time.toLocaleTimeString('he-IL', {timeZone})}</label>
    </div>
}
export default Timer;