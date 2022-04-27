
import { createCourse } from "../models/Course";
import { getRandomNumber, getRandomElement, getRandomDate } from "./random";
export function getRandomCourse(courseData: any) {
    const {courses, lecturers, minCost, maxCost, minHours, maxHours, minYear, maxYear, minId, maxId} = courseData;
    return createCourse(getRandomNumber(minId, maxId), 
    getRandomElement(courses), getRandomElement(lecturers),
    getRandomNumber(minHours, maxHours), 
    getRandomNumber(minCost, maxCost), 
    getRandomDate(minYear, maxYear));
}