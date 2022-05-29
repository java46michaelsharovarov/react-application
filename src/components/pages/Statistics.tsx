import { Collapse, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store";
import getStatistics, { getStatisticsRows } from "../../util/functions";
import { DataGrid, GridColumns } from '@mui/x-data-grid';
type Props = {
    typeStatistics: keyof Course;
    arrayIntervals: number[];
    columns: GridColumns
}

const Statistics: React.FC<Props> = ({typeStatistics, arrayIntervals, columns}) => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const resObj = getStatistics(courses, typeStatistics); 
    const [statisticsInterval, setStatisticsInterval] = useState("");   
    const [tableVisibility, setTableVisibility] = useState(false);    
    function statisticsCalc(event: any): void {   
        event.preventDefault(); 
        setTableVisibility(true);
     }
     function handlerSelect(event: any) {
        setStatisticsInterval(event.target.value);
    }
    return  <>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <TableContainer component={Paper} sx={{
                        width: { xs:'90vw', sm:'80vw', md: '50vw' },                     
                        textAlign: 'center'}}>
                    {
                        !resObj.min? <label style={{fontSize: "1.5em"}}>No Data</label>
                        : (<Table size='small' sx={{justifyContent: 'center'}}>
                                <TableHead>
                                    <TableRow>
                                    <TableCell align="center">Min</TableCell>
                                    <TableCell align="center">Max</TableCell>
                                    <TableCell align="center">Avg</TableCell>
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
                    : (<Grid item xs={12}>
                        <form  onSubmit={statisticsCalc} style={{ width: '100%'}}>
                        <Grid item xs={12} container spacing = {3} justifyContent="center" alignItems="center">
                            <Grid item xs={8} sm={4} md={3}>
                                <FormControl fullWidth required>
                                    <InputLabel sx={{mt:'-7px'}} id="course-select-label">Intervals</InputLabel>
                                    <Select onFocus={()=> setTableVisibility(false)}
                                        labelId="intervals-select-label"
                                        id="intervals-select"
                                        label="Intervals"
                                        size="small"
                                        value={statisticsInterval}
                                        onChange={handlerSelect}
                                    >
                                        {arrayIntervals.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)}
                                    </Select>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8} sm={4} md={3}>
                                <Button type="submit" fullWidth variant="contained">
                                    Show Statistics
                                </Button>
                            </Grid>    
                        </Grid>
                        </form>
                        </Grid>
                    )
                }
                <Grid item xs={11} sm={10} md={7}>
                <Collapse in={tableVisibility}>
                <Grid sx={{ height: {xs: '50vh', sm: '80vh', md: '50vh'}}}>
                    <DataGrid                    
                        rows={getStatisticsRows(courses, typeStatistics, statisticsInterval)}
                        columns={columns}
                        rowHeight={30}
                    />
                </Grid>
                </Collapse>       
                </Grid>         
            </>
}
export default Statistics;
