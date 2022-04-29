import { Course } from "../models/Course";
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