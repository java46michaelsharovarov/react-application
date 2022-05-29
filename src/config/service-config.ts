import AuthServiceJwt from "../service/AuthServiceJwt";
import CoursesServiceRest from "../service/CoursesServiceRest";

export const dataProvider = new CoursesServiceRest('http://localhost:3500/courses');
export const authService = new AuthServiceJwt('http://localhost:3500/login');