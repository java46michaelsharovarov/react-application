import React from "react";
import getStatistics from "../../util/statistic";
const StatisticHours: React.FC = () => {
    const resObj = getStatistics('hours');
    return  <div style={{width:'100vw', display: 'flex', justifyContent: 'space-around'}}>
                <div>Min Hours = {resObj.min}</div>
                <div>Max Hours = {resObj.max}</div>
                <div>Avg Hours = {resObj.avg}</div>
            </div>
}
export default StatisticHours;