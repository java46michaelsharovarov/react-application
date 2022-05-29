import AddCourse from "../components/pages/AddCourse";
import Courses from "../components/pages/Courses";
import Generation from "../components/pages/Generation";
import Login from "../components/pages/Login";
import Logout from "../components/pages/Logout";
import StatisticCost from "../components/pages/StatisticCost";
import StatisticHours from "../components/pages/StatisticHours";
import { RouteType } from "../models/RouteType";
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { CLIENT_DATA_ITEM } from "../redux/reducers";
export const COURSES_PATH = '/';
export const ADD_COURSE_PATH = '/course/add';
export const STATISTIC_HOURS_PATH = '/statistic/hours';
export const STATISTIC_COST_PATH = '/statistic/cost';
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const GENERATION_PATH = '/generation';
export const ROUTES: RouteType[] = [
    {path: COURSES_PATH, label: 'Courses', element: <Courses/>, icon: <ListIcon color="primary"/>, authenticated: true, forUser: true},
    {path: ADD_COURSE_PATH, label: 'New Course', element: <AddCourse/>, icon: <AddIcon color="primary"/>, authenticated: true, forUser: false},
    {path: STATISTIC_HOURS_PATH, label: 'Hours Statistics', element: <StatisticHours/>, icon: <AccessTimeIcon color="primary"/>, authenticated: true, forUser: true},
    {path: STATISTIC_COST_PATH, label: 'Cost Statistics', element: <StatisticCost/>, icon: <AttachMoneyIcon color="primary"/>, authenticated: true, forUser: true},
    {path: LOGIN_PATH, label: 'Login', element: <Login/>, icon: <LoginIcon color="primary"/>},
    {path: LOGOUT_PATH, label: `Logout ${JSON.parse(localStorage.getItem(CLIENT_DATA_ITEM) as string).displayName}`, element: <Logout/>, icon: <LogoutIcon color="primary"/>, authenticated: true, forUser: true},
    {path: GENERATION_PATH, label: 'Generation', element: <Generation/>, icon: <PlaylistAddIcon color="primary"/>, authenticated: true, forUser: false}
];
