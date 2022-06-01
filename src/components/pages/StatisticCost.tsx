import { Grid } from "@mui/material";
import React from "react";
import courseData from "../../config/courseData.json";
import Statistics from "../statistics/Statistics";

const StatisticCost: React.FC = () => {
    return  (<Grid container spacing = {2} justifyContent="center" alignItems="center" sx={{mt: {sm: '-8vw', md: '0'}}}>
                <Grid item xs={12} sx={{textAlign: 'center', fontSize:'1.5em' }}>
                Courses Cost Statistics
                </Grid>
                <Statistics typeStatistics="cost" arrayIntervals={courseData.costIntervals} unit="ILS"/>
            </Grid>)
}
export default StatisticCost;
