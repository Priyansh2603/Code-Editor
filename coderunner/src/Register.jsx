import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import CircularProgress  from '@material-ui/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RadioGroup,CircularProgress, Radio, InputLabel, FormLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster as ToastContainer, toast } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useContext } from 'react'
import {AppState} from './App'
import { Heading, useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
// import Cookies from 'js-cookie';
const theme = createTheme();
export default function Register() {
      const loggedIn = useContext(AppState).loggedIn;
    const history = useNavigate();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [interests, setInterests] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    postDetails(event.target.files[0])
    setSelectedFile(file);
    // You can perform additional actions with the selected file, if needed
  };
    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast.warning("Select an Image,We couldn't find the image...")
            setLoading(false);
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "shoeping");
            data.append("cloud_name", "dazhcprb8");
            fetch("https://api.cloudinary.com/v1_1/dazhcprb8/image/upload", {
                method: "post", body: data
            }).then((res) => res.json()).then((data) => {
                setPicture(data.url.toString());
                console.log("Image Added successfully to", data.url.toString())
                toast.success('Image Added Successfully!',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        position: "bottom-center"
                    }
                )
                setLoading(false);
            }).catch((e) => {
                console.log("Image Error:", e);
                setLoading(false);
            }
            )
        }
        else {
            toast.error("Please choose image file...")
            setLoading(false);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        submit(event);
    };

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("auth/register", {
                name, lastname, email, password, picture, gender, age, interests
            });
            console.log("resp:",response);
            if (response.data.exist === "true") {
                toast.info("The Email is already registered!", { theme: "dark", autoClose: 2000, position: "top-center" });
            } else if (response.data.exist === "false") {
                console.log(response.data._doc._id);
                loggedIn("true", name,response.data._doc._id,response.data._doc);
                const userInfo = { ...response.data._doc, "token": response.data.token };
                // localStorage.setItem('userInfo',userInfo);
                // localStorage.setItem('userId',response.data._doc._id);
                // Cookies.set("user",response.data._doc._id,{expires:30});
                document.title = `Code Manager (${name})`
                history("/");
                toast.success(`Registered Successfully! as ${name}`, { theme: "dark", autoClose: 2000, position: "top-center" });
            }
        } catch (error) {
            toast.error("Wrong Details", { theme: "dark", autoClose: 2000, position: "top-center" });
            console.error(error);
        }
    }

    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme} style={{ marginTop: "1vh" }}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'teal' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display={'flex'} alignItems={'center'} border={'1px solid '} py={1} px={1} borderRadius={1} borderColor={"grey.400"}>
                                        <TextField
                                            style={{ display: 'none' }} // Hide the default file input
                                            type="file"
                                            accept="image/*"
                                            onChange={ handleFileChange}
                                            id="picture"
                                            name="picture"
                                        />
                                        <label htmlFor="picture">
                                            <Box b={2}>
                                                <Button variant='contained' component="span" style={{color:'#008080',backgroundColor:'#D3D3D3'}}>
                                                    Profile Picture
                                                </Button>
                                            </Box>
                                        </label>
                                        {selectedFile && (
                                            <Typography variant="body1" color="textSecondary" alignItems={'center'}>
                                                {selectedFile.name.substring(0, 15)}...
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={12} display={'flex'}>
                                <Box display={'flex'} alignItems={'center'} border={'1px solid '} py={1} px={1} borderRadius={1} borderColor={"grey.400"}>
                                    <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={(e) => {
                                        setGender(e.target.value);
                                    }}>
                                        <Heading height={'100%'} justifyContent={'center'} mt={2} mr={2} ml={2} >Gender</Heading>
                                        <Grid ml={4.5}>
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </Grid>
                                    </RadioGroup>
                                </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        id="age"
                                        label="Age"
                                        name="age"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={interests}
                                        onChange={(e) => setInterests(e.target.value)}
                                        id="interests"
                                        label="Interests"
                                        name="interests"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                onClick={submit}
                                value="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                isLoading={loading}
                                style={{backgroundColor:'#008080'}}
                            >
                                {loading ?  <CircularProgress size={24} style={{ marginLeft: 10,color:'white' }} />: "Sign Up"}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    Already have an account?
                                    <Link to="/login">
                                        Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
