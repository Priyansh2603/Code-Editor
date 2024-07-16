import * as React from 'react';
import {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {axios} from 'axios';
import { AppState } from './App';
// import Cookies from 'js-cookie';
// import bcrypt from 'bcrypt';
import {Link, useNavigate,BrowserRouter,Route, Routes} from 'react-router-dom';
// import {history} from 'react-router-dom';
import { Toaster, useToaster,toast } from 'react-hot-toast';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Home from './Home';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme();
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
export default function Signin() {
    const loggedIn = useContext(AppState).loggedIn;
  const [email,setEmail]= useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
    async function submit(e){
        e.preventDefault();
        console.log(email,password);
        try{
            const res = await axios.post("auth/login", {
               email, password,
              });
              console.log("yaha tak")
              console.log(res.data);
              if(res.data==="notexist"){
                console.log("Ha bhai nahi hai")
                toast.error("This email is not registered! SignUp to register",{style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },position:"top-center"});
            }
            else if(res.data==="Incrorrect"){
                toast.error("Email and Password doesn't match!",{style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },position:"top-center"})
            }
             else if (res.data.email===email) {
                // Assuming the response structure is { email, name, ...otherUserData }
                const { name } = res.data;
                console.log("from login",res.data._id)
                console.log(res.data);
                loggedIn(true,name,res.data._id,res.data);
                // localStorage.setItem("userId",res.data._id);
                // Cookies.set("user",res.data._id,{expires:30});
                document.title=`Code Manager (${name})`
                history("/");
                toast.success(`Logged in Successfully as ${name}`,{style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },position:"top-center"});
              }
            
            
        }
        catch(e){
            console.log(e);
            toast.error("Login Error!",{style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },position:"top-center"})
        }
      }
  return (
    <>
    <Toaster/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          {/* <Box component="form" action="POST" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            autoComplete="email"
            autoFocus
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Box component="form" action="POST" noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            autoComplete="email"
            autoFocus
            />
            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"/>
              {/* <input type= "email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id = 'email' required/>
            //     <br/>
            //     <input type= "password" name="password" onChange={(e)=>{setPassword(e.target.value)}} id = 'password' required/>
            //     <br/> */}

             {/* <ToastContainer> */}
            <Button type="submit"
              onClick={submit}
              value="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>Sign In</Button>
            {/* </ToastContainer> */}
            <Grid container>
              <Grid item xs>
                <Link to="/">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
      </ThemeProvider>
      </>
  )
}
