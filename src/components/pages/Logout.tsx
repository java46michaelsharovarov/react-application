import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { emptyClientData } from "../../models/ClientData";
import { authAction } from "../../redux/actions";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink} from "react-router-dom";
import { LOGIN_PATH } from "../../config/routes-config";

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    return <Button onClick={()=> dispatch(authAction(emptyClientData))} 
            key={LOGIN_PATH} component={RouterLink} to={LOGIN_PATH}
             variant="contained" endIcon={<LogoutIcon/>}>
                Logout
           </Button>
}
export default Logout;