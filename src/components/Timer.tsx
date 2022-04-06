import React, { useEffect } from "react";
type Props = {
    interval?: number,
    city: string,
    timezone: string
}
const Timer: React.FC<Props> = ({interval, city, timezone}) => {
    const [time, setTime] = React.useState(new Date());
    function tic(): void {
        setTime(new Date());
    }
    useEffect(() => {
        setInterval(tic, interval || 1000);
    }, [interval])
    return <div style={{marginTop: '5vw', textAlign: 'center'}}>
        <h3>{city}</h3>
        <label>{time.toLocaleTimeString('he-IL', {timeZone: timezone})}</label>
    </div>
}
export default Timer;