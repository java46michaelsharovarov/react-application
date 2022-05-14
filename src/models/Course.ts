export type Course = {
    id: number;
    name: string;
    lecturer: string;
    hours: number;
    cost: number;
    openingDate: Date
}
export function createCourse(id: number, name: string, lecturer: string, hours: number, cost: number, openingDate: Date): Course {
    return {id, name, lecturer, hours, cost, openingDate};
}