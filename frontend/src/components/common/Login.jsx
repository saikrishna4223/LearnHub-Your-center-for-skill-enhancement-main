import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from 'framer-motion';
import axiosInstance from './AxiosInstance';

const Login = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!data.email || !data.password) {
         return alert("Please fill all fields");
      }

      axiosInstance.post('/api/user/login', data)
         .then((res) => {
            if (res.data.success) {
               alert(res.data.message);
               localStorage.setItem("token", res.data.token);
               localStorage.setItem("user", JSON.stringify(res.data.userData));
               navigate('/dashboard');
               setTimeout(() => window.location.reload(), 1000);
            } else {
               alert(res.data.message);
            }
         })
         .catch((err) => {
            if (err.response?.status === 401) {
               alert("User doesn't exist");
            }
            navigate("/login");
         });
   };

   return (
      <>
         <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
            <Container fluid>
               <Navbar.Brand><h2 className="text-warning">Study App</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="ms-auto gap-4 align-items-center">
                     <Link className="nav-link text-white" to="/">Home</Link>
                     <Link className="nav-link text-white" to="/login">Login</Link>
                     <Link className="nav-link text-white" to="/register">Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div className="first-container d-flex align-items-center justify-content-center">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="glass-card p-4 rounded"
               style={{ width: '90%', maxWidth: '420px' }}
            >
               <Container component="main">
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     }}
                  >
                     <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
                        <LockOutlinedIcon />
                     </Avatar>
                     <Typography component="h1" variant="h5" className="fw-bold mb-2">
                        Sign In to Continue
                     </Typography>
                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                           margin="normal"
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           value={data.email}
                           onChange={handleChange}
                           autoComplete="email"
                           autoFocus
                        />
                        <TextField
                           margin="normal"
                           fullWidth
                           name="password"
                           value={data.password}
                           onChange={handleChange}
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="current-password"
                        />
                        <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           className="shadow"
                        >
                           Sign In
                        </Button>
                        <Grid container justifyContent="center">
                           <Grid item>
                              <Typography variant="body2" className="text-muted">
                                 Don’t have an account?{' '}
                                 <Link to="/register" style={{ color: "#007bff", fontWeight: 500 }}>
                                    Sign Up
                                 </Link>
                              </Typography>
                           </Grid>
                        </Grid>
                     </Box>
                  </Box>
               </Container>
            </motion.div>
         </div>
      </>
   );
};

export default Login;
