import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../AuthContext";

const LogoutButton = () => {
  const auth = useContext(AuthContext);
  const nav = useNavigate();

  const logout = () => {
    auth.userLogout();
    nav("/login");
  };

  return (
    <a className="navigation-link" onClick={() => logout()}>
      Log Out
    </a>
  );
};

export default LogoutButton;
