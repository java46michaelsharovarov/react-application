import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Courses: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', disableColumnMenu: true, flex:1},
        { field: 'name', headerName: 'Name', disableColumnMenu: true, flex:1},
        { field: 'lecturer', headerName: 'Lecturer', disableColumnMenu: true, flex:1},
        { field: 'hours', headerName: 'Hours', type: 'number', disableColumnMenu: true, flex:1},
        { field: 'cost', headerName: 'Cost', type: 'number', disableColumnMenu: true, flex:1},
        { field: 'openingDate', headerName: 'Date', disableColumnMenu: true, flex:1}        
      ];           
        return (
          <div style={{width: '100%', marginTop: '-5vw'}}>
            <DataGrid
              rows={courses}
              columns={columns}
              pageSize={20}
              autoHeight
              rowHeight={30}
            />
          </div>
        );
}
export default Courses;