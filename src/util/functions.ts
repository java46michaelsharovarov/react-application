import _ from "lodash";
import { Course } from "../models/Course";
import { RouteType } from "../models/RouteType";
export function range(firstIndex: number, lastIndex: number): number[] {
    const resArray: number[] = [];
    for(let i = firstIndex; i < lastIndex; i++) {
        resArray.push(i);
    } 
    return resArray;
}
export default function getStatistics(array: Course[], key: keyof Course): {min: number; max: number; avg: number} {
    if(array.length === 0) {
        return {min:0, max:0, avg:0}
    }
    const value: number = +array[0][key];
    const res = array.reduce((e, c) => ({
        min: c[key] < e.min ? +c[key] : e.min,
        max: c[key] > e.max ? +c[key] : e.max,
        avg: +c[key] + e.avg
    }), {min: value, max: value, avg: 0});
    res.avg = Math.round(res.avg / array.length);
    return res;
} 
export function getRouteIndex(items: RouteType[], pathName: string): number {
    let index = items.findIndex(item => item.path === pathName)
    if(index < 0) {
        index = 0;
    }
    return index;
}
export function getIsoDate(dateValue: Date): string {
    const day = dateValue.getDate() + 1;
    const month = dateValue.getMonth();
    const year = dateValue.getFullYear();
    const dateUTC = new Date(year, month, day);
    return dateUTC.toISOString().substring(0, 10);
}
export function getCanonicalLocalDate(date: Date) : string{ // returns local date as YYYY-MM-DD
    const offset: number  = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}
export function getStatisticsRows(array: Course[], key: keyof Course, interval: number | string): {id: number; from: number; to: number; amount: number}[] {
    const inrervalNum: number = +interval;       
    if(typeof array[0][key] !== 'number') {
        throw new Error(`key ${key} doesn't exist or no number`);
    }
    if(inrervalNum === 0) {
        return [{id:0, from:0, to:0, amount:0}]
    } 
    const res =_.countBy(array, (course) => Math.floor(+course[key]/inrervalNum));
    return Object.entries(res).map((e: any, i: number) => ({
        id: i,
        from : e[0]*inrervalNum, 
        to : (e[0]*inrervalNum)+(inrervalNum-1),
        amount : e[1]
    }));
}