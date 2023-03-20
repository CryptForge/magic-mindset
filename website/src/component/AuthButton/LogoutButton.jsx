import { useContext } from "react";
import AuthContext from "../../AuthContext";
import "./AuthButton.css";

const LogoutButton = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="navigation-link" onClick={() => auth.userLogout()}>
      Log Out
    </div>
  );
};

export default LogoutButton;
