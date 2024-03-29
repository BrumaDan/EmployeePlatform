import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {   useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuthStore } from '../store/AuthStore';
import { Alert, AlertTitle, Snackbar } from '@mui/material';


const defaultTheme = createTheme();

const SignInSide = () => {  
    const setToken = useAuthStore((state) => state.setToken);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const setRole = useAuthStore((state) => state.setRole);
    const setUserName = useAuthStore((state) => state.setUserName);
  const navigate = useNavigate();    
    const [alertMessage , setAlertMessage] = React.useState<string | null>(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      axios.post('/api/Account/login',
          {
              Username: data.get('email'),
              Password: data.get('password')
          }
      ).then(res => { 
          if(res.status === 200){
              setIsAuthenticated(true)                
              setToken(res.data.Token)
              setRole(res.data.Role)
              setUserName(res.data.UserName)
              navigate("/home");
          }
      }).catch(err => { setAlertMessage(`${err.response.data}`)})            
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={8}
          md={9}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"                
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>            
              </Grid>              
            </Box>
          </Box>
        </Grid>
          </Grid>
          {alertMessage ? (<Snackbar
              open={true}
              onClose={() =>setAlertMessage(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}              
          >
              <Alert severity='error' sx={{ width: "100%" }}>
                  <AlertTitle>Eroare</AlertTitle>
                  {alertMessage}
              </Alert>
          </Snackbar>):null }
        
    </ThemeProvider>
  );
}
export default SignInSide
