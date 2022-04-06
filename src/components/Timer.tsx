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
    }, [])
    return <div style={{marginLeft: '45vw', marginTop: '5vw'}}>
        <h3>{city}</h3>
        <label>{time.toLocaleTimeString('he-IL', {timeZone: timezone})}</label>
    </div>
}
export default Timer;