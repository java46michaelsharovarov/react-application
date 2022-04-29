import React, { useEffect } from "react";
import { getRandomCourse } from "../../util/randomCourse";
import courseData from "../../config/courseData.json"
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/actions";
import { range } from "../../util/statistic";
let inputElement: any;
const Generation: React.FC = () => {
    useEffect(() => {inputElement = document.getElementById("inputGeneration")}, [])
    const dispatch = useDispatch();
    function coursesGeneration(): void {    
       range(0, inputElement.value).forEach(i => dispatch(addCourse(getRandomCourse(courseData))));
    }
    return  <div>
                <input id="inputGeneration" type="number" required/>
                <button onClick={coursesGeneration}>
                    Generation
                </button>
            </div> 
}
export default Generation;