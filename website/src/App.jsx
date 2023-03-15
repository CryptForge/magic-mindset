import "./App.css";
import { API_BASE } from "./main";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Home from "./page/Home/Home";
import Dashboard from "./page/Dashboard/Dashboard";
import Profile from "./page/Profile/Profile";
import StudentsPage from "./page/StudentsPage/StudentsPage";
import Info from "./page/Info/Info";
import Login from "./page/Login/Login";
import { AuthContext } from "./AuthContext";
import { isTokenValid, useLocalStorage } from "./util";
import { useEffect } from "react";

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

  return (
    <AuthContext.Provider value={auth}>
      <div className="App">
        <div>
          <Header />
        </div>

        <div>{API_BASE}</div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/studentspage" element={<StudentsPage />} />
            <Route path="/info" element={<Info />} />
            <Route
              path="/login"
              element={<Login authenticate={authenticate} />}
            />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
