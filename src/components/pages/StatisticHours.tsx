import { Grid } from "@mui/material";
import React from "react";
import courseData from "../../config/courseData.json";
import { GridColumns } from '@mui/x-data-grid';
import Statistics from "./Statistics";
const columns: GridColumns = [
    { field: 'from', headerName: 'From (Hours)', flex: 1, headerAlign: "center", align: "center" },
    { field: 'to', headerName: 'To (Hours)', flex: 1, headerAlign: "center", align: "center" },
    { field: 'amount', headerName: 'Amount', flex: 1, headerAlign: "center", align: "center" }
  ];

const StatisticHours: React.FC = () => {
    const { hoursIntervals } = courseData;
    return  <Grid container spacing = {2} justifyContent="center" alignItems="center" sx={{mt: {sm: '-8vw', md: '0'}}}>
                <Grid item xs={12} sx={{textAlign: 'center', fontSize:'1.5em' }}>
                Courses Hours Statistics
                </Grid>
                <Statistics typeStatistics="hours" columns={columns} arrayIntervals={hoursIntervals}/>
            </Grid>
}
export default StatisticHours;