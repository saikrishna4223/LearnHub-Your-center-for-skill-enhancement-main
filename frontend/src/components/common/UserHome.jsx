import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import TeacherHome from '../user/teacher/TeacherHome';
import AdminHome from '../admin/AdminHome';
import StudentHome from '../user/student/StudentHome';
import { motion } from 'framer-motion';

const UserHome = () => {
  const { userData } = useContext(UserContext);

  const renderHomeComponent = () => {
    switch (userData?.type) {
      case 'Teacher':
        return <TeacherHome />;
      case 'Admin':
        return <AdminHome />;
      case 'Student':
        return <StudentHome />;
      default:
        return <p>No user type detected.</p>;
    }
  };

  return (
    <Container className="py-3">
      <motion.div
        key={userData?.type}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderHomeComponent()}
      </motion.div>
    </Container>
  );
};

export default UserHome;
