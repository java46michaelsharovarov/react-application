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
        const intervalId = setInterval(action, 1000)
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
        const index = getRandomNumber(0, courses.length);
        const id = courses[index].id;
        dispatch(removeCourse(id));
    }
    function dispatchUpdate(courses: Course[]) {
        const index = getRandomNumber(0, courses.length);        
        const course = getRandomCourse(courseData);
        course.id = courses[index].id;
        dispatch(updateCourse(course));
    }
}

function getAction(number: number): ImitatorAction {
    for(let i = 0; i < imitatorActions.length; i++) {
        if(number < imitatorActions[i].prob) {
            return imitatorActions[i];
        }
    }
    return imitatorActions[imitatorActions.length - 1];
}
