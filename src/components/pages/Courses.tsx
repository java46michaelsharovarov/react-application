import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Course } from '../../models/Course';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';

const Courses: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const rows = courses;
  return (
    <TableContainer component={Paper} sx={{mt: -3}}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{fontWeight:'bold'}}>ID</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Name</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Lecturer</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Hours</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Cost</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.lecturer}</TableCell>
              <TableCell align="center">{row.hours}</TableCell>
              <TableCell align="center">{row.cost}</TableCell>
              <TableCell align="center">{row.openingDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Courses;
