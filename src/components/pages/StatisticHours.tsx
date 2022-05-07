import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store";
import getStatistics from "../../util/statistic";
const StatisticHours: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const resObj = getStatistics(courses, 'hours');
    return  <TableContainer component={Paper} style={{width:'50vw', textAlign: 'center'}}>
                {
                    !resObj.min? <label style={{fontSize: "1.5em"}}>No Data</label>
                    : (<Table size='small'>
                            <TableHead>
                                <TableRow>
                                <TableCell align="center">Min Hours</TableCell>
                                <TableCell align="center">Max Hours</TableCell>
                                <TableCell align="center">Avg Hours</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={resObj.avg}>
                                    <TableCell align="center">{resObj.min}</TableCell>
                                    <TableCell align="center">{resObj.max}</TableCell>
                                    <TableCell align="center">{resObj.avg}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>)
                }
            </TableContainer>
}
export default StatisticHours;