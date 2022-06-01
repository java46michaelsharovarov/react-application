import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { emptyClientData } from "../../models/ClientData";
import { authAction } from "../../redux/actions";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate} from "react-router-dom";
import { LOGIN_PATH } from "../../config/routes-config";
import { authService } from "../../config/service-config";

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function onLogout() {
        if (await authService.logout()) {
            dispatch(authAction(emptyClientData));
            navigate(LOGIN_PATH);
        }
    }
    return (<Button onClick={onLogout}
             variant="contained" endIcon={<LogoutIcon/>}>
                Logout
           </Button>)
}
export default Logout;