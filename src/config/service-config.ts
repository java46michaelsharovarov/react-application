import AuthServiceJwt from "../service/AuthServiceJwt";
import CoursesServiceRest from "../service/CoursesServiceRest";
// import CoursesServiceFirebase from "../service/CoursesServiceFirebase";
// import courseData from "./courseData.json"

// export const dataProvider = new CoursesServiceFirebase(courseData.minId, courseData.maxId);
// export const authService = new AuthServiceJwt('http://localhost:3500/login');

export const dataProvider = new CoursesServiceRest('http://localhost:3500/courses');
export const authService = new AuthServiceJwt('http://localhost:3500/login');