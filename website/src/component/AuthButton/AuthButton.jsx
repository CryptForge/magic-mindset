import { useContext } from "react";
import AuthContext from "../../AuthContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthButton = (props) => {
  const auth = useContext(AuthContext);

  if (auth.userIsAuthenticated()) {
    return <LogoutButton />;
  } else {
    return <LoginButton />;
  }
};

export default AuthButton;
