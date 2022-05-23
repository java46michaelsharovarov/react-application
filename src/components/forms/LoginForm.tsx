import { LoginData } from "../../models/LoginData";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
type Props = {
    submitFn: (loginData: LoginData) => void;
    closeAlert: () => void;
}
function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/java46michaelsharovarov/react-application">
          Michael Sharovarov
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }  
const theme = createTheme();

const LoginForm: React.FC<Props> = ({submitFn, closeAlert}) => {
    const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)');
    const isMobileOrTablet = useMediaQuery('(min-width: 600px)');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email:string = data.get('email') as string;
        const password:string = data.get('password') as string;
        submitFn({email: email, password: password});
    };
    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" onFocus={closeAlert}>
            <CssBaseline />
            <Box
                sx={{
                    mt: {xs: 8, sm: 0, md: 8},
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: {xs: 1, sm: 0, md: 1}, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: {xs: 1, sm: 0, md: 1}}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{ mt: {sm: 0, md: 1}}}
                    size={isMobileOrTablet && !isLaptopOrDesktop ? 'small' : 'medium'}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ mt: {sm: 0, md: 1}}}
                    size={isMobileOrTablet && !isLaptopOrDesktop ? 'small' : 'medium'}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: {xs: 3, sm: 0, md: 3}, mb: {xs: 2, sm: 0, md: 2} }}>
                    Submit
                </Button>
            </Box>
            </Box>
            <Copyright sx={{ mt: {xs: 8, sm: 1, md: 8}, mb: {xs: 4, sm: 1, md: 4} }} />
        </Container>
        </ThemeProvider>
    );
}
export default LoginForm;