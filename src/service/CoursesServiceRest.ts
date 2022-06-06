import { Observable, Subscriber } from "rxjs";
import { Course } from "../models/Course";
import { OperationCode } from "../models/OperationCode";
import { AUTH_TOKEN_ITEM } from "./AuthServiceJwt";
import CoursesService from "./CoursesService";
let intervalId: any;
      
function getHeaders(): any {
    return {Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN_ITEM),
    "Content-Type": "application/json"}
}
const POLLING_INTERVAL = 10000;
async function responseProcessing(response: Response): Promise<any> {
    if (response.status < 400) {
        return await response.json();
    }
    if (response.status === 401 || response.status === 403) {
        throw OperationCode.AUTH_ERROR;
    }
    throw OperationCode.UNKNOWN;
}
export default class CoursesServiceRest implements CoursesService {
    private observable: Observable<Course[] | OperationCode> | undefined;
    private observer: Subscriber<Course[] | OperationCode> | undefined;
    private coursesJson: string = '';
    constructor(private url: string) {}
    getObservableData(): Observable<Course[] | OperationCode> {  
        if (!this.observable) {
            this.observable = new Observable(observer => {
                this.observer = observer;
                this.observing();
                if(intervalId) {
                    clearInterval(intervalId);
                }
                intervalId = setInterval(this.observing.bind(this), POLLING_INTERVAL);
                return ()=> clearInterval(intervalId);
            })
        } 
        return this.observable;
    }
    private observing() {
        this.get().then(courses => {
            if (this.coursesJson !== JSON.stringify(courses)) {
                this.observer?.next(courses)
                this.coursesJson = JSON.stringify(courses);
            }            
        })
        .catch(err => {
            if (err == OperationCode.UNKNOWN){
                this.observer?.next(OperationCode.UNKNOWN)
                this.observer?.complete();
            } else {
                this.coursesJson = '';
                this.observer?.next(err)
            }            
        })
    }
    async add(course: Course): Promise<void> {
        (course as any).userId = 1;
        let response;
        try {
            response = await fetch(this.url, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(course)
            })
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        responseProcessing(response);
    }    
    async remove(id: number): Promise<void> {
        let response;
        try {
            response = await fetch(this.getUrlById(id), {
                method: 'DELETE', 
                headers: getHeaders(),
            })
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        responseProcessing(response);
    }
    async update(id: number, course: Course): Promise<void> {
        let response;
        try {
            response = await fetch(this.getUrlById(id), {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(course)
            })
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        responseProcessing(response);
    }
    async get(): Promise<Course[]> {
        let response;
        try {
            response = await fetch(this.url, {
                headers: getHeaders()
            });
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        const courses: Course[] = await responseProcessing(response);
        return courses.map(c =>
            ({...c, openingDate: new Date(c.openingDate)}));
    }
    private getUrlById(id: number) {
        return `${this.url}/${id}`;
    }
}