import React from "react";
import { Course, createCourse } from "../../models/Course";
import courseData from "../../config/courseData.json";
import { Grid, Select, TextField, FormControl, InputLabel, MenuItem, Button } from "@mui/material";
type Props = {
    submitFn: (course: Course) => void;
}
const initialCourse: Course = createCourse(0, "", "", 0, 0, "");

const CourseForm: React.FC<Props> = ({ submitFn }) => {
    const { courses, lecturers, minCost, maxCost, minHours, maxHours } = courseData;
    const [course, setCourse] = React.useState(initialCourse);
    function onSubmit(event: any) {
        event.preventDefault();
        submitFn(course);
        onReset();
    }
    function onReset() {
        setCourse(initialCourse);
    }
    function handlerCourse(event: any) {
        const courseCopy = { ...course };
        courseCopy.name = event.target.value;
        setCourse(courseCopy);
    }
    function handlerLecturer(event: any) {
        const courseCopy = { ...course };
        courseCopy.lecturer = event.target.value;
        setCourse(courseCopy);
    }
    function handlerHours(event: any) {
        const courseCopy = { ...course };
        courseCopy.hours = +event.target.value;
        setCourse(courseCopy);
    }
    function handlerCost(event: any) {
        const courseCopy = { ...course };
        courseCopy.cost = +event.target.value;
        setCourse(courseCopy);
    }
    function handlerDate(event: any) {
        const courseCopy = { ...course };
        courseCopy.openingDate = event.target.value;
        setCourse(courseCopy);
    }
    return <form onSubmit={onSubmit} onReset={onReset} style={{ width: '80%', display: 'flex' }}>
        <Grid container sx={{mt: {sm: '-10vw', md: '0'}}} spacing={{ xs: 4, sm: 2, md: 4 }} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} >
                <FormControl fullWidth required>
                    <InputLabel id="course-select-label">Course Name</InputLabel>
                    <Select
                        labelId="course-select-label"
                        id="course-select"
                        label="Course Name"
                        value={course.name}
                        onChange={handlerCourse}
                    >
                        {getCourseItems(courses)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} >
                <FormControl fullWidth required>
                    <InputLabel id="lecturer-select-label">Lecturer</InputLabel>
                    <Select
                        labelId="lecturer-select-label"
                        id="lecturer-select"
                        label="Lecturer"
                        value={course.lecturer}
                        onChange={handlerLecturer}
                    >
                        {getCourseItems(lecturers)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField type="number" label="Hours" fullWidth required value={course.hours || ""}
                    onChange={handlerHours}
                    inputProps={{
                        min: `${minHours}`,
                        max: `${maxHours}`
                    }}
                    helperText="Enter number of hours in range [80-500]" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField type="number" label="Cost" fullWidth required value={course.cost || ""}
                    onChange={handlerCost}
                    inputProps={{
                        min: `${minCost}`,
                        max: `${maxCost}`
                    }}
                    helperText="Enter cost in range [5000-30000]" />
            </Grid>
            <Grid item xs={10}>
                <TextField type="date" label="Date" fullWidth required value={course.openingDate || ""}
                    onChange={handlerDate}
                    InputLabelProps={{
                        shrink: true,
                      }}
                />
            </Grid>
            <Grid item xs={3}>
                <Button fullWidth variant="contained" type="submit">Submit</Button>
            </Grid>
            <Grid item xs={3}>
                <Button fullWidth variant="contained" type="reset">Reset</Button>
            </Grid>
        </Grid>
    </form>
}
export default CourseForm;

function getCourseItems(items: string[]): React.ReactNode {
    return items.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)
}