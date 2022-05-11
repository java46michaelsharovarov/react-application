export type Course = {
    id: number;
    name: string;
    lecturer: string;
    hours: number;
    cost: number;
    openingDate: string
}
export function createCourse(id: number, name: string, lecturer: string, hours: number, cost: number, openingDate: string): Course {
    return {id, name, lecturer, hours, cost, openingDate: openingDate.substring(1, 11)};
}