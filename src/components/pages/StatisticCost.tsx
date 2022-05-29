import { Collapse, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store";
import getStatistics, { getStatisticsRows } from "../../util/functions";
import courseData from "../../config/courseData.json";
import { DataGrid, GridColumns } from '@mui/x-data-grid';
const columns: GridColumns = [
    { field: 'from', headerName: 'From (ILS)', flex: 1, headerAlign: "center", align: "center" },
    { field: 'to', headerName: 'To (ILS)', flex: 1, headerAlign: "center", align: "center" },
    { field: 'amount', headerName: 'Amount', flex: 1, headerAlign: "center", align: "center" }
  ];
let inputElement: any;

const StatisticCost: React.FC = () => {
    useEffect(() => {inputElement = document.getElementById("intervals-select")}, [])
    const { costIntervals } = courseData;
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const resObj = getStatistics(courses, 'cost'); 
    const [statisticsInterval, setStatisticsInterval] = useState(100);   
    const [tableVisibility, setTableVisibility] = useState(false);    
    function statisticsCalc(): void {    
        setStatisticsInterval(+inputElement.textContent);
        setTableVisibility(true);
     }
    return  <Grid container spacing = {2} justifyContent="center" alignItems="center" sx={{mt: {sm: '-8vw', md: '0'}}}>
                <Grid item xs={12} sx={{textAlign: 'center', fontSize:'1.5em' }}>
                Courses Cost Statistics
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <TableContainer component={Paper} sx={{
                        width: { xs:'90vw', sm:'80vw', md: '50vw' },                     
                        textAlign: 'center'}}>
                    {
                        !resObj.min? <label style={{fontSize: "1.5em"}}>No Data</label>
                        : (<Table size='small' sx={{justifyContent: 'center'}}>
                                <TableHead>
                                    <TableRow>
                                    <TableCell align="center">Min Cost</TableCell>
                                    <TableCell align="center">Max Cost</TableCell>
                                    <TableCell align="center">Avg Cost</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={resObj.avg}>
                                        <TableCell align="center">{resObj.min}</TableCell>
                                        <TableCell align="center">{resObj.max}</TableCell>
                                        <TableCell align="center">{resObj.avg}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )
                    }
                    </TableContainer>
                </Grid>    
                {
                    !resObj.min? ""
                    : (<Grid item xs={12} container spacing = {1} justifyContent="center" alignItems="center">
                            <Grid item xs={8} sm={4} md={3}>
                                <FormControl fullWidth required>
                                    <InputLabel sx={{mt:'-7px'}} id="course-select-label">Intervals</InputLabel>
                                    <Select onFocus={()=> setTableVisibility(false)}
                                        labelId="intervals-select-label"
                                        id="intervals-select"
                                        label="Intervals"
                                        size="small"
                                    >
                                        {costIntervals.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)}
                                    </Select>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8} sm={4} md={3}>
                                <Button
                                onClick={statisticsCalc} 
                                fullWidth variant="contained">
                                    Show Statistics
                                </Button>
                            </Grid>    
                        </Grid>
                    )
                }
                <Grid item xs={11} sm={10} md={7}>
                <Collapse in={tableVisibility}>
                <Grid sx={{ height: {xs: '50vh', sm: '80vh', md: '50vh'}}}>
                    <DataGrid                    
                        rows={getStatisticsRows(courses, 'cost', statisticsInterval)}
                        columns={columns}
                        rowHeight={30}
                    />
                </Grid>
                </Collapse>       
                </Grid>         
            </Grid>
}
export default StatisticCost;
