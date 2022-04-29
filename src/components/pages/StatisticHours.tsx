import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store";
import getStatistics from "../../util/statistic";
const StatisticHours: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const resObj = getStatistics(courses, 'hours');
    return  <div style={{width:'100vw', display: 'flex', justifyContent: 'space-around'}}>
                {
                    resObj.min? <><div>Min Hours = {resObj.min}</div>
                                  <div>Max Hours = {resObj.max}</div>
                                  <div>Avg Hours = {resObj.avg}</div>
                                </>
                                : <label style={{fontSize: "2em"}}>(No Data)</label>
                }                
            </div>
}
export default StatisticHours;