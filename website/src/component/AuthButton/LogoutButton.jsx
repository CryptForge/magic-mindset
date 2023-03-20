import { useContext } from "react";
import AuthContext from "../../AuthContext";
import "./AuthButton.css";

const LogoutButton = () => {
  const auth = useContext(AuthContext);

  return (
    <button className="auth-button" onClick={() => auth.userLogout()}>
      Log Out
    </button>
  );
};

export default LogoutButton;
