import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dropdown from 'react-bootstrap/Dropdown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { motion } from 'framer-motion';
import axiosInstance from './AxiosInstance';

const Register = () => {
   const navigate = useNavigate();
   const [selectedOption, setSelectedOption] = useState('Select User');
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      type: "",
   });

   const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      setData({ ...data, type: eventKey });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!data.name || !data.email || !data.password || !data.type) {
         return alert("Please fill all fields");
      }

      axiosInstance.post('/api/user/register', data)
         .then((response) => {
            if (response.data.success) {
               alert(response.data.message);
               navigate('/login');
            } else {
               console.log(response.data.message);
            }
         })
         .catch((error) => {
            console.log("Error", error);
         });
   };

   return (
      <>
         {/* NAVBAR */}
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

         {/* FORM CONTAINER */}
         <div className="first-container d-flex align-items-center justify-content-center">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="glass-card p-4 rounded"
               style={{ width: '90%', maxWidth: '480px' }}
            >
               <Container component="main">
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     }}
                  >
                     <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
                        <PersonAddIcon />
                     </Avatar>
                     <Typography component="h1" variant="h5" className="fw-bold mb-2">
                        Create Your Account
                     </Typography>

                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                           margin="normal"
                           fullWidth
                           id="name"
                           label="Full Name"
                           name="name"
                           value={data.name}
                           onChange={handleChange}
                           autoComplete="name"
                           autoFocus
                        />
                        <TextField
                           margin="normal"
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           value={data.email}
                           onChange={handleChange}
                           autoComplete="email"
                        />
                        <TextField
                           margin="normal"
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           value={data.password}
                           onChange={handleChange}
                           autoComplete="new-password"
                        />

                        {/* User Type Dropdown */}
                        <Dropdown className="my-3">
                           <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="w-100 text-start">
                              {selectedOption}
                           </Dropdown.Toggle>
                           <Dropdown.Menu className="w-100">
                              <Dropdown.Item onClick={() => handleSelect("Student")}>Student</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleSelect("Teacher")}>Teacher</Dropdown.Item>
                           </Dropdown.Menu>
                        </Dropdown>

                        <Box mt={2}>
                           <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              className="shadow"
                              sx={{ mt: 3, mb: 2 }}
                           >
                              Sign Up
                           </Button>
                        </Box>

                        <Grid container justifyContent="center">
                           <Grid item>
                              <Typography variant="body2" className="text-muted">
                                 Already have an account?{" "}
                                 <Link to="/login" style={{ color: "#007bff", fontWeight: 500 }}>
                                    Sign In
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

export default Register;
