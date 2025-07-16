import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";
import CourseContent from "./components/user/student/CourseContent";

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const date = new Date().getFullYear();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App d-flex flex-column min-vh-100">
        <Router>
          <div className="content flex-grow-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {userLoggedIn && (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/courseSection/:courseId/:courseTitle" element={<CourseContent />} />
                  </>
                )}
              </Routes>
            </AnimatePresence>
          </div>

          <footer className="bg-dark text-white py-4 text-center mt-auto shadow-lg">
            <div className="container">
              <p className="mb-1">
                🚀 Powered by <strong>LearnHub</strong> &copy; {date}
              </p>
              <small className="text-secondary">Build. Learn. Succeed.</small>
            </div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
