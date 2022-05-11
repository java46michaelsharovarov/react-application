import React, { useEffect } from "react";
import { getRandomCourse } from "../../util/randomCourse";
import courseData from "../../config/courseData.json"
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/actions";
import { range } from "../../util/functions";
import { Button, TextField } from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
let inputElement: any;
const Generation: React.FC = () => {
    useEffect(() => {inputElement = document.getElementById("inputGeneration")}, [])
    const dispatch = useDispatch();
    function coursesGeneration(): void {    
       range(0, inputElement.value).forEach(i => dispatch(addCourse(getRandomCourse(courseData))));
    }
    return  <div>
                <TextField id="inputGeneration" size="small" type="number" label="Enter the number of courses" variant="outlined" required/>
                <Button onClick={coursesGeneration} variant="contained" endIcon={<PlaylistAddIcon />} sx={{ ml: 2, mt: 0.3 }}>
                    Generation
                </Button>
            </div> 
}
export default Generation;