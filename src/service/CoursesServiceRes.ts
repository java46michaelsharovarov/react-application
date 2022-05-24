import { Course } from "../models/Course";
import CoursesService from "./CoursesService";

export default class CoursesServiceRes implements CoursesService {
    constructor(private url: any) {}
    async add(course: Course): Promise<void> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(course)
        })
        return await response.json();
    }    
    async remove(id: number): Promise<void> {
        await fetch(this.getUrlById(id), {
            method: 'DELETE'
        })
    }
    async update(id: number, course: Course): Promise<void> {
        const response = await fetch(this.getUrlById(id), {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(course)
        })
        return await response.json();
    }
    async get(): Promise<Course[]> {
        const response = await fetch(this.url);
        const courses =  await response.json();
        return courses.map((c: Course) => {
            c.openingDate = new Date(c.openingDate);
            return c;
        });
    }
    private getUrlById(id: number) {
        return `${this.url}/${id}`;
    }
}