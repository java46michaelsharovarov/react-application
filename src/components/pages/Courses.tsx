import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store"
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { removeCourse, updateCourse } from "../../redux/actions";
import CourseForm from "../forms/CourseForm";
function getColumns(actionsFn: (params: GridRowParams)=>JSX.Element[]): GridColumns {
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70},
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 140},
    { field: 'lecturer', headerName: 'Lecturer', flex: 0.7, minWidth: 80},
    { field: 'hours', headerName: 'Hours', type: 'number', flex: 0.5, minWidth: 60},
    { field: 'cost', headerName: 'Cost', type: 'number', flex: 0.5, minWidth: 70},
    { field: 'openingDate', headerName: 'Date', type: 'date', flex: 0.7, minWidth: 100},
    { field: "actions", type: "actions", flex: 0.5, getActions: actionsFn}        
  ]; 
  return columns;
} 
let course: Course;

const Courses: React.FC = () => {
  const dispatch = useDispatch();
  const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses); 
  const [isEdit, setEdit] = useState(false);
  
  
  function getActions(params: GridRowParams): JSX.Element[] {
    const actionElements: JSX.Element[] = [
      <GridActionsCellItem label = "Remove" showInMenu onClick= {()=> dispatch(removeCourse(params.id as number))} icon = {<Delete/>}/>,
      <GridActionsCellItem label = "Edit" showInMenu onClick= {()=> editFn(params.id as number)} icon = {<Edit/>}/>
    ]
    return actionElements;
  }      
  function editFn(id: number) {
    const index = courses.findIndex(course => id === course.id);
    course = courses[index]; 
    setEdit(true);
  }
  const getColumnsCallback = useCallback(getColumns, [courses]);
  const columns = getColumnsCallback(getActions);    
      return (
          <>
          {isEdit ? 
            <CourseForm submitFn={(course: Course) => {dispatch(updateCourse(course)); setEdit(false)}} passCourse={course}/> 
            : <Box sx={{height: '80vh', width: {xs: '100%', sm: '90%'}, mt: {sm: '-8vw', md: '0'}}}>
                <DataGrid
                  rows={courses}
                  columns={columns}            
                  rowHeight={30}
                />
              </Box> 
          }               
          </>
      );
}
export default Courses;