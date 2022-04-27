import React from "react";
import { coursesService } from "../../config/service-config";
import { getRandomCourse } from "../../util/randomCourse";
import courseData from "../../config/courseData.json"
const AddCourse: React.FC = () => {
    return <button onClick={() => coursesService.add(getRandomCourse(courseData))}>
                Add Course
           </button>
            
}
export default AddCourse;