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

function App() {
  return (
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
          <Route path="/studentpage" element={<StudentsPage />} />
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
