import { useDispatch, useSelector } from "react-redux";
import { ImitatorAction, imitatorActions } from "../config/imitator-config";
import { addCourse, removeCourse, updateCourse } from "../redux/actions";
import { getRandomCourse } from "./randomCourse";
import courseData from "../config/courseData.json"
import { getRandomNumber } from "../util/random"
import { Course } from "../models/Course";
import { StateType } from "../redux/store";
import { useEffect } from "react";

export function useImitator() {
    const dispatch = useDispatch();
    const courses: Course[] = useSelector<StateType, Course[]>(state => state.courses);
    useEffect(() => {
        const intervalId = setInterval(action, 500)
        return () => clearInterval(intervalId)
    }, [courses]);    
    function action() {
        const number = getRandomNumber(0, 100);
        const imitatorAction: ImitatorAction = getAction(number);
        switch(imitatorAction.action) {
            case 'add': dispatchAdd(); break;
            case 'remove': dispatchRemove(courses); break;
            case 'update': dispatchUpdate(courses); break;
            default:  break;
        }
    }
    function dispatchAdd() {
        dispatch(addCourse(getRandomCourse(courseData)))
    }
    function dispatchRemove(courses: Course[]) {  
        if(courses.length > 0) {   
        const index = getRandomNumber(0, courses.length - 1);
        const id = courses[index].id;
        dispatch(removeCourse(id));
        }
    }
    function dispatchUpdate(courses: Course[]) {
        if(courses.length > 0) {
        const index = getRandomNumber(0, courses.length - 1);        
        const course = getRandomCourse(courseData);
        course.id = courses[index].id;
        dispatch(updateCourse(course));
        }
    }
}

function getAction(num: number): ImitatorAction {
    return imitatorActions.find(ia => num <= ia.prob) ?? imitatorActions[imitatorActions.length - 1]
}
