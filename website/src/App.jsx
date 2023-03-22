import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Home from "./page/Home/Home";
import Dashboard from "./page/Dashboard/Dashboard";
import Profile from "./page/User/Profile/Profile";
import Info from "./page/Info/Info";
import Login from "./page/User/Login/Login";
import { AuthProvider } from "./AuthContext";
import { isTokenValid, useLocalStorage } from "./util";
import { useEffect } from "react";
import ProtectedRoute from "./component/ProtectedRoute";
import TraineePage from "./page/TraineePage/TraineePage";
import SpecificTrainee from "./page/TraineePage/SpecificTrainee/SpecificTrainee";
import Verify from "./page/User/Verify/Verify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkillPage from "./page/Skillpage/SkillPage";

function App() {
  return (
    <AuthProvider>
      <div className="App background">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div>
          <Header />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/traineepage"
            element={
              <ProtectedRoute role="COACH|MANAGER|HR">
                <TraineePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills"
            element={
              <ProtectedRoute role="TRAINEE">
                <SkillPage />
              </ProtectedRoute>
            }
          />
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trainee/:traineeId" element={<SpecificTrainee />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
