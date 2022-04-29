import React from "react";
import { useSelector } from "react-redux";
import { Course } from "../../models/Course";
import { StateType } from "../../redux/store"
const Courses: React.FC = () => {
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    return  <ul>
                {courses.map(i => <li key={i.id}>{JSON.stringify(i)}</li>)}
            </ul>
}
export default Courses;