import { Grid } from "@mui/material";
import React from "react";
import courseData from "../../config/courseData.json";
import Statistics from "../statistics/Statistics";

const StatisticHours: React.FC = () => {
    return  (<Grid container spacing = {2} justifyContent="center" alignItems="center" sx={{mt: {sm: '-8vw', md: '0'}}}>
                <Grid item xs={12} sx={{textAlign: 'center', fontSize:'1.5em' }}>
                Courses Hours Statistics
                </Grid>
                <Statistics typeStatistics="hours" arrayIntervals={courseData.hoursIntervals} unit="Hours"/>
            </Grid>)
}
export default StatisticHours;