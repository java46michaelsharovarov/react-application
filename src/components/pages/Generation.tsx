import React, { useEffect } from "react";
import { getRandomCourse } from "../../util/randomCourse";
import courseData from "../../config/courseData.json"
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/actions";
import { range } from "../../util/functions";
import { Button, Grid, TextField } from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Link as RouterLink} from "react-router-dom";
import { COURSES_PATH } from "../../config/routes-config";
let inputElement: any;

const Generation: React.FC = () => {
    useEffect(() => {inputElement = document.getElementById("inputGeneration")}, [])
    const dispatch = useDispatch<any>();
    function coursesGeneration(): void {    
       range(0, inputElement.value).forEach(i => dispatch(addCourse(getRandomCourse(courseData))));
    }
    return  (<Grid container maxWidth="sm" spacing = {4} justifyContent="center" alignItems="center">
                <Grid item xs={10} sm={6}>
                    <TextField id="inputGeneration" fullWidth size="small" type="number"
                         label="Enter the number of courses" variant="outlined" required/>                    
                </Grid>
                <Grid item xs={10} sm={6}>
                    <Button onClick={coursesGeneration} 
                     key={COURSES_PATH} component={RouterLink} to={COURSES_PATH} 
                     fullWidth variant="contained" endIcon={<PlaylistAddIcon />}>
                        Generation
                    </Button>
                </Grid>    
            </Grid> )
}
export default Generation;