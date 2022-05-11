import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from "@mui/material";

const Courses: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', disableColumnMenu: true, flex:1, minWidth: 70},
        { field: 'name', headerName: 'Name', disableColumnMenu: true, flex:1, minWidth: 140},
        { field: 'lecturer', headerName: 'Lecturer', disableColumnMenu: true, flex:1, minWidth: 80},
        { field: 'hours', headerName: 'Hours', type: 'number', disableColumnMenu: true, flex:1, minWidth: 60},
        { field: 'cost', headerName: 'Cost', type: 'number', disableColumnMenu: true, flex:1, minWidth: 70},
        { field: 'openingDate', headerName: 'Date', disableColumnMenu: true, flex:1, minWidth: 90}        
      ];           
        return (
          <Box sx={{height: '80vh', width: '100%', mt: {sm: '-8vw', md: '0'}}}>
            <DataGrid
              rows={courses}
              columns={columns}
              pageSize={30}
              rowsPerPageOptions={[30]}
              rowHeight={30}
            />
          </Box>
        );
}
export default Courses;