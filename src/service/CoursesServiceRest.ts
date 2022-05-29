import { Course } from "../models/Course";
import { AUTH_TOKEN_ITEM } from "./AuthServiceJwt";
import CoursesService from "./CoursesService";

function getHeaders(): any {
    return {Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN_ITEM),
    "Content-Type": "application/json"}
}
export default class CoursesServiceRest implements CoursesService {
    constructor(private url: string) {}
    async add(course: Course): Promise<void> {
        (course as any).userId = 1;
        const response = await fetch(this.url, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(course)
        })
        return await response.json();
    }    
    async remove(id: number): Promise<void> {
        await fetch(this.getUrlById(id), {
            method: 'DELETE', 
            headers: getHeaders(),
        })
    }
    async update(id: number, course: Course): Promise<void> {
        const response = await fetch(this.getUrlById(id), {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(course)
        })
        return await response.json();
    }
    async get(): Promise<Course[]> {
        const response = await fetch(this.url, {
            headers: getHeaders()
        });
        const courses =  await response.json();
        return courses.map((c: Course) =>
            ({...c, openingDate: new Date(c.openingDate)}));
    }
    private getUrlById(id: number) {
        return `${this.url}/${id}`;
    }
}