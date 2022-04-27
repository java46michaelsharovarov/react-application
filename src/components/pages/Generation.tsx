import React from "react";
import { coursesService } from "../../config/service-config";
import { getRandomCourse } from "../../util/randomCourse";
import courseData from "../../config/courseData.json"
const Generation: React.FC = () => {
    function coursesGeneration(): void {       
        let inputElement: any = document.getElementById("inputGeneration");
        for(let i = 0; i < inputElement.value; i++) {
            coursesService.add(getRandomCourse(courseData));
        }
    }
    return  <div>
                <input id="inputGeneration" type="number" required/>
                <button onClick={() => coursesGeneration()}>
                    Generation
                </button>
            </div> 
}
export default Generation;