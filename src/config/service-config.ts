import CoursesServiceArray from "../service/CoursesServiceArray";
import CoursesServiceRes from "../service/CoursesServiceRes";

export const coursesService = new CoursesServiceArray();
export const URL = 'http://localhost:3500/courses'; 
export const dataProvider = new CoursesServiceRes(URL);