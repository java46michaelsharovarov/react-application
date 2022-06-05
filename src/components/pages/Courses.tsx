import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store"
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
import { Box, List, ListItem, Modal, useMediaQuery } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { removeCourse, updateCourse } from "../../redux/actions";
import CourseForm from "../forms/CourseForm";
import ActionConfirmation from "../dialogs/ActionConfirmation";
import ConfirmationData from "../../models/ConfirmationData";
import { getCanonicalLocalDate } from "../../util/functions";
import { ClientData } from "../../models/ClientData";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
let isLaptopOrDesktop: boolean;
let isMobileOrTablet: boolean;
function getColumns(actionsFn: (params: GridRowParams) => JSX.Element[]): GridColumns {
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5, hide: !isLaptopOrDesktop },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'lecturer', headerName: 'Lecturer', flex: 0.7, hide: !isMobileOrTablet },
    { field: 'hours', headerName: 'Hours', type: 'number', flex: 0.5, hide: !isLaptopOrDesktop },
    { field: 'cost', headerName: 'Cost', type: 'number', flex: 0.5, hide: !isLaptopOrDesktop },
    { field: 'openingDate', headerName: 'Date', type: 'date', flex: 0.7 },
    { field: "actions", type: "actions", flex: 0.6, align: "center", getActions: actionsFn }
  ];
  return columns;
}

const Courses: React.FC = () => {
  const dispatch = useDispatch<any>();
  const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
  const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
  const [isEdit, setEdit] = useState(false);
  const [flOpen, setFlOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const confirmationData = useRef<ConfirmationData>({ title: '', content: '', confirmHandler: () => { } });
  const updatedCourse = useRef<Course>();
  const shownCourse = useRef<Course>();
  isLaptopOrDesktop = useMediaQuery('(min-width: 900px)');
  isMobileOrTablet = useMediaQuery('(min-width: 600px)');

  function getActions(params: GridRowParams): JSX.Element[] {
    const actionElements: JSX.Element[] = [
      <GridActionsCellItem label="Details" showInMenu= {!isMobileOrTablet}
        onClick={showDetails.bind(undefined, params.id as number)} icon={<Visibility />} />
      ]
      clientData.isAdmin && actionElements.push(    
      <GridActionsCellItem label="Edit" showInMenu= {!isMobileOrTablet}
        onClick={() => editFn(params.id as number)} icon={<Edit />} />,
      <GridActionsCellItem label="Remove" showInMenu= {!isMobileOrTablet}
        onClick={() => {showRemoveConfirmation(params.id as number)}} icon={<Delete />} />)
    return actionElements;
  }
  function showDetails(id: number) {
    shownCourse.current = courses.find(c => c.id === id);
    setModalOpen(true);
  }
  function editFn(id: number) {
    updatedCourse.current = courses.find(c => c.id === id);
    setEdit(true);
  }
  function showRemoveConfirmation(id: number) {
    confirmationData.current.confirmHandler = removeAction.bind(undefined, id);
    confirmationData.current.title = 'Deleting course';
    confirmationData.current.content = `Delete the course with id "${id}" ?`;
    setFlOpen(true);
  }
  function showUpdateConfirmation(course: Course) {
    confirmationData.current.confirmHandler = updateAction.bind(undefined, course);
    confirmationData.current.title = 'Updating course';
    confirmationData.current.content = `Update course data with id:${course.id} to
     ( name: ${course.name}, lecturer: ${course.lecturer}, hours: ${course.hours},
       cost: ${course.cost}, 
       date: ${getCanonicalLocalDate(course.openingDate)} ) ?`;
    setFlOpen(true);
  }
  function removeAction(id: number, flConfirm: boolean): void {
    if (flConfirm) {
      dispatch(removeCourse(id));
    }
    setFlOpen(false);
  }
  function updateAction(course: Course, flConfirm: boolean): void {
    if (flConfirm) {
      dispatch(updateCourse(course));
    }
    setFlOpen(false);
  }
  const getColumnsCallback = useCallback(getColumns, [courses]);
  const columns = getColumnsCallback(getActions);
  return (
    <>
      {isEdit ?
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CourseForm
              submitFn={(course: Course) => { 
                if(JSON.stringify(course) !== JSON.stringify(updatedCourse.current)){
                  showUpdateConfirmation(course); 
                }
                setEdit(false) }}
              courseUpdate={updatedCourse.current} />
          </Box>
        : <Box sx={{ width: { xs: '100%', sm: '90%' },
                     mt: { sm: '-8vw', md: '0' } }}>
          <DataGrid
            rows={courses}
            columns={columns}
            rowHeight={30}
            autoHeight={true}
          />
        </Box>
      }
      <ActionConfirmation
        open={flOpen} title={confirmationData.current?.title || ''}
        content={confirmationData.current?.content || ''}
        confirmHandler={confirmationData.current.confirmHandler} />
      <Modal
        open={modalOpen}
        onClose={()=> setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List>
            {shownCourse.current && Object.entries(shownCourse.current as any)
            .map(e => <ListItem key={e[0]}>{`${e[0]}: ${e[1]}`}</ListItem>)}
          </List>
        </Box>
      </Modal>
    </>
  );
}
export default Courses;
