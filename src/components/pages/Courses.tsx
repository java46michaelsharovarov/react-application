import React from "react";
import { coursesService } from "../../config/service-config";
const Courses: React.FC = () => {
    return  <ul>
                {coursesService.get().map(i => <li key={i.id}>{JSON.stringify(i)}</li>)}
            </ul>
}
export default Courses;