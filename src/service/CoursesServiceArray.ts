import { Course } from "../models/Course";
import CoursesService from "./CoursesService";
import { getRandomNumber } from "../util/random";
export default class CoursesServiceArray implements CoursesService {
    courses: Course[] = []
    add(course: Course): void {
        const id = getRandomNumber(100000, 999999);
        course.id = id;
        this.courses.push(course); 
    }
    remove(id: number): void {
        const index: number = this.getIndex(id);
        this.courses.splice(index, 1);
    }
    update(id: number, course: Course): void {
        const index: number = this.getIndex(id);
            this.courses[index] = course;
    }
    get(): Course[] {
        return this.courses.slice();
    }
    private getIndex(id: number) {
        const index: number = this.courses.findIndex(e => e.id === id);
        if(index < 0) {
            throw `Error: Course with id ${id} doesn't exist`;
        }
        return index;
    }

}