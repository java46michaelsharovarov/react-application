import React from "react";
import getStatistics from "../../util/statistic";
const StatisticCost: React.FC = () => {
    const resObj = getStatistics('cost');
    return  <div style={{width:'100vw', display: 'flex', justifyContent: 'space-around'}}>
                <div>Min Cost = {resObj.min}</div>
                <div>Max Cost = {resObj.max}</div>
                <div>Avg Cost = {resObj.avg}</div>
            </div>
}
export default StatisticCost;