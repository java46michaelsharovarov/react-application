import React from "react";
import { getRandomCourse } from "../../util/randomCourse";
import courseData from "../../config/courseData.json"
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/actions";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const AddCourse: React.FC = () => {
    const dispatch = useDispatch();
    return <Button onClick={() => dispatch(addCourse(getRandomCourse(courseData)))} variant="contained" endIcon={<AddIcon />}>
                Add Course
           </Button>
}
export default AddCourse;