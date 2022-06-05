import { Course } from "../models/Course";
import CoursesService from "./CoursesService";
import { getRandomNumber } from "../util/random";
import { Observable, of } from "rxjs";
import { OperationCode } from "../models/OperationCode";
export default class CoursesServiceArray implements CoursesService {
    courses: Course[] = []
    async add(course: Course): Promise<void> {
        const id = getRandomNumber(100000, 999999);
        course.id = id;
        this.courses.push(course); 
    }
    async remove(id: number): Promise<void> {
        const index: number = this.getIndex(id);
        this.courses.splice(index, 1);
    }
    async update(id: number, course: Course): Promise<void> {
        const index: number = this.getIndex(id);
            this.courses[index] = course;
    }
    async get(): Promise<Course[]> {
        return this.courses.slice();
    }
    private getIndex(id: number) {
        const index: number = this.courses.findIndex(e => e.id === id);
        if(index < 0) {
            throw `Error: Course with id ${id} doesn't exist`;
        }
        return index;
    }    
    setObservableData(): Observable<Course[] | OperationCode> {
        return of(this.courses);
    }
}