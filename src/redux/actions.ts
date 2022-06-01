import { PayloadAction } from "@reduxjs/toolkit";
import { dataProvider } from "../config/service-config";
import { ClientData } from "../models/ClientData";
import { Course } from "../models/Course";
import { OperationCode } from "../models/OperationCode";

export const SET_COURSES_ACTION = "/courses/set";
export const AUTH_ACTION = "auth";
export const OPERATION_CODE_ACTION = "operation-code";

export function setCourses(courses: Course[]): PayloadAction<Course[]> {
    return {payload: courses, type: SET_COURSES_ACTION};
} 
export function getCourses(): (dispatch: any)=>void {
    return async (dispatch)=> {
        try {
            const courses: Course[] = await dataProvider.get();
            dispatch(setCourses(courses));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    };
} 
export function addCourse(course: Course): (dispatch: any)=>void {
    return async (dispatch)=> {
        try {
            await dataProvider.add(course);
            const courses: Course[] = await dataProvider.get();
            dispatch(setCourses(courses));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    };
} 
export function removeCourse(id: number): (dispatch: any)=>void {
    return async (dispatch)=> {
        try {
            await dataProvider.remove(id);
            const courses: Course[] = await dataProvider.get();
            dispatch(setCourses(courses));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    };
} 
export function updateCourse(course: Course): (dispatch: any)=>void {
    return async (dispatch)=> {
        try {
            await dataProvider.update(course.id, course);
            const courses: Course[] = await dataProvider.get();
            dispatch(setCourses(courses));
            dispatch(setOperationCode(OperationCode.OK));
        } catch (err: any) {
            dispatch(setOperationCode(err));
        }
    };
} 
export function authAction(clientData: ClientData): PayloadAction<ClientData> {
    return {payload: clientData, type: AUTH_ACTION};
}
export function setOperationCode(operationCode: OperationCode): PayloadAction<OperationCode> {
    return {payload: operationCode, type: OPERATION_CODE_ACTION};
}