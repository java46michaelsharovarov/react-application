import * as React from 'react';
import { useDispatch } from "react-redux";
import { ClientData } from "../../models/ClientData";
import { LoginData } from "../../models/LoginData";
import { authAction } from "../../redux/actions";
import AuthServiceClient from "../../service/AuthServiceClient";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from "../forms/LoginForm";
import { COURSES_PATH } from '../../config/routes-config';
import { Navigate } from 'react-router-dom';
const authService = new AuthServiceClient(); 

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [error, setError] = React.useState(false);
    return  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <LoginForm submitFn={(loginData: LoginData) => {
                    const clientData = authService.login(loginData);
                    !!clientData ? dispatch(authAction(clientData as ClientData))
                   : setError(true);
                }}/>                
                <Collapse sx={{ width: '90%' }} in={error}>
                    <Alert severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setError(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 1 }}
                    >
                     Incorrect email or/and password
                    </Alert>
                </Collapse>                
            </Box>           
}
export default Login;