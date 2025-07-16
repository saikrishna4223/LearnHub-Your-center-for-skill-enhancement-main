import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import UserHome from "./UserHome";
import { Container } from 'react-bootstrap';
import AddCourse from '../user/teacher/AddCourse';
import AdminHome from '../admin/AdminHome';
import EnrolledCourses from '../user/student/EnrolledCourses';
import CourseContent from '../user/student/CourseContent';
import AllCourses from '../admin/AllCourses';
import { UserContext } from '../../App';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
   const { userData } = useContext(UserContext);
   const [selectedComponent, setSelectedComponent] = useState('home');

   const renderSelectedComponent = () => {
      switch (selectedComponent) {
         case 'home':
            return <UserHome />;
         case 'addcourse':
            return <AddCourse />;
         case 'enrolledcourese':
            return <EnrolledCourses />;
         case 'cousreSection':
            return <CourseContent />;
         case 'cousres':
            return <AllCourses />;
         default:
            return <UserHome />;
      }
   };

   return (
      <>
         <NavBar setSelectedComponent={setSelectedComponent} />

         <Container className="my-4 py-3 rounded shadow bg-light">
            <AnimatePresence mode="wait">
               <motion.div
                  key={selectedComponent}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
               >
                  {renderSelectedComponent()}
               </motion.div>
            </AnimatePresence>
         </Container>
      </>
   );
};

export default Dashboard;
