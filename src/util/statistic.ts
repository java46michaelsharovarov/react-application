import { coursesService } from "../config/service-config";

export default function getStatistics(key: string): {min: number; max: number; avg: number} {
    const array: any[] = coursesService.get();
    if(array.length === 0) {
        return {min:0, max:0, avg:0}
    }
    const value = array[0][key];
    const min = array.reduce((min,c) => c[key] < min ? c[key] : min, value);
    const max = array.reduce((max,c) => c[key] > max ? c[key] : max, value);
    const avg = Math.round(array.reduce((sum,c) => c[key] + sum, 0) / array.length);
    return {min, max, avg}
} 