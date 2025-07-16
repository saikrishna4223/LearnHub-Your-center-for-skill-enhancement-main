import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import AllCourses from './AllCourses';
import { motion } from 'framer-motion';

const Home = () => {
   return (
      <>
         <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="shadow-sm">
            <Container fluid>
               <Navbar.Brand as={Link} to="/">
                  <h2 className="fw-bold text-warning">🎓 LearnHub</h2>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="ms-auto gap-4 align-items-center">
                     <Link className="text-white nav-link" to="/">Home</Link>
                     <Link className="text-white nav-link" to="/login">Login</Link>
                     <Link className="text-white nav-link" to="/register">Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* Hero Section */}
         <div id="home-container" className="first-container d-flex align-items-center justify-content-start">
            <motion.div
               className="content-home"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
               <p>
                  <span style={{ fontSize: "3rem", color: "#ff3c00" }}>Small App,</span><br />
                  <span style={{ fontSize: "2.2rem", color: "#222" }}>Big Dreams:</span><br />
                  <span style={{ fontSize: "1.6rem", color: "#444" }}>Elevating Your Education 🚀</span>
               </p>
               <Link to="/register">
                  <Button variant="warning" size="lg" className="mt-3 shadow-lg">
                     Explore Courses
                  </Button>
               </Link>
            </motion.div>
         </div>

         {/* Trending Courses */}
         <Container className="second-container">
            <h2 className="text-center my-5 text-dark fw-bold">🔥 Trending Courses</h2>
            <AllCourses />
         </Container>
      </>
   );
};

export default Home;
