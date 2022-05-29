import { Grid } from "@mui/material";
import React from "react";
import courseData from "../../config/courseData.json";
import { GridColumns } from '@mui/x-data-grid';
import Statistics from "./Statistics";
const columns: GridColumns = [
    { field: 'from', headerName: 'From (ILS)', flex: 1, headerAlign: "center", align: "center" },
    { field: 'to', headerName: 'To (ILS)', flex: 1, headerAlign: "center", align: "center" },
    { field: 'amount', headerName: 'Amount', flex: 1, headerAlign: "center", align: "center" }
  ];

const StatisticCost: React.FC = () => {
    const { costIntervals } = courseData;
    return  <Grid container spacing = {2} justifyContent="center" alignItems="center" sx={{mt: {sm: '-8vw', md: '0'}}}>
                <Grid item xs={12} sx={{textAlign: 'center', fontSize:'1.5em' }}>
                Courses Cost Statistics
                </Grid>
                <Statistics typeStatistics="cost" columns={columns} arrayIntervals={costIntervals}/>
            </Grid>
}
export default StatisticCost;
