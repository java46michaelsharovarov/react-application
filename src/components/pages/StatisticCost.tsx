import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store";
import getStatistics from "../../util/statistic";
const StatisticCost: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const resObj = getStatistics(courses, 'cost');    
    return  <div style={{width:'100vw', display: 'flex', justifyContent: 'space-around'}}>
                {
                    resObj.min? <><div>Min Cost = {resObj.min}</div>
                                  <div>Max Cost = {resObj.max}</div>
                                  <div>Avg Cost = {resObj.avg}</div>
                                </>
                                : <label style={{fontSize: "2em"}}>(No Data)</label>
                }                
            </div>
}
export default StatisticCost;