import React from "react";
import { getRandomCourse } from "../../util/randomCourse";
import courseData from "../../config/courseData.json"
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/actions";
const AddCourse: React.FC = () => {
    const dispatch = useDispatch();
    return <button onClick={() => dispatch(addCourse(getRandomCourse(courseData)))}>
                Add Course
           </button>
            
}
export default AddCourse;