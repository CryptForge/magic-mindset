import "./App.css";
import { API_BASE } from "./main";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Home from "./page/Home/Home";
import Dashboard from "./page/Dashboard/Dashboard";
import Profile from "./page/Profile/Profile";
import Info from "./page/Info/Info";
import Login from "./page/Login/Login";
import { AuthContext } from "./AuthContext";
import { isTokenValid, useLocalStorage } from "./util";
import { useEffect } from "react";
import ProtectedRoute from "./component/ProtectedRoute";
import TraineePage from "./page/TraineePage/TraineePage";
import SpecificTrainee from "./page/TraineePage/SpecificTrainee/SpecificTrainee";


function App() {
  const [auth, setAuth] = useLocalStorage("auth", {
    authenticated: false,
    info: null,
  });

  useEffect(() => {
    if (auth.authenticated && !isTokenValid(auth.info.token)) {
      setAuth({
        authenticated: false,
        info: null,
      });
    }
  }, []);

  const authenticate = (token, username, role) => {
    setAuth({
      authenticated: true,
      info: {
        token,
        username,
        role,
      },
    });
  };

  const logOut = () => {
    setAuth({
      authenticated: false,
      info: null,
    });
    console.log("logged out");
  };

  return (
    <AuthContext.Provider value={auth}>
      <div className="App background">
        <div>
          <Header logOut={logOut} />
        </div>

        <div className="container">
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
            <Route path="/info" element={<Info />} />
            <Route
              path="/login"
              element={<Login authenticate={authenticate} />}
            />
            <Route path="/trainee/:traineeId" element={<SpecificTrainee />} />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
